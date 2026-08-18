## 🚀 Instalación y Ejecución en Local

Sigue estos pasos para clonar el repositorio, instalar las dependencias necesarias y lanzar las pruebas en tu máquina:

### 1. Clonar el repositorio
Abre tu terminal y clona el proyecto con el siguiente comando:
```bash
git clone https://github.com
```
*(Nota: Recuerda situarte dentro de la carpeta del proyecto antes de continuar: `cd TU_REPOSITORIO`)*

### 2. Instalar las dependencias y Playwright
Este comando leerá el archivo `package.json` e instalará de golpe todas las librerías necesarias del proyecto (incluyendo Playwright y las herramientas de desarrollo):
```bash
npm install
```

### 3. Instalar los navegadores de Playwright
Es necesario descargar los binarios de los navegadores controlados (Chromium, Firefox, WebKit) que utiliza Playwright internamente para correr los tests:
```bash
npx playwright install
```

### 4. Ejecutar las pruebas
Para lanzar los 3 ejercicios y ver visualmente en tu pantalla cómo interactúa el robot con el navegador (modo encabezado / headed), ejecuta:
```bash
npx playwright test --headed
```
