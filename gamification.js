class PortfolioGamification {
  constructor() {
    this.sections = [
      { id: "inicio", name: "Início", element: "#inicio" },
      { id: "proje", name: "Projetos", element: "#proje", hasProjects: true },
      { id: "expe", name: "Experiências", element: "#expe" },
      { id: "habilidadesmb", name: "Habilidades Mobile", element: "#habilidadesmb" },
      { id: "certificacoes", name: "Certificações", element: "#certificacoes" },
      { id: "habilidades", name: "Habilidades Desktop", element: "#habilidades" },
      { id: "form", name: "Formação", element: "#form" },
      { id: "contato", name: "Contato", element: "#contato" }
    ];

    this.projectNames = [
      "Notas do Instrumento", "Pizzaria Delivery", "Instituto Henfil",
      "Clínica Odontoestética", "Controle Financeiro", "Hospital", "Lembrete"
    ];

    this.totalProjects = this.projectNames.length;
    this.requiredViewTime = 3000;
    this.progressData = this.loadProgress();
    this.currentSection = null;
    this.sectionTimer = null;
    this.init();
  }

  loadProgress() {
    const saved = localStorage.getItem("portfolioProgress");
    if (saved) return JSON.parse(saved);

    const initial = {};
    this.sections.forEach(s => {
      initial[s.id] = { viewed: false, projectsViewed: s.hasProjects ? [] : null, completed: false };
    });
    return initial;
  }

  saveProgress() {
    localStorage.setItem("portfolioProgress", JSON.stringify(this.progressData));
  }

  init() {
    window.addEventListener("scroll", () => this.handleScroll(), { passive: true });
    
    document.querySelectorAll(".projeto-card .btn-projeto").forEach((btn, index) => {
      btn.addEventListener("click", () => this.trackProjectClick(index));
    });

    this.updateUI();
    this.handleScroll();
  }

  handleScroll() {
    const triggerPoint = window.innerHeight * 0.6;
    
    for (const section of this.sections) {
      const el = document.querySelector(section.element);
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      if (rect.top < triggerPoint && rect.bottom > 0) {
        if (this.currentSection !== section.id) {
          this.enterSection(section.id);
        }
        break;
      }
    }
  }

 enterSection(id) {
    if (this.sectionTimer) clearTimeout(this.sectionTimer);
    this.currentSection = id;
    const data = this.progressData[id];

    // Busca o objeto da seção inteira para pegar o nome amigável (.name)
    const sectionInfo = this.sections.find(s => s.id === id);

    if (data && !data.viewed && sectionInfo) {
      this.sectionTimer = setTimeout(() => {
        data.viewed = true;
        if (!sectionInfo.hasProjects) data.completed = true;
        this.saveProgress();
        this.updateUI();
        
        // CORREÇÃO: Agora usa sectionInfo.name (ex: "Experiências") 
        this.showNotification(`Seção ${sectionInfo.name} explorada!`);
      }, this.requiredViewTime);
    }
  }

  trackProjectClick(index) {
    const data = this.progressData["proje"];
    if (data && !data.projectsViewed.includes(index)) {
      data.projectsViewed.push(index);
      if (data.projectsViewed.length >= this.totalProjects) data.completed = true;
      this.saveProgress();
      this.updateUI();
      this.showNotification(`🚀 Projeto: ${this.projectNames[index]} visitado!`);
    }
  }

calculateProgress() {
    let total = 0, earned = 0;
    
    // IDs que devem ser tratados como uma única entrada
    const skillIds = ["habilidades", "habilidadesmb"];
    let skillsHandled = false;

    this.sections.forEach(s => {
      // Lógica Especial para Habilidades (Trata as duas como uma só)
      if (skillIds.includes(s.id)) {
        if (!skillsHandled) {
          total += 1; // Só adiciona 1 ao total geral, independente de existirem duas seções
          const isEitherCompleted = skillIds.some(id => this.progressData[id].completed);
          if (isEitherCompleted) earned += 1;
          skillsHandled = true;
        }
        return; // Pula para a próxima iteração para não contar a segunda seção de habilidade
      }

      // Lógica padrão para as demais seções
      const data = this.progressData[s.id];
      if (s.hasProjects) {
        total += this.totalProjects;
        earned += data.projectsViewed.length;
      } else {
        total += 1;
        if (data.completed) earned += 1;
      }
    });
    return Math.round((earned / total) * 100);
  }

 updateUI() {
    const percent = this.calculateProgress();
    const donut = document.querySelector(".donut-progress");
    const text = document.querySelector(".percentage");

    if (donut) {
      const circumference = 2 * Math.PI * 35;
      donut.style.strokeDashoffset = circumference - (percent / 100) * circumference;
    }
    
    if (text) text.textContent = `${percent}%`;

    // Lógica para a notificação de 100%
    if (percent === 100 && !localStorage.getItem("portfolioAgradecimentoEnviado")) {
      // Pequeno delay para a notificação não atropelar a última seção explorada
      setTimeout(() => {
        this.showNotification("🎉 Parabéns! Você explorou meu portfólio por completo!");
        // Salva que já agradeceu para não repetir sempre que carregar a página
        localStorage.setItem("portfolioAgradecimentoEnviado", "true");
      }, 10000);
    }

    this.renderTooltip();
  }

renderTooltip() {
    const list = document.querySelector(".sections-list");
    if (!list) return;

    // Filtramos para não mostrar "Habilidades Mobile" e "Desktop" separadamente
    // Vamos manter apenas o ID "habilidades" como representante visual
    const visibleSections = this.sections.filter(s => s.id !== "habilidadesmb");

    list.innerHTML = visibleSections.map(s => {
      let data = this.progressData[s.id];
      let displayName = s.name;
      
      // Se for a seção de Habilidades, consolidamos o status
      if (s.id === "habilidades") {
        const mbData = this.progressData["habilidadesmb"];
        const isCompleted = data.completed || mbData.completed;
        const isViewed = data.viewed || mbData.viewed;
        
        // Criamos um estado visual único baseado no "OU"
        data = { ...data, completed: isCompleted, viewed: isViewed };
        displayName = "Habilidades"; // Nome unificado
      }

      const status = data.completed ? "✅" : (data.viewed ? "⏳" : "⏳");
      
      let html = `
        <div class="section-item">
          <div class="section-header">
            <span>${displayName}</span>
            <span>${status}</span>
          </div>`;
      
      if (s.hasProjects) {
        html += `<div class="projects-list">` + 
          this.projectNames.map((name, i) => `
            <div class="project-item">
            <span>${name}</span>
              <div class="project-icon ${data.projectsViewed.includes(i) ? 'explored' : ''}"></div>
            </div>
          `).join("") + `</div>`;
      }
      
      html += `</div>`;
      return html;
    }).join("");
  }

  showNotification(msg) {
    const note = document.createElement("div");
    note.style.cssText = `position:fixed; top:100px; right:120px; background:#002169 ; color:#fff; padding:12px 20px; border-radius:8px; font-weight:bold; z-index:10001; box-shadow:0 5px 15px rgba(0,0,0,0.2); animation: slideIn 0.3s ease;`;
    note.textContent = msg;
    document.body.appendChild(note);
    setTimeout(() => note.remove(), 3000);
  }
}

document.addEventListener("DOMContentLoaded", () => new PortfolioGamification());