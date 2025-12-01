/**
 * Servicio de búsqueda y filtrado de APIs
 * Proporciona funciones para buscar APIs por diferentes criterios
 */

/**
 * Busca APIs por un término de búsqueda en múltiples campos
 * @param {Array} apis - Array de objetos API
 * @param {String} searchTerm - Término de búsqueda
 * @returns {Array} APIs filtradas
 */
export function searchApis(apis, searchTerm) {
  if (!searchTerm || !searchTerm.trim()) return apis;

  const term = searchTerm.trim().toLowerCase();
  const searchWords = term.split(/\s+/).filter(Boolean);

  return apis.filter(api => {
    const searchableText = [
      api.categoria || '',
      api.nombreApi || '',
      api.nombreEspanol || '',
      api.nombreIngles || '',
      api.descripcion || '',
      api.palabrasClave || ''
    ].join(' ').toLowerCase();

    // Match si todas las palabras están presentes
    return searchWords.every(word => searchableText.includes(word));
  });
}

/**
 * Filtra APIs por categoría
 * @param {Array} apis - Array de objetos API
 * @param {String} categoria - Categoría a filtrar
 * @returns {Array} APIs filtradas
 */
export function filterByCategory(apis, categoria) {
  if (!categoria) return apis;
  return apis.filter(api => api.categoria === categoria);
}

/**
 * Filtra APIs por nombre de producto
 * @param {Array} apis - Array de objetos API
 * @param {String} nombreProducto - Nombre del producto a buscar
 * @returns {Array} APIs filtradas
 */
export function filterByProductName(apis, nombreProducto) {
  if (!nombreProducto) return apis;
  const term = nombreProducto.toLowerCase();
  return apis.filter(api =>
    (api.nombreEspanol || '').toLowerCase().includes(term) ||
    (api.nombreIngles || '').toLowerCase().includes(term)
  );
}

/**
 * Filtra APIs por nombre de API
 * @param {Array} apis - Array de objetos API
 * @param {String} nombreApi - Nombre de la API a buscar
 * @returns {Array} APIs filtradas
 */
export function filterByApiName(apis, nombreApi) {
  if (!nombreApi) return apis;
  const term = nombreApi.toLowerCase();
  return apis.filter(api =>
    (api.nombreApi || '').toLowerCase().includes(term)
  );
}

/**
 * Busca APIs por palabras clave
 * @param {Array} apis - Array de objetos API
 * @param {String|Array} palabrasClave - Palabra(s) clave a buscar
 * @returns {Array} APIs filtradas
 */
export function searchByKeywords(apis, palabrasClave) {
  if (!palabrasClave) return apis;

  const keywords = Array.isArray(palabrasClave)
    ? palabrasClave
    : [palabrasClave];

  return apis.filter(api => {
    const apiKeywords = (api.palabrasClave || '').toLowerCase();
    return keywords.some(kw => apiKeywords.includes(kw.toLowerCase()));
  });
}

/**
 * Busca APIs por descripción
 * @param {Array} apis - Array de objetos API
 * @param {String} descripcion - Término a buscar en la descripción
 * @returns {Array} APIs filtradas
 */
export function searchByDescription(apis, descripcion) {
  if (!descripcion) return apis;
  const term = descripcion.toLowerCase();
  return apis.filter(api =>
    (api.descripcion || '').toLowerCase().includes(term)
  );
}

/**
 * Filtra APIs que tienen link de documentación
 * @param {Array} apis - Array de objetos API
 * @param {Boolean} hasLink - Si true, retorna solo APIs con link
 * @returns {Array} APIs filtradas
 */
export function filterByLink(apis, hasLink = true) {
  return apis.filter(api => hasLink ? !!api.link : !api.link);
}

/**
 * Obtiene todas las categorías únicas de las APIs
 * @param {Array} apis - Array de objetos API
 * @returns {Array} Array de categorías únicas ordenadas
 */
export function getUniqueCategories(apis) {
  const categories = new Set();
  apis.forEach(api => {
    if (api.categoria) categories.add(api.categoria);
  });
  return Array.from(categories).sort();
}

/**
 * Obtiene todas las palabras clave únicas de las APIs
 * @param {Array} apis - Array de objetos API
 * @param {Number} limit - Límite de palabras clave a retornar (opcional)
 * @returns {Array} Array de palabras clave únicas
 */
export function getUniqueKeywords(apis, limit = null) {
  const keywordsSet = new Set();
  apis.forEach(api => {
    if (api.palabrasClave) {
      const keywords = api.palabrasClave.split(',').map(k => k.trim()).filter(Boolean);
      keywords.forEach(kw => keywordsSet.add(kw));
    }
  });
  const allKeywords = Array.from(keywordsSet).sort();
  return limit ? allKeywords.slice(0, limit) : allKeywords;
}

/**
 * Ordena APIs por un campo específico
 * @param {Array} apis - Array de objetos API
 * @param {String} field - Campo por el cual ordenar
 * @param {String} direction - 'asc' o 'desc'
 * @returns {Array} APIs ordenadas
 */
export function sortApis(apis, field, direction = 'asc') {
  const dir = direction === 'asc' ? 1 : -1;

  return [...apis].sort((a, b) => {
    let valA = '';
    let valB = '';

    switch(field) {
      case 'nombreApi':
        valA = (a.nombreApi || '').toLowerCase();
        valB = (b.nombreApi || '').toLowerCase();
        break;
      case 'nombre':
      case 'nombreEspanol':
        valA = (a.nombreEspanol || a.nombreIngles || '').toLowerCase();
        valB = (b.nombreEspanol || b.nombreIngles || '').toLowerCase();
        break;
      case 'categoria':
        valA = (a.categoria || '').toLowerCase();
        valB = (b.categoria || '').toLowerCase();
        break;
      case 'descripcion':
        valA = (a.descripcion || '').toLowerCase();
        valB = (b.descripcion || '').toLowerCase();
        break;
      default:
        valA = (a[field] || '').toString().toLowerCase();
        valB = (b[field] || '').toString().toLowerCase();
    }

    if (valA === valB) return 0;
    return valA > valB ? dir : -dir;
  });
}

/**
 * Aplica múltiples filtros de forma combinada
 * @param {Array} apis - Array de objetos API
 * @param {Object} filters - Objeto con los filtros a aplicar
 * @returns {Array} APIs filtradas
 */
export function applyMultipleFilters(apis, filters = {}) {
  let result = [...apis];

  if (filters.searchTerm) {
    result = searchApis(result, filters.searchTerm);
  }

  if (filters.categoria) {
    result = filterByCategory(result, filters.categoria);
  }

  if (filters.nombreApi) {
    result = filterByApiName(result, filters.nombreApi);
  }

  if (filters.nombreProducto) {
    result = filterByProductName(result, filters.nombreProducto);
  }

  if (filters.palabrasClave) {
    result = searchByKeywords(result, filters.palabrasClave);
  }

  if (filters.descripcion) {
    result = searchByDescription(result, filters.descripcion);
  }

  if (filters.hasLink !== undefined) {
    result = filterByLink(result, filters.hasLink);
  }

  if (filters.sortField) {
    result = sortApis(result, filters.sortField, filters.sortDirection || 'asc');
  }

  return result;
}

/**
 * Valida que no haya productos repetidos
 * @param {Array} apis - Array de objetos API
 * @returns {Object} Objeto con información sobre duplicados
 */
export function findDuplicates(apis) {
  const seenByApiName = new Map();
  const seenByProductName = new Map();
  const duplicates = {
    byApiName: [],
    byProductName: [],
    hasDuplicates: false
  };

  apis.forEach((api, index) => {
    // Verificar duplicados por nombreApi
    if (api.nombreApi) {
      const key = api.nombreApi.toLowerCase();
      if (seenByApiName.has(key)) {
        duplicates.byApiName.push({
          apiName: api.nombreApi,
          indices: [seenByApiName.get(key), index]
        });
        duplicates.hasDuplicates = true;
      } else {
        seenByApiName.set(key, index);
      }
    }

    // Verificar duplicados por nombreEspanol
    const productName = api.nombreEspanol || api.nombreIngles;
    if (productName) {
      const key = productName.toLowerCase();
      if (seenByProductName.has(key)) {
        duplicates.byProductName.push({
          productName: productName,
          indices: [seenByProductName.get(key), index]
        });
        duplicates.hasDuplicates = true;
      } else {
        seenByProductName.set(key, index);
      }
    }
  });

  return duplicates;
}

/**
 * Elimina APIs duplicadas basándose en el nombre de API
 * @param {Array} apis - Array de objetos API
 * @returns {Array} APIs sin duplicados
 */
export function removeDuplicates(apis) {
  const seen = new Set();
  return apis.filter(api => {
    if (!api.nombreApi) return true;
    const key = api.nombreApi.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export default {
  searchApis,
  filterByCategory,
  filterByProductName,
  filterByApiName,
  searchByKeywords,
  searchByDescription,
  filterByLink,
  getUniqueCategories,
  getUniqueKeywords,
  sortApis,
  applyMultipleFilters,
  findDuplicates,
  removeDuplicates
};

