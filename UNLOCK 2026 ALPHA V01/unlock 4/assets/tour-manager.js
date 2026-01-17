/**
 * Global Tour Manager - Coordena tour entre múltiplas páginas
 * Landing → Index → Games
 */

class TourManager {
  constructor() {
    this.currentPage = this.detectPage();
    this.tourState = this.loadTourState();
    this.isActive = false;
  }

  detectPage() {
    const path = window.location.pathname;
    const url = window.location.href;

    if (url.includes('landing.html') || path.endsWith('/')) return 'landing';
    if (url.includes('index.html')) return 'index';
    if (url.includes('word-drop')) return 'word-drop';
    if (url.includes('word-match')) return 'word-match';
    if (url.includes('word-stack')) return 'word-stack';
    return 'unknown';
  }

  loadTourState() {
    try {
      const saved = localStorage.getItem('unlock_tour_state');
      return saved ? JSON.parse(saved) : {
        active: false,
        currentPage: 'landing',
        currentStep: 0
      };
    } catch (e) {
      return { active: false, currentPage: 'landing', currentStep: 0 };
    }
  }

  saveTourState() {
    localStorage.setItem('unlock_tour_state', JSON.stringify(this.tourState));
  }

  startTour() {
    this.tourState.active = true;
    this.tourState.currentPage = this.currentPage;
    this.tourState.currentStep = 0;
    this.saveTourState();
    this.isActive = true;
    console.log('🎬 Tour iniciado em:', this.currentPage);
    this.showCurrentPageTour();
  }

  continueTour() {
    this.isActive = true;
    console.log('🎬 Tour continuado em:', this.currentPage);
    this.showCurrentPageTour();
  }

  endTour() {
    this.tourState.active = false;
    this.isActive = false;
    this.saveTourState();
    this.closeSpotlight();
    console.log('🎬 Tour encerrado');
  }

  showCurrentPageTour() {
    // Aguarda um momento para garantir que o DOM está pronto
    setTimeout(() => {
      const tourModule = window[`${this.currentPage}Tour`];
      if (tourModule && tourModule.show) {
        console.log('🎬 Mostrando tour do módulo:', this.currentPage);
        tourModule.show(this.tourState.currentStep);
      } else {
        console.warn('⚠️ Módulo de tour não encontrado:', `${this.currentPage}Tour`);
      }
    }, 100);
  }

  nextStep() {
    this.tourState.currentStep++;
    this.saveTourState();
    this.showCurrentPageTour();
  }

  previousStep() {
    this.tourState.currentStep = Math.max(0, this.tourState.currentStep - 1);
    this.saveTourState();
    this.showCurrentPageTour();
  }

  goToPage(pageName, step = 0) {
    const pages = {
      'landing': './landing.html',
      'index': './index.html',
      'word-drop': './games/word-drop.html',
      'word-match': './games/word-match.html',
      'word-stack': './games/word-stack.html'
    };

    this.tourState.currentPage = pageName;
    this.tourState.currentStep = step;
    this.tourState.active = true;
    this.saveTourState();

    console.log('🎬 Navegando para:', pageName);
    window.location.href = pages[pageName];
  }

  closeSpotlight() {
    const ids = ['tourSpotlightOverlay', 'tourHighlight', 'tourPointer', 'gameTourOverlay', 'gameTourModal'];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
  }
}

// Instância global
const tourManager = new TourManager();

// Auto-continuar tour se estava ativo
window.addEventListener('DOMContentLoaded', () => {
  if (tourManager.tourState.active && tourManager.tourState.currentPage === tourManager.currentPage) {
    console.log('🎬 Auto-continuando tour...');
    tourManager.continueTour();
  }
});
