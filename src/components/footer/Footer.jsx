import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>BYTETX</div>
      <div className={styles.text}>
        Bytetx creative thoughts agency © All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
