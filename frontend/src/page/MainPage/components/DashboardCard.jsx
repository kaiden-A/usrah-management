

function DashboardCard({members , sessions}){

    return(

        <div className="stats-container">
            <div className="stat-card">
                <div className="stat-icon" style={{backgroundColor: "var(--primary)"}}>
                    <i className="fas fa-users"></i>
                </div>
                <div className="stat-info">
                    <h3>{members}</h3>
                    <p>Total Members</p>
                </div>
            </div>
            <div className="stat-card">
                <div className="stat-icon" style={{backgroundColor: "var(--success)"}}>
                    <i className="fas fa-user-check"></i>
                </div>
                <div className="stat-info">
                    <h3>18</h3>
                    <p>Present Today</p>
                </div>
            </div>
            <div className="stat-card">
                <div className="stat-icon" style={{backgroundColor: "var(--accent)"}}>
                    <i className="fas fa-calendar-alt"></i>
                </div>
                <div className="stat-info">
                    <h3>{sessions}</h3>
                    <p>Usrah Sessions This Sem</p>
                </div>
            </div>
            <div className="stat-card">
                <div className="stat-icon" style={{backgroundColor: "var(--secondary)"}}>
                    <i className="fas fa-chart-line"></i>
                </div>
                <div className="stat-info">
                    <h3>85%</h3>
                    <p>Average Attendance</p>
                </div>
            </div>
        </div>
    )
}

export default DashboardCard;