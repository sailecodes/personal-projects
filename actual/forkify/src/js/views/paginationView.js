import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = Number(btn.dataset.goto);

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Case A: Page 1 + more pages
    if (this._data.page === 1 && numPages > 1) {
      return this._generateMarkupButtonRight();
    }

    // Case B: Last page
    if (this._data.page === numPages && numPages > 1) {
      return this._generateMarkupButtonLeft();
    }

    // CASE C: Another page
    if (this._data.page < numPages) {
      return this._generateMarkupButtonLeft().concat(
        this._generateMarkupButtonRight()
      );
    }

    return '';
  }

  _generateMarkupButtonLeft() {
    return `
      <button data-goto="${
        this._data.page - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._data.page - 1}</span>
      </button>`;
  }

  _generateMarkupButtonRight() {
    return `
      <button data-goto="${
        this._data.page + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${this._data.page + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
  }
}

export default new PaginationView();
