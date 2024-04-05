import React, {useEffect,useState} from "react";
import clickIcone from "../asset/click.png";
import '../App.css';

function EditProfil( props ) {
    const [avatar, setAvatar] = useState();
    const [banniere, setBanniere] = useState();
    const tokenUser = localStorage.getItem("token");
    const { onToggleBlocEdit } = props;


    const sendFormBio = async (event) => {

        event.preventDefault();
        const formData = new FormData();
        const banniereInput = document.querySelector(".fondVal");
        const avatarInput = document.querySelector(".avatar");
        const bioValue = document.querySelector(".bioForm").value;
        const token = localStorage.getItem('token');

        if (banniereInput.files[0]) {
            formData.append('banniere', banniereInput.files[0]);
        }else{
            formData.append('banniere', banniere);
        }
        if (avatarInput.files[0]) {
            formData.append('avatar', avatarInput.files[0]);
        }else{
            formData.append('avatar', avatar);
        }
        if (token) {
            formData.append('token', token);
        }
        formData.append('bio', bioValue);


        try {
            const response = await fetch('http://localhost:8000/controller/saveImg.php', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            document.getElementsByClassName("blocFormBio")[0].style.display="none";

            // Event qui déclenche le fetch dans navBarre
        } catch (error) {
            console.error('Error:', error);
        }

        close();
    }

    const antiClick = (e) => {
        e.stopPropagation();
    };

    const changeAvatar = () => {
        const avatarInput = document.querySelector(".avatar");
        if (avatarInput.files && avatarInput.files[0]) {
            const reader = new FileReader();

            reader.onload = function(e) {
                setAvatar(e.target.result);
            }

            reader.readAsDataURL(avatarInput.files[0]);
        }
    }

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
                setAvatar(res2[1][0]['photo_user']);
                setBanniere(res2[1][0]['banniere_user'])
                document.getElementsByClassName("inputBanniere")[0].style.backgroundImage = `url('${res2[1][0]['banniere_user']}')`;
            });
    }, []);

    const changeBannierre = () => {
        const banniereInput = document.querySelector(".fondVal");


        if (banniereInput.files && banniereInput.files[0]) {
            const reader = new FileReader();

            reader.onload = function(e) {
                document.getElementsByClassName("inputBanniere")[0].style.backgroundImage = `url('${e.target.result}')`;
            }

            reader.readAsDataURL(banniereInput.files[0]);
        }
    }



    const close = () => {
        onToggleBlocEdit();
    };


    return (
        <div className="blocformEdit" >
            <form className="formEdit" onClick={antiClick}>
                <div className="inputBanniere">
                    <div className="imgBanniere">
                        <label htmlFor="banniere">
                            <img className="iconeEdit" src={clickIcone}/>
                        </label>
                        <input type="file" className="fondVal" id="banniere"  accept="image/png, image/jpeg" onChange={changeBannierre}/>
                    </div>
                </div>
                <div className="inputAvatar">
                    <div className="blocAvatar">
                        <img className="formAvatar" src={avatar}/>

                        <div className="button-wrapper">
                            <span className="btn">Upload avatar</span>
                            <input type="file" name="avatar" id="avatar" className="avatar" accept="image/png, image/jpeg" onChange={changeAvatar}/>
                        </div>
                    </div>
                    <div className="blocTexteBio">
                    </div>
                </div>
                <div className="blocBio">
                    <div className="inputBio">
                    <textarea id="bio" name="bio" rows="4" cols="50" className="bioForm"
                              placeholder="Écrivez une bio pour vous présenter...">

                    </textarea>

                    </div>
                    <div className="blocButtonFormBio">
                        <button className="buttonFormBio" onClick={close}>Annuler</button>
                        <button className="buttonFormBio" onClick={sendFormBio}>C’est parti !</button>
                    </div>
                </div>


            </form>
        </div>
    )
}

export default EditProfil;