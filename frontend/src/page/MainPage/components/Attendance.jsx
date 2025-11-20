import { useEffect, useMemo, useState } from "react";


function Attendance(){

    const [sessions , setSessions] = useState([]);
    const [attend , setAttend] = useState([]);

    const [option , setOption] = useState(null);

    useEffect(() => {

        const fecthAttendance = async () => {

            try{

                const responses = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/attendances` , {
                    credentials : 'include',
                })

                const data = await responses.json();

                setSessions(data.sessions);
                setAttend(data.attendance);
                setOption(data.sessions[0].sessions_id)
            }catch(err){
                console.log(err);
            }
        }

        fecthAttendance();

    } , [])

    const attendanceArray = useMemo( () => { 

        const arr = attend.filter(a => a.sessions_id == option );
        return arr;

    } , [attend , option])
    

    const attendance = async (id , sign) => {

        try{

            const responses = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/attendances` , {
                credentials : 'include',
                method : `${sign ? 'POST' : 'DELETE'}`,
                headers : {'Content-type' : 'application/json'},
                body : JSON.stringify({
                    sessionId :  option,
                    memberId : id
                })
            })

            const data = await responses.json();
            console.log(data);

            if(data.success){
                const updated = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/attendances`, { credentials: 'include' });
                const jsonData = await updated.json();
                setAttend(jsonData.attendance);
            }


        }catch(err){
            console.log(err);
        }

    }


    return(

        <div id="attendance" className="tab-content active">
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Today's Attendance</h2>
                    <div>
                        <span>Session: </span>
                        <select value={option || ''} onChange={(e) => setOption(e.target.value)}>
                            {
                                sessions.map(s => 
                                    <option value={s.sessions_id} key={s.sessions_id}>{s.session_name}</option>
                                )
                            }
                        </select>
                    </div>
                </div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Member Name</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                attendanceArray.length > 0 ? (
                                    attendanceArray.map(a => 
                                        
                                        <tr key={a.members_id}>
                                            <td>{a.members_name}</td>
                                            <td>
                                                {
                                                    a.attended !== null ? (
                                                        <span style={{color: "var(--success)"}}>Present</span>
                                                    ) : (
                                                        <span style={{color: "var(--danger)"}}>Absent</span>
                                                    )
                                                }
                                                
                                            </td>
                                            <td>
                                                {
                                                    a.attended !== null ?  (
                                                        <button 
                                                            className="btn btn-outline" style={{padding: "0.4rem 0.8rem"}}
                                                            onClick={() => attendance(a.members_id , false)}  
                                                             
                                                        >
                                                            Mark Absent
                                                        </button>
                                                    ) : (
                                                        <button 
                                                            className="btn btn-success" style={{padding: "0.4rem 0.8rem"}}
                                                            onClick={() => attendance(a.members_id , true)}  
                                                        > 
                                                            Mark Present
                                                        </button>  
                                                    ) 
                                                }
                                            </td>  
                                        </tr>
                                    )
                                ) : (
                                    <tr>No Data</tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Attendance;