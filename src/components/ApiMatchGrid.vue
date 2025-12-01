<template>
  <div class="match-container">
    <!-- Barra de búsqueda principal -->
    <header class="hero">
      <!-- Título con botón de regreso -->
      <div class="title-row">
        <h1 class="hero-title">Busca API o producto con palabra clave</h1>
        <button class="back-home-btn" @click="goToHome" title="Volver al inicio">
          <span class="arrow-icon">←</span>
          <span>Volver al inicio</span>
        </button>
      </div>
      <div class="search-row">
        <input
          v-model="inputSearch"
          type="text"
          class="search-input"
          placeholder="🔍 Busca por nombre, categoría, descripción o palabra clave..."
          aria-label="Buscar APIs por palabra clave"
        />
        <button class="icon-btn clear-search-btn" @click="clearSearchInput" :disabled="!inputSearch" aria-label="Limpiar búsqueda" title="Limpiar búsqueda">
          <span class="material-icon">✕</span>
        </button>
        <button class="icon-btn" @click="applySearch" :disabled="loadingSearch" aria-label="Buscar">
          <span class="material-icon">🔍</span>
        </button>
      </div>
      <p class="hero-sub">Si aún no decides qué estás buscando explora algunas de las opciones que tenemos diseñadas para ti</p>

      <!-- Indicador de filtro activo -->
      <div v-if="selectedCategory" class="active-filter">
        <span class="filter-label">📂 Filtrando por:</span>
        <span class="filter-value">{{ selectedCategory }}</span>
        <button class="clear-filter-btn" @click="clearCategoryFilter" title="Limpiar filtro">✕</button>
      </div>

      <button class="explore-btn" @click="toggleCategoryView">{{ showCategories ? 'Ver todas las APIs' : 'Explorar categorías' }}</button>
    </header>

    <!-- Sección de exploración por categorías -->
    <section v-if="showCategories" ref="categories" class="categories-section">
      <h2 class="section-title">Explorar por Categoría</h2>
      <div class="categories-grid">
        <div
          v-for="category in availableCategories"
          :key="category.name"
          class="category-card"
          @click="filterByCategory(category.name)"
        >
          <div class="category-header">
            <h3 class="category-name">{{ category.name }}</h3>
            <span class="category-count">{{ category.count }} API{{ category.count !== 1 ? 's' : '' }}</span>
          </div>
          <div class="category-apis">
            <div v-for="api in category.apis.slice(0, 3)" :key="api.id" class="category-api-item">
              <span class="api-dot">•</span>
              <span class="api-item-name">{{ api.nombreEspanol || api.nombreIngles || 'Sin nombre' }}</span>
            </div>
            <div v-if="category.count > 3" class="more-apis">
              + {{ category.count - 3 }} más
            </div>
          </div>
          <button class="view-category-btn">Ver APIs de {{ category.name }}</button>
        </div>
      </div>
    </section>

    <!-- Decorative Divider -->
    <div v-if="showCategories" class="decorative-divider">
      <div class="divider-line"></div>
      <div class="divider-icon-container">
        <img src="@/assets/icons/sufi.png" alt="Sufi" class="divider-icon">
      </div>
      <div class="divider-line"></div>
    </div>

    <!-- Grid de tarjetas -->
    <section ref="grid" class="cards-grid">
      <div
        v-for="api in displayedApis"
        :key="api.id"
        class="api-card"
        :class="backgroundClass(api.id)"
      >
        <div class="api-card-inner">
          <div class="api-header">
            <h3 class="api-title">{{ api.nombreApi || api.nombreEspanol || api.nombreIngles || 'Sin nombre' }}</h3>
            <p class="api-subtitle" v-if="api.nombreEspanol">{{ api.nombreEspanol }}</p>
            <span class="api-category" v-if="api.categoria">{{ api.categoria }}</span>
          </div>
          <p class="api-desc">{{ truncate(api.descripcion, 200) }}</p>
          <div class="card-actions">
            <a
              v-if="api.link"
              :href="api.link"
              target="_blank"
              rel="noopener"
              class="match-btn"
              @click="handleMatchClick(api)"
              title="Ver documentación"
            >
              <span class="heart" aria-hidden="true">❤</span>
              <span>Hacer match</span>
            </a>
            <button
              v-else
              class="match-btn disabled"
              disabled
              title="Sin documentación disponible"
            >
              <span class="heart" aria-hidden="true">❤</span>
              <span>Sin documentación</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Paginación -->
    <div v-if="totalFiltered > pageSize" class="pagination">
      <button class="pag-btn" :disabled="currentPage===1" @click="goToPage(1)">«</button>
      <button class="pag-btn" :disabled="currentPage===1" @click="prevPage">‹</button>
      <span class="pag-info">Página {{ currentPage }} / {{ totalPages }}</span>
      <button class="pag-btn" :disabled="currentPage===totalPages" @click="nextPage">›</button>
      <button class="pag-btn" :disabled="currentPage===totalPages" @click="goToPage(totalPages)">»</button>
    </div>

    <!-- Estado vacío -->
    <div v-if="displayedApis.length === 0" class="empty-state">
      <p>No se encontraron APIs{{ selectedCategory ? ' en la categoría ' + selectedCategory : ' para tu búsqueda' }}.</p>
      <button class="explore-btn" @click="clearSearch">Limpiar búsqueda</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ApiMatchGrid',
  props: {
    apis: { type: Array, required: true },
    initialCategory: { type: String, default: null }
  },
  data() {
    return {
      inputSearch: '',
      search: '',
      debounceId: null,
      debounceDelay: 350,
      currentPage: 1,
      pageSize: 12,
      matched: new Set(),
      storageKeyMatches: 'apinderMatches',
      storageKeySearch: 'apinderSearch',
      showCategories: false,
      selectedCategory: '',
      loadingSearch: false
    }
  },
  computed: {
    availableCategories() {
      const categoryMap = new Map();

      this.apis.forEach(api => {
        const categoryName = api.categoria || 'Sin categoría';
        if (!categoryMap.has(categoryName)) {
          categoryMap.set(categoryName, {
            name: categoryName,
            apis: [],
            count: 0
          });
        }
        const category = categoryMap.get(categoryName);
        category.apis.push(api);
        category.count++;
      });

      return Array.from(categoryMap.values()).sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    },
    filteredApis() {
      const term = this.search.trim().toLowerCase();
      let filtered = this.apis;

      // Filtrar por categoría seleccionada
      if (this.selectedCategory) {
        filtered = filtered.filter(a =>
          (a.categoria || 'Sin categoría') === this.selectedCategory
        );
      }

      // Filtrar por término de búsqueda
      if (term) {
        filtered = filtered.filter(a => {
          // Indexación mejorada por palabras clave incluyendo nombreApi
          const searchableText = [
            a.categoria || '',
            a.nombreApi || '',
            a.nombreEspanol || '',
            a.nombreIngles || '',
            a.descripcion || '',
            a.palabrasClave || ''
          ].join(' ').toLowerCase();

          // Buscar por palabras individuales (mejor indexación)
          const searchWords = term.split(/\s+/).filter(Boolean);

          // Match si todas las palabras están presentes
          return searchWords.every(word => searchableText.includes(word));
        });
      }

      return filtered;
    },
    totalFiltered() { return this.filteredApis.length; },
    totalPages() { return Math.max(1, Math.ceil(this.totalFiltered / this.pageSize)); },
    clampedPage() {
      return Math.min(Math.max(this.currentPage, 1), this.totalPages);
    },
    displayedApis() {
      const start = (this.clampedPage - 1) * this.pageSize;
      return this.filteredApis.slice(start, start + this.pageSize);
    }
  },
  watch: {
    inputSearch(val) {
      if (this.debounceId) clearTimeout(this.debounceId);
      this.debounceId = setTimeout(() => {
        this.search = val;
        this.currentPage = 1;
        this.persistSearch();
      }, this.debounceDelay);
    },
    totalPages(newVal) { if (this.currentPage > newVal) this.currentPage = newVal; },
    initialCategory: {
      immediate: true,
      handler(newCategory) {
        if (newCategory) {
          this.selectedCategory = newCategory;
          this.currentPage = 1;
          this.showCategories = false;
          // Scroll al grid de tarjetas
          this.$nextTick(() => {
            const el = this.$refs.grid;
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        }
      }
    }
  },
  mounted() {
    this.loadPersisted();
    // Si hay categoría inicial, aplicarla
    if (this.initialCategory) {
      this.selectedCategory = this.initialCategory;
    }
  },
  beforeUnmount() { if (this.debounceId) clearTimeout(this.debounceId); },
  methods: {
    truncate(t, m) { if (!t) return ''; return t.length > m ? t.slice(0, m) + '…' : t; },
    backgroundClass(id) { return id % 2 === 0 ? 'bg-cyan' : 'bg-pink'; },
    applySearch() {
      this.search = this.inputSearch;
      this.currentPage = 1;
      this.selectedCategory = '';
      this.persistSearch();
    },
    clearSearch() {
      this.inputSearch='';
      this.search='';
      this.selectedCategory = '';
      this.currentPage=1;
      this.persistSearch();
    },
    clearSearchInput() {
      this.inputSearch = '';
      this.search = '';
      this.currentPage = 1;
      this.persistSearch();
    },
    goToHome() {
      this.$emit('navigate-to-home');
    },
    handleMatchClick(api) {
      // Registrar el match antes de redirigir
      if (!this.isMatched(api)) {
        this.matched.add(api.id);
        this.persistMatches();
      }
    },
    toggleCategoryView() {
      this.showCategories = !this.showCategories;
      if (this.showCategories) {
        this.$nextTick(() => {
          const el = this.$refs.categories;
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    },
    filterByCategory(categoryName) {
      this.selectedCategory = categoryName;
      this.showCategories = false;
      this.inputSearch = '';
      this.search = '';
      this.currentPage = 1;
      this.$nextTick(() => {
        const el = this.$refs.grid;
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    },
    clearCategoryFilter() {
      this.selectedCategory = '';
      this.currentPage = 1;
    },
    nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; },
    prevPage() { if (this.currentPage > 1) this.currentPage--; },
    goToPage(p) { if (p>=1 && p<=this.totalPages) this.currentPage = p; },
    toggleMatch(api) {
      if (this.isMatched(api)) this.matched.delete(api.id); else this.matched.add(api.id);
      this.persistMatches();
    },
    isMatched(api) { return this.matched.has(api.id); },
    persistMatches() {
      try {
        localStorage.setItem(this.storageKeyMatches, JSON.stringify(Array.from(this.matched)));
      } catch(e){
        // Silenciar error de localStorage
      }
    },
    persistSearch() {
      try {
        localStorage.setItem(this.storageKeySearch, this.search);
      } catch(e){
        // Silenciar error de localStorage
      }
    },
    loadPersisted() {
      try {
        const rawM = localStorage.getItem(this.storageKeyMatches);
        if (rawM) { JSON.parse(rawM).forEach(id => this.matched.add(id)); }
        const rawS = localStorage.getItem(this.storageKeySearch);
        if (rawS) { this.search = rawS; this.inputSearch = rawS; }
      } catch(e){
        // Silenciar error de localStorage
      }
    }
  }
}
</script>

<style scoped>
.match-container {
  display: flex;
  flex-direction: column;
  gap: 32px;
  background: #fff;
  min-height: calc(100vh - 120px);
  padding-bottom: 40px;
}
.hero { padding:32px 24px 12px; background:#ffffff; border-radius:var(--radius-lg); color:#1F1E23; box-shadow:var(--shadow-md); border: 1px solid #e0e0e0; }

/* Fila del título con botón de regreso */
.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 18px;
}

/* Botón de regreso a home */
.back-home-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  border: 2px solid var(--sufi-primary);
  color: var(--sufi-primary);
  padding: 10px 20px;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(220, 53, 69, 0.1);
  white-space: nowrap;
  flex-shrink: 0;
}
.back-home-btn:hover {
  background: var(--sufi-primary);
  color: #fff;
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.2);
}
.arrow-icon {
  font-size: 18px;
  font-weight: bold;
}

.hero-title { margin:0; font-size:34px; line-height:1.15; font-weight:700; color:#1F1E23; }
.hero-sub { margin:24px 0 16px; font-size:16px; font-weight:500; color:#666; }

/* Filtro activo */
.active-filter {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fff5f5;
  padding: 12px 18px;
  border-radius: 12px;
  margin: 16px 0;
  border: 2px solid var(--sufi-primary);
}
.filter-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--sufi-primary);
}
.filter-value {
  font-size: 16px;
  font-weight: 700;
  color: #1F1E23;
}
.clear-filter-btn {
  margin-left: auto;
  background: rgba(220, 53, 69, 0.1);
  border: none;
  color: var(--sufi-primary);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}
.clear-filter-btn:hover {
  background: var(--sufi-primary);
  color: #fff;
  transform: scale(1.1);
}

.search-row { display:flex; align-items:center; gap:12px; position:relative; max-width: 50%; }
.search-input {
  flex:1;
  background:#fff;
  border:2px solid #e0e0e0;
  border-radius:12px;
  padding:14px 18px;
  font-size:17px;
  color:#1F1E23;
  transition: all 0.3s ease;
  width: 100%;
}
.search-input::placeholder {
  color:#999;
  font-style: italic;
}
.search-input:focus {
  outline:none;
  border-color:var(--sufi-primary);
  background:#fff;
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
}
.icon-btn { background:transparent; border:none; color:var(--sufi-primary); font-size:22px; cursor:pointer; padding:4px 8px; transition: all 0.3s ease; }
.icon-btn:disabled { opacity:.4; cursor:not-allowed; }
.icon-btn:hover:not(:disabled) {
  transform: scale(1.1);
  color: #c82333;
}
.clear-search-btn {
  background: rgba(220, 53, 69, 0.1);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--sufi-primary);
}
.clear-search-btn:hover:not(:disabled) {
  background: var(--sufi-primary);
  color: #fff;
}
.explore-btn {
  background:var(--sufi-primary);
  color:#fff;
  border:none;
  font-weight:700;
  padding:18px 40px;
  border-radius:28px;
  font-size:20px;
  cursor:pointer;
  box-shadow:0 8px 24px rgba(220, 53, 69, 0.2);
  transition:all 0.3s ease;
}
.explore-btn:hover { background:#c82333; transform: translateY(-2px); box-shadow:0 12px 32px rgba(220, 53, 69, 0.3); }

/* Sección de categorías */
.categories-section { padding:32px 24px; }
.section-title {
  font-size:38px;
  font-weight:800;
  margin:0 0 32px;
  text-align:center;
  color:#1F1E23;
  letter-spacing:-0.5px;
}
.categories-grid {
  display:grid;
  gap:24px;
  grid-template-columns:repeat(auto-fill, minmax(280px, 1fr));
}
.category-card {
  background:#fff;
  border-radius:16px;
  padding:24px;
  box-shadow:var(--shadow-md);
  transition:all 0.3s ease;
  cursor:pointer;
  border:2px solid transparent;
}
.category-card:hover {
  transform:translateY(-6px);
  box-shadow:0 12px 32px rgba(220, 53, 69, 0.15);
  border-color:var(--sufi-primary);
}
.category-header {
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:16px;
  padding-bottom:12px;
  border-bottom:2px solid var(--sufi-border);
}
.category-name {
  margin:0;
  font-size:24px;
  font-weight:800;
  color:#1F1E23;
}
.category-count {
  background:var(--sufi-primary);
  color:#fff;
  padding:6px 14px;
  border-radius:20px;
  font-size:13px;
  font-weight:700;
}
.category-apis {
  margin:16px 0;
  min-height:90px;
}
.category-api-item {
  display:flex;
  align-items:center;
  gap:8px;
  margin-bottom:8px;
  font-size:14px;
  color:#4a4a4a;
}
.api-dot {
  color:var(--sufi-primary);
  font-size:20px;
  line-height:1;
}
.api-item-name {
  font-weight:500;
  line-height:1.4;
}
.more-apis {
  margin-top:8px;
  font-size:13px;
  color:var(--sufi-primary);
  font-weight:600;
  font-style:italic;
}
.view-category-btn {
  width:100%;
  background:var(--sufi-primary);
  color:#fff;
  border:none;
  padding:12px 24px;
  border-radius:24px;
  font-weight:700;
  font-size:14px;
  cursor:pointer;
  transition:all 0.3s ease;
}
.view-category-btn:hover {
  transform:translateY(-2px);
  box-shadow:0 6px 16px rgba(220, 53, 69, 0.25);
}

/* Decorative Divider */
.decorative-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 24px;
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
  max-width: 350px;
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
  margin: 0 28px;
  background: #fff;
  border-radius: 50%;
  padding: 16px;
  box-shadow:
    0 0 0 6px rgba(220, 53, 69, 0.1),
    0 0 0 12px rgba(255, 214, 10, 0.1),
    0 6px 20px rgba(220, 53, 69, 0.15);
  position: relative;
  animation: pulse-divider 3s ease-in-out infinite;
}

@keyframes pulse-divider {
  0%, 100% {
    transform: scale(1);
    box-shadow:
      0 0 0 6px rgba(220, 53, 69, 0.1),
      0 0 0 12px rgba(255, 214, 10, 0.1),
      0 6px 20px rgba(220, 53, 69, 0.15);
  }
  50% {
    transform: scale(1.05);
    box-shadow:
      0 0 0 10px rgba(220, 53, 69, 0.15),
      0 0 0 20px rgba(255, 214, 10, 0.15),
      0 10px 28px rgba(220, 53, 69, 0.2);
  }
}

.divider-icon {
  width: 70px;
  height: 70px;
  object-fit: contain;
  display: block;
  filter: drop-shadow(0 4px 8px rgba(220, 53, 69, 0.2));
  animation: rotate-slow 20s linear infinite;
}

@keyframes rotate-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.cards-grid { display:grid; gap:32px; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); padding:0 8px 8px; }
.api-card {
  border-radius:16px;
  padding:24px;
  position:relative;
  box-shadow:var(--shadow-md);
  display:flex;
  background:#fff;
  border: 2px solid #e0e0e0;
  transition: all 0.3s ease;
}
.api-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(220, 53, 69, 0.15);
  border-color: var(--sufi-primary);
}
.api-card.bg-cyan { border-top: 4px solid #59cbe8; }
.api-card.bg-pink { border-top: 4px solid #f8d7da; }
.api-card-inner { display:flex; flex-direction:column; gap:16px; width:100%; }
.api-header {
  background:#fff;
  color:#1F1E23;
  border-radius:12px;
  padding:16px;
  text-align:center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 2px solid #f0f0f0;
  transition: all 0.3s ease;
}
.api-header:hover {
  border-color: var(--sufi-primary);
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.1);
}
.api-title {
  margin:0;
  font-size:20px;
  font-weight:800;
  color:#1F1E23;
  letter-spacing: -.3px;
  line-height: 1.3;
}
.api-subtitle {
  margin:8px 0 0;
  font-size:13px;
  font-weight:500;
  opacity:.75;
  color:#666;
  font-style: italic;
}
.api-category {
  display:inline-block;
  margin-top:12px;
  font-size:11px;
  font-weight:700;
  color:#fff;
  background: var(--sufi-primary);
  padding: 4px 12px;
  border-radius: 16px;
  text-transform:uppercase;
  letter-spacing:.5px;
  box-shadow: var(--shadow-sm);
}
.api-desc {
  margin:0;
  font-size:14px;
  line-height:1.6;
  color:#4a4a4a;
  font-weight:400;
}
.card-actions { display:flex; flex-direction: column; gap: 12px; align-items: stretch; margin-top: 8px; }
.match-btn {
  display:inline-flex;
  align-items:center;
  justify-content: center;
  gap:8px;
  background:var(--sufi-primary);
  color:#fff;
  border:none;
  padding:12px 24px;
  border-radius:26px;
  font-size:14px;
  font-weight:700;
  cursor:pointer;
  box-shadow:0 4px 12px rgba(220, 53, 69, 0.2);
  transition:all 0.3s ease;
  text-decoration: none;
}
.match-btn .heart { font-size:16px; }
.match-btn:hover {
  background:#c82333;
  transform: translateY(-2px);
  box-shadow:0 6px 16px rgba(220, 53, 69, 0.3);
}
.match-btn.disabled {
  background: #9e9e9e;
  cursor: not-allowed;
  opacity: 0.6;
}
.match-btn.disabled:hover {
  background: #9e9e9e;
  transform: none;
  box-shadow:0 4px 12px rgba(158, 158, 158, 0.2);
}
.pagination {
  display:flex;
  gap:8px;
  justify-content:center;
  align-items:center;
  flex-wrap:wrap;
  padding: 16px 8px;
}
.pag-btn {
  background:var(--sufi-primary);
  color:#fff;
  border:none;
  padding:10px 16px;
  min-height: 44px;
  min-width: 44px;
  border-radius:var(--radius-md);
  cursor:pointer;
  font-size:14px;
  box-shadow:var(--shadow-sm);
  touch-action: manipulation;
}
.pag-btn:hover:not(:disabled) { background:#c82333; }
.pag-btn:disabled { opacity:.35; cursor:not-allowed; }
.pag-info { font-weight:600; font-size:14px; color:var(--sufi-primary); padding: 0 8px; }
.empty-state {
  text-align:center;
  background:#fff;
  padding:48px 32px;
  border-radius:var(--radius-lg);
  box-shadow:var(--shadow-md);
}
.empty-state p { margin:0 0 16px; font-weight:600; color:#2C2A29; }

/* Responsive Design */
/* Tablets y dispositivos medianos */
@media (max-width: 1024px) {
  .cards-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
  }
  .hero-title { font-size: 28px; }
}

/* Tablets pequeños y móviles grandes */
@media (max-width: 768px) {
  .title-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  .back-home-btn {
    align-self: flex-end;
    font-size: 13px;
    padding: 8px 16px;
  }
  .hero-title { font-size: 24px; }
  .hero-sub { font-size: 15px; }
  .explore-btn {
    font-size: 15px;
    padding: 12px 24px;
    width: 100%;
  }
  .categories-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .search-row {
    max-width: 100%;
    flex-direction: row;
  }
  .cards-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .api-card {
    padding: 20px;
    max-width: 100%;
  }
  .api-title { font-size: 18px; }
  .api-subtitle { font-size: 12px; }
}

/* Móviles */
@media (max-width: 640px) {
  .hero { padding: 20px 16px; }
  .title-row { gap: 10px; }
  .hero-title {
    font-size: 22px;
    line-height: 1.2;
  }
  .hero-sub {
    font-size: 14px;
    margin: 16px 0 12px;
  }
  .decorative-divider {
    padding: 35px 16px;
  }
  .divider-line {
    max-width: 150px;
    height: 2px;
  }
  .divider-icon-container {
    margin: 0 16px;
    padding: 12px;
  }
  .divider-icon {
    width: 55px;
    height: 55px;
  }
  .search-input {
    font-size: 15px;
    padding: 12px 14px;
  }
  .icon-btn {
    font-size: 20px;
    min-width: 44px;
    min-height: 44px;
  }
  .clear-search-btn {
    width: 40px;
    height: 40px;
  }
  .explore-btn {
    font-size: 14px;
    padding: 14px 20px;
  }
  .categories-grid { gap: 12px; }
  .category-card { padding: 18px; }
  .category-name { font-size: 20px; }
  .cards-grid {
    gap: 12px;
    padding: 0 4px 4px;
  }
  .api-card { padding: 16px; }
  .api-title { font-size: 16px; }
  .api-category { font-size: 10px; }
  .match-btn {
    padding: 12px 20px;
    font-size: 13px;
  }
  .pag-btn {
    padding: 8px 12px;
    font-size: 13px;
  }
  .pag-info { font-size: 13px; }
}

/* Móviles pequeños */
@media (max-width: 375px) {
  .hero { padding: 16px 12px; }
  .hero-title { font-size: 20px; }
  .back-home-btn span:last-child {
    display: none;
  }
  .back-home-btn .arrow-icon {
    font-size: 20px;
  }
  .search-row { gap: 8px; }
  .api-card { padding: 14px; }
  .category-card { padding: 14px; }
}

</style>

