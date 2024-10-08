import Image from "next/image";
import styles from "../header.module.css";

interface Avatar {
  avatarUrl: string;
  toggleProfileMenu: () => void;
}

export default function Avatar({ avatarUrl, toggleProfileMenu }: Avatar) {
  return (
    <div className={styles["user-avatar-container"]} onClick={toggleProfileMenu}>
      <Image
        src={avatarUrl}
        width={40}
        height={40}
        alt='User Avatar'
        className={styles["user-avatar"]}
      />
    </div>
  );
}
