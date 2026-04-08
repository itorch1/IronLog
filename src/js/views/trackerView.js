import { View } from './view';

class TrackerView extends View {
   _parentElement = document.querySelector('.container');
   _message = 'Great job! 💪';

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

   addSubmitBtnAndNotes() {
      const form = document.querySelector('.tracker');

      form.lastElementChild.remove();
      const markup = `
         <textarea class="tracker__notes" name="notes" placeholder="Session notes"></textarea>
         <button class="tracker__btn--submit">Finish Workout</button>
      `;
      form.insertAdjacentHTML('beforeend', markup);
   }

   _generateMarkup() {
      const planDay = this._data.plans[this._data.formState.pickedDay];
      const { currentSet, currentExercise } = this._data.formState;

      return `
      <section class="tracker-section">
         <form class="tracker">
            <div class="tracker__btns-exercise-options">
               ${planDay[currentExercise].canCombine ? '<button type="button" class="tracker__btn--exercise-menu tracker__btn--superset">Superset</button>' : ''}
               ${planDay[currentExercise].variations || (this._data.formState.isSuperset && planDay[currentExercise + 1].variations) ? '<button type="button" class="tracker__btn--exercise-menu tracker__btn--variations">Variations</button>' : ''}
               <div class="variations-menu">
               </div>
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
      const workoutData = this._data.previousWorkout?.workoutData;

      return `
        <div>
            <label for="${planDay[i].id}_weight_${currentSet}" class="sr-only">weight</label>
            <input
               type="number"
               name="${planDay[i].id}_weight_${currentSet}"
               id="${planDay[i].id}_weight_${currentSet}"
               step="5"
               value="${workoutData?.[`${planDay[i].id}_weight_${currentSet}`] || 5}"
            />
         </div>
         <div>
            <label for="${planDay[i].id}_reps_${currentSet}" class="sr-only">reps</label>
            <input type="number" name="${planDay[i].id}_reps_${currentSet}" id="${planDay[i].id}_reps_${currentSet}" value="${workoutData?.[`${planDay[i].id}_reps_${currentSet}`] || 3}" step="any" />
         </div>
    `;
   }
}

export default new TrackerView();
