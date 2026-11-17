# Contador GTA VI · Uruguay

Cuenta regresiva simple para el lanzamiento de GTA VI (jueves 19 de noviembre de 2026, 00:00 hora de Uruguay).
HTML, CSS y JavaScript puro. Sin dependencias, funciona offline.

## Estructura

```
gta6-contador/
├── index.html
├── manifest.webmanifest
├── sw.js
├── css/styles.css
├── js/app.js
└── icons/
```

## Cambiar la fecha

Editá el bloque `CONFIG` al principio de `js/app.js`.

## Publicar en GitHub Pages

1. Creá un repositorio nuevo en GitHub (por ejemplo `gta6-contador`).
2. Subí **el contenido** de esta carpeta a la raíz del repositorio (que `index.html` quede en la raíz).
3. En el repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, rama `main`, carpeta `/ (root)`. Guardá.
4. Esperá uno o dos minutos. La app queda en `https://TU-USUARIO.github.io/gta6-contador/`.

## Agregarla al inicio del iPhone

1. Abrí el link en **Safari**.
2. Tocá **Compartir → Agregar a pantalla de inicio**.
3. Se abre a pantalla completa, con ícono propio.

## Actualizar después de cambios

Subí el número de `CACHE_VERSION` en `sw.js` (por ejemplo de `v1` a `v2`) cada vez que cambies archivos, así el iPhone descarga la versión nueva.
