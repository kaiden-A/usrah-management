import DashboardCard from "./DashboardCard";

function Dashboard(){

    return(

         <div id="dashboard" class="tab-content active">

            <DashboardCard/>
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">Recent Attendance</h2>
                    <button class="btn btn-outline">
                        <i class="fas fa-download"></i> Export Report
                    </button>
                </div>
                <div class="table-container">
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
                            <tr>
                                <td>15 Oct 2023</td>
                                <td>Tafsir Session</td>
                                <td>20</td>
                                <td>4</td>
                                <td>83%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;