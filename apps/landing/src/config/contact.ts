// Destino de conversão da página, definido uma única vez (RNF-LP-09, routes.md §2).
// Os valores vêm de PUBLIC_WHATSAPP_* no build; se ausentes, valem os do contrato.

const DEFAULT_NUMBER = '5521975140550';
const DEFAULT_MESSAGE =
  'Olá! Vim pelo site da Zarco e quero conversar sobre um caso da minha empresa.';

const env = import.meta.env as Record<string, string | undefined>;

const number = (env.PUBLIC_WHATSAPP_NUMBER ?? '').replace(/\D/g, '') || DEFAULT_NUMBER;
const message = (env.PUBLIC_WHATSAPP_MESSAGE ?? '').trim() || DEFAULT_MESSAGE;

// 5521975140550 → +55 21 97514-0550
function formatPhone(digits: string): string {
  const match = /^(\d{2})(\d{2})(\d{4,5})(\d{4})$/.exec(digits);
  return match ? `+${match[1]} ${match[2]} ${match[3]}-${match[4]}` : `+${digits}`;
}

export const contact = {
  number,
  message,
  href: `https://wa.me/${number}?text=${encodeURIComponent(message)}`,
  phone: formatPhone(number),
  label: 'Converse sobre o seu caso',
  accessibleSuffix: ' pelo WhatsApp',
} as const;
