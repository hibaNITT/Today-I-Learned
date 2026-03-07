import { useState } from "react";
import supabase from "./supabase";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function handleEmailAuth(e) {
    e.preventDefault();

    //is submitting is to diable the submit button
    setIsSubmitting(true);
    setMessage("");

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username, // save custom username
          },
        },
      });

      setIsSubmitting(false);

      if (error) {
        setMessage(error.message);
        return;
      }

      setPassword("");
      setIsSignUp(false);
      setMessage(
        "Signup successful. Check your email to verify your account!!!!! Press the link , then login using those credentials.",
      );
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setIsSubmitting(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Login successful.");
  }

  //standard function
  async function handleGoogleLogin() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });

    if (error) setMessage(error.message);
  }

  return (
    <>
      <section className="auth-card">
        {/* checking if we are signed in */}
        <h2>{isSignUp ? "Create account" : "Login"}</h2>

        <form onSubmit={handleEmailAuth} className="auth-form">
          {isSignUp && (
            <section className="usernameForm">
              {"Enter a cool username. This name will be displayed to other"}
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength={3}
                disabled={isSubmitting}
              />
            </section>
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            disabled={isSubmitting}
          />
          <button className="btn btn-large" disabled={isSubmitting}>
            {isSignUp ? "Sign up" : "Login"}
          </button>
        </form>

        <p className="auth-switch">
          {isSignUp ? "Already have an account?" : "New here?"}{" "}
          <button
            type="button"
            className="link-btn"
            onClick={() => setIsSignUp((v) => !v)}
          >
            {isSignUp ? "Login instead" : "Create account"}
          </button>
        </p>

        {message ? <p className="auth-message">{message}</p> : null}
      </section>
      <section className="google">
        {" "}
        <button className="btn btn-large" onClick={handleGoogleLogin}>
          Continue with Google
        </button>
      </section>
    </>
  );
}
