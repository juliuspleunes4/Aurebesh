import * as Font from 'expo-font';

/**
 * Custom fonts configuration for the Aurebesh app.
 * Loads the NOYH R Medium font for UI and Aurebesh font for character display.
 */
export const customFonts = {
  'NOYH-R-Medium': require('../../fonts/noyh-r-medium.ttf'),
  'Aurebesh': require('../../fonts/Aurebesh.otf'),
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

/**
 * Returns the Aurebesh font family name for displaying Aurebesh characters.
 * @returns The Aurebesh font family name
 */
export const getAurebeshFontFamily = (): string => {
  return 'Aurebesh';
};
