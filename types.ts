export interface Question {
  id: string;              // e.g., "q-1"
  slug: string;            // e.g., "dato-il-seguente-tableau"
  number: number;          // Sequential number
  title: string;           // Plain text title
  rawQuestion: string;     // Original markdown for body
  rawSolution: string;     // Original markdown for solution
}

export interface ParseResult {
  questions: Question[];
  totalCount: number;
}