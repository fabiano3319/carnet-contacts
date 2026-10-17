function Logo({ size = 44 }) {
  return (
    <div
      className="logo"
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.27,
        background: 'var(--accent, #f59e0b)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none"
        stroke="#121316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true">
        <path d="M4 4h12a2 2 0 0 1 2 2v14H6a2 2 0 0 1-2-2V4z" />
        <circle cx="11" cy="10" r="2.5" />
        <path d="M7 17c.6-2 2-3 4-3s3.4 1 4 3" />
        <path d="M20 8v8" />
      </svg>
    </div>
  )
}

export default Logo