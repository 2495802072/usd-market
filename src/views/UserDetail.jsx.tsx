import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Container, Row, Col, Card, Spinner, Alert, Image, Tab, Tabs, Badge, ListGroup} from 'react-bootstrap';
import {useError} from "../components/ErrorContext.tsx";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

const UserDetail:React.FC = () => {
    const {userId} = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { showError } = useError();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 获取用户信息
                const userResponse = await fetch(apiUrl + `/api/users/${userId}`);
                if (!userResponse.ok) {
                    showError('用户信息获取失败');
                }
                const userData = await userResponse.json();

                // 获取用户商品
                const productsResponse = await fetch(apiUrl + '/api/products/bySeller', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId: parseInt(typeof userId === "string" ? userId : '0') })
                });

                if (!productsResponse.ok) {
                    showError('商品信息获取失败');
                }
                const productsData = await productsResponse.json();

                setUser(userData);
                setProducts(productsData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData().then();
    }, [userId]);

    // 按状态分类商品
    const productsByStatus = products.reduce((acc, product) => {
        if (!acc[product.status]) {
            acc[product.status] = [];
        }
        acc[product.status].push(product);
        return acc;
    }, {});

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">加载中...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">
                    {error}
                </Alert>
            </Container>
        );
    }

    if (!user) {
        return (
            <Container className="mt-5">
                <Alert variant="warning">
                    未找到该用户
                </Alert>
            </Container>
        );
    }

    const navigateToProduct = (productId) => {
        navigate(`/products/${productId}`);
    };

    return (
        <Container className="my-5">
            {/* 用户信息卡片 */}
            <Card className="mb-4 shadow-sm">
                <Card.Body>
                    <Row>
                        <Col md={3} className="text-center">
                            <Image
                                src={user.avatarUrl || "https://via.placeholder.com/150"}
                                roundedCircle
                                width={150}
                                height={150}
                                className="border border-3 border-primary mb-3"
                            />
                            <h4>{user.username}</h4>
                            <Badge bg={user.role === 'admin' ? 'danger' : 'primary'} className="mb-2">
                                {user.role === 'admin' ? '管理员' : '普通用户'}
                            </Badge>
                        </Col>

                        <Col md={9}>
                            <div className="mb-3">
                                <h5>基本信息</h5>
                                <Row className="mb-2">
                                    <Col sm={4} className="text-muted">邮箱</Col>
                                    <Col sm={8}>{user.email || '未设置'}</Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col sm={4} className="text-muted">电话</Col>
                                    <Col sm={8}>{user.phone || '未设置'}</Col>
                                </Row>
                            </div>

                            <div className="mb-3">
                                <h5>教育信息</h5>
                                {user.university ? (
                                    <>
                                        <Row className="mb-2">
                                            <Col sm={4} className="text-muted">学校</Col>
                                            <Col sm={8}>
                                                {user.university.universityName}
                                                <small className="text-muted d-block">{user.university.location}</small>
                                            </Col>
                                        </Row>
                                        {user.major && (
                                            <Row className="mb-2">
                                                <Col sm={4} className="text-muted">专业</Col>
                                                <Col sm={8}>
                                                    {user.major.majorName}
                                                    <small className="text-muted d-block">{user.major.department}</small>
                                                </Col>
                                            </Row>
                                        )}
                                    </>
                                ) : (
                                    <p className="text-muted">未设置教育信息</p>
                                )}
                            </div>

                            <div>
                                <small className="text-muted">
                                    注册时间: {new Date(user.createdAt).toLocaleDateString()}
                                </small>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {/* 用户商品列表 */}
            <Card className="shadow-sm">
                <Card.Body>
                    <Card.Title className="mb-4">
                        <h4>发布的商品</h4>
                    </Card.Title>

                    {products.length === 0 ? (
                        <Alert variant="info">
                            该用户尚未发布任何商品
                        </Alert>
                    ) : (
                        <Tabs defaultActiveKey="在售" id="product-tabs" className="mb-3">
                            {Object.entries(productsByStatus).map(([status, products]) => (
                                <Tab key={status} eventKey={status} title={
                                    <span>
                    {status} <Badge bg="secondary">{products.length}</Badge>
                  </span>
                                }>
                                    <ListGroup variant="flush">
                                        {products.map((product) => (
                                            <ListGroup.Item
                                                key={product.productId}
                                                action
                                                onClick={() => navigateToProduct(product.productId)}
                                                className="py-3"
                                            >
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <h5 className="mb-1">{product.title}</h5>
                                                        <small className="text-muted">
                                                            {product.category.name}
                                                        </small>
                                                    </div>
                                                    <Badge bg="danger" className="fs-5">
                                                        ¥{product.price.toFixed(2)}
                                                    </Badge>
                                                </div>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Tab>
                            ))}
                        </Tabs>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default UserDetail;
