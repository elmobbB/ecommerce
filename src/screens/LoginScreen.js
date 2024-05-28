import React,{ useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form,Button,Row,Col } from 'react-bootstrap' // Import Button from 'react-bootstrap'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useDispatch,useSelector } from 'react-redux'
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';

function LoginScreen() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const submitHandler = () => { }
    return (
        <div>
            <FormContainer>
                <h1>Sign In</h1>
                <Form onSubmit={submitHandler} >
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        Sign In
                    </Button>
                </Form>
            </FormContainer>
        </div>
    )
}

export default LoginScreen