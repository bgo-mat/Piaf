import React, {useEffect, useState} from "react";
import {useMyContext} from "../context";
import {useNavigate} from "react-router-dom";
import '../App.css';

export default function Commentaire({val}) {
    const [nameComment, setNameComment] = useState();
    const [usernameComment, setUsernameComment] = useState();
    const [dateComment, setDateComment] = useState();
    const queryParams = new URLSearchParams(window.location.search);
    const [stat, setStat] = useState(queryParams.get('id'));
    const [user_id, setUser_id] = useState();
    const [avatarCommment, setAvatarComment] = useState();
    const [userDataProps, setUserDataProps] = useState(val);
    const { data,  updateData } = useMyContext();
    const navigate = useNavigate();
    const [commentContent, setCommentContent] = useState();

    useEffect(() => {

        const jsonData2 = {
            id_post:stat
        };

        fetch(`http://localhost:8000/controller/commentGetAll.php`, {
            method: "POST",
            body: JSON.stringify(jsonData2),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((res3) => {return res3.json()})
            .then((res3) => {
                if (res3[0][1] !== "") {
                    setUser_id(res3[0]['user_id']);
                    setCommentContent(res3[0][1]);
                    let str = res3[0][5];
                    const date = new Date(str);
                    const options = {month: 'long', day: 'numeric'};
                    const formattedDate = date.toLocaleDateString('fr-FR', options);
                    setDateComment(formattedDate)
                }
            })

        const jsonData = {
            user_id: userDataProps['user_id'],
        };
        fetch(`http://localhost:8000/controller/getUserById.php`, {
            method: "POST",
            body: JSON.stringify(jsonData),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((res2) => {return res2.json()})
            .then((res2) => {
                if (res2 && Array.isArray(res2) && res2.length > 0 ) {
                    const name = res2[0][2];
                    const username = res2[0][1];
                    const imgAvatar = res2[0][3];
                    setUsernameComment(username);
                    setAvatarComment(imgAvatar);
                    setNameComment(name);
                }
            })
    }, []);

    useEffect(() => {
        setCommentContent(val['body']);
    }, []);


    function navigateTo (){

        const jsonData = {
            username: usernameComment,
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
            <div>
                <div className="blocComment2">
                    <div className="blocComment">
                        <img src={avatarCommment} className="iconeUserNewPost" onClick={navigateTo}/>
                        <div className="blocInfoNewPost">
                            <div className="InfoUserPost">
                                <p className="nameNewPost bold">{nameComment}</p>
                                <p className="usernameNewPost text-grey">@{usernameComment}</p>
                                <p className="dateNewPost text-grey"> • {dateComment}</p>
                            </div>
                            <p className="contentNewPost">{val['body']}</p>
                        </div>
                    </div>
                    <div className="border2"></div>
                </div>
            </div>
        </>
    )
}