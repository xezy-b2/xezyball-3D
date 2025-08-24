// Theme toggle + persist
(function(){
  const root = document.documentElement;
  const stored = localStorage.getItem('theme') || 'dark';
  root.setAttribute('data-theme', stored);
  const toggle = document.getElementById('theme-toggle');
  if(toggle){
    toggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }
})();

// Mobile nav
(function(){
  const btn = document.querySelector('.nav-toggle');
  const menu = document.getElementById('navMenu');
  if(btn && menu){
    btn.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
  }
})();

// Reveal on scroll (IntersectionObserver)
(function(){
  const items = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, {threshold: 0.08});
  items.forEach(el => io.observe(el));
})();

// Smooth anchor scroll
(function(){
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e)=>{
      const id = a.getAttribute('href');
      const target = document.querySelector(id);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth'});
      }
    });
  });
})();
