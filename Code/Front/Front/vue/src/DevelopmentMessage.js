import React from 'react';
import './index.css';
import logo from "./asset/logo.png";

const DevelopmentMessage = () => {
    return (
        <div className="container3">
            <div className="logo devLOgo">
                <img src={logo} alt="logo" className="logoDev" id="logoLandingPage"/>
            </div>
            <div className="devDev text_dev">
                <h6 id="devDev">Actuellement, notre nid n'est pas encore parfait pour les appareils comme le
                    tiens, mais nous travaillons d'arrache-pied pour que tu puisses bientôt Piafer sans souci.
                    Reviens nous voir sur un écran plus grand !</h6>
            </div>
        </div>
    );
};

export default DevelopmentMessage;