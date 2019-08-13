import React, { useEffect, lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import Spinner from '../../components/spinner/spinner.component';

import { ShopPageContainer } from './shop.styles';

const CollectionsOverviewContainer = lazy(() =>
    import('../../components/collections-overview/collections-overview.container')
);

const CollectionPageContainer = lazy(() =>
    import('../collection/collection.container')
);
const CollectionItemContainer = lazy(() =>
    import('../collection/collection.item.container')
);

export const ShopPage = ({ fetchCollectionsStart, match }) =>
{
    useEffect(() =>
    {
        fetchCollectionsStart();
    }, [fetchCollectionsStart]);

    return (
        <ShopPageContainer>
            <Suspense fallback={<Spinner />}>
                <Route
                    exact
                    path={`${match.path}`}
                    component={CollectionsOverviewContainer}
                />
            </Suspense>

            <Route
                exact
                path={`${match.path}/:collectionId`}
                component={CollectionPageContainer}
            />

            <Route
                exact
                path={`${match.path}/:collectionId/:itemId`}
                component={CollectionItemContainer}
            />



        </ShopPageContainer>
    );
};

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(
    null,
    mapDispatchToProps
)(ShopPage);
