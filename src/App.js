import React, {useEffect} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import './App.css';
import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import Header from './components/header/header';
import SignPage from './pages/sign-page/sign-page';
import {checkUserSession} from './redux/user/user.action';
import CheckoutPage from './pages/checkout/checkout';

import {selectCurrentUser} from './redux/user/user.selectors';




const App = ({checkUserSession, currentUser}) => {

  useEffect(() => {
    checkUserSession()
  },[checkUserSession]);


    return (
      <div >
        <Header/>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/shop" component={ShopPage}/>
          <Route exact path="/checkout" component={CheckoutPage}/>
          <Route exactpath="/signin" render={()=> currentUser ? (
              <Redirect to='/'/>
              ) : (
              <SignPage/>
              )
            }
          />
        </Switch>
      </div>
    );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
