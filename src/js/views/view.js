export class View {
   _data;

   render(data) {
      if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
      this._data = data;

      const markup = this._generateMarkup();
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
   }

   _clear() {
      this._parentElement.innerHTML = '';
   }

   renderError(message = this._errorMessage) {
      const html = `
        <div class="error">
            <ion-icon name="warning"></ion-icon>
            <p>${message}</p>
        </div>
      `;
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', html);
   }

   renderMessage(message = this._message) {
      const html = `
        <div class="message">
            <p>${message}</p>
        </div>
      `;
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', html);
   }
}
