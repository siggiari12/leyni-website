/* ============================================================
   LEYNI — shared data, i18n, cart, interactions
   ============================================================ */

/* ---------- Backend API ---------- */
const API = 'https://leyni-api-production.up.railway.app';
let CATALOG = null;   // slug -> {price, price_full, stock, in_stock, preorder}
let SHIPPING = { price: 2000, label: 'DHL Express' };
async function loadCatalog(){
  try{
    const r = await fetch(API + '/api/products');
    if(!r.ok) return;
    const d = await r.json();
    CATALOG = {};
    for(const p of d.products) CATALOG[p.slug] = p;
    SHIPPING = d.shipping || SHIPPING;
  }catch(e){ /* offline/api down: static fallback */ }
}
const prod = slug => (CATALOG && CATALOG[slug]) || null;
const soldOut = slug => { const p = prod(slug); return p ? (!p.preorder && p.stock <= 0) : false; };

/* ---------- Collection data (signature colours sampled from the artwork) ---------- */
const PRICE_FULL = 14200;            // ISK
const PRICE = 11360;                 // introductory -20% (limited)
const priceHTML = (slug) => {
  const p = slug ? prod(slug) : null;
  const full = p ? p.price_full : PRICE_FULL, now = p ? p.price : PRICE;
  return `<s>${money(full)}</s> ${money(now)}`;
};
const SCARVES = [
  { slug:'raudisandur',   name:'Rauðisandur',   color:'#D6645A',
    en:'Red Sand Beach', is:'Rauðisandur',
    storyEn:'The rust-red sands of the Westfjords, where the slow tide draws geometry across the shore.',
    storyIs:'Rauðgullnir sandar Vestfjarða, þar sem hægt sjávarfallið teiknar rúmfræði í fjöruna.' },
  { slug:'birkilaut',     name:'Birkilaut',     color:'#4A7396',
    en:'Birch Glade', is:'Birkilaut',
    storyEn:'A sheltered hollow of birch, steel-blue dusk settling quietly between the leaves.',
    storyIs:'Skýlt birkilaut þar sem stálblátt rökkrið sest hljóðlega milli laufanna.' },
  { slug:'2021',          name:'2021',          color:'#3B4E8C',
    nEn:'2021 — Year of the Volcanic Eruption', nIs:'2021 — Árið sem gaus',
    en:'', is:'',
    storyEn:'A year kept in silk — the quiet blues of a season that lingered.',
    storyIs:'Ár varðveitt í silki — kyrrlátir bláir tónar árstíðar sem dvaldi.' },
  { slug:'forsetinn',     name:'Forsetinn',     color:'#B96D80',
    en:'The President', is:'Forsetinn',
    storyEn:'Composed and ceremonial — a dusk-rose motif carried with a diplomat’s poise.',
    storyIs:'Yfirvegað og hátíðlegt — rökkurbleikt mynstur borið fram með ró sendiherrans.' },
  { slug:'katem',         name:'Kate M',        color:'#C24E6B',
    en:'', is:'',
    storyEn:'A portrait in crimson and rose — bold, warm and unmistakably herself.',
    storyIs:'Andlitsmynd í djúprauðu og rósrauðu — djörf, hlý og ómótstæðilega hún sjálf.' },
  { slug:'snaefellsjokull',name:'Snæfellsjökull',color:'#6E6BB2',
    en:'The Snæfellsjökull Glacier', is:'Snæfellsjökull',
    storyEn:'The glacier at the edge of the world, periwinkle light resting on ancient ice.',
    storyIs:'Jökullinn á heimsenda — bláfjólublátt ljós hvílir á aldagömlum ís.' },
  { slug:'bleikadisin',   name:'Bleika dísin',  color:'#B22890',
    en:'The Pink Muse', is:'Bleika dísin',
    storyEn:'A muse in magenta — playful, luminous and impossible to overlook.',
    storyIs:'Dís í blómableiku — leikandi, ljómandi og ómögulegt að líta framhjá.' },
  { slug:'koniaksstofan', name:'Koníaksstofan', color:'#B0774A',
    en:'The Cognac Room', is:'Koníaksstofan',
    storyEn:'Warm cognac light and unhurried conversation, held within squares of silk.',
    storyIs:'Hlýtt koníaksljós og áhyggjulaust samtal, fangað í ferningum úr silki.' },
  { slug:'juli',          name:'Júlí',          color:'#E2726F',
    en:'July', is:'Júlí',
    storyEn:'The warmth of high summer — coral and rose beneath a midnight sun.',
    storyIs:'Hlýja hásumars — kórall og rós undir miðnætursól.' }
];

const bySlug = s => SCARVES.find(x=>x.slug===s);
const dispName = (s,l) => l==='is' ? (s.nIs||s.name) : (s.nEn||s.name);

/* ---------- Men / Unisex — Rivers of Iceland (preorder, ships fall 2026) ---------- */
const PREORDER_EMAIL = 'hello@leyni.com';
const RIVERS = [
  { slug:'river-hraunfljot', name:'Hraunfljót', en:'A River of Lava',     is:'Rennandi hraun',
    storyEn:'The rivers of Iceland are powerful, fast and often unpredictable. Four of these scarves take their name from one of them — Hraunfljót is the only exception. It is the Icelandic word for a river of lava.',
    storyIs:'Ár Íslands eru kraftmiklar, straumharðar og oft óútreiknanlegar. Fjórar slæðanna bera nafn einnar þeirra — Hraunfljót er eina undantekningin. Það er íslenska orðið yfir fljót úr rennandi hrauni.' },
  { slug:'river-skafta',     name:'Skaftá',     en:'River at Skaftafell', is:'Áin við Skaftafell',
    storyEn:'Skaftá originates in Vatnajökull, Europe’s biggest glacier. It falls from a black cliff, and in warmer seasons — or when the earth is steaming — the water comes gushing down the sands, carrying huge rocks to the sea. Then it grows calm again and flows blue and bright from the glacier.',
    storyIs:'Skaftá á upptök sín í Vatnajökli, stærsta jökli Evrópu. Hún fellur fram af svörtum hamri, og á hlýrri árstíðum — eða þegar jörðin gýs gufu — byltist vatnið niður sandana og ber með sér stórgrýti til sjávar. Svo kyrrist hún á ný og rennur blá og björt undan jöklinum.' },
  { slug:'river-oxara',      name:'Öxará',      en:'River at Þingvellir', is:'Áin á Þingvöllum',
    storyEn:'Öxará is a clear spring-fed river that runs through Þingvellir, the national park where Icelanders founded their first parliament in the year 930. There the leaders of every quarter of the country came together to settle disputes, pass new laws — and decide on trivial matters.',
    storyIs:'Öxará er tær lindá sem rennur um Þingvelli, þjóðgarðinn þar sem Íslendingar stofnuðu sitt fyrsta þing árið 930. Þar komu höfðingjar allra landsfjórðunga saman, leystu deilur, settu ný lög — og tóku ákvarðanir um hversdagslegri mál.' },
  { slug:'river-thjorsa',    name:'Þjórsá',     en:'The Highland River',  is:'Hálendisfljótið',
    storyEn:'Þjórsá is the longest river in Iceland. Rising in the highland glacier Hofsjökull, it runs through mountains of light brown, red and yellow, changing colour with the light and the mood of the land.',
    storyIs:'Þjórsá er lengsta á Íslands. Hún á upptök sín í Hofsjökli á hálendinu og rennur gegnum ljósbrún, rauð og gul fjöll, síbreytileg eftir birtunni og lund landsins.' },
  { slug:'river-hvita',      name:'Hvítá',      en:'River of Gullfoss',   is:'Áin við Gullfoss',
    storyEn:'Hvítá is the river that carries one of Iceland’s most beautiful waterfalls, Gullfoss.',
    storyIs:'Hvítá er áin sem ber einn fegursta foss Íslands, Gullfoss.' }
];

const riverBySlug = s => RIVERS.find(x=>x.slug===s);
function riverCardHTML(s, i){
  const no = String((typeof i==='number'?i:RIVERS.indexOf(s))+10);
  return `<a class="card" href="product.html?s=${s.slug}">
    <div class="idx">${no}</div>
    <figure><img loading="lazy" src="img/${s.slug}.jpg" alt="Leyni — ${s.name}"></figure>
    <div class="meta">
      <div class="nm">${s.name}</div>
      <div class="sub-lbl"><span class="gl" data-en="(${s.en})" data-is="(${s.is})">(${s.en})</span><span class="soon-tag" data-en="Ships fall 2026" data-is="Kemur haustið 2026">Ships fall 2026</span></div>
      <span class="ulink river-pre" onclick="event.preventDefault();openPreorder('${s.slug}')" data-en="Preorder" data-is="Forpanta">Preorder</span>
    </div>
  </a>`;
}

/* ---------- Preorder reservation modal (saved via API, no payment) ---------- */
let PRE_QTY = 1, PRE_CUR = null;
function injectPreorder(){
  const el=document.createElement('div');
  el.innerHTML=`
    <div class="scrim" id="preScrim" onclick="closePreorder()"></div>
    <aside class="pre-modal" id="preModal" role="dialog" aria-label="Preorder">
      <button class="x" onclick="closePreorder()" aria-label="Close">✕</button>
      <figure><img id="preImg" src="" alt="" /></figure>
      <div class="pre-info">
        <span class="lbl" data-en="Preorder · Ships fall 2026 · 55 × 55 cm" data-is="Forpöntun · Kemur haustið 2026 · 55 × 55 cm">Preorder · Ships fall 2026 · 55 × 55 cm</span>
        <h3 id="preName"></h3>
        <p class="pre-gl lbl" id="preGloss"></p>
        <p class="pre-txt" data-en="No payment now. Leave your email and we will reserve yours and contact you at release."
           data-is="Engin greiðsla núna. Skráðu netfangið þitt og við tökum eintakið þitt frá og höfum samband við útgáfu.">No payment now. Leave your email and we will reserve yours and contact you at release.</p>
        <div class="pre-fields">
          <input type="text" id="preNameIn" placeholder="Name" data-ph-en="Name" data-ph-is="Nafn" />
          <input type="email" id="preEmailIn" placeholder="Email address" data-ph-en="Email address" data-ph-is="Netfang" />
        </div>
        <div class="opt">
          <div class="lbl" data-en="Quantity" data-is="Fjöldi">Quantity</div>
          <div class="qty">
            <button onclick="preBump(-1)" aria-label="Minus">−</button>
            <span id="preQtyVal">1</span>
            <button onclick="preBump(1)" aria-label="Plus">+</button>
          </div>
        </div>
        <button class="btn dark block" id="preSubmit" onclick="preReserve()" data-en="Reserve" data-is="Taka frá">Reserve</button>
        <p class="pre-done lbl" id="preDone" style="display:none;margin-top:1.4em"></p>
      </div>
    </aside>`;
  document.body.appendChild(el);
}
function openPreorder(slug){
  PRE_CUR=riverBySlug(slug); if(!PRE_CUR) return;
  PRE_QTY=1;
  const l=lang();
  document.getElementById('preImg').src=`img/${PRE_CUR.slug}.jpg`;
  document.getElementById('preImg').alt=`Leyni — ${PRE_CUR.name}`;
  document.getElementById('preName').textContent=PRE_CUR.name;
  document.getElementById('preGloss').textContent=`(${(l==='en'?PRE_CUR.en:PRE_CUR.is).toUpperCase()})`;
  document.getElementById('preQtyVal').textContent='1';
  document.getElementById('preDone').style.display='none';
  document.getElementById('preSubmit').style.display='';
  document.querySelectorAll('#preModal [data-ph-en]').forEach(i=>i.placeholder=i.getAttribute('data-ph-'+l));
  document.getElementById('preScrim').classList.add('open');
  document.getElementById('preModal').classList.add('open');
}
function preBump(d){
  PRE_QTY=Math.max(1,Math.min(10,PRE_QTY+d));
  document.getElementById('preQtyVal').textContent=PRE_QTY;
}
async function preReserve(){
  const email=document.getElementById('preEmailIn').value.trim();
  const name=document.getElementById('preNameIn').value.trim();
  const l=lang();
  if(!/.+@.+\..+/.test(email)){ document.getElementById('preEmailIn').focus(); return; }
  const btn=document.getElementById('preSubmit'); btn.disabled=true;
  try{
    const r=await fetch(API+'/api/preorders',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({slug:PRE_CUR.slug,qty:PRE_QTY,name,email})});
    if(!r.ok) throw new Error();
    btn.style.display='none';
    const d=document.getElementById('preDone');
    d.textContent=(l==='is'?'Frátekið — við höfum samband við útgáfu.':'Reserved — we will contact you at release.');
    d.style.display='block';
  }catch(e){
    btn.disabled=false;
    alert(l==='is'?'Villa — reyndu aftur.':'Something went wrong — please try again.');
  }
}
function closePreorder(){
  document.getElementById('preScrim')?.classList.remove('open');
  document.getElementById('preModal')?.classList.remove('open');
  const b=document.getElementById('preSubmit'); if(b) b.disabled=false;
}

/* ---------- i18n ---------- */
const T = {
  bag:{en:'Bag',is:'Karfa'},
  price:{en:'ISK',is:'kr'},
  addToBag:{en:'Add to bag',is:'Setja í körfu'},
  quickAdd:{en:'Quick add',is:'Bæta við'},
  soldIn:{en:'88 × 88 cm',is:'88 × 88 cm'},
  title:{en:'LEYNI — Secret North',is:'LEYNI — Secret North'},
  cartEmpty:{en:'Your bag is empty.',is:'Karfan þín er tóm.'},
  subtotal:{en:'Subtotal',is:'Samtals'},
  shipNote:{en:'Shipping & taxes calculated at checkout.',is:'Sending og gjöld reiknast í greiðsluferli.'},
  checkout:{en:'Checkout',is:'Ganga frá kaupum'},
  continue:{en:'Continue shopping',is:'Halda áfram'},
  remove:{en:'Remove',is:'Fjarlægja'}
};
function lang(){ try{ return localStorage.getItem('leyni-lang')||autoLang(); }catch(e){ return 'en'; } }
function autoLang(){ return (navigator.language||'').toLowerCase().startsWith('is')?'is':'en'; }
const money = n => n.toLocaleString('is-IS') + ' ' + T.price[lang()];

function applyLang(l){
  document.documentElement.lang=l;
  document.title=T.title[l];
  document.querySelectorAll('[data-en]').forEach(el=>{
    const t=el.getAttribute('data-'+l); if(t!==null) el.textContent=t;
  });
  document.querySelectorAll('[data-lang-btn]').forEach(b=>b.classList.toggle('active',b.dataset.langBtn===l));
  try{ localStorage.setItem('leyni-lang',l); }catch(e){}
  document.dispatchEvent(new CustomEvent('langchange',{detail:l}));
}

/* ---------- Cart ---------- */
function getCart(){ try{ return JSON.parse(localStorage.getItem('leyni-cart')||'[]'); }catch(e){ return []; } }
function setCart(c){ try{ localStorage.setItem('leyni-cart',JSON.stringify(c)); }catch(e){} renderCart(); }
function addToCart(slug,qty=1){
  const c=getCart(); const it=c.find(i=>i.slug===slug);
  if(it) it.qty+=qty; else c.push({slug,qty});
  setCart(c); openCart();
}
function removeFromCart(slug){ setCart(getCart().filter(i=>i.slug!==slug)); }
function cartCount(){ return getCart().reduce((n,i)=>n+i.qty,0); }

function renderCart(){
  const l=lang();
  const count=cartCount();
  document.querySelectorAll('.bag .count').forEach(el=>{ el.textContent=count; el.classList.toggle('has',count>0); });
  const body=document.getElementById('cartBody'), foot=document.getElementById('cartFoot');
  if(!body) return;
  const cart=getCart();
  if(!cart.length){
    body.innerHTML=`<div class="drawer-empty">${T.cartEmpty[l]}</div>`;
    foot.innerHTML=`<a href="shop.html" class="btn block" onclick="closeCart()">${T.continue[l]}</a>`;
    return;
  }
  let sub=0;
  body.innerHTML=cart.map(i=>{
    const s=bySlug(i.slug); const pp=prod(i.slug); const unit=pp?pp.price:PRICE; const line=unit*i.qty; sub+=line;
    return `<div class="ci">
      <img src="img/${s.slug}.jpg" alt="${s.name}">
      <div>
        <div class="nm">${dispName(s,l)}</div>
        <div class="sz">${T.soldIn[l]}</div>
        <button class="rm" onclick="removeFromCart('${s.slug}')">${T.remove[l]}</button>
      </div>
      <div class="side">${money(line)}<div class="q">× ${i.qty}</div></div>
    </div>`;
  }).join('');
  foot.innerHTML=`
    <div class="row total"><span>${T.subtotal[l]}</span><span>${money(sub)}</span></div>
    <div class="note">${T.shipNote[l]}</div>
    <a class="btn dark block" href="checkout.html">${T.checkout[l]}</a>`;
}
function openCart(){ document.getElementById('scrim')?.classList.add('open'); document.getElementById('drawer')?.classList.add('open'); }
function closeCart(){ document.getElementById('scrim')?.classList.remove('open'); document.getElementById('drawer')?.classList.remove('open'); }

/* ---------- Cart drawer markup (injected) ---------- */
function injectDrawer(){
  const el=document.createElement('div');
  el.innerHTML=`
    <div class="scrim" id="scrim" onclick="closeCart()"></div>
    <aside class="drawer" id="drawer" aria-label="Bag">
      <div class="drawer-top">
        <h3 data-en="Your bag" data-is="Karfan þín">Your bag</h3>
        <button class="x" onclick="closeCart()" aria-label="Close">✕</button>
      </div>
      <div class="drawer-body" id="cartBody"></div>
      <div class="drawer-foot" id="cartFoot"></div>
    </aside>`;
  document.body.appendChild(el);
}

/* ---------- Reveal on scroll ---------- */
function initReveal(){
  const io=new IntersectionObserver((es)=>{
    es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
}

/* ---------- Shared product card (numbered editorial) ---------- */
function cardHTML(s, i){
  const no = String((typeof i==='number'?i:SCARVES.indexOf(s))+1).padStart(2,'0');
  const gloss = s.en ? `(${s.en})` : '';
  const glossIs = s.is && s.is!==s.name ? `(${s.is})` : '';
  const nm = s.nEn
    ? `<span data-en="${s.nEn}" data-is="${s.nIs}">${s.nEn}</span>`
    : s.name;
  return `<a class="card" href="product.html?s=${s.slug}">
    <div class="idx">${no}</div>
    <figure><img loading="lazy" src="img/${s.slug}.jpg" alt="Leyni scarf — ${s.name}"></figure>
    <div class="meta">
      <div class="nm">${nm}</div>
      <div class="sub-lbl"><span class="gl" data-en="${gloss}" data-is="${glossIs}">${gloss}</span><span class="pr">${soldOut(s.slug)?'':priceHTML(s.slug)}</span>${soldOut(s.slug)?'<span class="soon-tag" data-en="Sold out" data-is="Uppselt">Sold out</span>':''}</div>
      ${soldOut(s.slug)?'':'<div class="promo-lbl" data-en="Limited offer −20%" data-is="Kynningartilboð −20%">Limited offer −20%</div>'}
    </div>
  </a>`;
}

/* ---------- Nav behaviour ---------- */
function initNav(){
  const nav=document.querySelector('.nav');
  const th=()=> nav?.classList.contains('hero-nav') ? window.innerHeight-120 : 8;
  const onScroll=()=>nav?.classList.toggle('scrolled',window.scrollY>th());
  window.addEventListener('scroll',onScroll); onScroll();
  const mb=document.getElementById('menuBtn'), mm=document.getElementById('mobileMenu');
  mb?.addEventListener('click',()=>mm?.classList.toggle('open'));
  mm?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mm.classList.remove('open')));
  document.querySelectorAll('[data-lang-btn]').forEach(b=>b.addEventListener('click',()=>applyLang(b.dataset.langBtn)));
  document.querySelectorAll('[data-open-cart]').forEach(b=>b.addEventListener('click',openCart));
}

/* ---------- Boot ---------- */
document.addEventListener('DOMContentLoaded',()=>{
  injectDrawer();
  injectPreorder();
  initNav();
  if(typeof PAGE_RENDER==='function') PAGE_RENDER();
  applyLang(lang());
  renderCart();
  initReveal();
  loadCatalog().then(()=>{
    if(!CATALOG) return;
    if(typeof PAGE_RENDER==='function') PAGE_RENDER();
    applyLang(lang());
    renderCart();
    document.querySelectorAll('.reveal').forEach(e=>e.classList.add('in'));
  });
  document.addEventListener('langchange',()=>{ renderCart(); if(typeof PAGE_LANG==='function') PAGE_LANG(); });
});
