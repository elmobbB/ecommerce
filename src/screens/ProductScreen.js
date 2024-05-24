import React,{ useEffect,useState } from 'react';
import { Link,useParams,useNavigate } from 'react-router-dom';
import { Row,Col,Image,ListGroup,Button,Card,Form,ListGroupItem } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useDispatch,useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions';
function ProductScreen() {
    const [qty,setQty] = useState(1)

    const { id } = useParams();//used in React Router v6
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { loading,error,product } = productDetails
    const navigate = useNavigate(); // Access the navigate function

    useEffect(() => {
        dispatch(listProductDetails(id))
    },[dispatch,id])


    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`); // Use navigate instead of history.push
    }

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : product ? ( // Check if product exists
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>

                    <Col md={3}>
                        {/* <Card> */}
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} color={`#f8e825`} />
                            </ListGroup.Item>

                            <ListGroup.Item>
                                Price: ${product.price}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                        {/* </Card> */}
                    </Col>

                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col><strong>${product.price}</strong></Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col>
                                    </Row>
                                </ListGroup.Item>

                                {product.countInStock > 0 &&
                                    (<ListGroupItem>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col xs='auto' className='my-1'>
                                                <Form.Control
                                                    as='select'
                                                    value={qty}
                                                    onChange={(e) => setQty(e.target.value)}>
                                                    {
                                                        [...Array(product.countInStock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))  //[0,1,2] is countintock is 3
                                                    }
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                    )}
                                <ListGroup.Item>
                                    <Button
                                        onClick={addToCartHandler}
                                        className='w-100'
                                        disabled={product.countInStock === 0}
                                        type='button'>
                                        ADD TO CART
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            ) : (
                <div>Product not found</div> // Render a message if product is undefined
            )}
        </div>
    );
}

export default ProductScreen;