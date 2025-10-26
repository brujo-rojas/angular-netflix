const fs = require('fs');
const path = require('path');

// Leer el archivo .env
const envPath = path.join(__dirname, '.env');
let envContent = {};

if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  envFile.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      envContent[key.trim()] = value.trim();
    }
  });
}

// Generar environment.ts con valores del .env
const environmentContent = `// Este archivo se genera automáticamente desde .env
// Para cambiar la configuración, edita el archivo .env en la raíz del proyecto

export const environment = {
  production: false,
  useRealApi: true,
  apiConfig: {
    rapidApiKey: '${envContent.RAPIDAPI_KEY || ''}',
    rapidApiHost: '${envContent.RAPIDAPI_HOST || 'netflix54.p.rapidapi.com'}',
    rapidApiUrl: 'https://${envContent.RAPIDAPI_HOST || 'netflix54.p.rapidapi.com'}/search/'
  }
};`;

// Escribir el archivo
fs.writeFileSync(path.join(__dirname, 'src/environments/environment.ts'), environmentContent);

console.log('✅ Environment file generated from .env');
console.log('📁 API Key:', envContent.RAPIDAPI_KEY ? '***' + envContent.RAPIDAPI_KEY.slice(-4) : 'Not found');
console.log('🌐 API Host:', envContent.RAPIDAPI_HOST || 'netflix54.p.rapidapi.com');
