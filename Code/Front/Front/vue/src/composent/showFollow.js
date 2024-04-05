import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBarre from "./navBarre";
import TrendComposant from "./composantTrend";
import Recommandation from "./recommendation";
import iconeVoirImg from "../asset/iconeFlecheWhite.png";
import BoucleFollow from "./boucleFollower";
import { useMyContext } from "../context";

function ShowFollow() {
    const queryParams = new URLSearchParams(window.location.search);
    let [name, setName] = useState();
    let [username, setUsername] = useState();
    const idOtherProfil = localStorage.getItem('user_info');
    const [jsonBrut, setJsonBrut] = useState(JSON.parse(idOtherProfil));
    const code = queryParams.get('point');
    const goto = queryParams.get('goto');
    const tokenUser = localStorage.getItem("token");
    const [avatar, setAvatar] = useState();
    const [tabResult, setTabResult] = useState([]);
    const navigate = useNavigate();
    const { data, updateData } = useMyContext();

    const json = {
        token: tokenUser,
    };

    const json2 = {
        tokenUser: tokenUser,
    };

    useEffect(() => {
        const blocBorder1 = document.getElementsByClassName("blocBorderFollow1")[0];
        const blocBorder2 = document.getElementsByClassName("blocBorderFollow2")[0];

        if (goto === "1") {
            blocBorder1.style.borderBottom = "";
            blocBorder2.style.borderBottom = "solid var(--text-color) 1px";
        } else if (goto === "2") {
            blocBorder1.style.borderBottom = "solid var(--text-color) 1px";
            blocBorder2.style.borderBottom = "";
        }

        if (code === "1") {
            fetch(`http://localhost:8000/controller/controllerGetUserInfo.php`, {
                method: "POST",
                body: JSON.stringify(json),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then((res2) => res2.json())
                .then((res2) => {
                    setName(res2[1][0]['name']);
                    setUsername(res2[1][0]['username']);
                    setAvatar(res2[1][0]['photo_user']);
                });

            fetch(`http://localhost:8000/controller/getInfoOfFollow.php`, {
                method: "POST",
                body: JSON.stringify(json2),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then((res) => res.json())
                .then((res) => {
                    setTab(res);
                });
        } else if (code === "2") {
            setName(jsonBrut[0]["user"][0]['name']);
            setUsername(jsonBrut[0]["user"][0]['username']);
            setAvatar(jsonBrut[0]["user"][0]['photo_user']);

            const jsonOther = {
                idOther: jsonBrut[0]["user"][0]['id'],
            };

            fetch(`http://localhost:8000/controller/getInfoOfFollow.php`, {
                method: "POST",
                body: JSON.stringify(jsonOther),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then((res) => res.json())
                .then((res) => {
                    setTab(res);
                });
        }
    }, [goto]);

    function setTab(input) {
        if (goto === "1") {
            setTabResult(input['Followed']);
        } else if (goto === "2") {
            setTabResult(input['Follower']);
        }
    }

    const toggleBlocEdit = () => {
        window.location.reload();
    };

    const showFollower = () => {
        navigate(`/follow?point=${code}&goto=${2}`);
    };

    const showFollowing = () => {
        navigate(`/follow?point=${code}&goto=${1}`);
    };

    function navigateTo() {
        const jsonData = {
            username: username,
        };

        fetch(`http://localhost:8000/controller/userRecherche.php`, {
            method: "POST",
            body: JSON.stringify(jsonData),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((res2) => res2.json())
            .then((res2) => {
                const tab = [res2[0]];
                updateData(tab);
                navigate('/otherProfilPage');
            });
    }

    return (
        <>
            <NavBarre />
            <div className="fil">
                <div className="blocStatiqueFollow">
                    <div className="blocUserFollow">
                        <div className="contentBlocUserFollow">
                            <img className="flecheRetour" src={iconeVoirImg} onClick={navigateTo}/>
                            <div className="nameUsernameFollow">
                                <img className="avatarUser" src={avatar} onClick={navigateTo}/>
                                <h1 className="userFollowText">@{username}</h1>
                                <h1 className="userFollowText">{name}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="blocChoixFollow">
                        <div className="blocBorderFollow2">
                            <button className="followPageButton" onClick={showFollowing}>Following</button>
                        </div>
                        <div className="blocBorderFollow1">
                            <button className="followPageButton" onClick={showFollower}>Follower</button>
                        </div>
                    </div>
                </div>
                {tabResult.map((i, index) => <BoucleFollow key={index} tab={[i]}/>)}
            </div>

            <div className="blocTrendReco">
                <TrendComposant onToggleBlocEdit={toggleBlocEdit}/>
                <Recommandation/>
            </div>
        </>
    );
}

export default ShowFollow;
