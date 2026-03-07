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

    //if signed up you can just signin with password
    const action = isSignUp
      ? supabase.auth.signUp({ email, password })
      : supabase.auth.signInWithPassword({ email, password });

    const { error } = await action;
    setIsSubmitting(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    //setmessage is to give text
    if (isSignUp) {
      setMessage("Signup successful. Check email if confirmation is enabled.");
    } else {
      setMessage("Login successful.");
    }
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
      <section className="username">
        {"Enter a cool username. This name will be displayed to other"}
        <form className="usernameForm">
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </form>
      </section>
      <section className="auth-card">
        {/* checking if we are signed in */}
        <h2>{isSignUp ? "Create account" : "Login"}</h2>

        <form onSubmit={handleEmailAuth} className="auth-form">
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
