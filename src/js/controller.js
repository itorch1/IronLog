import * as model from './model';
import pickDayView from './views/pickDayView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import trackerView from './views/trackerView';

const controlPickDay = function (pickedDay) {
   model.state.formState.pickedDay = pickedDay;

   setupExercise();
   model.state.startTimestamp = Date.now();
};

const controlAddSet = function () {
   model.state.formState.currentSet++;
   console.log(model.state.formState.currentSet);
   trackerView.renderNextSet();
};

const controlSuperset = function () {
   model.state.formState.isSuperset = true;
   trackerView.renderExercise();

   const { currentExercise } = model.state.formState;
   const planDay = model.state.plans[model.state.formState.pickedDay];
   if (currentExercise + 1 === planDay.length - 1) trackerView.addSubmitBtnAndNotes();
};

const controlSwap = function() {
   
}

const controlNextExercise = function () {
   // Save completed exercises data
   const exerciseData = trackerView.getFormData();
   model.updateFormData(exerciseData);

   // Update state for next exercise
   model.setNextExerciseData();

   // Render next exercise
   setupExercise();

   // If last exercise, remove next exercise button and add submit button
   const { currentExercise } = model.state.formState;
   const planDay = model.state.plans[model.state.formState.pickedDay];
   if (currentExercise === planDay.length - 1) trackerView.addSubmitBtnAndNotes();
};

const controlSubmit = function (formData) {
   model.updateFormData(formData);

   // Calculate time
   const finishTimestamp = Date.now();
   const startTime = new Date(model.state.startTimestamp).toLocaleTimeString();
   const finishTime = new Date(finishTimestamp).toLocaleTimeString();
   const date = new Date(finishTimestamp).toISOString();

   const diffInMs = finishTimestamp - model.state.startTimestamp;
   const hours = Math.floor(diffInMs / (1000 * 60 * 60));
   const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
   const workoutDuration = `${hours}hr ${minutes}min`;

   // Save session
   const sessionData = {
      workoutData: { ...model.state.formState.data },
      startTime,
      finishTime,
      date,
      workoutDuration,
      type: model.state.formState.pickedDay,
   };
   console.log(sessionData);
   model.saveSession(sessionData);

   trackerView.renderMessage();
};

const setupExercise = function () {
   const previousWorkout = model.state.workouts.findLast(workout => workout.type === model.state.formState.pickedDay);
   trackerView.render({ ...model.state, previousWorkout });
   model.state.formState.currentSet += 2;
};

const init = function () {
   pickDayView.addHandlerPickDay(controlPickDay);

   trackerView.addHandlerClick(controlSuperset, 'tracker__btn--superset');
   trackerView.addHandlerClick(controlAddSet, 'tracker__btn--next-set');
   trackerView.addHandlerClick(controlNextExercise, 'tracker__btn--next-exercise');

   trackerView.addHandlerSubmit(controlSubmit);
};

init();
