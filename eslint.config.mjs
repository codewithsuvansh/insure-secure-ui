import next from 'eslint-config-next';

const config = [
  { ignores: ['.next/**', 'out/**', 'node_modules/**', 'next-env.d.ts', 'playwright-report/**', 'test-results/**'] },
  ...next,
  {
    rules: {
      // The site is a static export with pre-optimised WebP sets, so a plain <img> with srcset is correct.
      '@next/next/no-img-element': 'off',
    },
  },
];

export default config;
