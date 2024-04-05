import { useState, useEffect } from "react";
import '../App.css';
import { useMyContext } from "../context";
import { useNavigate } from "react-router-dom";

function Recommandation() {
    const [newData, setNewData] = useState();
    const navigate = useNavigate();
    const { data, updateData } = useMyContext();

    const [users, setUsers] = useState([
        { isFollowing: false, data: null },
        { isFollowing: false, data: null },
        { isFollowing: false, data: null },
    ]);

    useEffect(() => {
        const tokenUser = localStorage.getItem("token");
        fetch(`http://localhost:8000/controller/recommandation.php`, {
            method: "POST",
            body: JSON.stringify({ token: tokenUser }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => {
                setUsers(res.slice(0, 3).map(user => ({ isFollowing: false, data: user })));
                setNewData(res.slice(0, 3).map(user => ({ isFollowing: false, data: user })));
            });
    }, []);

    const handleFollow = (index) => {
        const updatedUsers = [...users];
        const user = updatedUsers[index];
        const tokenUser = localStorage.getItem("token");
        const url = user.isFollowing ? `http://localhost:8000/controller/unfollowProfil.php` : `http://localhost:8000/controller/followOtherProfil.php`;

        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                tokenUser: tokenUser,
                idOtherUser: user.data.id,
            }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => {
                updatedUsers[index].isFollowing = !user.isFollowing;
                setUsers(updatedUsers);
            });
    };

    function navigateTo(input) {
        const jsonData = {
            username: newData[input].data["username"],
        };

        fetch(`http://localhost:8000/controller/userRecherche.php`, {
            method: "POST",
            body: JSON.stringify(jsonData),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res2) => res2.json())
            .then((res2) => {
                const tab = [res2[0]];
                updateData(tab);
                navigate(`/otherProfilPage?`);
            });
    }

    return (
        <div className="blocReco">
            <div className="titleReco">
                <h1 className="txtTitleRecon">Recommendations</h1>
            </div>
            {users.map((user, index) => (
                user.data && (
                    <div className="blocContentReco" key={index}>
                        <div className="infoUserReco">
                            <img src={user.data.photo_user} className="iconeUserNewPost" alt="User avatar" onClick={() => navigateTo(index)} />
                            <div className="blocNameReco">
                                <p className="nameReco">{user.data.name}</p>
                                <p className="usernameReco">@{user.data.username}</p>
                            </div>
                        </div>
                        <button onClick={() => handleFollow(index)} className="custom-button btn-black follow">
                            {user.isFollowing ? 'Unfollow' : 'Follow'}
                        </button>
                    </div>
                )
            ))}
        </div>
    );
}

export default Recommandation;
