# 🎬 Explorador de Películas

Proyecto Programado 2 — Programación para Dispositivos Móviles (TPA-4001)

App móvil desarrollada con React Native (Expo) que consume la API de **The Movie Database (TMDB)** para mostrar películas populares, y permite guardar/eliminar favoritos usando almacenamiento local persistente.

## Características

- Consumo de API REST (TMDB) con manejo de estados de carga y error
- Lista de películas populares con póster, título y calificación
- Guardar y eliminar películas favoritas (persistencia local con AsyncStorage)
- Pantalla dedicada para ver la lista de favoritos guardados
- Estado global compartido entre pantallas con Context API

## Arquitectura
peliculas-app/
├── app/ # Pantallas y navegación (Expo Router)
│ └── (tabs)/
│ ├── index.tsx # Pantalla principal: lista de populares
│ └── explore.tsx # Pantalla de favoritos
├── services/ # Lógica de red y almacenamiento local
│ ├── tmdbApi.ts # Consumo de la API de TMDB
│ └── favoritesStorage.ts # Lectura/escritura en AsyncStorage
├── context/
│ └── FavoritesContext.tsx # Estado global de favoritos (Context API)


## Cómo correr el proyecto

1. Clonar el repositorio:
```bash
   git clone https://github.com/dannyromans13/peliculas-app.git
   cd peliculas-app
```

2. Instalar dependencias:
```bash
   npm install
```

3. Crear un archivo `.env` en la raíz (usa `.env.example` como plantilla) con tu propia API key de TMDB:
EXPO_PUBLIC_TMDB_API_KEY=tu_clave_aqui

   Puedes obtener una clave gratuita en [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api).

4. Iniciar el proyecto:
```bash
   npx expo start
```

5. Presiona `a` para abrir en un emulador Android, o escanea el QR con la app Expo Go en tu celular.

## Tecnologías

- React Native + Expo (SDK 54)
- TypeScript
- Expo Router
- AsyncStorage
- API de TMDB

## Autor

Danny Romans — Proyecto académico, TEC.