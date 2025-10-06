import React from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '@/hooks/useAxiosSecure'
import toast, { Toaster } from 'react-hot-toast';
import { FaCartArrowDown } from 'react-icons/fa6';
import { useCreateInvoiceMutation } from '@/redux/invoice/invoiceApi';

const CartPage = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['cart-list'],
    queryFn: async () => {
      const res = await axiosSecure.get('/cart-list');
      return res?.data?.data;
    }
  });

  console.log(data);


  const cartItems = Array.isArray(data) ? data : [];
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item?.product?.discount_price ?? item?.product?.price ?? 0;
    const qty = Number(item?.quentity) || 0;
    return sum + price * qty;
  }, 0);

  const handleDeleteItem = async (cartItemId) => {

    try {
      await axiosSecure.delete(`/cart-delete/${cartItemId}`);
      toast.success('Item removed from cart');
      await refetch();
    } catch (error) {
      console.error('Failed to delete cart item', error);
      alert(error?.response?.data?.message || 'Failed to delete item.');
    }
  };

  const [createInvoice,] = useCreateInvoiceMutation();

  const handleInvoice = async () => {
    try {
      const res = await createInvoice().unwrap();
      if (res) {
        window.location.href = res?.data?.GatewayPageUrl
      }
    } catch (error) {
      toast.error(error?.data?.msg || 'Something went wrong');
    }
  }

  if (isLoading) {
    return (
      <div className='max-w-6xl mx-auto p-8'>
        <p>Loading cart...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='max-w-6xl mx-auto p-8'>
        <p className='text-red-500 text-center text-3xl flex justify-center items-center'><FaCartArrowDown /> No items in cart.</p>
      </div>
    );
  }

  return (
    <div>
      <div className='max-w-6xl mx-auto p-6 md:p-8'>
        <h1 className='text-2xl font-semibold mb-6'>Cart</h1>

        {data.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='md:col-span-2 space-y-4'>
              {data?.map((item) => (
                <div key={item._id} className='flex gap-4 items-center p-4 border rounded-lg dark:border-slate-700'>
                  <img src={item?.product?.product_image_1} alt={item?.product?.product_name} className='w-20 h-20 object-cover rounded' />
                  <div className='flex-1'>
                    <p className='font-medium'>{item?.product?.product_name}</p>
                    <p className='text-sm text-gray-500 dark:text-slate-400'>Color: {item?.color} • Size: {item?.size}</p>
                    <p className='text-sm text-gray-500 dark:text-slate-400'>Qty: {item?.quentity}</p>
                  </div>
                  <div className='text-right'>
                    <p className='font-semibold'>${(item?.product?.discount_price ?? item?.product?.price ?? 0).toFixed(2)}</p>
                    <button onClick={() => handleDeleteItem(item?._id)} className='mt-2 text-red-600 hover:underline'>Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <div className='p-4 border rounded-lg h-fit dark:border-slate-700'>
              <h2 className='text-lg font-semibold mb-4'>Summary</h2>
              <div className='flex justify-between py-2'>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className='flex justify-between py-2'>
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
              <div className='flex justify-between py-2 border-t mt-2 pt-2 dark:border-slate-700'>
                <span className='font-semibold'>Total</span>
                <span className='font-semibold'>${subtotal.toFixed(2)}</span>
              </div>
              <button onClick={handleInvoice} className='w-full cursor-pointer mt-4 py-2 rounded bg-[#0FABCA] text-white hover:bg-[#0FABCA]/90'>Checkout</button>
            </div>
          </div>
        )}
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  )
}

export default CartPage