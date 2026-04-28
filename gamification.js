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
    this.hasShownCompletionMessage = false; // Controle de mensagem de conclusão

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

      // Para o footer, usar uma lógica mais flexível
      const isFooter = section.id === "contato";
      const isInFooterView =
        isFooter &&
        window.scrollY + window.innerHeight >= document.body.offsetHeight - 100;

      if (
        (scrollPosition >= elementTop && scrollPosition <= elementBottom) ||
        isInFooterView
      ) {
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
    let totalPoints = 0;
    let earnedPoints = 0;

    this.sections.forEach((section) => {
      const sectionData = this.progressData[section.id];

      if (section.hasProjects) {
        // Seção com projetos: cada projeto visitado vale 1 ponto
        totalPoints += this.totalProjects;
        earnedPoints += sectionData.projectsViewed.length;
      } else {
        // Outras seções: vale 1 ponto se completada
        totalPoints += 1;
        if (sectionData.completed) {
          earnedPoints += 1;
        }
      }
    });

    return Math.round((earnedPoints / totalPoints) * 100);
  }

  updateUI() {
    const percentage = this.calculateOverallProgress();
    const donutProgress = document.querySelector(".donut-progress");
    const percentageText = document.querySelector(".percentage");
    const sectionsList = document.querySelector(".sections-list");

    // Verificar se atingiu 100% pela primeira vez
    if (percentage === 100 && !this.hasShownCompletionMessage) {
      this.showCompletionMessage();
      this.hasShownCompletionMessage = true;
    }

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

    // Criar container principal para nome e progresso
    const headerDiv = document.createElement("div");
    headerDiv.className = "section-header";
    headerDiv.style.display = "flex";
    headerDiv.style.justifyContent = "space-between";
    headerDiv.style.alignItems = "center";

    const nameDiv = document.createElement("div");
    nameDiv.className = "section-name";
    nameDiv.textContent = section.name;

    const progress = document.createElement("span");
    progress.className = "section-progress";

    if (sectionData.completed) {
      progress.textContent = "100%";
    } else if (sectionData.viewed) {
      if (section.hasProjects) {
        const projectProgress = Math.round(
          (sectionData.projectsViewed.length / this.totalProjects) * 100,
        );
        progress.textContent = `${projectProgress}%`;
      } else {
        progress.textContent = "100%";
      }
    } else if (this.currentSection === section.id && this.sectionTimer) {
      progress.textContent = "...";
    } else {
      progress.textContent = "0%";
    }

    headerDiv.appendChild(nameDiv);
    headerDiv.appendChild(progress);
    item.appendChild(headerDiv);

    // Se for a seção de projetos, adicionar lista de projetos individuais como árvore
    if (section.hasProjects) {
      const projectsList = this.createProjectsList(sectionData);
      item.appendChild(projectsList);
    }

    return item;
  }

  createProjectsList(sectionData) {
    const projectsContainer = document.createElement("div");
    projectsContainer.className = "projects-list";

    const projectNames = [
      "Notas do Instrumento",
      "Pizzaria Delivery",
      "Instituto Henfil",
      "Clínica Odontoestética",
      "Controle Financeiro",
      "Hospital",
      "Lembrete",
    ];

    projectNames.forEach((projectName, index) => {
      const projectItem = document.createElement("div");
      projectItem.className = "project-item";

      const projectInfo = document.createElement("div");
      projectInfo.className = "project-info";

      const projectIcon = document.createElement("div");
      projectIcon.className = "project-icon";

      const projectText = document.createElement("span");
      projectText.className = "project-name";
      projectText.textContent = projectName;

      if (sectionData.projectsViewed.includes(index)) {
        projectIcon.classList.add("explored");
      } else {
        projectIcon.classList.add("unexplored");
      }

      projectInfo.appendChild(projectText);
      projectInfo.appendChild(projectIcon);
      projectItem.appendChild(projectInfo);

      projectsContainer.appendChild(projectItem);
    });

    return projectsContainer;
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

  showProjectVisitedNotification(projectIndex) {
    const projectNames = [
      "Notas do Instrumento",
      "Pizzaria Delivery",
      "Instituto Henfil",
      "Clínica Odontoestética",
      "Controle Financeiro",
      "Hospital",
      "Lembrete",
    ];

    const projectName =
      projectNames[projectIndex] || `Projeto ${projectIndex + 1}`;
    const projectsViewed = this.progressData["proje"].projectsViewed.length;

    this.showNotification(
      `🚀 Projeto visitado: ${projectName} (${projectsViewed}/${this.totalProjects})`,
    );
  }

  showCompletionMessage() {
    const completionNotification = document.createElement("div");
    completionNotification.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, rgb(1, 221, 118), rgb(0, 33, 105));
      color: white;
      padding: 30px 40px;
      border-radius: 20px;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      z-index: 10000;
      box-shadow: 0 10px 40px rgba(0, 33, 105, 0.3);
      animation: completionPulse 0.6s ease;
    `;
    completionNotification.innerHTML = `
      <div style="margin-bottom: 15px; font-size: 24px;">🎉</div>
      <div>Parabéns!</div>
      <div style="margin-top: 10px; font-size: 16px; font-weight: normal;">Obrigado por explorar meu portfólio!</div>
    `;

    // Adicionar animação
    const style = document.createElement("style");
    style.textContent = `
      @keyframes completionPulse {
        0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
        50% { transform: translate(-50%, -50%) scale(1.05); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(completionNotification);

    // Remover após 10 segundos
    setTimeout(() => {
      completionNotification.style.animation =
        "completionPulse 0.6s ease reverse";
      setTimeout(() => {
        completionNotification.remove();
        style.remove();
      }, 600);
    }, 10000);
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
