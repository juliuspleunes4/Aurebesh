# Aurebesh

<p align="left">
  <img src="aurebesh-app/assets/aurebesh_readme.png" alt="Aurebesh" width="500">
</p>

<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" width="32" title="TypeScript">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React Native" width="32" title="React Native">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/expo/expo-original.svg" alt="Expo" width="32" title="Expo">
</p>

**Aurebesh** is a comprehensive React Native + Expo mobile application designed to teach users the Aurebesh writing system from the Star Wars universe. This open-source educational app provides an interactive and accessible learning experience for all users, featuring modern UI design, smooth animations, and comprehensive learning tools.

## 🚀 Features (Coming soon!)

- **📚 Learn Aurebesh**: Interactive learning mode where users see Aurebesh text and translate to English
- **✍️ Write Aurebesh**: Real-time text conversion between English and Aurebesh with copy functionality
- **👀 Read Aurebesh**: Character reference and practice with flashcards and quizzes
- **⚙️ Settings**: Customizable preferences including themes, font sizes, and account management
- **🔐 Authentication**: Secure user accounts with Supabase integration and session persistence
- **📱 Cross-Platform**: Runs smoothly on both iOS and Android via Expo
- **🎨 Modern UI**: Beautiful, accessible interface with smooth animations and transitions
- **🔤 Custom Typography**: Integrated NOYH R Medium font for consistent branding
- **🌟 Educational Focus**: Designed specifically for effective language learning

## 📁 Project Structure

```
aurebesh/
├── 📱 aurebesh-app/               # Main React Native + Expo application
│   ├── 🎯 App.tsx                # Root application component
│   ├── 📋 app.json               # Expo configuration
│   ├── 📦 package.json           # Dependencies and scripts
│   ├── 🔧 tsconfig.json          # TypeScript configuration
│   ├── 🎨 assets/                # App icons, images, and graphics
│   │   ├── icon.png              # Main app icon
│   │   ├── splash-icon.png       # Splash screen image
│   │   ├── glow_login.png        # Login screen graphics
│   │   └── glow_register.png     # Registration screen graphics
│   └── 🗂️ src/                   # Source code directory
│       ├── 🧩 components/        # Reusable UI components
│       │   ├── AnimatedAuthNavigator.tsx  # Custom auth navigation
│       │   └── index.ts          # Component exports
│       ├── 📱 screens/           # Main application screens
│       │   ├── LoginScreen.tsx   # User authentication
│       │   ├── RegisterScreen.tsx # Account creation
│       │   ├── HomeScreen.tsx    # Main dashboard
│       │   └── index.ts          # Screen exports
│       ├── 🧭 navigation/        # Navigation setup
│       │   └── AppNavigator.tsx  # Main navigation logic
│       ├── 🌐 context/           # React context providers
│       │   └── AuthContext.tsx   # Authentication state management
│       ├── 🔧 utils/             # Utility functions
│       │   ├── fonts.ts          # Font loading and management
│       │   └── supabase.ts.example # Database configuration template
│       ├── 🎨 assets/            # Fonts and resources
│       └── 📝 types/             # TypeScript type definitions
├── 📄 LICENSE                    # Apache 2.0 license
├── 📖 README.md                  # This file
├── 📦 package.json               # Root project dependencies
└── 🔒 .gitignore                 # Git ignore rules
```

## 🛠️ Installation

### Prerequisites
- **Node.js 18+** (Latest LTS recommended)
- **Expo CLI** (`npm install -g @expo/cli`)
- **Git** for version control
- **iOS Simulator** (macOS) or **Android Studio** (cross-platform)
- **Supabase Account** (for authentication backend)

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/juliuspleunes4/aurebesh.git
   cd aurebesh/aurebesh-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Supabase** (Required for authentication):
   ```bash
   # Copy the example configuration
   cp src/utils/supabase.ts.example src/utils/supabase.ts
   
   # Edit src/utils/supabase.ts with your Supabase credentials
   # Get these from your Supabase project dashboard
   ```

4. **Update Supabase configuration**:
   ```typescript
   // src/utils/supabase.ts
   const supabaseUrl = 'YOUR_SUPABASE_PROJECT_URL';
   const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
   ```

5. **Start the development server**:
   ```bash
   npm start
   ```

6. **Run on your preferred platform**:
   ```bash
   # iOS Simulator (macOS only)
   npm run ios
   
   # Android Emulator
   npm run android
   
   # Web browser (for testing)
   npm run web
   ```

## 🎯 Quick Start

Ready to start learning Aurebesh? Here's how to get up and running:

### **🚀 3-Step Quick Start**

```bash
# Step 1: Install and setup
git clone https://github.com/juliuspleunes4/aurebesh.git
cd aurebesh/aurebesh-app && npm install

# Step 2: Configure authentication (see Setup Instructions above)
cp src/utils/supabase.ts.example src/utils/supabase.ts
# Edit supabase.ts with your credentials

# Step 3: Launch the app
npm start
```

**That's it!** The app will open in Expo Go on your device or in your simulator. Create an account and start learning Aurebesh immediately.

### **📱 App Navigation:**
- **Registration/Login**: Secure account creation with email verification
- **Home Dashboard**: Access to all learning features and account management
- **Learn Mode**: Practice translating Aurebesh to English (Coming Soon)
- **Write Mode**: Real-time text conversion tools (Coming Soon)
- **Read Mode**: Character reference and flashcards (Coming Soon)

---

### **📚 Learning Features**

1. **Interactive Learning**: See Aurebesh text and practice translation
2. **Real-time Translation**: Convert between English and Aurebesh instantly
3. **Character Reference**: Complete Aurebesh alphabet with examples
4. **Progress Tracking**: Monitor your learning journey with user accounts

## 🏗️ App Architecture

Aurebesh implements a modern React Native architecture with:

- **TypeScript**: Full type safety across the entire codebase
- **React Navigation**: Smooth navigation between screens with custom animations
- **Supabase Integration**: Secure authentication and user data management
- **Context API**: Global state management for authentication and settings
- **Custom Fonts**: NOYH R Medium for consistent and easy-to-read typography
- **Expo Framework**: Rapid development and easy deployment to app stores

### Authentication Flow

| Screen | Purpose | Features | Navigation |
|--------|---------|----------|------------|
| **Login** | User authentication | Email/password, session persistence | → Home (authenticated) |
| **Register** | Account creation | Email confirmation, privacy policy | → Login (after registration) |
| **Home** | Main dashboard | Feature access, user management | → Learning modules |

### Learning Modules (Planned)

| Module | Description | Difficulty | Interactive Elements |
|--------|-------------|------------|---------------------|
| **Learn** | Translation practice | Beginner | Hints, show answer, progress tracking |
| **Write** | Text conversion | Intermediate | Real-time translation, copy/clear |
| **Read** | Character reference | All levels | Flashcards, quizzes, examples |

## 🔧 Configuration

### Environment Setup

The app uses environment-specific configuration files:

#### Expo Configuration (`app.json`)
```json
{
  "expo": {
    "name": "aurebesh-app",
    "slug": "aurebesh-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "platforms": ["ios", "android", "web"],
    "icon": "./assets/icon.png"
  }
}
```

#### TypeScript Configuration (`tsconfig.json`)
```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true
  }
}
```

#### Code Quality (`eslintrc.json`)
```json
{
  "extends": ["expo", "plugin:@typescript-eslint/recommended"],
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "warn"
  }
}
```

## 📚 Development Guidelines

### Code Quality Standards

- **TypeScript**: All source code uses TypeScript with strict type checking
- **ESLint**: Automated linting with TypeScript-specific rules
- **Prettier**: Consistent code formatting across the project
- **Documentation**: Comprehensive JSDoc comments for all functions and components
- **Testing**: Unit tests for critical logic (translation functions, etc.)

### Component Structure

```typescript
/**
 * Example component with proper documentation.
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

### Folder Organization

- **`components/`**: Reusable UI components with proper TypeScript interfaces
- **`screens/`**: Main app screens with navigation props and state management
- **`utils/`**: Utility functions including translation logic and font management
- **`context/`**: React context providers for global state (auth, settings, theme)
- **`navigation/`**: Navigation setup and routing configuration
- **`types/`**: TypeScript type definitions and interfaces

## 🧪 Testing

### Running Tests
```bash
# Install testing dependencies
npm install --save-dev jest @testing-library/react-native

# Run test suite
npm test

# Run with coverage
npm run test:coverage
```

### Test Structure
- **Unit Tests**: Critical logic functions (translation, validation)
- **Component Tests**: UI component rendering and interactions
- **Integration Tests**: Authentication flow and navigation

## 🚀 Deployment

### Build for Production

```bash
# Build for iOS
expo build:ios

# Build for Android
expo build:android

# Publish update (over-the-air)
expo publish
```

### App Store Distribution

1. **iOS App Store**: Use `expo build:ios` and upload to App Store Connect
2. **Google Play Store**: Use `expo build:android` and upload APK/AAB
3. **Expo Go**: Use `expo publish` for development builds

## 🔧 Troubleshooting

### Common Issues

**1. Supabase connection errors**
```bash
# Check your supabase.ts configuration
# Ensure URL and anon key are correct from your Supabase dashboard
```

**2. Font loading issues**
```typescript
// Fonts are loaded automatically in App.tsx
// Check that font files exist in src/assets/fonts/
```

**3. Navigation type errors**
```typescript
// Ensure RootStackParamList is properly defined
// Check that all screen parameters match type definitions
```

**4. Build errors on iOS/Android**
```bash
# Clear Expo cache
expo r -c

# Clean install dependencies
rm -rf node_modules && npm install
```

## 📊 Current Status

**Aurebesh is actively in development:**

- ✅ **Authentication System**: Complete with Supabase integration
- ✅ **Core Navigation**: Animated transitions between auth screens
- ✅ **UI Foundation**: Modern design with custom typography
- ✅ **Project Structure**: Professional codebase organization
- ✅ **TypeScript Setup**: Full type safety implementation
- 🔄 **Learning Modules**: UI framework ready, translation logic in development
- 📈 **Features**: Core app functionality and educational content being added

## 🤝 Contributing

We welcome contributions to make Aurebesh the best Aurebesh learning app possible!

### Getting Started

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Follow our coding standards** (TypeScript, ESLint, Prettier)
4. **Add tests** for new functionality
5. **Update documentation** for new features
6. **Commit your changes** (`git commit -m 'Add amazing feature'`)
7. **Push to the branch** (`git push origin feature/amazing-feature`)
8. **Open a Pull Request**

### Contribution Guidelines

- **Code Quality**: Follow TypeScript best practices and our ESLint configuration
- **Documentation**: Add JSDoc comments for all new functions and components
- **Testing**: Include unit tests for translation logic and critical features
- **Accessibility**: Ensure all UI components are accessible to all users
- **Performance**: Optimize for smooth performance on both iOS and Android

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Star Wars Universe** - For the fascinating Aurebesh writing system
- **React Native Community** - For the excellent mobile development framework
- **Expo Team** - For simplifying React Native development and deployment
- **Supabase** - For providing robust authentication and database services
- **TypeScript Team** - For bringing type safety to JavaScript development

## 📞 Support

For questions, bug reports, and feature requests:

- **Issues**: [Open an issue on GitHub](https://github.com/juliuspleunes4/aurebesh/issues)
- **Discussions**: Use GitHub Discussions for general questions
- **Website**: Visit [aurebesh.app](https://aurebesh.app) for more information
- **Documentation**: Check this README and inline code documentation

---

> *"The ability to speak does not make you intelligent."*  
> — *Qui-Gon Jinn*  
> 
> **But the ability to read and write Aurebesh definitely makes you cooler!**

**Built with ❤️ and enough errors to fill the Death Star by [Julius Pleunes](https://linkedin.com/in/juliuspleunes)**
