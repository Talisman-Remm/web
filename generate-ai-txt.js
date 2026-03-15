const siteContent = {
  metadata: {
    title: 'Tu Título',
    description: 'Tu descripción',
    url: 'http://localhost:5173', // ⚠️ IMPORTANTE: Actualiza esto
  },
  
  // Actualiza cada sección con tu contenido real
  hero: { ... },
  puzzles: [ ... ],
  tools: { ... },
  // etc.
}

// En generateMarkdown()
function generateMarkdown() {
  // ... código existente
  
  // Agregar nueva sección
  markdown += `## ${siteContent.nuevaSeccion.title}\n\n`;
  markdown += `${siteContent.nuevaSeccion.content}\n\n`;
  markdown += `---\n\n`;
  
  return markdown;
}