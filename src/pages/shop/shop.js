import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCollectionFetching, selectIsCollectionsLoaded} from '../../redux/shop/shop.selectors';

import CollectionsOverview from '../../components/collections-overview/collections-overview';
import CollectionPage from '../collection/collection';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.action';
import Spinner from '../../components/spinner/spinner';


const CollectionsOverviewWithSpinner = Spinner(CollectionsOverview);
const CollectionsPageWithSpinner = Spinner(CollectionPage);

class ShopPage extends Component {

    componentDidMount() {
        const {fetchCollectionsStartAsync} = this.props;
        fetchCollectionsStartAsync();
    }

    render() {

        const {match, isFetching, isLoaded} = this.props;

        return (
        <div className="shop-page">
            <Route exact path= {`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={isFetching} {...props}/>}/>
            <Route exact path= {`${match.path}/:collectionId`} render={(props) => <CollectionsPageWithSpinner isLoading={!isLoaded} {...props}/>}/>
        </div>
        );
    }
}

const mapStateToProps = createStructuredSelector ({
    isFetching: selectCollectionFetching,
    isLoaded: selectIsCollectionsLoaded
})

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync : ()=> dispatch (fetchCollectionsStartAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
