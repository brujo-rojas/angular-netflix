# Angular Netflix

Aplicación web inspirada en Netflix para buscar y gestionar películas. Construida con Angular 20.3 y Angular Material.

## Características

- **Búsqueda de películas**: Busca películas y series en Netflix
- **Lista de seguimiento**: Guarda tus películas favoritas en una lista personal
- **Detalles de película**: Visualiza información completa de cada película
- **Persistencia de estado**: Mantiene tu búsqueda actual entre sesiones
- **Diseño responsive**: Interfaz adaptable a diferentes tamaños de pantalla

## Tecnologías

- **Angular** 20.3
- **TypeScript** 5.9
- **Angular Material** 20.2
- **RxJS** 7.8
- **SCSS**

## Instalación

```bash
# Instalar dependencias
npm install

# Crear archivo de configuración
cp .env.example .env

# Editar .env con tu API Key de RapidAPI
# RAPIDAPI_KEY=tu_clave_aqui
# RAPIDAPI_HOST=netflix54.p.rapidapi.com
```

## Configuración

La aplicación usa RapidAPI para obtener información de películas. Necesitas:

1. Obtener una API Key de [RapidAPI](https://rapidapi.com)
2. Crear un archivo `.env` en la raíz del proyecto con:
   ```
   RAPIDAPI_KEY=tu_clave_aqui
   RAPIDAPI_HOST=netflix54.p.rapidapi.com
   ```

## Ejecución

```bash
# Servidor de desarrollo (http://localhost:4200)
npm start

# Build de producción
npm run build

# Ejecutar tests
npm test
```

## Estructura del Proyecto

```
src/app/
├── features/
│   ├── movie-search/    # Búsqueda de películas
│   ├── movie-detail/    # Detalles de película
│   └── watchlist/       # Lista de seguimiento
├── core/                # Servicios y lógica de negocio
└── shared/              # Componentes y utilidades compartidas
```

## Rutas

- `/search` - Búsqueda de películas (default)
- `/watchlist` - Lista de seguimiento
- `/movie/:id` - Detalles de película

## Licencia

Proyecto privado para postular a proyecto.
