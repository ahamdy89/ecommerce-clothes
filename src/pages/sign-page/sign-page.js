import React from 'react';

import './sign-page.scss';
import SignIN from '../../components/sign-in/sign-in';
import SignUp from '../../components/sign-up/sign-up';


const SignPage = () => (
    <div className="sign-in-and-sign-up">
        <SignIN/>
        <SignUp/>
    </div>
);

export default SignPage;