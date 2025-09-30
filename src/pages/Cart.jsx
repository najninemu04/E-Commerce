import React, { useState } from 'react';
import Container from '../components/Container';
import { useSelector, useDispatch } from 'react-redux';
import { cartQuantity, removeItem } from '../slice/CartSlice';
import { Link } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.cartDetails.cartItems);
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);

  const handleIncrement = (item) => {
    dispatch(cartQuantity({ id: item.id, type: "increment" }));
  };

  const handleDecrement = (item) => {
    dispatch(cartQuantity({ id: item.id, type: "decrement" }));
  };

  const handleRemoveItem = (id) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      dispatch(removeItem(id));
    }
  };

  const handleApplyCoupon = () => {
    if (couponCode === "DISCOUNT10") {
      setCouponDiscount(10); // ১০% ডিসকাউন্ট
      alert("Coupon Applied: 10% off");
    } else {
      setCouponDiscount(0);
      alert("Invalid Coupon");
    }
  };

  const subtotal = data.reduce((sum, item) => sum + item.price * item.cartQun, 0);
  const total = subtotal - (subtotal * (couponDiscount / 100));

  return (
    <div>
      <Container>
        <div className='mt-[124px] mb-[163px] font-dm'>
          <h3 className='text-primary text-[50px] font-bold'>Cart</h3>
        </div>

        <div className='pb-[140px]'>
          <div className='flex justify-between bg-[#F5F5F3] font-dm py-[34px] px-[20px]'>
            <div className='w-[25%]'><p className='font-bold text-primary'>Product</p></div>
            <div className='w-[25%]'><p className='font-bold text-primary'>Price</p></div>
            <div className='w-[25%]'><p className='font-bold text-primary'>Quantity</p></div>
            <div className='w-[25%]'><p>Total</p></div>
          </div>     

          {data.length > 0 ? data.map((item, index) => (
            <div key={index} className='flex justify-between items-center font-dm py-[34px] px-[20px]'>
              <div className='w-[25%] flex items-center space-x-2'>
                <img className='w-[60px]' src={item.thumbnail} alt={item.title} />
                <p>{item.title}</p>
              </div>

              <div className='w-[25%]'>
                <p className='font-bold text-primary'>${item.price}</p>
              </div>

              <div className='w-[25%]'>
                <div className='flex items-center border-2 border-[#F0F0F0] px-[10px] py-1 space-x-[15px] text-secondary w-fit'>
                  <p className='cursor-pointer' onClick={() => handleDecrement(item)}>-</p>
                  <p>{item.cartQun}</p>
                  <p className='cursor-pointer' onClick={() => handleIncrement(item)}>+</p>
                </div>
              </div>

              <div className='w-[25%] flex items-center justify-between'>
                <p className='font-bold text-primary'>${(item.price * item.cartQun).toFixed(2)}</p>
                <button 
                  className="ml-4 text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          )) : <p className='text-center mt-10'>No items in cart</p>}

          {/* Coupon Section */}
          {data.length > 0 && (
            <>
              <div className="flex items-center mt-6 space-x-4">
                <input 
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="border px-3 py-2"
                />
                <button 
                  onClick={handleApplyCoupon}
                  className="bg-blue-500 text-white px-4 py-2"
                >
                  Apply Coupon
                </button>
              </div>

              {/* Subtotal & Total */}
              <div className="mt-6 space-y-2">
                <p className="text-lg">Subtotal: <span className="font-bold">${subtotal.toFixed(2)}</span></p>
                {couponDiscount > 0 && (
                  <p className="text-lg text-green-600">Coupon Discount: <span className="font-bold">{couponDiscount}%</span></p>
                )}
                <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
              </div>

              {/* Checkout Button */}
              <div className="mt-6">
                <Link 
                  to="/checkout" 
                  className="bg-primary text-white px-6 py-3 rounded hover:bg-[#262626] transition"
                >
                  Checkout
                </Link>
              </div>
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Cart;
