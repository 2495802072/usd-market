import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
const apiUrl = import.meta.env.VITE_API_BASE_URL;

const UserManager = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        userId: null,
        username: '',
        password: '',
        email: '',
        role: '',
    });
    const [searchUsername, setSearchUsername] = useState(''); // 新增：按用户名查询的状态

    useEffect(() => {
        fetchUsers().then();
    }, []);

    // 获取所有用户
    const fetchUsers = async () => {
        const response = await fetch(apiUrl + '/api/users');
        const data = await response.json();
        setUsers(data);
    };

    // 按用户名模糊查询
    const handleSearchByUsername = async () => {
        const response = await fetch(apiUrl + `/api/users/byName/${searchUsername}`);
        const data = await response.json();
        setUsers(data);
    };

    // 新增或更新用户
    const handleAddOrUpdateUser = async () => {
        const method = currentUser.userId ? 'PUT' : 'POST';
        const url = currentUser.userId
            ? apiUrl + `/api/users/${currentUser.userId}`
            : apiUrl + '/api/users';

        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: currentUser.username,
                password: currentUser.password,
                email: currentUser.email,
                role: currentUser.role,
            }),
        });

        if (response.ok) {
            setShowModal(false);
            fetchUsers();
        }
    };

    // 删除用户
    const handleDeleteUser = async (userId) => {
        const response = await fetch(apiUrl + `/api/users/${userId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            fetchUsers();
        }
    };

    // 编辑用户
    const handleEditUser = (user) => {
        setCurrentUser(user);
        setShowModal(true);
    };

    // 新增用户
    const handleAddUser = () => {
        setCurrentUser({ userId: null, username: '', password: '', email: '', role: '' });
        setShowModal(true);
    };

    return (
        <div className="container mt-5">
            <h1>用户管理</h1>

            {/* 新增：按用户名查询 */}
            <div className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="按用户名查询"
                    value={searchUsername}
                    onChange={(e) => setSearchUsername(e.target.value)}
                />
                <Button variant="primary" onClick={handleSearchByUsername} className="mt-2">
                    查询
                </Button>
            </div>

            <Button variant="success" onClick={handleAddUser} className="mb-3">
                新增用户
            </Button>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>用户名</th>
                    <th>邮箱</th>
                    <th>角色</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.userId}>
                        <td>{user.userId}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                            <Button variant="warning" onClick={() => handleEditUser(user)}>
                                编辑
                            </Button>{' '}
                            <Button variant="danger" onClick={() => handleDeleteUser(user.userId)}>
                                删除
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {/* 新增/编辑用户的模态框 */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentUser.userId ? '编辑用户' : '新增用户'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>用户名</Form.Label>
                            <Form.Control
                                type="text"
                                value={currentUser.username}
                                onChange={(e) => setCurrentUser({ ...currentUser, username: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>密码</Form.Label>
                            <Form.Control
                                type="password"
                                value={currentUser.password}
                                onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>邮箱</Form.Label>
                            <Form.Control
                                type="email"
                                value={currentUser.email}
                                onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>角色</Form.Label>
                            <Form.Control
                                as="select"
                                value={currentUser.role}
                                onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
                            >
                                <option value="">选择角色</option>
                                <option value="seller">卖家</option>
                                <option value="buyer">买家</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        关闭
                    </Button>
                    <Button variant="primary" onClick={handleAddOrUpdateUser}>
                        保存
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UserManager;
