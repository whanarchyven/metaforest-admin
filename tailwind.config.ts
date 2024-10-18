import type { Config } from 'tailwindcss';
import { colors } from './tailwind/colors';
import { typography } from './tailwind/typography';
import { spacing } from './tailwind/spacing';
import { screens } from './tailwind/screens';
import { columns } from './tailwind/columns';
import { plugins } from './tailwind/plugins';
import { animations } from './tailwind/animations';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      ...colors,
      ...typography,
      ...animations,
    },
    ...spacing,
    ...screens,
    ...columns,
    aspectRatio: {
      auto: 'auto',
      square: '1 / 1',
      169: '16 / 9',
    },
  },
  ...plugins,
};

export default config;
