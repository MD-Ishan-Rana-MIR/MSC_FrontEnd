import React from 'react';
import ProductDetails from './ProductDetails';
import BestsellerProducts from './BestSellerSection';
import { ScrollRestoration, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '@/hooks/useAxiosPublic';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();

    const { data: productDetails, isLoading } = useQuery({
        queryKey: ['productDetails', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/single-product/${id}`);
            return res?.data?.data;
        }
    })

    console.log(productDetails);

    return (
        <div>
            <ScrollRestoration />
            <ProductDetails productDetails={productDetails} />
            <BestsellerProducts />
        </div>
    );
};

export default ProductDetailsPage;