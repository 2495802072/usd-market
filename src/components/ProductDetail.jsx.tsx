import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { Container, Row, Col, Card, Badge, ListGroup, Spinner, Alert, Image, Button } from 'react-bootstrap';
import TopBar from "./TopBar.tsx";
import {useError} from "./ErrorContext.tsx";
import Cookies from "js-cookie";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>(null);
    const { showError } = useError();
    const navigate = useNavigate();

    const toUserDetail = () =>{
        navigate(`/users/${product.seller.userId}`);
    }

    const addContacts = async () =>{
        try {
            const response = await fetch(apiUrl+'/api/contact',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    user: {userId: Cookies.get('token')},
                    recipient: {userId: product.seller.userId}
                })
            })
            //出错显示错误信息
            if(!response.ok){
                showError(await response.text());
            }
            navigate('/message');

        } catch (error) {
            showError('（开发） fetch 后端数据出错')
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 获取商品信息
                const productResponse = await fetch(apiUrl + `/api/products/${productId}`);
                if (!productResponse.ok) {
                    showError('商品信息获取失败');
                }
                const productData = await productResponse.json();

                // 获取评论信息
                const reviewsResponse = await fetch(apiUrl + `/api/review/product/${productId}`);
                if (!reviewsResponse.ok) {
                    showError('评论信息获取失败');
                }
                const reviewsData = await reviewsResponse.json();

                setProduct(productData);
                setReviews(reviewsData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData().then();
    }, [productId]);

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

    if (!product) {
        return (
            <Container className="mt-5">
                <Alert variant="warning">
                    未找到该商品
                </Alert>
            </Container>
        );
    }

    // 渲染评分星星
    const renderRatingStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <i
                    key={i}
                    className={`bi ${i <= rating ? 'bi-star-fill text-warning' : 'bi-star'}`}
                ></i>
            );
        }
        return stars;
    };

    return (

        <Container className="my-5">
            <TopBar text={"商品详情"}/>
            <Row>
                {/* 商品图片区域 */}
                <Col md={6}>
                    <Card className="mb-4">
                        <Card.Body className="text-center">
                            <Image
                                src="https://via.placeholder.com/400x400"
                                alt={product.title}
                                fluid
                                className="rounded"
                            />
                        </Card.Body>
                    </Card>
                </Col>

                {/* 商品信息区域 */}
                <Col md={6}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Badge bg="info" className="mb-2">
                                {product.category.name}
                            </Badge>
                            <h2>{product.title}</h2>

                            <div className="d-flex align-items-center mb-3">
                                <span className="fs-3 fw-bold text-danger">¥{product.price.toFixed(2)}</span>
                            </div>

                            <div className="mb-4">
                                <h5>商品描述</h5>
                                <p className="text-muted">{product.description}</p>
                            </div>

                            <div className="mb-4" onClick={toUserDetail}>
                                <h5>卖家信息</h5>
                                <div className="d-flex align-items-center">
                                    <Image
                                        src={product.seller.avatarUrl || "https://via.placeholder.com/50"}
                                        roundedCircle
                                        width={50}
                                        height={50}
                                        className="me-3"
                                    />
                                    <div>
                                        <p className="mb-0 fw-bold">{product.seller.username}</p>
                                        <p className="mb-0 text-muted small">{product.seller.university || '未知学校'}</p>
                                    </div>
                                </div>
                            </div>

                            <Button variant="primary" size="lg" className="w-100" onClick={addContacts}>
                                联系卖家
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* 商品评论区域 */}
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title className="mb-4">
                                <h4>商品评价 ({reviews.length})</h4>
                            </Card.Title>

                            {reviews.length === 0 ? (
                                <Alert variant="info">
                                    该商品暂无评价
                                </Alert>
                            ) : (
                                <ListGroup variant="flush">
                                    {reviews.map((review) => (
                                        <ListGroup.Item key={review.reviewId} className="py-3">
                                            <div className="d-flex justify-content-between mb-2">
                                                <div>
                                                    <span className="fw-bold me-2">{review.user.username}</span>
                                                    <span className="text-warning">
                            {renderRatingStars(review.rating)}
                          </span>
                                                </div>
                                                <small className="text-muted">
                                                    {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : '未知时间'}
                                                </small>
                                            </div>
                                            <p className="mb-0">{review.comment}</p>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetail;
