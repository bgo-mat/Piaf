import {useState} from "react";
import '../../App.css';
function MailResetPassword(){
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    const handleForgetPassword = async (e)=> {
        e.preventDefault();

        const data = {
            email : email
        };

        try {
            const response = await fetch('http://localhost:8000/controller/sendResetPasswordMail.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const responseData = await response.text();
        } catch (error) {
            console.error('Error:', error);
        }
        alert('Email envoyé ✅ ');
    }

  return (
      <div className="blocFormForget littleMarge">
       <form>

        <h3 className="titleConnexion">Email</h3>
        <input className="emailConnexion" type="email" placeholder={"Email"} value={email}
               onChange={(event) => {
                setEmail(event.target.value)
               }}/>
        <button className="connexionButton" onClick={handleForgetPassword}>Envoyer l'email</button>
       </form>
      </div>
  )

 }

 export default MailResetPassword;