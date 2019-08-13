import React from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { selectCollection, selectItem } from '../../redux/shop/shop.selectors';

import
{
    CollectionPageContainer,
    CollectionTitle,
    CollectionItemsContainer
} from './collection.styles';

export const CollectionSingleItem = ({ collection, item, match }) =>
{
    const { title, items } = collection;


    return (
        <CollectionPageContainer>
            <CollectionTitle>{title}</CollectionTitle>
            <CollectionItemsContainer>
                <CollectionItem key={item.id} item={item} />
            </CollectionItemsContainer>
        </CollectionPageContainer>
    );
};

const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state),
    item: selectItem(ownProps.match.params.itemId, ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionSingleItem);