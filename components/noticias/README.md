# 📰 Voz del Campo - Blog de Noticias

Sistema de gestión de contenido dinámico para mantener informados a los usuarios sobre las actividades de Grupo Terminel.

## 📋 Estructura

### Páginas Creadas
- `/app/noticias/page.tsx` - Página principal del blog
- `/app/noticias/[id]/page.tsx` - Página de artículo individual (ejemplo)

### Componentes
- `/components/noticias/Hero.tsx` - Hero section con branding "Voz del Campo"
- `/components/noticias/FeaturedNews.tsx` - Artículo destacado principal
- `/components/noticias/NewsGrid.tsx` - Grid de artículos con filtros por categoría

## 🎯 Categorías de Contenido

1. **Empresa** (Principal) - Noticias corporativas, inauguraciones, certificaciones, alianzas
2. **Tendencias** - Análisis de mercado, precios internacionales, oportunidades
3. **Alertas Climáticas** - Pronósticos, recomendaciones para productores
4. **Casos de Éxito** - Historias de productores destacados

## ✨ Características

### Sistema de Filtrado
- Filtros interactivos por categoría
- Contador de artículos mostrados
- Estado "sin resultados" con opción para resetear filtro

### Tarjetas de Artículos
Cada artículo incluye:
- Icono/Imagen ilustrativa
- Badge de categoría con código de color
- Fecha de publicación
- Tiempo estimado de lectura
- Título llamativo
- Extracto del contenido
- Enlace "Leer más"

### Artículo Destacado
- Layout especial split 50/50 (imagen + contenido)
- Diseño de tarjeta grande para el artículo más reciente
- Call-to-action prominente

### Página de Artículo Individual
- Navegación de retorno
- Metadata completa (fecha, tiempo de lectura, autor)
- Botón de compartir
- Formato de blog profesional con tipografía optimizada
- Quotes destacados
- Listas y secciones bien organizadas
- CTA al final del artículo

## 📊 Artículos de Ejemplo Incluidos

1. **Inauguración Planta Los Valles** (Destacado)
   - Categoría: Empresa
   - Inversión $50M, certificación ISO 22000:2018

2. **Alianza con Asgrow**
   - Categoría: Empresa
   - Semillas premium para temporada 2026

3. **Modernización Silos Bamoa**
   - Categoría: Empresa
   - +20,000 toneladas capacidad

4. **Caso de Éxito: Don Miguel Torres**
   - Categoría: Casos de Éxito
   - Rendimiento excepcional de garbanzo

5. **Pronóstico Lluvias**
   - Categoría: Alertas Climáticas
   - Condiciones favorables para ciclo PV

6. **Precio Maíz Internacional**
   - Categoría: Tendencias
   - Análisis de mercados y oportunidades

7. **Certificación Great Place to Work**
   - Categoría: Empresa
   - Reconocimiento a cultura organizacional

## 🔄 Cómo Agregar Nuevo Contenido

### Opción 1: Modular (Recomendado para producción)
Crear un archivo JSON o base de datos con la estructura:

```typescript
interface NewsArticle {
    id: number
    title: string
    excerpt: string
    category: 'Empresa' | 'Tendencias' | 'Alertas Climáticas' | 'Casos de Éxito'
    date: string
    image: string
    readTime: string
    icon: string
    content?: string // Contenido completo del artículo
}
```

### Opción 2: Directa en Código (Actual)
Editar `/components/noticias/NewsGrid.tsx` y agregar objetos al array `articles`:

```typescript
{
    id: 8, // ID único incremental
    title: 'Título del nuevo artículo',
    excerpt: 'Resumen breve del contenido...',
    category: 'Empresa', // o cualquier otra categoría
    date: '2026-02-10', // Formato YYYY-MM-DD
    image: '/ruta/imagen.jpg',
    readTime: '4 min',
    icon: '🎉', // Emoji representativo
}
```

### Crear Página de Artículo Completo
1. Duplicar `/app/noticias/[id]/page.tsx`
2. Modificar el contenido del artículo
3. Actualizar metadata, título, extracto, y cuerpo

## 🎨 Códigos de Color por Categoría

- **Empresa**: Verde Terminel (`bg-terminel-green`)
- **Tendencias**: Azul (`bg-blue-600`)
- **Alertas Climáticas**: Naranja (`bg-orange-600`)
- **Casos de Éxito**: Púrpura (`bg-purple-600`)

## 🚀 Próximas Mejoras Sugeridas

1. **CMS Integration**: Conectar con Sanity, Strapi o Contentful
2. **Paginación**: Implementar para más de 20 artículos
3. **Búsqueda**: Agregar campo de búsqueda por texto
4. **Newsletter**: Formulario de suscripción
5. **Comentarios**: Sistema de comentarios moderados
6. **Share Social**: Integración con Facebook, Twitter, WhatsApp
7. **SEO**: Metadata dinámica por artículo
8. **Analytics**: Tracking de artículos más leídos
9. **Related Articles**: Sugerencias de artículos relacionados
10. **RSS Feed**: Para sindicación de contenido

## 📱 Responsive Design

- Mobile-first approach
- Grid adaptativo (1 col mobile, 2 tablet, 3 desktop)
- Tipografía escalable
- Imágenes responsivas
- Touch-friendly buttons

## ♿ Accesibilidad

- Contraste WCAG AA compliant
- Semantic HTML
- Alt text en imágenes
- Keyboard navigation
- Screen reader friendly

## 🔗 Navegación

El blog está accesible desde:
- Header principal: `/noticias`
- Footer (recomendado agregar)
- Homepage (recomendado agregar sección destacada)
