import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import CollectionItem from '../../components/collection-item/collection-item.component';

import { selectCollection } from '../../redux/shop/shop.selectors';

import
{
    CollectionPageContainer,
    CollectionTitle,
    CollectionItemsContainer
} from './collection.styles';

export const CollectionPage = ({ collection, match }) =>
{
    const { title, items } = collection;

    return (
        <CollectionPageContainer>
            <CollectionTitle>{title}</CollectionTitle>
            <CollectionItemsContainer>
                {items.map(item => (
                    <Link to={`${match.params.collectionId}/${item.id}`} >
                        <CollectionItem key={item.id} item={item} />
                    </Link>


                ))}
            </CollectionItemsContainer>
        </CollectionPageContainer>
    );
};

const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);
