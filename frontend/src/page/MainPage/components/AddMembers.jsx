

function AddMembers({open , close}){

    return(
        <div className={`modal ${open ? 'active' : ''}`} id="add-member-modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title">Add New Member</h3>
                    <button className="modal-close"
                        onClick={close}
                    >&times;</button>
                </div>
                <div className="modal-body">
                    <form id="add-member-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Student No</label>
                                <input type="text"  required/>
                            </div>
                            <div className="form-group">
                                <label >Full Name</label>
                                <input type="text" required/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label >Email</label>
                                <input type="email" required/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label for="member-status">Status</label>
                                <select id="member-status" required>
                                    <option value="active">Active</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-outline" id="cancel-member-btn"
                        onClick={close}
                    >Cancel</button>
                    <button className="btn btn-primary" id="save-member-btn">Save Member</button>
                </div>
            </div>
        </div>
    )
}

export default AddMembers;