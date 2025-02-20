import styles from "./Header.module.css";
import SelectUser from "../SelectUser/SelectUser.jsx";

function Header({ changedUser }) {
  const changeUser = (e) => {
    changedUser(e.target.value);
    console.log(e.target.value);
  };
  return (
    <>
      <img className={styles.logo} src="/logo.svg" alt="Логотип" />
      <SelectUser changedUser={changeUser} />
    </>
  );
}

export default Header;
