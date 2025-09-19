import { Footer } from "@/components/Footer/Footer";
import styles from "./page.module.css";
export default function Studio() {
  return (
    <div className={styles.studio}>
      <div className={styles.studioContentWrapper}>
        <Footer />
        <div className={styles.studioContent}>
          <img
            className={styles.studioContentImage}
            src="/images/final_v2_black_web.webp"
            alt="Studio"
          />
          <div className={styles.studioContentText}>
            <p>
              We’re not a big agency. Ninethree was built to be personal, agile,
              and close to the work. You’ll talk to the person designing your
              project, not a project manager.
            </p>
            <p>
              Being hands-on projects and chasing ideas make us pause, laugh, or
              look twice. And we especially like working with people who get
              that. If you’re after something honest, considered, and a little
              bit different, we should probably talk. We are a small,
              independent design practice built on instinct, curiosity, and a
              belief that great design should feel effortless. Based in Croatia,
              we work globally with brands, startups, and people who care about
              how things look, move, and make you feel
            </p>
            <p>
              At our core, we’re about clarity and character. Every project we
              take on gets stripped back to sharp ideas, clean execution, and a
              tone that feels human.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.TextSvg}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 1492 151"
          fill="none"
        >
          <path
            d="M0 151V0H48.7842L155.3 120.842V0H188.32V151H139.535L33.0198 29.7328V151H0Z"
            fill="#0D0D0D"
          />
          <path d="M205.767 151V0H238.786V151H205.767Z" fill="#0D0D0D" />
          <path
            d="M256.129 151V0H304.913L411.428 120.842V0H444.448V151H395.664L289.148 29.7328V151H256.129Z"
            fill="#0D0D0D"
          />
          <path
            d="M461.895 151V0H612.082V25.2729H494.915V63.7131H607.822V87.0745H494.915V125.727H612.082V151H461.895Z"
            fill="#0D0D0D"
          />
          <path
            d="M616.226 28.0337V0H791.977V28.0337H720.825V151H687.592V28.0337H616.226Z"
            fill="#0D0D0D"
          />
          <path
            d="M798.326 151V0H831.346V61.5893H946.17V0H979.19V151H946.17V89.4107H831.346V151H798.326Z"
            fill="#0D0D0D"
          />
          <path
            d="M991.742 151V0H1109.34C1149.81 0 1168.98 15.2911 1168.98 43.962C1168.98 64.3502 1157.91 77.73 1137.24 83.4641C1155.99 84.1013 1168.13 94.9325 1168.13 112.772V151H1134.9V117.657C1134.9 104.065 1128.93 98.5429 1115.09 98.5429H1024.76V151H991.742ZM1024.76 71.7834H1102.09C1122.97 71.7834 1134.69 65.6245 1134.69 48.8467C1134.69 31.8565 1122.97 26.7595 1102.09 26.7595H1024.76V71.7834Z"
            fill="#0D0D0D"
          />
          <path
            d="M1180.36 151V0H1330.55V25.2729H1213.38V63.7131H1326.28V87.0745H1213.38V125.727H1330.55V151H1180.36Z"
            fill="#0D0D0D"
          />
          <path
            d="M1341.81 151V0H1492V25.2729H1374.83V63.7131H1487.74V87.0745H1374.83V125.727H1492V151H1341.81Z"
            fill="#0D0D0D"
          />
        </svg>
      </div>
    </div>
  );
}
