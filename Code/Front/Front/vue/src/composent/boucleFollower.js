import React, {useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useMyContext} from "../context";
import '../App.css';

function BoucleFollow({tab}) {

    let [name, setName] = useState("");
    let [username, setUsername] = useState("");
    let [avatar, setAvatar] = useState();
    const navigate = useNavigate();
    const { data,  updateData } = useMyContext();

    useEffect(() => {
        setUsername(tab[0]['username']);
        setName(tab[0]['name']);
        setAvatar(tab[0]['photo_user']);
    }, [tab]);

    function navigateTo (){

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

    return (<>
        <div className="blocBoucleFollow">
            <div className="infoBoucleFollow" onClick={navigateTo}>
                <img className="avatarUser"  src={avatar}/>
                <div className="blocTextBoucleFollow">
                    <p className="texteBoucleFollow">{name}</p>
                    <p className="texteBoucleFollow">@{username}</p>
                </div>
            </div>
        </div>
        </>


    )
}

export default BoucleFollow;