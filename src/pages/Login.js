import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {setCookie} from '../util/util'
import config from "../config";

const Login = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const loginUser = (event) => {
        event.preventDefault();
        fetch(`${config.gateWayURL}${config.authUrl.baseURL}${config.authUrl.login}`, {
            method: 'POST',
            body: JSON.stringify({email: email, password: password}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === 200) {
                setCookie("token", data.token);
                navigate('/contacts');
            } else {
                setError(data.message);
            }
        })

        
    }

    return (
        <>
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-md-6 ">
                        <h1 className="text-center">Login</h1>
                        <hr/>
                        <form onSubmit={loginUser}>
                            <div className="row">
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" name="email" id="email" placeholder="name@example.com" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" name="password" id="password" placeholder="Enter Password" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </div>
                        </form>
                        {
                            error.length > 0 ?  <div class="alert alert-danger" role="alert">{error}</div> : null
                        }
                        
                            
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;