import Link from 'next/link';

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <span className={light ? 'rounded-xl bg-white p-1.5' : ''}>
        <img src="/brand/emblem.webp" alt="" width={438} height={310} className="h-10 w-auto sm:h-11" />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.32rem] font-[650] tracking-tight sm:text-[1.5rem] ${light ? 'text-white' : 'text-navy-900'}`}>
          Insure <span className={light ? 'text-lime' : 'text-leaf-700'}>Secure</span>
        </span>
        <span className={`mt-1 text-[0.62rem] font-semibold tracking-[0.17em] uppercase sm:text-[0.68rem] ${light ? 'text-navy-100' : 'text-muted'}`}>
          Financial Services
        </span>
      </span>
    </Link>
  );
}
