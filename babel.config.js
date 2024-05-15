module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module:react-native-dotenv', {
        'path': '.env', // Path to your .env file
        'allowUndefined': true, // Allow undefined variables
        'verbose': false, // Optional: Enable verbose logging
      },
    ],
  ],
};