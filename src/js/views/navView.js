import { View } from './view';

class NavView extends View {
   _parentElement = document.querySelector('.nav__list');

   _navBtn = document.querySelector('.nav__btn');
   _navList = document.querySelector('.nav__list');

   constructor() {
      super();

      this._navBtn.addEventListener('click', this.toggleMenu);
   }

   toggleMenu = function () {
      this._navList.classList.toggle('open');
      [...this._navBtn.children].forEach(child => child.classList.toggle('no-display'));
   }.bind(this);
}

export default new NavView();
