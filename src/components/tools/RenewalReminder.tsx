'use client';

import { CalendarPlus, CheckCircle2 } from 'lucide-react';
import { useId, useState, type FormEvent } from 'react';
import { site } from '@/content/site';
import { buildReminderIcs, parseDateOnly } from '@/lib/ics';
import { whatsappUrl } from '@/lib/whatsapp';
import { WhatsAppIcon } from '../icons';

const policyTypes = ['health insurance', 'car insurance', 'two-wheeler insurance', 'commercial vehicle insurance', 'home insurance', 'life insurance', 'travel insurance', 'business insurance', 'insurance policy'];

export function RenewalReminder() {
  const id = useId();
  const [policy, setPolicy] = useState('health insurance');
  const [date, setDate] = useState('');
  const [days, setDays] = useState(30);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function isValid() {
    if (!parseDateOnly(date)) {
      setError('Please choose your renewal date.');
      return false;
    }
    setError(null);
    return true;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isValid()) return;
    const ics = buildReminderIcs({ policyLabel: policy, renewalDate: date, daysBefore: days, phoneDisplay: site.phone.display });
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `renew-${policy.replace(/\s+/g, '-')}.ics`;
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 2000);
    setSaved(true);
  }

  const message = `Hello Insure Secure, my ${policy} renews on ${date || '[date]'}. Please remind me ${days} days before, so that I can review it.`;

  return (
    <form onSubmit={onSubmit} noValidate className="card rounded-[1.75rem] p-6 sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-policy`} className="field-label">Type of policy</label>
          <select id={`${id}-policy`} className="field capitalize" value={policy} onChange={(e) => setPolicy(e.target.value)}>
            {policyTypes.map((t) => (
              <option key={t} value={t}>{t === 'insurance policy' ? 'Other policy' : t}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-date`} className="field-label">Renewal date</label>
          <input
            id={`${id}-date`}
            type="date"
            className="field"
            value={date}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            onChange={(e) => { setDate(e.target.value); setSaved(false); setError(null); }}
          />
          {error && <p id={`${id}-error`} className="field-error">{error}</p>}
        </div>
      </div>
      <fieldset className="mt-6">
        <legend className="field-label">Remind me</legend>
        <div className="mt-1 flex flex-wrap gap-2">
          {[7, 15, 30, 60].map((d) => (
            <label key={d} className={`flex min-h-11 cursor-pointer items-center rounded-full border-[1.5px] px-4 font-semibold transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-leaf-500 ${days === d ? 'border-navy-900 bg-navy-900 text-white' : 'border-navy-900/25 text-navy-900 hover:border-navy-900'}`}>
              <input type="radio" name="days" value={d} checked={days === d} onChange={() => setDays(d)} className="sr-only" />
              {d} days before
            </label>
          ))}
        </div>
      </fieldset>
      <div className="mt-7 flex flex-wrap gap-3">
        <button type="submit" className="btn btn-navy">
          <CalendarPlus aria-hidden="true" className="size-5" />
          Add to my calendar
        </button>
        <a
          href={whatsappUrl(message)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => { if (!isValid()) e.preventDefault(); }}
          className="btn btn-whatsapp"
        >
          <WhatsAppIcon />
          Ask us to remind you
        </a>
      </div>
      {saved && (
        <p role="status" className="mt-5 flex items-start gap-2 rounded-2xl bg-leaf-50 p-4 font-medium text-navy-900">
          <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-leaf-600" />
          Your calendar file has downloaded. Open it to add the reminder to your calendar.
        </p>
      )}
      <p className="mt-5 text-sm text-muted">Your date stays on your device. It is only shared if you choose to send it to us on WhatsApp.</p>
    </form>
  );
}
