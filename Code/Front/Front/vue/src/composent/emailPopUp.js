
import React, {useEffect,useState} from "react";
import emailGif1 from "../asset/email1.gif";
import emailGif2 from "../asset/email2.gif";
import '../App.css';

function PopUpMail(props) {
    const [gif, setGif] = useState(emailGif1);
    const antiClick = (e) => {
        e.stopPropagation();
    };

    useEffect(() => {
        if (props.activ === 1) {
            const timer1 = setTimeout(() => setGif(emailGif2), 2000);

            return () => {
                clearTimeout(timer1);
            };
        }
    }, [props.activ]);

    return (
        <div className="blocMailConf" onClick={antiClick}>
            <form className="mailPop" >
                <h1 className="textMailTitle">Email envoyé !</h1>
                <div className="animeMail">
                    <img src={gif} className="gifMail" />
                </div>
                <div className="texteConfirmMail">
                    <p className="textMail">Rendez-vous dans votre boite mail !</p>
                </div>

            </form>
        </div>
    )
}
export default PopUpMail;