# 🚀 INICIO RÁPIDO - Subir Apinder Sufi a Git

## ⚡ 5 Pasos Rápidos

### 📋 **Paso 1: Crear Repositorio en GitHub**

1. Ir a: https://github.com/new
2. Repository name: `apinder-vue`
3. Visibility: **Public** ✅
4. Clic en **"Create repository"**

---

### 💻 **Paso 2: Abrir PowerShell en la Carpeta del Proyecto**

```powershell
cd C:\Users\hebert.gomez_pragma\Desktop\Apis\Apinder\apinder-vue
```

---

### 🔧 **Paso 3: Ejecutar Comandos Git**

Copia y pega estos comandos uno por uno:

```powershell
# Inicializar Git
git init

# Agregar todos los archivos
git add .

# Primer commit
git commit -m "Initial commit - Apinder Sufi"

# Renombrar rama a main
git branch -M main

# Conectar con GitHub (REEMPLAZA TU-USUARIO)
git remote add origin https://github.com/TU-USUARIO/apinder-vue.git

# Subir código
git push -u origin main
```

**⚠️ IMPORTANTE:** Reemplaza `TU-USUARIO` con tu usuario de GitHub

**Ejemplo:**
```powershell
git remote add origin https://github.com/hebert-gomez/apinder-vue.git
```

---

### 🏗️ **Paso 4: Build y Deploy**

#### **Opción A: Automático (Recomendado)**

```powershell
npm run build
.\deploy.ps1
```

El script te pedirá la URL del repositorio:
```
https://github.com/TU-USUARIO/apinder-vue.git
```

#### **Opción B: Manual**

```powershell
# Build
npm run build

# Ir a dist
cd dist

# Inicializar git
git init
git add -A
git commit -m "deploy"

# Push a gh-pages (REEMPLAZA TU-USUARIO)
git push -f https://github.com/TU-USUARIO/apinder-vue.git main:gh-pages

# Volver
cd ..
```

---

### 🌐 **Paso 5: Activar GitHub Pages**

1. Ir al repositorio: `https://github.com/TU-USUARIO/apinder-vue`
2. Clic en **Settings** (⚙️)
3. En el menú lateral izquierdo, clic en **Pages**
4. En **Branch**, seleccionar:
   - Branch: `gh-pages` ✅
   - Folder: `/ (root)` ✅
5. Clic en **Save**

**✅ ¡Listo!**

---

## 🎉 Ver tu Proyecto Online

**URL:**
```
https://TU-USUARIO.github.io/apinder-vue/
```

**Ejemplo:**
```
https://hebert-gomez.github.io/apinder-vue/
```

**⏰ Espera:** 2-5 minutos para que GitHub procese el deploy

---

## 🔑 Si Git Pide Contraseña

Git ya no acepta contraseñas, necesitas un **Personal Access Token**:

### Crear Token:

1. GitHub → Tu perfil (esquina superior derecha) → **Settings**
2. Scroll hasta el final → **Developer settings**
3. **Personal access tokens** → **Tokens (classic)**
4. **Generate new token** → **Generate new token (classic)**
5. Configurar:
   - Note: `Apinder Deploy`
   - Expiration: `90 days`
   - Scopes: Marcar ✅ **repo** (todo)
6. **Generate token**
7. **COPIAR el token** (solo se muestra una vez)

### Usar el Token:

Cuando Git pida contraseña, pega el token en lugar de tu contraseña.

---

## 📝 Comandos Completos (Copy/Paste)

```powershell
# PASO 1: Inicializar y subir a GitHub
cd C:\Users\hebert.gomez_pragma\Desktop\Apis\Apinder\apinder-vue
git init
git add .
git commit -m "Initial commit - Apinder Sufi"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/apinder-vue.git
git push -u origin main

# PASO 2: Build y Deploy
npm run build
cd dist
git init
git add -A
git commit -m "deploy"
git push -f https://github.com/TU-USUARIO/apinder-vue.git main:gh-pages
cd ..
```

**⚠️ Reemplazar `TU-USUARIO` con tu usuario de GitHub**

---

## ✅ Verificar que Funcione

1. **Código en GitHub:**
   - Ir a: `https://github.com/TU-USUARIO/apinder-vue`
   - Debe mostrar todos los archivos del proyecto

2. **Rama gh-pages:**
   - Cambiar a rama `gh-pages` (dropdown arriba)
   - Debe tener solo archivos compilados (index.html, css, js)

3. **GitHub Pages:**
   - Settings → Pages
   - Debe mostrar: "Your site is live at..."

4. **Sitio Web:**
   - Abrir: `https://TU-USUARIO.github.io/apinder-vue/`
   - Debe cargar la página principal

---

## 🔄 Actualizar el Proyecto (Futuros Cambios)

```powershell
# 1. Hacer cambios en el código

# 2. Subir cambios a GitHub
git add .
git commit -m "Descripción de cambios"
git push origin main

# 3. Rebuild y redeploy
npm run build
.\deploy.ps1
```

---

## ❓ Problemas Comunes

### **"Permission denied"**
➜ Necesitas un Personal Access Token (ver arriba)

### **"Repository not found"**
➜ Verifica que la URL sea correcta:
```powershell
git remote -v
```

### **"Page shows 404"**
➜ Espera 5 minutos y refresca la página
➜ Verifica que `vue.config.js` tenga el publicPath correcto

### **"Estilos no cargan"**
➜ En `vue.config.js`, asegúrate que:
```javascript
publicPath: '/apinder-vue/' // Debe terminar en /
```

---

## 📞 Enlaces Útiles

**Documentación:**
- [GUIA_GIT_DEPLOY.md](./GUIA_GIT_DEPLOY.md) - Guía completa paso a paso
- [README.md](./README.md) - Documentación del proyecto

**GitHub:**
- Crear Token: https://github.com/settings/tokens
- Docs GitHub Pages: https://pages.github.com/

**Ayuda:**
- Git Basics: https://git-scm.com/book/es/v2
- Vue CLI: https://cli.vuejs.org/guide/

---

**Tiempo estimado:** 10-15 minutos  
**Dificultad:** ⭐⭐ (Fácil)  

🎯 **¡Tu proyecto estará online en minutos!**

