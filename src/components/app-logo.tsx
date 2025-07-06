export const AppLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      width="28"
      height="28"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path 
        d="M 50,10 C 27.9,10 10,27.9 10,50 C 10,72.1 27.9,90 50,90 M 50,10 C 72.1,10 90,27.9 90,50 C 90,72.1 72.1,90 50,90"
        stroke="url(#logoGradient)"
        strokeWidth="12"
        fill="none"
        strokeLinecap="round"
        transform="rotate(45 50 50)"
      />
    </svg>
  );