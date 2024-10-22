import { googleLogout } from "@react-oauth/google";
import { signOut as firebaseSignout } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import styles from "../header.module.css";
import ContextMenu from "../../ContextMenu";
import React from "react";
import type { ProfileMenu, MenuOption } from "@/util/types";

const classNames = ["user-profile-menu", "user-profile-menu-header"];
const [containerStyle, menuHeaderStyle] = classNames.map((className) => styles[className]);

export default function ProfileMenu({ removeCredential, displayName, closeMenu }: ProfileMenu) {
  const menuHeaderText = `Hello, ${displayName.split(" ")[0]}!`;
  const menuOptions = [
    ["Settings", () => {}],
    ["Log Out", handleLogout],
  ].map(([text, handleClick]) => ({ text, handleClick })) as MenuOption[];

  function handleLogout() {
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
    closeMenu();

    console.log("successfully logged out");
  }

  return (
    <ContextMenu {...{ containerStyle, menuHeaderStyle, menuHeaderText, menuOptions, closeMenu }} />
  );
}
