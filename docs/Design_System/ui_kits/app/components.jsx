/* global React */
const { useState } = React;

// -----------------------------------------------------------------------
// Phone Frame (iPhone 12-ish, scaled to fit the page)
// -----------------------------------------------------------------------
function PhoneFrame({ children, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: 300, height: 620, borderRadius: 44,
        background: '#000', padding: 10,
        boxShadow: '0 10px 40px rgba(0,0,0,0.20), 0 2px 4px rgba(0,0,0,0.14)',
      }}>
        <div style={{
          width: '100%', height: '100%', borderRadius: 34,
          background: '#fff', overflow: 'hidden', position: 'relative',
          display: 'flex', flexDirection: 'column',
        }}>
          {children}
        </div>
      </div>
      {label && <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.58)', letterSpacing: '-0.01em' }}>{label}</div>}
    </div>
  );
}

function StatusBar({ dark }) {
  const color = dark ? '#fff' : 'rgba(0,0,0,0.87)';
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '14px 22px 6px', fontSize: 12, fontWeight: 600, color,
    }}>
      <span>8:18</span>
      <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center' }}>
        <span style={{ width: 14, height: 8, border: `1px solid ${color}`, borderRadius: 2, display: 'inline-block' }} />
      </span>
    </div>
  );
}

// -----------------------------------------------------------------------
// Tab bar — Home / Pay / Order / Gift / Other
// -----------------------------------------------------------------------
function TabBar({ current, onChange }) {
  const tabs = [
    { id: 'home',  label: 'Home',  icon: 'home' },
    { id: 'pay',   label: 'Pay',   icon: 'credit-card' },
    { id: 'order', label: 'Order', icon: 'shopping-bag' },
    { id: 'gift',  label: 'Gift',  icon: 'gift' },
    { id: 'other', label: 'Other', icon: 'more-horizontal' },
  ];
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
      borderTop: '1px solid rgba(0,0,0,0.08)', background: '#fff', padding: '6px 0 10px',
    }}>
      {tabs.map(t => {
        const active = current === t.id;
        return (
          <button key={t.id} onClick={() => onChange(t.id)} style={{
            border: 0, background: 'transparent', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            padding: '4px 0',
            color: active ? '#006241' : 'rgba(0,0,0,0.58)',
          }}>
            <i data-lucide={t.icon} style={{ width: 22, height: 22, strokeWidth: active ? 2.2 : 1.8 }} />
            <span style={{ fontSize: 10, fontWeight: active ? 700 : 500, letterSpacing: '-0.01em' }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// -----------------------------------------------------------------------
// Buttons + primitives
// -----------------------------------------------------------------------
function PillButton({ children, variant = 'primary', size = 'md', onClick, style, icon }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
    borderRadius: 50, border: '1px solid transparent', cursor: 'pointer',
    fontFamily: 'Inter, sans-serif', fontWeight: 600, letterSpacing: '-0.01em',
    transition: 'all 0.2s ease',
  };
  const sizes = {
    sm: { padding: '5px 12px', fontSize: 12 },
    md: { padding: '7px 16px', fontSize: 14 },
    lg: { padding: '12px 24px', fontSize: 15 },
  };
  const variants = {
    primary:     { background: '#00754A', color: '#fff', borderColor: '#00754A' },
    outline:     { background: 'transparent', color: '#00754A', borderColor: '#00754A' },
    black:       { background: '#000', color: '#fff', borderColor: '#000' },
    darkOutline: { background: 'transparent', color: 'rgba(0,0,0,0.87)', borderColor: 'rgba(0,0,0,0.87)' },
    onDarkFill:  { background: '#fff', color: '#00754A', borderColor: '#fff' },
    onDarkLine:  { background: 'transparent', color: '#fff', borderColor: '#fff' },
  };
  return (
    <button
      onClick={onClick}
      onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
      onMouseUp={e => e.currentTarget.style.transform = ''}
      onMouseLeave={e => e.currentTarget.style.transform = ''}
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
    >
      {icon && <i data-lucide={icon} style={{ width: 16, height: 16 }} />}
      {children}
    </button>
  );
}

function StarProgress({ current, target }) {
  const pct = Math.min(100, (current / target) * 100);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
        <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.58)', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
          {target - current}★ until <span style={{ color: '#cba258', fontWeight: 700 }}>Gold Level</span>
        </div>
        <div style={{ fontFamily: 'Lora, serif', fontSize: 16, color: '#006241', fontWeight: 500, whiteSpace: 'nowrap' }}>
          <span style={{ fontSize: 20, fontWeight: 600 }}>{current}</span>
          <span style={{ color: 'rgba(0,0,0,0.40)' }}>/{target}</span>
          <span style={{ color: '#cba258', marginLeft: 2 }}>★</span>
        </div>
      </div>
      <div style={{ height: 5, background: '#e7ece9', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ width: pct + '%', height: '100%', background: '#00754A', borderRadius: 999 }} />
      </div>
    </div>
  );
}

function MenuCard({ name, image, price }) {
  return (
    <div style={{ minWidth: 110, display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{
        width: 110, height: 110, borderRadius: 12,
        background: image, backgroundSize: 'cover', backgroundPosition: 'center',
        boxShadow: '0 0 0.5px rgba(0,0,0,0.14), 0 1px 1px rgba(0,0,0,0.24)',
      }} />
      <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.87)', lineHeight: 1.3, fontWeight: 500, letterSpacing: '-0.01em' }}>{name}</div>
      {price && <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.58)' }}>{price}</div>}
    </div>
  );
}

function TierBenefit({ title, subtitle, tiers }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 12, padding: 14,
      boxShadow: '0 0 0.5px rgba(0,0,0,0.14), 0 1px 1px rgba(0,0,0,0.24)',
      display: 'flex', gap: 12, alignItems: 'flex-start',
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 50,
        background: '#edebe9', flex: 'none',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#1E3932',
      }}>
        <i data-lucide="gift" style={{ width: 22, height: 22 }} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(0,0,0,0.87)', lineHeight: 1.4, letterSpacing: '-0.01em' }}>{title}</div>
        <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.58)', marginTop: 2, lineHeight: 1.4 }}>{subtitle}</div>
        <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
          {tiers.map(t => (
            <span key={t} style={{
              fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 50,
              letterSpacing: '0.02em',
              background: t === 'Gold' ? '#cba258' : t === 'Green' ? '#00754A' : '#edebe9',
              color: t === 'Gold' || t === 'Green' ? '#fff' : 'rgba(0,0,0,0.87)',
            }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PhoneFrame, StatusBar, TabBar, PillButton, StarProgress, MenuCard, TierBenefit });
