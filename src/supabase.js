import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://qrpaihdwjspdfzliohra.supabase.co";
const supabaseKey = "sb_publishable_NgzNvNBOgoFWKgAkkE6Etg_d1BHuaj5";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

//authentication
// Understand The Flow

// User clicks "Continue with Google" in your React app.
// Supabase redirects to Google.
// Google redirects back to Supabase callback URL.
// Supabase sends user back to your app with a session.
// So your frontend in App.js + Supabase config is enough.

// 2. Configure Google Provider In Supabase

// Open Supabase dashboard for your project.
// Go to Authentication -> Providers -> Google and enable it.
// In Google Cloud Console:
// Create/select a project.
// Configure OAuth consent screen.
// Create OAuth Client ID (Web application).
// Add this redirect URI exactly:
// https://qrpaihdwjspdfzliohra.supabase.co/auth/v1/callback
// Copy Google Client ID and Client Secret into Supabase Google provider settings.
// 3. Configure Redirect URLs In Supabase

// Go to Authentication -> URL Configuration.
// Set Site URL to http://localhost:3000 (for dev).
// Add http://localhost:3000 in Additional Redirect URLs.
// Add your production URL later when deployed.
// 4. Add Login/Logout Code In React
// Use this pattern in App.js:

// 5. Quick Checks

// Click login button -> Google page opens.
// After consent, you return to your app.
// Email appears in UI.
// Refresh page: still logged in.
// Logout works.
// 6. Common Errors (and fixes)

// redirect_uri_mismatch: callback URL in Google Cloud is wrong.
// Login redirects but no session: missing Site URL / redirect URL in Supabase.
// Provider not working: Google provider disabled or wrong client secret.
// Small improvement for later: move keys from supabase.js into .env variables.
// If you want, I can now implement this directly in your App.js with your current layout.

// GPT-5.3-Codex • 0.9x
