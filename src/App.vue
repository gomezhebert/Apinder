<template>
  <div id="app">
    <AppHeader v-if="currentView === 'apis'" />
    <main class="main-shell" :class="{ 'home-view': currentView === 'home' }">
      <div v-if="loading" class="container">
        <LoadingSpinner label="Cargando APIs..." />
      </div>
      <div v-else-if="errorMsg" class="status-banner error container">{{ errorMsg }}</div>
      <div v-else>
        <HomePage v-if="currentView === 'home'" @navigate-to-apis="showApis" />
        <ApiMatchGrid v-else :apis="apis" :initial-category="selectedCategory" @navigate-to-home="showHome" />
      </div>
    </main>
  </div>
</template>

<script>
import AppHeader from './components/Header.vue'
import HomePage from './components/HomePage.vue'
import ApiMatchGrid from './components/ApiMatchGrid.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'
import Papa from 'papaparse'

export default {
  name: 'App',
  components: { AppHeader, HomePage, ApiMatchGrid, LoadingSpinner },
  data() {
    return {
      apis: [],
      loading: false,
      errorMsg: null,
      currentView: 'home', // 'home' o 'apis'
      selectedCategory: null
    }
  },
  mounted() { this.loadApis(); },
  methods: {
    async loadApis() {
      this.loading = true; this.errorMsg = null;
      try {
        const response = await fetch('dataset.csv');
        if (!response.ok) throw new Error(`No se pudo descargar dataset.csv (HTTP ${response.status})`);
        const csvText = await response.text();
        if (!csvText.trim()) throw new Error('El archivo CSV está vacío');
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          error: (err) => { console.error('Error parseando CSV', err); this.errorMsg = 'Error parseando el CSV'; this.loading = false; },
          complete: (results) => {
            this.apis = results.data
              .filter(r => (r['Nombre Api'] && r['Nombre producto']))
              .map((r, i) => ({
                id: i,
                categoria: r['Categoría'] || '',
                nombreApi: r['Nombre Api'] || '',
                nombreEspanol: r['Nombre producto'] || '',
                nombreIngles: r['Nombre producto'] || '',
                descripcion: r['Descripción'] || '',
                palabrasClave: r['Palabras claves'] || '',
                link: r['Link'] || ''
              }));
            this.loading = false;
          }
        });
      } catch (e) { console.error(e); this.errorMsg = e.message; this.loading = false; }
    },
    showApis(category = null) {
      this.selectedCategory = category;
      this.currentView = 'apis';
    },
    showHome() {
      this.selectedCategory = null;
      this.currentView = 'home';
    }
  }
}
</script>

<style>
#app { min-height: 100vh; display: flex; flex-direction: column; background: #fff; }
.main-shell {
  flex: 1;
  padding: 32px 0 64px;
  background: #fff;
  color: #1F1E23;
  min-height: calc(100vh - 60px);
}
.main-shell.home-view { padding: 0; background: #fff; }
.status-banner { margin-top: 32px; }
.spinner-wrapper { min-height: 160px; }
</style>
