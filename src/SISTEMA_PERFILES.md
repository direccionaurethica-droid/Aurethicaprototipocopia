# 👥 Sistema de Perfiles Multi-Rol - Auréthica

## 🎯 Sistema Implementado

Se ha creado un sistema completo de 3 tipos de perfiles diferenciados con sus funcionalidades y accesos específicos.

---

## 🎨 Tipos de Perfiles

### 1. 👤 **USUARIA / CLIENTA**
**Color identificativo:** Fucsia Gigi (#FF2D95)

**Acceso completo a:**
- ✅ Test de belleza y calibración Gigi
- ✅ Blog estilo Instagram
- ✅ Búsqueda de contenido
- ✅ Perfil personalizado con estilo y colorimetría
- ✅ Solicitud de agenda en salones
- ✅ Información del estilista y salón asignado
- ✅ Sistema de asesoría técnico invertido

**Funcionalidades específicas:**
- Ver su tono Gigi y perfil de belleza
- Afiliarse a salones
- Elegir corte y técnica de color
- Ver información de estilistas del salón
- Solicitar citas

### 2. ✂️ **ESTILISTA**
**Color identificativo:** Dorado (#C9A24F)

**Acceso completo a:**
- ✅ Todo lo de Usuaria (blog, búsqueda, perfil)
- ✅ Agenda personal (según permiso del salón)
- ✅ TPV para marcar servicios prestados*
- ✅ Información de usuarias (según permiso del salón)
- ✅ Técnicas necesarias para resultados elegidos
- ✅ Panel de estadísticas profesionales

**Funcionalidades específicas:**
- Ver agenda de citas asignadas
- Acceder a técnicas y procedimientos
- Marcar servicios completados
- Ver información limitada de clientas
- Estadísticas de rendimiento
- Nivel profesional (Junior/Senior/Master)

**Niveles de estilista:**
- **Junior:** En formación, acceso limitado
- **Senior:** Experiencia completa, todos los servicios
- **Master:** Experto, formador de equipo

### 3. 🏢 **EMPRESA / SALÓN**
**Color identificativo:** Verde Esmeralda (#013220)

**Acceso completo a:**
- ✅ Todo lo de Usuaria (blog, búsqueda, perfil)
- ✅ Gestión completa de clientas afiliadas
- ✅ Gestión de estilistas del salón
- ✅ Modificación de todas las citas del salón*
- ✅ Sistema de mensajes automatizados y manuales*
- ✅ Información limitada de clientas afiliadas
- ✅ Sistema de cobro TPV*
- ✅ Panel de gestión del negocio

**Funcionalidades específicas:**
- Generar afiliación de usuarias/clientas
- Modificar horas y citas del salón
- Enviar mensajes a clientas afiliadas
- Acceder a información limitada por Auréthica
- Gestionar equipo de estilistas
- Estadísticas del negocio
- Sistema de asesoría técnico invertido

**Sistema de asesoría técnico invertido:**
1. Usuaria elige corte + técnica de color
2. Sistema envía al salón las especificaciones
3. Incluye indicaciones técnicas precisas
4. Info de la clienta para asignar estilista ideal
5. Salón asigna al mejor cualificado

---

## 📋 Registro con Selector de Perfil

### Flujo de Registro Actualizado

```
1. Landing → Click "Crear cuenta"
   ↓
2. Registration Page
   ┌─────────────────────────────────┐
   │ ¿Cómo te defines?               │
   │                                 │
   │ [👤 Soy Clienta]               │
   │ Descubre tu estilo...           │
   │                                 │
   │ [✂️ Soy Estilista]             │
   │ Gestiona tu agenda...           │
   │                                 │
   │ [🏢 Soy Salón]                 │
   │ Gestiona tu negocio...          │
   └─────────────────────────────────┘
   ↓ Seleccionar tipo
   ↓
3. Formulario completo
   • Nombre + Apellido
   • Email + Teléfono
   • [Si Empresa] Nombre del salón
   • Términos + Newsletter
   ↓
4. Continuar al flujo correspondiente
```

### ProfileTypeSelector Component

**Diseño:**
- 3 cards interactivas con iconos
- Colores diferenciados por rol
- Hover effects premium
- Checkmark animado al seleccionar
- Info contextual por tipo

**Estados visuales:**
```css
No seleccionado:
  - Border sutil del color del rol
  - Background blanco
  - Icono en bg marfil
  - Hover: lift effect

Seleccionado:
  - Border intenso del color
  - Background gradient 10% opacity
  - Icono en gradiente full color
  - Checkmark animado
  - Scale 1.02
```

---

## 🎭 Vistas de Perfil Diferenciadas

### Vista Usuaria

```
┌────────────────────────────────────┐
│ Mi Perfil                          │
│ Tu espacio personal en Auréthica   │
├────────────────────────────────────┤
│                                    │
│  ┌──────┐  Ana Martínez           │
│  │ Avatar│  👤 Clienta             │
│  └──────┘  ana@example.com         │
│            +34 654 321 098         │
│            Desde Octubre 2025      │
│                                    │
├────────────────────────────────────┤
│ 💗 Tu Tono Gigi                   │
│ ━━━━━━━━━━━━━━━━━━━                │
│ Equilibrado                        │
│ Gigi adapta su comunicación...    │
├────────────────────────────────────┤
│ 🎨 Tu Perfil de Belleza           │
│ ━━━━━━━━━━━━━━━━━━━                │
│ Estilo: Natural y sofisticado     │
│ Colorimetría: Primavera cálida    │
│                                    │
│ Preferencias:                      │
│ [Balayage] [Cortes modernos]      │
│ [Colores cálidos]...               │
├────────────────────────────────────┤
│ 🏢 Tu Salón (si afiliada)         │
│ ━━━━━━━━━━━━━━━━━━━                │
│ Salón Auréthica Madrid Centro     │
│ [Solicitar cita] [Ver estilistas] │
└────────────────────────────────────┘
```

### Vista Estilista

```
┌────────────────────────────────────┐
│ Mi Perfil                          │
│ Panel profesional de estilista     │
├────────────────────────────────────┤
│                                    │
│  ┌──────┐  Marta López             │
│  │ Avatar│  ✂️ Estilista           │
│  └──────┘  🏢 Salón Madrid        │
│            🏅 Estilista Senior     │
│            marta@example.com       │
│                                    │
├────────────────────────────────────┤
│ 📊 Estadísticas                   │
│ ━━━━━━━━━━━━━━━━━━━                │
│ ┌────────┐ ┌────────┐ ┌────────┐  │
│ │ 24     │ │ 4.9    │ │ 342    │  │
│ │Clientas│ │Rating  │ │Servs.  │  │
│ └────────┘ └────────┘ └────────┘  │
├────────────────────────────────────┤
│ 🎯 Accesos Rápidos                │
│ ━━━━━━━━━━━━━━━━━━━                │
│ [📅 Mi Agenda]  [💼 Técnicas]    │
│                                    │
│ * Sistema técnico en interfaz      │
│   de gestión separada              │
├────────────────────────────────────┤
│ ✨ Especialidades                 │
│ ━━━━━━━━━━━━━━━━━━━                │
│ [Técnicas de color avanzadas]      │
│ [Cortes de precisión]...           │
└────────────────────────────────────┘
```

### Vista Empresa/Salón

```
┌────────────────────────────────────┐
│ Mi Perfil                          │
│ Panel de gestión del salón         │
├────────────────────────────────────┤
│                                    │
│  ┌──────┐  Auréthica Madrid Centro│
│  │ Avatar│  🏢 Salón               │
│  └──────┘  salon@example.com      │
│            +34 910 123 456         │
│            Desde Marzo 2024        │
│                                    │
├────────────────────────────────────┤
│ 📊 Estadísticas del Salón         │
│ ━━━━━━━━━━━━━━━━━━━                │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐│
│ │ 156  │ │ 8    │ │ 42   │ │ 4.8  ││
│ │Client│ │Estil.│ │Citas │ │Rating││
│ └──────┘ └──────┘ └──────┘ └──────┘│
├────────────────────────────────────┤
│ 🎯 Panel de Gestión               │
│ ━━━━━━━━━━━━━━━━━━━                │
│ [📅 Agenda]  [👥 Clientas]        │
│ [✂️ Estilistas]                   │
│                                    │
│ * TPV y gestión avanzada en        │
│   interfaz separada                │
├────────────────────────────────────┤
│ ✨ Servicios Destacados           │
│ ━━━━━━━━━━━━━━━━━━━                │
│ [Atención personalizada]           │
│ [Tecnología avanzada]...           │
└────────────────────────────────────┘
```

---

## 🔐 Usuarios de Prueba

### Usuarias/Clientas

```
Email: ana.martinez@example.com
Password: 123456
Rol: Usuaria
Estilo: Natural y sofisticado
Salón: Auréthica Madrid Centro
```

```
Email: lucia.fernandez@example.com
Password: 123456
Rol: Usuaria
Estilo: Audaz y creativo
Salón: Auréthica Barcelona Gótico
```

```
Email: sofia.garcia@example.com
Password: 123456
Rol: Usuaria
Estilo: Clásico y elegante
Salón: Sin afiliar
```

### Estilistas

```
Email: marta.lopez@aurethica.com
Password: 123456
Rol: Estilista
Nivel: Senior
Salón: Auréthica Madrid Centro
```

```
Email: carlos.ruiz@aurethica.com
Password: 123456
Rol: Estilista
Nivel: Master
Salón: Auréthica Barcelona Gótico
```

### Empresas/Salones

```
Email: salon.madrid@aurethica.com
Password: 123456
Rol: Empresa
Salón: Auréthica Madrid Centro
Clientas: 156 afiliadas
Estilistas: 8 activos
```

```
Email: salon.barcelona@aurethica.com
Password: 123456
Rol: Empresa
Salón: Auréthica Barcelona Gótico
Clientas: 142 afiliadas
Estilistas: 6 activos
```

---

## 💼 Matriz de Accesos

| Funcionalidad | Usuaria | Estilista | Empresa |
|--------------|---------|-----------|---------|
| **Blog Feed** | ✅ | ✅ | ✅ |
| **Búsqueda** | ✅ | ✅ | ✅ |
| **Perfil personal** | ✅ | ✅ | ✅ |
| **Test de belleza** | ✅ | ✅ | ✅ |
| **Calibración Gigi** | ✅ | ✅ | ✅ |
| **Solicitar citas** | ✅ | ❌ | ❌ |
| **Ver agenda propia** | ✅ Prox | ✅ Si permitido* | ✅ Completa* |
| **Modificar citas** | ❌ | ❌ | ✅ Todas* |
| **Ver técnicas** | ❌ | ✅ | ✅ |
| **TPV servicios** | ❌ | ✅ Marcar* | ✅ Completo* |
| **Gestión clientas** | ❌ | ❌ | ✅ |
| **Gestión estilistas** | ❌ | ❌ | ✅ |
| **Mensajes automatizados** | ❌ | ❌ | ✅* |
| **Sistema asesoría** | ✅ Elegir | ✅ Ejecutar | ✅ Asignar* |

**Nota:** Los items marcados con * están en interfaz de gestión separada

---

## 🎨 Diseño Premium por Rol

### Paleta de Colores

```css
Usuaria:
  Primary: #FF2D95 (Fucsia Gigi)
  Secondary: #ff5db1
  Gradient: from-[#FF2D95] to-[#ff5db1]
  Icon: User
  
Estilista:
  Primary: #C9A24F (Dorado)
  Secondary: #d4b366
  Gradient: from-[#C9A24F] to-[#d4b366]
  Icon: Scissors
  
Empresa:
  Primary: #013220 (Verde Esmeralda)
  Secondary: #0a4a30
  Gradient: from-[#013220] to-[#0a4a30]
  Icon: Building2
```

### Badges de Rol

**Usuaria:**
```tsx
<Badge className="bg-gradient-to-r from-[#FF2D95] to-[#ff5db1] text-white">
  <User className="w-3 h-3" />
  Clienta
</Badge>
```

**Estilista Senior:**
```tsx
<Badge className="bg-gradient-to-r from-[#C9A24F] to-[#d4b366] text-white">
  <Scissors className="w-3 h-3" />
  Estilista
</Badge>
<Badge variant="outline" className="border-[#C9A24F] text-[#C9A24F]">
  <Award className="w-3 h-3 mr-1" />
  Senior
</Badge>
```

**Empresa:**
```tsx
<Badge className="bg-gradient-to-r from-[#013220] to-[#0a4a30] text-white">
  <Building2 className="w-3 h-3" />
  Salón
</Badge>
```

---

## 🔄 Flujo de Experiencia

### Usuaria Nueva

```
1. Registro → Selecciona "Soy Clienta"
2. Completa datos personales
3. Calibración Gigi (5 preguntas)
4. Test Auréthica (preguntas ropa)
5. Subida de avatar (10 fotos)
6. App Mode con perfil de belleza
7. Puede buscar y afiliarse a salón
8. Solicitar citas en salón afiliado
```

### Estilista Nuevo

```
1. Registro → Selecciona "Soy Estilista"
2. Completa datos + salón asignado
3. Calibración Gigi
4. Test Auréthica
5. Subida avatar profesional
6. App Mode con panel de estilista
7. Acceso a agenda (si salón permite)
8. Acceso a técnicas y procedimientos
```

### Salón Nuevo

```
1. Registro → Selecciona "Soy Salón"
2. Completa datos + nombre del salón
3. Calibración Gigi (enfoque negocio)
4. Test Auréthica
5. Subida de fotos del salón
6. App Mode con panel de gestión
7. Configurar equipo de estilistas
8. Gestionar clientas y citas
```

---

## 📊 Sistema de Permisos (Futura implementación)

### Niveles de Permiso del Salón

**Completo:**
- Acceso total a agenda
- Ver toda info de clientas
- Modificar cualquier servicio

**Limitado:**
- Solo sus citas asignadas
- Info básica de clientas
- Marcar sus servicios

**Restringido:**
- Solo ver su agenda
- Sin modificar servicios
- Sin ver info clientas

---

## 🎯 Funcionalidades Destacadas

### Sistema de Asesoría Técnico Invertido

**Flujo:**
```
1. Usuaria en su perfil:
   └─ Elige corte deseado
   └─ Elige técnica de color

2. Sistema genera ficha técnica:
   └─ Especificaciones del corte
   └─ Fórmula y técnica de color
   └─ Tiempo estimado
   └─ Productos necesarios
   └─ Info de la clienta (perfil belleza)

3. Se envía al salón afiliado:
   └─ Salón recibe solicitud
   └─ Analiza técnicas necesarias
   └─ Asigna estilista mejor cualificado
   └─ Confirma cita con presupuesto

4. Estilista recibe:
   └─ Ficha técnica completa
   └─ Perfil de belleza de clienta
   └─ Productos a usar
   └─ Pasos a seguir
```

**Ventajas:**
- Cliente controla resultado deseado
- Salón asigna estilista ideal
- Estilista recibe guía completa
- Menos margen de error
- Experiencia personalizada total

---

## 📁 Archivos Creados/Modificados

### Nuevos Archivos

1. **`/components/ProfileTypeSelector.tsx`** (185 líneas)
   - Selector de 3 tipos de perfil
   - Diseño premium con animaciones
   - Info contextual por rol

2. **`/lib/mock/mockUsers.ts`** (actualizado, 360 líneas)
   - 3 usuarias de prueba
   - 2 estilistas de prueba
   - 2 salones de prueba
   - Funciones de consulta por rol

3. **`/components/UserProfile.tsx`** (actualizado, 650 líneas)
   - Vista específica para usuaria
   - Vista específica para estilista
   - Vista específica para empresa
   - Estadísticas diferenciadas

### Archivos Modificados

1. **`/lib/types/index.ts`**
   - Añadido: `UserRole` type
   - Añadido: `SalonPermissionLevel` type
   - Actualizado: `RegistrationData` interface
   - Actualizado: `UserData` interface
   - Añadido: `SalonData`, `StylistData`, `ClientData` interfaces

2. **`/components/Registration.tsx`**
   - Integrado: `ProfileTypeSelector`
   - Añadido: Campo apellido
   - Añadido: Campo nombre del salón (empresas)
   - Actualizado: Validación por tipo de perfil

3. **`/App.tsx`**
   - Actualizado: `userData` para incluir `userRole`
   - Añadido: Manejo de datos de salón y estilista

---

## ✅ Testing Checklist

### Registro

- [ ] Registro como Usuaria
- [ ] Registro como Estilista
- [ ] Registro como Empresa
- [ ] Campo "Nombre del salón" solo aparece para Empresa
- [ ] Validación correcta por tipo

### Login

- [ ] Login como ana.martinez@example.com (Usuaria)
- [ ] Login como marta.lopez@aurethica.com (Estilista)
- [ ] Login como salon.madrid@aurethica.com (Empresa)

### Vista de Perfil Usuaria

- [ ] Badge "Clienta" visible
- [ ] Sección "Tu Tono Gigi" visible
- [ ] Sección "Tu Perfil de Belleza" visible
- [ ] Sección "Tu Salón" visible (si afiliada)
- [ ] Botones "Solicitar cita" y "Ver estilistas" funcionales

### Vista de Perfil Estilista

- [ ] Badge "Estilista" visible
- [ ] Badge de nivel (Junior/Senior/Master) visible
- [ ] Estadísticas (Clientas, Rating, Servicios) visibles
- [ ] Accesos rápidos (Agenda, Técnicas) visibles
- [ ] Sección "Especialidades" visible
- [ ] Nota sobre interfaz separada visible

### Vista de Perfil Empresa

- [ ] Badge "Salón" visible
- [ ] Estadísticas (Clientas, Estilistas, Citas, Rating) visibles
- [ ] Panel de gestión visible
- [ ] Botones (Agenda, Clientas, Estilistas) visibles
- [ ] Sección "Servicios Destacados" visible
- [ ] Nota sobre TPV en interfaz separada visible

---

## 🎉 Conclusión

Se ha implementado un **sistema completo de perfiles multi-rol** con:

✅ **3 tipos de perfil** claramente diferenciados  
✅ **Selector premium** en registro  
✅ **Vistas de perfil específicas** por rol  
✅ **7 usuarios de prueba** (3 usuarias, 2 estilistas, 2 salones)  
✅ **Matriz de accesos** documentada  
✅ **Sistema de asesoría** técnico invertido diseñado  
✅ **Preparado para interfaz de gestión** separada  

**Resultado:** Sistema profesional escalable listo para conectar con interfaz de TPV/Agenda/Gestión.

---

**Implementado:** 2 de noviembre de 2025  
**Diseñador:** Sistema Premium Auréthica  
**Estado:** ✅ Completado y documentado  
**Nota:** Sistema técnico (TPV, Agenda, Mensajes) en interfaz separada como solicitado
