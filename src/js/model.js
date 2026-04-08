export const state = {
   plans: {
      PP1: [
         { id: 'dumbell_bench_press', variations: ['incline'], canCombine: true },
         { id: 'incline_dumbell_rows' },
         { id: 'chest_flies', canCombine: true },
         { id: 'reverse_flies' },
         { id: 'incline_dumbell_curls', canCombine: true },
         { id: 'hanging_leg_raises', optional: true },
      ],
      L: [
         { id: 'smith_squats', variations: ['bar_squats'] },
         { id: 'hamstring_curls', canCombine: true },
         { id: 'quads_extensions' },
         { id: 'press_calf_raises', variations: ['standing_calf_raises'] },
         { id: 'hyperextensions', optional: true },
      ],
      PP2: [
         { id: 'pullups', canCombine: true },
         { id: 'barbell_shoulder_press' },
         { id: 'straight_arm_lat_pulldowns', canCombine: true },
         { id: 'cable_crunches', optional: true },
         { id: 'dumbell_lateral_raises', canCombine: true },
         { id: 'skullcrushers' },
      ],
   },
   formState: {
      pickedDay: null,
      currentSet: 0,
      currentExercise: 0,
      isSuperset: false,
      data: {},
   },
   startTimestamp: null,
   workouts: [],
};

export const setNextExerciseData = function () {
   const { formState } = state;

   formState.currentSet = 0;
   formState.isSuperset ? (formState.currentExercise += 2) : formState.currentExercise++;
   formState.isSuperset = false;
};

export const updateFormData = function (exerciseData) {
   state.formState.data = { ...exerciseData, ...state.formState.data };
   console.log(state.formState.data);
};
