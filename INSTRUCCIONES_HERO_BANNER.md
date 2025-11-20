# 🖼️ Instrucciones para Actualizar Hero Banner

## Situación Actual

El componente `Hero.tsx` está usando esta imagen:
```typescript
import newHeroBanner from "figma:asset/8cb24d5ac69c65fe97935e0493f7d27cd4fea4f9.png";
```

Esta imagen está en: `src/assets/8cb24d5ac69c65fe97935e0493f7d27cd4fea4f9.png` (31.91 MB)

## Opción 1: Reemplazar la Imagen Actual (Más Rápido)

**Paso 1**: Guarda tu nueva imagen con el mismo nombre
```powershell
# Elimina la imagen antigua
Remove-Item "C:\Users\Joan Marc\Aurethicaprototipocopia\src\assets\8cb24d5ac69c65fe97935e0493f7d27cd4fea4f9.png"

# Guarda tu nueva imagen (la que me enviaste) con ese mismo nombre:
# C:\Users\Joan Marc\Aurethicaprototipocopia\src\assets\8cb24d5ac69c65fe97935e0493f7d27cd4fea4f9.png
```

**Paso 2**: Recarga la aplicación
- El cambio será automático, no necesitas modificar código
- La nueva imagen se mostrará en la página landing

---

## Opción 2: Usar Nombre Descriptivo (Recomendado)

**Paso 1**: Guarda tu imagen con nombre descriptivo
```powershell
# Guarda tu imagen como:
# C:\Users\Joan Marc\Aurethicaprototipocopia\src\assets\hero-banner.jpg
```

**Paso 2**: Actualiza Hero.tsx
Cambia la línea 6 de:
```typescript
import newHeroBanner from "figma:asset/8cb24d5ac69c65fe97935e0493f7d27cd4fea4f9.png";
```

A:
```typescript
import newHeroBanner from "../assets/hero-banner.jpg";
```

**Paso 3**: Opcionalmente, elimina la imagen antigua
```powershell
Remove-Item "C:\Users\Joan Marc\Aurethicaprototipocopia\src\assets\8cb24d5ac69c65fe97935e0493f7d27cd4fea4f9.png"
```

---

## Verificación

Después de hacer el cambio:

1. **Abre tu navegador** en http://localhost:3004/ (o el puerto que uses)
2. **Deberías ver** tu nueva imagen del hero banner con:
   - Logo Auréthica dorado brillante en el centro
   - Fondo verde/dorado suave y elegante
   - Animación sutil de zoom

3. **Verifica que**:
   - La imagen se ve nítida y bien centrada
   - El logo está visible
   - Los botones de la página funcionan correctamente

---

## 🎨 Optimización de Imagen (Opcional)

Tu imagen actual tiene un fondo hermoso, pero para web es mejor optimizarla:

**Tamaño recomendado**: 1920x1080px (Full HD)
**Formato**: JPG con calidad 80-90%
**Peso ideal**: < 500 KB

Puedes optimizarla con:
- **TinyPNG**: https://tinypng.com/
- **Squoosh**: https://squoosh.app/
- **Photoshop**: "Guardar para Web"

---

## Commit de Cambios

Una vez actualizada:
```powershell
cd "C:\Users\Joan Marc\Aurethicaprototipocopia"
git add src/assets/hero-banner.jpg src/components/Hero.tsx
git commit -m "feat: Actualizar hero banner con nueva imagen oficial Auréthica"
git push origin main
```

---

**Fecha**: 20 de noviembre de 2025
**Estado**: Esperando que guardes la nueva imagen
