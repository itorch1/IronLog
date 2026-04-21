import { convertToTitle } from '../helpers';
import { View } from './view';

class ExercisesView extends View {
   _parentElement = document.querySelector('.container');

   _generateMarkup() {
      const data = Object.entries(this._data);

      const matcher = {
         PP1: 'Push/Pull 1',
         PP2: 'Push/Pull 2',
         L: 'Legs',
      };

      return `
            <section class="exercises-section">
                <h1 class="exercises__title">Exercises</h1>
                
                <div class="exercises">
                    ${data
                       .map(
                          ([planName, plan]) => `
                            <h2 class="exercises__subtitle">${matcher[planName]}</h2>
                            <ul class="exercises__list">
                                ${plan.map(workout => `<li><a class="exercises__link" data-exercise="${workout.id}">${convertToTitle(workout.id)}</a></li>`).join('')}
                            </ul>
                        `,
                       )
                       .join('')}
                </div>
            </section>
        `;
   }
}

export default new ExercisesView();
