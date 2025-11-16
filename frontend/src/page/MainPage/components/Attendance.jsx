

function Attendance(){

    return(

        <div id="attendance" className="tab-content active">
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Today's Attendance</h2>
                    <div>
                        <span>Session: </span>
                        <select>
                            <option>Friday Tafsir</option>
                            <option>Sunday Fiqh</option>
                            <option>Tuesday Hadith</option>
                        </select>
                    </div>
                </div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Member Name</th>
                                <th>Status</th>
                                <th>Time</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Ahmad Malik</td>
                                <td><span style={{color: "var(--success)"}}>Present</span></td>
                                <td>08:15 AM</td>
                                <td>
                                    <button className="btn btn-outline" style={{padding: "0.4rem 0.8rem"}}>
                                        Mark Absent
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>Sarah Johnson</td>
                                <td><span style={{color: "var(--danger)"}}>Absent</span></td>
                                <td>-</td>
                                <td>
                                    <button className="btn btn-success" style={{padding: "0.4rem 0.8rem"}}>
                                        Mark Present
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Attendance;