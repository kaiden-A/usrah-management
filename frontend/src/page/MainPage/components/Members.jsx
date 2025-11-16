

function Members(){

    return(

        <div id="members" className="tab-content active">
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Usrah Members</h2>
                    <button className="btn btn-primary" id="add-member-btn">
                        <i className="fas fa-plus"></i> Add New Member
                    </button>
                </div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Join Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Ahmad Malik</td>
                                <td>ahmad@example.com</td>
                                <td>+6012-345-6789</td>
                                <td>15 Jan 2023</td>
                                <td><span style={{color: "var(--success)"}}>Active</span></td>
                                <td>
                                    <button className="btn btn-outline" style={{padding: "0.4rem 0.8rem"}}>
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button className="btn btn-danger" style={{padding: "0.4rem 0.8rem"}}>
                                        <i className="fas fa-trash"></i>
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

export default Members;