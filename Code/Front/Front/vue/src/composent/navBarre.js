import '../App.css';
import homelightLofi from "../asset/homeLightLofi.png";
import homelightAmbient from "../asset/homeLightAmbient.png";
import homelightSynth from "../asset/homeLightSynth.png";
import homeDarkLofi from "../asset/homeDarkLofi.png";
import homeDarkAmbient from "../asset/homeDarkAmbient.png";
import homeDarkSynth from "../asset/homeDarkSynth.png";

import profillightLofi from "../asset/profilLightLofi.png";
import profillightAmbient from "../asset/profilLightAmbient.png";
import profillightSynth from "../asset/profilLightSynth.png";
import profilDarkLofi from "../asset/profilDarkLofi.png";
import profilDarkAmbient from "../asset/profilDarkAmbient.png";
import profilDarkSynth from "../asset/profilDarkSynth.png";

import messagelightLofi from "../asset/messageLightLofi.png";
import messagelightAmbient from "../asset/messageLightAmbient.png";
import messagelightSynth from "../asset/messageLightSynth.png";
import messageDarkLofi from "../asset/messageDarkLofi.png";
import messageDarkAmbient from "../asset/messageDarkAmbient.png";
import messageDarkSynth from "../asset/messageDarkSynth.png";

import logo from "../asset/logo.png";
import imgDeco from "../asset/deco.svg";
import {useNavigate} from "react-router-dom";
import {useEffect, useState, useContext} from "react";
import avatarBase from "../asset/profil.png";
import AffichageSearch from "./resultUser";
import Player from "../composent/player/player";
import { useTheme } from '../themeContext';
import '../App.css';
export default function NavBarre({state}){

    const { toggleTheme,color } = useTheme();
    const navigate = useNavigate();
    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [avatar, setAvatar] = useState(avatarBase);
    const [tabResult, setTabResult] = useState([]);
    const [tabResult2, setTabResult2] = useState([]);
    const [myName, setMyName] = useState("");
    const [comp, setComp] = useState(0);
    const [home, setHome] = useState(homelightLofi);
   const [profil, setProfil] = useState(profillightLofi);
    const [message, setMessage] = useState(messagelightLofi);
    const [c, setC] = useState(0);


    useEffect(() => {

        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get('token');

        const tokenUser = localStorage.getItem("token");

        const jsonData = {
            token: token,
        };
        const jsonData2 = {
            token: tokenUser,
        };
        if(token){
            fetch(`http://localhost:8000/controller/activationValidationMail.php`, {
                method: "POST",
                body: JSON.stringify(jsonData),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }

            })
                .then((res) => res.text())
                .then((res) => {
                });
        }


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
                setName(res2[1][0]['name']);
                setUsername(res2[1][0]['username']);
                setMyName(res2[1][0]['username']);
                if(res2[0]['photo_user']!==null){
                    setAvatar(res2[1][0]['photo_user']);
                }

            });
    }, [state])



    //deconnexion

    const deconnexion = async (event) => {
        event.preventDefault();
        const tokenUser =  localStorage.getItem("token");
        const token = {
            token: tokenUser
        }

        try {
            const response = await fetch('http://localhost:8000/controller/deconnexion.php', {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(token),
                method: 'POST',
            });
            const data = await response.json();
            localStorage.clear();
            navigate('/landingPage');
        } catch (error) {
            console.error('Error:', error);
        }
    }
    useEffect(() => {
        //fermer les resultat de recherche au click
        const handleClickOutside = (event) => {
            const searchElement = document.querySelector('.searchBarre');
            const blocResultElement = document.querySelector('.blocResult');
            if (searchElement && !searchElement.contains(event.target)) {
                blocResultElement.style.display = 'none';
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    const searchUser =  () => {
        const pseudo = document.getElementsByClassName('searchInput')[0].value;

        if (!pseudo.trim()) {
            document.getElementsByClassName("blocResult")[0].style.display = "none";
            setTabResult([]);
            return;
        }

        const dataUser = {
            username: pseudo,
        };

        fetch(`http://localhost:8000/controller/userRecherche.php`, {
            method: "POST",
            body: JSON.stringify(dataUser),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((res3) => res3.json())
            .then((res3) => {
                for(let i=0; i<res3.length;i++){
                    if(res3[i]['username']===myName){
                        delete res3[i];
                    }
                }
                if (res3 === "aucun utilisateur trouvé") {
                    document.getElementsByClassName("blocResult")[0].style.display = "none";
                    setTabResult([]);
                } else {
                    if(res3[0]){
                        document.getElementsByClassName("blocResult")[0].style.display = "block";
                        setTabResult(res3[0]['user']);
                        setTabResult2(res3);
                    }
                }
            });
    };


    let root = document.documentElement;
    const handleCheck = (e) => {

        if (e.target.checked) {

            root.style.setProperty("--background-lighter", "black");
            root.style.setProperty("--text-color", "white");
            root.style.setProperty("--text-color2nd", "grey");
            root.style.setProperty("--user1", "#413535");
            root.style.setProperty("--user2", "#2f3b3b");


            if(color==="lofi"){
                setHome(homelightLofi);
                setProfil(profillightLofi);
                setMessage(messagelightLofi);
            }else if(color==="ambient"){
                setHome(homelightAmbient);
                setProfil(profillightAmbient);
                setMessage(messagelightAmbient);
            }else if(color==="synth"){
                setHome(homelightSynth);
                setProfil(profillightSynth);
                setMessage(messagelightSynth);
            }

            setComp(comp+1);

        } else {

            setProfil(profil);
            setProfil(message);
            root.style.setProperty("--background-lighter", "white");
            root.style.setProperty("--text-color", "black");
            root.style.setProperty("--user1", "#ffd8d8");
            root.style.setProperty("--user2", "#daffff");

            if(color==="lofi"){
                setHome(homeDarkLofi);
                setProfil(profilDarkLofi);
                setMessage(messageDarkLofi);
            }else if(color==="ambient"){
                setHome(homeDarkAmbient);
                setProfil(profilDarkAmbient);
                setMessage(messageDarkAmbient);
            }else if(color==="synth"){
                setHome(homeDarkSynth);
                setProfil(profilDarkSynth);
                setMessage(messageDarkSynth);
            }
            setComp(comp-1);
        }
    }
    function navigateToHome (){

        navigate('/mainPage');
        setC(c+1);
        if(c===2){
            window.location.reload();
        }

    }

    useEffect(() => {
        let homeIcon;
        let profilIcon;
        let msgIcone;
        if (comp===0) {
            switch(color) {
                case 'lofi':
                    homeIcon = homelightLofi;
                    profilIcon = profillightLofi;
                    msgIcone = messagelightLofi;
                    break;
                case 'ambient':
                    homeIcon = homelightAmbient;
                    profilIcon = profillightAmbient;
                    msgIcone = messagelightAmbient;
                    break;
                case 'synth':
                    homeIcon = homelightSynth;
                    profilIcon = profillightSynth;
                    msgIcone = messagelightSynth;
                    break;
                default:
            }
        } else {
            switch(color) {
                case 'lofi':
                    homeIcon = homeDarkLofi;
                    profilIcon = profilDarkLofi;
                    msgIcone = messageDarkLofi;
                    break;
                case 'ambient':
                    homeIcon = homeDarkAmbient;
                    profilIcon = profilDarkAmbient;
                    msgIcone = messageDarkAmbient;
                    break;
                case 'synth':
                    homeIcon = homeDarkSynth;
                    profilIcon = profilDarkSynth;
                    msgIcone = messageDarkSynth;
                    break;
                default:
            }
        }
        setHome(homeIcon);
        setProfil(profilIcon);
        setMessage(msgIcone);

    }, [color,comp]);


    return (
        <nav className="vertical-navbar">
            <div className="logo2">
                <img className="logoNavBarre" src={logo}/>
                <Player/>
            </div>
            <div className="searchBarre">
                <div className="group">
                    <input placeholder="Search" type="search" className="searchInput" onChange={searchUser}/>
                </div>
                <div className="blocResult">
                    <div className="blocAffSearch">
                        {tabResult.map((i,index) => <AffichageSearch key={index} val2={tabResult2} val={[i]}/>)}
                    </div>

                </div>
            </div>
            <div className="menu">
                <ul>
                    <li className="liMenu" onClick={navigateToHome}><a className="aNavBarre"><img className="iconeNavBarre"
                                                                                         src={home} />Home</a>
                    </li>
                    <li className="liMenu" onClick={() => navigate('/myProfilPage')}><a className="aNavBarre"><img className="iconeNavBarre"
                                                                                             src={profil}/>Profil</a>
                    </li>
                    <li className="liMenu" onClick={() => navigate('/messagePage')}><a className="aNavBarre"><img className="iconeNavBarre" src={message} />Message</a>
                    </li>
                    <li className="liMenu">
                        <label className="switchToggle">
                            <input type="checkbox" onClick={toggleTheme} onChange={handleCheck}/>

                            <span></span>
                        </label>

                    </li>
                </ul>
            </div>
            <div className="blocAccount">
                <div className="accountAff">
                    <div className="imgUserDeco" onClick={() => navigate('/myProfilPage')}>
                        <img  src={avatar} className="avatarUser"/>
                        <div className="infoNameUser">
                            <p >{name}</p>
                            <p >@{username}</p>
                        </div>
                    </div>
                    <div className="blocDeconnexion">
                        <img onClick={deconnexion} src={imgDeco}/>
                    </div>
                </div>
            </div>
        </nav>
    )
}
