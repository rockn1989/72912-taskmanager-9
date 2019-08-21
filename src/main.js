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

const COUNT_TASKS = 8;
const MAX_TASKS = 7;
const ALL_TASKS = [];
const FILTERS = [`all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`];
const renderComponent = (container, component, position) => {
  document.querySelector(container).insertAdjacentHTML(position, component);
};
let editTask;
let otherTasks;

renderComponent(`.main__control`, createSiteMenuTemplate(), `beforeend`);
renderComponent(`.main`, createSearchTemplate(), `beforeend`);
renderComponent(`.main`, createFilterTemplate(), `beforeend`);
renderComponent(`.main`, createBoardTemaplate(), `beforeend`);
renderComponent(`.board`, createBoardFilterTemplate(), `beforeend`);
renderComponent(`.board`, createBoardTaskTemplate(), `beforeend`);

for (let i = 0; i < COUNT_TASKS; i++) {
  ALL_TASKS.push(getTask());
}

[editTask, ...otherTasks] = ALL_TASKS;

const FILTERS_DATA = FILTERS.map((filterName) => {
  let filterCount;
  switch (filterName) {
    case `all` :
      filterCount = ALL_TASKS.length;
      break;
    case `overdue` :
      filterCount = 0;
      break;
    case `today`:
      filterCount = 0;
      break;
    case `favorites` :
      filterCount = ALL_TASKS.filter(({isFavorite}) => isFavorite).length;
      break;
    case `repeating` :
      filterCount = ALL_TASKS.filter(({repeatingDays}) => {
        const isRepeat = Object.keys(repeatingDays).some((day) => repeatingDays[day]);
        return isRepeat;
      }).length;
      break;
    case `tags` :
      filterCount = ALL_TASKS.filter(({tags}) => tags.size > 0).length;
      break;
    case `archive` :
      filterCount = ALL_TASKS.filter(({isArchive}) => isArchive).length;
      break;
    default: return 0;
  }
  return {
    title: filterName,
    count: filterCount
  };
});


const renderTasks = (container, component) => {
  document.querySelector(container).insertAdjacentHTML(`beforeend`, component);
};

renderTasks(`.board__tasks`, createEditFormTemplate(editTask));
renderTasks(`.board__tasks`, otherTasks.map(createCardTemplate).join(``));
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

