
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
                            <div className="user-avatar">N</div>
                            <div>
                                <div id="user-role">Nuqaba</div>
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
                        <li className={`${tab === 'Sessions' ? 'active' : ''}`}
                            onClick={() => setTab('Sessions')}
                        >
                            Sessions
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )

}

export default Header;