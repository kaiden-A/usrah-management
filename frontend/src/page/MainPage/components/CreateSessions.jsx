import { useState } from "react";


function CreateSessions({open , close , setSessions}){

    const [sessionName , setSessionName] = useState('');
    const [date , setDate] = useState('');


    const createSession = async (e) => {

        e.preventDefault();

        try{

            const responses = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/sessions` , {
                credentials : 'include',
                method : 'POST',
                headers : {'Content-type' : 'application/json'},
                body : JSON.stringify({sessionName , date})
            })

            const data = await responses.json();
            console.log(data);

            if(data.success){
                setSessions(s => [...s , data.data])
            }

        }catch(err){
            console.log(err);
        }
    }

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
                    <form id="create-session-form" onSubmit={createSession}>
                        <div className="form-group">
                            <label htmlFor="session-name">Session Name</label>
                            <input type="text" 
                                placeholder="e.g., Tafsir Session, Fiqh Discussion" 
                                required
                                value={sessionName}
                                onChange={(e) => setSessionName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="session-date">Session Date</label>
                            <input type="date"  
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}    
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="session-description">Description (Optional)</label>
                            <textarea id="session-description" rows="3" placeholder="Brief description of the session"></textarea>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-outline" id="cancel-session-btn"
                        onClick={close}
                    >Cancel</button>
                    <button type="submit" form="create-session-form" className="btn btn-primary">
                            Create Session
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateSessions;