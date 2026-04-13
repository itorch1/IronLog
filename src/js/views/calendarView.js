import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { View } from './view';

class CalendarView extends View {
   _parentElement = document.querySelector('.container');

   setupCalendar() {
      const calendarEl = document.querySelector('.calendar');

      return new Calendar(calendarEl, {
         plugins: [dayGridPlugin, interactionPlugin],
         initialView: 'dayGridMonth',

         headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth',
         },

         dateClick: function (info) {
            console.log('Clicked date: ' + info.dateStr);
            loadAppData(info.dateStr);
         },
      });

   }

   _generateMarkup() {
      return `
        <section class="section-calendar">
            <h1>Calendar</h1>
            <div class="calendar"></div>
        </section>
        `;
   }
}

export default new CalendarView();
