/* ============================================================
   LEYNI — shared data, i18n, cart, interactions
   ============================================================ */

/* ---------- Collection data (signature colours sampled from the artwork) ---------- */
const PRICE = 26900; // ISK — placeholder
const SCARVES = [
  { slug:'raudisandur',   name:'Rauðisandur',   color:'#D6645A',
    en:'Red Sand Beach', is:'Rauðisandur',
    storyEn:'The rust-red sands of the Westfjords, where the slow tide draws geometry across the shore.',
    storyIs:'Rauðgullnir sandar Vestfjarða, þar sem hægt sjávarfallið teiknar rúmfræði í fjöruna.' },
  { slug:'birkilaut',     name:'Birkilaut',     color:'#4A7396',
    en:'Birch Glade', is:'Birkilaut',
    storyEn:'A sheltered hollow of birch, steel-blue dusk settling quietly between the leaves.',
    storyIs:'Skýlt birkilaut þar sem stálblátt rökkrið sest hljóðlega milli laufanna.' },
  { slug:'forsetinn',     name:'Forsetinn',     color:'#B96D80',
    en:'The President', is:'Forsetinn',
    storyEn:'Composed and ceremonial — a dusk-rose motif carried with a diplomat’s poise.',
    storyIs:'Yfirvegað og hátíðlegt — rökkurbleikt mynstur borið fram með ró sendiherrans.' },
  { slug:'bleikadisin',   name:'Bleika dísin',  color:'#B22890',
    en:'The Pink Muse', is:'Bleika dísin',
    storyEn:'A muse in magenta — playful, luminous and impossible to overlook.',
    storyIs:'Dís í blómableiku — leikandi, ljómandi og ómögulegt að líta framhjá.' },
  { slug:'snaefellsjokull',name:'Snæfellsjökull',color:'#6E6BB2',
    en:'The Snæfellsjökull Glacier', is:'Snæfellsjökull',
    storyEn:'The glacier at the edge of the world, periwinkle light resting on ancient ice.',
    storyIs:'Jökullinn á heimsenda — bláfjólublátt ljós hvílir á aldagömlum ís.' },
  { slug:'koniaksstofan', name:'Koníaksstofan', color:'#B0774A',
    en:'The Cognac Room', is:'Koníaksstofan',
    storyEn:'Warm cognac light and unhurried conversation, held within squares of silk.',
    storyIs:'Hlýtt koníaksljós og áhyggjulaust samtal, fangað í ferningum úr silki.' },
  { slug:'katem',         name:'Kate M',        color:'#C24E6B',
    en:'', is:'',
    storyEn:'A portrait in crimson and rose — bold, warm and unmistakably herself.',
    storyIs:'Andlitsmynd í djúprauðu og rósrauðu — djörf, hlý og ómótstæðilega hún sjálf.' },
  { slug:'juli',          name:'Júlí',          color:'#E2726F',
    en:'July', is:'Júlí',
    storyEn:'The warmth of high summer — coral and rose beneath a midnight sun.',
    storyIs:'Hlýja hásumars — kórall og rós undir miðnætursól.' },
  { slug:'2021',          name:'2021',          color:'#3B4E8C',
    en:'', is:'',
    storyEn:'A year kept in silk — the quiet blues of a season that lingered.',
    storyIs:'Ár varðveitt í silki — kyrrlátir bláir tónar árstíðar sem dvaldi.' }
];
const bySlug = s => SCARVES.find(x=>x.slug===s);

/* ---------- Men / Unisex — Rivers of Iceland (coming soon) ---------- */
const RIVERS = [
  { slug:'river-skafta',     name:'Skaftá',     en:'River at Skaftafell', is:'Áin við Skaftafell' },
  { slug:'river-oxara',      name:'Öxará',      en:'River at Þingvellir', is:'Áin á Þingvöllum' },
  { slug:'river-thjorsa',    name:'Þjórsá',     en:'The Highland River',  is:'Hálendisfljótið' },
  { slug:'river-hvita',      name:'Hvítá',      en:'River of Gullfoss',   is:'Áin við Gullfoss' },
  { slug:'river-hraunfljot', name:'Hraunfljót', en:'A River of Lava',     is:'Rennandi hraun' }
];
function riverCardHTML(s, i){
  const no = String(i+1).padStart(2,'0');
  return `<div class="card">
    <div class="idx">M ${no}</div>
    <figure><img loading="lazy" src="img/${s.slug}.jpg" alt="Leyni — ${s.name}"></figure>
    <div class="meta">
      <div class="nm">${s.name}</div>
      <div class="sub-lbl"><b class="gl" data-en="(${s.en})" data-is="(${s.is})">(${s.en})</b><span class="soon-tag" data-en="Coming soon · 55 × 55" data-is="Væntanlegt · 55 × 55">Coming soon · 55 × 55</span></div>
      <a class="ulink river-pre" href="index.html#men" data-en="Preorder" data-is="Forpanta">Preorder</a>
    </div>
  </div>`;
}

/* ---------- i18n ---------- */
const T = {
  bag:{en:'Bag',is:'Karfa'},
  price:{en:'ISK',is:'kr'},
  addToBag:{en:'Add to bag',is:'Setja í körfu'},
  quickAdd:{en:'Quick add',is:'Bæta við'},
  soldIn:{en:'88 × 88 cm',is:'88 × 88 cm'},
  title:{en:'LEYNI — Silk of Iceland',is:'LEYNI — Silki frá Íslandi'},
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
    const s=bySlug(i.slug); const line=PRICE*i.qty; sub+=line;
    return `<div class="ci">
      <img src="img/${s.slug}.jpg" alt="${s.name}">
      <div>
        <div class="nm">${s.name}</div>
        <div class="sz">${T.soldIn[l]}</div>
        <button class="rm" onclick="removeFromCart('${s.slug}')">${T.remove[l]}</button>
      </div>
      <div class="side">${money(line)}<div class="q">× ${i.qty}</div></div>
    </div>`;
  }).join('');
  foot.innerHTML=`
    <div class="row total"><span>${T.subtotal[l]}</span><span>${money(sub)}</span></div>
    <div class="note">${T.shipNote[l]}</div>
    <button class="btn solid block" style="--accent:#101010" onclick="alert('Shopify checkout connects here.')">${T.checkout[l]}</button>`;
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
  return `<a class="card" href="product.html?s=${s.slug}">
    <div class="idx">${no}</div>
    <figure><img loading="lazy" src="img/${s.slug}.jpg" alt="Leyni scarf — ${s.name}"></figure>
    <div class="meta">
      <div class="nm">${s.name}</div>
      <div class="sub-lbl"><span class="gl" data-en="${gloss}" data-is="${glossIs}">${gloss}</span><span class="pr">${money(PRICE)}</span></div>
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
  initNav();
  if(typeof PAGE_RENDER==='function') PAGE_RENDER();
  applyLang(lang());
  renderCart();
  initReveal();
  document.addEventListener('langchange',()=>{ renderCart(); if(typeof PAGE_LANG==='function') PAGE_LANG(); });
});
