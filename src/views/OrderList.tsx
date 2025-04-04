import { useState, useEffect } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import Cookies from 'js-cookie';
import TopBar from "../components/TopBar.tsx";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

interface TransactionType {
    transactionId: number,
    "product": {
        "productId": number,
        "seller": {
            "userId": number,
            "username": string,
            "email": string,
            "phone": string,
            "avatarUrl": string,
            "role": string
        },
        "category": {
            "categoryId": number,
            "name": string,
            "description": string,
            "parentId": number
        },
        "title": string,
        "description": string,
        "price": number,
        "status": string
    },
    "buyer": {
        "userId": number,
        "username": string,
        "email": string,
        "phone": string,
        "avatarUrl": string,
        "role": string
    },
    "seller": {
        "userId": number,
        "username": string,
        "email": string,
        "phone": string,
        "avatarUrl": string,
        "role": string,
    },
    "status": string,
    "address": string,
    "note": string,
    "createdAt": string,
    "updatedAt": string
}

const TransactionManager = () => {
    const [transactions, setTransactions] = useState<TransactionType[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [currentTransaction, setCurrentTransaction] = useState({
        transactionId: -1,
        status: '',
        address: '',
        note: '',
        createAt: ''
    });
    const [isAdmin, setIsAdmin] = useState(false); // 是否是管理员
    const [userId, setUserId] = useState(""); // 当前用户ID
    const [searchProductId, setSearchProductId] = useState(""); // 新增：商品号查询

    useEffect(() => {
        const token = Cookies.get('token');
        setIsAdmin(token === '0'); // 判断是否是管理员
        if (token) setUserId(token); // 设置当前用户ID
    }, []);

    useEffect(() => {
        fetchTransactions().then();
    }, [isAdmin]);

    // 获取所有订单（管理员）或当前用户的订单（普通用户）
    const fetchTransactions = async () => {
        let url = apiUrl + '/api/transactions';
        if (!isAdmin) {
            url = apiUrl + `/api/transactions/buyer/${userId}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        setTransactions(data);
    };

    // 根据商品号查询订单（仅管理员）
    const handleSearchByProductId = async () => {
        if (!searchProductId) return;
        const response = await fetch(apiUrl + `/api/transactions/byProduct/${searchProductId}`);
        const data = await response.json();
        setTransactions(data);
    };

    // 编辑订单
    const handleEditTransaction = (transaction:TransactionType) => {
        setCurrentTransaction({
            transactionId: transaction.transactionId,
            status: transaction.status,
            address: transaction.address,
            note: transaction.note,
            createAt: transaction.createdAt
        });
        setShowModal(true);
    };

    // 保存编辑
    const handleSaveTransaction = async () => {
        const response = await fetch(apiUrl + `/api/transactions/${currentTransaction.transactionId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: currentTransaction.status,
                address: currentTransaction.address,
                note: currentTransaction.note
            }),
        });

        if (response.ok) {
            setShowModal(false);
            fetchTransactions().then();
        }
    };

    // 删除订单
    const handleDeleteTransaction = async (transactionId:number) => {
        const response = await fetch(apiUrl + `/api/transactions/${transactionId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            fetchTransactions().then();
        }
    };

    return (
        <div className="container mt-5">
            <TopBar text={"订单详情"} />
            <h1>订单管理</h1>

            {/* 新增：根据商品号查询（仅管理员） */}
            {isAdmin && (
                <div className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="输入商品号查询订单"
                        value={searchProductId}
                        onChange={(e) => setSearchProductId(e.target.value)}
                    />
                    <Button variant="primary" onClick={handleSearchByProductId} className="mt-2">
                        查询
                    </Button>
                </div>
            )}

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>订单ID</th>
                    <th>商品编号</th>
                    <th>商品名称</th>
                    <th>买家</th>
                    <th>卖家</th>
                    <th>状态</th>
                    <th>地址</th>
                    <th>备注</th>
                    <th>创建时间</th>
                    <th>更新时间</th>
                    {isAdmin && <th>操作</th>}
                </tr>
                </thead>
                <tbody>
                {transactions.map((transaction) => (
                    <tr key={transaction.transactionId}>
                        <td>{transaction.transactionId}</td>
                        <td>{transaction.product.productId}</td>
                        <td>{transaction.product.title}</td>
                        <td>{transaction.buyer.username}</td>
                        <td>{transaction.seller.username}</td>
                        <td>{transaction.status}</td>
                        <td>{transaction.address}</td>
                        <td>{transaction.note}</td>
                        <td>{transaction.createdAt}</td>
                        <td>{transaction.updatedAt}</td>
                        {isAdmin && (
                            <td>
                                <Button variant="warning" onClick={() => handleEditTransaction(transaction)}>
                                    编辑
                                </Button>{' '}
                                <Button variant="danger" onClick={() => handleDeleteTransaction(transaction.transactionId)}>
                                    删除
                                </Button>
                            </td>
                        )}
                    </tr>
                ))}
                </tbody>
            </Table>

            {/* 编辑订单的模态框 */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>编辑订单</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>状态</Form.Label>
                            <Form.Control
                                as="select"
                                value={currentTransaction.status}
                                onChange={(e) => setCurrentTransaction({ ...currentTransaction, status: e.target.value })}
                            >
                                <option value="已售">已售</option>
                                <option value="待发货">待发货</option>
                                <option value="已发货">已发货</option>
                                <option value="已完成">已完成</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>地址</Form.Label>
                            <Form.Control
                                type="text"
                                value={currentTransaction.address}
                                onChange={(e) => setCurrentTransaction({ ...currentTransaction, address: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>备注</Form.Label>
                            <Form.Control
                                type="text"
                                value={currentTransaction.note}
                                onChange={(e) => setCurrentTransaction({ ...currentTransaction, note: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        关闭
                    </Button>
                    <Button variant="primary" onClick={handleSaveTransaction}>
                        保存
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default TransactionManager;
