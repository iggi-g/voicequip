// src/config/api.js

// To use the Whisper API key:
// 1. Create a .env file in the root of your project if it doesn't exist
// 2. Add the following line to your .env file:
//    VITE_WHISPER_API_KEY=your_api_key_here
// 3. Replace 'your_api_key_here' with your actual Whisper API key
// 4. Restart your development server

export const WHISPER_API_KEY = import.meta.env.VITE_WHISPER_API_KEY || '';

// You can now import WHISPER_API_KEY in any file where you need to use it
// Example usage:
// import { WHISPER_API_KEY } from '../config/api';