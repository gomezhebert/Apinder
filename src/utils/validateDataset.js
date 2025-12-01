/**
 * Script de validación del CSV de APIs
 * Ejecutar con: node validateDataset.js
 */

const fs = require('fs');
const path = require('path');

// Función para parsear CSV manualmente
function parseCSV(csvText) {
  const lines = csvText.split('\n').filter(line => line.trim());
  if (lines.length === 0) return [];

  const headers = lines[0].split(',').map(h => h.trim());
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const values = [];
    let currentValue = '';
    let insideQuotes = false;

    for (let j = 0; j < line.length; j++) {
      const char = line[j];

      if (char === '"') {
        insideQuotes = !insideQuotes;
      } else if (char === ',' && !insideQuotes) {
        values.push(currentValue.trim());
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    values.push(currentValue.trim());

    const row = {};
    headers.forEach((header, idx) => {
      row[header] = values[idx] || '';
    });
    data.push(row);
  }

  return data;
}

// Función principal de validación
function validateDataset(csvPath) {
  console.log('🔍 Validando dataset de APIs...\n');

  // Leer archivo
  const csvText = fs.readFileSync(csvPath, 'utf-8');
  const data = parseCSV(csvText);

  console.log(`📊 Total de registros: ${data.length}\n`);

  // Validaciones
  const validations = {
    totalRecords: data.length,
    missingFields: [],
    duplicates: {
      byApiName: [],
      byProductName: []
    },
    categories: new Set(),
    warnings: [],
    errors: []
  };

  const seenApiNames = new Map();
  const seenProductNames = new Map();

  // Validar cada registro
  data.forEach((row, index) => {
    const lineNum = index + 2; // +2 porque empezamos desde línea 1 y hay header

    // Validar campos requeridos
    if (!row['Categoría']) {
      validations.missingFields.push(`Línea ${lineNum}: Falta Categoría`);
    } else {
      validations.categories.add(row['Categoría']);
    }

    if (!row['Nombre Api']) {
      validations.errors.push(`Línea ${lineNum}: Falta Nombre Api`);
    } else {
      // Verificar duplicados por Nombre Api
      const apiName = row['Nombre Api'].toLowerCase();
      if (seenApiNames.has(apiName)) {
        validations.duplicates.byApiName.push({
          name: row['Nombre Api'],
          lines: [seenApiNames.get(apiName), lineNum]
        });
        validations.errors.push(`Línea ${lineNum}: API duplicada "${row['Nombre Api']}" (ya existe en línea ${seenApiNames.get(apiName)})`);
      } else {
        seenApiNames.set(apiName, lineNum);
      }
    }

    if (!row['Nombre producto']) {
      validations.errors.push(`Línea ${lineNum}: Falta Nombre producto`);
    } else {
      // Verificar duplicados por Nombre producto
      const productName = row['Nombre producto'].toLowerCase();
      if (seenProductNames.has(productName)) {
        validations.duplicates.byProductName.push({
          name: row['Nombre producto'],
          lines: [seenProductNames.get(productName), lineNum]
        });
        validations.warnings.push(`Línea ${lineNum}: Producto duplicado "${row['Nombre producto']}" (ya existe en línea ${seenProductNames.get(productName)})`);
      } else {
        seenProductNames.set(productName, lineNum);
      }
    }

    if (!row['Descripción']) {
      validations.warnings.push(`Línea ${lineNum}: Falta Descripción`);
    }

    if (!row['Palabras claves']) {
      validations.warnings.push(`Línea ${lineNum}: Falta Palabras claves`);
    } else {
      // Verificar que el nombre de la API esté en las palabras clave
      const keywords = row['Palabras claves'].toLowerCase();
      const apiName = (row['Nombre Api'] || '').toLowerCase();
      if (apiName && !keywords.includes(apiName)) {
        validations.warnings.push(`Línea ${lineNum}: El nombre de la API "${row['Nombre Api']}" no está en las palabras clave`);
      }
    }

    if (!row['Link']) {
      validations.warnings.push(`Línea ${lineNum}: Falta Link de documentación`);
    }
  });

  // Imprimir resultados
  console.log('📋 RESULTADOS DE VALIDACIÓN\n');
  console.log('═'.repeat(60));

  // Categorías encontradas
  console.log('\n📂 Categorías encontradas:');
  Array.from(validations.categories).sort().forEach(cat => {
    const count = data.filter(r => r['Categoría'] === cat).length;
    console.log(`  • ${cat}: ${count} APIs`);
  });

  // Errores críticos
  if (validations.errors.length > 0) {
    console.log('\n❌ ERRORES CRÍTICOS:');
    validations.errors.forEach(err => console.log(`  ${err}`));
  }

  // Advertencias
  if (validations.warnings.length > 0) {
    console.log('\n⚠️  ADVERTENCIAS:');
    validations.warnings.forEach(warn => console.log(`  ${warn}`));
  }

  // Duplicados
  if (validations.duplicates.byApiName.length > 0) {
    console.log('\n🔴 APIs DUPLICADAS:');
    validations.duplicates.byApiName.forEach(dup => {
      console.log(`  • "${dup.name}" en líneas: ${dup.lines.join(', ')}`);
    });
  }

  if (validations.duplicates.byProductName.length > 0) {
    console.log('\n🟡 PRODUCTOS DUPLICADOS:');
    validations.duplicates.byProductName.forEach(dup => {
      console.log(`  • "${dup.name}" en líneas: ${dup.lines.join(', ')}`);
    });
  }

  // Resumen final
  console.log('\n' + '═'.repeat(60));
  console.log('📊 RESUMEN:');
  console.log(`  Total de registros: ${validations.totalRecords}`);
  console.log(`  Categorías únicas: ${validations.categories.size}`);
  console.log(`  Errores críticos: ${validations.errors.length}`);
  console.log(`  Advertencias: ${validations.warnings.length}`);
  console.log(`  APIs duplicadas: ${validations.duplicates.byApiName.length}`);
  console.log(`  Productos duplicados: ${validations.duplicates.byProductName.length}`);

  const status = validations.errors.length === 0 ? '✅ VÁLIDO' : '❌ INVÁLIDO';
  console.log(`\n${status}\n`);

  return validations;
}

// Ejecutar validación
const csvPath = path.join(__dirname, '..', 'public', 'dataset.csv');
if (!fs.existsSync(csvPath)) {
  console.error('❌ No se encontró el archivo dataset.csv en public/');
  process.exit(1);
}

validateDataset(csvPath);

