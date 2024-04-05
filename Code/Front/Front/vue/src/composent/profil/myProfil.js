import '../../App.css';
import button from "../../composent/button/button";
import {useEffect, useState} from "react";
import EditProfil from "../editProfil";
import {useNavigate} from "react-router-dom";
function MyProfil(){
    const tokenUser = localStorage.getItem("token");
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState('');
    const [background, setBackground] = useState('');
    const [bio, setBio] = useState('');
    const [follow, setFollow] = useState('');
    const [followed, setFollowed] = useState('');



    useEffect(() => {
        const jsonData = {
            token: tokenUser,
        };
        fetch(`http://localhost:8000/controller/controllerGetUserInfo.php`, {
            method: "POST",
            body: JSON.stringify(jsonData),
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
                setBackground(res2[1][0]['banniere_user']);
                setBio(res2[1][0]['bio']);
            });

        const jsonData2 = {
            tokenUser: tokenUser,
        };

        fetch(`http://localhost:8000/controller/getInfoOfFollow.php`, {
            method: "POST",
            body: JSON.stringify(jsonData2),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }

        })
            .then((res) => res.json())
            .then((res) => {
                setFollow(res['Followed'].length);
                setFollowed(res['Follower'].length);
            });
    }, []);

    const editProfil = () => {
        const blocEdit = document.getElementsByClassName("blocEdit")[0];
        blocEdit.style.display="flex";
    }
    const toggleBlocEdit = () => {
        const blocEdit = document.getElementsByClassName("blocEdit")[0];
        blocEdit.style.display="none";
        window.location.reload();
    };
    function navgiateFollow1 (){
        navigate(`/follow?point=${1}&goto=${1}`);
    }
    function navgiateFollow2 (){
        navigate(`/follow?point=${1}&goto=${2}`);
    }
    function deleteAccount() {
        const jsonData2 = {
            token: tokenUser
        };

        if (window.confirm("voulez-vous désactiver votre compte ?")){


            fetch(`http://localhost:8000/controller/deleteMyAccount.php`, {
                method: "POST",
                body: JSON.stringify(jsonData2),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }

            })
                .then((res) => res.json())
                .then((res) => {
                    if (res === true) {
                        navigate('/landingPage');
                        localStorage.removeItem("token");
                    }
                });
    }
    }

    return (
        <div className="profil">
            <div className="blocEdit">
                <EditProfil onToggleBlocEdit={toggleBlocEdit}/>
            </div>
            <div className="containerProfil">
                <div className="backgroundImage">
                    <img className="backImage" src={background} alt="background-avatar"/>
                </div>
                <div className="contentProfil">
                    <div className="avatarProfil">
                        <img className="avatar" src={avatar} alt="avatar-image"/>
                        <button className="custom-button btn-black edit" onClick={editProfil}>Editer</button>
                        <button className="custom-button btn-black edit" onClick={deleteAccount}>delete account</button>

                    </div>
                    <h1 className="username">{name}</h1>
                    <p>@{username}</p>
                    <p>{bio}</p>
                    <div className={"nbrFollow"}>
                        <p className="cursor-pointer" onClick={navgiateFollow1}><span className={"followN"}>{follow}</span> Following</p>
                        <p className="cursor-pointer" onClick={navgiateFollow2}><span className={"followN"}>{followed}</span> Followers</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MyProfil;