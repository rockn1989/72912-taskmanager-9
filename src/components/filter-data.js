export const getFilter = ({title, count}) => `<input
        type="radio"
        id="filter__all"
        class="filter__input visually-hidden"
        name="filter"
        ${count() > 0 ? `checked` : `disabled`}
      />
      <label for="filter__all" class="filter__label">
        ${title} <span class="filter__all-count">${count()}</span></label
      >`;
