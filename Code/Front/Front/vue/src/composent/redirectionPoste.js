import React, {useState,useEffect} from "react";
import NavBarre from "./navBarre";
import TrendComposant from "./composantTrend";
import Recommandation from "./recommendation";
import iconePoint from "../asset/iconePoint.png";
import {useMyContext} from "../context";
import Commentaire from "./commentaire";
import {useNavigate} from "react-router-dom";
import '../App.css';
function RedirectionPost() {

    const queryParams = new URLSearchParams(window.location.search);
    const [stat, setStat] = useState(queryParams.get('id'));
    const [avatar, setAvatar] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [datePost, setDatePost] = useState("");
    const [postContent, setPostContent] = useState("");
    const [userId, setUserId] = useState();
    const [image ,setImage] = useState([]);
    const [nombreComment, setNombreComment] = useState();
    const [valProps ,setValProps] = useState([]);
    const { data,  updateData } = useMyContext();
    const navigate = useNavigate();

    const jsonIMG = {
        postId: stat
    };

    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        if (!fetched) {
            fetch('http://localhost:8000/controller/getImagePost.php', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(jsonIMG),
            }).then((res) => res.json())
                .then((data) => {
                    if(data.length>0){
                        const images = data.map(item => item.img[0]);
                        setImage(images);}
                    setFetched(true);
                });
        }
    }, [jsonIMG, fetched]);
    const jsonData2 = {
        id_post:stat
    };
    fetch(`http://localhost:8000/controller/commentaireShowUp.php`, {
        method: "POST",
        body: JSON.stringify(jsonData2),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }).then((res) => res.json())
        .then((res) => {
            setUserId(res[0]['user_id']);
            setPostContent(res[0][1]);
            let str = res[0][5];
            const years = str.substring(0,4);
            const dated = str.substring(10, -5);
            const toChange = dated.substring(5, 10);

            const date = new Date(res[0]['created_at']);
            const options = {month: 'long', day: 'numeric'};
            const formattedDate = date.toLocaleDateString('fr-FR', options);
            setDatePost(formattedDate);
        });


    const jsonData = {
        user_id: userId,
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
            if (res2 && Array.isArray(res2) && res2.length > 0) {
                const name = res2[0][2];
                const username = res2[0][1];
                const imgAvatar = res2[0][3];
                setUsername(username);
                setAvatar(imgAvatar);
                setName(name);
            }
        })



    useEffect(() => {
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
               const filter = res3.filter(elm => elm[1]);
                setNombreComment(res3.length);
                setValProps(filter);
            })
    }, []);

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


    return (
        <>
            <NavBarre/>
            <div className="fil">
                <div className="blocNewPost">
                    <div className="blocContentPost">
                        <div className="imgInfoPost">
                            <img src={avatar} className="iconeUserNewPost" onClick={navigateTo}/>
                            <div className="blocInfoNewPost">
                                <div className="InfoUserPost">
                                    <p className="nameNewPost bold">{name}</p>
                                    <p className="usernameNewPost text-grey">@{username}</p>
                                    <p className="dateNewPost text-grey"> • {datePost}</p>
                                </div>
                                <p className="contentNewPost">{postContent}</p>
                                <div className="affichageImgPost">
                                    {image.map((img, index) => (
                                        <img key={index} className="imgPost" src={img}/>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <img src={iconePoint} className="iconePoint"/>
                    </div>

                    <div className="border black-bg margeBas"></div>
                    <div className="commentMainPost">

                        <div>

                            {valProps.map((i, index) => <Commentaire key={index} val={i}/>)}
                        </div>
                    </div>

                </div>
            </div>
            <div className="blocTrendReco">
                <TrendComposant/>
                <Recommandation/>
            </div>
        </>
    )
}

export default RedirectionPost;