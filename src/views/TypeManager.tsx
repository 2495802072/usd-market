import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';

const CategoryManager = () => {
    const [categories, setCategories] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [searchDescription, setSearchDescription] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentCategory, setCurrentCategory] = useState({ categoryId: null, name: '', description: '' });

    useEffect(() => {
        fetchCategories().then();
    }, []);

    const fetchCategories = async () => {
        const response = await fetch('http://localhost:8280/api/categories');
        const data = await response.json();
        setCategories(data);
    };

    const handleSearchByName = async () => {
        const response = await fetch(`http://localhost:8280/api/categories/search/name?name=${searchName}`);
        const data = await response.json();
        setCategories(data);
    };

    const handleSearchByDescription = async () => {
        const response = await fetch(`http://localhost:8280/api/categories/search/description?description=${searchDescription}`);
        const data = await response.json();
        setCategories(data);
    };

    const handleAddOrUpdateCategory = async () => {
        const method = currentCategory.categoryId ? 'PUT' : 'POST';
        const url = currentCategory.categoryId
            ? `http://localhost:8280/api/categories/${currentCategory.categoryId}`
            : 'http://localhost:8280/api/categories';

        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: currentCategory.name,
                description: currentCategory.description,
            }),
        });

        if (response.ok) {
            setShowModal(false);
            fetchCategories().then();
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        const response = await fetch(`http://localhost:8280/api/categories/${categoryId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            fetchCategories().then();
        }
    };

    const handleEditCategory = (category) => {
        setCurrentCategory(category);
        setShowModal(true);
    };

    const handleAddCategory = () => {
        setCurrentCategory({ categoryId: null, name: '', description: '' });
        setShowModal(true);
    };

    return (
        <div className="userRoot">
        <div className="container mt-5">
            <h1>商品类型管理</h1>

            <div className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="按名称查询"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                />
                <Button variant="primary" onClick={handleSearchByName} className="mt-2">
                    查询
                </Button>
            </div>

            <div className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="按描述查询"
                    value={searchDescription}
                    onChange={(e) => setSearchDescription(e.target.value)}
                />
                <Button variant="primary" onClick={handleSearchByDescription} className="mt-2">
                    查询
                </Button>
            </div>

            <Button variant="success" onClick={handleAddCategory} className="mb-3">
                新增类型
            </Button>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>名称</th>
                    <th>描述</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                {categories.map((category) => (
                    <tr key={category.categoryId}>
                        <td>{category.categoryId}</td>
                        <td>{category.name}</td>
                        <td>{category.description}</td>
                        <td>
                            <Button variant="warning" onClick={() => handleEditCategory(category)}>
                                编辑
                            </Button>{' '}
                            <Button variant="danger" onClick={() => handleDeleteCategory(category.categoryId)}>
                                删除
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentCategory.categoryId ? '编辑类型' : '新增类型'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>名称</Form.Label>
                            <Form.Control
                                type="text"
                                value={currentCategory.name}
                                onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>描述</Form.Label>
                            <Form.Control
                                type="text"
                                value={currentCategory.description}
                                onChange={(e) => setCurrentCategory({ ...currentCategory, description: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        关闭
                    </Button>
                    <Button variant="primary" onClick={handleAddOrUpdateCategory}>
                        保存
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
        </div>
    );
};

export default CategoryManager;
