const fs = require('fs');
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const swc = require('@next/swc-darwin-arm64');

const rootDir = path.resolve(__dirname, '..');

// 1. Hook require for @/ aliases and CSS imports
const Module = require('module');
const originalResolve = Module._resolveFilename;

// Proxy for motion (e.g. motion.div, motion.span, AnimatePresence)
const motionHandler = {
  get: (target, prop) => {
    if (prop === '__esModule') return true;
    if (prop === 'AnimatePresence') return ({ children }) => children;
    return React.forwardRef(({ children, whileHover, whileTap, initial, animate, exit, transition, ...props }, ref) =>
      React.createElement(prop, { ...props, ref }, children)
    );
  },
};
const mockMotion = new Proxy({}, motionHandler);

// Complete SVG paths for all Lucide icons used across the project
const iconSvgPaths = {
  Check: '<polyline points="20 6 9 17 4 12"></polyline>',
  CheckCheck: '<path d="M18 6 7 17l-5-5"></path><path d="m22 10-7.5 7.5L13 16"></path>',
  X: '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>',
  ArrowRight: '<line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>',
  ArrowLeft: '<line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline>',
  Plus: '<line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>',
  Minus: '<line x1="5" y1="12" x2="19" y2="12"></line>',
  Play: '<polygon points="6 3 20 12 6 21 6 3" fill="currentColor"></polygon>',
  Pause: '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>',
  Volume2: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>',
  VolumeX: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="22" y1="9" x2="16" y2="15"></line><line x1="16" y1="9" x2="22" y2="15"></line>',
  ChevronLeft: '<polyline points="15 18 9 12 15 6"></polyline>',
  ChevronRight: '<polyline points="9 18 15 12 9 6"></polyline>',
  Clock: '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>',
  ShieldCheck: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path>',
  Users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
  Building2: '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path><path d="M10 6h4"></path><path d="M10 10h4"></path><path d="M10 14h4"></path><path d="M10 18h4"></path>',
  UserCheck: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="16 11 18 13 22 9"></polyline>',
  GraduationCap: '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path><path d="M22 10v6"></path><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>',
  ShoppingBag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path>',
  Bot: '<rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M12 8V4H8"></path><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path>',
  Gift: '<rect x="3" y="8" width="18" height="4" rx="1"></rect><path d="M12 8v13"></path><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"></path><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 4.8 0 0 1 12 8a4.8 4.8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"></path>',
  TrendingDown: '<polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline><polyline points="16 17 22 17 22 11"></polyline>',
  XCircle: '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>',
  Sparkles: '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path>',
  MessageCircle: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>',
  Zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor"></polygon>',
  Phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>',
  Mail: '<rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>',
  Calendar: '<rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>',
  Send: '<line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>',
};

const iconProxy = new Proxy({}, {
  get: (target, prop) => {
    if (prop === '__esModule') return true;
    if (prop === 'default') return iconProxy;
    const iconName = String(prop);
    const innerHtml = iconSvgPaths[iconName] || '<circle cx="12" cy="12" r="10"></circle>';
    return React.forwardRef((props, ref) =>
      React.createElement('svg', {
        ...props,
        ref,
        xmlns: 'http://www.w3.org/2000/svg',
        width: props.size || props.width || 24,
        height: props.size || props.height || 24,
        viewBox: '0 0 24 24',
        fill: props.fill || 'none',
        stroke: props.stroke || 'currentColor',
        strokeWidth: props.strokeWidth || 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        className: (props.className || '') + ' lucide lucide-' + iconName.toLowerCase(),
        'data-icon': iconName,
        dangerouslySetInnerHTML: { __html: innerHtml },
      })
    );
  },
});

const mockCal = {
  getCalApi: async () => () => {},
  Cal: () => React.createElement('div', { className: 'cal-embed-placeholder' }),
};

const mockGsap = {
  gsap: {
    to: () => {},
    from: () => {},
    fromTo: () => {},
    set: () => {},
    timeline: () => ({ to: () => {}, from: () => {}, play: () => {}, pause: () => {} }),
    registerPlugin: () => {},
  },
  ScrollTrigger: {
    getAll: () => [],
    refresh: () => {},
  },
  useGSAP: (fn) => {
    React.useEffect(() => {
      try { fn(); } catch {}
    }, []);
  },
};

const mockLenis = class {
  on() {}
  raf() {}
  destroy() {}
};

Module._resolveFilename = function (request, parent, isMain, options) {
  if (request.startsWith('@/')) {
    const rel = request.slice(2);
    const full = path.join(rootDir, 'src', rel);
    return originalResolve.call(this, full, parent, isMain, options);
  }
  if (request === 'lucide-react' || request.startsWith('lucide-react/')) {
    return 'virtual-lucide-react';
  }
  if (request === 'motion' || request === 'motion/react' || request === 'framer-motion') {
    return 'virtual-motion';
  }
  if (request === '@calcom/embed-react') {
    return 'virtual-calcom';
  }
  if (request === 'gsap' || request.startsWith('gsap/')) {
    return 'virtual-gsap';
  }
  if (request === '@gsap/react') {
    return 'virtual-gsap-react';
  }
  if (request === 'lenis' || request === '@studio-freight/lenis') {
    return 'virtual-lenis';
  }
  if (request === 'libphonenumber-js' || request.startsWith('libphonenumber-js/')) {
    return 'virtual-libphonenumber-js';
  }
  return originalResolve.call(this, request, parent, isMain, options);
};

require.cache['virtual-lucide-react'] = { id: 'virtual-lucide-react', filename: 'virtual-lucide-react', loaded: true, exports: iconProxy };
require.cache['virtual-motion'] = {
  id: 'virtual-motion',
  filename: 'virtual-motion',
  loaded: true,
  exports: { motion: mockMotion, AnimatePresence: ({ children }) => children, m: mockMotion },
};
require.cache['virtual-calcom'] = { id: 'virtual-calcom', filename: 'virtual-calcom', loaded: true, exports: mockCal };
require.cache['virtual-gsap'] = {
  id: 'virtual-gsap',
  filename: 'virtual-gsap',
  loaded: true,
  exports: { gsap: mockGsap.gsap, ...mockGsap.gsap, ScrollTrigger: mockGsap.ScrollTrigger, default: mockGsap.gsap },
};
require.cache['virtual-gsap-react'] = {
  id: 'virtual-gsap-react',
  filename: 'virtual-gsap-react',
  loaded: true,
  exports: { useGSAP: mockGsap.useGSAP, default: mockGsap.useGSAP },
};
require.cache['virtual-lenis'] = { id: 'virtual-lenis', filename: 'virtual-lenis', loaded: true, exports: { default: mockLenis, Lenis: mockLenis } };
require.cache['virtual-libphonenumber-js'] = {
  id: 'virtual-libphonenumber-js',
  filename: 'virtual-libphonenumber-js',
  loaded: true,
  exports: {
    parsePhoneNumberFromString: () => ({ isValid: () => true, formatInternational: () => '' }),
  },
};

// Ignore css imports
require.extensions['.css'] = function () {
  return {};
};

// 2. Hook require for .ts and .tsx files with SWC
require.extensions['.ts'] = require.extensions['.tsx'] = function (module, filename) {
  console.log('SWC Compiling:', path.relative(rootDir, filename));
  const content = fs.readFileSync(filename, 'utf8');
  const transformed = swc.transformSync(
    content,
    false,
    Buffer.from(
      JSON.stringify({
        jsc: {
          parser: { syntax: 'typescript', tsx: true },
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
          target: 'es2022',
        },
        module: {
          type: 'commonjs',
        },
      })
    )
  );
  module._compile(transformed.code, filename);
};

// 3. Mock Next.js internal modules if needed
const mockLink = ({ href, children, className, ...props }) =>
  React.createElement('a', { href, className, ...props }, children);
const mockImage = ({ src, alt, width, height, className, priority, fill, style, ...props }) => {
  const mergedStyle = fill
    ? { position: 'absolute', height: '100%', width: '100%', inset: 0, objectFit: 'cover', display: 'block', ...style }
    : { display: 'block', maxWidth: '100%', ...style };
  return React.createElement('img', {
    src: typeof src === 'object' && src?.src ? src.src : src,
    alt: alt || '',
    width,
    height,
    className,
    style: mergedStyle,
    ...props,
  });
};
const mockNav = {
  useRouter: () => ({ push: () => {}, replace: () => {}, back: () => {} }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
};

require.cache[require.resolve('next/link')] = { id: require.resolve('next/link'), filename: require.resolve('next/link'), loaded: true, exports: mockLink };
require.cache[require.resolve('next/link')].exports.default = mockLink;

require.cache[require.resolve('next/image')] = { id: require.resolve('next/image'), filename: require.resolve('next/image'), loaded: true, exports: mockImage };
require.cache[require.resolve('next/image')].exports.default = mockImage;

try {
  const navPath = require.resolve('next/navigation');
  require.cache[navPath] = { id: navPath, filename: navPath, loaded: true, exports: mockNav };
} catch {}

// 4. Import Layout and Page components
console.log('Compiling components with SWC...');
const { Navbar } = require('../src/components/global/Navbar');
const { TopBar } = require('../src/components/global/TopBar');
const { FooterSection } = require('../src/components/sections/FooterSection');
const { StickyMobileCta } = require('../src/components/global/StickyMobileCta');
const { FloatingWhatsApp } = require('../src/components/global/FloatingWhatsApp');
const LandingPage = require('../src/app/(site)/page').default;

console.log('Rendering full page to static markup...');
const bodyHtml = ReactDOMServer.renderToStaticMarkup(
  React.createElement(
    'div',
    { className: 'min-h-screen bg-[#0A0A0F] text-white flex flex-col selection:bg-[#A24BFF] selection:text-white' },
    React.createElement(TopBar),
    React.createElement(Navbar),
    React.createElement(LandingPage),
    React.createElement(FooterSection),
    React.createElement(StickyMobileCta),
    React.createElement(FloatingWhatsApp)
  )
);

// Read existing compiled Tailwind CSS from .next/static/css/app/layout.css
let externalCss = '';
const layoutCssPath = path.join(rootDir, '.next/static/css/app/layout.css');
if (fs.existsSync(layoutCssPath)) {
  externalCss = fs.readFileSync(layoutCssPath, 'utf8');
}

const fullHtml = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Host Editify — Short-Form Video Editing for Founders in India & Dubai (24h Turnaround)</title>
  <meta name="description" content="Host Editify is a specialized short-form video editing agency for founders, creators, and brands across India and Dubai. 24-hour turnaround, human creative editors, first video edited free."/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@700;800&display=swap" rel="stylesheet"/>
  
  <style>
    ${externalCss}
  </style>

  <!-- Complete Design System & Interactive Fallbacks -->
  <style>
    :root {
      --font-heading: 'Montserrat', system-ui, -apple-system, sans-serif;
      --font-body: 'Inter', system-ui, -apple-system, sans-serif;
      --purple: #A24BFF;
      --purple-hover: #B86BFF;
      --brand-gradient: linear-gradient(135deg, #7928CA 0%, #A24BFF 50%, #FF0080 100%);
    }

    *, ::before, ::after {
      box-sizing: border-box;
    }

    html, body {
      background-color: #0A0A0F !important;
      color: #FFFFFF !important;
      font-family: var(--font-body);
      margin: 0;
      padding: 0;
      width: 100%;
      max-width: 100vw;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    h1, h2, h3, h4, h5, h6, .font-heading {
      font-family: var(--font-heading);
      text-wrap: balance;
    }

    p, li, blockquote {
      text-wrap: pretty;
    }

    /* Container Standard */
    .max-w-\\[1200px\\] {
      max-width: 1200px !important;
      margin-left: auto !important;
      margin-right: auto !important;
    }
    .max-w-\\[720px\\] {
      max-width: 720px !important;
    }
    .max-w-\\[680px\\] {
      max-width: 680px !important;
    }
    .max-w-\\[760px\\] {
      max-width: 760px !important;
    }

    /* Brand Gradients */
    .text-brand-gradient {
      background: var(--brand-gradient) !important;
      -webkit-background-clip: text !important;
      -webkit-text-fill-color: transparent !important;
      display: inline-block;
    }
    .bg-brand-gradient {
      background: var(--brand-gradient) !important;
    }

    /* Lucide SVGs */
    svg.lucide, svg[data-icon] {
      display: inline-block;
      vertical-align: middle;
      flex-shrink: 0;
    }

    /* Portfolio Video Cards */
    .portfolio-card, [data-portfolio-card] {
      width: 240px !important;
      min-width: 220px !important;
      height: 426px !important;
      aspect-ratio: 9 / 16 !important;
      position: relative !important;
      flex-shrink: 0 !important;
      border-radius: 16px !important;
      overflow: hidden !important;
      background-color: #14141C !important;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5) !important;
    }

    /* Aspect Ratio Utilities */
    .aspect-\\[9\\/16\\], [style*="aspect-ratio: 9 / 16"], [style*="aspect-ratio:9 / 16"] {
      aspect-ratio: 9 / 16 !important;
    }
    .aspect-\\[16\\/9\\] {
      aspect-ratio: 16 / 9 !important;
    }

    /* Buttons & Interactive Elements */
    button {
      cursor: pointer;
    }

    /* Custom Scrollbar for Carousel */
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  </style>
</head>
<body class="bg-[#0A0A0F] text-white">
  ${bodyHtml}

  <!-- Client Script for Modals, Lightbox, Tabs, and Accordions -->
  <script src="/js/client.js"></script>
</body>
</html>`;

const outDir = path.join(rootDir, '.next/server/app');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'index.html'), fullHtml, 'utf8');
console.log('✓ Successfully generated .next/server/app/index.html (' + fullHtml.length + ' bytes)!');
