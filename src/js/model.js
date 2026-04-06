const state = {
   plans: {
      PP1: [
         { id: 'dumbell_bench_press', variations: ['incline'], canCombine: true },
         { id: 'incline_dumbell_rows' },
         { id: 'chest_flies' },
         { id: 'reverse_flies' },
         { id: 'incline_dumbell_curls' },
         { id: 'hanging leg raises', optional: true },
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
         { id: 'straight_arm_lat_pulldowns' },
         { id: 'cable_crunches', optional: true },
         { id: 'dumbell_lateral_raises' },
         { id: 'skullcrushers' },
      ],
   },
   workouts: [],
};
