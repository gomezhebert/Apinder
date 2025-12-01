<template>
  <div class="spinner-wrapper" role="status" aria-live="polite" :aria-label="label">
    <div class="spinner-circle"></div>
    <p v-if="showText" class="spinner-text">{{ label }}</p>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    label: { type: String, default: 'Cargando...' },
    showText: { type: Boolean, default: true },
    size: { type: Number, default: 56 }
  }
}
</script>

<style scoped>
.spinner-wrapper { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 24px; }
.spinner-circle { width: v-bind(size+'px'); height: v-bind(size+'px'); border-radius: 50%; border: 6px solid var(--sufi-border); border-top-color: var(--sufi-primary); border-right-color: var(--sufi-secondary); animation: spin 1s linear infinite, pulse 2.4s ease-in-out infinite; box-shadow: var(--shadow-sm); }
.spinner-text { margin: 0; font-size: 14px; font-weight: 600; color: var(--sufi-secondary); }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes pulse { 0%,100% { filter: brightness(1); } 50% { filter: brightness(1.15); } }
</style>
