import { useState, useEffect } from "react";
import { useMyContext } from "../context";
import { useNavigate } from "react-router-dom";

function AffichageSearch({ val, val2, code, onCustomClick }) {
    const { updateData } = useMyContext();
    const [avatar, setAvatar] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (val) {
            setAvatar(val[0]['photo_user']);
            setName(val[0]['name']);
            setUsername(val[0]['username']);
        }
    }, [val]);

    const navigTo = () => {
        if (code === 1) {
            if (typeof onCustomClick === 'function') {
                onCustomClick();
            }
        } else {
            updateData(val2);
            navigate('/otherProfilPage');
        }
    };

    return (
        <div className="blocAffUser" onClick={navigTo}>
            <div className="searchImgName">
                <img src={avatar} className="imgAvatarSearch"/>
                <div className="searchText">
                    <p className="usernameSearch">@{username}</p>
                    <p className="nameSearch">{name}</p>
                </div>
            </div>
        </div>
    );
}

export default AffichageSearch;
