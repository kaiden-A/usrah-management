
import '../styles/Header.css'

function Header({tab , setTab}){



    return(
        <>
            <header>
                <div className="container">
                    <div className="header-content">
                        <div className="logo">
                            <i className="fas fa-users"></i>
                            <h1>Usrah Management System</h1>
                        </div>
                        <div className="user-info">
                            <div className="user-avatar">AM</div>
                            <div>
                                <div id="user-name">Ahmad Malik</div>
                                <div id="user-role">Admin</div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>


            <nav>
                <div className="container">
                    <ul className="nav-tabs">
                        <li className={`${tab === 'Dashboard' ? 'active' : ''}`} 
                            onClick={() => setTab('Dashboard')}
                        >
                            Dashboard
                        </li>
                        <li className={`${tab === 'Members' ? 'active' : ''}`}
                            onClick={() => setTab('Members')}
                        >
                            Members
                        </li>
                        <li className={`${tab === 'Attendance' ? 'active' : ''}`}
                            onClick={() => setTab('Attendance')}
                        >
                            Attendance
                        </li>
                        <li className={`${tab === 'Profile' ? 'active' : ''}`}
                            onClick={() => setTab('Profile')}
                        >
                            My Profile
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )

}

export default Header;