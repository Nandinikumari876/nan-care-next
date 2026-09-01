export default function Logo({ size = 34, showWordmark = true, dark = false }) {
  const wordColor = dark ? '#F4EFE2' : '#24443B';

  return (
    <span className="logo-mark" style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="32" cy="32" r="32" fill="#24443B" />
        <path
          d="M14 42C14 25 21.5 13 32 13C42.5 13 50 25 50 42"
          stroke="#F1EADB"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M21 43C21 30 25.8 21 32 21C38.2 21 43 30 43 43"
          stroke="#C89B3C"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="32" cy="39" r="7.5" fill="#C97268" />
        <circle cx="32" cy="39" r="7.5" stroke="#24443B" strokeWidth="1" fill="#C97268" />
      </svg>
      {showWordmark && (
        <span
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 600,
            fontSize: size * 0.68,
            letterSpacing: '0.1px',
            color: wordColor,
          }}
        >
          Nan&nbsp;Care
        </span>
      )}
    </span>
  );
}
