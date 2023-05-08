import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import styles from "./Home.module.css";
import ImgDashboard from "../../assets/images/banner-dashboard.jpg";
import { Menu } from "../../components/Menu";

export function Home() {
    return (
      <div>
        <Header />
        <div className={styles.wrapper}>
          <div>
            <Sidebar />
          </div>
  
          <main>
                <Menu />
                <img src={ImgDashboard} className={styles.imageDashboard}/>
          </main>
        </div>
    </div>
    )
}