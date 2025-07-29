
    // Reveal on scroll
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


revealElements.forEach(el => revealObserver.observe(el));

    
    // Navbar blur on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

    
 // Lottie nella home
lottie.loadAnimation({
  container: document.getElementById("lottie-home"),
  path: "data/json/Developer.json",
  renderer: "svg",
  loop: true,
  autoplay: true
}).setSpeed(1.8);

   
 function showPanel(panelId) {
  const panels = document.querySelectorAll('.panel');
  const newPanel = document.getElementById(panelId);
  const currentPanel = document.querySelector('.panel.active');

  if (newPanel === currentPanel) return;

  // Salva il pannello selezionato
  localStorage.setItem('activePanel', panelId);

  // Uscita del pannello attivo
  if (currentPanel) {
    currentPanel.classList.remove('active');
    currentPanel.classList.remove('entered');
    currentPanel.classList.add('exiting');

    setTimeout(() => {
      currentPanel.classList.remove('exiting');
    }, 500);
  }



  // Entrata del nuovo pannello
  newPanel.classList.add('entering');

  setTimeout(() => {
    newPanel.classList.remove('entering');
    newPanel.classList.add('entered', 'active');
  }, 10);
}

// Al caricamento della pagina, mostra il pannello salvato (se esiste) o home di default
window.addEventListener('DOMContentLoaded', () => {
  const savedPanel = localStorage.getItem('activePanel');
  if (savedPanel && document.getElementById(savedPanel)) {
    showPanel(savedPanel);
  } else {
    showPanel('home');
  }
});






  function resetToHome() {
  localStorage.removeItem('activePanel');
  showPanel('home');
}



    function toggleDescription(card) {
      document.querySelectorAll('.card').forEach(c => {
        if (c !== card) c.classList.remove('open');
      });
      card.classList.toggle('open');
    }

    function toggleMobileMenu() {
  const menu = document.querySelector('.menu');
  menu.classList.toggle('active');
}

document.addEventListener('mousemove', (e) => {
  const digit = document.createElement('div');
  digit.className = 'binary-digit';
  digit.textContent = Math.random() > 0.5 ? '1' : '0';

  const angle = Math.random() * 2 * Math.PI;
  const radius = Math.random() * 25 + 10; // distanza dal cursore

  const x = e.clientX + Math.cos(angle) * radius;
  const y = e.clientY + Math.sin(angle) * radius;

  digit.style.left = `${x}px`;
  digit.style.top = `${y}px`;
  digit.style.fontSize = `${Math.random() * 3 + 7}px`;
  digit.style.transform = `rotate(${Math.random() * 360}deg)`;

  document.getElementById('binary-trail').appendChild(digit);

  setTimeout(() => {
    digit.remove();
  }, 1200);
});

document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', () => {
    const targetId = link.getAttribute('data-target');
    showPanel(targetId);
    document.querySelector('.menu').classList.remove('active'); // chiude il menu
  });
});

// 1. Seleziona il form e il container del feedback
const contactForm = document.querySelector('.contact-form');
const thankYou = document.getElementById('thank-you-message');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // evita il reload della pagina

    // 2. Invia il form tramite Fetch API a Formspree
    const formData = new FormData(contactForm);
    fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        // 3. Nascondi il form e mostra il messaggio di ringraziamento
        contactForm.style.display = 'none';
        thankYou.style.display = 'block';
      } else {
        // In caso di errore, logga sul console (puoi personalizzare un messaggio)
        console.error('Invio form fallito:', response);
      }
    })
    .catch(error => console.error('Errore di rete:', error));
  });
}
