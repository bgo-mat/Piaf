import React, {useEffect} from "react";
import {useState} from "react";
import '../App.css';
import iconeVoirGifBlack from "../asset/iconeFleche.gif";
import iconeVoirGifWhite from "../asset/iconeFlecheWhite.gif";
import {useNavigate} from "react-router-dom";
import iconeVoirImgWhite from "../asset/iconeFlecheWhite.png";
import iconeVoirImgBlack from "../asset/iconeFleche.png";
import {useTheme} from "../themeContext";

function TrendComposant(props) {

    const { theme, toggleTheme } = useTheme();
    const [iconeChange, setIconeChange] = useState(theme === 'light' ? iconeVoirImgWhite : iconeVoirImgBlack);
    const [iconeVoirImg, setIconeVoirImg] = useState(iconeChange);

    const [iconeChangeGif, setIconeChangeGif] = useState(theme === 'light' ? iconeVoirGifWhite : iconeVoirGifBlack);
    const [iconeVoirGif, setIconeVoirImgGif] = useState(iconeChange);
    const [trendOne, setTrendOne] = useState("1 · Tendances");
    const [trendSecond, setTrendSecond] = useState("2 · Tendances");
    const [trendThird, setTrendThird] = useState("3 · Tendances");
    const [iconeVoir1, setIconeVoir1] = useState(iconeVoirImg);
    const [iconeVoir2, setIconeVoir2] = useState(iconeVoirImg);
    const [iconeVoir3, setIconeVoir3] = useState(iconeVoirImg);
    const [numberOne, setNumberOne] = useState("")
    const [numberSecond, setNumberSecond] = useState("")
    const [numberThird, setNumberThird] = useState("");
    const navigate = useNavigate();
    const { onToggleBlocEdit } = props;
    const [hashtag, setHashtag] = useState([]);

    // fetch de hashtag

    useEffect( () => {


            fetch(`http://localhost:8000/controller/trend.php`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then((res) => res.json())
                .then((res) => {
                    if(res){
                        res.forEach( element => {
                                setHashtag(current => [...current, element[0]]);
                            }
                        )
                        setNumberOne(res[0]['usage_count'])
                        setNumberSecond(res[1]['usage_count'])
                        setNumberThird(res[2]['usage_count'])
                    }

                });

        setIconeChange(theme === 'dark' ? iconeVoirImgWhite : iconeVoirImgBlack);
        setIconeVoirImg(iconeChange);
        setIconeChangeGif(theme === 'dark' ? iconeVoirGifWhite : iconeVoirGifBlack);
        setIconeVoirImgGif(iconeChangeGif);

    }, [theme])

    useEffect(() => {
        setIconeVoir1(iconeVoirImg);
        setIconeVoir2(iconeVoirImg);
        setIconeVoir3(iconeVoirImg);
    }, [iconeVoirImg]);

    const hoverFlecheIn1 =()=>{
        setIconeVoir1(iconeVoirGif);
    }
    const hoverFlecheIn2 =()=>{
        setIconeVoir2(iconeVoirGif);
    }
    const hoverFlecheIn3 =()=>{
        setIconeVoir3(iconeVoirGif);
    }
    const hoverFlecheOut1 =()=>{
        setIconeVoir1(iconeVoirImg);
    }
    const hoverFlecheOut2 =()=>{
        setIconeVoir2(iconeVoirImg);
    }
    const hoverFlecheOut3 =()=>{
        setIconeVoir3(iconeVoirImg);
    }

    function navigateTo1 (){
        navigate(`/mainPage?htag=${hashtag[0]}`);
        onToggleBlocEdit();
    }

    function navigateTo2 (){
        navigate(`/mainPage?htag=${hashtag[1]}`);
        onToggleBlocEdit();
    }
    function navigateTo3 (){
        navigate(`/mainPage?htag=${hashtag[2]}`);
        onToggleBlocEdit();
    }


    return (
       <>

           <div className="blocTrend">
               <h1 className="trendTitre">Les trends à la une</h1>
               <div className="carteTrend" onClick={navigateTo1} onMouseOver={() => hoverFlecheIn1()}
                    onMouseLeave={() => hoverFlecheOut1()}>
                   <div className="blocTexteTrend">
                       <p className="themeTexte">{trendOne}</p>
                       <p className="hashtagTexte">#{hashtag[0]}</p>
                       <p className="nombrePostTexte">{numberOne} tweets</p>
                   </div>
                   <div className="blocIconeVoir">
                       <img className="iconeVoir" src={iconeVoir1} />
                   </div>
               </div>

               <div className="carteTrend" onClick={navigateTo2} onMouseOver={() => hoverFlecheIn2()}
                    onMouseLeave={() => hoverFlecheOut2()}>
                   <div className="blocTexteTrend">
                       <p className="themeTexte">{trendSecond}</p>
                       <p className="hashtagTexte">#{hashtag[1]}</p>
                       <p className="nombrePostTexte">{numberSecond} tweets</p>
                   </div>
                   <div className="blocIconeVoir">
                       <img className="iconeVoir" src={iconeVoir2} />
                   </div>
               </div>

               <div className="carteTrend" onClick={navigateTo3} onMouseOver={() => hoverFlecheIn3()}
                    onMouseLeave={() => hoverFlecheOut3()}>
                   <div className="blocTexteTrend">
                       <p className="themeTexte">{trendThird}</p>
                       <p className="hashtagTexte">#{hashtag[2]}</p>
                       <p className="nombrePostTexte">{numberThird} tweets</p>
                   </div>
                   <div className="blocIconeVoir">
                       <img className="iconeVoir" src={iconeVoir3} />
                   </div>
               </div>

               <div className="blocVoirPlus" onClick={()=>navigate('/TrendPage')}>
                   <h2 className="trendVoirPlus">Voir plus</h2>
               </div>

           </div>

       </>
    )
}

export default TrendComposant;