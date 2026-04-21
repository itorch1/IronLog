import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { View } from './view';

class CalendarView extends View {
   _parentElement = document.querySelector('.container');
   _calendar;

   setupCalendar(eventsData) {
      const calendarEl = document.querySelector('.calendar');

      this._calendar = new Calendar(calendarEl, {
         plugins: [dayGridPlugin, interactionPlugin],
         initialView: 'dayGridMonth',

         headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth',
         },

         events: eventsData,

         eventClick: function (info) {
            // info.event.extendedProps contains any extra data you passed
            const workoutDate = info.event.start;
            // This handler will be defined in the controller
            this._handlerEventClick(workoutDate);
         }.bind(this),
      });

      this._calendar.render();
   }

   _generateMarkup() {
      return `
        <section class="section-calendar">
            <h1>Calendar</h1>
            <div class="calendar"></div>
        </section>
        `;
   }

   addHandlerEventClick(handler) {
      this._handlerEventClick = handler;
   }
}

export default new CalendarView();
