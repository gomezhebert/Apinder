# 🔍 Apinder Sufi

<div align="center">
  <img src="src/assets/icons/sufi.png" alt="Sufi Logo" width="200"/>
  
  <h3>Portal para encontrar y explorar las APIs de Sufi</h3>
  
  [![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org/)
  [![License](https://img.shields.io/badge/License-Sufi-dc3545)](https://sufi.grupobancolombia.com/)
  [![Status](https://img.shields.io/badge/Status-Active-success)]()
</div>

---

## 🚀 Demo en Vivo

**[🌐 Ver Proyecto en GitHub Pages](https://gomezh1.github.io/apinder-vue/)**

**URL:** `https://gomezh1.github.io/apinder-vue/`

---

## ✨ Características

- 🔍 **Búsqueda Inteligente** - Encuentra APIs por nombre, categoría, descripción o palabra clave
- 📂 **Exploración por Categorías** - 6 categorías organizadas: Consulta, Gestión, Simulación, Desembolso, Enrrolamiento, Registrar
- 🎯 **Filtrado Dinámico** - Filtra APIs en tiempo real con debounce
- 📱 **100% Responsive** - Optimizado para móviles, tablets y desktop
- 🎨 **Diseño Profesional** - Colores corporativos Sufi (Rojo #dc3545, Amarillo #FFD60A)
- ⚡ **Performance Optimizado** - Carga rápida y animaciones fluidas
- 🔗 **Links Directos** - Acceso directo a la documentación de cada API
- 📊 **30 APIs Disponibles** - Catálogo completo de APIs de Sufi
- 💾 **Persistencia Local** - Guarda búsquedas y filtros en localStorage
- 🎭 **Animaciones Elegantes** - Transiciones suaves y efectos visuales

---

## 📸 Screenshots

### Página Principal
Diseño elegante con hero section, categorías y llamado a la acción

### Exploración de APIs
Grid interactivo con búsqueda y filtros por categoría

### Responsive Design
Funciona perfectamente en cualquier dispositivo

---

## 🛠️ Tecnologías

- **Vue.js 3** - Framework JavaScript progresivo
- **JavaScript ES6+** - Código moderno y limpio
- **CSS3** - Estilos personalizados con variables CSS
- **PapaParse** - Parser de CSV para cargar datos
- **GitHub Pages** - Hosting gratuito
- **Git** - Control de versiones

---

## 📦 Instalación Local

### Requisitos Previos
- Node.js (v14 o superior)
- npm o yarn

### Pasos

```bash
# Clonar el repositorio
git clone https://github.com/gomezh1/apinder-vue.git

# Entrar al directorio
cd apinder-vue

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run serve
```

El proyecto estará disponible en: `http://localhost:8080`

---

## 🏗️ Build para Producción

```bash
# Compilar y minificar
npm run build

# Los archivos estarán en /dist
```

---

## 🚀 Deploy a GitHub Pages

```bash
# Ejecutar script de deploy
npm run deploy

# O manualmente
sh deploy.sh
```

El sitio estará disponible en: `https://gomezh1.github.io/apinder-vue/`

---

## 📁 Estructura del Proyecto

```
apinder-vue/
├── public/
│   ├── dataset.csv          # Datos de las APIs
│   └── index.html           # HTML principal
├── src/
│   ├── assets/
│   │   └── icons/           # Logos de Sufi
│   ├── components/
│   │   ├── HomePage.vue     # Página principal
│   │   ├── ApiMatchGrid.vue # Grid de APIs
│   │   ├── Header.vue       # Encabezado
│   │   └── LoadingSpinner.vue
│   ├── styles/
│   │   └── theme.css        # Variables y estilos globales
│   ├── App.vue              # Componente raíz
│   └── main.js              # Punto de entrada
├── .gitignore
├── package.json
├── vue.config.js            # Configuración de Vue
└── README.md
```

---

## 🎨 Paleta de Colores Sufi

```css
--sufi-primary: #dc3545;    /* Rojo corporativo */
--sufi-accent: #FFD60A;     /* Amarillo */
--sufi-black: #2C2A29;      /* Negro */
--sufi-bg: #F7F5FA;         /* Fondo claro */
```

---

## 📋 Categorías de APIs

| Categoría | Icono | Cantidad | Descripción |
|-----------|-------|----------|-------------|
| **Consulta** | 🔍 | 11 APIs | Información de clientes, créditos y transacciones |
| **Gestión** | ⚙️ | 10 APIs | Datos, estudios y procesos crediticios |
| **Simulación** | 📊 | 3 APIs | Créditos y cotización de seguros |
| **Desembolso** | 💰 | 2 APIs | Desembolsos de créditos |
| **Enrrolamiento** | ✅ | 2 APIs | Registro de usuarios |
| **Registrar** | 📝 | 1 API | Obligaciones |

---

## 🔧 Configuración

### vue.config.js
```javascript
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/apinder-vue/' // Nombre del repositorio
    : '/'
}
```

### Variables de Entorno
No se requieren variables de entorno para este proyecto.

---

## 📝 Uso

### Búsqueda de APIs
1. Escribe en el campo de búsqueda
2. Los resultados se filtran automáticamente
3. Usa el botón "Limpiar búsqueda" para resetear

### Explorar por Categorías
1. Clic en "Explorar categorías"
2. Selecciona una categoría
3. Ve las APIs filtradas

### Hacer Match con una API
1. Encuentra la API que necesitas
2. Clic en "❤ Hacer match"
3. Se abrirá la documentación oficial

---

## 🤝 Contribuir

Este es un proyecto interno de Sufi. Para contribuir:

1. Fork del proyecto
2. Crear una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear un Pull Request

---

## 📄 Licencia

© 2025 **Sufi - Grupo Bancolombia**. Todos los derechos reservados.

Este proyecto es de uso interno para el Grupo Bancolombia.

---

## 👥 Autores

**Equipo de Desarrollo Sufi**
- Diseño y Desarrollo: Equipo Sufi
- UX/UI: Basado en Material Design
- APIs: Portal de Documentación Bancolombia

---

## 📞 Contacto

**Sufi - Grupo Bancolombia**
- 🌐 Portal: [https://sufi.grupobancolombia.com/](https://sufi.grupobancolombia.com/)
- 📧 Email: sufi@bancolombia.com.co
- 📱 Línea: (601) 343 0000
- 📄 Documentación: [Portal de Documentación](https://portaldocumentacion.apps.bancolombia.corp)

---

## 🙏 Agradecimientos

- Vue.js Team por el excelente framework
- GitHub Pages por el hosting gratuito
- PapaParse por el parser CSV
- Equipo de Sufi por las especificaciones y recursos

---

## 📊 Estado del Proyecto

- ✅ MVP Completado
- ✅ Responsive Design
- ✅ Deploy a GitHub Pages
- ✅ 30 APIs Documentadas
- ✅ 6 Categorías Implementadas
- 🚧 Mejoras continuas en progreso

---

<div align="center">
  <strong>Hecho con ❤️ por el equipo de Sufi</strong>
  <br><br>
  <img src="src/assets/icons/sufi.png" alt="Sufi" width="100"/>
  <br>
  <sub>Encuentra tu API perfecta</sub>
</div>
