<script>
export default { name: 'AppHeader' }
</script>

<style scoped>
.app-header {
  background: var(--sufi-gradient);
  color: #fff;
  padding: 32px 0 24px;
  position: relative;
  box-shadow: var(--shadow-md);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.brand {
  display: flex;
  align-items: center;
  gap: 24px;
}

.brand-sufi {
  width: 100px;
  height: 72px;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2));
}

.titles {
  display: flex;
  flex-direction: column;
}

.title {
  margin: 0;
  font-size: 42px;
  line-height: 1;
  font-weight: 700;
  letter-spacing: -1px;
}

.subtitle {
  margin: 6px 0 0;
  font-size: 16px;
  font-weight: 500;
  opacity: 0.9;
}

.header-accent {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: var(--sufi-accent);
  box-shadow: 0 2px 4px rgba(var(--sufi-primary-rgb), 0.25);
}

@media (max-width: 640px) {
  .title {
    font-size: 32px;
  }

  .brand {
    gap: 16px;
  }

  .brand-sufi {
    width: 100px;
    height: 100px;
  }
}
</style>
