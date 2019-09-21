import React from 'react';
import {Switch, Route} from 'react-router-dom';

import './App.css';
import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import Header from './components/header/header';
import SignPage from './pages/sign-page/sign-page';
import { auth, createUserProfileDocument  } from './firebase/firebase.utils';



class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;
  
  componentDidMount() {
    // checking if the user is exist or not
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // check if the user is null or not
      if(userAuth) {
      const userRef = await createUserProfileDocument(userAuth);

      /* take a snapshot from the document properties which contain the user data that we need
      and then assign it to the current user state
      */
      userRef.onSnapshot(snapShot => {
        this.setState({
          currentUser : {
            id: snapShot.id,
            ...snapShot.data()
          }
        })
      })
      } else {
        this.setState({currentUser: userAuth});
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div >
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/shop" component={ShopPage}/>
          <Route path="/signin" component={SignPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
