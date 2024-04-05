import {useState,useEffect} from "react";
import NavBarre from "./navBarre";
import FormBio from "./formBio";
import TrendComposant from "./composantTrend";
import Recommandation from "./recommendation";
import Post from "./post/post";
import NewPost from "./newPost";
import '../App.css';

function MainePage() {

    const elements = document.querySelectorAll('.blocFormBio');
    const queryParams = new URLSearchParams(window.location.search);
    const [stat, setStat] = useState(queryParams.get('status'));
    const [htag, setHtage] = useState(queryParams.get('htag'));


    const [load, setLoad] = useState();
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(10);
    const [tabResult, setTabResult] = useState([]);
    const [childData, setChildData] = useState();



    const formBioEvent = (newState) => {
        setLoad(newState);
    }

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
        let jsonData;

        if(htag){
            jsonData = {
                offset:offset,
                limit:limit,
                hashtag:htag
            };
        }else{
            jsonData = {
                offset:offset,
                limit:limit
            };
        }

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
                }
            });


    }, [childData,limit,htag]);


    const toggleBlocEdit = () => {
        window.location.reload();
    };

    return (<>
            <NavBarre state={load} />
            <FormBio onEvent={formBioEvent} stat={stat} />
            <div className="blocMainPost">
                <Post onChildDataChange={setChildData}/>
                {tabResult.map((i) => <NewPost key={i.post.id} tab={[i]} onToggleBlocEdit={toggleBlocEdit}/>)}

            </div>

            <div className="blocTrendReco">
                <TrendComposant  onToggleBlocEdit={toggleBlocEdit}/>
                <Recommandation/>
            </div>

        </>


    )
}
export default MainePage;