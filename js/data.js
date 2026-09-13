/* ---------- Category definitions ---------- */
const CATEGORIES = [
  { id:"smartphones", label:"Smartphones", color:"#E63C26" },
  { id:"laptops",     label:"Laptops",     color:"#2563EB" },
  { id:"smartwatches",label:"Smartwatches",color:"#7C3AED" },
  { id:"cameras",     label:"Cameras",     color:"#0EA5A5" },
  { id:"audio",       label:"Audio",       color:"#DB2777" },
  { id:"drones",      label:"Drones",      color:"#16A34A" },
  { id:"gaming",      label:"Gaming",      color:"#9333EA" },
  { id:"smarthome",   label:"Smart Home",  color:"#D97706" },
  { id:"fashion",     label:"Fashion",     color:"#334155" },
];

function catById(id){ return CATEGORIES.find(c=>c.id===id); }

/* ---------- Icon library (inline SVG, no third-party logos) ---------- */
const ICONS = {
  smartphones: `<svg viewBox="0 0 24 24" fill="none"><rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" stroke-width="1.5"/><line x1="10" y1="19" x2="14" y2="19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  laptops: `<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="11" rx="1.3" stroke="currentColor" stroke-width="1.5"/><path d="M2 19h20l-2-3H4l-2 3Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  smartwatches: `<svg viewBox="0 0 24 24" fill="none"><rect x="7" y="7" width="10" height="10" rx="2.5" stroke="currentColor" stroke-width="1.5"/><path d="M9 7V4h6v3M9 17v3h6v-3" stroke="currentColor" stroke-width="1.5"/></svg>`,
  cameras: `<svg viewBox="0 0 24 24" fill="none"><rect x="2.5" y="7" width="19" height="13" rx="2" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="13.5" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M8 7l1.5-2.5h5L16 7" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  audio: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 13v-1a8 8 0 0 1 16 0v1" stroke="currentColor" stroke-width="1.5"/><rect x="2.5" y="13" width="5" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="16.5" y="13" width="5" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/></svg>`,
  drones: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="2.6" stroke="currentColor" stroke-width="1.5"/><path d="M9.9 9.9 5 5M14.1 9.9 19 5M9.9 14.1 5 19M14.1 14.1 19 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="5" cy="5" r="2" stroke="currentColor" stroke-width="1.5"/><circle cx="19" cy="5" r="2" stroke="currentColor" stroke-width="1.5"/><circle cx="5" cy="19" r="2" stroke="currentColor" stroke-width="1.5"/><circle cx="19" cy="19" r="2" stroke="currentColor" stroke-width="1.5"/></svg>`,
  gaming: `<svg viewBox="0 0 24 24" fill="none"><rect x="2.5" y="8" width="19" height="10" rx="5" stroke="currentColor" stroke-width="1.5"/><path d="M7 11v4M5 13h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="16" cy="12" r="1" fill="currentColor"/><circle cx="18.2" cy="14.2" r="1" fill="currentColor"/></svg>`,
  smarthome: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 11 12 4l8 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 10v9h12v-9" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><rect x="10" y="14" width="4" height="5" stroke="currentColor" stroke-width="1.5"/></svg>`,
  fashion: `<svg viewBox="0 0 24 24" fill="none"><path d="M8 4 4 7l2 3 2-1.3V20h8V8.7L18 10l2-3-4-3-2 2h-4L8 4Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
};

/* ---------- Product catalog ----------
   price: BDT, weightKg: used for shipping calc */
const PRODUCTS = [
  // Smartphones
  {id:"sp1",cat:"smartphones",brand:"Apple",model:"iPhone 15 Pro, 256GB",price:154900,weightKg:0.4,desc:"A17 Pro chip, titanium frame, USA retail unit with original accessories."},
  {id:"sp2",cat:"smartphones",brand:"Samsung",model:"Galaxy S24 Ultra, 512GB",price:139900,weightKg:0.45,desc:"Snapdragon for Galaxy, S-Pen included, US carrier-unlocked."},
  {id:"sp3",cat:"smartphones",brand:"Google",model:"Pixel 9 Pro, 256GB",price:112900,weightKg:0.38,desc:"Tensor G4 chip, computational photography, factory unlocked."},
  {id:"sp4",cat:"smartphones",brand:"Apple",model:"iPhone 14, 128GB",price:98900,weightKg:0.4,desc:"A15 Bionic, dual camera, US model with 1-year warranty card."},

  // Laptops
  {id:"lp1",cat:"laptops",brand:"Apple",model:"MacBook Air M3, 13\"",price:159900,weightKg:1.3,desc:"M3 chip, 8-core GPU, fanless design, US keyboard layout."},
  {id:"lp2",cat:"laptops",brand:"Dell",model:"XPS 14, Core Ultra 7",price:189900,weightKg:1.6,desc:"OLED display, aluminum chassis, imported from Dell USA."},
  {id:"lp3",cat:"laptops",brand:"ASUS",model:"ROG Zephyrus G14",price:214900,weightKg:1.7,desc:"RTX 4070, 165Hz display, US retail packaging."},
  {id:"lp4",cat:"laptops",brand:"HP",model:"Spectre x360 14\"",price:169900,weightKg:1.4,desc:"2-in-1 convertible, OLED touch, US warranty."},

  // Smartwatches
  {id:"sw1",cat:"smartwatches",brand:"Apple",model:"Watch Series 10, 46mm",price:52900,weightKg:0.15,desc:"Always-on retina display, US GPS model, sealed box."},
  {id:"sw2",cat:"smartwatches",brand:"Samsung",model:"Galaxy Watch 7",price:38900,weightKg:0.14,desc:"Advanced sleep and heart tracking, US model."},
  {id:"sw3",cat:"smartwatches",brand:"Garmin",model:"Fenix 8",price:89900,weightKg:0.18,desc:"Multisport GPS watch, titanium bezel, US import."},
  {id:"sw4",cat:"smartwatches",brand:"Apple",model:"Watch SE 2, 40mm",price:29900,weightKg:0.13,desc:"Affordable, fast, US retail packaging."},

  // Cameras
  {id:"cm1",cat:"cameras",brand:"Sony",model:"Alpha A7 IV Body",price:289900,weightKg:1.1,desc:"33MP full-frame, US firmware and warranty card."},
  {id:"cm2",cat:"cameras",brand:"Canon",model:"EOS R8 + 24-50mm",price:219900,weightKg:1.2,desc:"Compact full-frame kit, imported from Canon USA."},
  {id:"cm3",cat:"cameras",brand:"GoPro",model:"HERO 13 Black",price:54900,weightKg:0.15,desc:"5.3K action camera, US retail box with accessories."},
  {id:"cm4",cat:"cameras",brand:"Fujifilm",model:"X-T5",price:224900,weightKg:0.85,desc:"40MP APS-C, retro control dials, US model."},

  // Audio
  {id:"ad1",cat:"audio",brand:"Apple",model:"AirPods Pro 2",price:29900,weightKg:0.06,desc:"Active noise cancellation, USB-C case, sealed US unit."},
  {id:"ad2",cat:"audio",brand:"Sony",model:"WH-1000XM5",price:42900,weightKg:0.35,desc:"Industry-leading ANC headphones, US retail packaging."},
  {id:"ad3",cat:"audio",brand:"Bose",model:"QuietComfort Ultra",price:44900,weightKg:0.33,desc:"Immersive audio, US import with warranty card."},
  {id:"ad4",cat:"audio",brand:"JBL",model:"Charge 5 Speaker",price:18900,weightKg:0.96,desc:"Portable waterproof speaker, US retail unit."},

  // Drones
  {id:"dr1",cat:"drones",brand:"DJI",model:"Air 3 Fly More Combo",price:169900,weightKg:1.6,desc:"Dual-camera drone, US-region firmware, extra batteries."},
  {id:"dr2",cat:"drones",brand:"DJI",model:"Mini 4 Pro",price:109900,weightKg:0.9,desc:"Sub-249g drone, 4K/60fps HDR, US package."},
  {id:"dr3",cat:"drones",brand:"Autel",model:"EVO Lite+",price:139900,weightKg:1.3,desc:"1-inch sensor, obstacle avoidance, US import."},

  // Gaming
  {id:"gm1",cat:"gaming",brand:"Sony",model:"PlayStation 5 Slim",price:69900,weightKg:3.2,desc:"Disc edition console, US NTSC unit."},
  {id:"gm2",cat:"gaming",brand:"Microsoft",model:"Xbox Series X",price:64900,weightKg:4.4,desc:"1TB console, US retail box."},
  {id:"gm3",cat:"gaming",brand:"Valve",model:"Steam Deck OLED 512GB",price:89900,weightKg:0.65,desc:"Handheld PC gaming, US model."},
  {id:"gm4",cat:"gaming",brand:"Razer",model:"BlackShark V2 Pro",price:22900,weightKg:0.32,desc:"Wireless gaming headset, US retail packaging."},

  // Smart home
  {id:"sh1",cat:"smarthome",brand:"Amazon",model:"Echo Show 8 (3rd Gen)",price:16900,weightKg:1.1,desc:"Smart display with Alexa, US power configuration + adapter."},
  {id:"sh2",cat:"smarthome",brand:"Google",model:"Nest Learning Thermostat",price:24900,weightKg:0.4,desc:"Auto-schedule thermostat, US model."},
  {id:"sh3",cat:"smarthome",brand:"Ring",model:"Video Doorbell Pro 2",price:22900,weightKg:0.35,desc:"3D motion detection, US retail packaging."},
  {id:"sh4",cat:"smarthome",brand:"Philips",model:"Hue Starter Kit",price:19900,weightKg:0.9,desc:"Smart color bulbs + bridge, US import."},

  // Fashion
  {id:"fs1",cat:"fashion",brand:"Levi's",model:"501 Original Jeans",price:8900,weightKg:0.6,desc:"Classic straight fit, imported from the US, original tags."},
  {id:"fs2",cat:"fashion",brand:"Nike",model:"Air Force 1 '07",price:12900,weightKg:0.9,desc:"Icon sneaker, US retail box, authenticity card included."},
  {id:"fs3",cat:"fashion",brand:"Ralph Lauren",model:"Classic Polo Shirt",price:7900,weightKg:0.3,desc:"Pima cotton, US sizing, original packaging."},
  {id:"fs4",cat:"fashion",brand:"Coach",model:"Leather Crossbody Bag",price:24900,weightKg:0.7,desc:"Genuine leather, US boutique sourced, dust bag included."},
];

function productsByCat(catId){ return PRODUCTS.filter(p=>p.cat===catId); }
function getProduct(id){ return PRODUCTS.find(p=>p.id===id); }

/* Shipping: base rate per kg (BDT), first order free for each account */
const SHIPPING_RATE_PER_KG = 900;
const MIN_SHIPPING = 350;
