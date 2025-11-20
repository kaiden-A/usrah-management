import { useEffect, useState } from "react";
import LoadingSpinner from '../../Global/LoadingSpinner'

import AddMembers from "./AddMembers";

function Members(){

    const [members , setMembers] = useState({});
    const [loading , setLoading] = useState(true);
    const [addMem , setAddMem] = useState(false);

    useEffect(() => {

        const fetchMembers = async () => {

            try{    

                const responses = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/members` , {
                    credentials : 'include',
                    method : 'GET'
                })

                const data = await responses.json();

                console.log(data);

                setMembers(data.members);
                setLoading(false);

            }catch(err){
                console.log(err);
            }

        }

        fetchMembers();

    } , [])

    if(loading){
        return <LoadingSpinner text="fetch members" size="medium"/>
    }

    const deleteMembers = async (id) => {

        try{

            const responses = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/members/${id}` , {
                method : 'DELETE',
                credentials : 'include'
            });

            const data = await responses.json();

            if(data.success){

                setMembers(m => 
                    m.filter(item => item.members_id !== id)
                )
            }

        }catch(err){
            console.log(err);
        }
    }

    return(
        <>
            <div id="members" className="tab-content active">
                <div className="card">
                    <div className="card-header">
                        <h2 className="card-title">Usrah Members</h2>
                        <button className="btn btn-primary" id="add-member-btn"
                            onClick={() => setAddMem(!addMem)}
                        >
                            <i className="fas fa-plus"></i> Add New Member
                        </button>
                    </div>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Student No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    members.length > 0 ? (
                                        members.map((member , i) => 
                                            <tr key={i}>
                                                <td>{member.members_id}</td>
                                                <td>{member.members_name}</td>
                                                <td>{member.email}</td>
                                                <td><span style={{color: "var(--success)"}}>Active</span></td>
                                                <td>
                                                    <button className="btn btn-outline" style={{padding: "0.4rem 0.8rem"}}>
                                                        <i className="fas fa-edit"></i>
                                                    </button>
                                                    <button 
                                                        className="btn btn-danger" style={{padding: "0.4rem 0.8rem"}}
                                                        onClick={() => deleteMembers(member.members_id)}   
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    ) : (
                                        <p>No Members Yet</p>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <AddMembers
                open={addMem}
                close={() => setAddMem(!addMem)}
                setMember={setMembers}
            />
        </>
    )

}

export default Members;