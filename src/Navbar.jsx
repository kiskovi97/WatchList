import styles from './Header.module.css';
import { Link } from 'react-router'
import LogOut from "./pages/LogOut.jsx";

var Navbar = () =>
{
    return  (
        <div className={styles.Header}>
            <ul>
                <li> <Link to="/">Home</Link></li>
                <li> <Link to="/all" >All</Link></li>
                <LogOut />
            </ul>
        </div>)
}

export default Navbar;
