/**
 * Aurebesh Dictionary
 * Contains English words and their Aurebesh translations for practice.
 * 
 * This dictionary maps English words to their Aurebesh equivalents.
 * The Aurebesh characters are stored as Unicode text that can be displayed
 * with the Aurebesh.otf font.
 */

export interface WordPair {
  english: string;
  aurebesh: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

/**
 * Basic Aurebesh character mappings
 * These map to regular ASCII letters (a-z) which the Aurebesh font will render as Aurebesh characters
 * Most Aurebesh fonts replace the standard Latin alphabet with Aurebesh glyphs
 */
export const aurebeshAlphabet: Record<string, string> = {
  'a': 'a',    // Aurek
  'b': 'b',    // Besh
  'c': 'c',    // Cresh
  'd': 'd',    // Dorn
  'e': 'e',    // Esk
  'f': 'f',    // Forn
  'g': 'g',    // Grek
  'h': 'h',    // Herf
  'i': 'i',    // Isk
  'j': 'j',    // Jenth
  'k': 'k',    // Krill
  'l': 'l',    // Leth
  'm': 'm',    // Mern
  'n': 'n',    // Nern
  'o': 'o',    // Osk
  'p': 'p',    // Peth
  'q': 'q',    // Qek
  'r': 'r',    // Resh
  's': 's',    // Senth
  't': 't',    // Trill
  'u': 'u',    // Usk
  'v': 'v',    // Vev
  'w': 'w',    // Wesk
  'x': 'x',    // Xesh
  'y': 'y',    // Yirt
  'z': 'z',    // Zerek
};

/**
 * Basic word dictionary for learning Aurebesh.
 * Start with simple, common words and expand gradually.
 */
export const wordDictionary: WordPair[] = [
  // Easy words (3-4 letters)
  { english: 'cat', aurebesh: 'cat', difficulty: 'easy', category: 'animals' },
  { english: 'dog', aurebesh: 'dog', difficulty: 'easy', category: 'animals' },
  { english: 'sun', aurebesh: 'sun', difficulty: 'easy', category: 'nature' },
  { english: 'moon', aurebesh: 'moon', difficulty: 'easy', category: 'nature' },
  { english: 'book', aurebesh: 'book', difficulty: 'easy', category: 'objects' },
  { english: 'fire', aurebesh: 'fire', difficulty: 'easy', category: 'elements' },
  { english: 'love', aurebesh: 'love', difficulty: 'easy', category: 'emotions' },
  { english: 'hope', aurebesh: 'hope', difficulty: 'easy', category: 'emotions' },
  { english: 'home', aurebesh: 'home', difficulty: 'easy', category: 'places' },
  { english: 'blue', aurebesh: 'blue', difficulty: 'easy', category: 'colors' },
  
  // Medium words (5-6 letters)
  { english: 'force', aurebesh: 'force', difficulty: 'medium', category: 'star wars' },
  { english: 'peace', aurebesh: 'peace', difficulty: 'medium', category: 'concepts' },
  { english: 'light', aurebesh: 'light', difficulty: 'medium', category: 'concepts' },
  { english: 'power', aurebesh: 'power', difficulty: 'medium', category: 'concepts' },
  { english: 'water', aurebesh: 'water', difficulty: 'medium', category: 'elements' },
  { english: 'wisdom', aurebesh: 'wisdom', difficulty: 'medium', category: 'concepts' },
  { english: 'friend', aurebesh: 'friend', difficulty: 'medium', category: 'relationships' },
  { english: 'galaxy', aurebesh: 'galaxy', difficulty: 'medium', category: 'space' },
  { english: 'planet', aurebesh: 'planet', difficulty: 'medium', category: 'space' },
  { english: 'temple', aurebesh: 'temple', difficulty: 'medium', category: 'places' },
  
  // Hard words (7+ letters)
  { english: 'republic', aurebesh: 'republic', difficulty: 'hard', category: 'star wars' },
  { english: 'rebellion', aurebesh: 'rebellion', difficulty: 'hard', category: 'star wars' },
  { english: 'knowledge', aurebesh: 'knowledge', difficulty: 'hard', category: 'concepts' },
  { english: 'adventure', aurebesh: 'adventure', difficulty: 'hard', category: 'concepts' },
  { english: 'challenge', aurebesh: 'challenge', difficulty: 'hard', category: 'concepts' },
];

/**
 * Get a random word from the dictionary based on difficulty level
 * @param difficulty - The difficulty level to filter by (optional)
 * @returns A random word pair from the dictionary
 */
export const getRandomWord = (difficulty?: 'easy' | 'medium' | 'hard'): WordPair => {
  let filteredWords = wordDictionary;
  
  if (difficulty) {
    filteredWords = wordDictionary.filter(word => word.difficulty === difficulty);
  }
  
  const randomIndex = Math.floor(Math.random() * filteredWords.length);
  return filteredWords[randomIndex];
};

/**
 * Get words by category
 * @param category - The category to filter by
 * @returns Array of word pairs in the specified category
 */
export const getWordsByCategory = (category: string): WordPair[] => {
  return wordDictionary.filter(word => word.category === category);
};

/**
 * Get all available categories
 * @returns Array of unique category names
 */
export const getCategories = (): string[] => {
  const categories = wordDictionary.map(word => word.category);
  return [...new Set(categories)];
};

/**
 * Convert English text to Aurebesh using the character mappings
 * This transliterates English characters to their Aurebesh equivalents
 * @param englishText - The English text to convert
 * @returns The Aurebesh equivalent using proper Unicode characters
 */
export const translateToAurebesh = (englishText: string): string => {
  return englishText
    .toLowerCase()
    .split('')
    .map(char => {
      if (char === ' ') return ' ';
      return aurebeshAlphabet[char] || char;
    })
    .join('');
};
