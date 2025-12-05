# ALBA: Ecosistema Profesional de Auréthica
## Plan Funcional Estratégico

**Estado:** Propuesta Inicial
**Objetivo:** Proveer a Salones y Estilistas (Freelance) de una suite de gestión inteligente, minimalista y lujosa.
**Filosofía:** Mientras *Gigi* asesora a la clienta, *Alba* gestiona el negocio.

---

## 1. Arquitectura de Identidad (Onboarding & Perfil)

El primer contacto debe ser tan premium como el de las clientas, pero enfocado en la validación profesional.

### A. Validación de Credenciales
*   **Verificación de Identidad:** Subida de documentos (DNI/CIF) y Certificados Profesionales.
*   **Portafolio Visual:** Grid estilo "Instagram" pero curado, sincronizado con el `StyleCatalog`.
*   **Niveles de Profesional:**
    *   *Artist* (Freelance)
    *   *Studio* (Salón Pequeño)
    *   *Maison* (Cadena/Franquicia)

### B. Configuración de Servicios (Service Menu)
*   **Menú Interactivo:** Creación de servicios con precios, duración y "Gasto de Producto" estimado.
*   **Tags de Especialidad:** (Ej: "Especialista en Balayage", "Corte en Seco") que mejoran el SEO interno en el buscador de clientas.

---

## 2. Command Center (Dashboard Operativo)

La pantalla principal al abrir la app en "Modo Pro".

### A. Resumen del Día (The Daily Brief)
*   **Vista Minimalista:** Próxima cita, huecos libres críticos, y facturación actual del día.
*   **Alertas Inteligentes (Alba AI):**
    *   "María (16:00) suele llegar 10min tarde."
    *   "Te queda poco tinte 7.1 para la cita de mañana."

### B. Métricas en Tiempo Real
*   Gráficos de línea fina (Dorado sobre Negro) mostrando:
    *   Ingresos vs Objetivo.
    *   Tasa de Retención de Clientas.
    *   Ticket Medio.

---

## 3. Agenda Inteligente & Flow

No una agenda tradicional, sino un gestor de flujo de trabajo.

### A. Gestión de Citas
*   **Drag & Drop:** Reagendar citas arrastrando bloques.
*   **Bloqueo de Tiempos:** "Tiempo Creativo", "Descanso", "Gestión".
*   **Lista de Espera Automática:** Si se cancela una cita, Alba notifica automáticamente a clientas interesadas en ese hueco.

### B. Sincronización Externa
*   Integración bidireccional con Google Calendar / iCloud Calendar para evitar conflictos personales.

---

## 4. Client Intelligence (Conexión con Gigi)

Aquí es donde Auréthica se diferencia. El estilista ve lo que la clienta ha trabajado con Gigi.

### A. Ficha Técnica Digital (The Beauty Record)
*   Historial de servicios realizados.
*   **Acceso al "Test de Gigi":** Ver la colorimetría, forma de rostro y preferencias de la clienta (previa autorización).
*   **Notas Privadas:** "Prefiere el café sin azúcar", "Cuero cabelludo sensible".

### B. Simulador Pre-Cita
*   Posibilidad de ver el avatar de la clienta con los estilos que ella ha guardado en su wishlist.

---

## 5. Suite Financiera & Marketing

### A. Control de Caja
*   Registro rápido de pagos (Efectivo, Tarjeta, App).
*   Generación automática de tickets/facturas simplificadas.

### B. Campañas "Flash"
*   Herramienta para llenar huecos vacíos: "Enviar oferta del 20% para mañana a las 11:00 a clientas que no han venido en 2 meses".

---

## 6. Hoja de Ruta de Implementación (Roadmap)

### Fase 1: Core (Actual)
- [x] Login/Registro diferenciado (`SalonRegistration`, `StylistRegistration`).
- [x] Vistas base (`AgendaView`, `ClientasView`, `EstadisticasView`).
- [ ] Edición de Perfil Profesional completo.

### Fase 2: Operativa (Próxima)
- [ ] CRUD de Citas (Crear, Leer, Actualizar, Borrar).
- [ ] Ficha de Clienta detallada.
- [ ] Configuración de Catálogo de Servicios.

### Fase 3: Inteligencia (Alba + Gigi)
- [ ] Algoritmo de emparejamiento (Matchmaking Clienta-Estilista).
- [ ] Notificaciones Push inteligentes.

---

## Notas Técnicas
*   **Frontend:** Reutilizar componentes UI existentes pero con variaciones más densas (más información por pixel) para el panel de control.
*   **Datos:** Estrictamente segregados. Una clienta debe autorizar explícitamente que un salón vea sus datos de "Gigi".
