import * as model from './model';
import pickDayView from './views/pickDayView';
import trackerView from './views/trackerView';
import navView from './views/navView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import calendarView from './views/calendarView';

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
   setupExercise();

   const { currentExercise } = model.state.formState;
   const planDay = model.state.plans[model.state.formState.pickedDay];
   if (currentExercise + 1 === planDay.length - 1) trackerView.addSubmitBtnAndNotes();
};

const controlSwap = function (altExercise) {
   const { formState, plans } = model.state;

   // Swap main exercise and variation
   const isSwappingSupersetExercise =
      formState.isSuperset && plans[formState.pickedDay][formState.currentExercise + 1].variations?.[0] === altExercise;
   const index = isSwappingSupersetExercise ? formState.currentExercise + 1 : formState.currentExercise;

   const swap = plans[formState.pickedDay][index].id;
   plans[formState.pickedDay][index].id = altExercise;

   const swapIndex = plans[formState.pickedDay][index].variations.findIndex(variation => variation === altExercise);
   plans[formState.pickedDay][index].variations[swapIndex] = swap;

   setupExercise(false);
};

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

   trackerView.renderMessage(`Great job! 💪<br/> Workout time: ${workoutDuration}`);
};

const setupExercise = function (increaseSet = true) {
   const previousWorkout = model.state.workouts.findLast(workout => workout.type === model.state.formState.pickedDay);
   trackerView.render({ ...model.state, previousWorkout });
   if (model.state.formState.isSuperset) trackerView.hideSupersetBtn();
   if (increaseSet) model.state.formState.currentSet += 2;
};

const controlNav = function (view) {
   if (view === 'log') pickDayView.render(true);
   if (view === 'calendar') {
      calendarView.render(true);
      calendarView.setupCalendar().render();
   }
   // if (view === 'exercises')

   navView.toggleMenu();
};

const init = function () {
   pickDayView.addHandlerClick(controlPickDay, 'plan-day-picker__list-button', 'day');

   navView.addHandlerClick(controlNav, 'nav__list-link', 'view');

   trackerView.addHandlerClick(controlSuperset, 'tracker__btn--superset');
   trackerView.addHandlerClick(controlAddSet, 'tracker__btn--next-set');
   trackerView.addHandlerClick(controlNextExercise, 'tracker__btn--next-exercise');
   trackerView.addHandlerClick(controlSwap, 'variations-option', 'title');

   trackerView.addHandlerSubmit(controlSubmit);
};

init();
