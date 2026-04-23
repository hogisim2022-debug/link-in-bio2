/* global React, PhoneFrame, StatusBar, TabBar, PillButton, StarProgress, MenuCard, TierBenefit */
const { useState, useEffect } = React;

// --------------- DRINKS: photographic gradient stand-ins ---------------
const DRINK_CAPPUCCINO = 'radial-gradient(circle at 60% 35%, #f6d7b0 0%, #8a5a3c 60%, #3d2518 100%)';
const DRINK_ICED_AMER  = 'radial-gradient(circle at 50% 40%, #6b3b22 0%, #2a130a 70%), url()';
const DRINK_COLD_BREW  = 'radial-gradient(circle at 55% 35%, #5d3520 0%, #1c0d06 80%)';
const DRINK_PINK       = 'radial-gradient(circle at 50% 40%, #ffb8d0 0%, #ff6a9e 60%, #b33a63 100%)';
const DRINK_MATCHA     = 'radial-gradient(circle at 50% 40%, #d2e7a0 0%, #6a8a38 70%)';

// -------------------- SCREEN: HOME --------------------
function HomeScreen() {
  return (
    <div style={{ flex: 1, overflow: 'auto', background: '#fff', display: 'flex', flexDirection: 'column' }}>
      <StatusBar />

      {/* Hero greeting over cream */}
      <div style={{
        padding: '12px 20px 22px',
        background: 'linear-gradient(180deg, #f8ece0 0%, #f4e4d0 100%)',
        position: 'relative',
      }}>
        <div style={{ fontSize: 18, fontWeight: 600, color: 'rgba(0,0,0,0.87)', lineHeight: 1.25, letterSpacing: '-0.3px' }}>
          덥덥아이티님과 함께
        </div>
        <div style={{ fontFamily: 'Lora, serif', fontSize: 26, fontStyle: 'italic', fontWeight: 500, color: 'rgba(0,0,0,0.87)', lineHeight: 1.1, marginTop: 2, whiteSpace: 'nowrap' }}>
          Dream Away<span style={{ color: '#cba258', fontStyle: 'normal' }}>✨</span>
        </div>

        <div style={{ marginTop: 26 }}>
          <StarProgress current={9} target={30} />
        </div>

        <div style={{ display: 'flex', gap: 18, marginTop: 16, color: 'rgba(0,0,0,0.87)', fontSize: 12 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <i data-lucide="sparkles" style={{ width: 14, height: 14 }} /> What's New
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <i data-lucide="ticket" style={{ width: 14, height: 14 }} /> Coupon
          </span>
          <span style={{ marginLeft: 'auto' }}>
            <i data-lucide="bell" style={{ width: 16, height: 16 }} />
          </span>
        </div>
      </div>

      {/* Recommended menu */}
      <div style={{ padding: '18px 20px 10px', background: '#fff' }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: 'rgba(0,0,0,0.87)', letterSpacing: '-0.01em' }}>
          <span style={{ color: '#00754A' }}>덥덥아이티</span>님을 위한 추천 메뉴
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 12, overflowX: 'auto', paddingBottom: 4 }}>
          <MenuCard name="디카페인 카페 아메리카노" image={DRINK_CAPPUCCINO} />
          <MenuCard name="아이스 디카페인 카페 아메리카노" image={DRINK_ICED_AMER} />
          <MenuCard name="카페 라떼" image={DRINK_COLD_BREW} />
          <MenuCard name="아이스 돌체 라떼" image={DRINK_MATCHA} />
        </div>
      </div>

      {/* Delivers promo card */}
      <div style={{ padding: '8px 20px 20px' }}>
        <div style={{
          position: 'relative', borderRadius: 12, overflow: 'hidden',
          background: 'linear-gradient(135deg, #f5deb3 0%, #e8b98a 45%, #f2d2a5 100%)',
          padding: '16px 18px', minHeight: 96, display: 'flex', flexDirection: 'column', justifyContent: 'center',
          boxShadow: '0 0 0.5px rgba(0,0,0,0.14), 0 1px 1px rgba(0,0,0,0.24)',
        }}>
          <div style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', fontWeight: 500, fontSize: 20, color: '#8a4b2a', letterSpacing: '0.3px' }}>
            DREAM AWAY
          </div>
          <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.76)', marginTop: 4, lineHeight: 1.4, maxWidth: 160 }}>
            스타벅스에서 즐기는 달콤한 봄의 맛을 즐겨보세요!
          </div>
          {/* Delivers pill floating right */}
          <button style={{
            position: 'absolute', right: 14, bottom: 14,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: '#1E3932', color: '#fff', border: 0, borderRadius: 50,
            padding: '10px 16px', fontSize: 13, fontWeight: 600, letterSpacing: '-0.01em',
            boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
          }}>
            <i data-lucide="shopping-bag" style={{ width: 14, height: 14 }} /> Delivers
          </button>
        </div>
      </div>
    </div>
  );
}

// -------------------- SCREEN: REWARDS --------------------
function RewardsScreen() {
  const [tab, setTab] = useState('my');
  return (
    <div style={{ flex: 1, overflow: 'auto', background: '#fff', display: 'flex', flexDirection: 'column' }}>
      <StatusBar />

      {/* Header */}
      <div style={{ padding: '6px 16px 0', display: 'flex', alignItems: 'center' }}>
        <i data-lucide="chevron-left" style={{ width: 24, height: 24, color: 'rgba(0,0,0,0.87)' }} />
      </div>
      <div style={{ padding: '8px 20px 14px' }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: 'rgba(0,0,0,0.87)', letterSpacing: '-0.4px' }}>
          Starbucks<sup style={{ fontSize: 12 }}>®</sup> Rewards
        </h1>
      </div>

      {/* Sub-tabs */}
      <div style={{ display: 'flex', gap: 18, padding: '0 20px', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        {['My Rewards', 'How it works'].map((t, i) => {
          const id = i === 0 ? 'my' : 'how';
          const active = id === tab;
          return (
            <button key={id} onClick={() => setTab(id)} style={{
              border: 0, background: 'transparent', padding: '10px 0',
              fontSize: 14, fontWeight: active ? 700 : 500,
              color: active ? 'rgba(0,0,0,0.87)' : 'rgba(0,0,0,0.58)',
              borderBottom: active ? '2px solid #00754A' : '2px solid transparent',
              cursor: 'pointer', letterSpacing: '-0.01em',
            }}>{t}</button>
          );
        })}
      </div>

      {/* My Rewards content */}
      <div style={{ padding: '18px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'Lora, serif', fontSize: 32, color: '#006241', fontWeight: 500 }}>
            9<span style={{ color: 'rgba(0,0,0,0.40)', fontStyle: 'normal' }}>/30</span>
            <span style={{ color: '#cba258', marginLeft: 4 }}>★</span>
          </div>
          <PillButton variant="outline" size="sm">별 히스토리</PillButton>
        </div>

        <div style={{ height: 6, background: '#e7ece9', borderRadius: 999, overflow: 'hidden', marginTop: 12 }}>
          <div style={{ width: '30%', height: '100%', background: '#00754A' }} />
        </div>

        <div style={{ background: '#edebe9', borderRadius: 12, padding: '10px 14px', marginTop: 14, fontSize: 12, color: 'rgba(0,0,0,0.76)', lineHeight: 1.4 }}>
          Gold Level까지 <b style={{ color: '#006241' }}>21잔의 별</b>이 남았습니다.
          <div style={{ fontSize: 10, color: 'rgba(0,0,0,0.50)', marginTop: 4 }}>
            회원 등급 변경 및 쿠폰 발행은 최대 24시간 이내 반영됩니다.
          </div>
        </div>

        <div style={{ marginTop: 20, fontSize: 13, color: 'rgba(0,0,0,0.76)', fontWeight: 600 }}>멤버십 등급</div>
        <div style={{ fontFamily: 'Lora, serif', fontSize: 30, color: '#00754A', fontWeight: 500, fontStyle: 'italic', marginTop: 4, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          Green Level <i data-lucide="chevron-down" style={{ width: 22, height: 22 }} />
        </div>

        <div style={{ marginTop: 16, fontSize: 13, fontWeight: 600, color: 'rgba(0,0,0,0.76)' }}>등급별 혜택</div>
        <div style={{ display: 'flex', gap: 20, marginTop: 8, marginBottom: 14, borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
          {['Welcome', 'Green', 'Gold'].map((t, i) => (
            <div key={t} style={{
              padding: '6px 0',
              fontSize: 13,
              fontWeight: t === 'Green' ? 700 : 500,
              color: t === 'Green' ? 'rgba(0,0,0,0.87)' : 'rgba(0,0,0,0.58)',
              borderBottom: t === 'Green' ? '2px solid #00754A' : 'none',
              marginBottom: -1,
            }}>{t}</div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 20 }}>
          <TierBenefit title="생일 쿠폰 발행" subtitle="생일자에게 음료 쿠폰이 발행됩니다" tiers={['Gold', 'Green']} />
          <TierBenefit title="250g 원두 또는 12개입 VIA 구매시, 카페 아메리카노 (Hot/Iced) 쿠폰" subtitle="홈카페를 위한 작은 선물" tiers={['Gold', 'Green']} />
        </div>
      </div>
    </div>
  );
}

// -------------------- SCREEN: ORDER --------------------
function OrderScreen() {
  return (
    <div style={{ flex: 1, overflow: 'auto', background: '#f2f0eb', display: 'flex', flexDirection: 'column' }}>
      <StatusBar />
      <div style={{ padding: '8px 20px 14px', background: '#fff' }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 600, color: '#006241', letterSpacing: '-0.3px' }}>
          Order
        </h1>
      </div>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ background: '#1E3932', color: '#fff', borderRadius: 12, padding: 18 }}>
          <div style={{ fontSize: 11, color: '#cba258', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Featured</div>
          <div style={{ fontSize: 18, fontWeight: 600, marginTop: 4, letterSpacing: '-0.2px' }}>Pink Energy Drink</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.70)', marginTop: 6, lineHeight: 1.4 }}>
            A sparkling refresher with caffeine from green coffee extract.
          </div>
          <div style={{ marginTop: 12 }}>
            <PillButton variant="onDarkFill" size="sm">Start an order</PillButton>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { label: 'Hot Coffees', icon: 'coffee' },
            { label: 'Cold Coffees', icon: 'glass-water' },
            { label: 'Refreshers', icon: 'leaf' },
            { label: 'Food', icon: 'cookie' },
          ].map(c => (
            <div key={c.label} style={{
              background: '#fff', borderRadius: 12, padding: 14,
              boxShadow: '0 0 0.5px rgba(0,0,0,0.14), 0 1px 1px rgba(0,0,0,0.24)',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{ width: 36, height: 36, borderRadius: 50, background: '#edebe9', display:'inline-flex', alignItems:'center', justifyContent:'center', color: '#00754A' }}>
                <i data-lucide={c.icon} style={{ width: 18, height: 18 }} />
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(0,0,0,0.87)', letterSpacing: '-0.01em' }}>{c.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// -------------------- APP SHELL --------------------
function App() {
  const [tab, setTab] = useState('home');
  useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

  const screens = { home: HomeScreen, pay: HomeScreen, order: OrderScreen, gift: OrderScreen, other: OrderScreen };
  const Rewards = RewardsScreen;

  return (
    <div style={{
      minHeight: '100vh', background: '#f2f0eb', padding: '32px 16px',
      display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
      fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em',
    }}>
      <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', justifyContent: 'center' }}>
        <PhoneFrame label="Home">
          <HomeScreen />
          <TabBar current="home" onChange={() => {}} />
        </PhoneFrame>
        <PhoneFrame label="Rewards">
          <Rewards />
          <TabBar current="other" onChange={() => {}} />
        </PhoneFrame>
        <PhoneFrame label="Order">
          <OrderScreen />
          <TabBar current="order" onChange={() => {}} />
        </PhoneFrame>
      </div>
    </div>
  );
}

window.App = App;
