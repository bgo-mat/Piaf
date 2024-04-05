import React from "react";
import {useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import '../App.css';

function ForgetPassword() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();


    function handleChangeEmail(event){
        setEmail(event.target.value);
    }
    function handleChangePassword(event){
        setPassword(event.target.value);
    }
    function handleChangeConfirmPassword(event){
        setConfirmPassword(event.target.value);
    }
    const handleSubmit = async (e) =>{

        if(password !== confirmPassword){
            setErrorPassword('Mot de passe incorrect');
            return;
        }

        const data = {
            email : email,
            password : password
        };

        try {
            const response = await fetch('http://localhost:8000/controller/updatePassword.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

        } catch (error) {
            console.error('Error:', error);
        }

        navigate(`/landingPage`);

    }



    return (
        <div className="container">
            <div className="blocForget">
                <div className="titleForget">
                    <h1 className="titleForgetText">Modification de mot de passe</h1>
                </div>
                <div className="inputForget">
                    <input className="emailInput marge or-bg" value={email} onChange={handleChangeEmail} type={"email"} placeholder={"Email"}/>
                    <input className="passwordOneInput marge or-bg" value={password} onChange={handleChangePassword} type={"password"} placeholder={"Mot de passe"}/>
                    <input className="passwordTwoInput marge or-bg" value={confirmPassword} onChange={handleChangeConfirmPassword} type={"password"} placeholder={"Confirmation mot de passe"}/>
                    <p className="errorPassword">{errorPassword}</p>
                    <button className="btn-white" onClick={handleSubmit} type={"submit"}>Confirmer</button>

                </div>
            </div>
        </div>
    )
}

export default ForgetPassword;