[//]: # (Copilot Instructions for Aurebesh Learning App)

# Copilot Instructions for Aurebesh Learning App

## Official app and project name

Aurebesh

## General Guidelines

- **Project Type:** React Native + Expo app for learning Aurebesh.
- **Audience:** Open-source, educational, and accessible for all users.
- **Code Quality:** All code must be clean, modular, and follow best practices for React Native and Expo.
- **Documentation:** Every file, function, and component should have clear, meaningful comments explaining its purpose and logic. Comments should describe what the code does and why, not what was recently changed.
- **Folder Structure:** Organize code into logical folders (e.g., `components`, `screens`, `utils`, `assets`, etc.). Each folder should contain only related files.
- **Naming Conventions:** Use descriptive names for files, variables, functions, and components. Follow standard React Native naming conventions (PascalCase for components, camelCase for variables/functions).
- **Type Safety:** Use TypeScript for all source code. Define and use types/interfaces for props, state, and data structures.
- **Accessibility:** Ensure UI components are accessible and usable for all users.
- **Testing:** Include unit tests for critical logic and components (e.g., translation functions).

## App Features

### 1. Learn Aurebesh
- Users see a word written in Aurebesh and they have enter the English equivalent.
- Provide hints or tips for users who are struggling.
- Include a "Show Answer" button to reveal the correct English translation.

### 2. Write Aurebesh Page
- Users can convert English text to Aurebesh and Aurebesh to English.
- Provide a text input for users to enter text.
- Display the translated result in real-time.
- Include a clear button and copy-to-clipboard functionality.
- Use a well-documented utility function for translation logic.

### 3. Read Aurebesh Page
- Display Aurebesh characters and their English equivalents.
- Allow users to practice reading by showing random Aurebesh words/phrases.
- Include interactive elements (e.g., flashcards, quizzes).
- All components and logic should be documented.

### 4. Settings Page
- Allow users to customize app preferences (e.g., theme, font size, learning mode).
- Store settings using Expo's recommended storage solution.
- Document all settings logic and UI components.

## Code Organization (EXAMPLE!)

- `src/`
	- `components/` — Reusable UI components.
	- `screens/` — Main app screens (Write, Read, Settings).
	- `utils/` — Utility functions (e.g., translation logic).
	- `assets/` — Fonts, images, Aurebesh character SVGs.
	- `types/` — TypeScript type definitions.
	- `navigation/` — Navigation setup (React Navigation).
	- `context/` — Context providers (e.g., settings, theme).
- Each folder should have an `index.ts` if appropriate for exports.

## Documentation Standards

- Every function, class, and component must have a JSDoc/TSDoc comment explaining its purpose, parameters, and return values.
- Inline comments should explain complex logic or design decisions.
- Do not use comments that reflect recent changes (e.g., "updated to 5"). Instead, explain the reasoning behind the code.

## Professionalism

- All code should be formatted using Prettier and linted with ESLint.
- Use meaningful commit messages.
- Avoid unnecessary code or files.
- Ensure the app runs smoothly on both iOS and Android via Expo.

## Example Comment

```typescript
/**
 * Translates a string from English to Aurebesh or vice versa.
 * @param input - The text to translate.
 * @param direction - 'toAurebesh' or 'toEnglish'.
 * @returns The translated string.
 */
function translateAurebesh(input: string, direction: 'toAurebesh' | 'toEnglish'): string {
	// Map each character to its Aurebesh equivalent or vice versa.
	// Handles case sensitivity and ignores unsupported characters.
	// ...
}
```

---

**Copilot should always follow these instructions to ensure the codebase is professional, maintainable, and easy for contributors to understand.**
