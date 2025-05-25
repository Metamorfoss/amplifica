// Menu Mobile
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const menuIcon = document.querySelector('.menu-icon');
  menu.classList.toggle('active');
  document.body.classList.toggle('no-scroll');
  
  // Anima o ícone do menu
  if (menu.classList.contains('active')) {
    menuIcon.innerHTML = '✕';
    menuIcon.style.fontSize = '22px';
  } else {
    menuIcon.innerHTML = '☰';
    menuIcon.style.fontSize = '20px';
  }
}

// Fecha o menu ao clicar em um link
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    toggleMenu();
  });
});

// Acessibilidade
let currentFontSize = 14; // Tamanho inicial

function togglePanel() {
  const panel = document.getElementById("accessibility-options");
  panel.classList.toggle("hidden");
}

function toggleHighContrast() {
  document.body.classList.toggle("high-contrast");
  
  // Atualiza cores do header no modo alto contraste
  const header = document.querySelector('header');
  if (document.body.classList.contains("high-contrast")) {
    header.style.backgroundColor = '#000';
    header.style.borderBottom = '1px solid #fff';
  } else {
    header.style.backgroundColor = 'rgba(255, 255, 255, 0.86)';
    header.style.borderBottom = '1px solid rgba(0, 0, 0, 0.05)';
  }
}

function toggleDyslexicFont() {
  document.body.classList.toggle("dyslexic-font");
}

function toggleColorBlindMode(type) {
  // Remove todas as classes de daltonismo primeiro
  document.body.classList.remove("protanopia-mode", "deuteranopia-mode", "tritanopia-mode", "achromatopsia-mode");
  
  // Adiciona apenas a classe selecionada
  if (document.querySelector(`input[onchange="toggleColorBlindMode('${type}')"]`).checked) {
    document.body.classList.add(`${type}-mode`);
    localStorage.setItem('colorBlindMode', type);
  } else {
    localStorage.removeItem('colorBlindMode');
  }
  
  // Atualiza os outros checkboxes para desmarcados
  document.querySelectorAll('input[type="checkbox"][onchange^="toggleColorBlindMode"]').forEach(checkbox => {
    if (checkbox.getAttribute('onchange') !== `toggleColorBlindMode('${type}')`) {
      checkbox.checked = false;
    }
  });
}

function adjustFontSize(operation) {
  // Define os limites mínimo e máximo
  const minSize = 12;
  const maxSize = 28;
  const step = 2;
  
  // Ajusta o tamanho conforme a operação
  if (operation === 'increase' && currentFontSize < maxSize) {
    currentFontSize += step;
  } else if (operation === 'decrease' && currentFontSize > minSize) {
    currentFontSize -= step;
  } else if (typeof operation === 'number') {
    // Se for um número direto (do range)
    currentFontSize = operation;
  }
  
  // Garante que está dentro dos limites
  currentFontSize = Math.max(minSize, Math.min(maxSize, currentFontSize));
  
  // Aplica o novo tamanho
  document.documentElement.style.fontSize = currentFontSize + 'px';
  document.getElementById('font-size-value').textContent = currentFontSize + 'px';
  
  // Atualiza o range slider se existir
  const rangeInput = document.querySelector('input[type="range"]');
  if (rangeInput) {
    rangeInput.value = currentFontSize;
  }
}

// Efeito de scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
      
      // Atualiza URL sem recarregar a página
      history.pushState(null, null, targetId);
    }
    
    // Fecha menu mobile se aberto
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu.classList.contains('active')) {
      toggleMenu();
    }
  });
});

// Animação ao scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  const scrollPosition = window.scrollY;
  
  // Efeito de redução no header
  if (scrollPosition > 50) {
    header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
    header.style.padding = '8px 30px';
    document.querySelector('.logo img').style.width = '100px';
  } else {
    header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
    header.style.padding = '12px 30px';
    document.querySelector('.logo img').style.width = '120px';
  }
  
  // Animação de aparecimento dos elementos
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight * 0.75) {
      section.classList.add('show');
    }
  });
});

// Leitor de texto
function lerTexto() {
  // Pausa qualquer leitura em andamento
  window.speechSynthesis.cancel();
  
  // Obtém todo o texto da página (exceto menus e footer)
  const mainContent = document.querySelector('main') || document.body;
  const texto = mainContent.innerText;
  
  // Cria e configura a fala
  const voz = new SpeechSynthesisUtterance();
  voz.text = texto;
  voz.lang = 'pt-BR';
  voz.rate = 1;
  voz.pitch = 1;
  voz.volume = 1;
  
  // Inicia a leitura
  window.speechSynthesis.speak(voz);
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  // Mostra todas as seções imediatamente sem animação
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('show');
  });
  
  // Configura o observer apenas para novas entradas durante o scroll
  const observerOptions = {
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, observerOptions);
  
  // Observa apenas seções que ainda não estão visíveis
  document.querySelectorAll('section:not(.show)').forEach(section => {
    observer.observe(section);
  });
});

//negocio das perguntas
// Substitua o código existente do FAQ por este:
const toggleBtn = document.getElementById('toggleFaq');
const faqContainer = document.getElementById('faqContainer');

let isVisible = false;

toggleBtn.addEventListener('click', () => {
  if (!isVisible) {
    faqContainer.classList.add('show');
    toggleBtn.textContent = 'Fechar Perguntas Frequentes';
    setTimeout(() => {
      faqContainer.style.opacity = '1';
    }, 10);
  } else {
    faqContainer.style.opacity = '0';
    toggleBtn.textContent = 'Ver Perguntas Frequentes';
    setTimeout(() => {
      faqContainer.classList.remove('show');
    }, 400);
  }
  isVisible = !isVisible;
});

// Animação dos acordeões
const accordions = document.querySelectorAll('.accordion');
accordions.forEach(acc => {
  const question = acc.querySelector('.question');
  
  question.addEventListener('click', () => {
   
    if (!acc.classList.contains('open')) {
      accordions.forEach(otherAcc => {
        if (otherAcc !== acc && otherAcc.classList.contains('open')) {
          otherAcc.classList.remove('open');
        }
      });
    }
    
    
    acc.classList.toggle('open');
    
    
    if (acc.classList.contains('open')) {
      setTimeout(() => {
        acc.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 300);
    }
  });
});


document.querySelectorAll('a[href^="http"]').forEach(link => {
  link.addEventListener('click', () => {
    if (isVisible) {
      faqContainer.style.opacity = '0';
      toggleBtn.textContent = 'Ver Perguntas Frequentes';
      setTimeout(() => {
        faqContainer.classList.remove('show');
      }, 400);
      isVisible = false;
    }
  });
});