import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

interface Order {
    transactionId: string;
    buyer: {
        userId: number;
        username: string;
        email: string;
        phone: string;
        role: string;
    };
    product: {
        productId: number;
        title: string;
        price: number;
        seller: {
            userId: number;
            username: string;
            email: string;
            phone: string;
            role: string;
        };
    };
    status: string;
    createdAt: string;
    updatedAt: string;
    address: string;
    note: string;
}

const OrderList: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const userId = Cookies.get("token");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(apiUrl+'/api/transaction/user',{
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        buyer: {userId: userId}
                    })
                }); // 假设后端接口是 /api/orders

                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                setOrders(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders().then();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>订单列表</h1>
            <ul>
                {orders.map((order,index) => (
                    <li key={index}>
                        <h2>订单ID: {order.transactionId}</h2>
                        <p>买家: {order.buyer.username}</p>
                        <p>卖家: {order.product.seller.username}</p>
                        <p>商品: {order.product.title}</p>
                        <p>价格: ¥{order.product.price}</p>
                        <p>状态: {order.status}</p>
                        <p>收货地址: {order.address}</p>
                        <p>备注: {order.note}</p>
                        <p>创建时间: {order.createdAt}</p>
                        <p>更新时间: {order.updatedAt}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderList;