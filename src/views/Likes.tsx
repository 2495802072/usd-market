import './css/Likes.css'
import LikedItems from "../components/LikedItems.tsx";
import TopBar from "../components/TopBar.tsx";
import Cookies from "js-cookie";
import {useError} from "../components/ErrorContext.tsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../authentication/AuthContext.tsx";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

interface LikesItemType {
    likesId: number,
    product: {
        productId: number,
        seller: {
            userId: number,
            username: string,
            email: string,
            phone: string,
            role: string,
            avatarUrl: string
        },
        category: {
            categoryId: number,
            name: string,
            description: string
        },
        title: string,
        description: string,
        price: number,
        status: string
    },
    buyer: {
        userId: number,
        username: string,
        email: string,
        phone: string,
        role: string,
        avatarUrl: string
    }
}

const Likes = () => {
    const { showError } = useError();
    const [likedProductList, setLikedProductList] = useState<LikesItemType[]>([]);
    const navigate = useNavigate();
    const [userId] = useState<string | undefined>(Cookies.get("token"));
    const toLogin = () =>{
        navigate('/login');
    }

    const fetchLikes = async () => {
        try {
            const response = await fetch(apiUrl+'/api/likes/buyer', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({userId})
            });

            if(!response.ok){
                // showError("后端/likes/buyer访问出错，请联系管理员");
                showError(await response.text());
                return;
            }
            const data = await response.json();
            setLikedProductList(data);
        } catch (error) {
            showError('（开发） fetch 后端数据出错')
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    useEffect(() => {
        fetchLikes().then();
    }, [userId]);

    useEffect(() => {
        console.log(likedProductList)
    }, [likedProductList]);


    return (
        <>
            <TopBar/>
            <div id={"TrolleyRoot"} className={"d-flex flex-column"}>
                {useAuth().state.isAuthenticated ? <>
                        <div className="list-box d-flex flex-column ">
                            {likedProductList.map((item,index) => (
                                <LikedItems key={index} title={item.product.title} info={item.product.description} price={item.product.price}/>
                            ))}
                        </div>
                    </>
                    :
                    <>
                        <label className={"w-50 m-2"} style={{
                            fontSize: '20px',
                            fontWeight: "bold",
                            border: "1px solid var(--shop-border-color)"
                        }}>
                            请先
                            <a className={"btn fw-bold"} onClick={toLogin}>登录↗</a>
                        </label>
                    </>}
            </div>
        </>
    )
}

export default Likes;
