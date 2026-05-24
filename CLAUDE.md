# CLAUDE.md - FoodStore Frontend Context & Guidelines

Este archivo proporciona el contexto técnico, las restricciones de la cátedra y las directrices de codificación indispensables para el CLI de Claude. La IA debe respetar estrictamente estas reglas al generar o modificar código.

---

## 🚨 REQUERIMIENTOS OBLIGATORIOS (CÁTEDRA)
Cualquier cambio en el código debe mantener funcionales estas 7 configuraciones:
1. **Tailwind CSS:** Debe estar operativo a nivel global. `src/App.tsx` DEBE contener al menos una clase testigo de Tailwind (ej: `className="text-3xl font-bold text-indigo-600"`).
2. **React Query:** El `QueryClient` y `QueryClientProvider` deben envolver la app en `src/main.tsx`.
3. **React Router DOM:** Definir al menos una ruta por módulo/pantalla principal.
4. **Zustand:** Crear al menos un store global con persistencia local (`useCartStore`).
5. **Axios:** Instancia base configurada obligatoriamente usando `import.meta.env.VITE_API_URL`.
6. **Variables de Entorno:** Mantener actualizado el archivo `.env.example` con `VITE_API_URL`.
7. **Diseño No Bloqueante:** Toda la aplicación frontend debe ser de acceso 100% público.

---

## 🛠️ Stack Tecnológico Autorizado

- **Core:** Vite + React + TypeScript (Strict Mode)
- **Estilos:** Tailwind CSS (Mobile-first, utilitario, responsive nativo)
- **Rutas:** React Router DOM (Estructura de URLs limpias)
- **Estado Servidor:** TanStack Query (React Query) + Axios
- **Estado Cliente:** Zustand + Middleware `persist` (Persistencia en localStorage)
- **Formularios:** React Hook Form o TanStack Form (Validación estricta para checkout/cupones)

