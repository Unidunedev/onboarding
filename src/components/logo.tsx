type LogoProps = {
  /** "completa": xícara + nome · "icone": só a xícara */
  variant?: "completa" | "icone";
  size?: number;
  animated?: boolean;
  className?: string;
};

/** Xícara com </> e vapor animado. As animações ficam em styles.css (classes udd-*). */
export function CoffeeMark({ size = 40, animated = true }: { size?: number; animated?: boolean }) {
  return (
    <svg
      className={animated ? "udd-mug" : undefined}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      aria-hidden="true"
    >
      {[42, 56, 70].map((x, i) => (
        <path
          key={x}
          className={animated ? `udd-steam udd-st${i + 1}` : undefined}
          d={`M${x} 44c-7-6 7-10 0-18`}
          fill="none"
          stroke="var(--caramel)"
          strokeWidth="6"
          strokeLinecap="round"
        />
      ))}
      <path d="M88 60h5a12 12 0 0 1 0 24h-5" fill="none" stroke="var(--espresso)" strokeWidth="7" />
      <path d="M22 52h66v30a22 22 0 0 1-22 22H44a22 22 0 0 1-22-22z" fill="var(--espresso)" />
      <path
        d="M45 67l-8 9 8 9M65 67l8 9-8 9M59 64l-9 24"
        fill="none"
        stroke="var(--background)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ variant = "completa", size = 40, animated = true, className }: LogoProps) {
  if (variant === "icone") return <CoffeeMark size={size} animated={animated} />;

  return (
    <span className={`udd-logo ${animated ? "" : "udd-static"} ${className ?? ""}`}>
      <CoffeeMark size={size} animated={animated} />
      <span className="udd-wordmark">
        <span className="udd-syl">uni</span>
        <span className="udd-syl udd-s2">dune</span>
        <span className="udd-syl udd-s3">dev</span>
        <span className="udd-caret">_</span>
      </span>
    </span>
  );
}
