import {createSiteMenuTemplate} from '../src/components/site-menu.js';
import {createSearchTemplate} from '../src/components/search.js';
import {createFilterTemplate} from '../src/components/filter.js';
import {createBoardTemaplate} from '../src/components/board.js';
import {createBoardTaskTemplate} from '../src/components/board-task.js';
import {createBoardFilterTemplate} from '../src/components/board-filter.js';
import {createCardTemplate} from '../src/components/card.js';
import {createEditFormTemplate} from '../src/components/edit-form.js';
import {createLoadMoreBtnTemplate} from '../src/components/load-btn.js';

const renderComponent = (container, component, position) => {
  document.querySelector(container).insertAdjacentHTML(position, component());
};

renderComponent(`.main__control`, createSiteMenuTemplate, `beforeend`);
renderComponent(`.main`, createSearchTemplate, `beforeend`);
renderComponent(`.main`, createFilterTemplate, `beforeend`);
renderComponent(`.main`, createBoardTemaplate, `beforeend`);
renderComponent(`.board`, createBoardFilterTemplate, `beforeend`);
renderComponent(`.board`, createBoardTaskTemplate, `beforeend`);
renderComponent(`.board__tasks`, createEditFormTemplate, `beforeend`);

for (let i = 0; i < 3; i++) {
  renderComponent(`.board__tasks`, createCardTemplate, `beforeend`);
}

renderComponent(`.board__tasks`, createLoadMoreBtnTemplate, `beforeend`);
