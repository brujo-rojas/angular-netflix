const fs = require('fs');
const path = require('path');

// Leer variables de entorno del sistema (Netlify) o del archivo .env
let envContent = {};

// Primero intentar leer desde variables de entorno del sistema
if (process.env.RAPIDAPI_KEY) {
  envContent.RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
}
if (process.env.RAPIDAPI_HOST) {
  envContent.RAPIDAPI_HOST = process.env.RAPIDAPI_HOST;
}

// Si no están disponibles, intentar leer del archivo .env local
if (!envContent.RAPIDAPI_KEY || !envContent.RAPIDAPI_HOST) {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        envContent[key.trim()] = value.trim();
      }
    });
  }
}

// Determinar si es producción (Netlify) o desarrollo
const isProduction = process.env.CONTEXT === 'production' || process.env.NETLIFY === 'true';

// Generar environment.ts con valores del .env
const environmentContent = `// Este archivo se genera automáticamente desde .env
// Para cambiar la configuración, edita las variables de entorno en Netlify o el archivo .env local

export const environment = {
  production: ${isProduction},
  useRealApi: true,
  apiConfig: {
    rapidApiKey: '${envContent.RAPIDAPI_KEY || ''}',
    rapidApiHost: '${envContent.RAPIDAPI_HOST || 'netflix54.p.rapidapi.com'}',
    rapidApiUrl: 'https://${envContent.RAPIDAPI_HOST || 'netflix54.p.rapidapi.com'}/search/'
  }
};`;

// Escribir el archivo
fs.writeFileSync(path.join(__dirname, 'src/environments/environment.ts'), environmentContent);

console.log('✅ Environment file generated');
console.log('📁 Production mode:', isProduction);
console.log('🔑 API Key:', envContent.RAPIDAPI_KEY ? '***' + envContent.RAPIDAPI_KEY.slice(-4) : '❌ NOT FOUND');
console.log('🌐 API Host:', envContent.RAPIDAPI_HOST || 'netflix54.p.rapidapi.com');
console.log('📦 Source:', process.env.RAPIDAPI_KEY ? 'Environment variables' : 'Local .env file');
