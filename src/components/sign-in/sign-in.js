import React, { useState } from 'react';
import FormInput from '../form-input/form-input';
import {connect} from 'react-redux';

import './sign-in.scss';
import CustomButton from '../custom-button/custom-button';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.action';

const SignIN = ({emailSignInStart, googleSignInStart}) => {
    const [userCredentials, setCredentials] = useState({email:'', password: ''})
    
    const {email, password} = userCredentials;


    const handleSubmit = async event => {
        event.preventDefault();

        emailSignInStart(email, password);
    }

    const handleChange = event => {
        const {value, name} = event.target;
        setCredentials({...userCredentials,[name]:value})
    }

        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={handleSubmit}>
                    <FormInput 
                    name="email" 
                    type="email" 
                    value={email}
                    handleChange={handleChange}
                    label="email"
                    required/>


                    <FormInput 
                    name="password" 
                    type="password" 
                    value={password} 
                    handleChange={handleChange}
                    label="password"
                    required/>

                    <div className="buttons">
                        <CustomButton type="submit">sign in</CustomButton>
                        <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>sign in with google</CustomButton>
                    </div>
                </form>
            </div>
        );
    }



const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})


export default connect(null, mapDispatchToProps)(SignIN);