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
    entries.forEach(e => { 
      if(e.isIntersecting){ 
        e.target.classList.add('visible'); 
        io.unobserve(e.target); 
      } 
    });
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

// Formulaire
(function(){
  const form = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');

  if(form){
    form.addEventListener('submit', async e => {
      e.preventDefault();
      formMessage.style.display = 'none';
      const formData = new FormData(form);
      try {
        const response = await fetch(form.action, {
          method: form.method,
          headers: { 'Accept': 'application/json' },
          body: formData
        });
        if (response.ok) {
          showMessage('Merci pour votre message !', 'var(--primary)');
          form.reset();
        } else {
          throw new Error('Erreur');
        }
      } catch {
        showMessage('Erreur, veuillez réessayer.', 'red');
      }
    });
  }

  function showMessage(text, color) {
    formMessage.textContent = text;
    formMessage.style.color = color;
    formMessage.classList.add('visible');
    formMessage.style.display = 'block';
    setTimeout(() => {
      formMessage.classList.remove('visible');
      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 500);
    }, 5000);
  }
})();

// Pokémon qui défilent dans le footer
(function(){
  const footer = document.querySelector('footer');
  if(!footer) return;

  const pokemonList = [
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png", // Pikachu
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",  // Bulbizarre
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",  // Salamèche
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",  // Carapuce
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png", // Gengar
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/197.png", // Noctali
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/470.png", // Noctali
  ];

  function spawnWalkingPokemon(){
    const img = document.createElement('img');
    img.src = pokemonList[Math.floor(Math.random() * pokemonList.length)];
    img.className = "footer-pokemon-walk";

    // Taille aléatoire (effet de profondeur)
    const scale = 0.7 + Math.random() * 0.6;
    img.style.transform = `scale(${scale})`;

    // Position de départ aléatoire
    const startX = Math.random() * footer.offsetWidth;
    const startY = Math.random() * footer.offsetHeight;

    // Position de fin aléatoire
    const endX = Math.random() * footer.offsetWidth;
    const endY = Math.random() * footer.offsetHeight;

    img.style.left = startX + "px";
    img.style.top = startY + "px";

    // Stockage des déplacements dans des variables CSS
    img.style.setProperty("--end-x", (endX - startX) + "px");
    img.style.setProperty("--end-y", (endY - startY) + "px");

    // Vitesse aléatoire
    const duration = 8 + Math.random() * 6;
    img.style.animationDuration = duration + "s";

    // Animation via transform
    img.style.animationName = "popIn, walkRandom";
    img.style.animationDuration = "0.4s, " + duration + "s";
    img.style.animationDelay = "0s, 0.4s";

    footer.appendChild(img);

    // Disparition au clic
    img.addEventListener('click', () => img.remove());

    // Suppression à la fin du trajet
    setTimeout(() => img.remove(), duration * 1000 + 1000);
  }

  // Nouveau Pokémon toutes les 4 secondes
  setInterval(spawnWalkingPokemon, 4000);
})();
