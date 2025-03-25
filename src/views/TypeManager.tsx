import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Breadcrumb } from 'react-bootstrap';
import {useError} from "../components/ErrorContext.tsx";

interface categoriesType {
    categoryId: number;
    name: string;
    description: string;
    parentId: number | null;
    createdAt: string;
    updatedAt: string;
}

const CategoryManager = () => {
    const { showError } = useError();
    const [categories, setCategories] = useState<categoriesType[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [currentCategory, setCurrentCategory] = useState<categoriesType>({
        categoryId: 0,
        name: '',
        description: '',
        parentId: -1,
        createdAt: '',
        updatedAt: '',
    });
    const [currentParent, setCurrentParent] = useState<number>(-1);
    const [breadcrumb, setBreadcrumb] = useState<categoriesType[]>([]);

    useEffect(() => {
        fetchCategories().then();
    }, [currentParent]);

    const fetchCategories = async () => {
        const url = currentParent !== -1
            ? `http://localhost:8280/api/categories/parent/${currentParent}`
            : 'http://localhost:8280/api/categories/parent/-1';

        try {
            const response = await fetch(url);
            if (!response.ok) {
                showError(`请求失败: ${response.status} ${response.statusText}`);
            }
            const data: categoriesType[] = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('获取分类数据失败:', error);
        }
    };

    const handleAddOrEditCategory = (category: categoriesType = {
        categoryId: 0,
        name: '',
        description: '',
        parentId: currentParent,
        createdAt: '',
        updatedAt: '',
    }) => {
        setCurrentCategory(category);
        setShowModal(true);
    };

    const handleSaveCategory = async () => {
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
                parentId: currentCategory.parentId === -1 ? null : currentCategory.parentId,
            }),
        });

        if (response.ok) {
            setShowModal(false);
            fetchCategories().then();
        }
    };

    const handleDeleteCategory = async (categoryId: number) => {
        const response = await fetch(`http://localhost:8280/api/categories/${categoryId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            fetchCategories().then();
        }
    };

    const handleEnterSubCategory = (category: categoriesType) => {
        setCurrentParent(category.categoryId);
        setBreadcrumb([...breadcrumb, category]);
    };

    const handleGoBack = (index: number) => {
        const newBreadcrumb = breadcrumb.slice(0, index + 1);
        setBreadcrumb(newBreadcrumb);
        setCurrentParent(newBreadcrumb.length > 0 ? newBreadcrumb[newBreadcrumb.length - 1].categoryId : -1);
    };

    return (
        <div className="container mt-5">
            <h1>商品分类管理</h1>

            {/*面包屑导航*/}
            <Breadcrumb>
                <Breadcrumb.Item onClick={() => handleGoBack(-1)}>根分类</Breadcrumb.Item>
                {breadcrumb.map((item, index) => (
                    <Breadcrumb.Item key={index} onClick={() => handleGoBack(index)}>
                        {item.name}
                    </Breadcrumb.Item>
                ))}
            </Breadcrumb>

            <Button variant="success" onClick={() => handleAddOrEditCategory()} className="mb-3">
                新增分类
            </Button>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>名称</th>
                    <th>描述</th>
                    <th>父类</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                {categories.map((category) => (
                    <tr key={category.categoryId}>
                        <td>{category.categoryId}</td>
                        <td>{category.name}</td>
                        <td>{category.description}</td>
                        <td>{category.parentId}</td>
                        <td>
                            <Button variant="warning" onClick={() => handleAddOrEditCategory(category)}>
                                编辑
                            </Button>{' '}
                            <Button variant="danger" onClick={() => handleDeleteCategory(category.categoryId)}>
                                删除
                            </Button>{' '}
                            <Button variant="info" onClick={() => handleEnterSubCategory(category)}>
                                查看子分类
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentCategory.categoryId ? '编辑分类' : '新增分类'}</Modal.Title>
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
                    <Button variant="primary" onClick={handleSaveCategory}>
                        保存
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CategoryManager;
