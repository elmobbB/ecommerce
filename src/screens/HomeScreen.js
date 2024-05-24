import React,{ useState,useEffect } from 'react'
import { Row,Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch,useSelector } from 'react-redux'

//select certain part of state
import { listProducts } from '../actions/productActions'

function HomeScreen() {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { error,loading,products } = productList

    useEffect(() => {
        dispatch(listProducts())

    },[dispatch])


    return (
        <div>
            <h1>Lastest products</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : Array.isArray(products) ? ( // Check if products is an array
                <Row>
                    {products.map((product) => (
                        <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            ) : (
                <div>No products to display</div>
            )}
        </div>
    );
}

export default HomeScreen