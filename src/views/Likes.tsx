import './css/Likes.css'
import LikedItems from "../components/LikedItems.tsx";
import TopBar from "../components/TopBar.tsx";

function Likes(){
    return (
        <>
            <TopBar/>
            <div id={"TrolleyRoot"} className={"d-flex flex-column"}>
                <div className="list-box d-flex flex-column ">
                    <LikedItems />
                    <LikedItems />
                    <LikedItems />
                    <LikedItems />
                    <LikedItems />
                </div>
            </div>
        </>
    )
}

export default Likes;