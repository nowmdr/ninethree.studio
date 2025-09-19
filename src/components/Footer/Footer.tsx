import styles from "./footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.projectDetailFooter}>
      <div className={styles.projectDetailFooterTop}>
        <div className={styles.sloganBox}>
          <span className={styles.sloganBoxRectangle}></span>
          <p className={styles.sloganBoxText}>Let’s work together.</p>
        </div>
        <div className={styles.projectDetailFooterItem}>
          <h3>Working Hours</h3>
          <p>Mon–Thu</p>
          <p>9 AM–5 PM</p>
        </div>
        <div className={styles.projectDetailFooterItem}>
          <h3>Studio</h3>
          <p>Croatia</p>
          <p>10 000 Zagreb</p>
          <p>N 45° 46' 31.634''</p>
          <p>E 16° 1' 41.357''</p>
        </div>
      </div>
      <div className={styles.projectDetailFooterBottom}>
        <div className={styles.projectDetailFooterItem}>
          <h3>
            ©NINETHREE 2025
            <br />
            ALL RIGHTS RESERVED
          </h3>
        </div>
        <div className={styles.projectDetailFooterItem}>
          <h3>Socials</h3>
          <a href="https://www.instagram.com/ninethree.studio/">Instagram</a>
        </div>
        <div className={styles.projectDetailFooterItem}>
          <h3>Reach Out</h3>
          <a href="mailto:hello@ninethree.studio">hello@ninethree.studio</a>
        </div>
      </div>
    </footer>
  );
};
