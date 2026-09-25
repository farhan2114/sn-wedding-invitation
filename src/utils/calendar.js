/**
 * Calendar utility for generating .ics downloads and Google Calendar links
 */

export const EVENT_DETAILS = {
  title: 'Sangeet & Cocktails — S | N',
  description: 'Join S & N for a night of music, celebration and love! Dress code: Indo-Western or Cocktail Attire.',
  location: 'Frisco Hall Event Center, Texas, U.S.A',
  mapsUrl: 'https://maps.google.com/?q=Frisco+Hall+Event+Center,+Texas',
  startDate: '20261121T190000',
  endDate: '20261122T010000',
  readableDate: 'Saturday, November 21, 2026',
  readableTime: '7:00 PM Onwards'
};

export function downloadIcsFile() {
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//S and N Wedding//Sangeet and Cocktails//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'SUMMARY:' + EVENT_DETAILS.title,
    'DESCRIPTION:' + EVENT_DETAILS.description,
    'LOCATION:' + EVENT_DETAILS.location,
    'DTSTART:20261121T190000',
    'DTEND:20261122T010000',
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-PT24H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: S | N Sangeet & Cocktails tomorrow!',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'SN-Sangeet-Cocktails.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

export function getGoogleCalendarUrl() {
  const base = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
  const text = encodeURIComponent(EVENT_DETAILS.title);
  const dates = '20261121T190000/20261122T010000';
  const details = encodeURIComponent(EVENT_DETAILS.description);
  const location = encodeURIComponent(EVENT_DETAILS.location);

  return `${base}&text=${text}&dates=${dates}&details=${details}&location=${location}`;
}
