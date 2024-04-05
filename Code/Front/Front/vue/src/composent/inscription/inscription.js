import React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import '../../App.css';


function Inscription(props) {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mail, setMail] = useState('');
    const [passwordOne, setPasswordOne] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwordTwo === passwordOne && firstName !== "" && lastName !== "" && mail !== "" && passwordOne !== "") {
            setError("")
            const jsonData = {
                name: firstName,
                username: lastName,
                email: mail,
                pass: passwordOne,
                birthdate: "2000-05-11"

            };

            try {
                const response = await fetch('http://localhost:8000/controller/inscriptionUser.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jsonData)
                });
                const data = await response.text();

                localStorage.setItem("token", data);
                    //AFFICHAGE DU BLOC EMAIL
                    props.onChildClick();
            } catch (error) {
                console.error('Error:', error);
            }
        } else if ( firstName === "" || lastName === "" || mail === "" || passwordOne === "") {
            setError("champs manquants");
        }
        else {
            setError("Les mots de passe ne correspondent pas");
        }
    }

        return (
            <div className="blocForm">
            <form onSubmit={handleSubmit }>
                <h3 className="titleRegister">Inscription</h3>
                <input  className="nomInput or-bg" type={"text"} placeholder={"Nom"} value={lastName} onChange={(event) => {
                    setLastName(event.target.value);
                }}/>
                <input className="prenomInput or-bg" type={"text"} placeholder={"@Pseudo"} value={firstName} onChange={(event) => {
                    setFirstName(event.target.value);
                }}/>
                <input className="emailInput or-bg" type={"email"} placeholder={"Email"} value={mail} onChange={(event) => {
                    setMail(event.target.value);
                }}/>
                <input className="passwordOneInput or-bg" type={"password"} placeholder={"Mot de passe"} value={passwordOne} onChange={(event) => {
                    setPasswordOne(event.target.value);
                }}/>
                <input className="passwordTwoInput or-bg" type={"password"} placeholder={"Confirmation mot de passe"} value={passwordTwo}
                       onChange={(event) => {
                           setPasswordTwo(event.target.value);
                       }}/>
                <p className="text-error">{error}</p>
                <button className="nextButton" type={"submit"}>Suivant</button>
            </form>
            </div>
        )
}
export default Inscription;