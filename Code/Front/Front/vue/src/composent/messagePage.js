import React, {useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import NavBarre from "./navBarre";
import iconeVoirImg from "../asset/iconeFlecheWhite.png";
import iconeNewMessage from "../asset/newMessage.png";
import AffichageSearch from "./resultUser";
import useSound from "use-sound";
import soun from "../asset/pop.mp3";
import '../App.css';

function MessagePage() {

    let [value, setValue] = useState("none");
    let [value2, setValue2] = useState("inherit");
    const navigate = useNavigate();
    const [message1, setMessage1] = useState('');
    const [message2, setMessage2] = useState('');
    const [messages, setMessages] = useState([]);
    const token = localStorage.getItem("token");
    const [idOtherUser, setIdOtherUser] = useState();
    const [idUser, setIdUser] = useState();
    const [convWith, setConvWith] = useState([]);
    const [infoOfUserConv, setInfoOfUserConv] = useState([]);
    const [load, setLoad] = useState(0);
    const [inputStr, setInputStr] = useState("");
    const [tabResult, setTabResult] = useState([]);
    const [myName, setMyName] = useState("");
    const [volume, setVolume] = React.useState(0.4)
    const [playSound, ] = useSound(soun, { volume });

    const jsonData2 = {
        token: token,
    };

    useEffect(() => {
            const token = localStorage.getItem("token");
            fetch(`http://localhost:8000/controller/getMessage.php`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token: token
                })
            })
                .then((res) => res.json())
                .then((res) => {
                    setMessages(res);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            setValue("none");

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
                setIdUser(res2[1][0]['id']);
            });
    }, [load]);


    useEffect(() => {
        if (idUser) {
            const uniqueUserIds = new Set();
            messages.forEach((msg) => {
                if (msg.sender_id === idUser) {
                    uniqueUserIds.add(msg.receivers_id);
                } else if (msg.receivers_id === idUser) {
                    uniqueUserIds.add(msg.sender_id);
                }
            });
            setConvWith(Array.from(uniqueUserIds));
        }
    }, [messages, idUser,load]);


    useEffect(() => {
        const fetchUserDetails = convWith.map(userId => {
            const jsonDataOther = {
                user_id: userId,
            };

            return fetch(`http://localhost:8000/controller/getUserById.php`, {
                method: "POST",
                body: JSON.stringify(jsonDataOther),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(userData => {
                    return userData;
                });
        });

        Promise.all(fetchUserDetails).then(allUsersData => {
            setInfoOfUserConv(allUsersData);
        })
            .catch(error => {
                console.error('Error fetching user details:', error);
            });
    }, [convWith,load]);


    function showConv(){
        const fetchUserDetails = convWith.map(userId => {
            const jsonDataOther = {
                user_id: userId,
            };

            return fetch(`http://localhost:8000/controller/getUserById.php`, {
                method: "POST",
                body: JSON.stringify(jsonDataOther),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(userData => {
                    return userData;
                });
        });

        Promise.all(fetchUserDetails).then(allUsersData => {
            setInfoOfUserConv(allUsersData);
        })
            .catch(error => {
                console.error('Error fetching user details:', error);
            });
    }

    const setOtherUserConv = (input) => {
        setIdOtherUser(input);
    }

    const sendMessage = (event, user) => {
        event.preventDefault();

        let messageToSend = user === 'user1' ? message1 : message2;

        fetch(`http://localhost:8000/controller/sendMessage.php`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: token,
                idOther: idOtherUser,
                message: messageToSend
            })
        })
            .then((res) => res.json())
            .then((res) => {
                if (user === 'user1') {
                    setMessage1('');
                } else {
                    setMessage2('');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        showConv();
        setLoad(load+1);
    };


    const handleclick = () => {
        if(value==="none"){
            setValue("flex");
        }else{
            setValue("none");
        }
    }

    const startNewConv = (e) => {
        e.preventDefault();

        const dataUser = {
            username: inputStr,
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
                setIdOtherUser(res3[0]['user'][0]['id']);
            });

        setLoad(load+1);
        setValue('none');
        setInputStr('');
    }

    const handleTextChange = (e) => {
        const newText = e.target.value;
        setInputStr(newText);
        searchUser(newText);
    };

    const searchUser =  (input) => {
        const pseudo = input;

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
                    document.getElementsByClassName("blocResult")[0].style.display = "block";
                    if(res3[0]){
                        setTabResult(res3[0]['user']);
                    }
                }
            });
    };

    function changePlaceholder(index) {
            const selectedItem = index.username;
            setInputStr(selectedItem);
    }

    const renderMessages = () => {
        return messages.filter(msg => (msg.sender_id === idUser && msg.receivers_id === idOtherUser) ||
            (msg.sender_id === idOtherUser && msg.receivers_id === idUser))
            .map((msg, index) => (
                <div key={index} className={`message ${msg.sender_id === idUser ? 'user2' : 'user1'}`}>
                    {msg.body}
                </div>
            ));
    };

    return (<>
            <NavBarre/>
            <div className="blocMessage">
                <div className="blocRechercheMessage">
                    <div className="blocRetourMessage">
                        <div className="retourMessage">
                            <img className="flecheRetour" src={iconeVoirImg} onClick={() => navigate('/mainPage')}/>
                            <h1 className="titleRetourTrend">Messages</h1>
                        </div>
                        <div className="blocUserConv">
                            {infoOfUserConv.map((user, index) => (

                                <div key={index} className="contentUserConv"
                                     onClick={() => setOtherUserConv(user[0].id)}>
                                    <img src={user[0].photo_user} alt={`photo de profil de ${user[0].username}`}
                                         className="imgAvatarSearch"/>
                                    <div className="infoOtherConv">
                                        <p className="usernameSearch">@{user[0].username}</p>
                                        <p className="nameSearch">{user[0].name}</p>
                                    </div>
                                </div>

                                ))}
                        </div>
                        </div>
                        <img className="newMessageIcone" src={iconeNewMessage} onClick={handleclick}/>

                    </div>
                    <div className="blocConversation">
                    <div className="chat-container" id="chatContainer">
                        <div className="chat-container" id="chatContainer">
                            {renderMessages()}
                        </div>
                    </div>

                    <form id="user1Form" onSubmit={(e) => sendMessage(e, 'user1')}>
                    <input type="text" id="user1Input" value={message1}
                               onChange={(e) => setMessage1(e.target.value)} placeholder="Message" required/>
                        <input type="submit" value="Envoyer"  className="btnMsg2" onClick={playSound}/>
                    </form>


                </div>
            </div>

            <div className="newMessage" style={{display: value}}>
                <div className="blocMessageAff">
                    <div className="newMessageTop">
                        <span className="deleteNewMessage" onClick={handleclick}>X</span>
                        <h4 className="titleNewMessage">Nouveau Messages</h4>
                    </div>
                    <form className="formNewMessage">
                    <textarea className="textAreaPost areaMsg" value={inputStr}
                              placeholder="Avec qui voulez-vous Piaffer aujourd'hui ?"
                              onChange={handleTextChange}></textarea>

                        <button className="btnMsg" onClick={startNewConv}>Start Piaf</button>
                        <div className="blocAffSearch" style={{position: value2}}>
                            {tabResult.map((i, index) => <AffichageSearch onClick={() => {
                                changePlaceholder(i);
                            }} onCustomClick={() => changePlaceholder(i)} key={index} code={1} val={[i]}/>)}
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default MessagePage;