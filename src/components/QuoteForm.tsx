'use client';

import { CheckCircle2 } from 'lucide-react';
import { useId, useState, type FormEvent } from 'react';
import { categories, productsIn } from '@/content/catalog';
import { investments } from '@/content/investments';
import { isValidMobile, quoteMessage, validateQuote, whatsappUrl, type QuoteErrors } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

export function QuoteForm({ defaultProduct = '', compact = false }: { defaultProduct?: string; compact?: boolean }) {
  const id = useId();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [product, setProduct] = useState(defaultProduct);
  const [city, setCity] = useState('');
  const [note, setNote] = useState('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const details = { name, mobile, product, city, note };
    const found = validateQuote(details, consent);
    setErrors(found);
    const firstKey = Object.keys(found)[0];
    if (firstKey) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }
    const url = whatsappUrl(quoteMessage(details));
    setSentUrl(url);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  if (sentUrl) {
    return (
      <div role="status" className="rounded-2xl bg-leaf-50 p-6">
        <CheckCircle2 aria-hidden="true" className="size-9 text-leaf-600" />
        <h3 className="mt-3 text-2xl">One last step: press send in WhatsApp</h3>
        <p className="mt-2 text-muted">We have written your message. We only receive it after you send it from WhatsApp.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
            <WhatsAppIcon />
            Open WhatsApp again
          </a>
          <button type="button" className="btn btn-outline" onClick={() => setSentUrl(null)}>
            Edit my details
          </button>
        </div>
      </div>
    );
  }

  const errorProps = (key: keyof QuoteErrors) => ({
    'aria-invalid': errors[key] ? (true as const) : undefined,
    'aria-describedby': errors[key] ? `${id}-${key}-error` : undefined,
  });
  const errorText = (key: keyof QuoteErrors) =>
    errors[key] ? (
      <p id={`${id}-${key}-error`} className="field-error">
        {errors[key]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4" data-testid="quote-form">
      <div className={`grid gap-4 ${compact ? '' : 'sm:grid-cols-2'}`}>
        <div>
          <label htmlFor={`${id}-name`} className="field-label">Your name</label>
          <input id={`${id}-name`} name="name" autoComplete="name" className="field" value={name} onChange={(e) => setName(e.target.value)} {...errorProps('name')} />
          {errorText('name')}
        </div>
        <div>
          <label htmlFor={`${id}-mobile`} className="field-label">Mobile number</label>
          <input
            id={`${id}-mobile`}
            name="mobile"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="10-digit number"
            className="field"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            onBlur={() => mobile && setErrors((prev) => ({ ...prev, mobile: isValidMobile(mobile) ? undefined : 'Please enter a valid 10-digit Indian mobile number.' }))}
            {...errorProps('mobile')}
          />
          {errorText('mobile')}
        </div>
        <div>
          <label htmlFor={`${id}-product`} className="field-label">What do you need help with?</label>
          <select id={`${id}-product`} name="product" className="field" value={product} onChange={(e) => setProduct(e.target.value)} {...errorProps('product')}>
            <option value="">Choose one</option>
            {categories.map((c) => (
              <optgroup key={c.id} label={c.name}>
                {productsIn(c.id).map((p) => (
                  <option key={p.slug} value={p.name}>{p.name}</option>
                ))}
              </optgroup>
            ))}
            <optgroup label="Investments">
              {investments.map((i) => (
                <option key={i.slug} value={i.name}>{i.name}</option>
              ))}
            </optgroup>
            <option value="Not sure yet, please advise">Not sure yet, please advise</option>
          </select>
          {errorText('product')}
        </div>
        <div>
          <label htmlFor={`${id}-city`} className="field-label">City</label>
          <input id={`${id}-city`} name="city" autoComplete="address-level2" className="field" value={city} onChange={(e) => setCity(e.target.value)} {...errorProps('city')} />
          {errorText('city')}
        </div>
      </div>
      <div>
        <label htmlFor={`${id}-note`} className="field-label">
          Anything else? <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea id={`${id}-note`} name="note" rows={compact ? 2 : 3} className="field" value={note} onChange={(e) => setNote(e.target.value)} placeholder="For example, ages of family members, your vehicle model or your investment goal" />
      </div>
      <div>
        <label className="flex items-start gap-3 text-[0.95rem] text-muted">
          <input type="checkbox" name="consent" className="mt-1 size-5 shrink-0 accent-leaf-600" checked={consent} onChange={(e) => setConsent(e.target.checked)} {...errorProps('consent')} />
          I agree that Insure Secure may contact me about this enquiry by WhatsApp or phone.
        </label>
        {errorText('consent')}
      </div>
      <button type="submit" className="btn btn-whatsapp w-full sm:w-auto">
        <WhatsAppIcon />
        Continue on WhatsApp
      </button>
      <p className="text-sm text-muted">This site does not store your details. They go straight into a WhatsApp message that you can read before sending.</p>
    </form>
  );
}

