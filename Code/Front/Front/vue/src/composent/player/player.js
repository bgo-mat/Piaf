import React, { useEffect, useState } from "react";
import '../../App.css';
import playIcone from "./asset/play.png";
import pauseIcone from "./asset/pause.png";
import next from "./asset/next.png";
import back from "./asset/next.png";
import useSound from 'use-sound';
import miami from "../../asset/music/synthwave/miami-night.mp3";
import midnight from "../../asset/music/synthwave/midnight.mp3";
import nebula from "../../asset/music/synthwave/nebula.mp3";
import forever from "../../asset/music/lo-fi/forever.mp3";
import serenity from "../../asset/music/lo-fi/serenity.mp3";
import luminova from "../../asset/music/lo-fi/luminova.mp3";
import vivid from "../../asset/music/ambiant/vivid.mp3";
import dark from "../../asset/music/ambiant/dark-pad.mp3";
import bladeRunner from "../../asset/music/ambiant/bladeRunner.mp3";
import lofiBack from "../player/asset/lofi.png";
import synthwaveBack from "../player/asset/synthwaveBack.png";
import ambiantBack from "../player/asset/ambiant.png";
import {useTheme} from "../../themeContext";
function Player() {
    const ambiant =[vivid, dark, bladeRunner];
    const loFi =[forever, serenity, luminova];
    const synthwave = [miami,midnight, nebula ];
    const [text, setText] = useState('Lofi');
    const [bgImg, setbgImg] = useState(lofiBack)
    const [iconePlay, setIconePlay] = useState(playIcone);
    const [song, setSong] = useState(loFi[0]);
    const [curseurValeur, setCurseurValeur] = useState(1);
    const [compteur, setCompteur] = useState(0);
    const [start, setStart] = useState(0);
    const [volume, setVolume] = useState(1);
    const [colorClass, setColorClass] = useState('lofiBg');
    const {  changeColor } = useTheme();


    const handleChange = (event) => {
        const newVolume = parseFloat(event.target.value);
        setCurseurValeur(newVolume);
        setVolume(newVolume);
    };
    const changeIconePlay = () => {
        if (compteur === 0) {
            setIconePlay(pauseIcone);
            setCompteur(1);
            play();
        } else {
            setIconePlay(playIcone);
            setCompteur(0);
            pause();
        }
    };
    const nextFunction = () => {
        stop();
        if(song === loFi[0]){
            changeColor("lofi")
            document.documentElement.style.setProperty('--bloc-background', "rgb(211,141,80)");
            document.documentElement.style.setProperty('--bloc-background-hover', "rgba(149,101,59,1)");
            document.documentElement.style.setProperty('--bloc-background-gradient', "radial-gradient(circle, rgba(211,141,80,1) 51%, rgba(149,101,59,1) 95%) ");
            setText("Lofi")
            setSong(loFi[1]);
            setbgImg(lofiBack);
        } else if(song === loFi[1]){
            changeColor("lofi")
            document.documentElement.style.setProperty('--bloc-background-hover', "rgba(149,101,59,1)");
            document.documentElement.style.setProperty('--bloc-background', "rgb(211,141,80)");
            document.documentElement.style.setProperty('--bloc-background-gradient', "radial-gradient(circle, rgba(211,141,80,1) 51%, rgba(149,101,59,1) 95%) ");
            setText("Lofi")
            setSong(loFi[2]);
            setbgImg(lofiBack);
        } else if(song === loFi[2]){
            changeColor("synth")
            document.documentElement.style.setProperty('--bloc-background-hover', "rgba(110,37,82,1)");
            document.documentElement.style.setProperty('--bloc-background', "rgb(195,68,146)");
            document.documentElement.style.setProperty('--bloc-background-gradient', "radial-gradient(circle, rgba(195,68,146,1) 51%, rgba(110,37,82,1) 95%) ");
            setText("Lofi")
            setColorClass("synthwaveBg")
            setText("Synthwave")
            setSong(synthwave[0]);
            setbgImg(synthwaveBack);
        }else if(song === synthwave[0]) {
            changeColor("synth")
            document.documentElement.style.setProperty('--bloc-background-hover', "rgba(110,37,82,1)");
            document.documentElement.style.setProperty('--bloc-background', "rgb(195,68,146)");
            document.documentElement.style.setProperty('--bloc-background-gradient', "radial-gradient(circle, rgba(195,68,146,1) 51%, rgba(110,37,82,1) 95%) ");
            setText("Synthwave")
            setSong(synthwave[1]);
        } else if(song === synthwave[1]) {
            changeColor("synth")
            document.documentElement.style.setProperty('--bloc-background-hover', "rgba(110,37,82,1)");
            document.documentElement.style.setProperty('--bloc-background', "rgb(195,68,146)");
            document.documentElement.style.setProperty('--bloc-background-gradient', "radial-gradient(circle, rgba(195,68,146,1) 51%, rgba(110,37,82,1) 95%) ");
            setText("Synthwave")
            setSong(synthwave[2]);
        }else if(song === synthwave[2]) {
            changeColor("ambient")
            document.documentElement.style.setProperty('--bloc-background-hover', "rgba(54,87,91,1)");
            document.documentElement.style.setProperty('--bloc-background', "rgb(106,160,166)");
            document.documentElement.style.setProperty('--bloc-background-gradient', "radial-gradient(circle, rgba(106,160,166,1) 51%, rgba(54,87,91,1) 95%) ");
            setColorClass("ambientBg");
            setSong(ambiant[0]);
            setText("Ambiant");
            setbgImg(ambiantBack);
        }else if(song === ambiant[0]) {
            changeColor("ambient");
            document.documentElement.style.setProperty('--bloc-background-hover', "rgba(54,87,91,1)");
            document.documentElement.style.setProperty('--bloc-background', "rgb(106,160,166)");
            document.documentElement.style.setProperty('--bloc-background-gradient', "radial-gradient(circle, rgba(106,160,166,1) 51%, rgba(54,87,91,1) 95%) ");
            setText("Synthwave");
            setText("Ambiant");
            setSong(ambiant[1]);
            setbgImg(ambiantBack);
        }else if(song === ambiant[1]) {
            changeColor("ambient");
            document.documentElement.style.setProperty('--bloc-background-hover', "rgba(54,87,91,1)");
            document.documentElement.style.setProperty('--bloc-background', "rgb(106,160,166)");
            document.documentElement.style.setProperty('--bloc-background-gradient', "radial-gradient(circle, rgba(106,160,166,1) 51%, rgba(54,87,91,1) 95%) ");
            setText("Ambiant");
            setSong(ambiant[2]);
            setbgImg(ambiantBack);
        }else if(song === ambiant[2]) {
            changeColor("lofi")
            document.documentElement.style.setProperty('--bloc-background-hover', "rgba(149,101,59,1)");
            document.documentElement.style.setProperty('--bloc-background', "rgb(211,141,80)");
            document.documentElement.style.setProperty('--bloc-background-gradient', "radial-gradient(circle, rgba(211,141,80,1) 51%, rgba(149,101,59,1) 95%) ");            setColorClass("lofiBg")
            setSong(loFi[0]);
            setText("Lofi");
            setbgImg(lofiBack);
        }
    };
    
    const [play, { pause, stop }] = useSound(song, { volume,  onend: nextFunction  });
    useEffect(() => {
        stop();
    }, [song]);
    useEffect(() => {
        if (compteur === 1) {
            play();
        }
    }, [play]);
    const backFunction = () => {
        stop();
        if (song === loFi[0]) {
            changeColor("ambient");
            document.documentElement.style.setProperty('--bloc-background-hover', "rgba(54,87,91,1)");
            document.documentElement.style.setProperty('--bloc-background', "rgb(106,160,166)");
            document.documentElement.style.setProperty('--bloc-background-gradient', "radial-gradient(circle, rgba(106,160,166,1) 51%, rgba(54,87,91,1) 95%) ");
            setColorClass("ambientBg");
            setSong(ambiant[2]);
            setText("Ambiant");
            setbgImg(ambiantBack);
        } else if (song === ambiant[2]) {
            changeColor("ambient");
            document.documentElement.style.setProperty('--bloc-background-hover', "rgba(54,87,91,1)");
            document.documentElement.style.setProperty('--bloc-background', "rgb(106,160,166)");
            document.documentElement.style.setProperty('--bloc-background-gradient', "radial-gradient(circle, rgba(106,160,166,1) 51%, rgba(54,87,91,1) 95%) ");
            setColorClass("ambientBg");
            setSong(ambiant[1]);
            setText("Ambiant");
            setbgImg(ambiantBack);
        } else if (song === ambiant[1]) {
            changeColor("ambient");
            document.documentElement.style.setProperty('--bloc-background-hover', "rgba(54,87,91,1)");
            document.documentElement.style.setProperty('--bloc-background', "rgb(106,160,166)");
            document.documentElement.style.setProperty('--bloc-background-gradient', "radial-gradient(circle, rgba(106,160,166,1) 51%, rgba(54,87,91,1) 95%) ");
            setColorClass("ambientBg");
            setSong(ambiant[0]);
            setText("Ambiant");
            setbgImg(ambiantBack);
        } else if (song === ambiant[0]) {
            changeColor("synth");
            document.documentElement.style.setProperty('--bloc-background-hover', "rgba(110,37,82,1)");
            document.documentElement.style.setProperty('--bloc-background', "rgb(195,68,146)");
            document.documentElement.style.setProperty('--bloc-background-gradient', "radial-gradient(circle, rgba(195,68,146,1) 51%, rgba(110,37,82,1) 95%) ");
            setColorClass("synthwaveBg");
            setSong(synthwave[2]);
            setText("Synthwave");
            setbgImg(synthwaveBack);
        } else if (song === synthwave[2]) {
            changeColor("synth");
            document.documentElement.style.setProperty('--bloc-background-hover', "rgba(110,37,82,1)");
            document.documentElement.style.setProperty('--bloc-background', "rgb(195,68,146)");
            document.documentElement.style.setProperty('--bloc-background-gradient', "radial-gradient(circle, rgba(195,68,146,1) 51%, rgba(110,37,82,1) 95%) ");
            setColorClass("synthwaveBg");
            setSong(synthwave[1]);
            setText("Synthwave");
            setbgImg(synthwaveBack);
        } else if (song === synthwave[1]) {
            changeColor("synth");
            document.documentElement.style.setProperty('--bloc-background-hover', "rgba(110,37,82,1)");
            document.documentElement.style.setProperty('--bloc-background', "rgb(195,68,146)");
            document.documentElement.style.setProperty('--bloc-background-gradient', "radial-gradient(circle, rgba(195,68,146,1) 51%, rgba(110,37,82,1) 95%) ");
            setColorClass("synthwaveBg");
            setSong(synthwave[0]);
            setText("Synthwave");
            setbgImg(synthwaveBack);
        } else if (song === synthwave[0]) {
            changeColor("lofi");
            document.documentElement.style.setProperty('--bloc-background-hover', "rgba(149,101,59,1)");
            document.documentElement.style.setProperty('--bloc-background', "rgb(211,141,80)");
            document.documentElement.style.setProperty('--bloc-background-gradient', "radial-gradient(circle, rgba(211,141,80,1) 51%, rgba(149,101,59,1) 95%) ");
            setColorClass("lofiBg");
            setSong(loFi[2]);
            setText("Lofi");
            setbgImg(lofiBack);
        } else if (song === loFi[2]) {
            document.documentElement.style.setProperty('--bloc-background-hover', "rgba(149,101,59,1)");
            document.documentElement.style.setProperty('--bloc-background', "rgb(211,141,80)");
            document.documentElement.style.setProperty('--bloc-background-gradient', "radial-gradient(circle, rgba(211,141,80,1) 51%, rgba(149,101,59,1) 95%) ");
            setColorClass("lofiBg");
            setSong(loFi[1]);
            setText("Lofi");
            setbgImg(lofiBack);
        } else if (song === loFi[1]) {
            changeColor("lofi")
            document.documentElement.style.setProperty('--bloc-background-hover', "rgba(149,101,59,1)");
            document.documentElement.style.setProperty('--bloc-background', "rgb(211,141,80)");
            document.documentElement.style.setProperty('--bloc-background-gradient', "radial-gradient(circle, rgba(211,141,80,1) 51%, rgba(149,101,59,1) 95%) ");
            setColorClass("lofiBg");
            setSong(loFi[0]);
            setText("Lofi");
            setbgImg(lofiBack);
        }
    };

    return (
        <div className="blocPalyer">
            <div className="blocVolume">
                <input
                    type="range"
                    className={`curseur-personnalise ${colorClass}`}
                    id="monCurseur"
                    min="0"
                    max="1"
                    step="0.01"
                    value={curseurValeur}
                    onChange={handleChange}
                />
            </div>
            <div className="blocSon">
                <div className="affSon" style={{ backgroundImage: `url(${bgImg})`}}>
                    <div className="songChoice">
                        <h1 className="textSong">{text}</h1>
                    </div>
                </div>
                <div className="parentPlayStop">
                    <div className="blocPlayStop">
                        <img className="iconeBack" src={back} onClick={backFunction} alt="back"/>
                        <img className="iconePlay" onClick={changeIconePlay} src={iconePlay} alt="play"/>
                        <img className="iconeNext" src={next} onClick={nextFunction} alt="next"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Player;