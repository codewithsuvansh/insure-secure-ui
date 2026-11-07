import { describe, expect, it } from 'vitest';
import { isValidMobile, normaliseMobile, quoteMessage, validateQuote, whatsappUrl } from '@/lib/whatsapp';

describe('whatsappUrl', () => {
  it('uses the client number and encodes the message', () => {
    const url = new URL(whatsappUrl('Hello & welcome\nLine two'));
    expect(url.origin + url.pathname).toBe('https://wa.me/917986108922');
    expect(url.searchParams.get('text')).toBe('Hello & welcome\nLine two');
  });
});

describe('mobile validation', () => {
  it.each(['9876543210', '+91 98765 43210', '09876543210', '91-9876543210'])('accepts %s', (value) => {
    expect(isValidMobile(value)).toBe(true);
  });
  it.each(['', '12345', '1234567890', '98765432101', 'abcdefghij'])('rejects %s', (value) => {
    expect(isValidMobile(value)).toBe(false);
  });
  it('normalises prefixes', () => {
    expect(normaliseMobile('+91 98765-43210')).toBe('9876543210');
  });
});

describe('quote form', () => {
  const good = { name: 'Asha', mobile: '9876543210', product: 'Car Insurance', city: 'Jalandhar' };
  it('passes a complete form', () => {
    expect(validateQuote(good, true)).toEqual({});
  });
  it('reports each missing field', () => {
    const errors = validateQuote({ name: '', mobile: '1', product: '', city: '' }, false);
    expect(Object.keys(errors).sort()).toEqual(['city', 'consent', 'mobile', 'name', 'product']);
  });
  it('builds a structured message and skips an empty note', () => {
    const text = quoteMessage({ ...good, note: '  ' });
    expect(text).toContain('Mobile: +91 9876543210');
    expect(text).toContain('Interested in: Car Insurance');
    expect(text).not.toContain('Details:');
  });
});
