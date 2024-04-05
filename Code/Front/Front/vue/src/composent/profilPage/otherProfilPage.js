import NavBarre from "../navBarre";
import TrendComposant from "../composantTrend";
import Recommandation from "../recommendation";
import NewPost from "../newPost";
import {useEffect, useState} from "react";
import { useMyContext } from "../../context";
import '../../App.css';
import OtherProfil from "../profil/otherProfil";
function OtherProfilPage(){

    const { data,  updateData } = useMyContext();
    const queryParams = new URLSearchParams(window.location.search);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(10);
    const [tabResult, setTabResult] = useState([]);
    const [childData, setChildData] = useState();
    const [noPost, setNoPost] = useState("");

    const handleScroll = () => {
        //Taille max:
        const totalPageHeight = document.documentElement.scrollHeight;
        //Taille actuelle (emplacement du user) :
        const scrollPoint = window.scrollY + window.innerHeight+200;

        if (scrollPoint >= totalPageHeight) {
            setLimit(limit+10);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        let userInfo = data && data[0] ? data[0] : JSON.parse(localStorage.getItem('user_info'));
        const userId = userInfo && userInfo["user"] && userInfo["user"]["0"] && userInfo["user"]["0"]["0"];
        const jsonData = {
            offset:offset,
            limit:limit,
            otherId:userId
        };

        fetch(`http://localhost:8000/controller/getPostController.php`, {
            method: "POST",
            body: JSON.stringify(jsonData),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }

        })
            .then((res) => res.json())
            .then((res) => {
                if(res.length>0){
                    setTabResult(res.filter(item => item.post.post_id === null));
                }else{
                    setNoPost("Aucune publication");
                }

            });

    }, [childData,limit, data]);

    const toggleBlocEdit = () => {
        window.location.reload();
    };

    return(
        <>
            <NavBarre/>
            <div className={"fil"}>
                <OtherProfil data={data}/>
                {tabResult.map((i, index) => <NewPost key={index} tab={[i]}/>)}
                <p style={{ color: 'white' }}>{noPost}</p>
            </div>
            <div className={"blocTrendReco"}>
                <TrendComposant onToggleBlocEdit={toggleBlocEdit}/>
                <Recommandation/>
            </div>
        </>
    )
}
export default OtherProfilPage;