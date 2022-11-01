import React from 'react';
import { Rubik } from '@next/font/google';
import './globals.css';

const rubik = Rubik();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={rubik.className}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <title>Todo App using Next.js + Tigris</title>
        <meta name="description" content="Tigris app tutorial" />
      </head>
      <body>{children}</body>
    </html>
  );
}
