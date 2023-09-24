import icons from 'url:../../img/icons.svg';

// Note: exporting the class itself because we're not making an instance
// of this class
export default class View {
  _data;

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newElement, i) => {
      const currElement = currElements[i];
      if (
        !newElement.isEqualNode(currElement) &&
        newElement.firstChild?.nodeValue.trim() !== ''
      ) {
        // currElement has a reference to the actual element in the DOM
        currElement.textContent = newElement.textContent;
      }

      if (!newElement.isEqualNode(currElement)) {
        Array.from(newElement.attributes).forEach(attr =>
          currElement.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length == 0)) {
      this.renderError();
      return;
    }

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._successMessage) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
}
