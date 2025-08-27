import React from 'react';
import ProductDetails from './ProductDetails';
import BestsellerProducts from './BestSellerSection';
import { ScrollRestoration } from 'react-router-dom';

const ProductDetailsPage = () => {
    return (
        <div>
            <ScrollRestoration />
            <ProductDetails />
            <BestsellerProducts />
        </div>
    );
};

export default ProductDetailsPage;