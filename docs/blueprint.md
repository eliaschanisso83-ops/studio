# **App Name**: AIGameForge

## Core Features:

- AI Game Creation: Users describe their game idea via text prompt, and the AI generates the game type, project structure, scripts, mechanics, and basic assets. Connects to ChatGPT, Google Gemini, or Claude, using the user's API key which is securely stored and encrypted via Supabase.
- Visual Editor (Mobile): Drag-and-drop interface for scene editing. Simple adjustments for game elements: speed, life, score. Preview functionality within the app.
- Game Export: Export games as Web (always free), APK (1 per day), or AAB (1 per week). Limits are in place to prevent abuse.
- User Authentication: Secure authentication via Supabase. Options include login with Google, GitHub, or email + password.
- Project Storage: Game assets, builds, and web exports are stored using Supabase Storage.
- Cloud Build: Automated building of APK/AAB files on a Linux server using Godot headless. Users can either provide their own keystore or generate a temporary one.
- AI Orchestration tool: Process user prompts and use an AI model to generate game code using Edge Functions within Supabase. Then compile into a Godot project for user modification and export.

## Style Guidelines:

- Primary color: A vibrant blue (#29ABE2) to convey creativity and technological innovation. 
- Background color: A very light blue (#E0F7FA) to provide a clean, distraction-free workspace. 
- Accent color: A warm orange (#FF8F00) to highlight interactive elements and call-to-action buttons.
- Headline font: 'Space Grotesk', a geometric sans-serif font, for headlines, lending a modern, tech-oriented feel.
- Body font: 'Inter', a grotesque sans-serif font, is used for the main body of text. 
- Simple, minimalist icons representing different game elements and functionalities.
- Clean and intuitive mobile-first layout, optimized for small screens. Focus on easy navigation and drag-and-drop functionality.