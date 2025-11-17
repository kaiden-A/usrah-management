
import { useState } from 'react';
import '../styles/Login.css'

import {useNavigate} from 'react-router';

function Section(){

    const [nuqaba , setNuqaba] = useState(true);
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");

    const navigate = useNavigate();

    const handleForm = async (e) => {

        e.preventDefault();

        try{

            const responses = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login` , {
                method : 'POST',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify({naqibId : username , password}),
                credentials : 'include'
            });

            const data = await responses.json();
            console.log(data);

            if(data.success){
                navigate('/')
            }

        }catch(err){
            console.log(err);
        }
    }

    return(
        <section className="login-section">
            <div className="container">
                <div className="login-container">
                    <div className="login-card">
                        <div className="login-header">
                            <div className="login-icon">
                                <i className="fas fa-user-shield"></i>
                            </div>
                            <h2 className="login-title">{`${nuqaba ? 'Nuqaba' : 'Member'} Login`}</h2>
                            <p className="login-subtitle">Access the Usrah Management System</p>
                        </div>

                        <form onSubmit={handleForm}>
                            <div className="role-selection">
                                <div className={`role-option ${nuqaba ? 'active' : ''}`}
                                    onClick={() => setNuqaba(true)}
                                >
                                    <div className="role-icon">
                                        <i className="fas fa-user-tie"></i>
                                    </div>
                                    <div>Nuqaba</div>
                                </div>
                                <div className={`role-option ${nuqaba ? '' : 'active'}`}
                                    onClick={() => setNuqaba(false)}
                                >
                                    <div className="role-icon">
                                        <i className="fas fa-user"></i>
                                    </div>
                                    <div>Member</div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" id="username" 
                                    placeholder="Enter your username" 
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" 
                                    placeholder="Enter your password" 
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary" 
                                style={{justifyContent: "center" , fontWeight: "500" , width: "100%"}}
                            >
                                <i className="fas fa-sign-in-alt"></i> Login
                            </button>
                        </form>
                    </div>

                    <div className="login-footer">
                        <p>Need help? <a href="#">Contact System Administrator</a></p>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default Section;