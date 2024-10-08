import { googleLogout } from "@react-oauth/google";
import { signOut as firebaseSignout } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import styles from "../header.module.css";

export default function ProfileMenu({ removeCredential, displayName }: any) {
  const handleLogout = () => {
    googleLogout();
    firebaseSignout(auth)
      .then(() => {
        console.log("Successfully logged out from Firebase");
      })
      .catch((error) => {
        console.error("Error signing out from Firebase: ", error);
      });
    localStorage.removeItem("authToken");
    removeCredential();
    console.log("successfully logged out");
  };

  return (
    <ul className={styles["header_user-profile-section"]}>
      <h3 className={styles["user-profile-header"]}>Hello, {displayName.split(" ")[0]}!</h3>
      <li>
        <p>Settings</p>
      </li>
      <li onClick={handleLogout}>
        <p>Log Out</p>
      </li>
    </ul>
  );
}
