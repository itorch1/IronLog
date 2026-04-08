import { View } from './view';

class PickDayView extends View {
   _parentElement = document.querySelector('.container');

   addHandlerPickDay(handler) {
      this._parentElement.addEventListener('click', function (e) {
         const btn = e.target.closest('.plan-day-picker__list-button');
         if (!btn) return;
         const pickedDay = btn.dataset.day;
         handler(pickedDay);
      });
   }

   _generateMarkup() {
      return `
        <section class="plan-day-picker">
            <ul class="plan-day-picker__list">
                <li><button class="plan-day-picker__list-button">PP1</button></li>
                <li><button class="plan-day-picker__list-button">Legs</button></li>
                <li><button class="plan-day-picker__list-button">PP2</button></li>
            </ul>
        </section>
    `;
   }
}

export default new PickDayView();
