import { View } from './view';

class WorkoutDetailsView extends View {
   _parentElement = document.querySelector('.container');

   _generateMarkup() {
      const { date: dateISO, type, workoutDuration, startTime, finishTime, workoutData } = this._data;
      const date = new Date(dateISO);
      const maxNumSets = Object.keys(workoutData).reduce(
         (acc, entry) => (+entry.slice(-1) > acc ? +entry.slice(-1) : acc),
         3,
      );

      const formatTime = time => time.slice(0, time.lastIndexOf(':'));

      const transformWorkoutData = function (workoutData) {
         const exercises = {};

         Object.entries(workoutData).forEach(([key, value]) => {
            // 1. Split key by underscore (e.g. ["dumbell", "bench", "press", "weight", "0"])
            const parts = key.split('_');

            // 2. Extract the set index (last part) and the metric (second to last)
            const setIndex = parts.pop(); // "0"
            const metric = parts.pop(); // "weight" or "reps"
            const exerciseName = parts.join('_'); // "dumbell_bench_press"

            // 3. Initialize the exercise array if it doesn't exist

            if (!exerciseName) return;
            if (!exercises[exerciseName]) exercises[exerciseName] = [];

            // 4. Initialize the specific set object if it doesn't exist
            if (!exercises[exerciseName][setIndex]) {
               exercises[exerciseName][setIndex] = { set: parseInt(setIndex) + 1 };
            }

            // 5. Assign the value (weight or reps)
            exercises[exerciseName][setIndex][metric] = value;
         });

         return exercises;
      };

      const data = Object.entries(transformWorkoutData(workoutData));
      console.log(data);

      return `
        <section class="workout-details">
            <h1 class="workout-details__title">Workout Details<br />(${date.getDate()} ${date.toLocaleString('en-US', { month: 'short' })}, ${date.getFullYear()})</h1>
            <p class="workout-details__type">Type: ${type === 'L' ? 'Legs' : type}</p>
            <p class="workout-details__time">Duration: ${workoutDuration} (${formatTime(startTime)} - ${formatTime(finishTime)})</p>
            <table class="workout-details__table">
                <thead>
                    <tr>
                        <th>Exercise</th>
                        ${Array.from({ length: maxNumSets }, (_, i) => `<th>Set ${i + 1}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${data
                       .map(([exercise, sets]) => {
                          const exerciseName = exercise
                             .split('_')
                             .map(word => word[0].toUpperCase() + word.slice(1))
                             .join(' ');

                          return `
                            <tr>
                                <th>${exerciseName}</th>
                                ${sets.map(set => `<td>${set.weight}kg x ${set.reps}</td>`).join('')}
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

export default new WorkoutDetailsView();
