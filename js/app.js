/* ---------------- Storage helpers ---------------- */
const DB = {
  get(key, fallback){ try{ const v = localStorage.getItem(key); return v?JSON.parse(v):fallback; }catch(e){ return fallback; } },
  set(key, val){ localStorage.setItem(key, JSON.stringify(val)); }
};

function getUsers(){ return DB.get('bg_users', []); }
function setUsers(u){ DB.set('bg_users', u); }
function getCurrentUser(){ return DB.get('bg_current_user', null); }
function setCurrentUser(u){ DB.set('bg_current_user', u); }
function getCart(){ return DB.get('bg_cart', []); }
function setCart(c){ DB.set('bg_cart', c); updateCartBadge(); }
function getOrders(){ return DB.get('bg_orders', []); }
function setOrders(o){ DB.set('bg_orders', o); }

function money(n){ return '৳' + Number(n).toLocaleString('en-BD'); }

function toast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(()=>t.classList.remove('show'), 2400);
}

/* ---------------- Header / nav render ---------------- */
function renderChrome(){
  const catNav = document.getElementById('catNav');
  catNav.innerHTML = CATEGORIES.map(c=>`<a href="#/category/${c.id}" class="cat-link" data-cat="${c.id}">${c.label}</a>`).join('');
  document.getElementById('footerCats').innerHTML = CATEGORIES.map(c=>`<li><a href="#/category/${c.id}">${c.label}</a></li>`).join('');
  updateCartBadge();
  updateAcctLabel();
}

function updateCartBadge(){
  const count = getCart().reduce((a,i)=>a+i.qty,0);
  document.getElementById('cartCount').textContent = count;
}
function updateAcctLabel(){
  const u = getCurrentUser();
  document.getElementById('acctLabel').textContent = u ? u.name.split(' ')[0] : 'Account';
}

/* ---------------- Brand logo (generated monogram, not a real trademark) ---------------- */
function brandLogo(brand, color){
  const initials = brand.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
  return `<span class="brand-logo" style="background:${color}">${initials}</span>`;
}

function categoryIcon(catId, big){
  return ICONS[catId] || '';
}

/* ---------------- Product card ---------------- */
function productCard(p){
  const c = catById(p.cat);
  return `
  <div class="product-card">
    <a href="#/product/${p.id}" class="card-media" style="position:relative;color:${c.color}">
      <div class="card-cat-accent" style="background:${c.color}"></div>
      ${categoryIcon(p.cat)}
    </a>
    <div class="card-body">
      <div class="brand-row">
        ${brandLogo(p.brand, c.color)}
        <span class="brand-name">${p.brand}</span>
      </div>
      <a href="#/product/${p.id}" class="card-model">${p.model}</a>
      <div class="card-price-row">
        <span class="price">${money(p.price)}</span>
        <span class="weight-tag">${p.weightKg} kg</span>
      </div>
      <button class="card-cta" data-order="${p.id}">Order now</button>
    </div>
  </div>`;
}

/* ---------------- Pages ---------------- */
function pageHome(){
  const featured = CATEGORIES.map(c=>{
    const items = productsByCat(c.id).slice(0,4);
    return `
    <div class="cat-section">
      <div class="section-head">
        <h2>${c.label}</h2>
        <a href="#/category/${c.id}">See all →</a>
      </div>
      <div class="grid">${items.map(productCard).join('')}</div>
    </div>`;
  }).join('');

  return `
  <section class="hero">
    <div>
      <span class="hero-badge">✓ 100% genuine — ৳500,000 guarantee</span>
      <h1>Real gadgets from the USA, tracked all the way to your door in Bangladesh.</h1>
      <p class="lead">Bangladesh Gadget sources every product directly from the United States. No counterfeits, ever — and we'll pay ৳500,000 to anyone who proves otherwise.</p>
      <div class="hero-ctas">
        <a href="#/category/smartphones" class="btn btn-primary">Shop smartphones</a>
        <a href="#/about" class="btn btn-outline">How it works</a>
      </div>
      <div class="trust-row">
        <div class="trust-item"><strong>Free</strong>&nbsp;shipping on your first order</div>
        <div class="trust-item"><strong>Live</strong>&nbsp;tracking, USA → Bangladesh</div>
        <div class="trust-item"><strong>12h</strong>&nbsp;free cancellation window</div>
      </div>
    </div>
    <div class="route-card">
      <h3>Your shipment's journey</h3>
      ${routeSvg()}
      <div class="route-caption"><span>United States</span><span>Chittagong, Bangladesh</span></div>
    </div>
  </section>

  <section class="trust-strip">
    ${trustCard('🛡️','Verified authentic','Sourced directly from US retailers — never grey-market or replica stock.')}
    ${trustCard('⚖️','Priced by weight','Shipping is calculated transparently from each product\u2019s actual weight.')}
    ${trustCard('📍','Real-time tracking','Follow your order from the US warehouse to your home.')}
    ${trustCard('💳','Pay your way','bKash, Nagad, Rocket, internet banking, or any Visa/Mastercard.')}
  </section>

  ${featured}
  `;
}

function trustCard(icon,title,text){
  return `<div class="trust-card"><div class="ico">${icon}</div><div><h4>${title}</h4><p>${text}</p></div></div>`;
}

function routeSvg(){
  return `<svg class="route-svg" viewBox="0 0 320 90" fill="none">
    <path d="M14 70 C 90 10, 220 10, 306 70" stroke="#2a4a72" stroke-width="2" stroke-dasharray="5 6" fill="none"/>
    <circle cx="14" cy="70" r="6" fill="#E63C26"/>
    <circle cx="130" cy="26" r="5" fill="#FFB020"/>
    <circle cx="230" cy="26" r="5" fill="#FFB020"/>
    <circle cx="306" cy="70" r="6" fill="#1E9E5A"/>
    <path d="M100 34 l14 -6 l-3 8 l3 8 l-14 -6 Z" fill="#9fb0c3"/>
    <path d="M200 34 l14 -6 l-3 8 l3 8 l-14 -6 Z" fill="#9fb0c3"/>
  </svg>`;
}

function pageCategory(catId){
  const c = catById(catId);
  if(!c) return pageNotFound();
  const items = productsByCat(catId);
  return `
  <div class="page-hero">
    <h1>${c.label}</h1>
    <p class="prose" style="margin-bottom:0">${items.length} products · brand, model, price and shipping weight shown for each item.</p>
  </div>
  <div class="grid" style="margin:24px 0 50px">${items.map(productCard).join('')}</div>
  `;
}

function pageProduct(id){
  const p = getProduct(id);
  if(!p) return pageNotFound();
  const c = catById(p.cat);
  return `
  <div class="product-detail">
    <div class="pd-media" style="color:${c.color}">${categoryIcon(p.cat)}</div>
    <div class="pd-info">
      <div class="pd-brand">${brandLogo(p.brand,c.color)}<span class="brand-name" style="font-size:13px">${p.brand} · ${c.label}</span></div>
      <h1>${p.model}</h1>
      <p class="pd-meta">${p.desc}</p>
      <div class="pd-price">${money(p.price)}</div>
      <div class="pd-meta">Shipping weight: <strong>${p.weightKg} kg</strong> — shipping is calculated by weight at checkout.</div>

      <div class="pd-note">Your first order ships free. From your second order, shipping is charged at ${money(SHIPPING_RATE_PER_KG)}/kg (minimum ${money(MIN_SHIPPING)}).</div>

      <div class="qty-row">
        <span style="font-weight:600;font-size:13.5px">Quantity</span>
        <div class="qty-ctrl">
          <button id="qtyMinus" type="button">−</button>
          <span id="qtyVal">1</span>
          <button id="qtyPlus" type="button">+</button>
        </div>
      </div>

      <button class="btn btn-primary btn-block" id="orderNowBtn" data-id="${p.id}">Order this item</button>

      <ul class="pd-features">
        <li>Genuine, US-sourced — 100% authenticity guaranteed</li>
        <li>Tracked door-to-door from the US to Chittagong</li>
        <li>Free cancellation within 12 hours of ordering</li>
        <li>Pay by bKash, Nagad, Rocket, internet banking, or card</li>
      </ul>
    </div>
  </div>`;
}

function pageCart(){
  const cart = getCart();
  if(cart.length===0){
    return emptyState('Your cart is empty','Browse a category and tap "Order now" on any product to get started.','#/home','Start shopping');
  }
  let subtotal = 0;
  const rows = cart.map(item=>{
    const p = getProduct(item.id); if(!p) return '';
    subtotal += p.price*item.qty;
    const c = catById(p.cat);
    return `
    <div class="order-card">
      <div class="order-head">
        <div class="brand-row">${brandLogo(p.brand,c.color)}<strong>${p.model}</strong></div>
        <span>${money(p.price)} × ${item.qty}</span>
      </div>
      <div class="qty-row" style="margin-bottom:0">
        <div class="qty-ctrl">
          <button type="button" data-cartminus="${p.id}">−</button>
          <span>${item.qty}</span>
          <button type="button" data-cartplus="${p.id}">+</button>
        </div>
        <button class="btn-ghost" data-cartremove="${p.id}" type="button">Remove</button>
      </div>
    </div>`;
  }).join('');

  return `
  <div class="page-hero"><h1>Your cart</h1></div>
  <div style="max-width:560px">
    ${rows}
    <div class="summary-row total"><span>Subtotal</span><span>${money(subtotal)}</span></div>
    <p class="prose" style="font-size:12.5px;color:var(--muted);margin-top:6px">Shipping is calculated by weight at checkout. Your first order ships free.</p>
    <button class="btn btn-primary btn-block" id="checkoutBtn" style="margin-top:16px">Proceed to checkout</button>
  </div>`;
}

function emptyState(title,text,href,cta){
  return `<div class="empty-state"><h3>${title}</h3><p>${text}</p><a class="btn btn-primary" href="${href}" style="margin-top:14px;display:inline-flex">${cta}</a></div>`;
}

function pageTrack(){
  const orders = getOrders().slice().reverse();
  const u = getCurrentUser();
  if(orders.length===0){
    return emptyState('No orders yet','Once you place an order, you can track it here — from the US warehouse to your door.','#/home','Browse products');
  }
  return `
  <div class="page-hero"><h1>Track your orders</h1><p class="prose">${u? 'Signed in as '+u.name : 'Showing orders placed on this device.'}</p></div>
  <div style="max-width:640px">
    ${orders.map(o=>orderCard(o)).join('')}
  </div>`;
}

const STAGES = [
  {key:'confirmed', label:'Order confirmed'},
  {key:'packed', label:'Packed at US warehouse'},
  {key:'departed', label:'Departed the United States (air cargo)'},
  {key:'customs', label:'Arrived in Bangladesh — customs clearance'},
  {key:'outfordelivery', label:'Out for delivery — Chittagong hub'},
  {key:'delivered', label:'Delivered'},
];

function orderCard(o){
  const stageIdx = o.stageIdx ?? 0;
  const cancellable = (Date.now() - o.createdAt) < 12*3600*1000 && stageIdx < 2;
  const statusLabel = STAGES[stageIdx].label;
  const pillClass = stageIdx===STAGES.length-1 ? 'delivered' : 'active';
  return `
  <div class="order-card">
    <div class="order-head">
      <div>
        <strong>Order #${o.id}</strong>
        <div style="font-size:12px;color:var(--muted)">${new Date(o.createdAt).toLocaleString()}</div>
      </div>
      <span class="status-pill ${pillClass}">${statusLabel}</span>
    </div>
    <div style="font-size:13.5px;color:var(--muted);margin-bottom:10px">${o.items.map(i=>`${i.model} × ${i.qty}`).join(', ')}</div>
    <div class="summary-row"><span>Total paid</span><span>${money(o.total)}</span></div>
    <div class="timeline" style="margin:14px 0 6px">
      ${STAGES.map((s,i)=>`
        <div class="tl-item ${i<stageIdx?'done':''} ${i===stageIdx?'current':''}">
          <div class="tl-dot">${i<stageIdx?'✓':i+1}</div>
          <div><div class="tl-title">${s.label}</div>${i===stageIdx?'<div class="tl-sub">Current status</div>':''}</div>
        </div>`).join('')}
    </div>
    ${cancellable ? `<button class="btn btn-outline btn-sm" data-cancel="${o.id}">Cancel order</button>` : `<span style="font-size:12px;color:var(--muted)">${stageIdx>=2 ? 'Cancellation window closed — shipment already in transit.' : 'Cancellation window (12h) has passed.'}</span>`}
  </div>`;
}

function pageAbout(){
  return `
  <div class="page-hero"><h1>About Bangladesh Gadget</h1></div>
  <div class="prose">
    <p>Bangladesh Gadget imports electronics, gaming gear, smart home devices, and fashion directly from the United States. Every product is sourced from genuine, authorized channels — we do not sell counterfeit or replica items, and we never will.</p>

    <div class="guarantee-banner">
      <div class="amt">৳500,000</div>
      <div>Our authenticity guarantee: if you can prove we've ever sold you a counterfeit product, we will pay you ৳500,000.</div>
    </div>

    <p>Because everything is imported, our prices are slightly higher than local grey-market alternatives — that's the cost of getting a genuine, US-sourced product with a real warranty. Shipping is charged by the actual weight of your order, and we show that weight on every product page so there are no surprises at checkout.</p>

    <p>To welcome new customers, we cover the shipping cost on your very first order, for free. We manage the entire journey ourselves — from the US warehouse, through air cargo, customs clearance, and final delivery to your home in Bangladesh — and you can watch each step from your phone or computer.</p>

    <div class="callout">
      <h3>How ordering works</h3>
      <p style="margin:0">Choose your product, confirm your order and payment, and simply wait — we handle sourcing, customs, and delivery for you, all the way to your doorstep.</p>
    </div>

    <p>Have a question before you order? Our team is reachable by phone, WhatsApp, or the chat button on this site — we're here to make importing genuine gadgets simple.</p>
  </div>`;
}

function pageFaq(){
  return `
  <div class="page-hero"><h1>Shipping &amp; pricing</h1></div>
  <div class="prose">
    <p><strong>How is shipping priced?</strong> Every product lists its shipping weight. At checkout, shipping is calculated at ${money(SHIPPING_RATE_PER_KG)} per kg, with a minimum charge of ${money(MIN_SHIPPING)}.</p>
    <p><strong>Is my first order really free to ship?</strong> Yes — shipping is waived automatically on the first order placed from your account.</p>
    <p><strong>Can I cancel an order?</strong> Yes, within 12 hours of placing it, as long as it hasn't yet left our US warehouse.</p>
    <p><strong>How long does delivery take?</strong> Typically 7–14 days from confirmation to delivery in Chittagong and nationwide, depending on customs processing.</p>
  </div>`;
}

function pageContact(){
  return `
  <div class="page-hero"><h1>Contact us</h1></div>
  <div class="two-col">
    <div>
      <div class="contact-card"><h4>Address</h4><p>Chittagong, Bangladesh</p></div>
      <div class="contact-card"><h4>Email</h4><p><a href="mailto:bangladeshgadget2@gmail.com">bangladeshgadget2@gmail.com</a></p></div>
      <div class="contact-card"><h4>Phone / WhatsApp</h4><p><a href="tel:01301367205">01301367205</a> &nbsp;·&nbsp; <a href="tel:01571507618">01571507618</a></p></div>
      <div class="wa-row" style="margin-top:4px">
        <a class="wa-btn" style="background:var(--navy)" target="_blank" href="https://wa.me/8801301367205">Message on WhatsApp 1</a>
        <a class="wa-btn" style="background:var(--navy)" target="_blank" href="https://wa.me/8801571507618">Message on WhatsApp 2</a>
      </div>
    </div>
    <div>
      <div class="contact-card">
        <h4 style="margin-bottom:10px">Send us a message</h4>
        <form id="contactForm">
          <div class="field"><label>Name</label><input required name="name"/></div>
          <div class="field"><label>Phone or email</label><input required name="contact"/></div>
          <div class="field"><label>Message</label><textarea required name="message" rows="4"></textarea></div>
          <button class="btn btn-primary btn-block" type="submit">Send message</button>
        </form>
      </div>
    </div>
  </div>`;
}

function pageNotFound(){
  return emptyState('Page not found','That page doesn\'t exist — but our products do.','#/home','Go to homepage');
}

/* ---------------- Router ---------------- */
function render(){
  closeModal();
  const hash = location.hash || '#/home';
  const parts = hash.replace('#/','').split('/');
  const route = parts[0];
  const view = document.getElementById('view');

  document.querySelectorAll('.cat-link').forEach(a=>a.classList.remove('active'));

  let html = '';
  if(route==='home' || route===''){ html = pageHome(); }
  else if(route==='category'){ html = pageCategory(parts[1]); const el=document.querySelector(`.cat-link[data-cat="${parts[1]}"]`); if(el) el.classList.add('active'); }
  else if(route==='product'){ html = pageProduct(parts[1]); }
  else if(route==='cart'){ html = pageCart(); }
  else if(route==='track'){ html = pageTrack(); }
  else if(route==='about'){ html = pageAbout(); }
  else if(route==='faq'){ html = pageFaq(); }
  else if(route==='contact'){ html = pageContact(); }
  else { html = pageNotFound(); }

  view.innerHTML = html;
  window.scrollTo({top:0, behavior:'instant' in window ? 'instant':'auto'});
  wireViewEvents(route, parts[1]);
}

/* ---------------- Per-view event wiring ---------------- */
let currentQty = 1;

function wireViewEvents(route, param){
  // order-now buttons on cards
  document.querySelectorAll('[data-order]').forEach(btn=>{
    btn.addEventListener('click', e=>{
      e.preventDefault();
      addToCart(btn.dataset.order, 1);
      toast('Added to cart');
    });
  });

  if(route==='product'){
    currentQty = 1;
    const qtyVal = document.getElementById('qtyVal');
    document.getElementById('qtyPlus').addEventListener('click', ()=>{ currentQty++; qtyVal.textContent=currentQty; });
    document.getElementById('qtyMinus').addEventListener('click', ()=>{ if(currentQty>1) currentQty--; qtyVal.textContent=currentQty; });
    document.getElementById('orderNowBtn').addEventListener('click', ()=>{
      addToCart(param, currentQty);
      openCheckoutModal([{id:param, qty:currentQty}]);
    });
  }

  if(route==='cart'){
    document.getElementById('checkoutBtn')?.addEventListener('click', ()=>{
      openCheckoutModal(getCart());
    });
    document.querySelectorAll('[data-cartplus]').forEach(b=>b.addEventListener('click',()=>{ changeCartQty(b.dataset.cartplus,1); render(); }));
    document.querySelectorAll('[data-cartminus]').forEach(b=>b.addEventListener('click',()=>{ changeCartQty(b.dataset.cartminus,-1); render(); }));
    document.querySelectorAll('[data-cartremove]').forEach(b=>b.addEventListener('click',()=>{ removeFromCart(b.dataset.cartremove); render(); }));
  }

  if(route==='track'){
    document.querySelectorAll('[data-cancel]').forEach(b=>b.addEventListener('click',()=>{
      cancelOrder(b.dataset.cancel); render();
    }));
  }

  if(route==='contact'){
    document.getElementById('contactForm')?.addEventListener('submit', e=>{
      e.preventDefault();
      toast('Message sent — we\'ll reply by email or phone shortly.');
      e.target.reset();
    });
  }
}

/* ---------------- Cart logic ---------------- */
function addToCart(id, qty){
  const cart = getCart();
  const existing = cart.find(i=>i.id===id);
  if(existing){ existing.qty += qty; } else { cart.push({id, qty}); }
  setCart(cart);
}
function changeCartQty(id, delta){
  const cart = getCart();
  const item = cart.find(i=>i.id===id);
  if(!item) return;
  item.qty += delta;
  if(item.qty<=0){ setCart(cart.filter(i=>i.id!==id)); } else { setCart(cart); }
}
function removeFromCart(id){ setCart(getCart().filter(i=>i.id!==id)); }

/* ---------------- Checkout modal ---------------- */
function openCheckoutModal(items){
  const lineItems = items.map(i=>({...i, p:getProduct(i.id)})).filter(i=>i.p);
  if(lineItems.length===0) return;
  const totalWeight = lineItems.reduce((a,i)=>a+i.p.weightKg*i.qty,0);
  const subtotal = lineItems.reduce((a,i)=>a+i.p.price*i.qty,0);
  const isFirstOrder = getOrders().length===0;
  const shipping = isFirstOrder ? 0 : Math.max(MIN_SHIPPING, Math.round(totalWeight*SHIPPING_RATE_PER_KG));
  const total = subtotal + shipping;
  const u = getCurrentUser();

  const html = `
  <div class="modal-overlay" id="checkoutOverlay">
    <div class="modal-card wide">
      <button class="modal-close" data-close>✕</button>
      <h2>Confirm your order</h2>
      <p class="modal-sub">${lineItems.map(i=>`${i.p.model} × ${i.qty}`).join(', ')}</p>

      <form id="checkoutForm">
        <div class="field-row">
          <div class="field"><label>Full name</label><input required name="name" value="${u?u.name:''}"/></div>
          <div class="field"><label>Phone number</label><input required name="phone" placeholder="01XXXXXXXXX" pattern="01[0-9]{9}" value="${u?u.phone||'':''}"/></div>
        </div>
        <div class="field"><label>Delivery address</label><textarea required name="address" rows="2" placeholder="House, road, area, district"></textarea></div>

        <div class="pay-group-label">Mobile banking</div>
        <div class="pay-options">
          ${payOpt('bkash','bKash')}
          ${payOpt('nagad','Nagad')}
          ${payOpt('rocket','Rocket')}
          ${payOpt('ibanking','Internet banking')}
        </div>
        <div class="pay-group-label">Card</div>
        <div class="pay-options" style="grid-template-columns:1fr">
          ${payOpt('card','Visa / Mastercard — any bank')}
        </div>

        <div class="summary-row"><span>Subtotal</span><span>${money(subtotal)}</span></div>
        <div class="summary-row"><span>Shipping (${totalWeight.toFixed(2)} kg)</span><span>${isFirstOrder ? '<span class="free-tag">FREE — first order</span>' : money(shipping)}</span></div>
        <div class="summary-row total"><span>Total</span><span>${money(total)}</span></div>

        <button type="submit" class="btn btn-primary btn-block" style="margin-top:16px">Place order &amp; pay</button>
        <p style="font-size:11.5px;color:var(--muted);margin-top:10px">You can cancel free of charge within 12 hours of placing this order.</p>
      </form>
    </div>
  </div>`;
  document.getElementById('modalRoot').innerHTML = html;

  document.querySelectorAll('.pay-opt input').forEach(r=>r.addEventListener('change',()=>{
    document.querySelectorAll('.pay-opt').forEach(o=>o.classList.remove('checked'));
    r.closest('.pay-opt').classList.add('checked');
  }));
  document.querySelector('[data-close]').addEventListener('click', closeModal);
  document.getElementById('checkoutOverlay').addEventListener('click', e=>{ if(e.target.id==='checkoutOverlay') closeModal(); });

  document.getElementById('checkoutForm').addEventListener('submit', e=>{
    e.preventDefault();
    const fd = new FormData(e.target);
    const payment = fd.get('payment');
    if(!payment){ toast('Please choose a payment method'); return; }
    const order = {
      id: 'BG' + Date.now().toString().slice(-8),
      createdAt: Date.now(),
      items: lineItems.map(i=>({id:i.id, model:i.p.model, qty:i.qty, price:i.p.price})),
      name: fd.get('name'), phone: fd.get('phone'), address: fd.get('address'),
      payment, subtotal, shipping, total, stageIdx: 0,
    };
    const orders = getOrders(); orders.push(order); setOrders(orders);
    // clear ordered items from cart
    const orderedIds = new Set(lineItems.map(i=>i.id));
    setCart(getCart().filter(i=>!orderedIds.has(i.id)));
    closeModal();
    toast('Order placed! Redirecting to tracking…');
    location.hash = '#/track';
  });
}

function payOpt(val,label){
  return `<label class="pay-opt"><input type="radio" name="payment" value="${val}" required/>${label}</label>`;
}

function cancelOrder(id){
  const orders = getOrders();
  const idx = orders.findIndex(o=>o.id===id);
  if(idx>-1){ orders.splice(idx,1); setOrders(orders); toast('Order cancelled'); }
}

function closeModal(){ document.getElementById('modalRoot').innerHTML=''; }

/* ---------------- Account modal ---------------- */
function openAccountModal(){
  const u = getCurrentUser();
  if(u){
    document.getElementById('modalRoot').innerHTML = `
    <div class="modal-overlay" id="acctOverlay">
      <div class="modal-card">
        <button class="modal-close" data-close>✕</button>
        <h2>Hi, ${u.name.split(' ')[0]}</h2>
        <p class="modal-sub">${u.phone||u.email||''}</p>
        <a href="#/track" class="btn btn-outline btn-block" data-close style="margin-bottom:10px">View my orders</a>
        <button class="btn btn-primary btn-block" id="logoutBtn">Log out</button>
      </div>
    </div>`;
    document.getElementById('logoutBtn').addEventListener('click',()=>{ setCurrentUser(null); updateAcctLabel(); closeModal(); toast('Logged out'); });
  } else {
    document.getElementById('modalRoot').innerHTML = `
    <div class="modal-overlay" id="acctOverlay">
      <div class="modal-card">
        <button class="modal-close" data-close>✕</button>
        <h2 id="acctTitle">Create your account</h2>
        <p class="modal-sub">Save your details to order faster and track shipments.</p>
        <form id="acctForm">
          <div class="field"><label>Full name</label><input required name="name"/></div>
          <div class="field"><label>Phone number</label><input required name="phone" placeholder="01XXXXXXXXX"/></div>
          <div class="field"><label>Password</label><input required type="password" name="password" minlength="4"/></div>
          <button type="submit" class="btn btn-primary btn-block">Create account</button>
        </form>
        <p style="font-size:12.5px;text-align:center;margin-top:14px">Already have an account? <a href="#" id="toLogin" style="font-weight:600;color:var(--signal-dark)">Log in</a></p>
      </div>
    </div>`;
    wireAccountForm();
  }
  document.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click', closeModal));
  document.getElementById('acctOverlay').addEventListener('click', e=>{ if(e.target.id==='acctOverlay') closeModal(); });
}

function wireAccountForm(){
  let mode = 'register';
  const form = document.getElementById('acctForm');
  const title = document.getElementById('acctTitle');

  function onToggleClick(e){
    e.preventDefault();
    mode = mode==='register' ? 'login' : 'register';
    title.textContent = mode==='register' ? 'Create your account' : 'Log in';
    const holder = document.getElementById('toLogin').parentElement;
    holder.innerHTML = mode==='register'
      ? 'Already have an account? <a href="#" id="toLogin" style="font-weight:600;color:var(--signal-dark)">Log in</a>'
      : 'New here? <a href="#" id="toLogin" style="font-weight:600;color:var(--signal-dark)">Create an account</a>';
    document.getElementById('toLogin').addEventListener('click', onToggleClick);
    const nameField = form.querySelector('input[name="name"]')?.closest('.field');
    if(nameField) nameField.style.display = mode==='login' ? 'none' : 'block';
    const nameInput = form.querySelector('input[name="name"]');
    if(nameInput) nameInput.required = mode!=='login';
  }
  document.getElementById('toLogin').addEventListener('click', onToggleClick);

  form.addEventListener('submit', e=>{
    e.preventDefault();
    const fd = new FormData(form);
    const phone = fd.get('phone'), password = fd.get('password'), name = fd.get('name');
    const users = getUsers();
    if(mode==='register'){
      if(users.find(u=>u.phone===phone)){ toast('An account with this phone already exists'); return; }
      const user = {name, phone, password};
      users.push(user); setUsers(users);
      setCurrentUser({name, phone});
      toast('Account created — welcome!');
    } else {
      const user = users.find(u=>u.phone===phone && u.password===password);
      if(!user){ toast('Incorrect phone or password'); return; }
      setCurrentUser({name:user.name, phone:user.phone});
      toast('Welcome back, '+user.name.split(' ')[0]);
    }
    updateAcctLabel();
    closeModal();
  });
}

/* ---------------- Chat widget ---------------- */
function wireChat(){
  const fab = document.getElementById('chatToggle');
  const panel = document.getElementById('chatPanel');
  fab.addEventListener('click', ()=> panel.classList.toggle('hidden'));
  document.getElementById('chatClose').addEventListener('click', ()=> panel.classList.add('hidden'));
  document.getElementById('chatForm').addEventListener('submit', e=>{
    e.preventDefault();
    const input = document.getElementById('chatInput');
    const val = input.value.trim();
    if(!val) return;
    const body = document.getElementById('chatBody');
    body.insertAdjacentHTML('beforeend', `<div class="chat-msg user">${escapeHtml(val)}</div>`);
    input.value='';
    body.scrollTop = body.scrollHeight;
    setTimeout(()=>{
      body.insertAdjacentHTML('beforeend', `<div class="chat-msg bot">Thanks! A team member will reply here shortly. For a faster response, message us on WhatsApp using the link below.</div>`);
      body.scrollTop = body.scrollHeight;
    }, 500);
  });
}
function escapeHtml(s){ const d=document.createElement('div'); d.textContent=s; return d.innerHTML; }

/* ---------------- Search ---------------- */
function wireSearch(){
  document.getElementById('searchForm').addEventListener('submit', e=>{
    e.preventDefault();
    const q = document.getElementById('searchInput').value.trim().toLowerCase();
    if(!q) return;
    const match = PRODUCTS.find(p=> (p.brand+' '+p.model).toLowerCase().includes(q));
    if(match){ location.hash = '#/product/'+match.id; }
    else {
      const catMatch = CATEGORIES.find(c=>c.label.toLowerCase().includes(q));
      if(catMatch){ location.hash = '#/category/'+catMatch.id; }
      else toast('No matching products found');
    }
  });
}

/* ---------------- Init ---------------- */
window.addEventListener('hashchange', render);
document.addEventListener('DOMContentLoaded', ()=>{
  renderChrome();
  wireSearch();
  wireChat();
  document.getElementById('acctBtn').addEventListener('click', openAccountModal);
  render();
});
