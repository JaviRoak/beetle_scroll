(function(){
const EL='M-3 -54 L-54 -56 C-66 -40 -70 10 -64 50 C-58 90 -36 122 -3 130 Z';
const WING='M-18 -44 C-70 -92 -180 -82 -210 -30 C-222 6 -190 40 -120 42 C-70 44 -36 20 -18 -44 Z';
const LEGS=[
  {n:1,p:[[-40,-80],[-75,-100],[-88,-140],[-94,-166]]},
  {n:2,p:[[-48,-25],[-98,-32],[-122,8],[-134,32]]},
  {n:3,p:[[-44,15],[-86,42],[-100,96],[-106,132]]}
];
const LC=['#2f6b3a','#2b4d27','#4a3a1c'], LW=[8,5.5,2.6];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- defs globales ---------- */
document.getElementById('defs').innerHTML=`<defs>
<linearGradient id="mg" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" stop-color="#0b4524"/><stop offset=".34" stop-color="#2c9a4a"/>
  <stop offset=".5" stop-color="#a8ea8c"/><stop offset=".63" stop-color="#3aad54"/>
  <stop offset="1" stop-color="#08361b"/></linearGradient>
<linearGradient id="sv" gradientUnits="userSpaceOnUse" x1="-60" y1="-60" x2="0" y2="130">
  <stop offset="0" stop-color="#fbfdf9"/><stop offset=".35" stop-color="#b6c2b4"/>
  <stop offset=".55" stop-color="#ffffff"/><stop offset=".8" stop-color="#8c998a"/>
  <stop offset="1" stop-color="#e8eee6"/></linearGradient>
<linearGradient id="mgS" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" stop-color="#0a3d1f"/><stop offset=".3" stop-color="#2c9a4a"/>
  <stop offset=".5" stop-color="#d8ffb8"/><stop offset=".7" stop-color="#2c9a4a"/>
  <stop offset="1" stop-color="#0a3d1f"/></linearGradient>
<linearGradient id="svS" gradientUnits="userSpaceOnUse" x1="-60" y1="-60" x2="0" y2="130">
  <stop offset="0" stop-color="#9aa697"/><stop offset=".5" stop-color="#ffffff"/>
  <stop offset="1" stop-color="#9aa697"/></linearGradient>
<clipPath id="cpE"><path d="${EL}"/></clipPath>
<filter id="blur" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="14"/></filter>
</defs>`;

/* ---------- dibujo del escarabajo por partes ---------- */
function legInner(p){
  let s='';
  for(let i=0;i<3;i++) s+=`<line x1="${p[i][0]}" y1="${p[i][1]}" x2="${p[i+1][0]}" y2="${p[i+1][1]}" stroke="${LC[i]}" stroke-width="${LW[i]}" stroke-linecap="round"/>`;
  const e=p[3];
  s+=`<path d="M${e[0]} ${e[1]} l-4 -4 M${e[0]} ${e[1]} l3 -5" stroke="#2a2210" stroke-width="1.3" fill="none" stroke-linecap="round"/>`;
  return s;
}
function pair(name,inner){
  return `<g data-part="${name}L">${inner}</g><g data-part="${name}R"><g transform="scale(-1 1)">${inner}</g></g>`;
}
function beetle(mg,sv){
  const legs=LEGS.map(l=>pair('leg'+l.n,legInner(l.p))).join('');
  const wing=`<path d="${WING}" fill="rgba(214,192,146,.34)" stroke="rgba(118,88,44,.6)" stroke-width="1.2"/>
    <path d="M-18 -44 L-204 -34 M-28 -32 L-168 22 M-38 -14 L-108 38 M-60 -62 L-150 -66" stroke="rgba(118,88,44,.45)" stroke-width=".9" fill="none"/>`;
  const ely=`<path d="${EL}" fill="url(#${mg})" stroke="#0a3018" stroke-opacity=".55" stroke-width="1.5"/>
    <g clip-path="url(#cpE)" fill="none" stroke="url(#${sv})" stroke-linecap="round">
      <path d="M-9 -60 C-10 0 -9 70 -6 135" stroke-width="3.5"/>
      <path d="M-22 -60 C-26 0 -24 70 -15 130" stroke-width="5"/>
      <path d="M-37 -60 C-43 0 -40 70 -27 122" stroke-width="5"/>
      <path d="M-52 -60 C-60 0 -55 60 -42 110" stroke-width="4"/>
    </g>
    <path d="M-60 -20 C-64 20 -60 60 -48 90" stroke="#fff" stroke-opacity=".35" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  const ant=`<path d="M-9 -133 Q-22 -150 -31 -159" stroke="#5a3d16" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <g fill="#6e4b1b"><ellipse cx="-36" cy="-162" rx="7" ry="2.4" transform="rotate(-55 -36 -162)"/>
    <ellipse cx="-34" cy="-165" rx="7" ry="2.4" transform="rotate(-30 -34 -165)"/>
    <ellipse cx="-37" cy="-158" rx="7" ry="2.4" transform="rotate(-75 -37 -158)"/></g>`;
  return `<g class="shadow"><ellipse cx="0" cy="25" rx="96" ry="150" fill="#1d3a26" opacity=".16" filter="url(#blur)"/></g>
  <g class="root">
    ${legs}
    ${pair('wing',wing)}
    <g data-part="abd"><ellipse cx="0" cy="40" rx="52" ry="86" fill="#163822"/>
      <path d="M-44 20 Q0 32 44 20 M-48 50 Q0 62 48 50 M-44 80 Q0 92 44 80" stroke="#0b2415" stroke-width="2" fill="none"/></g>
    ${pair('ely',ely)}
    <g data-part="scu"><path d="M-9 -56 L9 -56 L0 -36 Z" fill="url(#${mg})"/></g>
    <g data-part="head"><path d="M-22 -104 C-27 -121 -15 -137 0 -139 C15 -137 27 -121 22 -104 Z" fill="url(#${mg})" stroke="#0a3018" stroke-opacity=".5"/>
      <circle cx="-20" cy="-117" r="5" fill="#1b140a"/><circle cx="20" cy="-117" r="5" fill="#1b140a"/>
      <circle cx="-21.5" cy="-118.5" r="1.4" fill="#fff" opacity=".7"/><circle cx="18.5" cy="-118.5" r="1.4" fill="#fff" opacity=".7"/></g>
    <g data-part="pro"><path d="M-26 -106 C-44 -104 -58 -88 -60 -58 Q0 -48 60 -58 C58 -88 44 -104 26 -106 Q0 -110 -26 -106 Z" fill="url(#${mg})" stroke="#0a3018" stroke-opacity=".5" stroke-width="1.4"/>
      <path d="M-30 -101 C-45 -97 -53 -84 -55 -63 M30 -101 C45 -97 53 -84 55 -63" stroke="url(#${sv})" stroke-width="3.2" fill="none" stroke-linecap="round"/>
      <path d="M0 -104 L0 -57" stroke="url(#${sv})" stroke-width="2.6"/>
      <ellipse cx="-18" cy="-88" rx="14" ry="6" fill="#fff" opacity=".25" transform="rotate(-25 -18 -88)"/></g>
    ${pair('ant',ant)}
  </g>`;
}
function mount(host,mg,sv){
  host.insertAdjacentHTML('beforeend',beetle(mg,sv));
  const P={};
  host.querySelectorAll('[data-part]').forEach(e=>P[e.dataset.part]=e);
  return {P,root:host.querySelector('.root'),shadow:host.querySelector('.shadow')};
}

/* ---------- utilidades ---------- */
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
const easeOut=t=>1-Math.pow(1-t,3);
let seed=11; const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
const legAttach=(n,side)=>{const a=LEGS[n-1].p[0];return side==='L'?a:[-a[0],a[1]]};

/* ---------- 2 · abre las alas y vuela ---------- */
const svg2=document.querySelector('#s2 svg'); const B2=mount(svg2,'mg','sv');
function r2(p,t){
  const open=ease(clamp(p/.3)); const th=44*open;
  const u=ease(clamp((p-.12)/.35));
  const amp=clamp((p-.4)/.12);
  const w=reduce?0:t/1000*Math.PI*2*5.5;
  const flap=amp*Math.sin(w);
  const vib=amp*1.5*Math.sin(w*2);
  B2.P.elyL.setAttribute('transform',`rotate(${th+vib} -3 -54)`);
  B2.P.elyR.setAttribute('transform',`rotate(${-th-vib} 3 -54)`);
  const a=-80*(1-u)+24*flap;
  const sx=(.2+.8*u)*(1-amp*.3*(.5+.5*Math.sin(w+1.2)));
  const sy=.45+.55*u;
  B2.P.wingL.setAttribute('transform',`rotate(${a} -18 -44) translate(-18 -44) scale(${sx} ${sy}) translate(18 44)`);
  B2.P.wingR.setAttribute('transform',`rotate(${-a} 18 -44) translate(18 -44) scale(${sx} ${sy}) translate(-18 44)`);
  const wo=clamp(u*3); B2.P.wingL.style.opacity=wo; B2.P.wingR.style.opacity=wo;
  const f=ease(clamp((p-.48)/.52));
  const bob=amp*5*Math.sin(w*.5);
  [1,2,3].forEach(n=>{ // patas cuelgan al volar
    const tuck=amp*(n===1?-14:n===2?10:22);
    const aL=legAttach(n,'L'), aR=legAttach(n,'R');
    B2.P['leg'+n+'L'].setAttribute('transform',`rotate(${tuck} ${aL[0]} ${aL[1]})`);
    B2.P['leg'+n+'R'].setAttribute('transform',`rotate(${-tuck} ${aR[0]} ${aR[1]})`);
  });
  B2.root.setAttribute('transform',`translate(${f*140} ${-f*560+bob}) rotate(${f*14}) scale(${1-.5*f})`);
  B2.shadow.setAttribute('transform',`scale(${1-.55*f})`);
  B2.shadow.style.opacity=1-f;
}

/* ---------- 3 · cambio de luz / brillo iridiscente ---------- */
const svg3=document.querySelector('#s3 svg'); const B3=mount(svg3,'mgS','svS');
const gS=document.getElementById('mgS'), gSt=gS.querySelectorAll('stop');
const vS=document.getElementById('svS'), vSt=vS.querySelectorAll('stop');
const C=[[44,154,74],[160,178,52],[34,150,122]];
const lerp=(a,b,t)=>a.map((v,i)=>Math.round(v+(b[i]-v)*t));
const rgb=c=>`rgb(${c[0]},${c[1]},${c[2]})`;
function r3(p){
  const h=-.15+p*1.3;
  const mid=p<.5?lerp(C[0],C[1],p*2):lerp(C[1],C[2],(p-.5)*2);
  const offs=[0,clamp(h-.2),clamp(h),clamp(h+.2),1];
  gSt.forEach((s,i)=>s.setAttribute('offset',offs[i]));
  gSt[1].setAttribute('stop-color',rgb(mid)); gSt[3].setAttribute('stop-color',rgb(mid));
  const ang=(-30+p*140)*Math.PI/180, c=Math.cos(ang)*.5, s=Math.sin(ang)*.5;
  gS.setAttribute('x1',.5-c); gS.setAttribute('y1',.5-s); gS.setAttribute('x2',.5+c); gS.setAttribute('y2',.5+s);
  vSt[1].setAttribute('offset',clamp(1.2-p*1.4));
  B3.root.setAttribute('transform',`rotate(${Math.sin(p*Math.PI*2)*7}) scale(1.06)`);
}

/* ---------- 5 · camina dejando huellas ---------- */
const svg5=document.querySelector('#s5 svg');
const NS='http://www.w3.org/2000/svg';
const path=document.createElementNS(NS,'path');
path.setAttribute('d','M-140 470 C180 520 230 110 480 140 C720 170 760 500 1140 430');
path.setAttribute('fill','none');
svg5.appendChild(path);
const total=path.getTotalLength();
const tracks=document.createElementNS(NS,'g'); svg5.appendChild(tracks);
const prints=[];
for(let s=0,i=0;s<total;s+=9,i++){
  const a=path.getPointAtLength(s), b=path.getPointAtLength(Math.min(s+1,total));
  const dx=b.x-a.x, dy=b.y-a.y, l=Math.hypot(dx,dy)||1, side=i%2?1:-1;
  const c=document.createElementNS(NS,'circle');
  c.setAttribute('cx',a.x-dy/l*13*side); c.setAttribute('cy',a.y+dx/l*13*side);
  c.setAttribute('r',2.1); c.setAttribute('fill','var(--track)'); c.style.opacity=0;
  tracks.appendChild(c); prints.push({s,c});
}
const walker=document.createElementNS(NS,'g'); svg5.appendChild(walker);
const B5=mount(walker,'mg','sv');
function r5(p){
  const L=p*total;
  const a=path.getPointAtLength(L), b=path.getPointAtLength(Math.min(L+2,total));
  const th=Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI;
  const ph=L*.11;
  walker.setAttribute('transform',`translate(${a.x} ${a.y}) rotate(${th+90+Math.sin(ph)*2}) scale(.3)`);
  [1,2,3].forEach(n=>{
    const A=(n===2)?Math.PI:0; // trípode: L1,R2,L3 vs R1,L2,R3
    const ang=17*Math.sin(ph+A), angR=17*Math.sin(ph+A+Math.PI);
    const aL=legAttach(n,'L'), aR=legAttach(n,'R');
    B5.P['leg'+n+'L'].setAttribute('transform',`rotate(${ang} ${aL[0]} ${aL[1]})`);
    B5.P['leg'+n+'R'].setAttribute('transform',`rotate(${-angR} ${aR[0]} ${aR[1]})`);
  });
  B5.P.antL.setAttribute('transform',`rotate(${4*Math.sin(ph*.5)} -9 -133)`);
  B5.P.antR.setAttribute('transform',`rotate(${-4*Math.sin(ph*.5+1)} 9 -133)`);
  prints.forEach(o=>{o.c.style.opacity=o.s<L-22?1:0});
}

/* ---------- compañero: camina contigo mientras bajas ---------- */
const bG=document.getElementById('buddyG'); const BB=mount(bG,'mg','sv');
BB.P.wingL.style.display='none'; BB.P.wingR.style.display='none';
const trail=document.getElementById('trail'), prG=document.getElementById('prints'), trRect=document.getElementById('trailRect');
const SC=.16;                         // tamaño del compañero
const wx=y=>40+12*Math.sin(y/210);     // su camino zigzaguea en el margen
const wdx=y=>12/210*Math.cos(y/210);
let docH=0;
function buildTrail(){
  docH=document.documentElement.scrollHeight;
  trail.setAttribute('height',docH); trail.style.height=docH+'px';
  let h='';
  for(let y=0,i=0;y<docH;y+=11,i++){
    const d=wdx(y), l=Math.hypot(1,d), side=i%2?1:-1;
    h+=`<circle cx="${(wx(y)+side*7/l).toFixed(1)}" cy="${(y-side*7*d/l).toFixed(1)}" r="1.6"/>`;
  }
  prG.innerHTML=h;
}
buildTrail(); addEventListener('resize',buildTrail);
let lastY=scrollY, heading=180, target=180;
function buddy(){
  const vh=innerHeight, fy=vh*.62, docY=scrollY+fy;
  const dy=scrollY-lastY; lastY=scrollY;
  if(dy>0.5) target=180; else if(dy<-0.5) target=0;
  heading+=(target-heading)*.12;
  const slope=Math.atan(wdx(docY))*180/Math.PI;
  const tilt=heading>90?-slope:slope;
  const x=wx(docY);
  bG.setAttribute('transform',`translate(${x} ${fy}) rotate(${heading+tilt}) scale(${SC})`);
  const ph=scrollY*.09;
  [1,2,3].forEach(n=>{
    const A=(n===2)?Math.PI:0;
    const ang=20*Math.sin(ph+A), angR=20*Math.sin(ph+A+Math.PI);
    const aL=legAttach(n,'L'), aR=legAttach(n,'R');
    BB.P['leg'+n+'L'].setAttribute('transform',`rotate(${ang} ${aL[0]} ${aL[1]})`);
    BB.P['leg'+n+'R'].setAttribute('transform',`rotate(${-angR} ${aR[0]} ${aR[1]})`);
  });
  BB.P.antL.setAttribute('transform',`rotate(${5*Math.sin(ph*.5)} -9 -133)`);
  BB.P.antR.setAttribute('transform',`rotate(${-5*Math.sin(ph*.5+1)} 9 -133)`);
  trRect.setAttribute('height',Math.max(0,docY-24));
}

/* ---------- bucle ---------- */
const secs=[['s2',r2],['s3',r3],['s5',r5]].map(([id,fn])=>({el:document.getElementById(id),fn}));
const nav=document.getElementById('nav');
secs.forEach((s,i)=>{const a=document.createElement('a');a.href='#'+s.el.id;a.setAttribute('aria-label','Escena '+(i+1));nav.appendChild(a);s.dot=a});
const bar=document.getElementById('bar');
function frame(t){
  const vh=innerHeight;
  secs.forEach(s=>{
    const r=s.el.getBoundingClientRect();
    s.dot.classList.toggle('on',r.top<=vh/2&&r.bottom>vh/2);
    if(r.bottom<-vh||r.top>vh*2) return;
    s.fn(clamp(-r.top/(r.height-vh)),t);
  });
  const max=document.documentElement.scrollHeight-vh;
  bar.style.width=(max>0?scrollY/max*100:0)+'%';
  buddy();
  requestAnimationFrame(frame);
}
secs.forEach(s=>s.fn(0,0));
requestAnimationFrame(frame);
})();
