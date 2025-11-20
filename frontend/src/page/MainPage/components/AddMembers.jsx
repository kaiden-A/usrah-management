import { useState } from "react";


function AddMembers({open , close , setMember}){

    const [email , setEmail] = useState("");
    const [name , setName] = useState("");
    const [username , setUsername] = useState("");


    const addMember = async () => {

        try{

            const responses = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/members/${username}` , {
                method : 'POST',
                credentials : 'include',
                headers : {'Content-type' : 'application/json'},
                body : JSON.stringify({name , email})
            });

            const data = await responses.json();
            console.log(data)

            if(data.success){
                setMember(m => [...m , data.data ])
            }

        }catch(err){
            console.log(err);
        }
    }

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
                    <form>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Student No</label>
                                <input type="text"  
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}    
                                />
                            </div>
                            <div className="form-group">
                                <label >Full Name</label>
                                <input type="text" 
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label >Email</label>
                                <input type="email" 
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="member-status">Status</label>
                                <select id="member-status" required>
                                    <option value="active">Active</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-outline" 
                        onClick={close}
                    >Cancel</button>
                    <button className="btn btn-primary" 
                        onClick={addMember}
                    >
                        Save Member
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddMembers;