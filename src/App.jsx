import React, { useRef, useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Mail, Phone, Globe, Settings, Plus, Trash2, Save, Lock, LogOut, ZoomIn, Link as LinkIcon } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// 自定义社媒图标
function InstagramIcon({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
function FacebookIcon({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function WhatsAppIcon({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}
function TikTokIcon({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

// 高清图放大镜组件
function ImageMagnifier({ src, alt }) {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseHover = (e) => {
    const elem = e.currentTarget;
    const { left, top, width, height } = elem.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    setCursorPosition({ x, y });
    setPosition({
      x: (x / width) * 100,
      y: (y / height) * 100,
    });
  };

  return (
    <div 
      className="relative overflow-hidden cursor-crosshair flex items-center justify-center h-full w-full select-none bg-black/40"
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseHover}
    >
      <img src={src || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675'} alt={alt} className="max-h-[70vh] w-full object-contain pointer-events-none" />
      <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-sm text-[11px] text-amber-200 flex items-center gap-1.5 pointer-events-none">
        <ZoomIn size={13} />
        <span>Hover to Magnify / 悬停查看微距细节</span>
      </div>
      {showMagnifier && (
        <div 
          className="absolute pointer-events-none border-2 border-amber-300/80 rounded-full shadow-2xl bg-no-repeat z-30"
          style={{
            width: '160px',
            height: '160px',
            top: `${cursorPosition.y - 80}px`,
            left: `${cursorPosition.x - 80}px`,
            backgroundImage: `url(${src})`,
            backgroundPosition: `${position.x}% ${position.y}%`,
            backgroundSize: '350% 350%',
            boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
          }}
        />
      )}
    </div>
  );
}

// 多语言翻译与兜底数据词典
const t = {
  en: {
    nav: ["Home", "Biography", "Works", "Vision", "Contact"],
    heroSubtitle: "— Cloud Powered Art Portfolio —",
    heroTitle1: "Nature as Teacher",
    heroTitle2: "Heart as Source",
    heroDesc: "Rooted in millennia of artistic essence, empowered by the cloud. Update your Eastern aesthetic world anytime, anywhere.",
    exploreWorks: "Explore Works",
    bookExhibition: "Exhibition / Inquiry",
    aboutTag: "Biography & Vision",
    worksTag: "Selected Portfolio",
    worksTitle: "Selected Works",
    visionTag: "Aesthetic Vision",
    visionTitle: "Bridging Tradition and Modernity",
    visionDesc1: "We believe that traditional Chinese art is not a relic of the past, but a living, breathing philosophy of nature and space. By exhibiting to American and global collectors, we aim to translate the quiet majesty of ink into a universal modern dialogue.",
    visionDesc2: "Every brushstroke carries thousands of years of contemplation on mountains, rivers, and the human spirit—tailored for contemporary architecture and luxury living spaces.",
    allWorks: "All",
    shanshui: "Shanshui",
    xiyi: "Ink Wash",
    modern: "Modern",
    detailBtn: "High-Res Details",
    contactTag: "Get In Touch",
    contactTitle1: "Looking Forward to",
    contactTitle2: "Connecting With You",
    nameLabel: "Your Name",
    contactLabel: "Contact Info",
    msgLabel: "Your Message",
    sendBtn: "Send Message",
    adminTitle: "Secure Cloud CMS (URL Mode)",
    saveSuccess: "✓ Successfully synced to cloud database! Global visitors can now see updates in real-time.",
    saveBtn: "Save Changes to Cloud",
    loginTitle: "Gallery Admin Login",
    emailPlaceholder: "Admin Email",
    passPlaceholder: "Password",
    loginBtn: "Authenticate",
    logoutBtn: "Lock Admin",
    footerText: "© 2026 Ink & Spirit Gallery. All Rights Reserved."
  },
  zh: {
    nav: ["首页", "个人经历", "精选作品", "美育愿景", "联系画廊"],
    heroSubtitle: "— 云端驱动的艺术作品集 —",
    heroTitle1: "外师造化",
    heroTitle2: "中得心源",
    heroDesc: "以千载意境为骨，以云端数据为翼。随时随地，实时更新您的东方美学世界。",
    exploreWorks: "浏览作品集",
    bookExhibition: "预约展陈 / 收藏",
    aboutTag: "Biography & Vision",
    worksTag: "Selected Portfolio",
    worksTitle: "精选画作",
    visionTag: "Aesthetic Vision",
    visionTitle: "融汇传统与现代美学",
    visionDesc1: "我们坚信，传统中国水墨并非陈旧的历史遗迹，而是一种充满生命力的自然与空间哲学。通过向美国及全球藏家展陈，我们致力于将水墨的沉静气韵转化为现代国际化的美学共鸣。",
    visionDesc2: "每一笔墨都承载着千载对山川与心灵的体悟，专为当代高端建筑、美学空间及国际收藏体系量身定制。",
    allWorks: "全部作品",
    shanshui: "青绿山水",
    xiyi: "水墨写意",
    modern: "当代国潮",
    detailBtn: "高精度原画细节",
    contactTag: "Get In Touch",
    contactTitle1: "期许与您",
    contactTitle2: "共论丹青意境",
    nameLabel: "尊姓大名",
    contactLabel: "联系方式",
    msgLabel: "留言内容",
    sendBtn: "发送留言",
    adminTitle: "安全云端内容管理 (链接模式)",
    saveSuccess: "✓ 成功同步至云端数据库！全球访客已可实时看到更新。",
    saveBtn: "保存更改至云端数据库",
    loginTitle: "画廊管理员身份验证",
    emailPlaceholder: "管理员邮箱",
    passPlaceholder: "密码",
    loginBtn: "安全登录",
    logoutBtn: "退出登录并加锁",
    footerText: "© 2026 墨韵丹青艺术空间. 版权所有."
  }
};

const defaultAbout = [
  {
    title_zh: "墨分五色 · 独居一心",
    title_en: "Ink in Five Tones · Pure Intent",
    desc_zh: "研习国画数十载，深入临摹宋元名家笔意，兼修现代造型艺术。主张“画无定法，贵在出尘”，将东方美学哲学融入当代生活空间。",
    desc_en: "Decades of studying traditional Chinese painting, deeply emulating Song and Yuan dynasty masters while embracing modern forms. Believing that 'art has no rigid rules, only transcendence,' integrating Eastern aesthetic philosophy into contemporary living spaces.",
    image: "http://www.chinashj.com/uploads/allimg/160114/1-160114103I5222.png"
  },
  {
    title_zh: "外师造化 · 融汇中西",
    title_en: "Nature as Teacher · East Meets West",
    desc_zh: "行万里路，写万卷景。常年游历名山大川，将自然生机转化为笔底波澜。",
    desc_en: "Traveling thousands of miles to capture boundless landscapes. Years of journeying through majestic mountains and rivers, transforming natural vitality into sweeping brushwork.",
    image: "https://pic.616pic.com/bg_w1180/00/10/14/Gx3x5gASSx.jpg"
  }
];

const defaultWorks = [
  {
    title_zh: "《千峰叠翠 · 归舟图》",
    title_en: "Returning Boats in Verdant Peaks",
    category: "shanshui",
    category_label_zh: "青绿山水",
    category_label_en: "Shanshui",
    year: "2025",
    size: "180 × 96 cm",
    material_zh: "绢本设色 / 矿物颜料",
    material_en: "Ink on Silk / Mineral Pigments",
    description_zh: "借宋人笔意，以矿物青绿重彩表现蜀山晨雾与层峦叠嶂。",
    description_en: "Drawing inspiration from Song dynasty brushwork, using mineral green and heavy color pigments to depict the morning mist and rolling peaks.",
    cover_image: "https://pic.616pic.com/bg_w1180/00/10/14/Gx3x5gASSx.jpg",
    image: "https://pic.616pic.com/bg_w1180/00/10/14/Gx3x5gASSx.jpg"
  }
];

const defaultSocials = {
  email: 'art@chinesepainting-portfolio.com',
  phone: '+1 (555) 019-2834',
  instagram: 'https://instagram.com',
  facebook: 'https://facebook.com',
  whatsapp: 'https://wa.me/15550192834',
  tiktok: 'https://tiktok.com'
};

const IMAGE_OSS_DEFAULT_HOSTS = new Set([
  'lucy-images.oss-cn-hongkong.aliyuncs.com',
  'lucy-images.oss-cn-hongkong-internal.aliyuncs.com',
]);

const IMAGE_OSS_ACCEL_HOST = 'lucy-images.oss-accelerate.aliyuncs.com';

function normalizeImageUrl(input) {
  if (!input || typeof input !== 'string') return input;
  let url;
  try {
    url = new URL(input);
  } catch {
    return input;
  }
  if (!IMAGE_OSS_DEFAULT_HOSTS.has(url.hostname)) return input.split('#')[0];
  url.hostname = IMAGE_OSS_ACCEL_HOST;
  url.search = '';
  url.hash = '';
  return url.toString();
}

export default function App() {
  const containerRef = useRef(null);
  const heroVideoRef = useRef(null);
  const [lang, setLang] = useState('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [aboutIdx, setAboutIdx] = useState(0);
  const [aboutImageStatus, setAboutImageStatus] = useState({});
  const [selectedWork, setSelectedWork] = useState(null);

  // 后台与认证状态
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminSection, setAdminSection] = useState('about');
  const [saveToast, setSaveToast] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Auth 登录相关状态
  const [user, setUser] = useState(null);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [aboutData, setAboutData] = useState(defaultAbout);
  const [works, setWorks] = useState(defaultWorks);
  const [socials, setSocials] = useState(defaultSocials);

  useEffect(() => {
    setAboutImageStatus({});
  }, [aboutData]);

  // 检查当前是否已登录
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // 登录方法
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: adminEmail,
      password: adminPassword,
    });
    setLoading(false);
    if (error) {
      setAuthError(error.message);
    }
  };

  // 退出登录
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // 从 Supabase 载入数据
  useEffect(() => {
    async function fetchData() {
      try {
        const { data: aboutRes } = await supabase.from('about_data').select('*');
        if (aboutRes && aboutRes.length > 0) {
          setAboutData(aboutRes.map((item) => ({
            ...item,
            image: normalizeImageUrl(item.image),
          })));
        }

        const { data: worksRes } = await supabase.from('works').select('*');
        if (worksRes && worksRes.length > 0) {
          setWorks(worksRes.map((item) => ({
            ...item,
            image: normalizeImageUrl(item.image),
            cover_image: normalizeImageUrl(item.cover_image),
          })));
        }

        const { data: socialsRes } = await supabase.from('socials').select('*').limit(1);
        if (socialsRes && socialsRes.length > 0) setSocials(socialsRes[0]);
      } catch (err) {
        console.log('Using local fallback data due to cloud fetch status:', err);
      }
    }
    fetchData();
  }, []);

  // 同步保存到云端数据库
  const handleSaveToCloud = async () => {
    setLoading(true);
    try {
      const ensureSuccess = (result, label) => {
        if (result?.error) {
          throw new Error(`${label}: ${result.error.message}`);
        }
      };

      ensureSuccess(await supabase.from('about_data').delete().neq('id', 0), 'Delete about_data failed');
      if (aboutData.length > 0) {
        const cleanAbout = aboutData.map(({ id, ...rest }) => ({
          ...rest,
          image: normalizeImageUrl(rest.image),
        }));
        ensureSuccess(await supabase.from('about_data').insert(cleanAbout), 'Insert about_data failed');
      }

      ensureSuccess(await supabase.from('works').delete().neq('id', 0), 'Delete works failed');
      if (works.length > 0) {
        const cleanWorks = works.map(({ id, ...rest }) => ({
          ...rest,
          material_zh: rest.material_zh ?? rest.material ?? null,
          material_en: rest.material_en ?? rest.material ?? null,
          image: normalizeImageUrl(rest.image),
          cover_image: normalizeImageUrl(rest.cover_image),
        }));
        ensureSuccess(await supabase.from('works').insert(cleanWorks), 'Insert works failed');
      }

      if (socials.id) {
        ensureSuccess(await supabase.from('socials').update({
          email: socials.email, phone: socials.phone,
          instagram: socials.instagram, facebook: socials.facebook,
          whatsapp: socials.whatsapp, tiktok: socials.tiktok
        }).eq('id', socials.id), 'Update socials failed');
      } else {
        const { data: insertedSocials } = await supabase.from('socials').insert({
          email: socials.email, phone: socials.phone,
          instagram: socials.instagram, facebook: socials.facebook,
          whatsapp: socials.whatsapp, tiktok: socials.tiktok
        }).select('*').limit(1);
        if (insertedSocials && insertedSocials.length > 0) setSocials(insertedSocials[0]);
      }

      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 3000);
    } catch (err) {
      console.error('Save failed:', err);
      alert('Save failed. Make sure you are logged in with admin credentials.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (aboutData.length === 0) return;
    const timer = setInterval(() => {
      setAboutIdx((prev) => (prev + 1) % aboutData.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [aboutData.length]);

  const filteredWorks = activeTab === 'all' 
    ? works 
    : works.filter(item => item.category === activeTab);

  // 首屏动画
  useGSAP(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      defaults: { ease: 'power4.out' },
      onComplete: () => {
        document.body.style.overflow = '';
        ScrollTrigger.refresh();
      }
    });

    tl.to('.opening-curtain', { yPercent: -100, duration: 1.2, ease: 'expo.inOut', delay: 0.2 })
      .from('.hero-bg-video', { scale: 1.25, duration: 2.2, ease: 'power3.out' }, "-=0.8")
      .from('.hero-subtitle', { y: 40, opacity: 0, duration: 1.2 }, "-=1.8")
      .from('.hero-title-line', { yPercent: 120, skewY: 6, duration: 1.6, stagger: 0.2 }, "-=1.4")
      .from('.hero-desc', { y: 30, opacity: 0, duration: 1 }, "-=0.8")
      .from('.hero-btn-wrap', { y: 30, opacity: 0, duration: 1, stagger: 0.15, clearProps: 'all' }, "-=0.6");
  }, { scope: containerRef, dependencies: [] });

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const tryPlay = () => {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', 'true');
      const p = video.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    };

    const onCanPlay = () => tryPlay();
    video.addEventListener('canplay', onCanPlay);

    requestAnimationFrame(() => {
      tryPlay();
    });

    window.addEventListener('pointerdown', tryPlay, { once: true, passive: true });
    window.addEventListener('touchstart', tryPlay, { once: true, passive: true });

    return () => {
      video.removeEventListener('canplay', onCanPlay);
      window.removeEventListener('pointerdown', tryPlay);
      window.removeEventListener('touchstart', tryPlay);
    };
  }, []);

  const currentT = t[lang];

  return (
    <div ref={containerRef} className="min-h-screen font-serif bg-[#0a0a0a] text-[#f4f1ea] overflow-x-hidden selection:bg-red-800 selection:text-white">
      
      {/* 载入幕布 */}
      <div className="opening-curtain fixed inset-0 z-[100] bg-[#121212] flex flex-col justify-between p-8 md:p-12 pointer-events-none">
        <div className="text-xs uppercase tracking-[0.4em] text-stone-400">Cloud Portfolio Experience</div>
        <div className="text-3xl md:text-6xl font-light tracking-[0.25em] text-amber-200">INK & SPIRIT</div>
        <div className="text-xs tracking-[0.2em] text-stone-400">CONNECTING CLOUD...</div>
      </div>

      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex justify-between items-center border-b border-white/10 backdrop-blur-md bg-black/60">
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="Logo" className="h-7 md:h-8 w-auto object-contain" />
          <span className="text-base md:text-lg tracking-[0.25em] font-light text-white">
            {lang === 'en' ? 'Lucy & Spirit' : '露西画作'}
          </span>
        </div>
        
        <div className="hidden md:flex space-x-8 text-sm tracking-[0.2em]">
          {currentT.nav.map((label, idx) => (
            <a key={idx} href={['#hero', '#about', '#works', '#vision', '#contact'][idx]} className="text-stone-300 hover:text-amber-200 transition-colors duration-300">{label}</a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
            className="px-3 py-1.5 rounded-full border border-white/20 text-xs tracking-wider flex items-center gap-1.5 text-amber-200 hover:bg-white/10 transition-all"
          >
            <Globe size={14} />
            <span>{lang === 'en' ? '中文' : 'EN'}</span>
          </button>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white p-1 focus:outline-none z-50" aria-label="Toggle Menu">
            {isMenuOpen ? <X size={26} className="text-amber-300" /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* 移动端菜单 */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col justify-center items-center space-y-8 md:hidden px-6 animate-fadeIn">
          {currentT.nav.map((label, idx) => (
            <a key={idx} href={['#hero', '#about', '#works', '#vision', '#contact'][idx]} onClick={() => setIsMenuOpen(false)} className="text-2xl tracking-[0.25em] text-stone-200 hover:text-amber-200 font-light py-2 border-b border-white/10 w-full text-center">
              {label}
            </a>
          ))}
        </div>
      )}

      {/* HERO 首屏 */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video ref={heroVideoRef} autoPlay loop muted playsInline preload="auto" className="hero-bg-video w-full h-full object-cover opacity-8 mix-blend-luminosity">
            <source src="/shh.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#0d0d0d]"></div>
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#0d0d0d] pointer-events-none"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-12">
          <p className="hero-subtitle text-[11px] md:text-sm tracking-[0.3em] md:tracking-[0.5em] text-amber-300 uppercase mb-4 font-semibold">
            {currentT.heroSubtitle}
          </p>
          <div className="space-y-2 mb-6 md:mb-8">
            <div className="overflow-hidden py-1"><h1 className="hero-title-line text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-light tracking-[0.15em] text-white">{currentT.heroTitle1}</h1></div>
            <div className="overflow-hidden py-1"><h1 className="hero-title-line text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-semibold italic text-stone-200 tracking-[0.2em]">{currentT.heroTitle2}</h1></div>
          </div>
          <p className="hero-desc max-w-lg mx-auto text-stone-300 text-xs md:text-base tracking-widest leading-relaxed mb-8 font-light px-4">
            {currentT.heroDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 relative z-30">
            <div className="hero-btn-wrap"><a href="#works" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/40 text-white rounded-full tracking-widest hover:bg-amber-200 hover:text-black transition-all flex items-center gap-2 text-sm">{currentT.exploreWorks} <ArrowUpRight size={18} /></a></div>
            <div className="hero-btn-wrap"><a href="#contact" className="px-8 py-4 bg-black/60 backdrop-blur-md border border-amber-600/70 text-amber-100 rounded-full tracking-widest hover:bg-amber-900/40 text-sm block text-center">{currentT.bookExhibition}</a></div>
          </div>
        </div>
      </section>

      {/* 个人经历 (ABOUT) */}
      <section id="about" className="reveal-section relative py-24 md:py-48 px-6 md:px-20 bg-[#0d0d0d] overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="lg:col-span-5 relative group">
            <div className="relative aspect-[4/3] md:aspect-[3/4] overflow-visible">
              <div className="absolute inset-0 overflow-hidden rounded-sm shadow-2xl bg-black">
                {aboutData.map((data, idx) => (
                  <img 
                    key={idx}
                    src={data.image || ''} 
                    alt="Biography" 
                    onLoad={() => setAboutImageStatus(prev => ({ ...prev, [idx]: { loaded: true } }))}
                    onError={() => setAboutImageStatus(prev => ({ ...prev, [idx]: { loaded: false, error: true } }))}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out will-change-transform ${aboutIdx === idx && aboutImageStatus[idx]?.loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'} group-hover:scale-[1.03] group-hover:saturate-125 group-hover:contrast-110`}
                  />
                ))}
                {(() => {
                  const currentImage = aboutData[aboutIdx]?.image;
                  const status = aboutImageStatus[aboutIdx] || {};
                  const isMissing = !currentImage;
                  const isLoading = !!currentImage && !status.loaded && !status.error;
                  const isError = !!currentImage && !!status.error;
                  if (!isMissing && !isLoading && !isError) return null;
                  return (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                      <div className="flex flex-col items-center gap-3">
                        {isLoading && <div className="h-6 w-6 rounded-full border border-white/25 border-t-amber-300 animate-spin" />}
                        <div className="text-[11px] tracking-[0.3em] text-stone-300">
                          {isLoading ? 'LOADING' : isMissing ? 'NO IMAGE' : 'LOAD FAILED'}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-sm border border-white/10"></div>
              <div className="pointer-events-none absolute inset-0 translate-x-4 translate-y-4 rounded-sm border border-amber-300/20"></div>
              <div className="pointer-events-none absolute -left-1 -top-1 h-6 w-6 border-l border-t border-amber-300/35"></div>
              <div className="pointer-events-none absolute -right-1 -top-1 h-6 w-6 border-r border-t border-amber-300/20 translate-x-4 translate-y-4"></div>
              <div className="pointer-events-none absolute -left-1 -bottom-1 h-6 w-6 border-l border-b border-amber-300/20 translate-x-4 translate-y-4"></div>
              <div className="pointer-events-none absolute -right-1 -bottom-1 h-6 w-6 border-r border-b border-amber-300/35"></div>
            </div>
          </div>
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="text-amber-300 tracking-[0.3em] text-xs uppercase mb-3 block font-medium">{currentT.aboutTag}</span>
            <div className="relative min-h-[160px] mb-8">
              {aboutData.map((data, idx) => (
                <div key={idx} className={`transition-all duration-700 absolute inset-0 ${aboutIdx === idx ? 'opacity-100 z-10 translate-y-0' : 'opacity-0 z-0 translate-y-4 pointer-events-none'}`}>
                  <h2 className="text-2xl md:text-5xl font-light text-white mb-4 leading-snug">
                    {lang === 'en' ? data.title_en : data.title_zh}
                  </h2>
                  <p className="text-stone-300 leading-relaxed tracking-wider text-sm md:text-lg font-light">
                    {lang === 'en' ? data.desc_en : data.desc_zh}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-16 md:mt-24">
              {aboutData.map((_, idx) => (
                <button key={idx} onClick={() => setAboutIdx(idx)} className={`h-[2px] rounded-full transition-all ${aboutIdx === idx ? 'w-12 bg-amber-300' : 'w-6 bg-white/20'}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 精选作品 (WORKS) */}
      <section id="works" className="reveal-section relative py-24 md:py-48 px-6 md:px-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/20 pb-6">
            <div>
              <span className="text-amber-300 tracking-[0.4em] text-xs uppercase block font-medium">{currentT.worksTag}</span>
              <h2 className="text-3xl md:text-5xl font-light text-white mt-1">{currentT.worksTitle}</h2>
            </div>
            <div className="flex flex-wrap gap-4 text-xs md:text-sm tracking-widest">
              {[
                { key: 'all', label: currentT.allWorks }, 
                { key: 'shanshui', label: currentT.shanshui }, 
                { key: 'xiyi', label: currentT.xiyi }, 
                { key: 'modern', label: currentT.modern }
              ].map(tab => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`pb-2 transition-all ${activeTab === tab.key ? 'text-amber-300 border-b-2 border-amber-300' : 'text-stone-400 hover:text-white'}`}>{tab.label}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWorks.map((work, idx) => (
              <div key={idx} className="bg-[#161616] border border-white/10 rounded-sm overflow-hidden shadow-2xl flex flex-col justify-between group">
                <div>
                  <div className="relative aspect-[4/3] overflow-hidden bg-black cursor-pointer" onClick={() => setSelectedWork(work)}>
                    <img src={work.cover_image || work.image || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675'} alt={work.title_en} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] text-amber-200 rounded-sm">
                      {lang === 'en' ? work.category_label_en : work.category_label_zh}
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex justify-between text-xs text-amber-200/90"><span>{work.year}</span><span>{work.size}</span></div>
                    <h3 className="text-xl font-light text-white">{lang === 'en' ? work.title_en : work.title_zh}</h3>
                    <p className="text-xs text-stone-400">{lang === 'en' ? (work.material_en || work.material || '') : (work.material_zh || work.material || '')}</p>
                    <p className="text-xs text-stone-300 font-light leading-relaxed pt-2 border-t border-white/10">
                      {lang === 'en' ? work.description_en : work.description_zh}
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0"><button onClick={() => setSelectedWork(work)} className="text-xs text-amber-300 inline-flex items-center gap-1 hover:text-white">{currentT.detailBtn} <ArrowUpRight size={14} /></button></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 美育愿景 (VISION) */}
      <section id="vision" className="reveal-section relative py-24 md:py-36 px-6 md:px-20 bg-[#0d0d0d] border-t border-white/10">
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <span className="text-amber-300 tracking-[0.4em] text-xs uppercase block font-medium">{currentT.visionTag}</span>
          <h2 className="text-3xl md:text-5xl font-light text-white leading-snug">{currentT.visionTitle}</h2>
          <div className="w-16 h-[1px] bg-amber-300/50 mx-auto"></div>
          <p className="text-stone-300 text-sm md:text-lg font-light leading-relaxed tracking-wider max-w-3xl mx-auto">
            {currentT.visionDesc1}
          </p>
          <p className="text-stone-400 text-xs md:text-sm font-light leading-relaxed tracking-wider max-w-2xl mx-auto">
            {currentT.visionDesc2}
          </p>
        </div>
      </section>

      {/* 联系画廊 (CONTACT) */}
      <section id="contact" className="reveal-section min-h-screen py-24 px-6 md:px-20 bg-[#0a0a0a] flex flex-col justify-center border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-amber-300 tracking-[0.4em] text-xs uppercase font-medium">{currentT.contactTag}</span>
            <h2 className="text-3xl md:text-5xl font-light text-white">{currentT.contactTitle1} <br /><span className="text-stone-300 italic mt-2 block">{currentT.contactTitle2}</span></h2>
            <div className="space-y-3 pt-2">
              <a href={`mailto:${socials.email}`} className="flex items-center gap-4 p-3.5 bg-[#141414] border border-white/5 rounded-sm text-stone-200"><Mail size={18} className="text-amber-300" />{socials.email}</a>
              <a href={`tel:${socials.phone}`} className="flex items-center gap-4 p-3.5 bg-[#141414] border border-white/5 rounded-sm text-stone-200"><Phone size={18} className="text-amber-300" />{socials.phone}</a>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a href={socials.instagram} target="_blank" rel="noreferrer" className="p-3 bg-[#141414] border border-white/5 rounded-sm text-xs text-stone-300 flex items-center gap-2"><InstagramIcon size={16} className="text-amber-300" />Instagram</a>
              <a href={socials.facebook} target="_blank" rel="noreferrer" className="p-3 bg-[#141414] border border-white/5 rounded-sm text-xs text-stone-300 flex items-center gap-2"><FacebookIcon size={16} className="text-amber-300" />Facebook</a>
              <a href={socials.whatsapp} target="_blank" rel="noreferrer" className="p-3 bg-[#141414] border border-white/5 rounded-sm text-xs text-stone-300 flex items-center gap-2"><WhatsAppIcon size={16} className="text-amber-300" />WhatsApp</a>
              <a href={socials.tiktok} target="_blank" rel="noreferrer" className="p-3 bg-[#141414] border border-white/5 rounded-sm text-xs text-stone-300 flex items-center gap-2"><TikTokIcon size={16} className="text-amber-300" />TikTok</a>
            </div>
          </div>
          <div className="lg:col-span-7 bg-[#161616] p-8 md:p-14 border border-white/10 rounded-lg shadow-2xl">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className="block text-[11px] text-stone-400 uppercase mb-2">{currentT.nameLabel}</label><input type="text" className="w-full bg-transparent border-b border-white/20 pb-2 text-sm text-white focus:outline-none focus:border-amber-300" /></div>
                <div><label className="block text-[11px] text-stone-400 uppercase mb-2">{currentT.contactLabel}</label><input type="text" className="w-full bg-transparent border-b border-white/20 pb-2 text-sm text-white focus:outline-none focus:border-amber-300" /></div>
              </div>
              <div><label className="block text-[11px] text-stone-400 uppercase mb-2">{currentT.msgLabel}</label><textarea rows={3} className="w-full bg-transparent border-b border-white/20 pb-2 text-sm text-white focus:outline-none focus:border-amber-300 resize-none"></textarea></div>
              <button type="submit" className="w-full py-4 bg-white text-black font-medium tracking-[0.3em] hover:bg-amber-300 transition-all text-xs rounded-sm">{currentT.sendBtn}</button>
            </form>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="py-8 px-6 bg-[#060606] border-t border-white/10 text-center text-xs text-stone-500 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
        <p>{currentT.footerText}</p>
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <span className="text-[10px] tracking-widest text-stone-600">URL PORTFOLIO MODE</span>
          <button 
            onClick={() => setIsAdminOpen(true)} 
            className="p-2 text-stone-600 hover:text-amber-300 transition-colors"
            title="Admin Login"
          >
            <Settings size={14} />
          </button>
        </div>
      </footer>

      {/* 原画弹窗（带放大镜特效） */}
      {selectedWork && (
        <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10">
          <div className="relative max-w-5xl w-full bg-[#141414] border border-amber-600/30 rounded-lg overflow-hidden flex flex-col lg:flex-row max-h-[90vh]">
            <button onClick={() => setSelectedWork(null)} className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-amber-300 hover:text-black"><X size={20} /></button>
            <div className="lg:w-3/5 bg-black flex items-center justify-center p-4">
              <ImageMagnifier src={selectedWork.image || selectedWork.cover_image} alt="Artwork HD" />
            </div>
            <div className="lg:w-2/5 p-6 md:p-10 flex flex-col justify-between space-y-6 overflow-y-auto">
              <div className="space-y-4">
                <span className="px-3 py-1 bg-amber-950/45 border border-amber-500/30 text-amber-300 text-xs rounded-sm">
                  {lang === 'en' ? selectedWork.category_label_en : selectedWork.category_label_zh}
                </span>
                <h2 className="text-2xl font-light text-white">{lang === 'en' ? selectedWork.title_en : selectedWork.title_zh}</h2>
                <p className="text-xs text-stone-400">{selectedWork.year} | {selectedWork.size}</p>
                <p className="text-xs text-stone-300 pt-2 border-t border-white/10">{lang === 'en' ? (selectedWork.material_en || selectedWork.material || '') : (selectedWork.material_zh || selectedWork.material || '')}</p>
                <p className="text-sm text-stone-200">{lang === 'en' ? selectedWork.description_en : selectedWork.description_zh}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 安全登录与管理后台抽屉面板 */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-[250] bg-black/90 backdrop-blur-2xl flex justify-end">
          <div className="w-full max-w-2xl bg-[#121212] border-l border-white/10 h-full flex flex-col shadow-2xl">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#161616]">
              <div className="flex items-center space-x-2">
                <Lock size={18} className="text-amber-300" />
                <h2 className="text-lg tracking-widest text-white font-medium">{currentT.adminTitle}</h2>
              </div>
              <button onClick={() => setIsAdminOpen(false)} className="text-stone-400 hover:text-white"><X size={22} /></button>
            </div>
            
            {!user ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-md mx-auto w-full">
                <div className="w-12 h-12 rounded-full bg-amber-950/40 border border-amber-500/30 flex items-center justify-center text-amber-300 mb-6">
                  <Lock size={22} />
                </div>
                <h3 className="text-xl text-white font-light tracking-wider mb-2">{currentT.loginTitle}</h3>
                <p className="text-xs text-stone-400 text-center mb-8">Please enter your Supabase credentials to access the portfolio CMS.</p>
                
                <form onSubmit={handleLogin} className="w-full space-y-4">
                  {authError && (
                    <div className="p-3 bg-red-950/60 border border-red-500/50 text-red-300 text-xs rounded-sm">
                      {authError}
                    </div>
                  )}
                  <div>
                    <input 
                      type="email" 
                      placeholder={currentT.emailPlaceholder}
                      value={adminEmail}
                      onChange={e => setAdminEmail(e.target.value)}
                      required
                      className="w-full bg-[#1a1a1a] border border-white/20 p-3 text-xs text-white rounded-sm focus:border-amber-300 focus:outline-none"
                    />
                  </div>
                  <div>
                    <input 
                      type="password" 
                      placeholder={currentT.passPlaceholder}
                      value={adminPassword}
                      onChange={e => setAdminPassword(e.target.value)}
                      required
                      className="w-full bg-[#1a1a1a] border border-white/20 p-3 text-xs text-white rounded-sm focus:border-amber-300 focus:outline-none"
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-3.5 bg-amber-300 text-black font-medium text-xs tracking-widest rounded-sm hover:bg-white transition-colors shadow-lg"
                  >
                    {loading ? 'Verifying...' : currentT.loginBtn}
                  </button>
                </form>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center px-6 py-3 bg-[#181818] border-b border-white/10 text-xs text-stone-400">
                  <span>Logged in as: <strong className="text-amber-200">{user.email}</strong></span>
                  <button onClick={handleLogout} className="text-red-400 hover:text-red-300 flex items-center gap-1">
                    <LogOut size={14} /> {currentT.logoutBtn}
                  </button>
                </div>

                <div className="flex border-b border-white/10 bg-[#141414]">
                  {[{ key: 'about', label: 'Biography (经历)' }, { key: 'works', label: 'Works (作品)' }, { key: 'socials', label: 'Socials (社媒)' }].map(tab => (
                    <button key={tab.key} onClick={() => setAdminSection(tab.key)} className={`flex-1 py-4 text-xs tracking-widest ${adminSection === tab.key ? 'text-amber-300 border-b-2 border-amber-300 bg-white/5 font-medium' : 'text-stone-400'}`}>{tab.label}</button>
                  ))}
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {saveToast && <div className="p-3 bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs tracking-widest text-center rounded-sm animate-pulse">{currentT.saveSuccess}</div>}
                  
                  {/* 经历管理 */}
                  {adminSection === 'about' && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-stone-400">Manage Biography Cards</span>
                        <button onClick={() => setAboutData([...aboutData, { title_zh: '中文标题', title_en: 'English Title', desc_zh: '中文描述', desc_en: 'English Desc', image: '' }])} className="px-3 py-1.5 bg-amber-300 text-black text-xs rounded-sm flex items-center gap-1"><Plus size={14} /> Add</button>
                      </div>
                      {aboutData.map((item, idx) => (
                        <div key={idx} className="p-4 bg-[#1a1a1a] border border-white/10 rounded-sm space-y-3">
                          <div className="flex justify-between"><span className="text-xs text-amber-300">Item #{idx + 1}</span><button onClick={() => setAboutData(aboutData.filter((_, i) => i !== idx))} className="text-red-400 text-xs flex items-center gap-1"><Trash2 size={14} /> Delete</button></div>
                          
                          <div className="space-y-1.5 pt-1">
                            <label className="text-[10px] text-stone-400 uppercase flex items-center gap-1">
                              <LinkIcon size={12} className="text-amber-300" /> Biography Image URL (经历照片外链)
                            </label>
                            <div className="flex items-center gap-3">
                              {item.image && (
                                <img src={item.image} alt="Preview" className="w-10 h-10 object-cover rounded-sm border border-white/20 shrink-0" />
                              )}
                              <input 
                                type="url" 
                                placeholder="https://..." 
                                value={item.image || ''} 
                                onChange={e => { const arr = [...aboutData]; arr[idx].image = e.target.value; setAboutData(arr); }} 
                                className="w-full bg-black border border-white/20 p-2 text-xs text-white rounded-sm focus:border-amber-300 focus:outline-none" 
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 pt-1">
                            <input type="text" placeholder="Title (EN)" value={item.title_en || ''} onChange={e => { const arr = [...aboutData]; arr[idx].title_en = e.target.value; setAboutData(arr); }} className="bg-black border border-white/20 p-2 text-xs text-white rounded-sm" />
                            <input type="text" placeholder="标题 (中文)" value={item.title_zh || ''} onChange={e => { const arr = [...aboutData]; arr[idx].title_zh = e.target.value; setAboutData(arr); }} className="bg-black border border-white/20 p-2 text-xs text-white rounded-sm" />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <textarea rows={2} placeholder="Description (EN)" value={item.desc_en || ''} onChange={e => { const arr = [...aboutData]; arr[idx].desc_en = e.target.value; setAboutData(arr); }} className="bg-black border border-white/20 p-2 text-xs text-white rounded-sm resize-none" />
                            <textarea rows={2} placeholder="描述 (中文)" value={item.desc_zh || ''} onChange={e => { const arr = [...aboutData]; arr[idx].desc_zh = e.target.value; setAboutData(arr); }} className="bg-black border border-white/20 p-2 text-xs text-white rounded-sm resize-none" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 作品管理（双图：封面图外链 + 高清原画大图外链） */}
                  {adminSection === 'works' && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-stone-400">Manage Gallery Works (Cover & HD URLs)</span>
                        <button onClick={() => setWorks([...works, { title_zh: '《新画作》', title_en: 'New Artwork', category: 'shanshui', category_label_zh: '青绿山水', category_label_en: 'Shanshui', year: '2026', size: '100x100cm', material_zh: '绢本设色 / 矿物颜料', material_en: 'Ink on Silk / Mineral Pigments', description_zh: '中文描述', description_en: 'English description', cover_image: '', image: '' }])} className="px-3 py-1.5 bg-amber-300 text-black text-xs rounded-sm flex items-center gap-1"><Plus size={14} /> Add Work</button>
                      </div>
                      {works.map((work, idx) => (
                        <div key={idx} className="p-4 bg-[#1a1a1a] border border-white/10 rounded-sm space-y-3">
                          <div className="flex justify-between"><span className="text-xs text-amber-300">Work: {work.title_en}</span><button onClick={() => setWorks(works.filter((_, i) => i !== idx))} className="text-red-400 text-xs flex items-center gap-1"><Trash2 size={14} /> Delete</button></div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <input type="text" placeholder="Title (EN)" value={work.title_en || ''} onChange={e => { const arr = [...works]; arr[idx].title_en = e.target.value; setWorks(arr); }} className="bg-black border border-white/20 p-2 text-xs text-white rounded-sm" />
                            <input type="text" placeholder="标题 (中文)" value={work.title_zh || ''} onChange={e => { const arr = [...works]; arr[idx].title_zh = e.target.value; setWorks(arr); }} className="bg-black border border-white/20 p-2 text-xs text-white rounded-sm" />
                          </div>
                          
                          {/* 1. 封面图外链 */}
                          <div className="space-y-1.5 pt-1">
                            <label className="text-[10px] text-stone-400 uppercase flex items-center gap-1">
                              <LinkIcon size={12} className="text-amber-300" /> 1. Cover Image URL (首页卡片封面图外链)
                            </label>
                            <div className="flex items-center gap-3">
                              {work.cover_image && (
                                <img src={work.cover_image} alt="Cover Preview" className="w-10 h-10 object-cover rounded-sm border border-white/20 shrink-0" />
                              )}
                              <input 
                                type="url" 
                                placeholder="https://..." 
                                value={work.cover_image || ''} 
                                onChange={e => { const arr = [...works]; arr[idx].cover_image = e.target.value; setWorks(arr); }} 
                                className="w-full bg-black border border-white/20 p-2 text-xs text-white rounded-sm focus:border-amber-300 focus:outline-none" 
                              />
                            </div>
                          </div>

                          {/* 2. 高清原画大图外链（用于弹窗与放大镜微距） */}
                          <div className="space-y-1.5 pt-1">
                            <label className="text-[10px] text-stone-400 uppercase flex items-center gap-1">
                              <LinkIcon size={12} className="text-amber-300" /> 2. HD Image URL (弹窗高清原画与放大镜大图外链)
                            </label>
                            <div className="flex items-center gap-3">
                              {work.image && (
                                <img src={work.image} alt="HD Preview" className="w-10 h-10 object-cover rounded-sm border border-white/20 shrink-0" />
                              )}
                              <input 
                                type="url" 
                                placeholder="https://..." 
                                value={work.image || ''} 
                                onChange={e => { const arr = [...works]; arr[idx].image = e.target.value; setWorks(arr); }} 
                                className="w-full bg-black border border-white/20 p-2 text-xs text-white rounded-sm focus:border-amber-300 focus:outline-none" 
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-2 pt-1">
                            <select value={work.category} onChange={e => { const arr=[...works]; arr[idx].category=e.target.value; setWorks(arr); }} className="bg-black border border-white/20 p-2 text-xs text-white rounded-sm">
                              <option value="shanshui">Shanshui</option><option value="xiyi">Ink Wash</option><option value="modern">Modern</option>
                            </select>
                            <input type="text" placeholder="Year" value={work.year} onChange={e => { const arr=[...works]; arr[idx].year=e.target.value; setWorks(arr); }} className="bg-black border border-white/20 p-2 text-xs text-white rounded-sm" />
                            <input type="text" placeholder="Size" value={work.size} onChange={e => { const arr=[...works]; arr[idx].size=e.target.value; setWorks(arr); }} className="bg-black border border-white/20 p-2 text-xs text-white rounded-sm" />
                          </div>
                          <div className="grid grid-cols-2 gap-2 pt-1">
                            <input type="text" placeholder="Material (EN)" value={work.material_en || work.material || ''} onChange={e => { const arr=[...works]; arr[idx].material_en=e.target.value; setWorks(arr); }} className="bg-black border border-white/20 p-2 text-xs text-white rounded-sm" />
                            <input type="text" placeholder="材质 (中文) 例如：绢本设色 / 矿物颜料" value={work.material_zh || work.material || ''} onChange={e => { const arr=[...works]; arr[idx].material_zh=e.target.value; setWorks(arr); }} className="bg-black border border-white/20 p-2 text-xs text-white rounded-sm" />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <textarea rows={2} placeholder="Description (EN)" value={work.description_en || ''} onChange={e => { const arr=[...works]; arr[idx].description_en = e.target.value; setWorks(arr); }} className="bg-black border border-white/20 p-2 text-xs text-white rounded-sm resize-none" />
                            <textarea rows={2} placeholder="详细介绍 (中文)" value={work.description_zh || ''} onChange={e => { const arr=[...works]; arr[idx].description_zh = e.target.value; setWorks(arr); }} className="bg-black border border-white/20 p-2 text-xs text-white rounded-sm resize-none" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 社交媒体管理 */}
                  {adminSection === 'socials' && (
                    <div className="space-y-4 p-4 bg-[#1a1a1a] border border-white/10 rounded-sm">
                      <div><label className="text-[10px] text-stone-400 uppercase">Email</label><input type="text" value={socials.email || ''} onChange={e => setSocials({...socials, email: e.target.value})} className="w-full bg-black border border-white/20 p-2 text-xs text-white rounded-sm mt-1" /></div>
                      <div><label className="text-[10px] text-stone-400 uppercase">Phone</label><input type="text" value={socials.phone || ''} onChange={e => setSocials({...socials, phone: e.target.value})} className="w-full bg-black border border-white/20 p-2 text-xs text-white rounded-sm mt-1" /></div>
                      <div><label className="text-[10px] text-stone-400 uppercase">Instagram</label><input type="text" value={socials.instagram || ''} onChange={e => setSocials({...socials, instagram: e.target.value})} className="w-full bg-black border border-white/20 p-2 text-xs text-white rounded-sm mt-1" /></div>
                      <div><label className="text-[10px] text-stone-400 uppercase">Facebook</label><input type="text" value={socials.facebook || ''} onChange={e => setSocials({...socials, facebook: e.target.value})} className="w-full bg-black border border-white/20 p-2 text-xs text-white rounded-sm mt-1" /></div>
                      <div><label className="text-[10px] text-stone-400 uppercase">WhatsApp</label><input type="text" value={socials.whatsapp || ''} onChange={e => setSocials({...socials, whatsapp: e.target.value})} className="w-full bg-black border border-white/20 p-2 text-xs text-white rounded-sm mt-1" /></div>
                      <div><label className="text-[10px] text-stone-400 uppercase">TikTok</label><input type="text" value={socials.tiktok || ''} onChange={e => setSocials({...socials, tiktok: e.target.value})} className="w-full bg-black border border-white/20 p-2 text-xs text-white rounded-sm mt-1" /></div>
                    </div>
                  )}
                </div>

                <div className="p-6 border-t border-white/10 bg-[#161616]">
                  <button onClick={handleSaveToCloud} disabled={loading} className="w-full py-3 bg-amber-300 text-black font-medium text-xs tracking-widest rounded-sm hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-lg">
                    <Save size={16} /> {loading ? 'Syncing...' : currentT.saveBtn}
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
