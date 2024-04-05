import NavBarre from "../navBarre";
import MyProfil from "../profil/myProfil";
import TrendComposant from "../composantTrend";
import Recommandation from "../recommendation";
import NewPost from "../newPost";
import {useEffect, useState} from "react";
import '../../App.css';
function MyProfilPage(){

    const queryParams = new URLSearchParams(window.location.search);
    const [load, setLoad] = useState();
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(5);
    const [tabResult, setTabResult] = useState([]);
    const [childData, setChildData] = useState();
    const [tableIdRetweet, setTableIdRetweet] = useState([]);
    const [retweet,setRetweet] =useState([]);
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

        const token = localStorage.getItem('token');

        const jsonData = {
            offset:offset,
            limit:limit,
            token:token
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

        if (retweet !== "") {
            for (let a = 0; a < retweet.length ;a++) {
                let jsonTweeter = {
                    user_id: retweet
                }

                fetch(`http://localhost:8000/controller/getUserById.php`, {
                    method: "POST",
                    body: JSON.stringify(jsonTweeter),
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                })
                    .then((resRetweetInput) => resRetweetInput.json())
                    .then((resRetweetInput) => {
                    })
            }
        }

    }, [childData,limit]);

    return(
        <>
            <NavBarre/>
            <div className={"fil"}>
                <MyProfil/>
                {tabResult.map((i) => <NewPost key={i.post.id} tab={[i]} />)}
                <p style={{color: 'white'}}>{noPost}</p>
            </div>
            <div className={"blocTrendReco"}>
                <TrendComposant/>
                <Recommandation/>
            </div>
        </>
    )
}
export default MyProfilPage;