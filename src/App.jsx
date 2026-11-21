import { useEffect, useMemo, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  ArrowRight, ArrowUpRight, Check, ChevronDown, CirclePlay, Code2,
  Command, Globe2, Image, MessageCircle, Monitor, Radio, Search,
  ShieldCheck, Smartphone, Sparkles, Users, Zap
} from 'lucide-react';
import GradientASCII from './components/GradientASCII.jsx';
import ElectricBorder from './components/ElectricBorder.jsx';
import LogoLoop from './components/LogoLoop.jsx';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } })
  : null;

function formatDuration(totalSeconds) {
  const seconds = Math.max(0, Number(totalSeconds) || 0);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours >= 1000) return `${(hours / 1000).toFixed(1)}k hours`;
  if (hours > 0) return `${hours.toLocaleString('en-US')} hours`;
  if (minutes > 0) return `${minutes.toLocaleString('en-US')} minutes`;
  return `${Math.floor(seconds).toLocaleString('en-US')} seconds`;
}

function useCommunityTime() {
  const [seconds, setSeconds] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let live = true;
    async function load() {
      if (!supabase) {
        setStatus('unconfigured');
        return;
      }
      const { data, error } = await supabase.rpc('roomchat_total_usage_seconds');
      if (!live) return;
      if (error) {
        setStatus('unavailable');
        return;
      }
      setSeconds(Number(data) || 0);
      setStatus('ready');
    }
    load();
    const timer = window.setInterval(load, 60_000);
    return () => {
      live = false;
      window.clearInterval(timer);
    };
  }, []);
  return { seconds, status };
}

const features = [
  { icon: MessageCircle, title: '실시간 채팅', text: '공개 채널에서 바로 대화하고, 입력 중 표시와 멘션으로 흐름을 놓치지 않아요.' },
  { icon: Users, title: '친구와 DM', text: '친구 요청부터 개인 메시지, 읽음 표시, 이미지와 GIF 공유까지 한곳에서.' },
  { icon: Image, title: '미디어 공유', text: '이미지·동영상 첨부, YouTube 미리보기, GIPHY GIF로 대화를 더 풍성하게.' },
  { icon: ShieldCheck, title: '운영 도구', text: '방장과 관리자를 위한 권한, 참여자 관리, 메시지 고정과 운영 패널.' },
  { icon: Zap, title: '사운드보드', text: 'MyInstants 효과음을 찾아 미리 듣고 채팅에서 함께 공유해 보세요.' },
  { icon: Smartphone, title: '어디서나 접속', text: 'PC와 모바일 브라우저는 물론 Windows 설치형 앱도 준비되어 있어요.' },
];

const languages = [
  { node: <b>HTML5</b>, title: 'HTML' },
  { node: <b>CSS3</b>, title: 'CSS' },
  { node: <b>JS</b>, title: 'JavaScript' },
  { node: <b>TS</b>, title: 'TypeScript' },
  { node: <b>React</b>, title: 'React' },
  { node: <b>SQL</b>, title: 'SQL' },
  { node: <b>Supabase</b>, title: 'Supabase' },
  { node: <b>Electron</b>, title: 'Electron' },
];

function App() {
  const { seconds, status } = useCommunityTime();
  const [menuOpen, setMenuOpen] = useState(false);
  const usageLabel = status === 'ready' ? formatDuration(seconds) :
    status === 'unconfigured' ? '연결 준비 중' : status === 'unavailable' ? '통계 불러오기 실패' : '불러오는 중…';

  const stats = useMemo(() => [
    { label: '누적 커뮤니티 이용 시간', value: usageLabel, icon: Radio, note: '모든 방문자의 활성 이용 시간 합계' },
    { label: '실시간 대화', value: 'Realtime', icon: Zap, note: 'Supabase 기반 실시간 메시지' },
    { label: '접속 방식', value: 'PC + Mobile', icon: Monitor, note: '브라우저와 Windows 앱' },
  ], [usageLabel]);

  return (
    <div className="site-shell">
      <header className="nav-wrap">
        <a className="brand" href="#top" aria-label="RoomChat 홈">
          <span className="brand-mark"><MessageCircle size={19} /></span>
          <span>RoomChat</span><i>.</i>
        </a>
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#features">Features</a>
          <a href="#experience">Experience</a>
          <a href="#technology">Technology</a>
          <a href="https://github.com/xlg77/roomchat" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a>
        </nav>
        <div className="nav-actions">
          <a className="nav-cta" href="https://xlg77.github.io/roomchat/" target="_blank" rel="noreferrer">채팅 시작하기 <ArrowUpRight size={16} /></a>
          <button className="menu-toggle" onClick={() => setMenuOpen(v => !v)} aria-label="메뉴 열기"><ChevronDown /></button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow-pill"><span className="pulse-dot" /> REAL-TIME COMMUNITY <ArrowRight size={14} /></div>
            <h1>대화가 이어지는<br /><span>새로운 공간.</span></h1>
            <p className="hero-description">채널을 만들고, 친구와 이야기하고, 이미지와 GIF까지 함께 나누는 실시간 채팅 커뮤니티. 필요한 대화 도구를 한곳에 모았어요.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="https://xlg77.github.io/roomchat/" target="_blank" rel="noreferrer">RoomChat 시작하기 <ArrowRight size={18} /></a>
              <a className="button button-secondary" href="#features">기능 둘러보기</a>
            </div>
            <div className="hero-footnote"><Check size={15} /> 게스트로 바로 입장 가능 <span /> PC와 모바일 지원</div>
          </div>
          <div className="hero-art">
            <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
            <GradientASCII className="hero-ascii" colors={['#2356e8','#f4f7ff','#9bd9ff','#41b9ff']} shape="rise" cellSize={13} density={0.92} glow={0.42} flow={0.72} speed={0.7} />
            <div className="floating-chip chip-top"><span className="live-dot" /> LIVE CHAT</div>
            <div className="floating-chip chip-bottom"><MessageCircle size={16} /> 대화가 실시간으로 연결돼요</div>
            <div className="hero-art-caption">ROOMCHAT / COMMUNITY SPACE</div>
          </div>
        </section>

        <section className="stats-grid" aria-label="RoomChat 정보">
          {stats.map(({ label, value, icon: Icon, note }) => (
            <div className="stat-card" key={label}>
              <div className="stat-icon"><Icon size={18} /></div>
              <div className="stat-label">{label}</div>
              <div className="stat-value">{value}</div>
              <div className="stat-note">{note}</div>
            </div>
          ))}
        </section>

        <section className="showcase" id="experience">
          <div className="section-heading">
            <span className="section-kicker">MADE FOR CONVERSATIONS</span>
            <h2>필요한 기능은 모두,<br /><em>대화에 집중할 수 있게.</em></h2>
            <p>복잡한 설정 대신 직관적인 채널과 도구로 시작해 보세요.</p>
          </div>
          <ElectricBorder color="#3d83ff" glowColor="#2866df" speed={0.65} chaos={0.35} spread={0.55} thickness={1.6} className="preview-border">
            <div className="app-preview">
              <div className="preview-top"><div className="window-dots"><i /><i /><i /></div><span>RoomChat — # 자유 대화</span><span className="preview-live">● CONNECTED</span></div>
              <div className="preview-body">
                <aside className="preview-sidebar"><strong>roomchat<span>.</span></strong><small>CHANNELS</small><div className="preview-room active"># 자유 대화</div><div className="preview-room"># 게임 이야기</div><div className="preview-room"># 음악 공유</div><div className="preview-user"><i /> guest_user</div></aside>
                <div className="preview-chat"><div className="preview-chat-head"># 자유 대화 <small>함께 이야기해요</small></div><div className="chat-line"><b className="avatar a1">A</b><div><strong>Alex <small>오후 8:21</small></strong><p>안녕하세요! 여기서 바로 대화할 수 있네요.</p></div></div><div className="chat-line"><b className="avatar a2">M</b><div><strong>mori <small>오후 8:22</small></strong><p>이미지랑 GIF도 보낼 수 있어요 ✨</p><div className="fake-attachment"><span>GIF</span> 오늘도 좋은 하루!</div></div></div><div className="preview-composer">메시지를 입력하세요… <span>↗</span></div></div>
              </div>
            </div>
          </ElectricBorder>
        </section>

        <section className="features-section" id="features">
          <div className="section-heading left">
            <span className="section-kicker">WHAT YOU CAN DO</span>
            <h2>대화에 필요한 모든 것.</h2>
            <p>RoomChat에서 지금 사용할 수 있는 주요 기능을 소개해요.</p>
          </div>
          <div className="feature-grid">
            {features.map(({ icon: Icon, title, text }, index) => (
              <article className="feature-card" key={title}>
                <div className="feature-icon"><Icon size={21} /></div>
                <span className="feature-number">0{index + 1}</span>
                <h3>{title}</h3><p>{text}</p>
                <ArrowUpRight className="feature-arrow" size={17} />
              </article>
            ))}
          </div>
        </section>

        <section className="usage-band">
          <div><span className="section-kicker">BUILT BY EVERY CONVERSATION</span><h2>함께한 시간이<br />RoomChat의 기록이 됩니다.</h2><p>RoomChat을 실제로 이용한 활성 시간만 익명으로 합산해요. 로그인 정보나 채팅 내용은 이 통계에 저장하지 않습니다.</p></div>
          <div className="usage-counter"><span className="counter-label"><span className="pulse-dot" /> COMMUNITY TIME</span><strong>{usageLabel}</strong><small>{status === 'ready' ? '전체 이용자의 누적 이용 시간' : '통계 서버에 연결하는 중입니다'}</small><button onClick={() => window.location.reload()}>통계 새로고침 <ArrowRight size={15} /></button></div>
        </section>

        <section className="technology-section" id="technology">
          <div className="section-heading">
            <span className="section-kicker">BUILT WITH</span>
            <h2>기술로 연결하고,<br /><em>대화로 완성합니다.</em></h2>
            <p>웹 표준과 실시간 백엔드를 바탕으로 만들어지고 있어요.</p>
          </div>
          <div className="tech-loop"><LogoLoop logos={languages} speed={72} logoHeight={32} gap={54} pauseOnHover fadeOut scaleOnHover ariaLabel="RoomChat technology stack" /></div>
          <div className="tech-details">
            <div><Code2 /><strong>Frontend</strong><span>HTML · CSS · JavaScript · React</span></div>
            <div><Globe2 /><strong>Backend</strong><span>Supabase · PostgreSQL · Realtime</span></div>
            <div><Command /><strong>Desktop</strong><span>Electron · Windows</span></div>
          </div>
        </section>

        <section className="final-cta">
          <div className="cta-spark"><Sparkles size={22} /></div>
          <span className="section-kicker">YOUR NEXT CONVERSATION STARTS HERE</span>
          <h2>지금, RoomChat에서<br /><em>대화를 시작해 보세요.</em></h2>
          <p>게스트로 가볍게 둘러보고, 마음에 드는 채널에서 이야기해 보세요.</p>
          <a className="button button-primary" href="https://xlg77.github.io/roomchat/" target="_blank" rel="noreferrer">무료로 시작하기 <ArrowRight size={18} /></a>
        </section>
      </main>

      <footer className="footer">
        <a className="brand" href="#top"><span className="brand-mark"><MessageCircle size={18} /></span><span>RoomChat</span><i>.</i></a>
        <span>© {new Date().getFullYear()} RoomChat. Made for conversations.</span>
        <div><a href="https://github.com/xlg77/roomchat" target="_blank" rel="noreferrer">Source</a><a href="https://xlg77.github.io/roomchat/" target="_blank" rel="noreferrer">Open app <ArrowUpRight size={13} /></a></div>
      </footer>
    </div>
  );
}

export default App;
