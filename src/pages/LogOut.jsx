// Login.js
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function LogOut() {

  const handleGoogleSignIn = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Google Sign-Out Error:", error);
      alert("YGoogle Sign-In Error");
    }
  };

  return (
    <div>
      <button onClick={handleGoogleSignIn}>LogOut</button>
    </div>
  );
}

export default LogOut;
