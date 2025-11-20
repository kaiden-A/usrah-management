import { useState , useEffect } from "react";
import CreateSessions from "./CreateSessions";

function Sessions(){

    const [sessions , setSessions] = useState([]);
    const [totalMem , setTotalMem] = useState({})
    const [openSession , setOpenSession] = useState(false);

    useEffect(() => {

        const fetchSessions = async () => {

            try{

                const responses = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/sessions` , {
                    credentials : 'include'
                })

                const data = await responses.json();
                setSessions(data.sessions);
                setTotalMem(data.totalMem.totalMembers);
            }catch(err){
                console.log(err);
            }
        }

        fetchSessions();

    } , [])


    return(
        <>
            <div id="sessions" className="tab-content active">
                <div className="card">
                    <div className="card-header">
                        <h2 className="card-title">Usrah Sessions</h2>
                        <button className="btn btn-primary" id="create-session-btn"
                            onClick={() => setOpenSession(!openSession)}
                        >
                            <i className="fas fa-plus"></i> Create New Session
                        </button>
                    </div>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Session Name</th>
                                    <th>Attendance</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    sessions.length > 0 ? (

                                        sessions.map(s => 
                                            <tr>
                                                <td>{s.date}</td>
                                                <td>{s.name}</td>
                                                <td>{`${s.attendance}/${totalMem}`}</td>
                                                <td><span style={{color: "var(--success)"}}>Completed</span></td>
                                                <td>
                                                    <button className="btn btn-outline" style={{padding: "0.4rem 0.8rem"}}>
                                                        <i className="fas fa-edit"></i>
                                                    </button>
                                                    <button className="btn btn-danger" style={{padding: "0.4rem 0.8rem"}}>
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )

                                    ) : (
                                        <tr>No Created Sessions</tr>
                                    )
                                }
        
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <CreateSessions
                open={openSession}
                close={() => setOpenSession(!openSession)}
            />
        </>
    )
}

export default Sessions;