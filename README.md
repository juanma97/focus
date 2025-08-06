# PomodoroFocus

Una aplicación de productividad moderna para desarrolladores que combina la técnica Pomodoro con un modo de concentración sin límites de tiempo.

## 🚀 Características

- **Pomodoro Mode**: Temporizador configurable con ciclos de trabajo y descanso
- **Focus Mode**: Modo de concentración sin límites de tiempo con fondo animado
- **Reproductor de Sonidos**: Ruido blanco, marrón y rosa para mejorar la concentración
- **Diseño Moderno**: Interfaz limpia y minimalista con animaciones CSS puras
- **Responsive**: Optimizado para móvil y escritorio
- **Sin Dependencias Externas**: Solo React, TypeScript y TailwindCSS

## 🛠️ Tecnologías

- **Vite** - Build tool rápido
- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **TailwindCSS** - Framework de CSS utility-first
- **CSS Animations** - Animaciones nativas sin librerías

## 📦 Instalación

1. Clona el repositorio:

```bash
git clone <tu-repositorio>
cd pomodoro-focus
```

2. Instala las dependencias:

```bash
npm install
```

3. Agrega los archivos de sonido:

   - Ve a `public/sounds/`
   - Agrega los archivos: `white-noise.mp3`, `brown-noise.mp3`, `pink-noise.mp3`
   - Consulta el README en esa carpeta para más detalles

4. Inicia el servidor de desarrollo:

```bash
npm run dev
```

5. Abre [http://localhost:5173](http://localhost:5173) en tu navegador

## 🎨 Paleta de Colores

- **Fondo principal**: `#1E1E2F`
- **Color acento**: `#FF6B6B`
- **Texto principal**: `#FAFAFA`
- **Fondo del timer**: `#2E2E3E`

## 📱 Uso

### Pomodoro Mode

- Configura la duración de trabajo y descanso
- Usa el temporizador visual con progreso circular
- El temporizador cambia automáticamente entre trabajo y descanso

### Focus Mode

- Modo de concentración sin límites de tiempo
- Fondo animado con partículas y gradientes
- Ideal para sesiones de trabajo prolongadas

### Reproductor de Sonidos

- Tres tipos de ruido: blanco, marrón y rosa
- Control de volumen
- Reproducción en loop automática

## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   ├── PomodoroTimer.tsx    # Temporizador Pomodoro
│   ├── FocusMode.tsx        # Modo de concentración
│   └── SoundPlayer.tsx      # Reproductor de sonidos
├── App.tsx                  # Componente principal
├── main.tsx                 # Punto de entrada
└── index.css               # Estilos globales
```

## 🚀 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run preview` - Vista previa del build
- `npm run lint` - Linting del código

## 📄 Licencia

MIT License - Libre para uso personal y comercial

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerencias y mejoras.
