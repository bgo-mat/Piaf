import {useState} from "react";
import {useNavigate} from "react-router-dom";
import '../../App.css';
function Connexion() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleNavigate = () => {
        navigate('/mailResetPassword');
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (email !== "" && password !== "") {
            setError("");
            const jsonData = {
                email: email,
                password: password
            }
            try {
                const response = await fetch('http://localhost:8000/controller/connexionUser.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jsonData)
                });
                const data = await response.json();

                if (data && data.info && data.info[0]['status'] === "0") {
                    setError("votre compte est désactivé");
                    if(window.confirm("voulez-vous reactiver votre compte ?")){
                        let tokenUser = JSON.stringify(data.token);
                        const jsonData2 = {
                            token : tokenUser
                        }

                        fetch(`http://localhost:8000/controller/reactiveAccount.php`, {
                            method: "POST",
                            body: JSON.stringify(jsonData2),
                            headers: {
                                "Accept": "application/json",
                                "Content-Type": "application/json"
                            }

                        })
                            .then((res) => res.json())
                            .then((res) => {
                                if(res === true){
                                    localStorage.setItem("token", JSON.stringify(data.token));
                                    navigate('/mainPage');
                                }
                            });


                    }
                    return;
                }
                if (data !== false) {
                    localStorage.setItem("token", JSON.stringify(data.token));
                     navigate("/mainPage");

                } else {
                    setError("mot de passe ou email incorrect");
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
       else
    {
        setError("Champs manquants");
    }
}

    return (
        <div className="blocForm">
            <form>

                <h3 className="titleConnexion">Connexion</h3>
                <input className="emailConnexion or-bg" type="email" placeholder={"Email"} value={email}
                       onChange={(event) => {
                           setEmail(event.target.value)
                       }}/>
                <input className="passwordConnexion or-bg" type="password" placeholder={"Mot de passe"} value={password}
                       onChange={(event) => {
                           setPassword(event.target.value)
                       }}/>
                <a className={"forgetLink"} onClick={handleNavigate}>Mot de passe oublié ?</a>
                <p className="text-error">{error}</p>
                <button className="connexionButton" onClick={handleSubmit}>Connexion</button>
            </form>
        </div>
    )
}

export default Connexion;