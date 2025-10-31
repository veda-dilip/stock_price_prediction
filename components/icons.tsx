import React from 'react';

export const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

export const BrainCircuitIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 12a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 12h.008v.008h-.008V12zm4.5 0h.008v.008h-.008V12zm-2.25 4.5a.75.75 0 00-1.5 0v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008zm-3.75-1.5a.75.75 0 00-1.5 0v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008zm-1.5-3.75a.75.75 0 00-1.5 0v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008zM12 21a8.967 8.967 0 01-6.33-2.67c-1.252-1.252-1.98-2.94-1.98-4.72 0-3.324 2.686-6.01 6.01-6.01s6.01 2.686 6.01 6.01c0 1.78-.728 3.468-1.98 4.72A8.967 8.967 0 0112 21z" />
    </svg>
);

export const ChartIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1.5-1.5m1.5 1.5l1.5-1.5m3 3l-1.5-1.5m1.5 1.5l1.5-1.5m0-3l-1.5-1.5m1.5 1.5l1.5-1.5m-13.5 0l1.5-1.5m-1.5 1.5l-1.5-1.5" />
    </svg>
);

export const ArrowUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M7 14l5-5 5 5H7z" />
    </svg>
);

export const ArrowDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M7 10l5 5 5-5H7z" />
    </svg>
);
