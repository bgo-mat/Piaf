import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBarre from "./navBarre";
import Recommandation from "./recommendation";
import iconeVoirImgWhite from "../asset/iconeFlecheWhite.png";
import iconeVoirImgBlack from "../asset/iconeFleche.png";
import BlocTrendBoucle from "./trendBoucleAffichage";
import TrendComposant from "./composantTrend";
import { useTheme } from "../themeContext";

function TrendPage() {
    const [hashtag, setHashtag] = useState([]);
    const [tabResult, setTabResult] = useState([]);
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const [iconeChange, setIconeChange] = useState(theme === 'dark' ? iconeVoirImgWhite : iconeVoirImgBlack);
    const [iconeVoirImg, setIconeVoirImg] = useState(iconeChange);

    useEffect(() => {
        fetch(`http://localhost:8000/controller/trend.php`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((res) => {
                const tempHashtag = [];
                const tempTabResult = [];
                res.forEach(element => {
                    tempHashtag.push(element[0]);
                    tempTabResult.push(element);
                });
                setHashtag(tempHashtag);
                setTabResult(tempTabResult);
            });
        setIconeChange(theme === 'light' ? iconeVoirImgWhite : iconeVoirImgBlack);
        setIconeVoirImg(iconeChange);
    }, [theme]);

    const toggleBlocEdit = () => {
        window.location.reload();
    };

    return (
        <>
            <NavBarre/>
            <div className="blocMainPost">
                <div className="blocRetourTrend" onClick={() => navigate('/mainPage')}>
                    <img className="flecheRetour" src={iconeVoirImg}/>
                    <h1 className="titleRetourTrend">Trends</h1>
                </div>
                {tabResult.map((i, index) => <BlocTrendBoucle key={index} tab={[i]}/>)}
            </div>
            <div className="blocTrendReco">
                <TrendComposant onToggleBlocEdit={toggleBlocEdit}/>
                <Recommandation/>
            </div>
        </>
    );
}

export default TrendPage;
