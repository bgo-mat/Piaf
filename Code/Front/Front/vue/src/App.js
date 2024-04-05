import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./composent/landingPage";
import NavBarre from "./composent/navBarre";
import FormBio from "./composent/formBio";
import PopUpMail from "./composent/emailPopUp";
import MainePage from "./composent/mainPage";
import TrendComposant from "./composent/composantTrend";
import ForgetPassword from "./composent/forgetPassword";
import MailResetPassword from "./composent/mailResetPassword/mailResetPassword";
import Post from "./composent/post/post";
import AuthGuard from "./authguard";
import Recommandation from "./composent/recommendation";
import NewPost from "./composent/newPost";
import MyProfil from "./composent/profil/myProfil";
import OtherProfil from "./composent/profil/otherProfil";
import MyProfilPage from "./composent/profilPage/myProfilPage";
import OtherProfilPage from "./composent/profilPage/otherProfilPage";
import TrendPage from "./composent/trendPage";
import MessagePage from "./composent/messagePage";
import AffichageSearch from "./composent/resultUser";
import BlocTrendBoucle from "./composent/trendBoucleAffichage";
import EditProfil from "./composent/editProfil";
import ShowFollow from "./composent/showFollow";
import BoucleFollow from "./composent/boucleFollower";

import RedirectionPost from "./composent/redirectionPoste";
import Player from "./composent/player/player";

const router = createBrowserRouter([
    {
        path: '/landingPage',
        element: <div className="blocBaseLanding"><LandingPage /></div>
    },
    {
        path: '/mailResetPassword',
        element: <div className="blocBasePass"><MailResetPassword/></div>
    },
    {
        path: '/NavBarre',
        element: <AuthGuard><div className="blocBase"><NavBarre/></div></AuthGuard>,
    },
    {
        path: '/formBio',
        element: <AuthGuard><div className="blocBase"><FormBio/></div></AuthGuard>,
    },

    {
        path: '/mailVerif',
        element: <AuthGuard><div className="blocBase"><PopUpMail/></div></AuthGuard>,
    },
    {
        path: '/mainPage',
        element: <AuthGuard><div className="blocBaseMain"><MainePage/></div></AuthGuard>,
    },

    {
        path: '/post',
        element:<AuthGuard><div className="blocBase"><RedirectionPost/></div></AuthGuard>
    },
    {
        path: '/trend',
        element: <AuthGuard><div className="blocBase"><TrendComposant/></div></AuthGuard>,
    },
    {
        path: '/recomandation',
        element: <AuthGuard><div className="blocBase"><Recommandation/></div></AuthGuard>,
    },
    {
        path: '/newPost',
        element: <AuthGuard><div className="blocBase"><NewPost/></div></AuthGuard>,
    },
    {
        path: '/forgetpassword',
        element:<div className="blocBasePass"><ForgetPassword/></div>
    },
    {
        path: '/post',
        element: <AuthGuard><div className="blocBasePass"><Post/></div></AuthGuard>
    },
    {
        path: '/myProfil',
        element: <AuthGuard><div className="blocBase"><MyProfil/></div></AuthGuard>
    },
    {
        path: '/otherProfil',
        element: <AuthGuard><div className="blocBase"><OtherProfil/></div></AuthGuard>
    },
    {
        path: '/myProfilPage',
        element: <AuthGuard><div className="blocBase"><MyProfilPage/></div></AuthGuard>
    },
    {
        path: '/otherProfilPage',
        element:  <AuthGuard><div className="blocBase"><OtherProfilPage/></div></AuthGuard>
    },
    {
        path: '/TrendPage',
        element: <AuthGuard><div className="blocBase"><TrendPage/></div></AuthGuard>
    },
    {
        path: '/affichageSearch',
        element: <AuthGuard><AffichageSearch/></AuthGuard>
    },
    {
        path: '/blocTrendBoucle',
        element: <AuthGuard><BlocTrendBoucle/></AuthGuard>
    },
    {
        path: '/editProfil',
        element: <AuthGuard><EditProfil/></AuthGuard>
    },
    {
        path: '/boucleFollow',
        element: <AuthGuard><BoucleFollow/></AuthGuard>
    },
    {
        path: '/follow',
        element: <AuthGuard><div className="blocBaseMain"><ShowFollow/></div></AuthGuard>,
    },
    {
        path: '/messagePage',
        element:<AuthGuard> <div className="blocBase"><MessagePage/></div></AuthGuard>
    },
    {
        path: '/player',
        element:   <AuthGuard><Player/></AuthGuard>
    }


]);

function App() {
    return <RouterProvider router={router} />
}

export default App;