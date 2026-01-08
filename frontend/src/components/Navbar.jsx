import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Navigation.module.css";


export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <Link className={styles.link} to="/">
        Surveys
      </Link>

      {token && (
        <Link className={styles.link} to="/create">
          Create Survey
        </Link>
      )}

      {!token ? (
        <>
          <Link className={styles.link} to="/login">
            Login
          </Link>
          <Link className={styles.link} to="/register">
            Register
          </Link>
        </>
      ) : (
        <button className={styles.logoutBtn} onClick={logout}>
          Logout
        </button>
      )}
    </nav>
  );
}
