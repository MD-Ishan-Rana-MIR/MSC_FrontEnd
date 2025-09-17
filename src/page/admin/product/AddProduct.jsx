import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAddProductMutation } from '@/redux/admin/product/productApi';
import { uploadImg } from '@/img-upload/UploadImage';
import { updateAlert } from '@/helper/updateAlert';
import { useGetAllBrandQuery } from '@/redux/admin/brand/brandApi';

const AddProduct = () => {
    const [productImages, setProductImages] = useState({
        image1: null,
        image2: null,
        image3: null,
        image4: null,
    });
    const [productColors, setProductColors] = useState([]);
    const [isUploading, setIsUploading] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const [addProduct, { isLoading }] = useAddProductMutation();
    
    


  

    const { data: brands = [] } = useGetAllBrandQuery();

    const handleImageUpload = async (file, imageKey) => {
        if (!file) return;

        setIsUploading(true);
        try {
            const imageUrl = await uploadImg(file);
            if (imageUrl) {
                setProductImages(prev => ({
                    ...prev,
                    [imageKey]: imageUrl
                }));
                setValue(imageKey, imageUrl);
            }
        } catch (error) {
            console.error('Image upload failed:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const addColor = () => {
        setProductColors(prev => [...prev, { name: '', code: '' }]);
    };

    const removeColor = (index) => {
        setProductColors(prev => prev.filter((_, i) => i !== index));
    };

    const updateColor = (index, field, value) => {
        setProductColors(prev => prev.map((color, i) =>
            i === index ? { ...color, [field]: value } : color
        ));
    };

    const onSubmit = async (data) => {
        try {
            // Filter out empty colors
            const validColors = productColors.filter(color => color.name && color.code);

            const productData = {
                ...data,
                product_color: validColors,
                product_image_1: productImages.image1,
                product_image_2: productImages.image2,
                product_image_3: productImages.image3,
                product_image_4: productImages.image4,
                price: Number(data.price),
                discount_price: Number(data.discount_price),
                in_stock: data.in_stock === 'true'
            };

            await addProduct(productData).unwrap();
            updateAlert('success', 'Product added successfully!');
            reset();
            setProductImages({ image1: null, image2: null, image3: null, image4: null });
            setProductColors([]);
        } catch (error) {
            updateAlert('error', 'Failed to add product. Please try again.');
            console.error('Product upload failed:', error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Add New Product</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Basic Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Product Name *</label>
                                <Input
                                    {...register('product_name', { required: 'Product name is required' })}
                                    placeholder="Enter product name"
                                />
                                {errors.product_name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.product_name.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Product Type *</label>
                                <Input
                                    {...register('product_type', { required: 'Product type is required' })}
                                    placeholder="e.g., Headphone, Smartphone"
                                />
                                {errors.product_type && (
                                    <p className="text-red-500 text-sm mt-1">{errors.product_type.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Category *</label>
                                <select
                                    {...register('category_id', { required: 'Category is required' })}
                                    className="w-full h-9 px-3 py-1 border border-input rounded-md bg-transparent"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category._id} value={category._id}>
                                            {category.category_name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category_id && (
                                    <p className="text-red-500 text-sm mt-1">{errors.category_id.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Brand *</label>
                                <select
                                    {...register('brand_id', { required: 'Brand is required' })}
                                    className="w-full h-9 px-3 py-1 border border-input rounded-md bg-transparent"
                                >
                                    <option value="">Select Brand</option>
                                    {brands.map((brand) => (
                                        <option key={brand._id} value={brand._id}>
                                            {brand.brand_name}
                                        </option>
                                    ))}
                                </select>
                                {errors.brand_id && (
                                    <p className="text-red-500 text-sm mt-1">{errors.brand_id.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Pricing */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Price *</label>
                                <Input
                                    type="number"
                                    {...register('price', {
                                        required: 'Price is required',
                                        min: { value: 0, message: 'Price must be positive' }
                                    })}
                                    placeholder="Enter price"
                                />
                                {errors.price && (
                                    <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Discount Price</label>
                                <Input
                                    type="number"
                                    {...register('discount_price', {
                                        min: { value: 0, message: 'Discount price must be positive' }
                                    })}
                                    placeholder="Enter discount price"
                                />
                                {errors.discount_price && (
                                    <p className="text-red-500 text-sm mt-1">{errors.discount_price.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Product Colors */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <label className="block text-sm font-medium">Product Colors</label>
                                <Button type="button" onClick={addColor} variant="outline" size="sm">
                                    Add Color
                                </Button>
                            </div>
                            {productColors.map((color, index) => (
                                <div key={index} className="flex gap-4 mb-3">
                                    <Input
                                        placeholder="Color name"
                                        value={color.name}
                                        onChange={(e) => updateColor(index, 'name', e.target.value)}
                                        className="flex-1"
                                    />
                                    <Input
                                        type="color"
                                        value={color.code}
                                        onChange={(e) => updateColor(index, 'code', e.target.value)}
                                        className="w-20 h-9"
                                    />
                                    <Button
                                        type="button"
                                        onClick={() => removeColor(index)}
                                        variant="destructive"
                                        size="sm"
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                        </div>

                        {/* Product Images */}
                        <div>
                            <label className="block text-sm font-medium mb-4">Product Images *</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[1, 2, 3, 4].map((num) => (
                                    <div key={num} className="space-y-2">
                                        <label className="block text-sm text-gray-600">
                                            Image {num} {num === 1 && '*'}
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    handleImageUpload(file, `image${num}`);
                                                }
                                            }}
                                            className="w-full text-sm"
                                        />
                                        {productImages[`image${num}`] && (
                                            <div className="mt-2">
                                                <img
                                                    src={productImages[`image${num}`]}
                                                    alt={`Product ${num}`}
                                                    className="w-full h-24 object-cover rounded border"
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Warranty/Guarantee</label>
                                <Input
                                    {...register('grunte')}
                                    placeholder="e.g., 6 Months, 1 Year"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Size</label>
                                <Input
                                    {...register('size')}
                                    placeholder="e.g., Adjustable, Large, Medium"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Stock Status *</label>
                                <select
                                    {...register('in_stock', { required: 'Stock status is required' })}
                                    className="w-full h-9 px-3 py-1 border border-input rounded-md bg-transparent"
                                >
                                    <option value="">Select Status</option>
                                    <option value="true">In Stock</option>
                                    <option value="false">Out of Stock</option>
                                </select>
                                {errors.in_stock && (
                                    <p className="text-red-500 text-sm mt-1">{errors.in_stock.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Product Description */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Product Description *</label>
                            <textarea
                                {...register('product_description', { required: 'Product description is required' })}
                                rows={4}
                                className="w-full px-3 py-2 border border-input rounded-md bg-transparent resize-none"
                                placeholder="Enter detailed product description"
                            />
                            {errors.product_description && (
                                <p className="text-red-500 text-sm mt-1">{errors.product_description.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    reset();
                                    setProductImages({ image1: null, image2: null, image3: null, image4: null });
                                    setProductColors([]);
                                }}
                            >
                                Reset Form
                            </Button>
                            <Button
                                type="submit"
                                disabled={isLoading || isUploading}
                                className="min-w-32"
                            >
                                {isLoading ? 'Adding Product...' : isUploading ? 'Uploading Images...' : 'Add Product'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddProduct;