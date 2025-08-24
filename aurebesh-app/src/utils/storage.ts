import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

/**
 * Interface for storage breakdown data
 */
export interface StorageBreakdown {
  appData: number;
  learningProgress: number;
  fontsAssets: number;
  imagesIcons: number;
  networkCache: number;
  total: number;
}

/**
 * Calculates the actual storage usage for the app
 * @returns Promise<StorageBreakdown> - Object containing storage sizes in bytes
 */
export const calculateStorageUsage = async (): Promise<StorageBreakdown> => {
  try {
    let appData = 0;
    let learningProgress = 0;
    let fontsAssets = 0;
    let imagesIcons = 0;
    let networkCache = 0;

    // 1. Calculate AsyncStorage size (App Data)
    const keys = await AsyncStorage.getAllKeys();
    for (const key of keys) {
      const value = await AsyncStorage.getItem(key);
      if (value) {
        const size = new Blob([value]).size;
        
        // Categorize based on key prefix/content
        if (key.includes('settings') || key.includes('preferences') || key.includes('user')) {
          appData += size;
        } else if (key.includes('progress') || key.includes('score') || key.includes('achievement')) {
          learningProgress += size;
        } else {
          appData += size; // Default to app data
        }
      }
    }

    // 2. Calculate cache directory sizes if available
    try {
      const cacheDir = FileSystem.cacheDirectory;
      if (cacheDir) {
        const cacheInfo = await FileSystem.getInfoAsync(cacheDir);
        if (cacheInfo.exists && cacheInfo.isDirectory) {
          const cacheContents = await FileSystem.readDirectoryAsync(cacheDir);
          
          for (const item of cacheContents) {
            const itemPath = `${cacheDir}${item}`;
            const itemInfo = await FileSystem.getInfoAsync(itemPath);
            
            if (itemInfo.exists && itemInfo.size) {
              // Categorize cache files
              const fileName = item.toLowerCase();
              if (fileName.includes('font') || fileName.includes('ttf') || fileName.includes('otf')) {
                fontsAssets += itemInfo.size;
              } else if (fileName.includes('image') || fileName.includes('png') || fileName.includes('jpg') || fileName.includes('jpeg') || fileName.includes('svg')) {
                imagesIcons += itemInfo.size;
              } else if (fileName.includes('network') || fileName.includes('api') || fileName.includes('cache')) {
                networkCache += itemInfo.size;
              } else {
                networkCache += itemInfo.size; // Default to network cache
              }
            }
          }
        }
      }
    } catch (error) {
      console.warn('Could not access cache directory:', error);
    }

    // 3. Estimate font and asset sizes (if not found in cache)
    if (fontsAssets === 0) {
      // Estimate based on typical Aurebesh font size
      fontsAssets = 250000; // ~250KB estimated for custom fonts
    }

    // 4. Estimate image assets if not found
    if (imagesIcons === 0) {
      // Estimate based on app bundle assets
      imagesIcons = 150000; // ~150KB estimated for icons and images
    }

    const total = appData + learningProgress + fontsAssets + imagesIcons + networkCache;

    return {
      appData,
      learningProgress,
      fontsAssets,
      imagesIcons,
      networkCache,
      total,
    };
  } catch (error) {
    console.error('Error calculating storage usage:', error);
    
    // Return minimal fallback data if calculation fails
    return {
      appData: 0,
      learningProgress: 0,
      fontsAssets: 0,
      imagesIcons: 0,
      networkCache: 0,
      total: 0,
    };
  }
};

/**
 * Formats bytes to human-readable string
 * @param bytes - Number of bytes
 * @returns Formatted string (e.g., "1.2 MB", "500 KB")
 */
export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

/**
 * Clears cache directories (network cache only, preserves app data)
 * @returns Promise<boolean> - Success status
 */
export const clearNetworkCache = async (): Promise<boolean> => {
  try {
    const cacheDir = FileSystem.cacheDirectory;
    if (cacheDir) {
      const cacheContents = await FileSystem.readDirectoryAsync(cacheDir);
      
      for (const item of cacheContents) {
        const itemPath = `${cacheDir}${item}`;
        const fileName = item.toLowerCase();
        
        // Only delete network cache files, preserve fonts and critical assets
        if (fileName.includes('network') || fileName.includes('api') || fileName.includes('temp')) {
          await FileSystem.deleteAsync(itemPath, { idempotent: true });
        }
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error clearing network cache:', error);
    return false;
  }
};
