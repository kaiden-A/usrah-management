import { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import LoadingSpinner from "../../Global/LoadingSpinner";

import exportExcel from   '../../../util/exportExcel.js'

function Dashboard(){

    const [data , setData] = useState({})
    const [loading , setLoading] = useState(true)

    useEffect(() => {

        const fetchData = async () => {

            try{

                const responses = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard` , {
                    method : 'GET',
                    credentials : 'include'         
                })

                const data = await responses.json();

                setData(data);
                setLoading(false);

            }catch(err){
                console.log(err);
            }
        }

        fetchData();

    } , [])

    if(loading){
        return <LoadingSpinner text="fetch data" size="medium"/>
    }
    
    const handleExport = () => {
        exportExcel(data.membersData , "members-data.xlsx")
    }

    return(

         <div id="dashboard" className="tab-content active">

            <DashboardCard
                members={data?.totalMembers}
                sessions={data?.totalSessions}
            />
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Recent Attendance</h2>
                    <button className="btn btn-outline" onClick={() => handleExport()}>
                        <i className="fas fa-download"></i> Export Report
                    </button>
                </div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Session</th>
                                <th>Present</th>
                                <th>Absent</th>
                                <th>Attendance Rate</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                data.membersData.length > 0 ? (

                                    data.membersData.map((member , i) => 
                                        <tr key={i}>
                                            <td>{member.sessions_date}</td>
                                            <td>{member.session_name}</td>
                                            <td>{member.present}</td>
                                            <td>{member.absent}</td>
                                            <td>{` ${member.percentage_rate}%`}</td>
                                        </tr>
                                    )

                                ) : (
                                    <p>No Data</p>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;