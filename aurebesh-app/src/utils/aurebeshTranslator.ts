/**
 * Aurebesh Translation Utility
 * 
 * This utility provides functions for translating between English and Aurebesh text.
 * The Aurebesh font automatically maps English letters to Aurebesh characters,
 * so translation is primarily about text processing and validation.
 */

/**
 * Character mappings for Aurebesh alphabet
 * Used for validation and keyboard display
 */
export const aurebeshCharacterMap = {
  'A': 'a', 'B': 'b', 'C': 'c', 'D': 'd', 'E': 'e', 'F': 'f', 'G': 'g', 'H': 'h',
  'I': 'i', 'J': 'j', 'K': 'k', 'L': 'l', 'M': 'm', 'N': 'n', 'O': 'o', 'P': 'p',
  'Q': 'q', 'R': 'r', 'S': 's', 'T': 't', 'U': 'u', 'V': 'v', 'W': 'w', 'X': 'x',
  'Y': 'y', 'Z': 'z'
};

/**
 * Aurebesh alphabet with canonical names for keyboard display
 */
export const aurebeshAlphabet = [
  { english: 'A', aurebesh: 'a', name: 'Aurek' },
  { english: 'B', aurebesh: 'b', name: 'Besh' },
  { english: 'C', aurebesh: 'c', name: 'Cresh' },
  { english: 'D', aurebesh: 'd', name: 'Dorn' },
  { english: 'E', aurebesh: 'e', name: 'Esk' },
  { english: 'F', aurebesh: 'f', name: 'Forn' },
  { english: 'G', aurebesh: 'g', name: 'Grek' },
  { english: 'H', aurebesh: 'h', name: 'Herf' },
  { english: 'I', aurebesh: 'i', name: 'Isk' },
  { english: 'J', aurebesh: 'j', name: 'Jenth' },
  { english: 'K', aurebesh: 'k', name: 'Krill' },
  { english: 'L', aurebesh: 'l', name: 'Leth' },
  { english: 'M', aurebesh: 'm', name: 'Mern' },
  { english: 'N', aurebesh: 'n', name: 'Nern' },
  { english: 'O', aurebesh: 'o', name: 'Osk' },
  { english: 'P', aurebesh: 'p', name: 'Peth' },
  { english: 'Q', aurebesh: 'q', name: 'Qek' },
  { english: 'R', aurebesh: 'r', name: 'Resh' },
  { english: 'S', aurebesh: 's', name: 'Senth' },
  { english: 'T', aurebesh: 't', name: 'Trill' },
  { english: 'U', aurebesh: 'u', name: 'Usk' },
  { english: 'V', aurebesh: 'v', name: 'Vev' },
  { english: 'W', aurebesh: 'w', name: 'Wesk' },
  { english: 'X', aurebesh: 'x', name: 'Xesh' },
  { english: 'Y', aurebesh: 'y', name: 'Yirt' },
  { english: 'Z', aurebesh: 'z', name: 'Zerek' }
];

/**
 * Translates English text to Aurebesh-compatible text
 * Preserves case and handles special characters
 * @param englishText - The English text to translate
 * @returns The translated text that can be displayed with the Aurebesh font
 */
export const translateToAurebesh = (englishText: string): string => {
  if (!englishText) return '';
  
  // The Aurebesh font automatically maps English letters to Aurebesh characters
  // We just need to clean the text and preserve formatting
  return englishText
    .split('')
    .map(char => {
      // Convert to uppercase for consistency with the font mapping
      const upperChar = char.toUpperCase();
      
      // If it's a letter, keep it as is (font will handle the conversion)
      if (/[A-Z]/.test(upperChar)) {
        return char; // Preserve original case
      }
      
      // Keep spaces, punctuation, and numbers as is
      if (/[\s\d.,!?;:'"()\-]/.test(char)) {
        return char;
      }
      
      // Remove unsupported characters
      return '';
    })
    .join('');
};

/**
 * Translates Aurebesh text back to English
 * Since the Aurebesh font maps English letters, this is essentially the same text
 * @param aurebeshText - The Aurebesh text to translate back
 * @returns The English equivalent
 */
export const translateToEnglish = (aurebeshText: string): string => {
  // Since we're using a font-based approach, the underlying text is already English
  return aurebeshText;
};

/**
 * Checks if a character is a valid Aurebesh/English letter
 * @param char - The character to validate
 * @returns True if the character can be displayed in Aurebesh
 */
export const isValidAurebeshCharacter = (char: string): boolean => {
  const upperChar = char.toUpperCase();
  return /[A-Z]/.test(upperChar) || /[\s\d.,!?;:'"()\-]/.test(char);
};

/**
 * Cleans text for Aurebesh display by removing invalid characters
 * @param text - The text to clean
 * @returns Cleaned text with only valid characters
 */
export const cleanTextForAurebesh = (text: string): string => {
  return text
    .split('')
    .filter(char => isValidAurebeshCharacter(char))
    .join('');
};

/**
 * Gets character information for a given letter
 * @param letter - The English letter to get info for
 * @returns Character information including name and Aurebesh equivalent
 */
export const getCharacterInfo = (letter: string) => {
  const upperLetter = letter.toUpperCase();
  return aurebeshAlphabet.find(char => char.english === upperLetter);
};
