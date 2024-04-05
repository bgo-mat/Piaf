import "../../App.css";

import React, { useState, useEffect} from "react";
import Picker from "emoji-picker-react";
import ReactGiphySearchbox from 'react-giphy-searchbox';
import waitGif1 from "../../asset/waitGif1.gif";
import waitGif2 from "../../asset/waitGif2.gif";
import AffichageSearch from "../resultUser";
import useSound from 'use-sound';
import soun from '../../asset/validation.mp3';
import {useTheme} from "../../themeContext";


export default function Post({onChildDataChange}) {
    const { theme, toggleTheme } = useTheme();
    const [text, setText] = useState('');
    const [image ,setImage] = useState([]);
    const [inputStr, setInputStr] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const [imgGif , setImgGif] = useState([]);
    const [jsonData, setJsonData] = useState();
    const [showGif, SetShowGif] = useState("none")
    const [valueGif, setValueGif] = useState(false)
    const [waitGif, setWaitGif] = useState(waitGif1);
    const [compteur, setCompteur] = useState(1);
    const [avatar, setAvatar] = useState();
    const [tabResult, setTabResult] = useState([]);
    const [myName, setMyName] = useState("");
    const [volume, setVolume] = React.useState(0.4);
    const [playSound ] = useSound(soun, { volume });

    const clickGif = document.getElementsByClassName("gif")[0];
    const clickImg = document.getElementsByClassName("imgClick")[0];
    const clickAi = document.getElementsByClassName("image-dropdown")[0];

    useEffect(()=>{
        if(valueGif===false){
            SetShowGif("none");
        }else if(valueGif===true){
            SetShowGif("block");
        }

        const tokenUser = localStorage.getItem("token");
        const jsonDataUser = {
            token: tokenUser,
        };

        fetch(`http://localhost:8000/controller/controllerGetUserInfo.php`, {
            method: "POST",
            body: JSON.stringify(jsonDataUser),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }

        })
            .then((res2) => res2.json())
            .then((res2) => {
                if(res2[0]['photo_user']!==null){
                    setAvatar(res2[1][0]['photo_user']);
                }
            });

    })



    const handleClickGif = (event) => {
        if(image.length<4){
            setImage(current => [...current, { url: event.images.original.url, file: event.images.original.url }]);
            setValueGif(!valueGif);
        }
    };
    useEffect(() => {
        const clickGif = document.getElementsByClassName("gif")[0];
        const clickImg = document.getElementsByClassName("imgClick")[0];
        const clickAi = document.getElementsByClassName("image-dropdown")[0];
        const cursorStyle = image.length >= 4 ? "not-allowed" : "pointer";
        if (clickGif) clickGif.style.cursor = cursorStyle;
        if (clickImg) clickImg.style.cursor = cursorStyle;
        if (clickAi) clickAi.style.cursor = cursorStyle;
    }, [image]);

    function findHashtag(input) {
        const regexHashtag = /#(\w+)/g;
        const tabReturn = [];
        const motHashtag=input.match(regexHashtag);
        let newTab=[];
        if (motHashtag !== null) {
            for (let i =0; motHashtag.length>i;i++){
                newTab.push(motHashtag[i].slice(1));
            }
        }
        return newTab;
    }


    const handleSubmit = async (e) => {

        e.preventDefault();
        const formData = new FormData();
        const formData2 = new FormData();

        for (let i = 0; i < image.length; i++) {
            if (image[i].file instanceof File) {
                formData.append('img[]', image[i].file);
            } else {
                formData2.append('img[]', image[i].file);
            }
        }

        const date = new Date();
        const formattedDate = date.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });

        const hour = date.getHours();
        const min = date.getMinutes();
        const timestamp = formattedDate + " " + hour + ':' + min;
        formData.append("timestamp", timestamp);
        const token = localStorage.getItem("token");
        formData.append('user_id', token);
        const post = inputStr;
        formData.append("post", post);

        const response = await fetch('http://localhost:8000/controller/tweetPost.php', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();

        formData2.append('user_id', token);
        formData2.append('post_id', data);

        const response2 = await fetch('http://localhost:8000/controller/tweetPostUrlImg.php', {
            method: 'POST',
            body: formData2,
        });
        const data2 = await response2.json();
        const hashtagStr = findHashtag(inputStr)
        if (hashtagStr.length > 0) {

            const formData3 = {
                post_id: data,
                hashtag:hashtagStr,
            }

            const response3 = await fetch('http://localhost:8000/controller/htagreceipt&send.php', {
                method: 'POST',
                body:JSON.stringify(formData3),
            });
            const data3 = await response3.text();
        } else {
        }

        onChildDataChange(compteur);
        setCompteur(compteur+1);
        setImage([]);
        setInputStr("")
    }

    const onImageChange = (event) => {
        let imgMax = 4 - image.length;
        let filesToAdd = Math.min(event.target.files.length, imgMax);
        for (let i = 0; i < filesToAdd; i++) {
            let imgLink = URL.createObjectURL(event.target.files[i]);
            setImage(current => [...current, { url: imgLink, file: event.target.files[i] }]);
        }
    }


    const onEmojiClick = (event, emojiObject) => {
        setInputStr((prevInput) => prevInput + event.emoji);
        setShowPicker(false);
    };
    const gifShowUp = (event) => {
        if (image.length >= 4) {
            return;
        }
        setValueGif(!valueGif);
    }
    const callAi = async (value) => {
        if (image.length >= 4 && value===6) {
            return;
        }else{
            setWaitGif(waitGif1)
            setTimeout(() => setWaitGif(waitGif2), 1700);
            document.getElementsByClassName('blocWait')[0].style.display = 'flex';
            const jsonD = {
                prompt: inputStr,
                param:value,
            }
            try {
                const response = await fetch('http://localhost:8000/controller/scriptAi.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jsonD)
                });
                const d = await response.json();
                const data = JSON.parse(d.response);
                if (value === 6) {
                    if(image.length<4){
                        if(typeof data.data === "undefined" || data.data === null){
                        }else{
                            setImage(current => [...current, {url: data.data[0].url, file: data.data[0].url}])
                        }
                    }
                } else {
                    let content = data.choices[0].message.content;
                    document.getElementsByClassName('textAreaPost')[0].value = content;
                    setInputStr(content);
                }
            } catch (error) {
                console.error('Error:', error);
            }finally {
                document.getElementsByClassName('blocWait')[0].style.display = 'none';
            }
        }
    };
    const deleteImage = (imgUrl) => {
        setImage(currentImage => currentImage.filter(img => img.url !== imgUrl));
    }

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

    const handleTextChange = (e) => {

        const newText = e.target.value;
        if (newText.length <= 140) {
            setInputStr(newText);
        }

        const atIndex = newText.indexOf('@');

        if (atIndex !== -1 && atIndex < newText.length - 1) {
            const query = newText.substring(atIndex + 1);
            searchUser(query);
        }
    };

    function changePlaceholder(index) {
        const atIndex = inputStr.indexOf('@');
        if (atIndex !== -1) {
            const beforeAt = inputStr.substring(0, atIndex + 1);
            const selectedItem = index.username;
            const newText = beforeAt + selectedItem;
            setInputStr(newText);
        }
    }


    return (
        <div className="post">
            <div className="blocWait">
                <img className="waitGif" src={waitGif}/>
            </div>
            <div className="blocGlobPost">
                <form className="formPost" onSubmit={handleSubmit}>
                    <div className="blocpostEncore">
                        <div className="surroundBlockPost">
                            <div className="blockPost">
                                <img className="imgAvatar" src={avatar}></img>
                                <textarea className="textAreaPost" value={inputStr}
                                          placeholder="Laissez votre imagination s'envoler... Écrivez ici sur Piaf."
                                          onChange={handleTextChange}></textarea>
                                <div className="characterCounter">{inputStr.length}/140</div>
                            </div>
                            <div className="blocResult">
                                <div className="blocAffSearch">
                                    {tabResult.map((i, index) => <AffichageSearch onClick={() => changePlaceholder(i)}
                                                                                  onCustomClick={() => changePlaceholder(i)}
                                                                                  key={index} code={1} val={[i]}/>)}
                                </div>

                            </div>

                        </div>
                        <div className="blockPicsFile">
                            {image.map((imgObj, index) => (
                                <img key={index} className="imgPost1" src={imgObj.url}
                                     onClick={() => deleteImage(imgObj.url)}
                                />
                            ))}
                            <div className="border" style={{width: '80%'}}></div>
                        </div>
                    </div>

                    <div className="imgBlock">
                        <div className="arroundIMG">
                            <label htmlFor="fileIMG" className="labelFileImg">



                                <div className={`imgClick ${theme === 'dark' ? 'imgClick-dark' : 'imgClick-light'}`}></div>
                            </label>
                            <input type="file" id="fileIMG" multiple="multiple" style={{display: "none"}}
                                   onChange={onImageChange} className="filetype"/>



                            <div className={`gif ${theme === 'dark' ? 'gif-dark' : 'gif-light'}`} onClick={gifShowUp}></div>



                            <div className={`smiley ${theme === 'dark' ? 'smiley-dark' : 'smiley-light'}`} onClick={() => setShowPicker((val) => !val)}></div>
                            <div className="image-dropdown">
                                <div className={`iconeAi ${theme === 'dark' ? 'iconeAi-dark' : 'iconeAi-light'}`}
                                     onClick={gifShowUp}></div>
                                <div className="dropdown-content">
                                    <a href="#" onClick={() => callAi(1)}>Correction</a>
                                    <div className="submenu">
                                        <a href="#">Traduction&emsp;&emsp;&emsp;&emsp; ➡️</a>
                                        <div className="submenu-content">
                                            <a href="#" onClick={() => callAi(2.1)}>Anglais</a>
                                            <a href="#" onClick={() => callAi(2.2)}>Espagnol</a>
                                            <a href="#" onClick={() => callAi(2.3)}>Allemand</a>
                                        </div>
                                    </div>
                                    <a href="#" onClick={() => callAi(3)}>Tweet creator</a>
                                    <a href="#" onClick={() => callAi(4)}>Hashtag générator</a>
                                    <a href="#" onClick={() => callAi(5)}>Pimp my tweet</a>
                                    <a href="#" onClick={() => callAi(6)}>Image générator</a>
                                </div>
                            </div>
                        </div>
                        <input onClick={handleSubmit} onClick={playSound} className="submitButtonPost2" type={"submit"}/>
                    </div>
                </form>
            </div>

            {showPicker && (
                <Picker height={400} width={300} onEmojiClick={onEmojiClick}/>
            )}
            <div id="gifSelect" className="gifBlock" style={{display: showGif}}>
                <ReactGiphySearchbox
                    id="gifInput"
                    apiKey="uSgrvlCqF67IT6m3BQ68oIatU7WK0PH0"
                    onSelect={handleClickGif}
                />
            </div>
        </div>
    )
}