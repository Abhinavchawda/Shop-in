import { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { deleteItemFromCartAsync, updateCartAsync, fetchItemsByUserIdAsync } from './cartSlice';

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Link, Navigate } from 'react-router-dom';

import { selectItems } from './cartSlice';
import { discountedPrice } from '../../app/constants';
import { selectUserInfo } from '../user/userSlice';
import { TrashIcon } from '@heroicons/react/24/solid';

export default function Cart() {
  const dispatch = useDispatch()

  const [open, setOpen] = useState(true)

  const items = useSelector(selectItems) || [];
  const totalAmount = Array.isArray(items) ? (Math.round(items?.reduce((amount, item) => 
    discountedPrice(item?.product) * item?.quantity + amount, 0)
  )) : 0;
  const totalItems = Array.isArray(items) ? (items?.reduce((total, item) => item?.quantity + total, 0)) : 0;

  let user = useSelector(selectUserInfo)    //we use let, coz its value may change on reset card
  const handleQuantity = (e, item) => {
    // + to convert the string to int
    dispatch(updateCartAsync({ id: item?.id, quantity: +e.target.value }))
    dispatch(fetchItemsByUserIdAsync(user.id))  //to refresh
  }

  useEffect(() => {
    dispatch(fetchItemsByUserIdAsync(user.id))
  }, [dispatch]) //added dispatch

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id))
    dispatch(fetchItemsByUserIdAsync(user.id))
  }

  return (
    <div className="bg-white my-10 mx-auto max-w-5xl px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 pb-5 rounded-xl shadow-xl">

      {items?.length == 0 &&
        <div className='pt-10 flex items-center justify-center text-red-500 font-bold text-4xl'>
          Cart is Empty
        </div>
      }

      <h2 className="font-bold text-4xl my-4 py-4 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10">Cart</h2>
      <div className="border-t border-gray-200 py-6  px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10">
        <div className="flow-root">
          <ul className="-my-6 divide-y divide-gray-200">
            {Array.isArray(items) && items?.map((item) => (
              <li key={item?.id} className="flex py-5">
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={item?.product.thumbnail}
                    alt={item?.product.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href={item?.product.id}>{item?.product.title}</a>
                      </h3>
                      <p className="ml-4">${discountedPrice(item?.product)}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{item?.product.color}</p>
                  </div>
                  <div className="flex justify-between text-sm md:flex items-center gap-2">
                    <div className='text-gray-500 flex items-center justify-center gap-2 h-1 mt-2'>
                      Qty
                      <select onChange={(e) => handleQuantity(e, item)} value={item?.quantity} className='rounded-xl my-1 text-sm'>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>

                    <div className="flex">
                      <button
                        onClick={e => handleRemove(e, item?.id)}    //item?.product.id  is product id
                        type="button"
                        className="font-medium text-blue-600 hover:text-red-700 flex items-center gap-2"
                      >
                        {<TrashIcon className='h-6 w-6 hover:scale-125 transition-transform duration-300'></TrashIcon>}
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 py-4 px-2 sm:px-4 lg:px-8 xl:px-10">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>${totalAmount}</p>
        </div>
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Total items in the Cart</p>
          <p>{totalItems} items</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
        <div className="mt-6">
          <Link
            to="/checkout"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Checkout
          </Link>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or{' '}
            <Link to="/">
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={() => setOpen(false)}
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}