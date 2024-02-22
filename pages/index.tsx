import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import UserStatus from "../components/userStatus";

const Home: NextPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.statusContainer}>
          <UserStatus />
        </div>
      </div>
    </main>
  );
};

export default Home;
