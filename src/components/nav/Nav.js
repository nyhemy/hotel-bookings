import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './Nav.module.css';

/**
 * The header component, which will always remain onscreen and includes various navlinks that change depending on user role
 * 
 * @param {*} props are props passed when component is called
 */
const Nav = (props) => {
    
    // loggedIn and isManager are booleans
    const {loggedIn, isManager} = props;

    return (
        <nav className={styles.nav}>
            <h3>Hotel Bookings</h3>

            {loggedIn && <>
                <NavLink exact to="/reservations" className={styles.link} activeClassName={styles.active}>
                    Reservations
                </NavLink>

                {isManager && <NavLink exact to="/room-types" className={styles.link} activeClassName={styles.active}>
                    Rooms
                </NavLink>}

                <Link to="/logout" className={styles.link}>Logout</Link>
            </>}

        </nav>
    );
}

export default Nav;