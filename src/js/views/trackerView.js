import { View } from './view';

class TrackerView extends View {
   _parentElement = document.querySelector('.container');

   addHandlerClick(handler, className) {
      this._parentElement.addEventListener('click', function (e) {
         const btn = e.target.closest(`.${className}`);
         if (!btn) return;
         handler();
      });
   }

   addHandlerSubmit(handler) {
      this._parentElement.addEventListener('submit', function (e) {
         e.preventDefault();
         const form = e.target.closest('.tracker');
         if (!form) return;

         const dataArr = [...new FormData(form)];
         const data = Object.fromEntries(dataArr);
         handler(data);
      });
   }

   getFormData() {
      const form = document.querySelector('.tracker');
      if (!form) return;
      const dataArr = [...new FormData(form)];
      return Object.fromEntries(dataArr);
   }

   renderNextSet() {
      const { currentSet, currentExercise, isSuperset } = this._data.formState;

      const exerciseDetailsContainers = document.querySelectorAll('.tracker__exercise-details');

      const markup = this._generateMarkupSet(isSuperset ? currentExercise + 1 : currentExercise, currentSet);
      exerciseDetailsContainers.forEach(container => container.insertAdjacentHTML('beforeend', markup));
   }

   renderExercise() {
      const { isSuperset, currentExercise } = this._data.formState;

      const trackerBodyContainer = document.querySelector('.tracker-body');
      const supersetBtn = document.querySelector('.tracker__btn--superset');

      if (!isSuperset) trackerBodyContainer.innerHTML = '';
      if (isSuperset) supersetBtn.classList.add('hidden');

      const markup = this._generateMarkupExercise(isSuperset ? currentExercise + 1 : currentExercise);
      trackerBodyContainer.insertAdjacentHTML('beforeend', markup);
   }

   addSubmitBtn() {
      const form = document.querySelector('.tracker');

      form.lastElementChild.remove();

      const submitBtn = document.createElement('button');
      submitBtn.textContent = 'Finish Workout'
      submitBtn.classList.add('tracker__btn--submit');
      form.insertAdjacentElement('beforeend', submitBtn);
   }

   _generateMarkup() {
      const planDay = this._data.plans[this._data.formState.pickedDay];
      const { currentSet, currentExercise } = this._data.formState;

      return `
      <section class="tracker-section">
         <form class="tracker">
            <div class="tracker__btns-exercise-options">
               ${planDay[currentExercise].canCombine ? '<button type="button" class="tracker__btn--exercise-menu tracker__btn--superset">Superset</button>' : ''}
               ${planDay[currentExercise].variations ? '<button type="button" class="tracker__btn--exercise-menu tracker__btn--variations">Variations</button>' : ''}
            </div>

            <div class="tracker-body">
               ${this._generateMarkupExercise(currentExercise, currentSet)}
            </div>

            <button type="button" class="tracker__btn--next-set">
               <ion-icon name="add"></ion-icon>
            </button>
            <button type="button" class="tracker__btn--next-exercise">Next exercise</button>
         </form>
      </section>
    `;
   }

   _generateMarkupExercise(currentExercise) {
      const convertToTitle = id =>
         id
            .split('_')
            .map(word => `${word[0].toUpperCase()}${word.slice(1)}`)
            .join(' ');

      const planDay = this._data.plans[this._data.formState.pickedDay];
      const { currentSet } = this._data.formState;

      return `
         <div class="tracker__exercise">
            <p class="tracker__exercise-title">${convertToTitle(planDay[currentExercise].id)}</p>
            <div class="tracker__exercise-details">
               <p>weight</p>
               <p>reps</p>
               ${this._generateMarkupSet(currentExercise, currentSet)}
               ${this._generateMarkupSet(currentExercise, currentSet + 1)}
               ${this._generateMarkupSet(currentExercise, currentSet + 2)}
            </div>
         </div>
      `;
   }

   _generateMarkupSet(currentExercise, currentSet) {
      const planDay = this._data.plans[this._data.formState.pickedDay];
      const i = currentExercise;

      return `
        <div>
            <label for="${planDay[i].id}_weight_${currentSet}" class="sr-only">weight</label>
            <input
               type="number"
               name="${planDay[i].id}_weight_${currentSet}"
               id="${planDay[i].id}_weight_${currentSet}"
               step="5"
               value="5"
            />
         </div>
         <div>
            <label for="${planDay[i].id}_reps_${currentSet}" class="sr-only">reps</label>
            <input type="number" name="${planDay[i].id}_rep_${currentSet}" id="${planDay[i].id}_reps_${currentSet}" value="3" />
         </div>
    `;
   }
}

export default new TrackerView();
