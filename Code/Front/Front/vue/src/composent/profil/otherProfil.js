import '../../App.css';
import button from "../../composent/button/button";
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import {useMyContext} from "../../context";

function OtherProfil({ tab }) {
    const tokenUser = localStorage.getItem("token");
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState('');
    const [background, setBackground] = useState('');
    const [bio, setBio] = useState('');
    const [follow, setFollow] = useState('');
    const [followed, setFollowed] = useState('');
    const [load, setLoad] = useState(1);
    const idOtherProfil = localStorage.getItem('user_info');
    const [jsonBrut, setJsonBrut] = useState(JSON.parse(idOtherProfil));
    const navigate = useNavigate();
    const { data,  updateData } = useMyContext();




    useEffect(() => {
        setName(jsonBrut[0]["user"][0]['name'] || '');
        setUsername(jsonBrut[0]["user"][0]['username'] || '');
        setAvatar(jsonBrut[0]["user"][0]['photo_user'] || '');
        setBackground(jsonBrut[0]["user"][0]['banniere_user']|| '');
        setFollow(jsonBrut[0]["follow"][0][0]);
        setFollowed(jsonBrut[0]["followed"][0][0]);
        }, [data]);


    const dataFollow = {
        tokenUser: tokenUser,
        idOtherUser: jsonBrut[0]["user"][0]['id']
    };

    useEffect(() => {

        const dataFollow = {
            tokenUser: tokenUser,
            idOtherUser: jsonBrut[0]["user"][0]['id']
        };

        fetch(`http://localhost:8000/controller/checkIfUserIsFollow.php`, {
            method: "POST",
            body: JSON.stringify(dataFollow),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((res) => {
                if(res.isFollowing === true){
                    document.getElementsByClassName('unfollowBtn')[0].style.display = "flex";
                    document.getElementsByClassName('unfollowBtn')[1].style.display = "flex";
                    document.getElementsByClassName('followBtn')[0].style.display = "none";
                }else{
                    document.getElementsByClassName('unfollowBtn')[0].style.display = "none";
                    document.getElementsByClassName('unfollowBtn')[1].style.display = "none";
                    document.getElementsByClassName('followBtn')[0].style.display = "flex";
                }
            });


        const jsonData3 = {
            idOther: jsonBrut[0]["user"][0]['id'],
        };

        fetch(`http://localhost:8000/controller/getInfoOfFollow.php`, {
            method: "POST",
            body: JSON.stringify(jsonData3),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }

        })
            .then((res2) => res2.json())
            .then((res2) => {
                setFollow(res2['Followed'].length);
                setFollowed(res2['Follower'].length);
            });


    }, [data, load]);

    async function changeDisplayButton() {
        document.getElementsByClassName('unfollowBtn')[0].style.display = "flex";
        document.getElementsByClassName('unfollowBtn')[1].style.display = "flex";
        document.getElementsByClassName('followBtn')[0].style.display = "none";

        fetch(`http://localhost:8000/controller/followOtherProfil.php`, {
            method: "POST",
            body: JSON.stringify(dataFollow),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((res3) => res3.json())
            .then((res) => {
                setLoad(load+1);
            });
    }

    async function changeUnfollowDisplay() {
        document.getElementsByClassName('unfollowBtn')[0].style.display = "none";
        document.getElementsByClassName('unfollowBtn')[1].style.display = "none";
        document.getElementsByClassName('followBtn')[0].style.display = "flex";

        fetch(`http://localhost:8000/controller/unfollowProfil.php`, {
            method: "POST",
            body: JSON.stringify(dataFollow),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((res4) => res4.json())
            .then((res) => {
                setLoad(load+1);
            });
    }

    function navgiateFollow1 (){
        navigate(`/follow?point=${2}&goto=${1}`);
    }

    function navgiateFollow2 (){
        navigate(`/follow?point=${2}&goto=${2}`);
    }

    return (
        <div className="profil">
            <div className="containerProfil">
                <div className="backgroundImage">
                    <img className="backImage" src={background} alt="background-avatar"/>
                </div>
                <div className="contentProfil">
                    <div className="avatarProfil">
                        <img className="avatar" src={avatar} alt="avatar-image"/>
                    </div>
                    <h1 className="username">{name}</h1>
                    <p>@{username}</p>
                    <p>{bio}</p>
                    <div className={"buttonFollow"}>
                        <button onClick={changeDisplayButton} className="custom-button btn-black follow followBtn">Follow</button>
                        <button onClick={changeUnfollowDisplay} className="custom-button btn-black follow unfollowBtn">Unfollow</button>
                        <button className="custom-button btn-black follow unfollowBtn">Message</button>
                    </div>
                    <div className={"nbrFollow"}>
                        <p className="cursor-pointer" onClick={navgiateFollow1}><span className={"followN"}>{follow}</span> Following</p>
                        <p className="cursor-pointer" onClick={navgiateFollow2}><span className={"followN"}>{followed}</span> Followers</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OtherProfil;