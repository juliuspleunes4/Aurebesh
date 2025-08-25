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
 * Comprehensive word collection across multiple categories and difficulty levels.
 * This collection will be expanded over time with more words and categories.
 */
export const wordDictionary: WordPair[] = [
  // ========== EASY WORDS (3-4 letters) ==========
  
  // Animals
  { english: 'cat', aurebesh: 'cat', difficulty: 'easy', category: 'animals' },
  { english: 'dog', aurebesh: 'dog', difficulty: 'easy', category: 'animals' },
  { english: 'fox', aurebesh: 'fox', difficulty: 'easy', category: 'animals' },
  { english: 'pig', aurebesh: 'pig', difficulty: 'easy', category: 'animals' },
  { english: 'cow', aurebesh: 'cow', difficulty: 'easy', category: 'animals' },
  { english: 'bee', aurebesh: 'bee', difficulty: 'easy', category: 'animals' },
  { english: 'ant', aurebesh: 'ant', difficulty: 'easy', category: 'animals' },
  { english: 'owl', aurebesh: 'owl', difficulty: 'easy', category: 'animals' },
  { english: 'rat', aurebesh: 'rat', difficulty: 'easy', category: 'animals' },
  { english: 'bat', aurebesh: 'bat', difficulty: 'easy', category: 'animals' },
  { english: 'fish', aurebesh: 'fish', difficulty: 'easy', category: 'animals' },
  { english: 'bird', aurebesh: 'bird', difficulty: 'easy', category: 'animals' },
  { english: 'bear', aurebesh: 'bear', difficulty: 'easy', category: 'animals' },
  { english: 'deer', aurebesh: 'deer', difficulty: 'easy', category: 'animals' },
  { english: 'frog', aurebesh: 'frog', difficulty: 'easy', category: 'animals' },
  
  // Nature
  { english: 'sun', aurebesh: 'sun', difficulty: 'easy', category: 'nature' },
  { english: 'moon', aurebesh: 'moon', difficulty: 'easy', category: 'nature' },
  { english: 'star', aurebesh: 'star', difficulty: 'easy', category: 'nature' },
  { english: 'tree', aurebesh: 'tree', difficulty: 'easy', category: 'nature' },
  { english: 'rock', aurebesh: 'rock', difficulty: 'easy', category: 'nature' },
  { english: 'wind', aurebesh: 'wind', difficulty: 'easy', category: 'nature' },
  { english: 'snow', aurebesh: 'snow', difficulty: 'easy', category: 'nature' },
  { english: 'rain', aurebesh: 'rain', difficulty: 'easy', category: 'nature' },
  { english: 'leaf', aurebesh: 'leaf', difficulty: 'easy', category: 'nature' },
  { english: 'seed', aurebesh: 'seed', difficulty: 'easy', category: 'nature' },
  { english: 'sand', aurebesh: 'sand', difficulty: 'easy', category: 'nature' },
  { english: 'cave', aurebesh: 'cave', difficulty: 'easy', category: 'nature' },
  { english: 'lake', aurebesh: 'lake', difficulty: 'easy', category: 'nature' },
  { english: 'hill', aurebesh: 'hill', difficulty: 'easy', category: 'nature' },
  { english: 'sky', aurebesh: 'sky', difficulty: 'easy', category: 'nature' },
  
  // Objects
  { english: 'book', aurebesh: 'book', difficulty: 'easy', category: 'objects' },
  { english: 'cup', aurebesh: 'cup', difficulty: 'easy', category: 'objects' },
  { english: 'ball', aurebesh: 'ball', difficulty: 'easy', category: 'objects' },
  { english: 'pen', aurebesh: 'pen', difficulty: 'easy', category: 'objects' },
  { english: 'box', aurebesh: 'box', difficulty: 'easy', category: 'objects' },
  { english: 'key', aurebesh: 'key', difficulty: 'easy', category: 'objects' },
  { english: 'map', aurebesh: 'map', difficulty: 'easy', category: 'objects' },
  { english: 'bag', aurebesh: 'bag', difficulty: 'easy', category: 'objects' },
  { english: 'lamp', aurebesh: 'lamp', difficulty: 'easy', category: 'objects' },
  { english: 'rope', aurebesh: 'rope', difficulty: 'easy', category: 'objects' },
  { english: 'door', aurebesh: 'door', difficulty: 'easy', category: 'objects' },
  { english: 'ring', aurebesh: 'ring', difficulty: 'easy', category: 'objects' },
  { english: 'coin', aurebesh: 'coin', difficulty: 'easy', category: 'objects' },
  { english: 'tool', aurebesh: 'tool', difficulty: 'easy', category: 'objects' },
  { english: 'gem', aurebesh: 'gem', difficulty: 'easy', category: 'objects' },
  
  // Colors
  { english: 'blue', aurebesh: 'blue', difficulty: 'easy', category: 'colors' },
  { english: 'red', aurebesh: 'red', difficulty: 'easy', category: 'colors' },
  { english: 'pink', aurebesh: 'pink', difficulty: 'easy', category: 'colors' },
  { english: 'gray', aurebesh: 'gray', difficulty: 'easy', category: 'colors' },
  { english: 'gold', aurebesh: 'gold', difficulty: 'easy', category: 'colors' },
  { english: 'teal', aurebesh: 'teal', difficulty: 'easy', category: 'colors' },
  { english: 'navy', aurebesh: 'navy', difficulty: 'easy', category: 'colors' },
  { english: 'lime', aurebesh: 'lime', difficulty: 'easy', category: 'colors' },
  { english: 'tan', aurebesh: 'tan', difficulty: 'easy', category: 'colors' },
  
  // Elements
  { english: 'fire', aurebesh: 'fire', difficulty: 'easy', category: 'elements' },
  { english: 'air', aurebesh: 'air', difficulty: 'easy', category: 'elements' },
  { english: 'ice', aurebesh: 'ice', difficulty: 'easy', category: 'elements' },
  { english: 'mud', aurebesh: 'mud', difficulty: 'easy', category: 'elements' },
  { english: 'coal', aurebesh: 'coal', difficulty: 'easy', category: 'elements' },
  { english: 'gas', aurebesh: 'gas', difficulty: 'easy', category: 'elements' },
  { english: 'oil', aurebesh: 'oil', difficulty: 'easy', category: 'elements' },
  { english: 'ash', aurebesh: 'ash', difficulty: 'easy', category: 'elements' },
  
  // Emotions
  { english: 'love', aurebesh: 'love', difficulty: 'easy', category: 'emotions' },
  { english: 'hope', aurebesh: 'hope', difficulty: 'easy', category: 'emotions' },
  { english: 'fear', aurebesh: 'fear', difficulty: 'easy', category: 'emotions' },
  { english: 'joy', aurebesh: 'joy', difficulty: 'easy', category: 'emotions' },
  { english: 'hate', aurebesh: 'hate', difficulty: 'easy', category: 'emotions' },
  { english: 'rage', aurebesh: 'rage', difficulty: 'easy', category: 'emotions' },
  { english: 'calm', aurebesh: 'calm', difficulty: 'easy', category: 'emotions' },
  { english: 'sad', aurebesh: 'sad', difficulty: 'easy', category: 'emotions' },
  { english: 'glad', aurebesh: 'glad', difficulty: 'easy', category: 'emotions' },
  { english: 'mad', aurebesh: 'mad', difficulty: 'easy', category: 'emotions' },
  
  // Places
  { english: 'home', aurebesh: 'home', difficulty: 'easy', category: 'places' },
  { english: 'city', aurebesh: 'city', difficulty: 'easy', category: 'places' },
  { english: 'farm', aurebesh: 'farm', difficulty: 'easy', category: 'places' },
  { english: 'shop', aurebesh: 'shop', difficulty: 'easy', category: 'places' },
  { english: 'park', aurebesh: 'park', difficulty: 'easy', category: 'places' },
  { english: 'mall', aurebesh: 'mall', difficulty: 'easy', category: 'places' },
  { english: 'port', aurebesh: 'port', difficulty: 'easy', category: 'places' },
  { english: 'dock', aurebesh: 'dock', difficulty: 'easy', category: 'places' },
  { english: 'base', aurebesh: 'base', difficulty: 'easy', category: 'places' },
  { english: 'camp', aurebesh: 'camp', difficulty: 'easy', category: 'places' },
  
  // Body Parts
  { english: 'hand', aurebesh: 'hand', difficulty: 'easy', category: 'body' },
  { english: 'foot', aurebesh: 'foot', difficulty: 'easy', category: 'body' },
  { english: 'head', aurebesh: 'head', difficulty: 'easy', category: 'body' },
  { english: 'eye', aurebesh: 'eye', difficulty: 'easy', category: 'body' },
  { english: 'ear', aurebesh: 'ear', difficulty: 'easy', category: 'body' },
  { english: 'arm', aurebesh: 'arm', difficulty: 'easy', category: 'body' },
  { english: 'leg', aurebesh: 'leg', difficulty: 'easy', category: 'body' },
  { english: 'toe', aurebesh: 'toe', difficulty: 'easy', category: 'body' },
  { english: 'jaw', aurebesh: 'jaw', difficulty: 'easy', category: 'body' },
  { english: 'lip', aurebesh: 'lip', difficulty: 'easy', category: 'body' },
  
  // Food
  { english: 'meat', aurebesh: 'meat', difficulty: 'easy', category: 'food' },
  { english: 'cake', aurebesh: 'cake', difficulty: 'easy', category: 'food' },
  { english: 'soup', aurebesh: 'soup', difficulty: 'easy', category: 'food' },
  { english: 'rice', aurebesh: 'rice', difficulty: 'easy', category: 'food' },
  { english: 'fish', aurebesh: 'fish', difficulty: 'easy', category: 'food' },
  { english: 'egg', aurebesh: 'egg', difficulty: 'easy', category: 'food' },
  { english: 'milk', aurebesh: 'milk', difficulty: 'easy', category: 'food' },
  { english: 'tea', aurebesh: 'tea', difficulty: 'easy', category: 'food' },
  { english: 'nut', aurebesh: 'nut', difficulty: 'easy', category: 'food' },
  { english: 'jam', aurebesh: 'jam', difficulty: 'easy', category: 'food' },
  
  // ========== MEDIUM WORDS (5-6 letters) ==========
  
  // Star Wars
  { english: 'force', aurebesh: 'force', difficulty: 'medium', category: 'star wars' },
  { english: 'jedi', aurebesh: 'jedi', difficulty: 'medium', category: 'star wars' },
  { english: 'sith', aurebesh: 'sith', difficulty: 'medium', category: 'star wars' },
  { english: 'empire', aurebesh: 'empire', difficulty: 'medium', category: 'star wars' },
  { english: 'rebel', aurebesh: 'rebel', difficulty: 'medium', category: 'star wars' },
  { english: 'vader', aurebesh: 'vader', difficulty: 'medium', category: 'star wars' },
  { english: 'luke', aurebesh: 'luke', difficulty: 'medium', category: 'star wars' },
  { english: 'leia', aurebesh: 'leia', difficulty: 'medium', category: 'star wars' },
  { english: 'yoda', aurebesh: 'yoda', difficulty: 'medium', category: 'star wars' },
  { english: 'clone', aurebesh: 'clone', difficulty: 'medium', category: 'star wars' },
  { english: 'droid', aurebesh: 'droid', difficulty: 'medium', category: 'star wars' },
  { english: 'saber', aurebesh: 'saber', difficulty: 'medium', category: 'star wars' },
  { english: 'falcon', aurebesh: 'falcon', difficulty: 'medium', category: 'star wars' },
  { english: 'tatooine', aurebesh: 'tatooine', difficulty: 'medium', category: 'star wars' },
  { english: 'naboo', aurebesh: 'naboo', difficulty: 'medium', category: 'star wars' },
  { english: 'hoth', aurebesh: 'hoth', difficulty: 'medium', category: 'star wars' },
  { english: 'ewok', aurebesh: 'ewok', difficulty: 'medium', category: 'star wars' },
  { english: 'wookie', aurebesh: 'wookie', difficulty: 'medium', category: 'star wars' },
  
  // Space
  { english: 'galaxy', aurebesh: 'galaxy', difficulty: 'medium', category: 'space' },
  { english: 'planet', aurebesh: 'planet', difficulty: 'medium', category: 'space' },
  { english: 'comet', aurebesh: 'comet', difficulty: 'medium', category: 'space' },
  { english: 'orbit', aurebesh: 'orbit', difficulty: 'medium', category: 'space' },
  { english: 'nebula', aurebesh: 'nebula', difficulty: 'medium', category: 'space' },
  { english: 'rocket', aurebesh: 'rocket', difficulty: 'medium', category: 'space' },
  { english: 'saturn', aurebesh: 'saturn', difficulty: 'medium', category: 'space' },
  { english: 'mars', aurebesh: 'mars', difficulty: 'medium', category: 'space' },
  { english: 'venus', aurebesh: 'venus', difficulty: 'medium', category: 'space' },
  { english: 'earth', aurebesh: 'earth', difficulty: 'medium', category: 'space' },
  { english: 'lunar', aurebesh: 'lunar', difficulty: 'medium', category: 'space' },
  { english: 'solar', aurebesh: 'solar', difficulty: 'medium', category: 'space' },
  { english: 'cosmic', aurebesh: 'cosmic', difficulty: 'medium', category: 'space' },
  { english: 'meteor', aurebesh: 'meteor', difficulty: 'medium', category: 'space' },
  { english: 'black', aurebesh: 'black', difficulty: 'medium', category: 'space' },
  
  // Concepts
  { english: 'peace', aurebesh: 'peace', difficulty: 'medium', category: 'concepts' },
  { english: 'light', aurebesh: 'light', difficulty: 'medium', category: 'concepts' },
  { english: 'power', aurebesh: 'power', difficulty: 'medium', category: 'concepts' },
  { english: 'wisdom', aurebesh: 'wisdom', difficulty: 'medium', category: 'concepts' },
  { english: 'truth', aurebesh: 'truth', difficulty: 'medium', category: 'concepts' },
  { english: 'honor', aurebesh: 'honor', difficulty: 'medium', category: 'concepts' },
  { english: 'justice', aurebesh: 'justice', difficulty: 'medium', category: 'concepts' },
  { english: 'order', aurebesh: 'order', difficulty: 'medium', category: 'concepts' },
  { english: 'chaos', aurebesh: 'chaos', difficulty: 'medium', category: 'concepts' },
  { english: 'future', aurebesh: 'future', difficulty: 'medium', category: 'concepts' },
  { english: 'destiny', aurebesh: 'destiny', difficulty: 'medium', category: 'concepts' },
  { english: 'spirit', aurebesh: 'spirit', difficulty: 'medium', category: 'concepts' },
  { english: 'energy', aurebesh: 'energy', difficulty: 'medium', category: 'concepts' },
  { english: 'balance', aurebesh: 'balance', difficulty: 'medium', category: 'concepts' },
  { english: 'harmony', aurebesh: 'harmony', difficulty: 'medium', category: 'concepts' },
  
  // Elements
  { english: 'water', aurebesh: 'water', difficulty: 'medium', category: 'elements' },
  { english: 'earth', aurebesh: 'earth', difficulty: 'medium', category: 'elements' },
  { english: 'metal', aurebesh: 'metal', difficulty: 'medium', category: 'elements' },
  { english: 'stone', aurebesh: 'stone', difficulty: 'medium', category: 'elements' },
  { english: 'silver', aurebesh: 'silver', difficulty: 'medium', category: 'elements' },
  { english: 'copper', aurebesh: 'copper', difficulty: 'medium', category: 'elements' },
  { english: 'iron', aurebesh: 'iron', difficulty: 'medium', category: 'elements' },
  { english: 'steam', aurebesh: 'steam', difficulty: 'medium', category: 'elements' },
  { english: 'plasma', aurebesh: 'plasma', difficulty: 'medium', category: 'elements' },
  { english: 'carbon', aurebesh: 'carbon', difficulty: 'medium', category: 'elements' },
  
  // Relationships
  { english: 'friend', aurebesh: 'friend', difficulty: 'medium', category: 'relationships' },
  { english: 'family', aurebesh: 'family', difficulty: 'medium', category: 'relationships' },
  { english: 'mother', aurebesh: 'mother', difficulty: 'medium', category: 'relationships' },
  { english: 'father', aurebesh: 'father', difficulty: 'medium', category: 'relationships' },
  { english: 'sister', aurebesh: 'sister', difficulty: 'medium', category: 'relationships' },
  { english: 'brother', aurebesh: 'brother', difficulty: 'medium', category: 'relationships' },
  { english: 'cousin', aurebesh: 'cousin', difficulty: 'medium', category: 'relationships' },
  { english: 'uncle', aurebesh: 'uncle', difficulty: 'medium', category: 'relationships' },
  { english: 'aunt', aurebesh: 'aunt', difficulty: 'medium', category: 'relationships' },
  { english: 'lover', aurebesh: 'lover', difficulty: 'medium', category: 'relationships' },
  { english: 'enemy', aurebesh: 'enemy', difficulty: 'medium', category: 'relationships' },
  { english: 'ally', aurebesh: 'ally', difficulty: 'medium', category: 'relationships' },
  { english: 'mentor', aurebesh: 'mentor', difficulty: 'medium', category: 'relationships' },
  { english: 'leader', aurebesh: 'leader', difficulty: 'medium', category: 'relationships' },
  { english: 'master', aurebesh: 'master', difficulty: 'medium', category: 'relationships' },
  
  // Places
  { english: 'temple', aurebesh: 'temple', difficulty: 'medium', category: 'places' },
  { english: 'castle', aurebesh: 'castle', difficulty: 'medium', category: 'places' },
  { english: 'forest', aurebesh: 'forest', difficulty: 'medium', category: 'places' },
  { english: 'desert', aurebesh: 'desert', difficulty: 'medium', category: 'places' },
  { english: 'ocean', aurebesh: 'ocean', difficulty: 'medium', category: 'places' },
  { english: 'valley', aurebesh: 'valley', difficulty: 'medium', category: 'places' },
  { english: 'bridge', aurebesh: 'bridge', difficulty: 'medium', category: 'places' },
  { english: 'tower', aurebesh: 'tower', difficulty: 'medium', category: 'places' },
  { english: 'garden', aurebesh: 'garden', difficulty: 'medium', category: 'places' },
  { english: 'palace', aurebesh: 'palace', difficulty: 'medium', category: 'places' },
  { english: 'market', aurebesh: 'market', difficulty: 'medium', category: 'places' },
  { english: 'prison', aurebesh: 'prison', difficulty: 'medium', category: 'places' },
  { english: 'school', aurebesh: 'school', difficulty: 'medium', category: 'places' },
  { english: 'church', aurebesh: 'church', difficulty: 'medium', category: 'places' },
  { english: 'harbor', aurebesh: 'harbor', difficulty: 'medium', category: 'places' },
  
  // Animals
  { english: 'tiger', aurebesh: 'tiger', difficulty: 'medium', category: 'animals' },
  { english: 'lion', aurebesh: 'lion', difficulty: 'medium', category: 'animals' },
  { english: 'eagle', aurebesh: 'eagle', difficulty: 'medium', category: 'animals' },
  { english: 'shark', aurebesh: 'shark', difficulty: 'medium', category: 'animals' },
  { english: 'whale', aurebesh: 'whale', difficulty: 'medium', category: 'animals' },
  { english: 'dragon', aurebesh: 'dragon', difficulty: 'medium', category: 'animals' },
  { english: 'wolf', aurebesh: 'wolf', difficulty: 'medium', category: 'animals' },
  { english: 'horse', aurebesh: 'horse', difficulty: 'medium', category: 'animals' },
  { english: 'rabbit', aurebesh: 'rabbit', difficulty: 'medium', category: 'animals' },
  { english: 'turtle', aurebesh: 'turtle', difficulty: 'medium', category: 'animals' },
  { english: 'monkey', aurebesh: 'monkey', difficulty: 'medium', category: 'animals' },
  { english: 'spider', aurebesh: 'spider', difficulty: 'medium', category: 'animals' },
  { english: 'snake', aurebesh: 'snake', difficulty: 'medium', category: 'animals' },
  { english: 'lizard', aurebesh: 'lizard', difficulty: 'medium', category: 'animals' },
  { english: 'falcon', aurebesh: 'falcon', difficulty: 'medium', category: 'animals' },
  
  // Colors
  { english: 'green', aurebesh: 'green', difficulty: 'medium', category: 'colors' },
  { english: 'purple', aurebesh: 'purple', difficulty: 'medium', category: 'colors' },
  { english: 'orange', aurebesh: 'orange', difficulty: 'medium', category: 'colors' },
  { english: 'yellow', aurebesh: 'yellow', difficulty: 'medium', category: 'colors' },
  { english: 'violet', aurebesh: 'violet', difficulty: 'medium', category: 'colors' },
  { english: 'crimson', aurebesh: 'crimson', difficulty: 'medium', category: 'colors' },
  { english: 'bronze', aurebesh: 'bronze', difficulty: 'medium', category: 'colors' },
  { english: 'indigo', aurebesh: 'indigo', difficulty: 'medium', category: 'colors' },
  { english: 'maroon', aurebesh: 'maroon', difficulty: 'medium', category: 'colors' },
  { english: 'salmon', aurebesh: 'salmon', difficulty: 'medium', category: 'colors' },
  
  // ========== HARD WORDS (7+ letters) ==========
  
  // Star Wars
  { english: 'republic', aurebesh: 'republic', difficulty: 'hard', category: 'star wars' },
  { english: 'rebellion', aurebesh: 'rebellion', difficulty: 'hard', category: 'star wars' },
  { english: 'imperial', aurebesh: 'imperial', difficulty: 'hard', category: 'star wars' },
  { english: 'galactic', aurebesh: 'galactic', difficulty: 'hard', category: 'star wars' },
  { english: 'skywalker', aurebesh: 'skywalker', difficulty: 'hard', category: 'star wars' },
  { english: 'kenobi', aurebesh: 'kenobi', difficulty: 'hard', category: 'star wars' },
  { english: 'palpatine', aurebesh: 'palpatine', difficulty: 'hard', category: 'star wars' },
  { english: 'chewbacca', aurebesh: 'chewbacca', difficulty: 'hard', category: 'star wars' },
  { english: 'millennium', aurebesh: 'millennium', difficulty: 'hard', category: 'star wars' },
  { english: 'coruscant', aurebesh: 'coruscant', difficulty: 'hard', category: 'star wars' },
  { english: 'alderaan', aurebesh: 'alderaan', difficulty: 'hard', category: 'star wars' },
  { english: 'endor', aurebesh: 'endor', difficulty: 'hard', category: 'star wars' },
  { english: 'kashyyyk', aurebesh: 'kashyyyk', difficulty: 'hard', category: 'star wars' },
  { english: 'mustafar', aurebesh: 'mustafar', difficulty: 'hard', category: 'star wars' },
  { english: 'kamino', aurebesh: 'kamino', difficulty: 'hard', category: 'star wars' },
  { english: 'geonosis', aurebesh: 'geonosis', difficulty: 'hard', category: 'star wars' },
  { english: 'dagobah', aurebesh: 'dagobah', difficulty: 'hard', category: 'star wars' },
  { english: 'bespin', aurebesh: 'bespin', difficulty: 'hard', category: 'star wars' },
  { english: 'mandalore', aurebesh: 'mandalore', difficulty: 'hard', category: 'star wars' },
  { english: 'lightsaber', aurebesh: 'lightsaber', difficulty: 'hard', category: 'star wars' },
  
  // Concepts
  { english: 'knowledge', aurebesh: 'knowledge', difficulty: 'hard', category: 'concepts' },
  { english: 'adventure', aurebesh: 'adventure', difficulty: 'hard', category: 'concepts' },
  { english: 'challenge', aurebesh: 'challenge', difficulty: 'hard', category: 'concepts' },
  { english: 'discovery', aurebesh: 'discovery', difficulty: 'hard', category: 'concepts' },
  { english: 'imagination', aurebesh: 'imagination', difficulty: 'hard', category: 'concepts' },
  { english: 'inspiration', aurebesh: 'inspiration', difficulty: 'hard', category: 'concepts' },
  { english: 'meditation', aurebesh: 'meditation', difficulty: 'hard', category: 'concepts' },
  { english: 'enlightenment', aurebesh: 'enlightenment', difficulty: 'hard', category: 'concepts' },
  { english: 'transformation', aurebesh: 'transformation', difficulty: 'hard', category: 'concepts' },
  { english: 'understanding', aurebesh: 'understanding', difficulty: 'hard', category: 'concepts' },
  { english: 'consciousness', aurebesh: 'consciousness', difficulty: 'hard', category: 'concepts' },
  { english: 'serenity', aurebesh: 'serenity', difficulty: 'hard', category: 'concepts' },
  { english: 'tranquility', aurebesh: 'tranquility', difficulty: 'hard', category: 'concepts' },
  { english: 'perseverance', aurebesh: 'perseverance', difficulty: 'hard', category: 'concepts' },
  { english: 'determination', aurebesh: 'determination', difficulty: 'hard', category: 'concepts' },
  
  // Technology
  { english: 'computer', aurebesh: 'computer', difficulty: 'hard', category: 'technology' },
  { english: 'spaceship', aurebesh: 'spaceship', difficulty: 'hard', category: 'technology' },
  { english: 'hologram', aurebesh: 'hologram', difficulty: 'hard', category: 'technology' },
  { english: 'hyperdrive', aurebesh: 'hyperdrive', difficulty: 'hard', category: 'technology' },
  { english: 'blaster', aurebesh: 'blaster', difficulty: 'hard', category: 'technology' },
  { english: 'starfighter', aurebesh: 'starfighter', difficulty: 'hard', category: 'technology' },
  { english: 'destroyer', aurebesh: 'destroyer', difficulty: 'hard', category: 'technology' },
  { english: 'cruiser', aurebesh: 'cruiser', difficulty: 'hard', category: 'technology' },
  { english: 'freighter', aurebesh: 'freighter', difficulty: 'hard', category: 'technology' },
  { english: 'transport', aurebesh: 'transport', difficulty: 'hard', category: 'technology' },
  { english: 'communication', aurebesh: 'communication', difficulty: 'hard', category: 'technology' },
  { english: 'navigation', aurebesh: 'navigation', difficulty: 'hard', category: 'technology' },
  { english: 'artificial', aurebesh: 'artificial', difficulty: 'hard', category: 'technology' },
  { english: 'intelligence', aurebesh: 'intelligence', difficulty: 'hard', category: 'technology' },
  { english: 'programming', aurebesh: 'programming', difficulty: 'hard', category: 'technology' },
  
  // Nature
  { english: 'mountain', aurebesh: 'mountain', difficulty: 'hard', category: 'nature' },
  { english: 'waterfall', aurebesh: 'waterfall', difficulty: 'hard', category: 'nature' },
  { english: 'lightning', aurebesh: 'lightning', difficulty: 'hard', category: 'nature' },
  { english: 'earthquake', aurebesh: 'earthquake', difficulty: 'hard', category: 'nature' },
  { english: 'hurricane', aurebesh: 'hurricane', difficulty: 'hard', category: 'nature' },
  { english: 'blizzard', aurebesh: 'blizzard', difficulty: 'hard', category: 'nature' },
  { english: 'avalanche', aurebesh: 'avalanche', difficulty: 'hard', category: 'nature' },
  { english: 'ecosystem', aurebesh: 'ecosystem', difficulty: 'hard', category: 'nature' },
  { english: 'biodiversity', aurebesh: 'biodiversity', difficulty: 'hard', category: 'nature' },
  { english: 'wilderness', aurebesh: 'wilderness', difficulty: 'hard', category: 'nature' },
  { english: 'landscape', aurebesh: 'landscape', difficulty: 'hard', category: 'nature' },
  { english: 'environment', aurebesh: 'environment', difficulty: 'hard', category: 'nature' },
  { english: 'atmosphere', aurebesh: 'atmosphere', difficulty: 'hard', category: 'nature' },
  { english: 'climate', aurebesh: 'climate', difficulty: 'hard', category: 'nature' },
  { english: 'weather', aurebesh: 'weather', difficulty: 'hard', category: 'nature' },
  
  // Emotions
  { english: 'happiness', aurebesh: 'happiness', difficulty: 'hard', category: 'emotions' },
  { english: 'sadness', aurebesh: 'sadness', difficulty: 'hard', category: 'emotions' },
  { english: 'excitement', aurebesh: 'excitement', difficulty: 'hard', category: 'emotions' },
  { english: 'disappointment', aurebesh: 'disappointment', difficulty: 'hard', category: 'emotions' },
  { english: 'satisfaction', aurebesh: 'satisfaction', difficulty: 'hard', category: 'emotions' },
  { english: 'frustration', aurebesh: 'frustration', difficulty: 'hard', category: 'emotions' },
  { english: 'anticipation', aurebesh: 'anticipation', difficulty: 'hard', category: 'emotions' },
  { english: 'amazement', aurebesh: 'amazement', difficulty: 'hard', category: 'emotions' },
  { english: 'bewilderment', aurebesh: 'bewilderment', difficulty: 'hard', category: 'emotions' },
  { english: 'contentment', aurebesh: 'contentment', difficulty: 'hard', category: 'emotions' },
  { english: 'melancholy', aurebesh: 'melancholy', difficulty: 'hard', category: 'emotions' },
  { english: 'nostalgia', aurebesh: 'nostalgia', difficulty: 'hard', category: 'emotions' },
  { english: 'euphoria', aurebesh: 'euphoria', difficulty: 'hard', category: 'emotions' },
  { english: 'tranquility', aurebesh: 'tranquility', difficulty: 'hard', category: 'emotions' },
  { english: 'serenity', aurebesh: 'serenity', difficulty: 'hard', category: 'emotions' },
  
  // Actions
  { english: 'running', aurebesh: 'running', difficulty: 'hard', category: 'actions' },
  { english: 'jumping', aurebesh: 'jumping', difficulty: 'hard', category: 'actions' },
  { english: 'swimming', aurebesh: 'swimming', difficulty: 'hard', category: 'actions' },
  { english: 'climbing', aurebesh: 'climbing', difficulty: 'hard', category: 'actions' },
  { english: 'fighting', aurebesh: 'fighting', difficulty: 'hard', category: 'actions' },
  { english: 'dancing', aurebesh: 'dancing', difficulty: 'hard', category: 'actions' },
  { english: 'singing', aurebesh: 'singing', difficulty: 'hard', category: 'actions' },
  { english: 'reading', aurebesh: 'reading', difficulty: 'hard', category: 'actions' },
  { english: 'writing', aurebesh: 'writing', difficulty: 'hard', category: 'actions' },
  { english: 'thinking', aurebesh: 'thinking', difficulty: 'hard', category: 'actions' },
  { english: 'learning', aurebesh: 'learning', difficulty: 'hard', category: 'actions' },
  { english: 'teaching', aurebesh: 'teaching', difficulty: 'hard', category: 'actions' },
  { english: 'exploring', aurebesh: 'exploring', difficulty: 'hard', category: 'actions' },
  { english: 'creating', aurebesh: 'creating', difficulty: 'hard', category: 'actions' },
  { english: 'building', aurebesh: 'building', difficulty: 'hard', category: 'actions' },
  
  // Abstract
  { english: 'philosophy', aurebesh: 'philosophy', difficulty: 'hard', category: 'abstract' },
  { english: 'mathematics', aurebesh: 'mathematics', difficulty: 'hard', category: 'abstract' },
  { english: 'literature', aurebesh: 'literature', difficulty: 'hard', category: 'abstract' },
  { english: 'psychology', aurebesh: 'psychology', difficulty: 'hard', category: 'abstract' },
  { english: 'sociology', aurebesh: 'sociology', difficulty: 'hard', category: 'abstract' },
  { english: 'anthropology', aurebesh: 'anthropology', difficulty: 'hard', category: 'abstract' },
  { english: 'archaeology', aurebesh: 'archaeology', difficulty: 'hard', category: 'abstract' },
  { english: 'astronomy', aurebesh: 'astronomy', difficulty: 'hard', category: 'abstract' },
  { english: 'geometry', aurebesh: 'geometry', difficulty: 'hard', category: 'abstract' },
  { english: 'algebra', aurebesh: 'algebra', difficulty: 'hard', category: 'abstract' },
  { english: 'calculus', aurebesh: 'calculus', difficulty: 'hard', category: 'abstract' },
  { english: 'physics', aurebesh: 'physics', difficulty: 'hard', category: 'abstract' },
  { english: 'chemistry', aurebesh: 'chemistry', difficulty: 'hard', category: 'abstract' },
  { english: 'biology', aurebesh: 'biology', difficulty: 'hard', category: 'abstract' },
  { english: 'evolution', aurebesh: 'evolution', difficulty: 'hard', category: 'abstract' },
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
