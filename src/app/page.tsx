import Image from "next/image";
import styles from "./page.module.css";
import Urls from "./pages/urls";

export default function Home() {
  return (
    <main className={styles.main}>
      <Urls />
    </main>
  );
}
