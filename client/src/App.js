import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from './components/header/header.component';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

import { GlobalStyle } from './global.styles';

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

//import { addCollectionAndDocuments } from "./firebase/firebase.utils";






/********************************************************
 * 
 *  lazy load components as required using React api.
 * 
 *********************************************************/
const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const SignInAndSignUpPage = lazy(() =>
    import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component')
);
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));



/********************************************************
 * 
 *  Check if current user has a session and sign in or fail.
 *  Calls Redux / sagas middleware. Makes api request to 
 *  firebase to confirm current user snapshot exists.
 * 
 *********************************************************/
const App = ({ checkUserSession, currentUser, collectionsArray }) =>
{

    console.log(collectionsArray);
    useEffect(() =>
    {
        //addCollectionAndDocuments('collections', collectionsArray.map(({ title, items }) => ({ title, items })));
        checkUserSession();
    }, [checkUserSession]);

    return (
        <div>
            <GlobalStyle />
            <Header />
            <Switch>
                <ErrorBoundary>
                    <Suspense fallback={<Spinner />}>
                        <Route exact path='/' component={HomePage} />
                        <Route path='/shop' component={ShopPage} />
                        <Route exact path='/checkout' component={CheckoutPage} />
                        <Route
                            exact
                            path='/signin'
                            render={() =>
                                currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />
                            }
                        />
                    </Suspense>
                </ErrorBoundary>
            </Switch>
        </div>
    );
};


/********************************************************
 * 
 *  @returns currentUser
 * 
 *********************************************************/

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,

});


/********************************************************
 * 
 *  @calls dispatches action to redux actions / sagas. Makes api 
 *  request to firebase
 * 
 *********************************************************/

const mapDispatchToProps = dispatch => ({
    checkUserSession: () => dispatch(checkUserSession())
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
