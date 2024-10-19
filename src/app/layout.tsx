import './globals.css';
import React from 'react';
import type { Metadata } from 'next';
import { RemResizeScript } from '@/features/rem-resize';
import { cva } from 'class-variance-authority';
import Navbar from '@/widgets/navbar/ui/Navbar';

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// Шрифты
// const Roboto = localFont({
//   src: [
//     {
//       path: '../../public/fonts/Robotocondensed.woff2',
//       weight: '400',
//       style: 'normal',
//     },
//   ],
//   display: 'swap',
//   variable: '--base-font',
// });
// ? clsx(Roboto.variable) для body

export const metadata: Metadata = {
  title: 'Next.js Project',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, et',
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: any;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const cvaRoot = cva([
    'projectRoot-cvaRoot',
    'p-2',
    'w-full min-h-screen',
    'grid grid-cols-6 gap-4',
    'bg-rootGradient',
  ]);

  const cvaAside = cva(['col-span-1']);

  const cvaContent = cva([
    'bg-white bg-opacity-50 backdrop-blur-sm',
    'p-2',
    'rounded-xl',
    'overflow-y-scroll h-full',
  ]);

  return (
    <html lang="ru">
      <head>
        <RemResizeScript
          defaultFontSize={10}
          startScaleWidth={1440}
          endScaleTopWidth={1920}
          endScaleBottomWidth={1024}
        />
      </head>
      <body className={'overflow-y-clip'}>
        <div className={cvaRoot()} id="app">
          <div className={cvaAside()}>
            <Navbar />
          </div>
          <div className={'col-span-5 py-2 -mt-2 max-h-screen'}>
            <div className={cvaContent()}>{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
