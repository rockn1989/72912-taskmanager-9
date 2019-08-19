import {createSiteMenuTemplate} from '../src/components/site-menu.js';
import {createSearchTemplate} from '../src/components/search.js';
import {createFilterTemplate} from '../src/components/filter.js';
import {createBoardTemaplate} from '../src/components/board.js';
import {createBoardTaskTemplate} from '../src/components/board-task.js';
import {createBoardFilterTemplate} from '../src/components/board-filter.js';
import {createCardTemplate} from '../src/components/card.js';
import {createEditFormTemplate} from '../src/components/edit-form.js';

import {getTask} from '../src/components/card-data.js';
import {getFilter} from '../src/components/filter-data.js';

import {createLoadMoreBtnTemplate} from '../src/components/load-btn.js';

const renderComponent = (container, component, position) => {
  document.querySelector(container).insertAdjacentHTML(position, component);
};

renderComponent(`.main__control`, createSiteMenuTemplate(), `beforeend`);
renderComponent(`.main`, createSearchTemplate(), `beforeend`);
renderComponent(`.main`, createFilterTemplate(), `beforeend`);
renderComponent(`.main`, createBoardTemaplate(), `beforeend`);
renderComponent(`.board`, createBoardFilterTemplate(), `beforeend`);
renderComponent(`.board`, createBoardTaskTemplate(), `beforeend`);


const COUNT_TASKS = 17;
const MAX_TASKS = 8;
const ALL_TASKS = [];
const FILTERS = [`all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`];


for (let i = 0; i < COUNT_TASKS; i++) {
  ALL_TASKS.push(getTask());
}

const [editTask, ...otherTasks] = ALL_TASKS;

const FILTERS_DATA = FILTERS.map((filterName) => {
  let filterElement = {};
  switch (filterName) {
    case `all` : filterElement = {
      title: filterName,
      count: ALL_TASKS.length
    }; break;
    case `overdue` : filterElement = {
      title: filterName,
      count: 0
    }; break;
    case `today`: filterElement = {
      title: filterName,
      count: 0
    }; break;
    case `favorites` :
      filterElement = {
        title: filterName,
        count: ALL_TASKS.filter(({isFavorite}) => {
          return isFavorite;
        }).length
      }; break;
    case `repeating` :
      filterElement = {
        title: filterName,
        count: ALL_TASKS.filter(({repeatingDays}) => {
          return repeatingDays.We;
        }).length
      }; break;
    case `tags` : filterElement = {
      title: filterName,
      count: ALL_TASKS.filter(({tags}) => {
        return tags.size > 0;
      }).length
    }; break;
    case `archive` : filterElement = {
      title: filterName,
      count: ALL_TASKS.filter(({isArchive}) => {
        return isArchive;
      }).length
    }; break;
  }
  return filterElement;
});


const renderTasks = (container, component) => {
  document.querySelector(container).insertAdjacentHTML(`beforeend`, component);
};

renderTasks(`.board__tasks`, createEditFormTemplate(editTask));
renderTasks(`.board__tasks`, otherTasks.slice(0, MAX_TASKS).map(createCardTemplate).join(``));
renderTasks(`.filter`, FILTERS_DATA.map(getFilter).join(``), `beforeend`);
renderComponent(`.board`, createLoadMoreBtnTemplate(), `beforeend`);

const LOAD_MORE_BTN = document.querySelector(`.load-more`);

const loadingCard = (e) => {
  e.preventDefault();
  const currentCountTasks = document.querySelectorAll(`.card:not(.card--edit)`).length;
  const remainigTasks = ALL_TASKS.slice(currentCountTasks, currentCountTasks + MAX_TASKS).length;

  if (currentCountTasks + remainigTasks >= ALL_TASKS.length) {
    renderTasks(`.board__tasks`, ALL_TASKS.slice(currentCountTasks, currentCountTasks + remainigTasks).map(createCardTemplate).join(``));
    LOAD_MORE_BTN.removeEventListener(`click`, loadingCard);
    LOAD_MORE_BTN.remove();
  } else {
    renderTasks(`.board__tasks`, ALL_TASKS.slice(currentCountTasks, currentCountTasks + MAX_TASKS).map(createCardTemplate).join(``));
  }
};

LOAD_MORE_BTN.addEventListener(`click`, loadingCard);

