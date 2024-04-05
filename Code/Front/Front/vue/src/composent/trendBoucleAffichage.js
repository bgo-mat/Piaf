import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import iconeVoirImgWhite from "../asset/iconeFlecheWhite.png";
import iconeVoirImgBlack from "../asset/iconeFleche.png";
import { useTheme } from "../themeContext";

function BlocTrendBoucle({ tab }) {
    const [hashtag, setHashtag] = useState("");
    const [nbPost, setNbPost] = useState("");
    const { theme, toggleTheme } = useTheme();
    const [iconeChange, setIconeChange] = useState(theme === 'dark' ? iconeVoirImgWhite : iconeVoirImgBlack);
    const [iconeVoirImg, setIconeVoirImg] = useState(iconeChange);

    useEffect(() => {
        setHashtag(tab[0][0]);
        setNbPost(tab[0]['usage_count']);
        setIconeChange(theme === 'light' ? iconeVoirImgWhite : iconeVoirImgBlack);
        setIconeVoirImg(iconeChange);
    }, [theme]);

    const navigate = useNavigate();

    function navigateTo() {
        navigate(`/mainPage?htag=${hashtag}`);
    }

    return (
        <>
            <div className="carteTrend2" onClick={navigateTo}>
                <div className="blocTexteTrend">
                    <p className="themeTexte text-whiteSecond colorEnd">Thème</p>
                    <p className="hashtagTexte text-white colorEnd">#{hashtag}</p>
                    <p className="nombrePostTexte text-whiteSecond colorEnd">{nbPost} tweets</p>
                    <div className="border"></div>
                </div>
                <div className="blocIconeVoir">
                    <img className="iconeVoir" src={iconeVoirImg}/>
                </div>
            </div>
        </>
    );
}

export default BlocTrendBoucle;
