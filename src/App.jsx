import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Menu, X, ArrowUpRight, Mail, Phone, Globe, Settings, Plus, Trash2, Save, Lock, LogOut, Link as LinkIcon, Leaf, Feather, BookOpen, Compass, Sparkles, Palette, MessageCircleHeart, Inbox, CheckCircle, MessageSquare, AlertTriangle, Copy, ChevronLeft, Shuffle, Truck, Package, Tag, DollarSign, ChevronDown, ChevronUp, Search, ShoppingBag } from 'lucide-react';
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

function toLines(text) {
  if (!text) return [];
  return String(text)
    .split(/\r?\n/)
    .map(s => s.replace(/^[-•·\d.\s、()（）]+/g, '').trim())
    .filter(Boolean);
}

function detectAboutKind(about) {
  if (!about) return 'text';
  const zh = String(about.title_zh || '');
  if (/履历|经历|简历|Resume|Career|Journey/i.test(zh + (about.title_en || ''))) return 'resume';
  if (/自述|心语|自白|Artist Statement|Statement|创作自述/i.test(zh + (about.title_en || ''))) return 'statement';
  const descLines = toLines(about.desc_zh || about.desc_en || '');
  if (descLines.length >= 3) return 'resume';
  return 'text';
}

const t = {
  en: {
    nav: ["Home", "Biography", "Works", "Vision", "Contact"],
    heroSubtitle: "— A Contemporary Ink Portfolio by Lucy —",
    heroTitle1: "Nature as Teacher",
    heroTitle2: "Heart as Source",
    heroDesc: "Lucy is a contemporary Chinese ink landscape artist whose work carries forward the bone structure of Song and Yuan shanshui, the literati spirit of Ming and Qing, and a modern expressive sensibility—rooted in tradition yet reaching across cultures.",
    exploreWorks: "Explore Works",
    bookExhibition: "Exhibition / Inquiry",
    aboutTag: "Biography & Vision",
    worksTag: "Selected Portfolio",
    worksTitle: "Selected Works",
    visionTag: "Aesthetic Vision",
    visionTitle: "Ink as Bridge · Connecting East and World",
    visionMission: "With a lineage stretching two thousand years, Chinese ink landscape is far more than a depiction of scenery. It is the visual language of Tian Ren He Yi—the unity of humanity and nature—and a sanctuary where Eastern minds settle and return. In a global age, Lucy uses brush and ink as a vessel, inviting audiences beyond China to feel the quiet philosophy, the living craft, and the tranquil beauty of an ancient aesthetic made contemporary.",
    visionPhilosophyTitle: "Aesthetic Philosophy",
    visionPhilosophy: [
      "Honour tradition without dogma — keep the rigour of brush, line, and ink logic while opening the work to a cross-cultural, modern gaze.",
      "Innovate without uprooting — every experimental gesture grows from a deep reading of the classical lineage, never losing the Eastern pulse of the work.",
      "Share without dumbing down — make ink legible to broader audiences in plain language, never compromising the standard or the cultural weight behind the brushstroke."
    ],
    visionActionsTitle: "In Practice",
    visionActions: [
      "Deepen the studio practice: new landscape series that record journeys, reflections on nature, and the continuing dialogue with the classical canon—shared regularly with collectors and audiences.",
      "Build bilingual educational content: essays and studio stories that unpack the lineage, techniques, and inner philosophy of Chinese ink for global readers.",
      "Open the studio process: candid journals of brush, paper, mineral pigment, and silk so that art lovers anywhere can feel the quiet materiality of Eastern painting up close.",
      "Collaborate internationally: exhibitions, artist talks, and cross-institutional partnerships that champion Chinese ink as a living, globally resonant art form."
    ],
    visionQuote: ["Ink knows no borders; mountains and rivers speak to every heart.", "May every visitor find in these waters and stones a quiet place to pause, and a resonance that travels across oceans and languages."],
    allWorks: "All",
    shanshui: "Verdant Shanshui",
    xiyi: "Ink Wash · Xieyi",
    modern: "Contemporary Ink",
    inquiryTypeLabel: "Inquiry Type",
    inquiryTypes: [
      { value: 'collect', label: 'Collection / Acquisition' },
      { value: 'exhibition', label: 'Exhibition · Venue' },
      { value: 'education', label: 'Aesthetic Education · Collaboration' },
      { value: 'press', label: 'Press · Media' },
      { value: 'other', label: 'Other' }
    ],
    nameHint: "Please enter your name (at least 2 characters)",
    contactHint: "Email or phone number (at least 6 characters)",
    msgHint: "Message (at least 5 characters)",
    sendBtn: "Send Message",
    sendingBtn: "Sending…",
    msgSuccess: "✓ Message received. We will contact you shortly.",
    msgFallbackHint: "✓ Fallback: opening your email client to deliver this message.",
    msgError: "Failed to send. Please try again or email us directly.",
    msgRateLimit: "You just sent a message. Please wait a moment before sending another.",
    adminMessagesTab: "Inbox",
    msgStatusNew: "New",
    msgStatusRead: "Read",
    msgStatusReplied: "Replied",
    msgReplyBtn: "Reply via Email",
    msgMarkReadBtn: "Mark as Read",
    msgMarkNewBtn: "Mark as New",
    msgMarkRepliedBtn: "Mark Replied",
    msgDeleteBtn: "Delete",
    msgNoData: "No messages yet. Once a visitor leaves a message, it will appear here.",
    msgInquiryTitle: "Type",
    msgTimeTitle: "Time",
    msgStatusTitle: "Status",
    msgActionsTitle: "Actions",
    detailBtn: "Open Details",
    workBackBtn: "Back to Gallery",
    workViewOriginal: "View Original",
    workAvailabilityAvailable: "Available",
    workAvailabilityReserved: "Reserved",
    workAvailabilitySold: "Sold",
    workAvailabilityExhibition: "Exhibition · Not for Sale",
    workPriceOnRequest: "Price on Request",
    workShippingFee: "Shipping",
    workShippingFree: "Free Shipping",
    workShippingMethods: "Shipping Methods",
    workShippingMethodsDefault: "We will confirm the exact shipping details with you after consultation.",
    workFraming: "Framing",
    workCurrencyToggle: "Currency",
    workTabDesc: "Description",
    workTabDescZh: "中文介绍",
    workTabDescEn: "English",
    workCtaInquire: "Inquire This Work",
    workCtaReserveNext: "Request Similar Work",
    workCtaCustomOrder: "Commission Similar",
    workCtaExhibition: "Exhibition Inquiry",
    workCtaCopyInfo: "Copy Work Info",
    workCopySuccess: "Work info copied to clipboard.",
    workImageIndex: "Image {idx} / {total}",
    workDetailTitle: "Artwork Details",
    workProductTitle: "Collection & Shipping",
    workDescMore: "Read More",
    workDescLess: "Collapse",
    workNotFound: "Artwork not found.",
    workNotFoundBack: "Return to Gallery",
    contactTag: "Get In Touch",
    contactTitle1: "Looking Forward to",
    contactTitle2: "Connecting With You",
    nameLabel: "Your Name",
    contactLabel: "Contact Info",
    msgLabel: "Your Message",
    adminTitle: "Secure Cloud CMS (URL Mode)",
    saveSuccess: "✓ Successfully synced to cloud database! Global visitors can now see updates in real-time.",
    saveBtn: "Save Changes to Cloud",
    loginTitle: "Gallery Admin Login",
    emailPlaceholder: "Admin Email",
    passPlaceholder: "Password",
    loginBtn: "Authenticate",
    logoutBtn: "Lock Admin",
    footerText: "© 2026 Lucy 坊 · Meet Lucy Studio. All rights reserved."
  },
  zh: {
    nav: ["首页", "个人经历", "精选作品", "美育愿景", "联系画廊"],
    heroSubtitle: "— Lucy 坊 · 当代水墨艺术家作品集 —",
    heroTitle1: "外师造化",
    heroTitle2: "中得心源",
    heroDesc: "Lucy，当代水墨山水艺术家。恪守宋元山水骨法、明清文人意趣与近现代笔墨体系，在法度根基之上，持续探索东方山水精神的当代表达。",
    exploreWorks: "浏览作品集",
    bookExhibition: "预约展陈 / 收藏",
    aboutTag: "Biography & Vision",
    worksTag: "Selected Portfolio",
    worksTitle: "精选画作",
    visionTag: "Aesthetic Vision",
    visionTitle: "以水墨为桥，连接东方与世界",
    visionMission: "绵延两千年的中国水墨山水，从来不是对自然风光的简单复刻。它是「天人合一」东方哲思的视觉化表达，是东方人安顿身心、寄放精神的心灵栖居地。在文化交融的全球化时代，Lucy 愿以画笔为舟、以水墨为桥，让更多海外观众读懂水墨的意趣、爱上东方的美学，透过山水这一共通的视觉语言，感知中国文化的深邃底蕴与东方雅致的生活哲思。",
    visionPhilosophyTitle: "美育理念",
    visionPhilosophy: [
      "传承不守旧 · 恪守传统笔墨法度与精神内核，融入当代审美视野与跨文化表达视角，让千年水墨艺术在当下焕发鲜活生命力。",
      "创新不离根 · 所有艺术探索皆扎根于对传统文脉的深刻理解，于变化中守本心，始终保有东方艺术的底色与风骨。",
      "普及不简化 · 以平实易懂的方式拆解水墨知识，却从不折损艺术的高度与标准，让大众真正读懂水墨背后的美学价值与文化重量。"
    ],
    visionActionsTitle: "正在践行的事",
    visionActions: [
      "持续深耕水墨山水创作，以新作记录对自然与文脉的思考，定期向藏家和观众分享创作成果。",
      "打造中英文双语水墨艺术科普内容，向海外受众讲解国画技法源流与东方美学内核。",
      "公开创作日常与技法细节，让全球艺术爱好者都能近距离感受毛笔与宣纸碰撞的东方魅力。",
      "联动海外文化机构、艺术空间开展展览与交流，推动中国水墨艺术的跨文化传播与认同,是我努力的方向。"
    ],
    visionQuote: ["墨色无界，山水有情。", "愿每一位驻足的观者，都能在这一方水墨天地里，寻得内心的宁静，收获跨越山海的共鸣。"],
    allWorks: "全部作品",
    shanshui: "青绿山水",
    xiyi: "水墨写意",
    modern: "当代国潮",
    inquiryTypeLabel: "咨询类型",
    inquiryTypes: [
      { value: 'collect', label: '作品收藏 / 购买' },
      { value: 'exhibition', label: '预约展陈 / 场地' },
      { value: 'education', label: '美育合作 / 讲座' },
      { value: 'press', label: '媒体采访 / 品牌' },
      { value: 'other', label: '其他事项' }
    ],
    nameHint: "请输入您的姓名（至少 2 个字符）",
    contactHint: "邮箱或手机号（至少 6 个字符）",
    msgHint: "留言内容（至少 5 个字符）",
    sendBtn: "发送留言",
    sendingBtn: "正在发送…",
    msgSuccess: "✓ 留言已发送，我们会尽快与您联系。",
    msgFallbackHint: "✓ 正在打开您的邮件客户端以发送该留言。",
    msgError: "发送失败，请稍后重试或直接通过邮箱联系我们。",
    msgRateLimit: "您刚刚发送过留言，请稍候再试。",
    adminMessagesTab: "留言管理",
    msgStatusNew: "待联系",
    msgStatusRead: "已查看",
    msgStatusReplied: "已回复",
    msgReplyBtn: "邮件回复",
    msgMarkReadBtn: "标为已查看",
    msgMarkNewBtn: "标为待联系",
    msgMarkRepliedBtn: "标为已回复",
    msgDeleteBtn: "删除留言",
    msgNoData: "暂无留言。访客提交后会在这里实时显示。",
    msgInquiryTitle: "咨询类型",
    msgTimeTitle: "提交时间",
    msgStatusTitle: "处理状态",
    msgActionsTitle: "操作",
    detailBtn: "查看作品详情",
    workBackBtn: "返回作品集",
    workViewOriginal: "查看原图",
    workAvailabilityAvailable: "可收藏 · Available",
    workAvailabilityReserved: "已预订 · Reserved",
    workAvailabilitySold: "已售 · Sold",
    workAvailabilityExhibition: "展陈中 · Not for Sale",
    workPriceOnRequest: "价格私询 · Price on Request",
    workShippingFee: "运费",
    workShippingFree: "包邮",
    workShippingMethods: "发货方式",
    workShippingMethodsDefault: "具体发货方式及运费，画廊将在咨询后与您确认。",
    workFraming: "装裱方式",
    workCurrencyToggle: "币种",
    workTabDesc: "作品介绍",
    workTabDescZh: "中文介绍",
    workTabDescEn: "English",
    workCtaInquire: "咨询此作品",
    workCtaReserveNext: "预约同系列下一幅",
    workCtaCustomOrder: "预约同风格定制",
    workCtaExhibition: "展陈合作咨询",
    workCtaCopyInfo: "复制作品信息",
    workCopySuccess: "作品信息已复制到剪贴板。",
    workImageIndex: "第 {idx} / {total} 张",
    workDetailTitle: "作品详情",
    workProductTitle: "收藏与配送",
    workDescMore: "展开全部",
    workDescLess: "收起内容",
    workNotFound: "未找到该作品。",
    workNotFoundBack: "返回作品集",
    contactTag: "Get In Touch",
    contactTitle1: "期许与您",
    contactTitle2: "共论丹青意境",
    nameLabel: "尊姓大名",
    contactLabel: "联系方式",
    msgLabel: "留言内容",
    adminTitle: "安全云端内容管理 (链接模式)",
    saveSuccess: "✓ 成功同步至云端数据库！全球访客已可实时看到更新。",
    saveBtn: "保存更改至云端数据库",
    loginTitle: "画廊管理员身份验证",
    emailPlaceholder: "管理员邮箱",
    passPlaceholder: "密码",
    loginBtn: "安全登录",
    logoutBtn: "退出登录并加锁",
    footerText: "© 2026 Lucy 坊 · 墨韵丹青艺术空间. 版权所有."
  }
};

const defaultAbout = [
  {
    title_zh: "Lucy · 当代水墨山水艺术家",
    title_en: "Lucy · Contemporary Ink Landscape Artist",
    desc_zh: "1999 年生，自幼浸染中国传统书画文脉，深耕水墨山水创作十余年。毕业于专业美术院校山水画专业，师承多位当代国画名家，系统研摹宋元山水骨法、明清文人意趣与近现代笔墨体系；在恪守传统皴法、章法与墨法法度的根基上，持续探索东方山水精神的当代表达路径。\n\n创作恪守「师法自然，中得心源」的古训，行迹遍历中国南北名山大川——太行的苍浑雄浑、江南的烟雨灵秀、黄山的云海松风、漓江的清寂水韵，皆收于眼底、凝于笔端，化作纸上丘壑。作品以气韵生动为核心，以墨色干湿浓淡的层层晕染构建空间纵深，以线条刚柔缓疾的节奏变化传递山川风骨，在尺幅之间营造出可游可居的东方诗意天地。\n\n近年专注于中国水墨艺术的国际传播与当代表达，愿以山水为文化媒介，向世界呈现中国美学中「天人合一」的哲学智慧，以及东方艺术独有的宁静致远的精神境界。",
    desc_en: "Born in 1999, Lucy grew up immersed in the living lineage of Chinese calligraphy and painting. After more than a decade of dedicated practice, she graduated from a professional fine art academy with a specialization in landscape painting, studying under several leading contemporary masters of ink. Her training systematically covers the structural rigour of Song and Yuan shanshui, the scholar-painter sensibility of Ming and Qing, and the expanded ink language of the modern era—all while she forges her own contemporary path for the Eastern landscape spirit.\n\nHer practice is guided by the classical adage: study from nature, and discover the source in your own heart. Her journeys have taken her across the great mountains and rivers of China: the rugged grandeur of the Taihang range, the misty lyricism of Jiangnan, the cloud-sea pines of Huangshan, the quiet waters of the Li River. Each journey returns as memory, breath, and brushwork. At the heart of every work is qiyun—the rhythmic life-force of the image—built through layered wet and dry ink that creates spatial depth, and through the measured cadence of line that carries the bone of the mountain.\n\nIn recent years, Lucy has devoted herself to the international transmission of Chinese ink art. Landscape, for her, is a cultural medium: a way to share the quiet philosophy of Tian Ren He Yi—unity between humanity and nature—and the enduring, contemplative spirit that only Eastern ink can hold.",
    image: "https://img.meetlucy.shop/pic1.png"
  },
  {
    title_zh: "艺术履历",
    title_en: "Artistic Journey",
    desc_zh: "专业美术院校山水画专业科班出身，传统功底扎实\n多次受邀参与国内外书画展览与跨文化艺术交流项目\n作品被海内外藏家与艺术爱好者广泛收藏\n长期深耕水墨艺术创作与东方美学美育传播",
    desc_en: "Professional academic training in Chinese landscape painting with a rigorous classical foundation\nInvited to numerous national and international ink exhibitions and cross-cultural artistic exchange projects\nWorks widely collected by private collectors and art lovers both in China and overseas\nOngoing dedication to ink practice alongside Eastern aesthetic education and public outreach",
    image: "https://img.meetlucy.shop/hushi.jpg"
  },
  {
    title_zh: "创作自述",
    title_en: "Artist Statement",
    desc_zh: "山水于我，从来不止是纸上风景，更是中国人安放心灵的精神原乡。\n一笔一墨的起落之间，既是与千年文脉的隔空对话，也是对天地自然的本心观照。愿我的画作能跨越语言与文化的边界，让每一位观者都能触摸到东方水墨的静谧力量。",
    desc_en: "For me, mountains and rivers have never been merely landscapes on paper. They are the spiritual homeland where the Chinese mind returns, and where the heart finds its stillness.\nIn every rise and fall of the brush—every wash, every stroke, every breath of ink—I hold a quiet conversation with a millennial lineage, and an honest looking into the natural world. May these paintings cross the borders of language and culture, so that every viewer may feel the tranquil, unshakable force of Eastern ink.",
    image: "https://img.meetlucy.shop/pic1.png"
  }
];

const defaultWorks = [
  {
    title_zh: "《千峰叠翠 · 归舟图》",
    title_en: "Returning Boats in Verdant Peaks",
    category: "shanshui",
    category_label_zh: "青绿山水",
    category_label_en: "Verdant Shanshui",
    year: "2025",
    size: "180 × 96 cm",
    material_zh: "绢本设色 / 矿物颜料",
    material_en: "Ink on Silk / Mineral Pigments",
    description_zh: "借宋人笔意，以矿物青绿重彩表现蜀山晨雾与层峦叠嶂。",
    description_en: "A dialogue with the brush logic of Song masters: mineral greens and blues conjure the morning mists and layered ridges of the Sichuan mountains.",
    cover_image: "https://img.meetlucy.shop/pic1.png",
    image: "https://img.meetlucy.shop/pic1.png"
  }
];

const defaultSocials = {
  email: 'art@meetlucy.shop',
  phone: '+1 (555) 019-2834',
  instagram: 'https://instagram.com',
  facebook: 'https://facebook.com',
  whatsapp: 'https://wa.me/15550192834',
  tiktok: 'https://tiktok.com'
};

const IMAGE_OSS_HOSTS = new Set([
  'lucy-images.oss-cn-hongkong.aliyuncs.com',
  'lucy-images.oss-cn-hongkong-internal.aliyuncs.com',
  'lucy-images.oss-accelerate.aliyuncs.com',
]);

const IMAGE_CDN_HOST = 'img.meetlucy.shop';

function normalizeImageUrl(input) {
  if (!input || typeof input !== 'string') return input;
  let url;
  try {
    url = new URL(input);
  } catch {
    return input;
  }
  if (!IMAGE_OSS_HOSTS.has(url.hostname)) return input.split('#')[0];
  url.hostname = IMAGE_CDN_HOST;
  url.protocol = 'https:';
  url.search = '';
  url.hash = '';
  return url.toString();
}

const SITE_TITLE_DEFAULT =
  'Lucy 坊 · 当代水墨艺术家作品集 | Meet Lucy · Contemporary Ink Landscape Artist';
const SITE_DESC_DEFAULT =
  'Lucy 坊（Meet Lucy）当代水墨山水艺术家个人作品集。绢本设色、矿物颜料，师承宋元骨法与明清意趣，外师造化中得心源，作品系列、艺术履历、创作自述、美育愿景与收藏联络一站呈现。';

const AVAILABILITY_OPTIONS = [
  { value: 'available',  en: 'Available', zh: '可收藏' },
  { value: 'reserved',   en: 'Reserved',  zh: '已预订' },
  { value: 'sold',       en: 'Sold',      zh: '已售' },
  { value: 'exhibition', en: 'Exhibition Not for Sale', zh: '展陈中不售' },
];

function slugifyForWork(text) {
  if (!text) return '';
  const raw = String(text).toLowerCase().trim()
    .replace(/[《》【】（）()「」"'\.,，。;；:：!\?？·•]/g, ' ')
    .replace(/[—–\-]+/g, '-')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '');
  return raw;
}

function currencyFormat(amount, currency) {
  if (amount === null || amount === undefined || amount === '') return null;
  const num = Number(amount);
  if (!isFinite(num)) return null;
  try {
    return new Intl.NumberFormat(currency === 'CNY' ? 'zh-CN' : 'en-US', {
      style: 'currency',
      currency: currency || 'USD',
      maximumFractionDigits: 0,
    }).format(num);
  } catch {
    return `${currency || 'USD'} ${num.toLocaleString()}`;
  }
}

function ensureJsonLdProduct() {
  const ID = 'structured-data-product';
  let el = document.getElementById(ID);
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = ID;
    document.head.appendChild(el);
  }
  return el;
}

function setJsonLdProduct(work, lang) {
  const el = ensureJsonLdProduct();
  if (!work) {
    el.textContent = '';
    return;
  }
  const siteName = lang === 'en' ? 'Meet Lucy Studio' : 'Lucy 坊';
  const name = (work[lang === 'en' ? 'title_en' : 'title_zh']) || '';
  const descRaw = work[lang === 'en' ? 'description_en' : 'description_zh'] || '';
  const desc = String(descRaw || '').slice(0, 500);
  const image = work.cover_image || work.image || '';
  const avail = String(work.availability || 'available');
  const ogAvail = avail === 'available'  ? 'https://schema.org/InStock'
               : avail === 'reserved'   ? 'https://schema.org/PreOrder'
               : avail === 'sold'       ? 'https://schema.org/SoldOut'
               : avail === 'exhibition' ? 'https://schema.org/OutOfStock'
               : 'https://schema.org/InStock';
  let offer = null;
  const priceUsd = Number(work.price_usd || 0);
  const priceCny = Number(work.price_cny || 0);
  if (priceUsd > 0 || priceCny > 0) {
    offer = {
      "@type": "Offer",
      "url": window.location.href,
      "priceCurrency": priceUsd > 0 ? 'USD' : 'CNY',
      "price": (priceUsd > 0 ? priceUsd : priceCny).toString(),
      "availability": ogAvail,
      "seller": {
        "@type": "Organization",
        "name": siteName
      }
    };
  }
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": desc,
    "image": image,
    "url": window.location.href,
    "sku": work.seo_slug_en || work.seo_slug_zh || work.id || String(name),
    "brand": { "@type": "Organization", "name": siteName },
  };
  if (work.year)   data["productionDate"] = String(work.year);
  if (work.size)   data["additionalProperty"] = [{ "@type": "PropertyValue", "name": "Size", "value": work.size }];
  if (offer) data["offers"] = offer;
  el.textContent = JSON.stringify(data);
}

function ensureMeta(name, attr = 'name') {
  let el = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  return el;
}

function setMetaDescription(content) {
  ensureMeta('description').setAttribute('content', content);
  ensureMeta('og:description', 'property').setAttribute('content', content);
  ensureMeta('twitter:description').setAttribute('content', content);
}

function setOgTitleAndUrl(title, url = window.location.href) {
  ensureMeta('og:title', 'property').setAttribute('content', title);
  ensureMeta('twitter:title').setAttribute('content', title);
  ensureMeta('og:url', 'property').setAttribute('content', url);
}

export default function App() {
  const containerRef = useRef(null);
  const heroVideoRef = useRef(null);
  const [lang, setLang] = useState('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [aboutIdx, setAboutIdx] = useState(0);
  const [aboutHover, setAboutHover] = useState(false);
  const [aboutAutoPausedByUser, setAboutAutoPausedByUser] = useState(false);
  const [aboutImageStatus, setAboutImageStatus] = useState({});
  const [contactPayload, setContactPayload] = useState({
    name: '',
    contact: '',
    message: '',
    inquiry_type: 'collect'
  });
  const [sendingMessage, setSendingMessage] = useState(false);
  const [messageBanner, setMessageBanner] = useState(null); // {level:'ok|warn|error', text}
  const [messages, setMessages] = useState([]);

  function toastMessageBanner(level, text, duration = 7000) {
    setMessageBanner({ level, text });
    setTimeout(() => setMessageBanner((cur) => (cur && cur.text === text ? null : cur)), duration);
  }

  const isContactValid =
    String(contactPayload.name || '').trim().length >= 2 &&
    String(contactPayload.contact || '').trim().length >= 6 &&
    String(contactPayload.message || '').trim().length >= 5;

  const DEFAULT_NOTIFY_EMAIL = '617105706@qq.com';

  function openMailtoReply(message) {
    const to = DEFAULT_NOTIFY_EMAIL;
    const inquiryLabel =
      (currentT.inquiryTypes || []).find(i => i.value === message.inquiry_type)?.label ||
      message.inquiry_type ||
      '';
    const subject = encodeURIComponent(`[Meet Lucy 官网留言] ${inquiryLabel ? `${inquiryLabel} · ` : ''}${message.name || '(匿名)'}`);
    const body = encodeURIComponent(
      `（此邮件为留言整理，请把收件人改为：${message.contact || '未知联系方式'} 实际回复）\n\n` +
      `时间：${new Date(message.created_at || Date.now()).toLocaleString()}\n` +
      `姓名：${message.name || ''}\n` +
      `联系方式：${message.contact || ''}\n` +
      `咨询类型：${inquiryLabel || message.inquiry_type || ''}\n\n` +
      `留言内容：\n${message.message || ''}\n`
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  }

  function openMailtoFallback() {
    const inquiryLabel =
      (currentT.inquiryTypes || []).find(i => i.value === contactPayload.inquiry_type)?.label ||
      contactPayload.inquiry_type ||
      '';
    const to = DEFAULT_NOTIFY_EMAIL;
    const subject = encodeURIComponent(`[Meet Lucy 官网留言] ${inquiryLabel ? `${inquiryLabel} · ` : ''}${contactPayload.name || ''}`);
    const body = encodeURIComponent(
      `姓名：${contactPayload.name || ''}\n` +
      `联系方式：${contactPayload.contact || ''}\n` +
      `咨询类型：${inquiryLabel || ''}\n\n` +
      `${contactPayload.message || ''}\n`
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  }

  async function submitContactForm(e) {
    if (e) e.preventDefault();
    if (!isContactValid || sendingMessage) return;
    try {
      const LS_KEY = 'meetlucy_last_msg_at';
      const last = Number(localStorage.getItem(LS_KEY) || '0');
      const now = Date.now();
      if (last && now - last < 60 * 1000) {
        toastMessageBanner('warn', currentT.msgRateLimit);
        return;
      }

      setSendingMessage(true);
      const cleanPayload = {
        inquiry_type: contactPayload.inquiry_type || 'other',
        name: String(contactPayload.name || '').trim().slice(0, 120),
        contact: String(contactPayload.contact || '').trim().slice(0, 200),
        message: String(contactPayload.message || '').trim().slice(0, 2000),
        created_at: new Date().toISOString(),
        status: 'new'
      };

      let inserted = false;
      let supabaseErr = null;

      if (supabase) {
        try {
          const result = await supabase.from('contact_messages').insert(cleanPayload);
          if (result?.error) throw new Error(result.error.message || 'SDK insert failed');
          inserted = true;
        } catch (e) {
          supabaseErr = { stage: 'sdk', message: e.message || String(e) };
          console.warn('contact_messages SDK 提交失败，继续尝试原生 fetch 直连 REST API…', e);
          inserted = false;
        }
      }

      if (!inserted && supabaseUrl && supabaseKey) {
        try {
          const restUrl = supabaseUrl.replace(/\/$/, '') + '/rest/v1/contact_messages';
          const resp = await fetch(restUrl, {
            method: 'POST',
            headers: {
              'apikey': supabaseKey,
              'Authorization': 'Bearer ' + supabaseKey,
              'Content-Type': 'application/json',
              'Prefer': 'return=representation'
            },
            body: JSON.stringify(cleanPayload)
          });
          if (resp.status >= 200 && resp.status < 300) {
            inserted = true;
          } else {
            const text = await resp.text();
            let parsedMsg = text;
            try { parsedMsg = JSON.parse(text).message || text; } catch (_) {}
            supabaseErr = { stage: 'rest', message: parsedMsg };
            console.warn('contact_messages REST 直连失败，status=', resp.status, 'msg=', parsedMsg);
          }
        } catch (e) {
          if (!supabaseErr) supabaseErr = { stage: 'rest', message: e.message || String(e) };
          console.warn('contact_messages REST 直连异常，准备走 mailto 兜底…', e);
          inserted = false;
        }
      }

      if (inserted) {
        localStorage.setItem(LS_KEY, String(now));
        setContactPayload({ name: '', contact: '', message: '', inquiry_type: 'collect' });
        toastMessageBanner('ok', currentT.msgSuccess);
      } else {
        openMailtoFallback();
        const extra = supabaseErr ? ` (${supabaseErr.stage || 'unknown'}: ${supabaseErr.message || ''})` : '';
        toastMessageBanner('warn', currentT.msgFallbackHint + extra, 15000);
      }
    } catch (err) {
      console.error(err);
      toastMessageBanner('error', currentT.msgError);
    } finally {
      setSendingMessage(false);
    }
  }

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

  const [hashRoute, setHashRoute] = useState(() => parseHash(window.location.hash));
  const [workCurrency, setWorkCurrency] = useState('USD');
  const [workGalleryImgIdx, setWorkGalleryImgIdx] = useState(0);
  const [workLightboxOpen, setWorkLightboxOpen] = useState(false);
  const [workDescFold, setWorkDescFold] = useState(true);
  const [workProductFold, setWorkProductFold] = useState(false);
  const [workCmsGoodsOpen, setWorkCmsGoodsOpen] = useState({});

  function parseHash(hash) {
    if (!hash) return { view: 'home', workId: null };
    const raw = String(hash).replace(/^#/, '').trim();
    const m = raw.match(/^\/work\/(.+)$/i);
    if (m) return { view: 'work', workId: decodeURIComponent(m[1]).trim() };
    return { view: 'home', workId: null };
  }

  function openWorkDetail(work) {
    if (!work) return;
    const slug = work.seo_slug_en || work.seo_slug_zh || slugifyForWork(work.title_en || work.title_zh) || work.id || null;
    if (!slug) return;
    setWorkGalleryImgIdx(0);
    setWorkLightboxOpen(false);
    setWorkDescFold(true);
    setWorkProductFold(false);
    window.location.hash = '#/work/' + encodeURIComponent(slug);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 30);
  }

  function closeWorkDetail() {
    const wasWorkView = hashRoute.view === 'work';
    if (window.location.hash && /^#\/work\//i.test(window.location.hash)) {
      history.replaceState(null, document.title, window.location.pathname + window.location.search + '#works');
    }
    setWorkLightboxOpen(false);
    if (wasWorkView) {
      setHashRoute({ view: 'home', workId: null });
    }
    setTimeout(() => {
      const el = document.getElementById('works');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        setTimeout(() => {
          document.getElementById('works')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
      }
    }, 60);
  }

  const selectedWork = useMemo(() => {
    if (hashRoute.view !== 'work' || !hashRoute.workId) return null;
    const slug = hashRoute.workId;
    const found = works.find(w =>
      (w.id && w.id === slug) ||
      (w.seo_slug_en && w.seo_slug_en === slug) ||
      (w.seo_slug_zh && w.seo_slug_zh === slug) ||
      slugifyForWork(w.title_en || '') === slug ||
      slugifyForWork(w.title_zh || '') === slug
    );
    return found || null;
  }, [hashRoute, works]);

  const workGallery = useMemo(() => {
    if (!selectedWork) return [];
    const primary = selectedWork.image || selectedWork.cover_image;
    const details = Array.isArray(selectedWork.detail_images) ? selectedWork.detail_images.filter(Boolean) : [];
    const ordered = [];
    if (primary) ordered.push(primary);
    details.forEach(u => { if (u && !ordered.includes(u)) ordered.push(u); });
    return ordered;
  }, [selectedWork]);

  useEffect(() => {
    function onHashChange() {
      const next = parseHash(window.location.hash);
      setHashRoute(next);
      requestAnimationFrame(() => {
        if (next.view === 'work') {
          window.scrollTo({ top: 0, behavior: 'auto' });
        } else if (next.view === 'home' && next.workId === null && window.location.hash === '#works') {
          document.getElementById('works')?.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
      });
    }
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const renderWorkDetail = (
    (() => {
      const work = selectedWork;
      if (!work) return null;
      try {
        const safeCurrentT = t[lang] || t.en;
        const wTitle = lang === 'en' ? (work.title_en || '') : (work.title_zh || '');
        const wDesc = lang === 'en' ? (work.description_en || '') : (work.description_zh || '');
        const wCat = lang === 'en' ? (work.category_label_en || work.category || '') : (work.category_label_zh || work.category || '');
        const wMaterial = lang === 'en' ? (work.material_en || work.material || '') : (work.material_zh || work.material || '');
        const wShipMethods = lang === 'en' ? (work.shipping_methods_en || '') : (work.shipping_methods_zh || '');
        const wFraming = lang === 'en' ? (work.framing_en || '') : (work.framing_zh || '');
        const avail = String(work.availability || 'available');
        const availLabel =
          avail === 'available'  ? safeCurrentT.workAvailabilityAvailable :
          avail === 'reserved'   ? safeCurrentT.workAvailabilityReserved :
          avail === 'sold'       ? safeCurrentT.workAvailabilitySold :
          avail === 'exhibition' ? safeCurrentT.workAvailabilityExhibition : '';
        const availBadge =
          avail === 'sold' ? 'bg-rose-950/80 text-rose-200 border-rose-500/40' :
          avail === 'exhibition' ? 'bg-indigo-950/80 text-indigo-200 border-indigo-500/40' :
          avail === 'reserved' ? 'bg-amber-950/80 text-amber-200 border-amber-500/40' :
          'bg-emerald-950/80 text-emerald-200 border-emerald-500/40';
        const priceUsd = Number(work.price_usd || 0);
        const priceCny = Number(work.price_cny || 0);
        const hasAnyPrice = priceUsd > 0 || priceCny > 0;
        const primaryCurrency = workCurrency;
        const primaryPriceAmt = primaryCurrency === 'USD' ? priceUsd : priceCny;
        const altPriceAmt = primaryCurrency === 'USD' ? priceCny : priceUsd;
        const primaryPriceStr = primaryPriceAmt > 0 ? currencyFormat(primaryPriceAmt, primaryCurrency) : null;
        const altPriceStr = altPriceAmt > 0 ? currencyFormat(altPriceAmt, primaryCurrency === 'USD' ? 'CNY' : 'USD') : null;
        const shipFeeUsd = Number(work.shipping_fee_usd || 0);
        const shipFeeCny = Number(work.shipping_fee_cny || 0);
        const shipFeeAmt = primaryCurrency === 'USD' ? shipFeeUsd : shipFeeCny;
        const shipFeeStr = shipFeeAmt > 0 ? currencyFormat(shipFeeAmt, primaryCurrency) : null;
        const hasShipFree = !shipFeeStr && (!shipFeeUsd && !shipFeeCny);

        const ctaLabel =
          avail === 'exhibition' ? safeCurrentT.workCtaExhibition :
          avail === 'sold' ? safeCurrentT.workCtaCustomOrder :
          avail === 'reserved' ? safeCurrentT.workCtaReserveNext :
          hasAnyPrice ? safeCurrentT.workCtaInquire : safeCurrentT.workCtaInquire;

        const gallery = workGallery;
        const totalImages = gallery.length;
        const safeIdx = workGalleryImgIdx >= totalImages ? (totalImages - 1 < 0 ? 0 : totalImages - 1) : (workGalleryImgIdx < 0 ? 0 : workGalleryImgIdx);
        const currentImage = gallery[safeIdx] || gallery[0] || '';

        return (
          <section id="work-detail" className="relative pt-28 pb-28 md:pt-36 md:pb-32 px-6 md:px-20 bg-[#0a0a0a] min-h-screen">
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 md:mb-10">
                <button onClick={closeWorkDetail} className="inline-flex items-center gap-2 text-stone-300 hover:text-amber-300 transition-colors text-sm md:text-base tracking-wider">
                  <ChevronLeft size={18} />
                  {safeCurrentT.workBackBtn}
                </button>
                <div className="flex items-center gap-2 md:gap-3">
                  <button
                    onClick={() => copyWorkInfo(work)}
                    className="inline-flex items-center gap-1.5 px-3 md:px-3.5 py-1.5 md:py-2 text-[11px] md:text-xs rounded-full border border-white/20 text-stone-300 hover:bg-white/10 hover:text-white transition-colors tracking-wider"
                    title={safeCurrentT.workCtaCopyInfo}
                  >
                    <Copy size={13} />
                    {safeCurrentT.workCtaCopyInfo}
                  </button>
                  <a
                    href={currentImage ? currentImage : ''}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => { if (!currentImage) e.preventDefault(); }}
                    className="inline-flex items-center gap-1.5 px-3 md:px-3.5 py-1.5 md:py-2 text-[11px] md:text-xs rounded-full border border-amber-500/40 text-amber-200 hover:bg-amber-950/40 transition-colors tracking-wider"
                    title={safeCurrentT.workViewOriginal}
                  >
                    <Search size={13} />
                    {safeCurrentT.workViewOriginal}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-10 lg:gap-14">
                <div className="lg:col-span-3 space-y-4">
                  <div
                    className="relative bg-black rounded-sm overflow-hidden aspect-square w-full select-none cursor-pointer"
                    onClick={() => currentImage && setWorkLightboxOpen(true)}
                  >
                    <div className="lg:hidden absolute left-0 right-0 top-1/2 -translate-y-1/2 z-10 flex justify-between px-2 pointer-events-none">
                      <button
                        onClick={(e) => { e.stopPropagation(); setWorkGalleryImgIdx(i => Math.max(0, i - 1)); }}
                        className="w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center pointer-events-auto backdrop-blur"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setWorkGalleryImgIdx(i => Math.min(totalImages - 1, i + 1)); }}
                        className="w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center pointer-events-auto backdrop-blur"
                        aria-label="Next image"
                      >
                        <ArrowUpRight size={18} />
                      </button>
                    </div>
                    <div
                      className="lg:hidden h-full w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory whitespace-nowrap no-scrollbar"
                      style={{ WebkitOverflowScrolling: 'touch' }}
                      onScroll={(e) => {
                        const el = e.currentTarget;
                        const idx = Math.round(el.scrollLeft / el.clientWidth);
                        if (idx !== workGalleryImgIdx && idx >= 0 && idx < totalImages) {
                          setWorkGalleryImgIdx(idx);
                        }
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {gallery.map((u, i) => (
                        <img
                          key={i}
                          src={u}
                          alt={`${wTitle || 'Artwork'} ${i + 1}`}
                          className="inline-block w-full h-full object-contain snap-center align-top"
                          draggable={false}
                        />
                      ))}
                    </div>
                    <div className="hidden lg:block w-full h-full">
                      {currentImage ? (
                        <img
                          src={currentImage}
                          alt={wTitle || 'Artwork HD'}
                          className="w-full h-full object-contain select-none pointer-events-none"
                          draggable={false}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone-500 text-xs tracking-widest">
                          {safeCurrentT.workNotFound || 'No image'}
                        </div>
                      )}
                    </div>
                    {totalImages > 0 && (
                      <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-sm bg-black/65 text-white text-[11px] tracking-wider backdrop-blur">
                        {safeCurrentT.workImageIndex.replace('{1}', String(safeIdx + 1)).replace('{2}', String(totalImages))}
                      </div>
                    )}
                  </div>
                  {totalImages > 1 && (
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
                      {gallery.map((u, i) => (
                        <button
                          key={i}
                          onClick={() => setWorkGalleryImgIdx(i)}
                          className={`shrink-0 w-16 md:w-20 h-16 md:h-20 rounded-sm border overflow-hidden bg-black transition-all ${i === safeIdx ? 'border-amber-400 ring-2 ring-amber-400/40' : 'border-white/15 hover:border-white/40'}`}
                          aria-label={`Thumbnail ${i + 1}`}
                        >
                          <img src={u} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="lg:col-span-2 lg:sticky lg:top-28 space-y-5 md:space-y-6 pb-32 lg:pb-8">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {wCat && (
                          <span className="px-2.5 py-1 bg-amber-950/45 border border-amber-500/30 text-amber-300 text-[11px] rounded-sm tracking-wider">
                            {wCat}
                          </span>
                        )}
                        {availLabel && (
                          <span className={`px-2.5 py-1 text-[11px] rounded-sm border tracking-wider ${availBadge}`}>
                            {availLabel}
                          </span>
                        )}
                      </div>
                      <h1 className="text-2xl md:text-3xl lg:text-4xl font-light text-white leading-snug">
                        {wTitle || (safeCurrentT.workNotFound || 'Untitled')}
                      </h1>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-stone-300">
                    {(work.year || work.size || wMaterial) && (
                      <ul className="divide-y divide-white/10 border-y border-white/10 py-2 space-y-2">
                        {work.year && <li className="flex justify-between gap-4"><span className="text-stone-500 text-xs uppercase tracking-widest">{lang === 'en' ? 'Year' : '年份'}</span><span>{work.year}</span></li>}
                        {work.size && <li className="flex justify-between gap-4"><span className="text-stone-500 text-xs uppercase tracking-widest">{lang === 'en' ? 'Size' : '尺寸'}</span><span>{work.size}</span></li>}
                        {wMaterial && <li className="flex justify-between gap-4"><span className="text-stone-500 text-xs uppercase tracking-widest">{lang === 'en' ? 'Material' : '材质'}</span><span>{wMaterial}</span></li>}
                      </ul>
                    )}
                  </div>

                  <div className={`rounded-sm p-4 md:p-5 border space-y-3 ${hasAnyPrice ? 'bg-[#141414] border-amber-500/30' : 'bg-[#141414] border-white/10'}`}>
                    <div className="flex items-center justify-between gap-3">
                      <div className="inline-flex items-center gap-2 text-amber-300">
                        <DollarSign size={16} />
                        <span className="text-[11px] tracking-[0.25em] uppercase">{safeCurrentT.workProductTitle}</span>
                      </div>
                      {hasAnyPrice && (
                        <div className="inline-flex rounded-full border border-white/20 overflow-hidden text-[11px] tracking-widest">
                          <button
                            onClick={() => setWorkCurrency('USD')}
                            className={`px-3 py-1.5 transition-colors ${workCurrency === 'USD' ? 'bg-white text-black' : 'text-stone-300 hover:bg-white/10'}`}
                          >
                            USD
                          </button>
                          <button
                            onClick={() => setWorkCurrency('CNY')}
                            className={`px-3 py-1.5 transition-colors ${workCurrency === 'CNY' ? 'bg-white text-black' : 'text-stone-300 hover:bg-white/10'}`}
                          >
                            CNY
                          </button>
                        </div>
                      )}
                    </div>
                    {hasAnyPrice ? (
                      <div className="space-y-2">
                        <div className="flex items-baseline gap-3">
                          <span className={`text-2xl md:text-3xl font-light ${avail === 'sold' ? 'line-through text-stone-500' : 'text-white'}`}>
                            {primaryPriceStr || currencyFormat(priceUsd || priceCny, priceUsd > 0 ? 'USD' : 'CNY') || (safeCurrentT.workPriceOnRequest || 'Price on Request')}
                          </span>
                          {altPriceStr && (
                            <span className="text-xs text-stone-500 tracking-wider">
                              ≈ {altPriceStr}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
                          <Tag size={12} />
                          {primaryCurrency === 'USD' ? (lang === 'en' ? 'Prices in USD. All final transactions in agreed currency.' : '标价为美元，最终结算以双方确认币种为准。')
                                                     : (lang === 'en' ? 'Prices in CNY. All final transactions in agreed currency.' : '标价为人民币，最终结算以双方确认币种为准。')}
                        </div>
                      </div>
                    ) : (
                      <div className="text-amber-200 text-sm tracking-wider font-light">
                        {safeCurrentT.workPriceOnRequest}
                      </div>
                    )}

                    <div className="space-y-2 pt-2 border-t border-white/10">
                      <div className="flex items-center gap-2 text-xs text-stone-300">
                        <Truck size={14} className="text-amber-300 shrink-0" />
                        <span className="font-medium text-stone-200">{safeCurrentT.workShippingFee}</span>
                        <span className="text-stone-400">
                          {hasShipFree ? safeCurrentT.workShippingFree : shipFeeStr || (lang === 'en' ? 'Contact for rates' : '运费咨询')}
                        </span>
                      </div>
                      {wShipMethods && (
                        <div className="flex items-start gap-2 text-xs text-stone-300">
                          <Package size={14} className="text-amber-300 shrink-0 mt-0.5" />
                          <span className="font-medium text-stone-200 mr-1">{safeCurrentT.workShippingMethods}</span>
                          <span className="text-stone-400 leading-relaxed">{wShipMethods}</span>
                        </div>
                      )}
                      {wFraming && (
                        <div className="flex items-start gap-2 text-xs text-stone-300">
                          <Shuffle size={14} className="text-amber-300 shrink-0 mt-0.5" />
                          <span className="font-medium text-stone-200 mr-1">{safeCurrentT.workFraming}</span>
                          <span className="text-stone-400 leading-relaxed">{wFraming}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="rounded-sm border border-white/10 bg-[#141414] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setWorkProductFold(v => !v)}
                      className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
                      aria-expanded={!workProductFold}
                    >
                      <span className="inline-flex items-center gap-2 text-sm text-white tracking-wider">
                        <Package size={16} className="text-amber-300" />
                        {safeCurrentT.workDetailTitle}
                      </span>
                      <span className="text-stone-400">
                        {workProductFold ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                      </span>
                    </button>
                    {!workProductFold && (
                      <div className="px-4 pb-4 pt-1 text-sm md:text-[15px] font-light text-stone-200 leading-loose tracking-wide">
                        <div className={`${workDescFold ? 'line-clamp-4' : ''}`}>
                          {wDesc ? wDesc.split(/\n/).filter(Boolean).map((line, i) => (
                            <p key={i} className="mb-2 last:mb-0">{line}</p>
                          )) : (
                            <p className="text-stone-500 italic text-xs">{lang === 'en' ? 'No additional description.' : '暂无更多描述。'}</p>
                          )}
                        </div>
                        {wDesc && (wDesc.length > 160 || wDesc.split(/\n/).length > 4) && (
                          <button
                            type="button"
                            onClick={() => setWorkDescFold(v => !v)}
                            className="mt-2 inline-flex items-center gap-1 text-xs text-amber-300 hover:text-amber-200 tracking-wider"
                          >
                            {workDescFold ? safeCurrentT.workDescMore : safeCurrentT.workDescLess}
                            {workDescFold ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="fixed inset-x-0 bottom-0 z-[180] lg:hidden border-t border-white/15 bg-gradient-to-b from-black/70 via-black/85 to-[#0a0a0a] backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[11px] text-stone-400 tracking-wider">{wCat}{availLabel ? ` · ${availLabel}` : ''}</div>
                    <div className="truncate text-sm text-white">{wTitle}</div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => currentImage && setWorkLightboxOpen(true)}
                      className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-white/20 text-stone-200 hover:bg-white/10"
                      title={safeCurrentT.workViewOriginal}
                      aria-label={safeCurrentT.workViewOriginal}
                    >
                      <Search size={16} />
                    </button>
                    <button
                      onClick={() => inquireWork(work)}
                      className={`h-10 px-4 md:px-5 inline-flex items-center gap-1.5 rounded-full tracking-[0.2em] text-xs font-medium transition-all ${
                        avail === 'sold' ? 'bg-stone-700 text-stone-100 hover:bg-stone-600' :
                        avail === 'exhibition' ? 'bg-indigo-700 text-white hover:bg-indigo-600' :
                        'bg-amber-300 text-black hover:bg-amber-200'
                      }`}
                    >
                      <ShoppingBag size={14} />
                      {ctaLabel}
                    </button>
                  </div>
                </div>
              </div>

              {workLightboxOpen && currentImage && (
                <div
                  className="fixed inset-0 z-[220] bg-black/95 backdrop-blur-xl p-3 md:p-8 flex items-center justify-center animate-fadeIn"
                  onClick={() => setWorkLightboxOpen(false)}
                >
                  <button
                    onClick={(e) => { e.stopPropagation(); setWorkLightboxOpen(false); }}
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-white hover:text-black transition-colors"
                    aria-label="Close lightbox"
                  >
                    <X size={18} />
                  </button>
                  <div className="absolute top-4 left-4 z-20 flex gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); setWorkGalleryImgIdx(i => Math.max(0, i - 1)); }}
                      className="p-2 rounded-full bg-black/60 text-white disabled:opacity-40 hover:bg-white hover:text-black transition-colors"
                      disabled={safeIdx <= 0}
                      aria-label="Previous"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setWorkGalleryImgIdx(i => Math.min(totalImages - 1, i + 1)); }}
                      className="p-2 rounded-full bg-black/60 text-white disabled:opacity-40 hover:bg-white hover:text-black transition-colors"
                      disabled={safeIdx >= totalImages - 1}
                      aria-label="Next"
                    >
                      <ArrowUpRight size={18} />
                    </button>
                  </div>
                  <img
                    src={currentImage}
                    alt={wTitle || 'Artwork'}
                    className="max-w-full max-h-full w-auto h-auto object-contain select-none touch-none"
                    onClick={(e) => e.stopPropagation()}
                    draggable={false}
                    style={{ maxWidth: 'calc(100vw - 48px)', maxHeight: 'calc(100vh - 48px)' }}
                  />
                  {totalImages > 1 && (
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-black/70 text-white text-[11px] tracking-widest backdrop-blur">
                      {safeIdx + 1} / {totalImages}
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        );
      } catch (err) {
        const safeCurrentT = t[lang] || t.en;
        console.error('renderWorkDetail failed', err);
        return (
          <section id="work-detail" className="relative pt-36 pb-28 md:pt-40 md:pb-32 px-6 md:px-20 bg-[#0a0a0a] min-h-screen">
            <div className="max-w-2xl mx-auto space-y-6 text-center">
              <h2 className="text-2xl md:text-3xl text-white font-light">{safeCurrentT.workNotFound}</h2>
              <button onClick={closeWorkDetail} className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-black text-xs tracking-widest hover:bg-amber-300 transition-colors mx-auto">
                <ChevronLeft size={16} /> {safeCurrentT.workNotFoundBack}
              </button>
            </div>
          </section>
        );
      }
    })()
  );

  useEffect(() => {
    setWorkGalleryImgIdx(0);
    setWorkLightboxOpen(false);
    setWorkDescFold(true);
    setWorkProductFold(false);
  }, [selectedWork?.id]);

  function inquireWork(work) {
    if (!work) return;
    const wTitle = lang === 'en' ? (work.title_en || '') : (work.title_zh || '');
    setContactPayload(p => ({
      ...p,
      inquiry_type: work.availability === 'exhibition' ? 'exhibition'
                   : (work.availability === 'sold' || work.availability === 'reserved') ? 'collect'
                   : 'collect',
      message: (p.message ? p.message + '\n\n' : '') +
               `[${lang === 'en' ? 'Inquiry about artwork' : '咨询作品'}] ${wTitle}${work.year ? ` · ${work.year}` : ''}${work.size ? ` · ${work.size}` : ''}`
    }));
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }

  async function copyWorkInfo(work) {
    try {
      const wTitle = lang === 'en' ? (work.title_en || '') : (work.title_zh || '');
      const material = lang === 'en' ? (work.material_en || work.material || '') : (work.material_zh || work.material || '');
      const lines = [wTitle, work.year ? work.year : '', work.size ? work.size : '', material ? material : ''];
      if (Number(work.price_usd || 0) > 0) lines.push(lang === 'en' ? `USD $${Number(work.price_usd).toLocaleString()}` : `美元 ${Number(work.price_usd).toLocaleString()}`);
      if (Number(work.price_cny || 0) > 0) lines.push(lang === 'en' ? `CNY ¥${Number(work.price_cny).toLocaleString()}` : `人民币 ${Number(work.price_cny).toLocaleString()}`);
      lines.push(window.location.href);
      const text = lines.filter(Boolean).join('\n');
      if (navigator?.clipboard?.writeText) await navigator.clipboard.writeText(text);
      toastMessageBanner('ok', currentT.workCopySuccess, 3000);
    } catch (e) {
      console.warn('copyWorkInfo failed', e);
    }
  }

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
            detail_images: Array.isArray(item.detail_images)
              ? item.detail_images.map(u => normalizeImageUrl(u)).filter(Boolean)
              : item.detail_images && typeof item.detail_images === 'string'
                ? String(item.detail_images).split(/\r?\n/).map(s => s.trim()).filter(Boolean).map(u => normalizeImageUrl(u))
                : [],
            availability: item.availability || 'available',
            price_cny: item.price_cny === '' || item.price_cny === null || item.price_cny === undefined ? null : Number(item.price_cny) || 0,
            price_usd: item.price_usd === '' || item.price_usd === null || item.price_usd === undefined ? null : Number(item.price_usd) || 0,
            shipping_fee_cny: item.shipping_fee_cny === '' || item.shipping_fee_cny === null || item.shipping_fee_cny === undefined ? 0 : Number(item.shipping_fee_cny) || 0,
            shipping_fee_usd: item.shipping_fee_usd === '' || item.shipping_fee_usd === null || item.shipping_fee_usd === undefined ? 0 : Number(item.shipping_fee_usd) || 0,
            shipping_methods_en: item.shipping_methods_en || '',
            shipping_methods_zh: item.shipping_methods_zh || '',
            framing_en: item.framing_en || '',
            framing_zh: item.framing_zh || '',
            seo_slug_en: item.seo_slug_en || '',
            seo_slug_zh: item.seo_slug_zh || '',
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
        const cleanAbout = aboutData.map(({ id: _id, ...rest }) => ({
          ...rest,
          image: normalizeImageUrl(rest.image),
        }));
        ensureSuccess(await supabase.from('about_data').insert(cleanAbout), 'Insert about_data failed');
      }

      ensureSuccess(await supabase.from('works').delete().neq('id', 0), 'Delete works failed');
      if (works.length > 0) {
        const cleanWorks = works.map(({ id: _id, ...rest }) => ({
          ...rest,
          material_zh: rest.material_zh ?? rest.material ?? null,
          material_en: rest.material_en ?? rest.material ?? null,
          image: normalizeImageUrl(rest.image),
          cover_image: normalizeImageUrl(rest.cover_image),
          detail_images: Array.isArray(rest.detail_images)
            ? rest.detail_images.map(u => normalizeImageUrl(u)).filter(Boolean)
            : (rest.detail_images && typeof rest.detail_images === 'string'
              ? String(rest.detail_images).split(/\r?\n/).map(s => s.trim()).filter(Boolean).map(u => normalizeImageUrl(u))
              : []),
          price_cny: rest.price_cny === '' || rest.price_cny === null || rest.price_cny === undefined ? null : Number(rest.price_cny) || 0,
          price_usd: rest.price_usd === '' || rest.price_usd === null || rest.price_usd === undefined ? null : Number(rest.price_usd) || 0,
          shipping_fee_cny: rest.shipping_fee_cny === '' || rest.shipping_fee_cny === null || rest.shipping_fee_cny === undefined ? 0 : Number(rest.shipping_fee_cny) || 0,
          shipping_fee_usd: rest.shipping_fee_usd === '' || rest.shipping_fee_usd === null || rest.shipping_fee_usd === undefined ? 0 : Number(rest.shipping_fee_usd) || 0,
          shipping_methods_en: (rest.shipping_methods_en && String(rest.shipping_methods_en).trim()) ? String(rest.shipping_methods_en).trim() : null,
          shipping_methods_zh: (rest.shipping_methods_zh && String(rest.shipping_methods_zh).trim()) ? String(rest.shipping_methods_zh).trim() : null,
          framing_en: (rest.framing_en && String(rest.framing_en).trim()) ? String(rest.framing_en).trim() : null,
          framing_zh: (rest.framing_zh && String(rest.framing_zh).trim()) ? String(rest.framing_zh).trim() : null,
          availability: rest.availability || 'available',
          seo_slug_zh: rest.seo_slug_zh === '' ? null : (rest.seo_slug_zh || null),
          seo_slug_en: rest.seo_slug_en === '' ? null : (rest.seo_slug_en || null),
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

  async function loadMessages() {
    if (!supabase || !user) { setMessages([]); return; }
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        if (!/.*relation.*does not exist|PGRST202|Policies failed|not found/i.test(String(error.message || error))) {
          throw error;
        }
        setMessages([]);
        return;
      }
      setMessages(Array.isArray(data) ? data : []);
    } catch (e) {
      console.warn('Load contact messages failed:', e);
      setMessages([]);
    }
  }

  async function updateMessageStatus(id, nextStatus) {
    if (!supabase || !user) return;
    try {
      const result = await supabase.from('contact_messages').update({ status: nextStatus }).eq('id', id);
      if (result?.error) throw new Error(result.error.message || 'Update contact_messages status failed');
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status: nextStatus } : m)));
    } catch (e) {
      console.warn(e);
      toastMessageBanner('error', currentT.msgError);
    }
  }

  async function deleteMessage(id) {
    if (!supabase || !user) return;
    if (!window.confirm(lang === 'en' ? 'Delete this message permanently?' : '确认要永久删除这条留言吗？')) return;
    try {
      const result = await supabase.from('contact_messages').delete().eq('id', id);
      if (result?.error) throw new Error(result.error.message || 'Delete contact_message failed');
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch (e) {
      console.warn(e);
      toastMessageBanner('error', currentT.msgError);
    }
  }

  useEffect(() => {
    const currentT = t[lang] || t.en;
    const aboutItem = aboutData[aboutIdx];
    const aboutTitle = aboutItem?.[lang === 'en' ? 'title_en' : 'title_zh'];
    const aboutKind = detectAboutKind(aboutItem);
    const aboutLines = toLines(aboutItem?.[lang === 'en' ? 'desc_en' : 'desc_zh'] || '');
    const aboutDescription =
      aboutKind === 'text'
        ? (aboutItem?.[lang === 'en' ? 'desc_en' : 'desc_zh'] || '').split(/\n+/).map(s => s.trim()).filter(Boolean).join('  ')
        : aboutLines.slice(0, 2).join(' · ');

    if (selectedWork) {
      const workTitle = selectedWork[lang === 'en' ? 'title_en' : 'title_zh'];
      const workYear = selectedWork.year;
      const workSize = selectedWork.size;
      const workMaterial = selectedWork[lang === 'en' ? 'material_en' : 'material_zh'];
      const workDesc = selectedWork[lang === 'en' ? 'description_en' : 'description_zh'];
      const avail = String(selectedWork.availability || 'available');
      const availLabel =
        avail === 'available'  ? currentT.workAvailabilityAvailable
        : avail === 'reserved' ? currentT.workAvailabilityReserved
        : avail === 'sold'     ? currentT.workAvailabilitySold
        : avail === 'exhibition' ? currentT.workAvailabilityExhibition
        : '';
      const brand = lang === 'en' ? 'Meet Lucy · Contemporary Ink Artist' : 'Lucy 坊 · 当代水墨艺术家';

      const priceUsd = Number(selectedWork.price_usd || 0);
      const priceCny = Number(selectedWork.price_cny || 0);
      const primaryPrice = workCurrency === 'USD' && priceUsd > 0
        ? currencyFormat(priceUsd, 'USD')
        : priceCny > 0 ? currencyFormat(priceCny, 'CNY')
        : priceUsd > 0 ? currencyFormat(priceUsd, 'USD')
        : null;

      const titleParts = [workTitle, workYear, workSize, primaryPrice || availLabel].filter(Boolean);
      const title = `${titleParts.join(' · ')} | ${brand}`;

      const descParts = [workMaterial, primaryPrice ? (lang === 'en' ? `Price ${primaryPrice}` : `售价 ${primaryPrice}`) : '', availLabel, workDesc].filter(Boolean);
      const description = descParts.join(' — ') ||
        (lang === 'en'
          ? `Artwork details from Meet Lucy portfolio: ${workTitle || ''}`.trim()
          : `Lucy 坊作品详情：${workTitle || ''}`.trim());

      document.title = title;
      setMetaDescription(description);
      setOgTitleAndUrl(title);
      setJsonLdProduct(selectedWork, lang);
      return;
    } else {
      setJsonLdProduct(null, lang);
    }

    const brandPart = SITE_TITLE_DEFAULT.split('|')[1]?.trim() || SITE_TITLE_DEFAULT;
    const title = `${aboutTitle || currentT.heroTitle1 + ' · ' + currentT.heroTitle2} | ${brandPart}`;
    const description =
      aboutDescription ||
      SITE_DESC_DEFAULT;
    document.title = title;
    setMetaDescription(description);
    setOgTitleAndUrl(title);
  }, [lang, aboutIdx, aboutData, selectedWork, workCurrency]);

  useEffect(() => {
    if (aboutData.length === 0) return;
    const timer = setInterval(() => {
      if (aboutHover || aboutAutoPausedByUser) return;
      setAboutIdx((prev) => (prev + 1) % aboutData.length);
    }, 9000);
    return () => clearInterval(timer);
  }, [aboutData.length, aboutHover, aboutAutoPausedByUser]);

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
      {!selectedWork && (
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
      )}

      {/* 个人经历 (ABOUT) */}
      {!selectedWork && (
        <section id="about" className="reveal-section relative py-24 md:py-48 px-6 md:px-20 bg-[#0d0d0d] overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="lg:col-span-5 relative group"
                    onMouseEnter={() => setAboutHover(true)}
                    onMouseLeave={() => setAboutHover(false)}
                  >
            <div className="relative aspect-[9/16] md:aspect-[3/4] overflow-visible">
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
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-stone-950 via-[#141414] to-black border border-dashed border-amber-300/15 rounded-sm">
                      <div className="flex flex-col items-center gap-4 px-6 py-5">
                        {isLoading && <div className="h-12 w-12 rounded-full border-2 border-white/15 border-t-amber-300/80 animate-spin" />}
                        {isMissing && <div className="h-14 w-14 rounded-full bg-amber-950/40 border border-amber-300/25 text-amber-300 flex items-center justify-center"><Search size={22} /></div>}
                        {isError && <div className="h-14 w-14 rounded-full bg-rose-950/40 border border-rose-400/25 text-rose-300 flex items-center justify-center"><AlertTriangle size={22} /></div>}
                        <div className="text-center space-y-1">
                          <div className="text-sm md:text-base tracking-[0.2em] text-stone-200 font-light">
                            {isLoading ? 'LOADING IMAGE' : isMissing ? 'NO IMAGE SET' : 'IMAGE LOAD FAILED'}
                          </div>
                          <div className="text-[11px] md:text-xs tracking-widest text-stone-500 leading-relaxed">
                            {isLoading ? '正在加载作品图，请稍候…' : isMissing ? '请在 CMS Biography 板块上传对应图片，此处会自动占位保持版面。' : '图片 URL 无法访问，请在 CMS 中检查或更换链接。'}
                          </div>
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
          <div className="lg:col-span-7 flex flex-col justify-center"
            onMouseEnter={() => setAboutHover(true)}
            onMouseLeave={() => setAboutHover(false)}
          >
            <span className="text-amber-300 tracking-[0.3em] text-xs uppercase mb-3 block font-medium">{currentT.aboutTag}</span>
            <div className="relative min-h-[320px] md:min-h-[420px] mb-8 overflow-hidden">
              {aboutData.map((data, idx) => {
                const kind = detectAboutKind(data);
                const descRaw = lang === 'en' ? data.desc_en : data.desc_zh;
                const paragraphs = String(descRaw || '').split(/\n{2,}/).map(s => s.trim()).filter(Boolean);
                const lines = toLines(descRaw);
                const isResume = kind === 'resume';
                const isStatement = kind === 'statement';

                return (
                  <div key={idx} className={`transition-all duration-700 absolute inset-0 overflow-y-auto pr-3 md:pr-6 ${aboutIdx === idx ? 'opacity-100 z-10 translate-y-0' : 'opacity-0 z-0 translate-y-4 pointer-events-none'}`}>
                    <h2 className="text-2xl md:text-4xl font-light text-white mb-5 leading-snug">
                      {lang === 'en' ? data.title_en : data.title_zh}
                    </h2>

                    {isResume && (
                      <ul className="space-y-3 text-stone-300 leading-relaxed tracking-wide text-sm md:text-base font-light">
                        {lines.map((line, i) => (
                          <li key={i} className="flex gap-3 items-start">
                            <span className="mt-2 h-[1px] w-5 shrink-0 bg-amber-300/60" />
                            <span className="text-stone-200/90">{line}</span>
                          </li>
                        ))}
                        {lines.length === 0 && (
                          <p className="text-stone-300 leading-relaxed tracking-wider text-sm md:text-lg font-light">{descRaw}</p>
                        )}
                      </ul>
                    )}

                    {isStatement && (
                      <figure className="border-l-[2px] border-amber-300/60 pl-5 md:pl-6 space-y-4">
                        {paragraphs.length > 0 ? (
                          paragraphs.map((p, i) => (
                            <blockquote key={i} className="text-stone-200/95 italic leading-loose tracking-wider text-[15px] md:text-xl font-light">
                              {p}
                            </blockquote>
                          ))
                        ) : (
                          <blockquote className="text-stone-200/95 italic leading-loose tracking-wider text-[15px] md:text-xl font-light">
                            {descRaw}
                          </blockquote>
                        )}
                        <figcaption className="pt-2 text-[11px] md:text-xs tracking-[0.3em] uppercase text-amber-300/80">
                          — Lucy · Artist Statement
                        </figcaption>
                      </figure>
                    )}

                    {!isResume && !isStatement && (
                      <div className="space-y-4 text-stone-300 leading-loose tracking-wide text-sm md:text-[15px] font-light">
                        {paragraphs.length > 0 ? (
                          paragraphs.map((p, i) => <p key={i}>{p}</p>)
                        ) : (
                          <p>{descRaw}</p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between gap-6 mt-12 md:mt-16">
              <div className="flex gap-3">
                {aboutData.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setAboutIdx(idx); setAboutAutoPausedByUser(true); }}
                    className={`h-[2px] rounded-full transition-all ${aboutIdx === idx ? 'w-12 bg-amber-300' : 'w-6 bg-white/20'}`}
                    aria-label={`About slide ${idx + 1}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2 text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-stone-500">
                <button
                  onClick={() => setAboutIdx((p) => (p - 1 + aboutData.length) % aboutData.length)}
                  onMouseDown={() => setAboutAutoPausedByUser(true)}
                  className="p-2 rounded-full border border-white/10 hover:text-amber-300 hover:border-amber-300/40 text-stone-400 transition-colors"
                  aria-label="Previous about"
                >←</button>
                <span className="tabular-nums">{String(aboutIdx + 1).padStart(2, '0')} / {String(aboutData.length).padStart(2, '0')}</span>
                <button
                  onClick={() => setAboutIdx((p) => (p + 1) % aboutData.length)}
                  onMouseDown={() => setAboutAutoPausedByUser(true)}
                  className="p-2 rounded-full border border-white/10 hover:text-amber-300 hover:border-amber-300/40 text-stone-400 transition-colors"
                  aria-label="Next about"
                >→</button>
              </div>
            </div>
            <div className="mt-5 text-[10px] tracking-[0.3em] uppercase text-stone-500/80">
              {aboutHover || aboutAutoPausedByUser ? '⏸ Auto-scroll paused' : '▶ Auto-playing · 9s'}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* 精选作品 (WORKS) */}
      {!selectedWork && (
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
              {filteredWorks.map((work, idx) => {
                const avail = String(work.availability || 'available');
                const availLabel =
                  avail === 'available' ? currentT.workAvailabilityAvailable :
                  avail === 'reserved' ? currentT.workAvailabilityReserved :
                  avail === 'sold' ? currentT.workAvailabilitySold :
                  avail === 'exhibition' ? currentT.workAvailabilityExhibition : '';
                const priceUsd = Number(work.price_usd || 0);
                const priceCny = Number(work.price_cny || 0);
                const showPrice = priceUsd > 0 ? currencyFormat(priceUsd, 'USD') : (priceCny > 0 ? currencyFormat(priceCny, 'CNY') : null);
                return (
                  <div key={idx} className="bg-[#161616] border border-white/10 rounded-sm overflow-hidden shadow-2xl flex flex-col justify-between group">
                    <div>
                      <div className="relative aspect-[9/16] overflow-hidden bg-black cursor-pointer" onClick={() => openWorkDetail(work)}>
                        <img src={work.cover_image || work.image || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675'} alt={work.title_en} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] text-amber-200 rounded-sm">
                          {lang === 'en' ? work.category_label_en : work.category_label_zh}
                        </div>
                        {availLabel && avail !== 'available' && (
                          <div className={`absolute top-4 left-4 backdrop-blur-md px-3 py-1 text-[11px] rounded-sm ${avail === 'sold' ? 'bg-rose-950/80 text-rose-200 border border-rose-500/40' : avail === 'exhibition' ? 'bg-indigo-950/80 text-indigo-200 border border-indigo-500/40' : 'bg-amber-950/80 text-amber-200 border border-amber-500/40'}`}>
                            {availLabel}
                          </div>
                        )}
                        {showPrice && (
                          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 text-xs text-white rounded-sm border border-white/20">
                            {showPrice}
                          </div>
                        )}
                      </div>
                      <div className="p-6 space-y-3">
                        <div className="flex justify-between text-xs text-amber-200/90"><span>{work.year}</span><span>{work.size}</span></div>
                        <h3 className="text-xl font-light text-white">{lang === 'en' ? work.title_en : work.title_zh}</h3>
                        <p className="text-xs text-stone-400">{lang === 'en' ? (work.material_en || work.material || '') : (work.material_zh || work.material || '')}</p>
                        <p className="text-xs text-stone-300 font-light leading-relaxed pt-2 border-t border-white/10 line-clamp-3">
                          {lang === 'en' ? work.description_en : work.description_zh}
                        </p>
                      </div>
                    </div>
                    <div className="p-6 pt-0"><button onClick={() => openWorkDetail(work)} className="text-xs text-amber-300 inline-flex items-center gap-1 hover:text-white">{currentT.detailBtn} <ArrowUpRight size={14} /></button></div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 作品独立详情二级页（方案2：全屏独占，URL hash #/work/:slug） */}
      {renderWorkDetail}

      {/* 美育愿景 (VISION) */}
      {!selectedWork && (
        <section id="vision" className="reveal-section relative py-24 md:py-36 px-6 md:px-20 bg-[#0d0d0d] border-t border-white/10">
        <div className="max-w-6xl mx-auto space-y-16 relative z-10">
          <div className="text-center space-y-6">
            <span className="text-amber-300 tracking-[0.4em] text-xs uppercase block font-medium">{currentT.visionTag}</span>
            <h2 className="text-3xl md:text-5xl font-light text-white leading-snug">{currentT.visionTitle}</h2>
            <div className="w-16 h-[1px] bg-amber-300/50 mx-auto"></div>
            <p className="text-stone-300 text-sm md:text-lg font-light leading-loose tracking-wide max-w-4xl mx-auto">
              {currentT.visionMission}
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Sparkles size={18} className="text-amber-300" />
              <h3 className="text-xl md:text-2xl font-light text-white">{currentT.visionPhilosophyTitle}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(currentT.visionPhilosophy || []).map((item, idx) => {
                const icons = [Leaf, Feather, Palette];
                const Icon = icons[idx % icons.length];
                return (
                  <div key={idx} className="group relative p-6 md:p-7 bg-[#141414] border border-white/10 rounded-sm hover:border-amber-300/30 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-full bg-amber-950/40 border border-amber-500/20 text-amber-300">
                        <Icon size={18} />
                      </div>
                      <div className="text-[11px] tracking-[0.25em] uppercase text-stone-500">0{idx + 1}</div>
                    </div>
                    <p className="text-stone-200/90 leading-loose tracking-wide text-sm md:text-[15px] font-light">
                      {item}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Compass size={18} className="text-amber-300" />
              <h3 className="text-xl md:text-2xl font-light text-white">{currentT.visionActionsTitle}</h3>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {(currentT.visionActions || []).map((item, idx) => (
                <li key={idx} className="flex gap-4 items-start p-4 md:p-5 bg-[#121212] border border-white/5 rounded-sm">
                  <div className="mt-0.5 shrink-0 flex items-center justify-center h-9 w-9 rounded-full border border-amber-300/30 text-amber-300">
                    <BookOpen size={16} />
                  </div>
                  <p className="text-stone-200/90 leading-loose tracking-wide text-sm md:text-[15px] font-light">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <figure className="max-w-4xl mx-auto text-center space-y-4 border-t border-b border-amber-300/20 py-10">
            {(currentT.visionQuote || []).map((line, i) => (
              <blockquote key={i} className="text-stone-200/95 italic leading-loose tracking-wider text-base md:text-2xl font-light">
                {line}
              </blockquote>
            ))}
            <figcaption className="pt-4 text-[11px] md:text-xs tracking-[0.35em] uppercase text-amber-300/80 flex items-center justify-center gap-2">
              <MessageCircleHeart size={14} /> Lucy 坊 · Meet Lucy
            </figcaption>
          </figure>
        </div>
      </section>
      )}

      {/* 联系画廊 (CONTACT) */}
      {!selectedWork && (
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
          <div className="lg:col-span-7 bg-[#161616] p-8 md:p-14 border border-white/10 rounded-lg shadow-2xl relative">
            <form onSubmit={submitContactForm} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] text-stone-400 uppercase mb-2">{currentT.nameLabel}</label>
                  <input
                    type="text"
                    value={contactPayload.name}
                    onChange={(e) => setContactPayload((p) => ({ ...p, name: e.target.value }))}
                    placeholder={currentT.nameHint}
                    className="w-full bg-transparent border-b border-white/20 pb-2 text-sm text-white placeholder:text-stone-600 focus:outline-none focus:border-amber-300"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-stone-400 uppercase mb-2">{currentT.contactLabel}</label>
                  <input
                    type="text"
                    value={contactPayload.contact}
                    onChange={(e) => setContactPayload((p) => ({ ...p, contact: e.target.value }))}
                    placeholder={currentT.contactHint}
                    className="w-full bg-transparent border-b border-white/20 pb-2 text-sm text-white placeholder:text-stone-600 focus:outline-none focus:border-amber-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-stone-400 uppercase mb-2">{currentT.inquiryTypeLabel}</label>
                <select
                  value={contactPayload.inquiry_type}
                  onChange={(e) => setContactPayload((p) => ({ ...p, inquiry_type: e.target.value }))}
                  className="w-full bg-[#101010] border border-white/10 rounded-sm px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-300"
                >
                  {(currentT.inquiryTypes || []).map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-stone-400 uppercase mb-2">{currentT.msgLabel}</label>
                <textarea
                  rows={5}
                  value={contactPayload.message}
                  onChange={(e) => setContactPayload((p) => ({ ...p, message: e.target.value }))}
                  placeholder={currentT.msgHint}
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-sm text-white placeholder:text-stone-600 focus:outline-none focus:border-amber-300 resize-none"
                />
              </div>

              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  disabled={!isContactValid || sendingMessage}
                  className={`w-full py-4 font-medium tracking-[0.3em] transition-all text-xs rounded-sm ${
                    !isContactValid || sendingMessage
                      ? 'bg-white/10 text-white/40 cursor-not-allowed'
                      : 'bg-white text-black hover:bg-amber-300'
                  }`}
                >
                  {sendingMessage ? currentT.sendingBtn : currentT.sendBtn}
                </button>
                {messageBanner && (
                  <div className={`flex items-start gap-3 rounded-sm border px-3.5 py-2.5 text-[13px] leading-relaxed tracking-wide ${
                    messageBanner.level === 'ok' ? 'border-emerald-400/30 bg-emerald-500/5 text-emerald-100' :
                    messageBanner.level === 'warn' ? 'border-amber-300/40 bg-amber-500/5 text-amber-100' :
                    'border-rose-400/30 bg-rose-500/5 text-rose-100'
                  }`}>
                    {messageBanner.level === 'ok' ? <CheckCircle size={16} className="mt-0.5 shrink-0" /> :
                     messageBanner.level === 'warn' ? <AlertTriangle size={16} className="mt-0.5 shrink-0" /> :
                     <AlertTriangle size={16} className="mt-0.5 shrink-0" />}
                    <span>{messageBanner.text}</span>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
      )}

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

      {/* 安全登录与管理后台抽屉面板 */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-[250] bg-black/90 backdrop-blur-2xl flex justify-end">
          <div className="w-full max-w-5xl bg-[#121212] border-l border-white/10 h-full flex flex-col shadow-2xl">
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
                <div className="flex justify-between items-center px-6 py-4 bg-[#181818] border-b border-white/10 text-sm text-stone-300">
                  <span>Logged in as: <strong className="text-amber-200 font-semibold">{user.email}</strong></span>
                  <button onClick={handleLogout} className="text-red-400 hover:text-red-300 flex items-center gap-1.5">
                    <LogOut size={16} /> <span className="font-medium">{currentT.logoutBtn}</span>
                  </button>
                </div>

                <div className="flex border-b border-white/10 bg-[#141414]">
                  {[
                    { key: 'about', label: 'Biography (经历)' },
                    { key: 'works', label: 'Works (作品)' },
                    { key: 'socials', label: 'Socials (社媒)' },
                    { key: 'messages', label: currentT.adminMessagesTab + ' (留言管理)' }
                  ].map(tab => (
                    <button
                      key={tab.key}
                      onClick={() => {
                        setAdminSection(tab.key);
                        if (tab.key === 'messages') loadMessages();
                      }}
                      className={`flex-1 py-5 text-sm tracking-[0.12em] ${adminSection === tab.key ? 'text-amber-300 border-b-2 border-amber-300 bg-white/5 font-semibold' : 'text-stone-400 hover:text-stone-200 hover:bg-white/5'}`}
                    >{tab.label}</button>
                  ))}
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                  {saveToast && <div className="p-3 bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs tracking-widest text-center rounded-sm animate-pulse">{currentT.saveSuccess}</div>}
                  
                  {/* 经历管理 */}
                  {adminSection === 'about' && (
                    <div className="space-y-8">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-stone-300">Manage Biography Cards · 个人经历卡片（图片/双语标题/描述）</span>
                        <button onClick={() => setAboutData([...aboutData, { title_zh: '中文标题', title_en: 'English Title', desc_zh: '中文描述', desc_en: 'English Desc', image: '' }])} className="px-4 py-2 bg-amber-300 text-black text-sm rounded-sm flex items-center gap-1.5 font-medium hover:bg-white transition-colors shadow-lg"><Plus size={16} /> Add Card</button>
                      </div>
                      {aboutData.map((item, idx) => (
                        <div key={idx} className="p-6 md:p-7 bg-[#1a1a1a] border border-white/10 rounded-sm space-y-5 shadow-lg hover:border-white/20 transition-colors">
                          <div className="flex justify-between items-center pb-2 border-b border-white/10"><span className="text-sm md:text-base text-amber-200 font-semibold tracking-wide">◆ Card #{idx + 1}</span><button onClick={() => setAboutData(aboutData.filter((_, i) => i !== idx))} className="text-red-400 text-sm flex items-center gap-1.5 hover:text-red-300 hover:bg-red-950/30 px-2.5 py-1.5 rounded-sm transition-colors"><Trash2 size={15} /> Delete</button></div>
                          
                          <div className="space-y-1.5 pt-1">
                            <label className="text-xs text-stone-300 uppercase tracking-[0.1em] font-medium flex items-center gap-1">
                              <LinkIcon size={12} className="text-amber-300" /> Biography Image URL (经历照片外链)
                            </label>
                            <div className="flex items-center gap-3">
                              {item.image && (
                                <img src={item.image} alt="Preview" className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-sm border border-white/20 shrink-0 shadow-md" />
                              )}
                              <input 
                                type="url" 
                                placeholder="https://..." 
                                value={item.image || ''} 
                                onChange={e => { const arr = [...aboutData]; arr[idx].image = e.target.value; setAboutData(arr); }} 
                                className="w-full bg-black border border-white/20 p-2.5 text-sm text-white leading-relaxed rounded-sm focus:border-amber-300 focus:outline-none" 
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 pt-1">
                            <input type="text" placeholder="Title (EN) · 含 Resume/Statement 会自动变样式" value={item.title_en || ''} onChange={e => { const arr = [...aboutData]; arr[idx].title_en = e.target.value; setAboutData(arr); }} className="bg-black border border-white/20 p-2.5 text-sm text-white leading-relaxed rounded-sm" />
                            <input type="text" placeholder="标题 (中文) · 含「履历/自述」自动变样式" value={item.title_zh || ''} onChange={e => { const arr = [...aboutData]; arr[idx].title_zh = e.target.value; setAboutData(arr); }} className="bg-black border border-white/20 p-2.5 text-sm text-white leading-relaxed rounded-sm" />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <textarea rows={5} placeholder="Description (EN)\n• 换行直接变段落；• 若 Resume 每行一条自动变列表；• Statement 自动变成引用样式" value={item.desc_en || ''} onChange={e => { const arr = [...aboutData]; arr[idx].desc_en = e.target.value; setAboutData(arr); }} className="bg-black border border-white/20 p-2.5 text-sm text-white leading-relaxed rounded-sm resize-none" />
                            <textarea rows={5} placeholder="描述 (中文)\n• 双换行=分段；• 履历每行一条自动为列表；• 自述标题自动为引用样式" value={item.desc_zh || ''} onChange={e => { const arr = [...aboutData]; arr[idx].desc_zh = e.target.value; setAboutData(arr); }} className="bg-black border border-white/20 p-2.5 text-sm text-white leading-relaxed rounded-sm resize-none" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 作品管理（双图：封面图外链 + 高清原画大图外链） */}
                  {adminSection === 'works' && (
                    <div className="space-y-8">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-stone-300">Manage Gallery Works (Cover & HD URLs) · 作品管理（封面/高清图/商品信息）</span>
                        <button onClick={() => setWorks([...works, { title_zh: '《新画作》', title_en: 'New Artwork', category: 'shanshui', category_label_zh: '青绿山水', category_label_en: 'Shanshui', year: '2026', size: '100x100cm', material_zh: '绢本设色 / 矿物颜料', material_en: 'Ink on Silk / Mineral Pigments', description_zh: '中文描述', description_en: 'English description', cover_image: '', image: '' }])} className="px-4 py-2 bg-amber-300 text-black text-sm rounded-sm flex items-center gap-1.5 font-medium hover:bg-white transition-colors shadow-lg"><Plus size={16} /> Add Work</button>
                      </div>
                      {works.map((work, idx) => (
                        <div key={idx} className="p-6 md:p-7 bg-[#1a1a1a] border border-white/10 rounded-sm space-y-5 shadow-lg hover:border-white/20 transition-colors">
                          <div className="flex justify-between items-center pb-2 border-b border-white/10"><span className="text-sm md:text-base text-amber-200 font-semibold tracking-wide">◆ Work #{idx + 1}: {work.title_en || 'Untitled'}</span><button onClick={() => setWorks(works.filter((_, i) => i !== idx))} className="text-red-400 text-sm flex items-center gap-1.5 hover:text-red-300 hover:bg-red-950/30 px-2.5 py-1.5 rounded-sm transition-colors"><Trash2 size={15} /> Delete</button></div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <input type="text" placeholder="Title (EN)" value={work.title_en || ''} onChange={e => { const arr = [...works]; arr[idx].title_en = e.target.value; setWorks(arr); }} className="bg-black border border-white/20 p-2.5 text-sm text-white leading-relaxed rounded-sm" />
                            <input type="text" placeholder="标题 (中文)" value={work.title_zh || ''} onChange={e => { const arr = [...works]; arr[idx].title_zh = e.target.value; setWorks(arr); }} className="bg-black border border-white/20 p-2.5 text-sm text-white leading-relaxed rounded-sm" />
                          </div>
                          
                          {/* 1. 封面图外链 */}
                          <div className="space-y-1.5 pt-1">
                            <label className="text-xs text-stone-300 uppercase tracking-[0.1em] font-medium flex items-center gap-1">
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
                                className="w-full bg-black border border-white/20 p-2.5 text-sm text-white leading-relaxed rounded-sm focus:border-amber-300 focus:outline-none" 
                              />
                            </div>
                          </div>

                          {/* 2. 高清原画大图外链（用于弹窗与放大镜微距） */}
                          <div className="space-y-1.5 pt-1">
                            <label className="text-xs text-stone-300 uppercase tracking-[0.1em] font-medium flex items-center gap-1">
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
                                className="w-full bg-black border border-white/20 p-2.5 text-sm text-white leading-relaxed rounded-sm focus:border-amber-300 focus:outline-none" 
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-2 pt-1">
                            <select value={work.category} onChange={e => { const arr=[...works]; arr[idx].category=e.target.value; setWorks(arr); }} className="bg-black border border-white/20 p-2.5 text-sm text-white leading-relaxed rounded-sm">
                              <option value="shanshui">Shanshui</option><option value="xiyi">Ink Wash</option><option value="modern">Modern</option>
                            </select>
                            <input type="text" placeholder="Year" value={work.year} onChange={e => { const arr=[...works]; arr[idx].year=e.target.value; setWorks(arr); }} className="bg-black border border-white/20 p-2.5 text-sm text-white leading-relaxed rounded-sm" />
                            <input type="text" placeholder="Size" value={work.size} onChange={e => { const arr=[...works]; arr[idx].size=e.target.value; setWorks(arr); }} className="bg-black border border-white/20 p-2.5 text-sm text-white leading-relaxed rounded-sm" />
                          </div>
                          <div className="grid grid-cols-2 gap-2 pt-1">
                            <input type="text" placeholder="Material (EN)" value={work.material_en || work.material || ''} onChange={e => { const arr=[...works]; arr[idx].material_en=e.target.value; setWorks(arr); }} className="bg-black border border-white/20 p-2.5 text-sm text-white leading-relaxed rounded-sm" />
                            <input type="text" placeholder="材质 (中文) 例如：绢本设色 / 矿物颜料" value={work.material_zh || work.material || ''} onChange={e => { const arr=[...works]; arr[idx].material_zh=e.target.value; setWorks(arr); }} className="bg-black border border-white/20 p-2.5 text-sm text-white leading-relaxed rounded-sm" />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <textarea rows={2} placeholder="Description (EN)" value={work.description_en || ''} onChange={e => { const arr=[...works]; arr[idx].description_en = e.target.value; setWorks(arr); }} className="bg-black border border-white/20 p-2.5 text-sm text-white leading-relaxed rounded-sm resize-none" />
                            <textarea rows={2} placeholder="详细介绍 (中文)" value={work.description_zh || ''} onChange={e => { const arr=[...works]; arr[idx].description_zh = e.target.value; setWorks(arr); }} className="bg-black border border-white/20 p-2.5 text-sm text-white leading-relaxed rounded-sm resize-none" />
                          </div>

                          <div className={`border rounded-sm ${workCmsGoodsOpen[idx] ? 'border-amber-400/40' : 'border-white/10'} bg-black/40 overflow-hidden`}>
                            <button
                              type="button"
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setWorkCmsGoodsOpen(prev => ({ ...prev, [idx]: !prev[idx] })); }}
                              aria-expanded={!!workCmsGoodsOpen[idx]}
                              className="w-full cursor-pointer select-none px-3 py-2 text-[11px] tracking-widest flex items-center justify-between gap-2 hover:bg-white/5 transition-colors list-none"
                            >
                              <span className="inline-flex items-center gap-1.5 text-amber-200">
                                <ShoppingBag size={13} />
                                🛒 {lang === 'en' ? 'Commerce Fields · (Pricing / Shipping / Framing / Inventory / SEO slug)' : '商品字段 · （价格/运费/装裱/库存状态/SEO 链接 slug）'}
                              </span>
                              <span className="text-stone-500 text-[10px]">
                                {workCmsGoodsOpen[idx] ? '▲' : '▼'}
                              </span>
                            </button>
                            {!!workCmsGoodsOpen[idx] && (
                            <div className="p-3 md:p-4 border-t border-white/10 space-y-4">
                              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-end">
                                <div className="space-y-1 sm:col-span-2">
                                  <div className="flex items-center gap-1 text-xs tracking-[0.15em] uppercase text-stone-300 font-medium">
                                    <DollarSign size={11} className="text-amber-300" /> PRICE · 售价
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <label className="text-xs text-stone-400 block mb-1.5 font-medium">USD ($)</label>
                                      <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        placeholder="e.g. 1280"
                                        value={work.price_usd === null || work.price_usd === undefined ? '' : work.price_usd}
                                        onChange={e => {
                                          const val = e.target.value;
                                          const arr = [...works];
                                          arr[idx].price_usd = val === '' ? null : (Number(val) || 0);
                                          setWorks(arr);
                                        }}
                                        className="w-full bg-black border border-white/20 p-2.5 text-sm text-white leading-relaxed rounded-sm"
                                      />
                                    </div>
                                    <div>
                                      <label className="text-xs text-stone-400 block mb-1.5 font-medium">CNY (¥)</label>
                                      <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        placeholder="e.g. 8800"
                                        value={work.price_cny === null || work.price_cny === undefined ? '' : work.price_cny}
                                        onChange={e => {
                                          const val = e.target.value;
                                          const arr = [...works];
                                          arr[idx].price_cny = val === '' ? null : (Number(val) || 0);
                                          setWorks(arr);
                                        }}
                                        className="w-full bg-black border border-white/20 p-2.5 text-sm text-white leading-relaxed rounded-sm"
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-1 sm:col-span-2">
                                  <div className="flex items-center gap-1 text-xs tracking-[0.15em] uppercase text-stone-300 font-medium">
                                    <Truck size={11} className="text-amber-300" /> SHIPPING · 运费
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <label className="text-xs text-stone-400 block mb-1.5 font-medium">Fee USD</label>
                                      <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        placeholder="0 = Free"
                                        value={work.shipping_fee_usd === null || work.shipping_fee_usd === undefined ? '' : work.shipping_fee_usd}
                                        onChange={e => {
                                          const val = e.target.value;
                                          const arr = [...works];
                                          arr[idx].shipping_fee_usd = val === '' ? 0 : (Number(val) || 0);
                                          setWorks(arr);
                                        }}
                                        className="w-full bg-black border border-white/20 p-2.5 text-sm text-white leading-relaxed rounded-sm"
                                      />
                                    </div>
                                    <div>
                                      <label className="text-xs text-stone-400 block mb-1.5 font-medium">运费 人民币</label>
                                      <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        placeholder="0 = 包邮"
                                        value={work.shipping_fee_cny === null || work.shipping_fee_cny === undefined ? '' : work.shipping_fee_cny}
                                        onChange={e => {
                                          const val = e.target.value;
                                          const arr = [...works];
                                          arr[idx].shipping_fee_cny = val === '' ? 0 : (Number(val) || 0);
                                          setWorks(arr);
                                        }}
                                        className="w-full bg-black border border-white/20 p-2.5 text-sm text-white leading-relaxed rounded-sm"
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <div className="flex items-center gap-1 text-xs tracking-[0.15em] uppercase text-stone-300 font-medium">
                                    <Tag size={11} className="text-amber-300" /> INVENTORY · 状态
                                  </div>
                                  <label className="text-xs text-stone-400 block mb-1.5 font-medium">{lang === 'en' ? 'Availability' : '库存 / 展示状态'}</label>
                                  <select
                                    value={work.availability || 'available'}
                                    onChange={e => { const arr=[...works]; arr[idx].availability = e.target.value; setWorks(arr); }}
                                    className="w-full bg-black border border-white/20 p-2.5 text-sm text-white leading-relaxed rounded-sm"
                                  >
                                    {AVAILABILITY_OPTIONS.map(opt => (
                                      <option key={opt.value} value={opt.value}>
                                        {opt.value === 'available'  ? (lang === 'en' ? 'Available · 在售' : 'Available · 在售') :
                                         opt.value === 'reserved'   ? (lang === 'en' ? 'Reserved · 已留' : 'Reserved · 已留') :
                                         opt.value === 'sold'       ? (lang === 'en' ? 'Sold · 已售' : 'Sold · 已售') :
                                         (lang === 'en' ? 'Exhibition · 展出' : 'Exhibition · 展出')}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                  <label className="text-xs tracking-[0.15em] uppercase text-stone-300 font-medium flex items-center gap-1">
                                    <Package size={11} className="text-amber-300" /> {lang === 'en' ? 'Shipping Methods · 发货方式（双语）' : '发货方式 Shipping Methods（双语）'}
                                  </label>
                                  <div className="grid grid-cols-2 gap-2">
                                    <input
                                      type="text"
                                      placeholder="e.g. DHL International, 5-10 days"
                                      value={work.shipping_methods_en || ''}
                                      onChange={e => { const arr=[...works]; arr[idx].shipping_methods_en = e.target.value; setWorks(arr); }}
                                      className="bg-black border border-white/20 p-2.5 text-sm text-white leading-relaxed rounded-sm"
                                    />
                                    <input
                                      type="text"
                                      placeholder="例如：顺丰 / DHL 国际 5-10 工作日"
                                      value={work.shipping_methods_zh || ''}
                                      onChange={e => { const arr=[...works]; arr[idx].shipping_methods_zh = e.target.value; setWorks(arr); }}
                                      className="bg-black border border-white/20 p-2.5 text-sm text-white leading-relaxed rounded-sm"
                                    />
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <label className="text-xs tracking-[0.15em] uppercase text-stone-300 font-medium flex items-center gap-1">
                                    <Shuffle size={11} className="text-amber-300" /> {lang === 'en' ? 'Framing · 装裱方式（双语）' : '装裱方式 Framing（双语）'}
                                  </label>
                                  <div className="grid grid-cols-2 gap-2">
                                    <input
                                      type="text"
                                      placeholder="e.g. Unframed · Rolled (default)"
                                      value={work.framing_en || ''}
                                      onChange={e => { const arr=[...works]; arr[idx].framing_en = e.target.value; setWorks(arr); }}
                                      className="bg-black border border-white/20 p-2.5 text-sm text-white leading-relaxed rounded-sm"
                                    />
                                    <input
                                      type="text"
                                      placeholder="例如：未装裱 · 卷筒（默认）/ 可定制实木框"
                                      value={work.framing_zh || ''}
                                      onChange={e => { const arr=[...works]; arr[idx].framing_zh = e.target.value; setWorks(arr); }}
                                      className="bg-black border border-white/20 p-2.5 text-sm text-white leading-relaxed rounded-sm"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-1.5">
                                <label className="text-xs tracking-[0.15em] uppercase text-stone-300 font-medium flex items-center gap-1">
                                  <Search size={11} className="text-amber-300" /> {lang === 'en' ? 'Detail Images · 细节图 URL（每行 1 条）' : '细节图 Detail Images URL（每行 1 条）'}
                                </label>
                                <textarea
                                  rows={3}
                                  placeholder={lang === 'en'
                                    ? 'One image URL per line, these will show in the carousel right after main HD image.'
                                    : '每行粘贴一张细节图 URL，详情页大图后自动轮播展示；所有图片自动走 CDN。'}
                                  value={Array.isArray(work.detail_images) ? work.detail_images.join('\n') : (work.detail_images || '')}
                                  onChange={e => {
                                    const urls = e.target.value.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
                                    const arr = [...works];
                                    arr[idx].detail_images = urls;
                                    setWorks(arr);
                                  }}
                                  className="w-full bg-black border border-white/20 p-2.5 text-sm text-white leading-relaxed rounded-sm resize-y font-mono leading-relaxed"
                                />
                                <div className="flex items-center justify-between text-[10px] text-stone-500 tracking-wider">
                                  <span>{lang === 'en' ? 'Images (after main):' : '细节图数量：'} {(Array.isArray(work.detail_images) ? work.detail_images.filter(Boolean).length : 0)}</span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const arr = [...works];
                                      const raw = Array.isArray(arr[idx].detail_images) ? arr[idx].detail_images.join('\n') : String(arr[idx].detail_images || '');
                                      arr[idx].detail_images = raw.split(/\r?\n/).map(s => normalizeImageUrl(s)).filter(Boolean);
                                      setWorks(arr);
                                      toastMessageBanner('ok', lang === 'en' ? 'Detail images CDN normalized.' : '细节图 CDN 域名已统一替换。', 2500);
                                    }}
                                    className="text-amber-300/90 hover:text-amber-200 underline-offset-2 hover:underline"
                                  >
                                    {lang === 'en' ? '✓ Normalize → img.meetlucy.shop' : '✓ 一键替换为 CDN 域名'}
                                  </button>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                  <label className="text-xs tracking-[0.15em] uppercase text-stone-300 font-medium">
                                    {lang === 'en' ? 'SEO Slug · EN URL (#/work/xxx)' : 'SEO 链接 · 英文 Slug（#/work/xxx）'}
                                  </label>
                                  <div className="flex gap-2">
                                    <input
                                      type="text"
                                      placeholder="e.g. mountain-spirit-no3"
                                      value={work.seo_slug_en || ''}
                                      onChange={e => { const arr=[...works]; arr[idx].seo_slug_en = e.target.value; setWorks(arr); }}
                                      className="flex-1 bg-black border border-white/20 p-2.5 text-sm text-white leading-relaxed rounded-sm font-mono"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const arr = [...works];
                                        arr[idx].seo_slug_en = slugifyForWork(arr[idx].title_en || arr[idx].title_zh || '');
                                        setWorks(arr);
                                      }}
                                      className="shrink-0 px-3 py-2 text-xs rounded-sm border border-amber-400/40 text-amber-200 hover:bg-amber-950/40 tracking-wide whitespace-nowrap font-medium"
                                    >
                                      {lang === 'en' ? 'Auto from title' : '按标题自动生成'}
                                    </button>
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <label className="text-xs tracking-[0.15em] uppercase text-stone-300 font-medium">
                                    {lang === 'en' ? 'SEO Slug · ZH (optional)' : 'SEO 链接 · 中文 Slug（可选）'}
                                  </label>
                                  <div className="flex gap-2">
                                    <input
                                      type="text"
                                      placeholder={lang === 'en' ? 'Optional: Chinese-friendly slug' : '可选：中文友好 URL（留空则用 EN/标题生成）'}
                                      value={work.seo_slug_zh || ''}
                                      onChange={e => { const arr=[...works]; arr[idx].seo_slug_zh = e.target.value; setWorks(arr); }}
                                      className="flex-1 bg-black border border-white/20 p-2.5 text-sm text-white leading-relaxed rounded-sm font-mono"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const arr = [...works];
                                        arr[idx].seo_slug_zh = slugifyForWork(arr[idx].title_zh || arr[idx].title_en || '');
                                        setWorks(arr);
                                      }}
                                      className="shrink-0 px-3 py-2 text-xs rounded-sm border border-amber-400/40 text-amber-200 hover:bg-amber-950/40 tracking-wide whitespace-nowrap font-medium"
                                    >
                                      {lang === 'en' ? 'Auto' : '自动生成'}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 社交媒体管理 */}
                  {adminSection === 'socials' && (
                    <div className="space-y-4 p-4 bg-[#1a1a1a] border border-white/10 rounded-sm">
                      <div><label className="text-xs text-stone-300 uppercase tracking-[0.1em] font-medium">Email</label><input type="text" value={socials.email || ''} onChange={e => setSocials({...socials, email: e.target.value})} className="w-full bg-black border border-white/20 p-2.5 text-sm text-white leading-relaxed rounded-sm mt-1" /></div>
                      <div><label className="text-xs text-stone-300 uppercase tracking-[0.1em] font-medium">Phone</label><input type="text" value={socials.phone || ''} onChange={e => setSocials({...socials, phone: e.target.value})} className="w-full bg-black border border-white/20 p-2.5 text-sm text-white leading-relaxed rounded-sm mt-1" /></div>
                      <div><label className="text-xs text-stone-300 uppercase tracking-[0.1em] font-medium">Instagram</label><input type="text" value={socials.instagram || ''} onChange={e => setSocials({...socials, instagram: e.target.value})} className="w-full bg-black border border-white/20 p-2.5 text-sm text-white leading-relaxed rounded-sm mt-1" /></div>
                      <div><label className="text-xs text-stone-300 uppercase tracking-[0.1em] font-medium">Facebook</label><input type="text" value={socials.facebook || ''} onChange={e => setSocials({...socials, facebook: e.target.value})} className="w-full bg-black border border-white/20 p-2.5 text-sm text-white leading-relaxed rounded-sm mt-1" /></div>
                      <div><label className="text-xs text-stone-300 uppercase tracking-[0.1em] font-medium">WhatsApp</label><input type="text" value={socials.whatsapp || ''} onChange={e => setSocials({...socials, whatsapp: e.target.value})} className="w-full bg-black border border-white/20 p-2.5 text-sm text-white leading-relaxed rounded-sm mt-1" /></div>
                      <div><label className="text-xs text-stone-300 uppercase tracking-[0.1em] font-medium">TikTok</label><input type="text" value={socials.tiktok || ''} onChange={e => setSocials({...socials, tiktok: e.target.value})} className="w-full bg-black border border-white/20 p-2.5 text-sm text-white leading-relaxed rounded-sm mt-1" /></div>
                    </div>
                  )}

                  {/* 留言管理 */}
                  {adminSection === 'messages' && (
                    <div className="space-y-5">
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <div className="text-xs text-stone-400 space-y-1">
                          <div>{currentT.msgNoData ? currentT.adminMessagesTab : 'Messages'} · {lang === 'en' ? 'Newest first' : '按时间倒序'}</div>
                          <div className="text-[11px] text-stone-500 tracking-widest">
                            {lang === 'en' ? 'Notifications are sent to ' : '新留言将实时通知到：'}
                            <span className="text-amber-300/90">{DEFAULT_NOTIFY_EMAIL}</span>
                          </div>
                        </div>
                        <button
                          onClick={loadMessages}
                          className="px-3 py-1.5 bg-white/5 border border-white/10 text-stone-200 text-[11px] tracking-widest rounded-sm hover:bg-white/10 flex items-center gap-1"
                        >
                          <MessageSquare size={14} /> {lang === 'en' ? 'Refresh' : '刷新列表'}
                        </button>
                      </div>

                      {messages.length === 0 ? (
                        <div className="p-8 border border-white/5 rounded-sm bg-[#141414] text-center space-y-3">
                          <Inbox size={26} className="mx-auto text-stone-500" />
                          <div className="text-xs text-stone-400 tracking-widest">{currentT.msgNoData}</div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {messages.map((m) => {
                            const inquiryLabel =
                              (currentT.inquiryTypes || []).find(i => i.value === m.inquiry_type)?.label ||
                              m.inquiry_type ||
                              '';
                            const statusLabel =
                              m.status === 'replied' ? currentT.msgStatusReplied :
                              m.status === 'read' ? currentT.msgStatusRead :
                              currentT.msgStatusNew;
                            const statusTone =
                              m.status === 'replied' ? 'border-emerald-300/40 text-emerald-100 bg-emerald-500/5' :
                              m.status === 'read' ? 'border-sky-300/40 text-sky-100 bg-sky-500/5' :
                              'border-amber-300/40 text-amber-100 bg-amber-500/5';

                            return (
                              <article key={m.id} className={`p-4 md:p-5 bg-[#171717] border rounded-sm space-y-4 ${m.status === 'new' ? 'border-amber-300/20' : 'border-white/10'}`}>
                                <header className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
                                  <div className="md:col-span-3 space-y-1">
                                    <div className="text-xs tracking-[0.15em] uppercase text-stone-400 font-medium">{currentT.msgInquiryTitle}</div>
                                    <div className="text-sm text-stone-100">{inquiryLabel || '—'}</div>
                                  </div>
                                  <div className="md:col-span-4 space-y-1">
                                    <div className="text-xs tracking-[0.15em] uppercase text-stone-400 font-medium">From · 来源</div>
                                    <div className="text-sm text-stone-100">
                                      <span className="font-medium">{m.name || '—'}</span>
                                      <span className="mx-2 text-stone-500/70">·</span>
                                      <a
                                        href={/@/.test(String(m.contact || '')) ? `mailto:${m.contact}` : `tel:${m.contact}`}
                                        className="text-amber-200 hover:text-amber-300 underline-offset-2 hover:underline"
                                      >{m.contact || '—'}</a>
                                    </div>
                                  </div>
                                  <div className="md:col-span-3 space-y-1">
                                    <div className="text-xs tracking-[0.15em] uppercase text-stone-400 font-medium">{currentT.msgTimeTitle}</div>
                                    <div className="text-sm text-stone-200 tabular-nums">
                                      {m.created_at ? new Date(m.created_at).toLocaleString() : '—'}
                                    </div>
                                  </div>
                                  <div className="md:col-span-2 space-y-1 md:text-right">
                                    <div className="text-xs tracking-[0.15em] uppercase text-stone-400 font-medium md:text-right">{currentT.msgStatusTitle}</div>
                                    <div className={`inline-flex md:ml-auto px-2.5 py-1 rounded-full border text-[11px] tracking-widest ${statusTone}`}>
                                      {statusLabel}
                                    </div>
                                  </div>
                                </header>

                                <div className="rounded-sm border border-white/10 bg-[#0e0e0e] p-4">
                                  <p className="text-[14px] md:text-sm leading-loose tracking-wide text-stone-200 whitespace-pre-wrap">
                                    {m.message || ''}
                                  </p>
                                </div>

                                <footer className="flex flex-wrap items-center gap-2 justify-between pt-1">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <button
                                      onClick={() => openMailtoReply(m)}
                                      className="px-3 py-1.5 bg-amber-300 text-black text-[11px] tracking-widest rounded-sm hover:bg-white transition-colors flex items-center gap-1"
                                    >
                                      <Mail size={14} /> {currentT.msgReplyBtn}
                                    </button>
                                    {m.status !== 'read' && (
                                      <button onClick={() => updateMessageStatus(m.id, 'read')} className="px-3 py-1.5 bg-white/5 border border-white/10 text-stone-200 text-[11px] tracking-widest rounded-sm hover:bg-white/10 flex items-center gap-1">
                                        <CheckCircle size={14} /> {currentT.msgMarkReadBtn}
                                      </button>
                                    )}
                                    {m.status !== 'new' && (
                                      <button onClick={() => updateMessageStatus(m.id, 'new')} className="px-3 py-1.5 bg-white/5 border border-white/10 text-stone-200 text-[11px] tracking-widest rounded-sm hover:bg-white/10 flex items-center gap-1">
                                        <MessageSquare size={14} /> {currentT.msgMarkNewBtn}
                                      </button>
                                    )}
                                    {m.status !== 'replied' && (
                                      <button onClick={() => updateMessageStatus(m.id, 'replied')} className="px-3 py-1.5 bg-white/5 border border-white/10 text-stone-200 text-[11px] tracking-widest rounded-sm hover:bg-white/10 flex items-center gap-1">
                                        <CheckCircle size={14} /> {currentT.msgMarkRepliedBtn}
                                      </button>
                                    )}
                                  </div>
                                  <button onClick={() => deleteMessage(m.id)} className="px-3 py-1.5 bg-rose-500/5 border border-rose-500/20 text-rose-200 text-[11px] tracking-widest rounded-sm hover:bg-rose-500/10 flex items-center gap-1">
                                    <Trash2 size={14} /> {currentT.msgDeleteBtn}
                                  </button>
                                </footer>
                              </article>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="p-6 md:p-8 border-t border-white/10 bg-[#161616]">
                  <button onClick={handleSaveToCloud} disabled={loading} className="w-full py-4 bg-amber-300 text-black font-semibold text-sm tracking-[0.18em] rounded-sm hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-xl active:scale-[0.99]">
                    <Save size={18} /> {loading ? 'Syncing to Supabase…' : currentT.saveBtn}
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
