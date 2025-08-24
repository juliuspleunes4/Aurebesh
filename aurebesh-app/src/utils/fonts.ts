import * as Font from 'expo-font';

/**
 * Custom fonts configuration for the Aurebesh app.
 * Loads the NOYH R Medium font for a consistent, playful typography.
 */
export const customFonts = {
  'NOYH-R-Medium': require('../../fonts/noyh-r-medium.ttf'),
};

/**
 * Loads custom fonts asynchronously.
 * Should be called during app initialization.
 * @returns Promise that resolves when fonts are loaded
 */
export const loadFonts = async (): Promise<void> => {
  await Font.loadAsync(customFonts);
};

/**
 * Returns the appropriate font family name for the platform.
 * Uses NOYH R Medium as the primary font across all platforms.
 * @returns The font family name to use in styles
 */
export const getFontFamily = (): string => {
  return 'NOYH-R-Medium';
};
