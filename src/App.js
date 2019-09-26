import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import './App.css';
import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import Header from './components/header/header';
import SignPage from './pages/sign-page/sign-page';
import {setCurrentUser} from './redux/user/user.action';
import CheckoutPage from './pages/checkout/checkout';

import {selectCurrentUser} from './redux/user/user.selectors';




class App extends React.Component {

  unsubscribeFromAuth = null;
  
  componentDidMount() {


    // // checking if the user is exist or not
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   // check if the user is null or not
    //   if(userAuth) {
    //   const userRef = await createUserProfileDocument(userAuth);

    //   /* take a snapshot from the document properties which contain the user data that we need
    //   and then assign it to the current user state
    //   */
    //   userRef.onSnapshot(snapShot => {
    //     setCurrentUser({
    //         id: snapShot.id,
    //         ...snapShot.data()
    //       })
    //   })
    //   } 
    //     setCurrentUser(userAuth);
    // })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div >
        <Header/>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/shop" component={ShopPage}/>
          <Route exact path="/checkout" component={CheckoutPage}/>
          <Route exactpath="/signin" render={()=> this.props.currentUser ? (
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
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

// const mapDispatchToProps = dispatch => ({
//   setCurrentUser: user => dispatch(setCurrentUser(user))
// })

export default connect(mapStateToProps)(App);
