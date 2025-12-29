import { Question, ParseResult } from '../types';

/**
 * Preprocesses markdown to ensure standard LaTeX delimiters
 */
function preprocessMarkdown(markdown: string): string {
  return markdown
    // Convert \[ ... \] to $$ ... $$ (Display Math)
    // Matches literal \[ and \] which act as display math delimiters
    .replace(/\\\[(.*?)\\\]/gs, '$$$$$1$$$$')
    // Convert \( ... \) to $ ... $ (Inline Math)
    // Matches literal \( and \)
    .replace(/\\\((.*?)\\\)/g, '$$$1$$')
    // Pad single $ to ensure they are detected as math, avoiding things like $x$e
    // But avoid double $$ which are display math
    .replace(/(?<!\\|\$)\$(?!\$)/g, ' $$ ')
    // Normalize spacing inside single $ (inline math)
    .replace(/(?<!\$)\$\s+([^$]+?)\s+\$(?!\$)/g, ' $$ $1 $$ ');
}

/**
 * Creates a URL-friendly slug from text
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')  // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '')      // Keep alphanumeric + spaces/hyphens
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 80);
}

/**
 * Parses the full markdown content into structured Question objects.
 */
export function parseQuestions(markdownContent: string): ParseResult {
  const processed = preprocessMarkdown(markdownContent);
  
  // Split by headings level 4 or 5 (#### or #####)
  // We use a capture group to keep the delimiter logic if needed, but split mostly discards it.
  // We need to look ahead for the next heading or end of file.
  
  // Strategy: Split by line starts with ####
  const rawBlocks = processed.split(/^#{4,5}\s/gm);
  
  // The first block is usually empty or preamble before the first question
  const questions: Question[] = [];
  let globalCount = 0;
  
  // Skip the first empty split if it exists (usually index 0 is empty string if file starts with ####)
  const blocksToProcess = rawBlocks[0].trim() === '' ? rawBlocks.slice(1) : rawBlocks;

  blocksToProcess.forEach((block, index) => {
    if (!block.trim()) return;

    // Extract Title (first line)
    const lines = block.split('\n');
    const titleRaw = lines[0].trim();
    const contentRaw = lines.slice(1).join('\n').trim();

    // Separate Question and Solution
    // Look for > Risposta:, > Risposte:, or > #### Risposte:
    // We allow optional heading markers inside the blockquote start
    const solutionMatch = contentRaw.match(/^>\s*(#{1,6}\s*)?Rispost[ae]:/m);
    
    let questionBody = contentRaw;
    let solutionBody = '';

    if (solutionMatch && solutionMatch.index !== undefined) {
      questionBody = contentRaw.substring(0, solutionMatch.index).trim();
      
      const rawSolutionPart = contentRaw.substring(solutionMatch.index).trim();
      
      // Remove the specific "Risposta/e" header line first
      // This handles "> Risposta:", "> #### Risposte:", etc.
      const solutionLines = rawSolutionPart.split('\n');
      
      // Remove the first line (the header)
      // Then process the rest to remove blockquote markers
      solutionBody = solutionLines.slice(1)
        .map(line => line.replace(/^>\s?/, ''))
        .join('\n')
        .trim();
    }

    globalCount++;
    const slug = slugify(titleRaw) || `question-${globalCount}`;
    
    // Ensure unique slug
    let finalSlug = slug;
    let suffix = 2;
    while (questions.some(q => q.slug === finalSlug)) {
      finalSlug = `${slug}-${suffix}`;
      suffix++;
    }

    questions.push({
      id: `q-${globalCount}`,
      slug: finalSlug,
      number: globalCount,
      title: titleRaw,
      rawQuestion: questionBody,
      rawSolution: solutionBody
    });
  });

  return {
    questions,
    totalCount: questions.length
  };
}