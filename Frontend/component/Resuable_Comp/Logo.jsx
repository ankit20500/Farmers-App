import React from 'react';

function Logo({ variant = 'main', onClick }) {
  // Brand color representation
  const primaryGreen = '#1b4332';
  const natureGreen = '#2d6a4f';
  const accentYellow = '#ffb703';

  const SproutSvg = ({ size = 32 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      {/* Soil circle background */}
      <circle cx="16" cy="16" r="14" fill="#eaf7e3" />
      {/* Stem */}
      <path
        d="M16 26V13C16 11.3431 17.3431 10 19 10C20.6569 10 22 8.65685 22 7"
        stroke={natureGreen}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Left Leaf */}
      <path
        d="M16 16C12.5 16 9.5 13.5 10 9C13 9 15.5 12 16 16Z"
        fill={primaryGreen}
        stroke={primaryGreen}
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Right Leaf */}
      <path
        d="M16 12C19.5 12 22.5 9.5 22 5C19 5 16.5 8 16 12Z"
        fill={natureGreen}
        stroke={natureGreen}
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Small accent bud */}
      <circle cx="16" cy="20" r="2.5" fill={accentYellow} />
    </svg>
  );

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: onClick ? 'pointer' : 'default',
    userSelect: 'none'
  };

  const textStyle = {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 800,
    fontSize: '22px',
    letterSpacing: '-0.5px',
    background: `linear-gradient(135deg, ${primaryGreen} 0%, ${natureGreen} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'inline-block'
  };

  const martStyle = {
    color: accentYellow,
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 800,
    fontSize: '22px'
  };

  if (variant === 'icon') {
    return <div onClick={onClick} style={{ display: 'inline-flex', cursor: onClick ? 'pointer' : 'default' }}><SproutSvg size={36} /></div>;
  }

  if (variant === 'mobile') {
    return (
      <div onClick={onClick} style={containerStyle}>
        <SproutSvg size={28} />
        <span style={{ ...textStyle, fontSize: '18px' }}>
          Krishi<span style={{ color: natureGreen }}>Mart</span>
        </span>
      </div>
    );
  }

  if (variant === 'favicon') {
    return <SproutSvg size={16} />;
  }

  // Default 'main' variant
  return (
    <div onClick={onClick} style={containerStyle} className="logo-main-container">
      <SproutSvg size={38} />
      <span style={textStyle}>
        Krishi<span style={{ color: natureGreen }}>-Mart</span>
      </span>
    </div>
  );
}

export default Logo;
