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
 * These are the fundamental letters used to build words
 */
export const aurebeshAlphabet: Record<string, string> = {
  'a': 'aurek',     // 𝔞
  'b': 'besh',      // 𝔟
  'c': 'cresh',     // 𝔠
  'd': 'dorn',      // 𝔡
  'e': 'esk',       // 𝔢
  'f': 'forn',      // 𝔣
  'g': 'grek',      // 𝔤
  'h': 'herf',      // 𝔥
  'i': 'isk',       // 𝔦
  'j': 'jenth',     // 𝔧
  'k': 'krill',     // 𝔨
  'l': 'leth',      // 𝔩
  'm': 'mern',      // 𝔪
  'n': 'nern',      // 𝔫
  'o': 'osk',       // 𝔬
  'p': 'peth',      // 𝔭
  'q': 'qek',       // 𝔮
  'r': 'resh',      // 𝔯
  's': 'senth',     // 𝔰
  't': 'trill',     // 𝔱
  'u': 'usk',       // 𝔲
  'v': 'vev',       // 𝔳
  'w': 'wesk',      // 𝔴
  'x': 'xesh',      // 𝔵
  'y': 'yirt',      // 𝔶
  'z': 'zerek',     // 𝔷
};

/**
 * Basic word dictionary for learning Aurebesh.
 * Start with simple, common words and expand gradually.
 */
export const wordDictionary: WordPair[] = [
  // Easy words (3-4 letters)
  { english: 'cat', aurebesh: '𝔠𝔞𝔱', difficulty: 'easy', category: 'animals' },
  { english: 'dog', aurebesh: '𝔡𝔬𝔤', difficulty: 'easy', category: 'animals' },
  { english: 'sun', aurebesh: '𝔰𝔲𝔫', difficulty: 'easy', category: 'nature' },
  { english: 'moon', aurebesh: '𝔪𝔬𝔬𝔫', difficulty: 'easy', category: 'nature' },
  { english: 'book', aurebesh: '𝔟𝔬𝔬𝔨', difficulty: 'easy', category: 'objects' },
  { english: 'fire', aurebesh: '𝔣𝔦𝔯𝔢', difficulty: 'easy', category: 'elements' },
  { english: 'love', aurebesh: '𝔩𝔬𝔳𝔢', difficulty: 'easy', category: 'emotions' },
  { english: 'hope', aurebesh: '𝔥𝔬𝔭𝔢', difficulty: 'easy', category: 'emotions' },
  { english: 'home', aurebesh: '𝔥𝔬𝔪𝔢', difficulty: 'easy', category: 'places' },
  { english: 'blue', aurebesh: '𝔟𝔩𝔲𝔢', difficulty: 'easy', category: 'colors' },
  
  // Medium words (5-6 letters)
  { english: 'force', aurebesh: '𝔣𝔬𝔯𝔠𝔢', difficulty: 'medium', category: 'star wars' },
  { english: 'peace', aurebesh: '𝔭𝔢𝔞𝔠𝔢', difficulty: 'medium', category: 'concepts' },
  { english: 'light', aurebesh: '𝔩𝔦𝔤𝔥𝔱', difficulty: 'medium', category: 'concepts' },
  { english: 'power', aurebesh: '𝔭𝔬𝔴𝔢𝔯', difficulty: 'medium', category: 'concepts' },
  { english: 'water', aurebesh: '𝔴𝔞𝔱𝔢𝔯', difficulty: 'medium', category: 'elements' },
  { english: 'wisdom', aurebesh: '𝔴𝔦𝔰𝔡𝔬𝔪', difficulty: 'medium', category: 'concepts' },
  { english: 'friend', aurebesh: '𝔣𝔯𝔦𝔢𝔫𝔡', difficulty: 'medium', category: 'relationships' },
  { english: 'galaxy', aurebesh: '𝔤𝔞𝔩𝔞𝔵𝔶', difficulty: 'medium', category: 'space' },
  { english: 'planet', aurebesh: '𝔭𝔩𝔞𝔫𝔢𝔱', difficulty: 'medium', category: 'space' },
  { english: 'temple', aurebesh: '𝔱𝔢𝔪𝔭𝔩𝔢', difficulty: 'medium', category: 'places' },
  
  // Hard words (7+ letters)
  { english: 'republic', aurebesh: '𝔯𝔢𝔭𝔲𝔟𝔩𝔦𝔠', difficulty: 'hard', category: 'star wars' },
  { english: 'rebellion', aurebesh: '𝔯𝔢𝔟𝔢𝔩𝔩𝔦𝔬𝔫', difficulty: 'hard', category: 'star wars' },
  { english: 'knowledge', aurebesh: '𝔨𝔫𝔬𝔴𝔩𝔢𝔡𝔤𝔢', difficulty: 'hard', category: 'concepts' },
  { english: 'adventure', aurebesh: '𝔞𝔡𝔳𝔢𝔫𝔱𝔲𝔯𝔢', difficulty: 'hard', category: 'concepts' },
  { english: 'challenge', aurebesh: '𝔠𝔥𝔞𝔩𝔩𝔢𝔫𝔤𝔢', difficulty: 'hard', category: 'concepts' },
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
 * This is a simple transliteration function
 * @param englishText - The English text to convert
 * @returns The Aurebesh equivalent
 */
export const translateToAurebesh = (englishText: string): string => {
  return englishText
    .toLowerCase()
    .split('')
    .map(char => {
      if (char === ' ') return ' ';
      if (char in aurebeshAlphabet) {
        // For now, we'll use placeholder characters until we have proper Aurebesh font mapping
        const index = char.charCodeAt(0) - 97; // a=0, b=1, etc.
        return String.fromCharCode(0x1D51E + index); // Mathematical script letters as placeholder
      }
      return char;
    })
    .join('');
};
