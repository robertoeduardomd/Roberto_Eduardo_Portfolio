class PortfolioGamification {
  constructor() {
    this.sections = [
      { id: "inicio", name: "Início", element: "#inicio" },
      { id: "proje", name: "Projetos", element: "#proje", hasProjects: true },
      { id: "expe", name: "Experiências", element: "#expe" },
      {
        id: "habilidadesmb",
        name: "Habilidades Mobile",
        element: "#habilidadesmb",
      },
      { id: "certificacoes", name: "Certificações", element: "#certificacoes" },
      {
        id: "habilidades",
        name: "Habilidades Desktop",
        element: "#habilidades",
      },
      { id: "form", name: "Formação", element: "#form" },
      { id: "contato", name: "Contato", element: "#contato" },
    ];

    this.progressData = this.loadProgress();
    this.currentSection = null;
    this.sectionTimer = null;
    this.requiredViewTime = 3000; // 3 segundos
    this.totalProjects = 7; // Total de projetos na seção

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.updateUI();
    this.startSectionTracking();
  }

  loadProgress() {
    const saved = localStorage.getItem("portfolioProgress");
    if (saved) {
      return JSON.parse(saved);
    }

    // Estrutura inicial de progresso
    const initialProgress = {};
    this.sections.forEach((section) => {
      initialProgress[section.id] = {
        viewed: false,
        viewTime: 0,
        projectsViewed: section.hasProjects ? [] : null,
        completed: false,
      };
    });

    return initialProgress;
  }

  saveProgress() {
    localStorage.setItem(
      "portfolioProgress",
      JSON.stringify(this.progressData),
    );
  }

  setupEventListeners() {
    // Scroll tracking
    window.addEventListener("scroll", () => this.handleScroll());

    // Tracking de cliques nos projetos
    document
      .querySelectorAll(".projeto-card .btn-projeto")
      .forEach((btn, index) => {
        btn.addEventListener("click", () => this.trackProjectClick(index));
      });

    // Tracking de navegação
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        const targetId = link.getAttribute("href").substring(1);
        if (targetId) {
          setTimeout(() => this.checkSection(targetId), 100);
        }
      });
    });

    // Reset progress (opcional, para debug)
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "R") {
        this.resetProgress();
      }
    });
  }

  startSectionTracking() {
    this.handleScroll();
  }

  handleScroll() {
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    for (const section of this.sections) {
      const element = document.querySelector(section.element);
      if (!element) continue;

      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      const elementBottom = elementTop + rect.height;

      if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
        if (this.currentSection !== section.id) {
          this.enterSection(section.id);
        }
        return;
      }
    }
  }

  enterSection(sectionId) {
    // Limpar timer da seção anterior
    if (this.sectionTimer) {
      clearTimeout(this.sectionTimer);
      this.sectionTimer = null;
    }

    this.currentSection = sectionId;
    const sectionData = this.progressData[sectionId];

    if (!sectionData.viewed) {
      // Iniciar timer para contagem de 3 segundos
      this.sectionTimer = setTimeout(() => {
        this.completeSectionView(sectionId);
      }, this.requiredViewTime);

      // Mostrar feedback visual de progresso
      this.showSectionProgress(sectionId, true);
    }
  }

  completeSectionView(sectionId) {
    const sectionData = this.progressData[sectionId];
    sectionData.viewed = true;
    sectionData.viewTime = this.requiredViewTime;

    // Verificar se a seção está completa
    if (!this.sections.find((s) => s.id === sectionId)?.hasProjects) {
      sectionData.completed = true;
    } else {
      // Para seções com projetos, verificar se todos foram vistos
      this.checkSectionCompletion(sectionId);
    }

    this.saveProgress();
    this.updateUI();
    this.showSectionProgress(sectionId, false);

    // Efeito visual de conclusão
    this.showCompletionEffect(sectionId);
  }

  trackProjectClick(projectIndex) {
    const projectsSection = this.progressData["proje"];
    if (!projectsSection.projectsViewed.includes(projectIndex)) {
      projectsSection.projectsViewed.push(projectIndex);

      // Notificação de projeto visitado
      this.showProjectVisitedNotification(projectIndex);

      // Atualizar progresso imediatamente
      this.checkSectionCompletion("proje");
      this.saveProgress();
      this.updateUI();
    }
  }

  checkSectionCompletion(sectionId) {
    const sectionData = this.progressData[sectionId];
    const section = this.sections.find((s) => s.id === sectionId);

    if (section?.hasProjects) {
      // Seção com projetos: verificar se todos foram clicados
      if (sectionData.projectsViewed.length >= this.totalProjects) {
        sectionData.completed = true;
      }
    } else {
      // Seção sem projetos: apenas precisa ser visualizada
      if (sectionData.viewed) {
        sectionData.completed = true;
      }
    }
  }

  calculateOverallProgress() {
    const totalSections = this.sections.length;
    const completedSections = this.sections.filter(
      (section) => this.progressData[section.id].completed,
    ).length;

    return Math.round((completedSections / totalSections) * 100);
  }

  updateUI() {
    const percentage = this.calculateOverallProgress();
    const donutProgress = document.querySelector(".donut-progress");
    const percentageText = document.querySelector(".percentage");
    const sectionsList = document.querySelector(".sections-list");

    // Atualizar gráfico de rosca
    if (donutProgress) {
      const circumference = 2 * Math.PI * 35; // Raio de 35
      const offset = circumference - (percentage / 100) * circumference;
      donutProgress.style.strokeDashoffset = offset;

      // Mudar cor baseada no progresso
      if (percentage === 100) {
        donutProgress.style.stroke = "rgb(1, 221, 118)";
      } else if (percentage >= 75) {
        donutProgress.style.stroke = "rgb(0, 180, 100)";
      } else if (percentage >= 50) {
        donutProgress.style.stroke = "rgb(0, 150, 80)";
      } else {
        donutProgress.style.stroke = "rgb(1, 221, 118)";
      }
    }

    // Atualizar texto da porcentagem
    if (percentageText) {
      percentageText.textContent = `${percentage}%`;
    }

    // Atualizar lista de seções no tooltip
    if (sectionsList) {
      sectionsList.innerHTML = "";
      this.sections.forEach((section) => {
        const sectionData = this.progressData[section.id];
        const item = this.createSectionItem(section, sectionData);
        sectionsList.appendChild(item);
      });
    }
  }

  createSectionItem(section, sectionData) {
    const item = document.createElement("div");
    item.className = "section-item";

    const nameDiv = document.createElement("div");
    nameDiv.className = "section-name";
    nameDiv.textContent = section.name;

    const statusDiv = document.createElement("div");
    statusDiv.className = "section-status";

    const icon = document.createElement("div");
    icon.className = "status-icon";

    const progress = document.createElement("span");
    progress.className = "section-progress";

    if (sectionData.completed) {
      icon.classList.add("completed");
      progress.textContent = "100%";
    } else if (sectionData.viewed) {
      if (section.hasProjects) {
        const projectProgress = Math.round(
          (sectionData.projectsViewed.length / this.totalProjects) * 100,
        );
        icon.classList.add("in-progress");
        progress.textContent = `${projectProgress}%`;
      } else {
        icon.classList.add("completed");
        progress.textContent = "100%";
      }
    } else if (this.currentSection === section.id && this.sectionTimer) {
      icon.classList.add("in-progress");
      progress.textContent = "...";
    } else {
      icon.classList.add("locked");
      progress.textContent = "0%";
    }

    statusDiv.appendChild(icon);
    statusDiv.appendChild(progress);

    item.appendChild(nameDiv);
    item.appendChild(statusDiv);

    return item;
  }

  showSectionProgress(sectionId, inProgress) {
    // Feedback visual sutil quando usuário está em uma seção
    const donut = document.querySelector(".donut-container");
    if (donut) {
      if (inProgress) {
        donut.style.boxShadow = "0 4px 25px rgba(1, 221, 118, 0.4)";
      } else {
        donut.style.boxShadow = "0 4px 20px rgba(0, 33, 105, 0.2)";
      }
    }
  }

  showCompletionEffect(sectionId) {
    // Efeito visual quando uma seção é completada
    const donut = document.querySelector(".donut-container");
    if (donut) {
      donut.style.animation = "pulse 0.6s ease";
      setTimeout(() => {
        donut.style.animation = "";
      }, 600);
    }

    // Mostrar notificação sutil (opcional)
    this.showNotification(
      `Seção "${this.sections.find((s) => s.id === sectionId)?.name}" explorada!`,
    );
  }

  showNotification(message) {
    // Criar notificação temporária
    const notification = document.createElement("div");
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: rgba(1, 221, 118, 0.95);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      z-index: 10000;
      animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 2.7s;
      box-shadow: 0 4px 20px rgba(1, 221, 118, 0.3);
    `;
    notification.textContent = message;

    // Adicionar animações
    const style = document.createElement("style");
    style.textContent = `
      @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
      style.remove();
    }, 3000);
  }

  resetProgress() {
    if (confirm("Tem certeza que deseja resetar seu progresso?")) {
      localStorage.removeItem("portfolioProgress");
      this.progressData = this.loadProgress();
      this.updateUI();
      this.showNotification("Progresso resetado!");
    }
  }

  // Métodos públicos para debug
  getProgressData() {
    return this.progressData;
  }

  getStatistics() {
    const stats = {
      totalSections: this.sections.length,
      completedSections: this.sections.filter(
        (s) => this.progressData[s.id].completed,
      ).length,
      viewedSections: this.sections.filter(
        (s) => this.progressData[s.id].viewed,
      ).length,
      projectsViewed: this.progressData["proje"]?.projectsViewed?.length || 0,
      overallProgress: this.calculateOverallProgress(),
    };

    return stats;
  }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  window.portfolioGamification = new PortfolioGamification();

  // Expor estatísticas no console para debug
  console.log("🎮 Gamificação do Portfolio inicializada!");
  console.log(
    "Use window.portfolioGamification.getStatistics() para ver estatísticas",
  );
  console.log("Use Ctrl+Shift+R para resetar o progresso");
});
