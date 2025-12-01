<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <!-- Logos flotantes de fondo -->


      <div class="hero-content container">
        <div class="hero-layout">
          <!-- Logo de Sufi a la izquierda -->

          <!-- Contenido textual a la derecha -->
          <div class="hero-text-content">
            <h1 class="hero-title">Encuentra tu API perfecta con ApinderSufi</h1>
            <p class="hero-subtitle" style="color: var(--sufi-primary); font-weight: bold;">
              Su contexto funcional esta relacionado con el negocio de Sufi, con el fin de exponer las capacidades de sus diferentes productos; Movilidad, Consumo, Educación y Seguros.
            </p>
            <p class="hero-description">
              Desde la estrategia productor consumidor de Sufi, se implementan las capacidades que suplen las necesidades estratégicas del negocio, permitiendo a sus consumidores originar y gestionar el producto crediticio. Adicional ofrecer funcionalidades de autogestión y consulta para los aliados.
            </p>
            <button @click="navigateToApis" class="cta-button">
              <span>Comenzar Ahora</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="hero-decoration"></div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-number">30</div>
            <div class="stat-label">APIs Disponibles</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">6</div>
            <div class="stat-label">Categorías</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Decorative Divider -->
    <div class="decorative-divider">
      <div class="divider-line"></div>
      <div class="divider-icon-container">
        <img src="@/assets/icons/sufi.png" alt="Sufi" class="divider-icon">
      </div>
      <div class="divider-line"></div>
    </div>

    <!-- Categories Section -->
    <section class="categories-section">
      <div class="container">
        <h2 class="section-title">Explora Nuestras Categorías</h2>
        <p class="section-subtitle">Descubre las diferentes categorías de APIs que tenemos disponibles para ti</p>
        <div class="categories-grid">
          <div class="category-card consulta" @click="navigateToCategory('Consulta')">
            <div class="category-icon">🔍</div>
            <h3 class="category-title">Consulta</h3>
            <p class="category-description">APIs para consultar información de clientes, créditos y transacciones</p>
          </div>
          <div class="category-card gestion" @click="navigateToCategory('Gestion')">
            <div class="category-icon">⚙️</div>
            <h3 class="category-title">Gestión</h3>
            <p class="category-description">APIs para gestionar datos, estudios y procesos crediticios</p>
          </div>
          <div class="category-card simulacion" @click="navigateToCategory('Simulacion')">
            <div class="category-icon">📊</div>
            <h3 class="category-title">Simulación</h3>
            <p class="category-description">APIs para simular créditos y cotizar seguros</p>
          </div>
          <div class="category-card desembolso" @click="navigateToCategory('Desembolso')">
            <div class="category-icon">💰</div>
            <h3 class="category-title">Desembolso</h3>
            <p class="category-description">APIs para realizar desembolsos de créditos</p>
          </div>
          <div class="category-card enrrolamiento" @click="navigateToCategory('Enrrolamiento')">
            <div class="category-icon">✅</div>
            <h3 class="category-title">Enrrolamiento</h3>
            <p class="category-description">APIs para enrolamiento y registro de usuarios</p>
          </div>
          <div class="category-card registrar" @click="navigateToCategory('Registrar')">
            <div class="category-icon">📝</div>
            <h3 class="category-title">Registrar</h3>
            <p class="category-description">APIs para registrar y gestionar obligaciones</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How it Works Section -->
    <section class="how-it-works-section">
      <div class="container">
        <h2 class="section-title">¿Cómo funciona?</h2>
        <div class="steps-grid">
          <div class="step-card">
            <div class="step-number">1</div>
            <h3>Explora</h3>
            <p>Navega por nuestro catálogo de APIs organizadas por categorías</p>
          </div>
          <div class="step-card">
            <div class="step-number">2</div>
            <h3>Filtra</h3>
            <p>Usa filtros inteligentes para encontrar la API que necesitas</p>
          </div>
          <div class="step-card">
            <div class="step-number">3</div>
            <h3>Conecta</h3>
            <p>Realiza match y accede a la documentación completa</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'HomePage',
  methods: {
    navigateToApis() {
      this.$emit('navigate-to-apis');
    },
    navigateToCategory(category) {
      this.$emit('navigate-to-apis', category);
    }
  }
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background: #fff;
  color: #1F1E23;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Hero Section */
.hero-section {
  position: relative;
  background: linear-gradient(135deg, #fef5f6 0%, #ffffff 50%, #fff9f9 100%);
  padding: 60px 24px 100px;
  overflow: hidden;
}

/* Contenedor de logos flotantes */
.floating-logos-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}

.floating-logo {
  position: absolute;
  opacity: 0.06;
  filter: blur(1px) grayscale(20%);
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  transition: all 0.3s ease;
}

/* Logo 1 - Grande, superior izquierda */
.floating-logo.logo-1 {
  width: 280px;
  height: 280px;
  top: -40px;
  left: -60px;
  animation: float-slow 8s infinite;
  opacity: 0.05;
}

/* Logo 2 - Mediano, superior derecha */
.floating-logo.logo-2 {
  width: 200px;
  height: 200px;
  top: 50px;
  right: -40px;
  animation: float-diagonal 10s infinite;
  animation-delay: 1s;
  opacity: 0.07;
}

/* Logo 3 - Pequeño, centro */
.floating-logo.logo-3 {
  width: 150px;
  height: 150px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: rotate-float 12s infinite;
  animation-delay: 2s;
  opacity: 0.04;
}

/* Logo 4 - Grande, centro con efecto elegante */
.floating-logo.logo-4 {
  width: 450px;
  height: 450px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: float-elegant 15s ease-in-out infinite;
  animation-delay: 0s;
  opacity: 0.035;
  filter: blur(2px) grayscale(10%);
}

/* Logo 5 - Mediano, centro izquierda */
.floating-logo.logo-5 {
  width: 180px;
  height: 180px;
  top: 60%;
  left: 5%;
  animation: float-gentle 11s infinite;
  animation-delay: 3s;
  opacity: 0.06;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-layout {
  display: flex;
  align-items: center;
  gap: 60px;
  min-height: 500px;
}

.hero-logo-container {
  flex: 0 0 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border-radius: 24px;
  padding: 40px;
  box-shadow:
    0 10px 40px rgba(220, 53, 69, 0.08),
    0 4px 12px rgba(0, 0, 0, 0.04);
  transition: all 0.4s ease;
}

.hero-logo-container:hover {
}

.hero-logo-main {
  width: 280px;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 8px 24px rgba(220, 53, 69, 0.15));
  transition: all 0.4s ease;
  animation: pulse-logo 3s ease-in-out infinite;
}

.hero-logo-main:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 12px 32px rgba(220, 53, 69, 0.25));
}

.hero-text-content {
  flex: 1;
  text-align: center;
}

@keyframes pulse-logo {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

.hero-title {
  font-size: 56px;
  font-weight: 800;
  margin: 0 0 28px;
  line-height: 1.15;
  letter-spacing: -1px;
  position: relative;
  z-index: 2;
  color: #1F1E23;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.hero-subtitle {
  font-size: 26px;
  font-weight: 700;
  margin: 0 0 24px;
  color: var(--sufi-primary);
  position: relative;
  z-index: 2;
  line-height: 1.5;
  text-shadow: 0 1px 2px rgba(220, 53, 69, 0.1);
}

.hero-description {
  font-size: 19px;
  line-height: 1.7;
  margin: 0 0 40px;
  opacity: 0.9;
  position: relative;
  z-index: 2;
  color: #2c2c2c;
  font-weight: 400;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.cta-button {
  background: var(--sufi-primary);
  color: #fff;
  border: none;
  padding: 22px 56px;
  border-radius: 35px;
  font-size: 22px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(220, 53, 69, 0.2);
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.cta-button:hover {
  background: #c82333;
  transform: translateY(-4px);
  box-shadow: 0 15px 40px rgba(220, 53, 69, 0.3);
}

.cta-button:active {
  transform: translateY(-1px);
}

.cta-button.secondary {
  background: transparent;
  color: var(--sufi-primary);
  border: 2px solid var(--sufi-primary);
}

.cta-button.secondary:hover {
  background: var(--sufi-primary);
  color: #fff;
}

.hero-decoration {
  position: absolute;
  bottom: -50px;
  left: 0;
  right: 0;
  height: 100px;
  background: #fff;
  border-radius: 50% 50% 0 0 / 100% 100% 0 0;
}

/* Features Section */
.features-section {
  padding: 80px 24px;
  background: #f8f9fa;
}

.section-title {
  font-size: 48px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 60px;
  color: #1F1E23;
  letter-spacing: -0.5px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: #fff;
  padding: 40px 32px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  text-align: center;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(220, 53, 69, 0.12);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.feature-card h3 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--sufi-primary);
}

.feature-card p {
  font-size: 16px;
  line-height: 1.6;
  color: #666;
  margin: 0;
}

/* Stats Section */
.stats-section {
  padding: 80px 24px;
  background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
  color: #fff;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 48px;
  max-width: 900px;
  margin: 0 auto;
}

.stat-card {
  text-align: center;
}

.stat-number {
  font-size: 72px;
  font-weight: 800;
  margin-bottom: 12px;
  line-height: 1;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.stat-label {
  font-size: 22px;
  opacity: 0.95;
  font-weight: 600;
}

/* Decorative Divider */
.decorative-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 24px;
  background: #fff;
  position: relative;
}

.divider-line {
  flex: 1;
  height: 3px;
  background: linear-gradient(90deg,
    transparent 0%,
    #dc3545 20%,
    #FFD60A 50%,
    #dc3545 80%,
    transparent 100%);
  max-width: 400px;
  position: relative;
  overflow: hidden;
}

.divider-line::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.8) 50%,
    transparent 100%);
  animation: shine 3s infinite;
}

@keyframes shine {
  0% { left: -100%; }
  100% { left: 200%; }
}

.divider-icon-container {
  margin: 0 32px;
  background: #fff;
  border-radius: 50%;
  padding: 20px;
  box-shadow:
    0 0 0 8px rgba(220, 53, 69, 0.1),
    0 0 0 16px rgba(255, 214, 10, 0.1),
    0 8px 24px rgba(220, 53, 69, 0.15);
  position: relative;
  animation: pulse-divider 3s ease-in-out infinite;
}

@keyframes pulse-divider {
  0%, 100% {
    transform: scale(1);
    box-shadow:
      0 0 0 8px rgba(220, 53, 69, 0.1),
      0 0 0 16px rgba(255, 214, 10, 0.1),
      0 8px 24px rgba(220, 53, 69, 0.15);
  }
  50% {
    transform: scale(1.05);
    box-shadow:
      0 0 0 12px rgba(220, 53, 69, 0.15),
      0 0 0 24px rgba(255, 214, 10, 0.15),
      0 12px 32px rgba(220, 53, 69, 0.2);
  }
}

.divider-icon {
  width: 80px;
  height: 80px;
  object-fit: contain;
  display: block;
  filter: drop-shadow(0 4px 8px rgba(220, 53, 69, 0.2));
  animation: rotate-slow 20s linear infinite;
}

@keyframes rotate-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Categories Section */
.categories-section {
  padding: 80px 24px;
  background: #fff;
}

.section-subtitle {
  font-size: 18px;
  text-align: center;
  color: #666;
  margin-bottom: 50px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
}

.category-card {
  background: #fff;
  padding: 40px 32px;
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  text-align: center;
  border: 3px solid transparent;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.category-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, var(--category-color) 0%, var(--category-color-dark) 100%);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}

.category-card:hover::before {
  transform: scaleX(1);
}

.category-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  border-color: var(--category-color);
}

.category-icon {
  font-size: 64px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

.category-card:hover .category-icon {
  transform: scale(1.2) rotate(5deg);
}

.category-title {
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 16px;
  color: var(--category-color);
  transition: all 0.3s ease;
}

.category-description {
  font-size: 16px;
  line-height: 1.6;
  color: #666;
  margin: 0;
}

/* Colores por categoría - Paleta Sufi */
.category-card.consulta {
  --category-color: #dc3545;
  --category-color-dark: #c82333;
}

.category-card.gestion {
  --category-color: #2C2A29;
  --category-color-dark: #1a1918;
}

.category-card.simulacion {
  --category-color: #FFD60A;
  --category-color-dark: #e6c209;
}

.category-card.desembolso {
  --category-color: #28a745;
  --category-color-dark: #218838;
}

.category-card.enrrolamiento {
  --category-color: #17a2b8;
  --category-color-dark: #138496;
}

.category-card.registrar {
  --category-color: #6f42c1;
  --category-color-dark: #5a32a3;
}

.category-card.consulta:hover {
  background: linear-gradient(135deg, rgba(220, 53, 69, 0.05) 0%, rgba(200, 35, 51, 0.05) 100%);
}

.category-card.gestion:hover {
  background: linear-gradient(135deg, rgba(44, 42, 41, 0.05) 0%, rgba(26, 25, 24, 0.05) 100%);
}

.category-card.simulacion:hover {
  background: linear-gradient(135deg, rgba(255, 214, 10, 0.1) 0%, rgba(230, 194, 9, 0.1) 100%);
}

.category-card.simulacion .category-title {
  color: #e6c209;
}

.category-card.desembolso:hover {
  background: linear-gradient(135deg, rgba(40, 167, 69, 0.05) 0%, rgba(33, 136, 56, 0.05) 100%);
}

.category-card.enrrolamiento:hover {
  background: linear-gradient(135deg, rgba(23, 162, 184, 0.05) 0%, rgba(19, 132, 150, 0.05) 100%);
}

.category-card.registrar:hover {
  background: linear-gradient(135deg, rgba(111, 66, 193, 0.05) 0%, rgba(90, 50, 163, 0.05) 100%);
}

/* How it Works Section */
.how-it-works-section {
  padding: 80px 24px;
  background: #fff;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.step-card {
  text-align: center;
  position: relative;
}

.step-number {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: 700;
  margin: 0 auto 24px;
  box-shadow: 0 8px 24px rgba(220, 53, 69, 0.2);
}

.step-card h3 {
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 16px;
  color: #1F1E23;
}

.step-card p {
  font-size: 18px;
  line-height: 1.6;
  color: #666;
  max-width: 300px;
  margin: 0 auto;
}

/* CTA Section */
.cta-section {
  padding: 100px 24px;
  background: #f8f9fa;
  text-align: center;
}

.cta-title {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #1F1E23;
}

.cta-description {
  font-size: 20px;
  color: #666;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* Animations */
@keyframes float-slow {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(10px, -15px) rotate(2deg);
  }
  50% {
    transform: translate(-5px, -25px) rotate(-1deg);
  }
  75% {
    transform: translate(-15px, -10px) rotate(1deg);
  }
}

@keyframes float-diagonal {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(-20px, 15px) rotate(-3deg);
  }
  66% {
    transform: translate(15px, -20px) rotate(2deg);
  }
}

@keyframes rotate-float {
  0%, 100% {
    transform: translate(-50%, -50%) rotate(0deg) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) rotate(180deg) scale(1.1);
  }
}

@keyframes float-gentle {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-30px) rotate(5deg);
  }
}

@keyframes float-elegant {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1) rotate(0deg);
    opacity: 0.035;
  }
  50% {
    transform: translate(-50%, -48%) scale(1.05) rotate(3deg);
    opacity: 0.045;
  }
}

/* Responsive Design */
/* Tablets y pantallas medianas */
@media (max-width: 1024px) {
  .hero-layout {
    gap: 40px;
  }

  .hero-logo-main {
    width: 220px;
  }

  .hero-title {
    font-size: 40px;
  }

  .features-grid,
  .steps-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 32px;
  }

  .categories-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 28px;
  }
}

/* Tablets pequeños */
@media (max-width: 768px) {
  .hero-section {
    padding: 50px 20px 80px;
  }

  .hero-layout {
    flex-direction: column;
    gap: 32px;
    min-height: auto;
  }

  .hero-logo-container {
    flex: none;
  }

  .hero-logo-main {
    width: 180px;
  }

  .hero-text-content {
    text-align: center;
  }

  .hero-title {
    font-size: 32px;
    line-height: 1.2;
  }

  .hero-subtitle {
    font-size: 16px;
  }

  .hero-description {
    font-size: 15px;
  }

  .cta-button {
    width: 100%;
    max-width: 400px;
    justify-content: center;
  }

  .floating-logo {
    opacity: 0.04 !important;
  }

  .floating-logo.logo-1 {
    width: 150px;
    height: 150px;
  }

  .floating-logo.logo-2 {
    width: 120px;
    height: 120px;
  }

  .floating-logo.logo-3 {
    width: 90px;
    height: 90px;
  }

  .floating-logo.logo-4 {
    width: 250px;
    height: 250px;
    opacity: 0.025 !important;
  }

  .floating-logo.logo-5 {
    width: 100px;
    height: 100px;
  }

  .section-title {
    font-size: 32px;
  }

  .cta-title {
    font-size: 32px;
  }

  .features-grid,
  .steps-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .categories-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .category-card {
    padding: 32px 24px;
  }

  .category-icon {
    font-size: 56px;
  }

  .category-title {
    font-size: 24px;
  }

  .category-description {
    font-size: 15px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .stat-number {
    font-size: 56px;
  }

  .stat-label {
    font-size: 18px;
  }

  .step-number {
    width: 70px;
    height: 70px;
    font-size: 32px;
  }

  .step-card h3 {
    font-size: 28px;
  }

  .step-card p {
    font-size: 16px;
  }

  .features-section,
  .stats-section,
  .how-it-works-section,
  .cta-section {
    padding: 60px 20px;
  }
}

/* Móviles */
@media (max-width: 640px) {
  .hero-section {
    padding: 40px 16px 70px;
  }

  .decorative-divider {
    padding: 40px 16px;
  }

  .divider-line {
    max-width: 200px;
    height: 2px;
  }

  .divider-icon-container {
    margin: 0 16px;
    padding: 12px;
  }

  .divider-icon {
    width: 60px;
    height: 60px;
  }

  .hero-logo-main {
    width: 160px;
  }

  .hero-title {
    font-size: 28px;
  }

  .hero-subtitle {
    font-size: 15px;
  }

  .hero-description {
    font-size: 14px;
  }

  .cta-button {
    padding: 14px 28px;
    font-size: 16px;
  }

  .section-title {
    font-size: 28px;
    margin-bottom: 40px;
  }

  .cta-title {
    font-size: 28px;
  }

  .cta-description {
    font-size: 16px;
  }

  .stat-number {
    font-size: 48px;
  }

  .stat-label {
    font-size: 16px;
  }

  .step-number {
    width: 60px;
    height: 60px;
    font-size: 28px;
    margin-bottom: 20px;
  }

  .step-card h3 {
    font-size: 24px;
  }

  .step-card p {
    font-size: 15px;
  }

  .feature-icon {
    width: 60px;
    height: 60px;
    font-size: 28px;
  }

  .feature-card h3 {
    font-size: 20px;
  }

  .feature-card p {
    font-size: 14px;
  }

  .features-section,
  .stats-section,
  .how-it-works-section,
  .cta-section,
  .categories-section {
    padding: 50px 16px;
  }

  .category-card {
    padding: 28px 20px;
  }

  .category-icon {
    font-size: 52px;
  }

  .category-title {
    font-size: 22px;
  }

  .category-description {
    font-size: 14px;
  }

  .floating-logo.logo-4 {
    width: 200px;
    height: 200px;
  }
}

/* Móviles pequeños */
@media (max-width: 375px) {
  .hero-section {
    padding: 32px 12px 60px;
  }

  .hero-logo-main {
    width: 140px;
  }

  .hero-title {
    font-size: 24px;
  }

  .hero-subtitle {
    font-size: 14px;
  }

  .hero-description {
    font-size: 13px;
  }

  .cta-button {
    padding: 12px 24px;
    font-size: 15px;
  }

  .section-title {
    font-size: 24px;
  }

  .cta-title {
    font-size: 24px;
  }

  .stat-number {
    font-size: 42px;
  }

  .step-card h3 {
    font-size: 22px;
  }

  .features-section,
  .stats-section,
  .how-it-works-section,
  .cta-section,
  .categories-section {
    padding: 40px 12px;
  }

  .category-card {
    padding: 24px 16px;
  }

  .category-icon {
    font-size: 48px;
  }

  .category-title {
    font-size: 20px;
  }

  .category-description {
    font-size: 13px;
  }
}
</style>

