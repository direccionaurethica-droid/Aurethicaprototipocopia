# 🏗️ Arquitectura de Vistas Profesionales

## 📊 Diagrama de Componentes

```
┌─────────────────────────────────────────────────────────────┐
│                         App.tsx                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              userData (con userRole)                 │   │
│  └────────────────────────┬────────────────────────────┘   │
│                           ↓                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                  AppModePage                         │   │
│  │                                                      │   │
│  │  ┌────────────────────────────────────────────┐    │   │
│  │  │       NavigationBarApp                     │    │   │
│  │  │  (recibe userRole)                         │    │   │
│  │  │                                            │    │   │
│  │  │  Filtra pestañas según permisos:          │    │   │
│  │  │                                            │    │   │
│  │  │  Usuaria:   Blog | Buscar | Perfil        │    │   │
│  │  │  Estilista: + Agenda + Stats              │    │   │
│  │  │  Empresa:   + Clientas + Estilistas       │    │   │
│  │  └────────────────────────────────────────────┘    │   │
│  │                           ↓                         │   │
│  │  ┌────────────────────────────────────────────┐    │   │
│  │  │        AnimatePresence Router              │    │   │
│  │  │                                            │    │   │
│  │  │  ┌──────────┐  ┌──────────┐  ┌─────────┐ │    │   │
│  │  │  │BlogSection│  │SearchView│  │UserProf │ │    │   │
│  │  │  └──────────┘  └──────────┘  └─────────┘ │    │   │
│  │  │                                            │    │   │
│  │  │  ┌──────────┐  ┌──────────┐               │    │   │
│  │  │  │AgendaView│  │EstadView │ (Profesional) │    │   │
│  │  │  └──────────┘  └──────────┘               │    │   │
│  │  │                                            │    │   │
│  │  │  ┌──────────┐  ┌──────────┐               │    │   │
│  │  │  │Clientas  │  │Estilistas│ (Solo Empresa)│    │   │
│  │  │  └──────────┘  └──────────┘               │    │   │
│  │  └────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔐 Sistema de Permisos

### Arquitectura de Roles

```typescript
// lib/types/index.ts
export type UserRole = 'usuaria' | 'estilista' | 'empresa';

// NavigationBarApp.tsx
const baseNavItems = [
  { id: 'search', roles: ['usuaria', 'estilista', 'empresa'] },
  { id: 'blog', roles: ['usuaria', 'estilista', 'empresa'] },
  { id: 'profile', roles: ['usuaria', 'estilista', 'empresa'] }
];

const professionalNavItems = [
  { id: 'agenda', roles: ['estilista', 'empresa'] },
  { id: 'estadisticas', roles: ['estilista', 'empresa'] },
  { id: 'clientas', roles: ['empresa'] },
  { id: 'estilistas', roles: ['empresa'] }
];

// Filtrado automático
const navItems = [...baseNavItems, ...professionalNavItems]
  .filter(item => item.roles.includes(userRole));
```

### Flujo de Datos

```
User Login
    ↓
mockUsers.ts → authenticateUser()
    ↓
Devuelve MockUser con userRole
    ↓
App.tsx → construye userData
    ↓
userData.userRole pasado a AppModePage
    ↓
AppModePage → pasa userRole a NavigationBarApp
    ↓
NavigationBarApp → filtra pestañas
    ↓
Usuario ve solo sus vistas permitidas
```

---

## 📁 Estructura de Archivos

```
/components/
├── NavigationBarApp.tsx     # Navegación dinámica
│   └── export type AppViewType
│
├── AgendaView.tsx           # Vista de agenda
│   ├── Props: userRole, stylistName
│   └── ShadCN Calendar integrado
│
├── ClientasView.tsx         # Gestión clientas
│   ├── Solo Empresa
│   └── Búsqueda + Filtros
│
├── EstadisticasView.tsx     # Stats profesionales
│   ├── Props: userRole, stylistLevel
│   └── Diferenciado por rol
│
├── EstilistasView.tsx       # Gestión equipo
│   ├── Solo Empresa
│   └── Niveles profesionales
│
└── ui/
    └── progress.tsx         # Barra progreso (nuevo)

/pages/
└── AppModePage.tsx          # Router principal
    ├── Recibe userData
    ├── Pasa userRole a Nav
    └── Renderiza vista actual

/lib/
├── types/
│   └── index.ts
│       ├── UserRole
│       └── AppViewType (en NavigationBarApp)
│
└── mock/
    └── mockUsers.ts
        ├── MockUser con userRole
        └── authenticateUser()
```

---

## 🔄 Flujo de Navegación

### Desktop (> 1024px)

```
┌────────────────────────────────────────────────────┐
│  [Logo]  [Buscar] [Blog] [Perfil]  [Gigi] [Theme] │ ← Top Bar
└────────────────────────────────────────────────────┘
                        ↓
┌────────────────────────────────────────────────────┐
│                                                    │
│             Contenido de la Vista                  │
│                                                    │
│  (Blog / Search / Profile / Agenda / etc.)         │
│                                                    │
└────────────────────────────────────────────────────┘
```

### Mobile (< 768px)

```
┌────────────────────────────────────────────────────┐
│                                                    │
│             Contenido de la Vista                  │
│                                                    │
│  (Blog / Search / Profile / Agenda / etc.)         │
│                                                    │
└────────────────────────────────────────────────────┘
                        ↓
┌────────────────────────────────────────────────────┐
│  [Buscar] [Blog] [Perfil] [Agenda] [Stats] [Gigi] │ ← Bottom Bar
└────────────────────────────────────────────────────┘
```

---

## 🎨 Sistema de Vistas

### Vista Base (Todos los Roles)

```typescript
interface BaseView {
  Blog: {
    component: BlogSection
    permissions: ['usuaria', 'estilista', 'empresa']
    icon: Sparkles
    color: '#013220'
  }
  Search: {
    component: SearchView
    permissions: ['usuaria', 'estilista', 'empresa']
    icon: Search
    color: '#C9A24F'
  }
  Profile: {
    component: UserProfile
    permissions: ['usuaria', 'estilista', 'empresa']
    icon: User
    color: '#6E7276'
  }
}
```

### Vistas Profesionales

```typescript
interface ProfessionalViews {
  Agenda: {
    component: AgendaView
    permissions: ['estilista', 'empresa']
    icon: Calendar
    color: '#C9A24F'
    props: { userRole, stylistName }
  }
  Estadisticas: {
    component: EstadisticasView
    permissions: ['estilista', 'empresa']
    icon: BarChart3
    color: '#FF2D95'
    props: { userRole, stylistLevel }
  }
  Clientas: {
    component: ClientasView
    permissions: ['empresa']
    icon: Users
    color: '#013220'
  }
  Estilistas: {
    component: EstilistasView
    permissions: ['empresa']
    icon: Scissors
    color: '#C9A24F'
  }
}
```

---

## 🎯 Props Flow

### AgendaView

```typescript
AppModePage
  ↓ userRole
  ↓ stylistName (desde userData.name)
  ↓
AgendaView
  ├── Renderiza calendario
  ├── Muestra citas según userRole
  ├── Si empresa: muestra estilista por cita
  └── Si estilista: solo sus citas
```

### ClientasView

```typescript
AppModePage
  ↓ (solo si userRole === 'empresa')
  ↓
ClientasView
  ├── Lista todas las clientas
  ├── Búsqueda + filtros
  ├── Stats globales
  └── Acciones de gestión
```

### EstadisticasView

```typescript
AppModePage
  ↓ userRole
  ↓ stylistLevel (si es estilista)
  ↓
EstadisticasView
  ├── Si estilista: stats individuales + badge nivel
  ├── Si empresa: stats globales
  ├── Servicios top
  ├── Metas
  └── Insights
```

### EstilistasView

```typescript
AppModePage
  ↓ (solo si userRole === 'empresa')
  ↓
EstilistasView
  ├── Lista del equipo
  ├── Info por estilista
  ├── Stats del equipo
  └── Acciones de gestión
```

---

## 🔀 State Management

### Global State (App.tsx)

```typescript
const [authenticatedUser, setAuthenticatedUser] = useState<MockUser | null>(null);

const userData = authenticatedUser ? {
  name: ...,
  email: ...,
  userRole: authenticatedUser.userRole,        // ← Usado para permisos
  stylistLevel: authenticatedUser.stylistLevel, // ← Para badge
  salonName: authenticatedUser.salonName,       // ← Para contexto
  ...
} : {...};
```

### Page State (AppModePage)

```typescript
const [currentView, setCurrentView] = useState<AppViewType>('blog');

const userRole = userData?.userRole || 'usuaria';
const stylistName = userData?.name;
const stylistLevel = userData?.stylistLevel;
```

### Component State (cada vista)

```typescript
// AgendaView
const [selectedDate, setSelectedDate] = useState<Date>(new Date());
const [viewMode, setViewMode] = useState<'day' | 'week'>('day');

// ClientasView
const [searchQuery, setSearchQuery] = useState('');
const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
```

---

## 🎨 Design Tokens por Vista

### Agenda

```css
--agenda-bg: #F5F2E9;           /* Fondo marfil */
--agenda-card: #FFFFFF;          /* Cards blancas */
--agenda-primary: #C9A24F;       /* Dorado */
--agenda-secondary: #013220;     /* Verde */

/* Estados */
--pending: #C9A24F;
--confirmed: #013220;
--completed: #10b981;
--cancelled: #ef4444;
```

### Clientas

```css
--clientas-bg: #F5F2E9;
--clientas-card: #FFFFFF;
--clientas-primary: #013220;     /* Verde empresa */
--clientas-accent: #FF2D95;      /* Fucsia */

/* Estados */
--active: #10b981;
--inactive: #6E7276;
```

### Estadísticas

```css
--stats-bg: #F5F2E9;
--stats-card: #FFFFFF;
--stats-success: #10b981;
--stats-warning: #C9A24F;
--stats-info: #FF2D95;
--stats-primary: #013220;
```

### Estilistas

```css
--estilistas-bg: #F5F2E9;
--estilistas-card: #FFFFFF;
--estilistas-primary: #013220;

/* Niveles */
--junior: #6E7276;
--senior: #C9A24F;
--master: #013220;
```

---

## 🔧 Componentes Compartidos

### ShadCN Components Usados

```typescript
// Todos usan:
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

// AgendaView usa:
import { Calendar } from './ui/calendar';

// ClientasView usa:
import { Input } from './ui/input';

// EstadisticasView usa:
import { Progress } from './ui/progress';  // ← Nuevo
```

### Lucide Icons

```typescript
// Navegación
import { Search, Sparkles, User, Calendar, BarChart3, Users, Scissors } from 'lucide-react';

// Acciones
import { Plus, Edit2, Settings, Filter } from 'lucide-react';

// Estados
import { CheckCircle, XCircle, Clock, Star, Award } from 'lucide-react';

// Contacto
import { Mail, Phone } from 'lucide-react';

// Métricas
import { TrendingUp, DollarSign, Target } from 'lucide-react';
```

---

## 🚀 Performance

### Code Splitting

```typescript
// Lazy loading automático por vista
const AgendaView = lazy(() => import('./components/AgendaView'));
const ClientasView = lazy(() => import('./components/ClientasView'));
// etc.
```

### Transiciones Optimizadas

```typescript
// Motion config compartido
const pageTransition = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
};
```

### Render Optimization

```typescript
// Componentes memoizados
const MemoizedCard = memo(BlogCard);

// Callbacks estables
const handleViewChange = useCallback((view: AppViewType) => {
  setCurrentView(view);
}, []);
```

---

## 📊 Data Flow

### Mock Data → UI

```
/lib/mock/mockUsers.ts
  ↓
  MockUser con userRole
  ↓
App.tsx → userData con userRole
  ↓
AppModePage → recibe userData
  ↓
  ├→ NavigationBarApp (userRole)
  │   └→ Filtra pestañas
  │
  ├→ AgendaView (userRole, stylistName)
  │   └→ Mock appointments
  │
  ├→ ClientasView
  │   └→ Mock clients
  │
  ├→ EstadisticasView (userRole, stylistLevel)
  │   └→ Mock stats
  │
  └→ EstilistasView
      └→ Mock stylists
```

### Future: Supabase → UI

```
Supabase Database
  ↓ API calls
  ↓
Real-time data
  ↓
  ├→ AgendaView (real appointments)
  ├→ ClientasView (real clients)
  ├→ EstadisticasView (real stats)
  └→ EstilistasView (real team)
```

---

## ✅ Testing Points

### Unit Tests

```typescript
// NavigationBarApp
- ✓ Filtra items según userRole
- ✓ Muestra 3 items para usuaria
- ✓ Muestra 5 items para estilista
- ✓ Muestra 7 items para empresa

// AgendaView
- ✓ Renderiza calendario
- ✓ Muestra citas correctamente
- ✓ Acciones según userRole

// ClientasView
- ✓ Solo visible para empresa
- ✓ Búsqueda funciona
- ✓ Filtros funcionan

// EstadisticasView
- ✓ Stats diferenciadas por rol
- ✓ Badge de nivel para estilistas
- ✓ Metas con progreso

// EstilistasView
- ✓ Solo visible para empresa
- ✓ Niveles correctamente coloreados
- ✓ Stats del equipo
```

### Integration Tests

```typescript
- ✓ Login → Ver vistas según rol
- ✓ Cambio de vista preserva estado
- ✓ Navegación responsive mobile/desktop
- ✓ Transiciones suaves
- ✓ Props correctamente pasadas
```

---

## 🎉 Resumen Arquitectónico

### Principios Aplicados

1. **Single Responsibility**
   - Cada vista = 1 responsabilidad
   - Componentes pequeños y enfocados

2. **DRY (Don't Repeat Yourself)**
   - Componentes UI reutilizados
   - Transiciones compartidas
   - Design tokens unificados

3. **Open/Closed**
   - Fácil añadir nuevas vistas
   - Sistema de permisos extensible

4. **Dependency Inversion**
   - Vistas no dependen de implementación
   - Props tipadas e interfaces claras

5. **Separation of Concerns**
   - UI / Lógica / Datos separados
   - State management claro

---

**Documentado:** 2 de noviembre de 2025  
**Arquitecto:** Sistema Premium Auréthica  
**Estado:** ✅ Producción Ready
