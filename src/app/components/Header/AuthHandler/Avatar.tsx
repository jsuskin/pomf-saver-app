import Image from "next/image";
import styles from "../header.module.css";
import { useAppSelector } from "@/app/lib/redux/hooks";
import { selectUser } from "@/app/lib/redux/features/user/userSlice";
import type { UserAvatar } from "@/util/types";

export default function Avatar({ toggleProfileMenu }: UserAvatar) {
  const { photoURL } = useAppSelector(selectUser);
  
  return (
    <div className={styles["user-avatar-container"]} onClick={toggleProfileMenu}>
      <Image
        src={photoURL!}
        width={40}
        height={40}
        alt='User Avatar'
        className={styles["user-avatar"]}
      />
    </div>
  );
}
