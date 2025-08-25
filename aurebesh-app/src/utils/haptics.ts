import * as Haptics from 'expo-haptics';

/**
 * Utility functions for conditional haptic feedback based on user settings
 */

/**
 * Triggers haptic feedback only if the user has enabled it in settings
 * @param hapticType - The type of haptic feedback to trigger
 * @param isEnabled - Whether haptic feedback is enabled for the user
 */
export const triggerHapticFeedback = async (
  hapticType: Haptics.ImpactFeedbackStyle | 'selection' | 'notification',
  isEnabled: boolean = true
) => {
  if (!isEnabled) return;

  try {
    switch (hapticType) {
      case 'selection':
        await Haptics.selectionAsync();
        break;
      case 'notification':
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        break;
      default:
        await Haptics.impactAsync(hapticType);
        break;
    }
  } catch (error) {
    console.warn('Haptic feedback error:', error);
  }
};

/**
 * Convenience functions for common haptic patterns
 */
export const hapticLight = (isEnabled: boolean = true) => 
  triggerHapticFeedback(Haptics.ImpactFeedbackStyle.Light, isEnabled);

export const hapticMedium = (isEnabled: boolean = true) => 
  triggerHapticFeedback(Haptics.ImpactFeedbackStyle.Medium, isEnabled);

export const hapticHeavy = (isEnabled: boolean = true) => 
  triggerHapticFeedback(Haptics.ImpactFeedbackStyle.Heavy, isEnabled);

export const hapticSelection = (isEnabled: boolean = true) => 
  triggerHapticFeedback('selection', isEnabled);

export const hapticNotification = (isEnabled: boolean = true) => 
  triggerHapticFeedback('notification', isEnabled);

export const hapticSuccess = (isEnabled: boolean = true) => 
  triggerHapticFeedback('notification', isEnabled);
