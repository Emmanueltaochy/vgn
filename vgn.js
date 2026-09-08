// Reveal — IO + rAF pass + timeout net so content never stays invisible
(function(){
  const rv=[...document.querySelectorAll('.rv')];
  const show=el=>el.classList.add('in');
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){show(e.target);io.unobserve(e.target)}}),{threshold:.12});
  rv.forEach(el=>io.observe(el));
  requestAnimationFrame(()=>{const vh=innerHeight;rv.forEach(el=>{const r=el.getBoundingClientRect();if(r.top<vh&&r.bottom>0)show(el)})});
  setTimeout(()=>rv.forEach(show),700);
})();

// Nav — transparent en haut de page, fond noir dès le scroll.
// Double détection (scroll + sentinelle IO) : certains contextes d'aperçu n'émettent pas d'événement scroll.
(function(){
  const nav=document.getElementById('nav');
  if(!nav)return;
  const set=v=>nav.classList.toggle('stuck',v);
  if(nav.dataset.solid==='1'){set(true);return}
  addEventListener('scroll',()=>set(scrollY>60),{passive:true});
  const s=document.getElementById('navSentinel');
  if(s)new IntersectionObserver(es=>es.forEach(e=>set(!e.isIntersecting)),{threshold:0}).observe(s);
})();

// YouTube lightbox
(function(){
  const mod=document.getElementById('mod'),f=document.getElementById('modF');
  if(!mod||!f)return;
  const open=(id,start,si)=>{
    if(!id)return;
    let s='https://www.youtube.com/embed/'+id+'?autoplay=1&rel=0&modestbranding=1&playsinline=1';
    if(si)s+='&si='+si; if(start)s+='&start='+start;
    f.src=s; mod.hidden=false; document.documentElement.style.overflow='hidden';
  };
  const close=()=>{f.src='';mod.hidden=true;document.documentElement.style.overflow=''};
  document.querySelectorAll('[data-yt]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();open(el.dataset.yt,el.dataset.ytStart,el.dataset.ytSi)}));
  const x=document.getElementById('modX'); if(x)x.addEventListener('click',close);
  mod.addEventListener('click',e=>{if(e.target===mod)close()});
  addEventListener('keydown',e=>{if(e.key==='Escape'&&!mod.hidden)close()});
})();

// Hero background player — reprend la boucle au timecode d'entrée
(function(){
  const el=document.getElementById('heroPlayer');
  if(!el)return;
  const start=parseInt(el.dataset.start||'0',10);
  const s=document.createElement('script'); s.src='https://www.youtube.com/iframe_api'; document.head.appendChild(s);
  window.onYouTubeIframeAPIReady=function(){
    new YT.Player('heroPlayer',{events:{onStateChange:e=>{
      if(e.data===YT.PlayerState.ENDED){e.target.seekTo(start,true);e.target.playVideo()}
    }}});
  };
})();
