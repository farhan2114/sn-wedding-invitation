/**
 * RSVP Service for syncing submissions with Google Sheets
 * 
 * HOW TO CONNECT YOUR GOOGLE SHEET:
 * 1. Open your Google Sheet.
 * 2. Go to Extensions > Apps Script and paste the code from `google-sheets-script.js`.
 * 3. Click Deploy > New deployment > Select type: Web app.
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the Web App URL and paste it below into GOOGLE_SHEETS_WEBHOOK_URL
 *    (or add it to your .env file as VITE_GOOGLE_SHEETS_URL).
 */

export const GOOGLE_SHEETS_WEBHOOK_URL = 
  import.meta.env.VITE_GOOGLE_SHEETS_URL || '';

export async function submitRsvp(formData) {
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  const submission = {
    timestamp,
    firstName: formData.firstName.trim(),
    lastName: formData.lastName.trim(),
    fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
    email: formData.email.trim(),
    attending: formData.attending === 'yes' ? 'Yes' : 'No',
    adults: formData.attending === 'yes' ? Number(formData.guests || 1) : 0,
    children: formData.attending === 'yes' ? Number(formData.children || 0) : 0,
    totalGuests: formData.attending === 'yes' ? (Number(formData.guests || 1) + Number(formData.children || 0)) : 0,
    dietary: formData.attending === 'yes' ? (formData.dietary === 'non-veg' ? 'Non-Veg' : 'Vegetarian') : 'N/A',
    wishes: formData.wishes ? formData.wishes.trim() : ''
  };

  // 1. Always save a local copy in browser storage as a reliable safety backup
  try {
    const existing = JSON.parse(localStorage.getItem('sn_wedding_rsvp') || '[]');
    existing.push({ ...submission, rawFormData: formData });
    localStorage.setItem('sn_wedding_rsvp', JSON.stringify(existing));
  } catch (err) {
    console.error('LocalStorage backup error:', err);
  }

  // 2. If Google Sheets Webhook URL is set, send the submission
  if (GOOGLE_SHEETS_WEBHOOK_URL && GOOGLE_SHEETS_WEBHOOK_URL.trim() !== '') {
    try {
      // Use text/plain with no-cors to avoid CORS preflight issues with Google Apps Script
      await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(submission)
      });
      return { success: true, synced: true };
    } catch (err) {
      console.warn('Google Sheets sync warning (data is safely saved locally):', err);
      return { success: true, synced: false };
    }
  }

  return { success: true, synced: false };
}
