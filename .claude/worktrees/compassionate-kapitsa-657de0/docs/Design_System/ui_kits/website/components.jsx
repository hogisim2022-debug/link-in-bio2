/* global React */
const { useState } = React;

function TopJoinStrip() {
  return (
    <div style={{ background: '#000', color: '#fff', padding: '10px 40px', display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, letterSpacing: '-0.01em' }}>
      <span style={{ fontWeight: 600 }}>It's Rewards o'clock.</span>
      <span style={{ color: 'rgba(255,255,255,0.7)' }}>Earn Stars and redeem them for free food and drinks.</span>
      <button style={{ marginLeft: 'auto', background: '#fff', color: '#000', border: 0, borderRadius: 50, padding: '6px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>Join now</button>
    </div>
  );
}

function GlobalNav() {
  return (
    <nav style={{
      background: '#fff', padding: '16px 40px',
      display: 'flex', alignItems: 'center', gap: 28,
      boxShadow: '0 1px 3px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.06), 0 0 2px rgba(0,0,0,0.07)',
      position: 'sticky', top: 0, zIndex: 10,
    }}>
      <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#006241', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg viewBox="0 0 48 48" width="32" height="32"><g fill="#fff"><path d="M24 8 L26 15 L33 15 L27.5 19.5 L30 26 L24 22 L18 26 L20.5 19.5 L15 15 L22 15 Z"/><circle cx="24" cy="28" r="10" fill="none" stroke="#fff" strokeWidth="2"/></g></svg>
      </div>
      <div style={{ display: 'flex', gap: 22, fontSize: 15, fontWeight: 600, color: 'rgba(0,0,0,0.87)', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Menu</a>
        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Rewards</a>
        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Gift Cards</a>
      </div>
      <div style={{ flex: 1 }} />
      <a href="#" style={{ fontSize: 13, fontWeight: 600, color: 'rgba(0,0,0,0.87)', textDecoration: 'none', display: 'inline-flex', gap: 4, alignItems: 'center', letterSpacing: '-0.01em' }}>
        <i data-lucide="map-pin" style={{ width: 16, height: 16 }} /> Find a store
      </a>
      <button style={{ background: 'transparent', color: 'rgba(0,0,0,0.87)', border: '1px solid rgba(0,0,0,0.87)', borderRadius: 50, padding: '6px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>Sign in</button>
      <button style={{ background: '#000', color: '#fff', border: '1px solid #000', borderRadius: 50, padding: '6px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>Join now</button>
    </nav>
  );
}

function Hero() {
  return (
    <section style={{ background: '#f2f0eb', padding: '64px 40px', display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 40, alignItems: 'center' }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#00754A', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Afternoon menu</div>
        <h1 style={{ fontSize: 54, lineHeight: 1.05, fontWeight: 700, color: 'rgba(0,0,0,0.87)', letterSpacing: '-0.8px', margin: 0 }}>
          Pick-me-ups,<br/>handcrafted for<br/>your 3 p.m.
        </h1>
        <p style={{ fontSize: 18, color: 'rgba(0,0,0,0.70)', maxWidth: 440, marginTop: 20, lineHeight: 1.5, letterSpacing: '-0.01em' }}>
          From espresso classics to icy Refreshers, our afternoon lineup is ready whenever you are.
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
          <button className="sb-btn sb-btn--primary" style={{ padding: '10px 20px', fontSize: 15 }}>Explore our afternoon menu</button>
          <button className="sb-btn sb-btn--outline" style={{ padding: '10px 20px', fontSize: 15 }}>Start an order</button>
        </div>
      </div>
      <div style={{
        width: '100%', aspectRatio: '1 / 1', maxWidth: 380, justifySelf: 'center',
        background: 'radial-gradient(circle at 40% 30%, #ffc6d7 0%, #ff7aa8 55%, #c03865 100%)',
        borderRadius: '50% 44% 52% 48% / 42% 58% 44% 56%',
        boxShadow: '0 30px 60px -20px rgba(192,56,101,0.35), 0 4px 14px rgba(0,0,0,0.10)',
      }} />
    </section>
  );
}

function FeatureBand() {
  return (
    <section style={{ background: '#1E3932', color: '#fff', padding: '64px 40px', display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 40, alignItems: 'center' }}>
      <div>
        <h2 style={{ fontSize: 44, lineHeight: 1.1, fontWeight: 700, letterSpacing: '-0.5px', margin: 0, maxWidth: 540, color: '#fff' }}>
          Free coffee is just the beginning.
        </h2>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.70)', maxWidth: 460, marginTop: 18, lineHeight: 1.5, letterSpacing: '-0.01em' }}>
          Join Starbucks<sup>®</sup> Rewards to earn Stars for free food and drinks, any way you pay.
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          <button className="sb-btn sb-btn--on-dark-filled" style={{ padding: '10px 20px', fontSize: 15 }}>Join now</button>
          <button className="sb-btn sb-btn--on-dark-outline" style={{ padding: '10px 20px', fontSize: 15 }}>Learn more</button>
        </div>
      </div>
      <div style={{
        width: '100%', aspectRatio: '4 / 5', maxWidth: 300, justifySelf: 'center',
        background: 'linear-gradient(160deg, #2b5148 0%, #1E3932 50%, #cba258 180%)',
        borderRadius: 18, boxShadow: '0 20px 40px rgba(0,0,0,0.30)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Lora, serif', fontStyle: 'italic', color: '#cba258', fontSize: 22,
      }}>Starbucks App</div>
    </section>
  );
}

function RewardsTiers() {
  const tiers = [
    { name: 'Welcome', color: '#d4e9e2', text: '#1E3932', stars: '0★', desc: 'Start earning instantly.', items: ['Free birthday reward', 'Handcrafted offers'] },
    { name: 'Green',   color: '#00754A', text: '#fff', stars: '25–200★', desc: 'You\'re brewing Stars.', items: ['Free refills on brewed coffee', 'Order ahead & pick up'] },
    { name: 'Gold',    color: '#cba258', text: '#1E3932', stars: '200★+', desc: 'Every Star earns more.', items: ['Free drinks, food & merch', 'Double-Star days'] },
  ];
  return (
    <section style={{ background: '#f2f0eb', padding: '64px 40px' }}>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <h2 style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: 42, color: '#006241', fontWeight: 500, letterSpacing: '-0.5px', margin: 0 }}>Earn your way to Gold.</h2>
        <p style={{ fontSize: 16, color: '#33433d', marginTop: 10, letterSpacing: '-0.01em' }}>Every 1 Star you earn moves you closer.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, maxWidth: 1100, margin: '0 auto' }}>
        {tiers.map(t => (
          <div key={t.name} style={{ background: '#1E3932', color: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 0 0.5px rgba(0,0,0,0.14), 0 1px 1px rgba(0,0,0,0.24)' }}>
            <div style={{ background: t.color, color: t.text, padding: '14px 20px', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {t.name} · {t.stars}
            </div>
            <div style={{ padding: '24px 22px' }}>
              <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.2px' }}>{t.desc}</div>
              <ul style={{ margin: '16px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {t.items.map(i => (
                  <li key={i} style={{ fontSize: 14, color: 'rgba(255,255,255,0.86)', display: 'flex', gap: 8, alignItems: 'flex-start', letterSpacing: '-0.01em' }}>
                    <span style={{ color: '#cba258' }}>★</span> {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function GiftGrid() {
  const cards = [
    { label: 'Spring',        grad: 'linear-gradient(135deg, #d4e9e2 0%, #00754A 100%)', subhead: 'in bloom' },
    { label: 'Thank You',     grad: 'linear-gradient(135deg, #dfc49d 0%, #cba258 100%)', subhead: 'a little something' },
    { label: 'Birthday',      grad: 'linear-gradient(135deg, #ffc6d7 0%, #c03865 100%)', subhead: 'celebrate small' },
    { label: 'Mother\'s Day', grad: 'linear-gradient(135deg, #f5deb3 0%, #e8b98a 100%)', subhead: 'for Mom' },
    { label: 'Anytime',       grad: 'linear-gradient(135deg, #1E3932 0%, #2b5148 100%)', subhead: 'just because' },
  ];
  return (
    <section style={{ background: '#edebe9', padding: '64px 40px' }}>
      <h2 style={{ fontSize: 28, fontWeight: 600, color: 'rgba(0,0,0,0.87)', letterSpacing: '-0.3px', margin: '0 0 28px', maxWidth: 1100, marginLeft: 'auto', marginRight: 'auto' }}>Gift Cards</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, maxWidth: 1100, margin: '0 auto' }}>
        {cards.map(c => (
          <div key={c.label} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{
              aspectRatio: '1.58 / 1', borderRadius: 10, background: c.grad,
              boxShadow: '0 2px 4px rgba(0,0,0,0.08), 0 0 1px rgba(0,0,0,0.14)',
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 14,
              color: c.label === 'Anytime' ? '#cba258' : '#1E3932',
            }}>
              <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, opacity: 0.8 }}>{c.label}</div>
              <div style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: 17, fontWeight: 500 }}>{c.subhead}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: '#1E3932', color: '#fff', padding: '56px 40px 40px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40 }}>
        {[
          { h: 'About Us', l: ['Our Company', 'Our Coffee', 'Stories and News', 'Investor Relations', 'Customer Service'] },
          { h: 'Careers', l: ['Culture and Values', 'Inclusion & Diversity', 'College Achievement Plan'] },
          { h: 'Social Impact', l: ['People', 'Planet', 'Environmental and Social Impact'] },
          { h: 'For Business Partners', l: ['Landlord Support Center', 'Suppliers', 'Corporate Gift Cards'] },
        ].map(col => (
          <div key={col.h}>
            <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 16 }}>{col.h}</div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {col.l.map(i => (
                <li key={i} style={{ fontSize: 13, color: 'rgba(255,255,255,0.70)', letterSpacing: '-0.01em' }}>{i}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1100, margin: '40px auto 0', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.15)', fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>
        © 2026 Starbucks Coffee Company. All rights reserved. · <span style={{ color: '#cba258' }}>★</span> Rewards
      </div>
    </footer>
  );
}

function FrapButton() {
  return (
    <button aria-label="Order"
      onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.95)'; e.currentTarget.style.boxShadow = '0 0 6px rgba(0,0,0,0.24), 0 8px 12px rgba(0,0,0,0)'; }}
      onMouseUp={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 0 6px rgba(0,0,0,0.24), 0 8px 12px rgba(0,0,0,0.14)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 0 6px rgba(0,0,0,0.24), 0 8px 12px rgba(0,0,0,0.14)'; }}
      style={{
        position: 'fixed', right: 24, bottom: 24, width: 56, height: 56, borderRadius: '50%',
        background: '#00754A', color: '#fff', border: 0, cursor: 'pointer',
        boxShadow: '0 0 6px rgba(0,0,0,0.24), 0 8px 12px rgba(0,0,0,0.14)',
        transition: 'all 0.2s ease',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', zIndex: 20,
      }}>
      <i data-lucide="shopping-bag" style={{ width: 22, height: 22 }} />
    </button>
  );
}

function SiteApp() {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em', background: '#f2f0eb', minHeight: '100vh' }}>
      <TopJoinStrip />
      <GlobalNav />
      <Hero />
      <FeatureBand />
      <RewardsTiers />
      <GiftGrid />
      <Footer />
      <FrapButton />
    </div>
  );
}

window.SiteApp = SiteApp;
