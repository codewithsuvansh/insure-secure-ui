export interface ReminderInput {
  policyLabel: string;
  /** Renewal date as YYYY-MM-DD. */
  renewalDate: string;
  daysBefore: number;
  phoneDisplay: string;
  /** Used for the event's unique ID and timestamp, so tests stay deterministic. */
  now?: Date;
}

const compact = (date: Date) => date.toISOString().slice(0, 10).replace(/-/g, '');

const escapeText = (text: string) =>
  text.replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

/** Parses YYYY-MM-DD strictly, rejecting impossible dates such as 2026-02-31. */
export function parseDateOnly(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const [, y, m, d] = match;
  const date = new Date(Date.UTC(Number(y), Number(m) - 1, Number(d)));
  return date.toISOString().slice(0, 10) === value ? date : null;
}

/** Builds an iCalendar file with an all-day reminder ahead of the renewal date. */
export function buildReminderIcs({ policyLabel, renewalDate, daysBefore, phoneDisplay, now = new Date() }: ReminderInput): string {
  const renewal = parseDateOnly(renewalDate);
  if (!renewal) throw new Error(`Invalid renewal date: ${renewalDate}`);
  const start = new Date(renewal.getTime() - daysBefore * 86_400_000);
  const end = new Date(start.getTime() + 86_400_000);
  const stamp = now.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const summary = escapeText(`Renew ${policyLabel} by ${renewalDate}`);
  const description = escapeText(
    `Your ${policyLabel} renews on ${renewalDate}. Contact Insure Secure on ${phoneDisplay} to review it before it lapses.`,
  );
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Insure Secure//Renewal Reminder//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${renewalDate}-${daysBefore}-${now.getTime()}@insure-secure`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${compact(start)}`,
    `DTEND;VALUE=DATE:${compact(end)}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    `DESCRIPTION:${summary}`,
    'TRIGGER:PT9H',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
    '',
  ].join('\r\n');
}
