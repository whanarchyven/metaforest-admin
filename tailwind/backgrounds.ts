import { CustomThemeConfig } from 'tailwindcss/types/config';

export const backgrounds: CustomThemeConfig['extend'] = {
  backgroundImage: {
    rootGradient:
      'linear-gradient(45deg, #A34EDF 0%, #557AFF 28%, #5FDBFF 82%, #E4FFBC 100%)',
  },
};
