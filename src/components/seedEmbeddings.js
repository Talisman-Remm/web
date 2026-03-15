// seedEmbeddings.js — Genera embeddings y los guarda en Supabase
import { supabase } from '../../lib/supabase';
import { searchData } from './searchData';

const OPENAI_API_KEY = 'TU_OPENAI_API_KEY';

async function generateEmbedding(text) {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'text-embedding-3-small',
      input: text,
    }),
  });
  const data = await response.json();
  return data.data[0].embedding;
}

export async function seedEmbeddings() {
  console.log('🚀 Iniciando seed de embeddings...');

  for (const item of searchData) {
    const text = `${item.title} ${item.description} ${item.content}`;
    const embedding = await generateEmbedding(text);

    const { error } = await supabase
      .from('search_items')
      .upsert({
        id:          item.id,
        title:       item.title,
        description: item.description,
        content:     item.content,
        category:    item.category,
        href:        item.href,
        section:     item.section,
        meta:        item.meta ?? null,
        embedding,
      });

    if (error) {
      console.error(`❌ Error en ${item.id}:`, error.message);
    } else {
      console.log(`✅ ${item.id}`);
    }
  }

  console.log('🎉 Seed completado');
}