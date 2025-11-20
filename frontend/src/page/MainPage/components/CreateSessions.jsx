

function CreateSessions({open , close}){

    return(

        <div className={`modal ${open ? 'active' : ''}`} id="create-session-modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title">Create New Session</h3>
                    <button className="modal-close"
                        onClick={close}
                    >&times;</button>
                </div>
                <div className="modal-body">
                    <form id="create-session-form">
                        <div className="form-group">
                            <label for="session-name">Session Name</label>
                            <input type="text" id="session-name" placeholder="e.g., Tafsir Session, Fiqh Discussion" required/>
                        </div>
                        <div className="form-group">
                            <label for="session-date">Session Date</label>
                            <input type="date" id="session-date" required/>
                        </div>
                        <div className="form-group">
                            <label for="session-description">Description (Optional)</label>
                            <textarea id="session-description" rows="3" placeholder="Brief description of the session"></textarea>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-outline" id="cancel-session-btn"
                        onClick={close}
                    >Cancel</button>
                    <button className="btn btn-primary" id="save-session-btn">Create Session</button>
                </div>
            </div>
        </div>
    )
}

export default CreateSessions;