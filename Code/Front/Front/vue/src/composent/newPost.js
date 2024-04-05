import React, {useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import iconePoint from "../asset/iconePoint.png";
import likePost1Black from "../asset/likePost.png";
import likePost2Black from "../asset/likePostPlein.png";
import likePost1White from "../asset/likePostWhite.png";
import likePost2White from "../asset/likePostPleinWhite.png";
import commentBlack from "../asset/commentBlack.png";
import commentWhite from "../asset/commentWhite.png"
import {useMyContext} from "../context";
import useSound from "use-sound";
import soun from "../asset/validation.mp3";
import {useTheme} from "../themeContext";
import '../App.css';

function NewPost({tab, ...props}) {
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const { onToggleBlocEdit } = props;
    const [username, setUsername] = useState("");
    const [avatar, setAvatar] = useState("");
    const [datePost, setDatePost] = useState("");
    const [postContent, setPostContent] = useState("");
    const [likeCount, setLikeCount] = useState("");
    const { data,  updateData } = useMyContext();
    const [nbrCommentaire, setNbrCommentaire] = useState("");
    const [postIds, setPostIds] = useState([]);
    const [image ,setImage] = useState([]);
    const [post_id, setPost_id]= useState();
    const [searchId ,setSearchId] = useState();
    const [toggle , setToggle] = useState(true);
    const [display, setDisplay] = useState("none")
    const [textarea, setTextarea] = useState();
    const [volume, setVolume] = React.useState(0.4)
    const [playSound, ] = useSound(soun, { volume });
    const token = localStorage.getItem("token");
    const [likePost1 ,setLikePost1] = useState(theme === 'dark' ? likePost1Black : likePost1White);
    const [likePost2 ,setLikePost2] = useState(theme === 'dark' ? likePost2Black : likePost2White);
    const [commentaireIcone ,setCommentaireIcn] = useState(theme === 'dark' ? commentBlack : commentWhite);
    const [likeIcone, setLikeIcone] = useState(likePost1);
    const [commentaire, setCommentaire] = useState(commentaireIcone);




    const changeLikeIcone=(postId)=>{

        if(likeIcone===likePost2){
            setLikeIcone(likePost1);
        }else{
            setLikeIcone(likePost2);
        }



        const dataFollow = {
            id_post : postId[0],
            token : token
        };
        //verifier si la personne a deja liker le post
        fetch(`http://localhost:8000/controller/likePost.php`, {
            method: "POST",
            body: JSON.stringify(dataFollow),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((res) => {
                setLikeCount(res[0][0]);
            });

    }

    function transformContent(content) {
        const hashtagPattern = /#(\w+)/g;
        const mentionPattern = /@(\w+)/g;

        const splitContent = content.split(/(#\w+|@\w+)/);

        return (
            <div className="contentNewPost">
                {splitContent.map((part, index) => {
                    if (part.match(hashtagPattern)) {
                        return <span className="cliqueElementPostH"  key={index} onClick={(e) => navigateToHashTag(e,part.substring(1))}>{part}</span>;
                    } else if (part.match(mentionPattern)) {
                        return <span className="cliqueElementPostA" key={index} onClick={(e) => navigateA(e,part.substring(1))}>{part}</span>;
                    } else {
                        return part;
                    }
                })}
            </div>
        );
    }

    function navigateToHashTag (e,input){
        e.stopPropagation();
        navigate(`/mainPage?htag=${input}`);
        onToggleBlocEdit();
    }

    function navigateA (e,input){
        e.stopPropagation();
        const jsonData = {
            username: input,
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


    useEffect(() => {
            setName(tab[0]['post']['name']);
            setAvatar(tab[0]['post']['photo_user']);
            setUsername(tab[0]['post']['username']);

            const postBrut = tab[0]['post']['body'];
            const transformedContent = transformContent(postBrut);
            setPostContent(transformedContent);

            setLikeCount(tab[0]['likes'][0][0]);
            setNbrCommentaire(tab[0]['commentaire'][0][0]);
            //stocké les id des tweet
            const ids = tab.map(item => item['post'][0]);
            setPostIds(ids);
            const date = new Date(tab[0]['post']['created_at']);
            const options = {month: 'long', day: 'numeric'};
            const formattedDate = date.toLocaleDateString('fr-FR', options);
            setDatePost(formattedDate);
            setSearchId(tab[0]['post']['username']);



            const postId = tab[0]['post'][0];
               setPost_id(tab[0]['post'][0]);

            const jsonData = {
                postId: post_id,
            };

            getImagePost(jsonData);



    }, [tab]);
;

    useEffect(() => {
        const dataFollowF = {
            id_post : tab[0]['post'][0],
            token : token
        };


        //verifier si la personne a deja liker le post
        fetch(`http://localhost:8000/controller/checkIfLike.php`, {
            method: "POST",
            body: JSON.stringify(dataFollowF),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((resF) => resF.json())
            .then((resF) => {
                setLikePost1(theme === 'light' ? likePost1Black : likePost1White);
                setLikePost2(theme === 'light' ? likePost2Black : likePost2White);
                setCommentaireIcn(theme === 'light' ? commentBlack : commentWhite);

                if(resF===true){
                    setLikeIcone(likePost2);
                    setCommentaire(commentaireIcone);
                }else if(resF===false){
                    setLikeIcone(likePost1);
                    setCommentaire(commentaireIcone);
                }
            });
    }, [theme]);



    async function getImagePost(input) {
        const r = await fetch('http://localhost:8000/controller/getImagePost.php', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body:JSON.stringify(input),
        });
        const data = await r.json();

        if(data.length>0){
            const images = data.map(item => item.img[0]);
            setImage(images);
        }

    }


    function navigateTo (){

        const jsonData = {
            username: searchId,
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

                const tab = [res2[0]]
                updateData(tab);
                navigate('/otherProfilPage');
            });


    }


    const handleclick = (e) => {
        setToggle(!toggle);
    }


    useEffect(() => {
        if (toggle === true) {
            setDisplay("none");
        } else if (toggle === false) {
            setDisplay("flex");
        }
    }, [toggle]);

    const sendComment = (e) => {
        navigate(`/post?id=${tab[0].post[0]}`)
        if (textarea !== ""){
            const tokenUser =  localStorage.getItem("token");
            const date = new Date();

            const formattedDate = date.toLocaleDateString('en-GB', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            const hour = date.getHours();
            const min = date.getMinutes();
            const timestamp = formattedDate + " " + hour + ':' + min;
            const post_id = tab[0].post[0];


            const jsonData = {
                token: tokenUser,
                text: textarea,
                timestamp: timestamp,
                post_id: post_id
            };

            fetch('http://localhost:8000/controller/commentaire.php', {
                method: 'POST',
                body: JSON.stringify(jsonData),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                }
            })

                .then(response => {
                    window.location.reload();
                })
                .catch(error => {
                    console.error('Erreur lors de la requête:', error);
                });


        }
    }

    const anticlick = (e) => {
        e.stopPropagation();
    }

    const redirection = (e) => {
        if (e.target.closest('.cliqueElementPostA') || e.target.closest('.cliqueElementPostH')){
            return;
        }
        navigate(`/post?id=${tab[0].post[0]}`);
    }


    const handleSendAndPlay = (e) => {
        playSound();
        setTimeout(() => {
            sendComment(e);
        }, 1000);
    };

    return (
        <>
            <div className="onblurcomment" onClick={handleclick} style={{display : display }}>
                <div className="blocNewPost" onClick={anticlick}>
                    <div className="blocContentPost" onClick={redirection}>
                        <div className="imgInfoPost" >
                            <img src={avatar} className="iconeUserNewPost" onClick={navigateTo}/>
                            <div className="blocInfoNewPost">
                                <div className="InfoUserPost">
                                    <p className="nameNewPost bold">{name}</p>
                                    <p className="usernameNewPost text-grey">@{username}</p>
                                    <p className="dateNewPost text-grey"> • {datePost}</p>
                                </div>
                                {postContent}
                                <div className="affichageImgPost">
                                {image.map((img, index) => (
                                        <img key={index} className="imgPost" src={img}/>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <img src={iconePoint} className="iconePoint"/>
                    </div>
                    <div className="contentInteractPost">
                        <div className="infoIconePost" onClick={() => changeLikeIcone(postIds)}>
                            <img src={likeIcone} className="iconeNewPost"/>
                            <p className="infoStatPost center-text">{likeCount}</p>
                        </div>
                        <div className="infoIconePost" onClick={handleclick}>
                            <img src={commentaire} className="iconeNewPost"/>
                            <p className="infoStatPost center-text">{nbrCommentaire}</p>
                        </div>
                    </div>

                    <div>
                        <textarea className="commentText" onChange={(e) => setTextarea(e.target.value)}></textarea>
                        <input onClick={handleSendAndPlay} className="submitButtonPost" type={"submit"}/>
                    </div>
                </div>

            </div>


            <div className="blocNewPost">
                <div className="blocContentPost" onClick={redirection} >
                    <div className="imgInfoPost" >
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
                <div className="contentInteractPost">
                    <div className="infoIconePost" onClick={() => changeLikeIcone(postIds)}>
                        <img src={likeIcone} className="iconeNewPost"/>
                        <p className="infoStatPost center-text">{likeCount}</p>
                    </div>
                    <div className="infoIconePost" onClick={handleclick}>
                        <img src={commentaire} className="iconeNewPost"/>
                        <p className="infoStatPost center-text">{nbrCommentaire}</p>
                    </div>
                </div>

            </div>
        </>

    )
}

export default NewPost;