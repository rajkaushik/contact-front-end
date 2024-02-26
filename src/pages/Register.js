import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import config from '../config';
import { DeleteCookie } from '../util/util';

const Register = () => {
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const registerUser = (event) => {
        event.preventDefault();
        fetch(`${config.gateWayURL}${config.authUrl.baseURL}${config.authUrl.register}`, {
            method: 'POST',
            body: JSON.stringify({firstname: firstname, lastname: lastname, email: email,  password: password}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === 200){
                DeleteCookie("token");
                navigate('/login');
            } 
            setError(data.message);
        })
    }

    return (
        <>
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-md-8 ">
                        <h1 className="text-center">Register</h1>
                        <hr/>
                        {
                            error.length > 0 ?  <div class="alert alert-danger" role="alert">{error}</div> : null
                        }
                        <form onSubmit={registerUser}>
                            <div className="row">
                                <div className="mb-3">
                                    <label htmlFor="firstname" className="form-label">First Name</label>
                                    <input type="text" onChange={(e) => setFirstname(e.target.value)} className="form-control" name="firstname" id="firstname" placeholder="First Name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="lastname" className="form-label">Last Name</label>
                                    <input type="text" onChange={(e) => setLastname(e.target.value)} className="form-control" name="lastname" id="lastname" placeholder="Last Name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" name="email"  id="email" placeholder="name@example.com" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" name="password" id="password" placeholder="Enter password" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3">
                                    <button type="submit" className="btn btn-primary">Register</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Register;