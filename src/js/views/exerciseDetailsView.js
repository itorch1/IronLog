import { convertToTitle } from '../helpers';
import { View } from './view';

class ExerciseDetailsView extends View {
   _parentElement = document.querySelector('.container');

   _generateMarkup() {
      console.log(this._data);
      const { exerciseData, exerciseName } = this._data;

      return `
         <section class="exercise-details">
            <h1 class="exercise__title">${convertToTitle(exerciseName)} stats</h1>
            <table class="exercise__table">
               <thead>
                  <tr>
                     <th>Date</th>
                     <th>Set 1</th>
                     <th>Set 2</th>
                     <th>Set 3</th>
                     <th>Set 4</th>
                     <th>Set 5</th>
                  </tr>
               </thead>

               <tbody>
                  <tr>
                     <th>20 Apr 2026</th>
                     <td>30kg x 12</td>
                     <td>30kg x 12</td>
                     <td>30kg x 12</td>
                     <td>30kg x 12</td>
                     <td>30kg x 12</td>
                  </tr>

                  ${exerciseData
                     .map(exercise => {
                        const getProperty = (type, set) => `${exerciseName}_${type}_${set}`;

                        const date = new Date(exercise.date);

                        return `
                        <tr>
                           <th>${date.getDate()} ${date.toLocaleString('en-US', { month: 'short' })}, ${date.getFullYear()}</th>
                           <td>${exercise.exerciseData[getProperty('weight', 0)]}kg x ${exercise.exerciseData[getProperty('rep', 0)]}</td>
                           <td>${exercise.exerciseData[getProperty('weight', 1)]}kg x ${exercise.exerciseData[getProperty('rep', 1)]}</td>
                           <td>${exercise.exerciseData[getProperty('weight', 2)]}kg x ${exercise.exerciseData[getProperty('rep', 2)]}</td>
                           ${exercise.exerciseData[getProperty('weight', 3)] ? `<td>${exercise.exerciseData[getProperty('weight', 3)]}kg x ${exercise.exerciseData[getProperty('rep', 3)]}</td>` : ''}
                           ${exercise.exerciseData[getProperty('weight', 4)] ? `<td>${exercise.exerciseData[getProperty('weight', 4)]}kg x ${exercise.exerciseData[getProperty('rep', 4)]}</td>` : ''}
                        </tr>
                     `;
                     })
                     .join('')}
               </tbody>
            </table>
         </section>
        `;
   }
}

export default new ExerciseDetailsView();
