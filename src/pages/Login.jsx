// Login.js
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

function Login() {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      if (user.email !== "kiskovi97@gmail.com") {
        alert("You are not authorized to access this page.");
        await signOut(auth);
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Google Sign-In Error");
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
}

export default Login;
