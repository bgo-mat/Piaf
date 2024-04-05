import React, { useState, useEffect } from "react";
import "../App.css";
import logo from "../asset/logo.png";
import Button from "./button/button";
import Inscription from "./inscription/inscription";
import Connexion from "./connexion/connexion";
import PopUpMail from "./emailPopUp";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const [title, setTitle] = useState("");
    const startString = "Parler, Partager, Piafer.";
    const [isActiveIn, setIsActiveIn] = useState(false);
    const [activMail, setActivMail] = useState(0);
    const [isActiveCo, setIsActiveCo] = useState(false);
    const modal = document.getElementsByClassName('modal')[0];
    const elements = document.querySelectorAll('.blocMailConf');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [sloganUse, setSloganUse] = useState(false);

    const jsonData2 = {
        token: token,
    };
    useEffect(() => {
        if (token) {
            fetch(`http://localhost:8000/controller/controllerGetUserInfo.php`, {
                method: "POST",
                body: JSON.stringify(jsonData2),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then((res2) => res2.json())
                .then((res2) => {
                    if (res2[1][0]["email_verified"] === "1") {
                        navigate('/mainPage');
                    }
                });
        }
    }, []);

    useEffect(() => {
        if (sloganUse) return;
        let index = 0;
        let virguleCount = 0;
        let timeoutId;

        const addCharacter = () => {
            setTitle(prevTitle => prevTitle + startString.charAt(index));
            index++;
            if (index < startString.length) {
                let delay;
                if (startString.charAt(index - 1) === ',') {
                    virguleCount++;
                    delay = virguleCount === 2 ? 800 : 500;
                } else {
                    delay = 40;
                }
                timeoutId = setTimeout(addCharacter, delay);
            }
        };

        addCharacter();
        setSloganUse(true);

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, []);

    let onOf1 = 0;
    let onOf2 = 0;

    const inscriptionFormulaire = () => {
        if (onOf1 === 0) {
            elements.forEach(function (element) {
                element.style.display = 'none';
            });
            modal.style.display = 'flex';
            setIsActiveIn(current => !current);
            onOf1++;
        } else {
            setIsActiveIn(current => current);
            onOf1--;
        }
    };

    const connexionFormulaire = () => {
        if (onOf2 === 0) {
            setIsActiveCo(current => !current);
            onOf2++;
        } else {
            setIsActiveCo(current => current);
            onOf2--;
        }
    };

    const antiClick = (e) => {
        e.stopPropagation();
    };

    const emailClick = () => {
        elements.forEach(function (element) {
            element.style.display = 'flex';
        });
        setActivMail(1);
        modal.style.display = 'none';
    };

    return (
        <div>
            <div className={"column_me"} onClick={inscriptionFormulaire} style={{ display: isActiveIn ? 'flex' : 'none' }}>
                <PopUpMail activ={activMail} />
                <div className="modal" onClick={antiClick}>
                    <a className={"delete"} onClick={inscriptionFormulaire}>×</a>
                    <Inscription onChildClick={emailClick} />
                </div>
            </div>
            <div className={"column_me"} onClick={connexionFormulaire} style={{ display: isActiveCo ? 'flex' : 'none' }}>
                <div className="modal" onClick={antiClick}>
                    <a className={"delete"} onClick={connexionFormulaire}>×</a>
                    <Connexion />
                </div>
            </div>
            <div className="container">
                <div className="logo">
                    <img src={logo} alt="logo" id="logoLandingPage" />
                </div>
                <div className="landing-container">
                    <h1 id="title">{title}</h1>
                    <div className="btn-connexion-inscription">
                        <Button className="btn-yellow btnConn" onClick={connexionFormulaire}>Connexion</Button>
                        <Button className="btn-white" onClick={inscriptionFormulaire}>Inscription</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
