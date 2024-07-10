import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoggedInUserOrdersAsync, selectUserInfo, selectUserOrders } from '../userSlice';
import { Link } from 'react-router-dom';
import { discountedPrice } from '../../../app/constants';
import { MapPinIcon, PhoneIcon } from '@heroicons/react/20/solid';

export default function UserOrders() {
  const dispatch = useDispatch();

  const userInfo = useSelector(selectUserInfo)
  const orders = useSelector(selectUserOrders)

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(userInfo?.id))
  }, [dispatch])

  // }, [dispatch, userInfo])

  return (
    <div className='h-screen md:p-5'>
      <div className='text-xl font-semibold p-5'>My Orders</div>
      {orders && orders.map((order, index) => (

        <div key={index} className='pb-10'>

          <div className="bg-white mt-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-5 rounded-xl shadow-xl">
            <h2 className="font-bold text-3xl mt-4 pt-4 px-2 sm:px-4 md:px-6 lg:px-8">
              Order id : {order.id.substr(order.id.length - 5)}
            </h2>
            <h6 className="font-bold text-lg text-red-600 py-4 px-2 sm:px-4 md:px-6 lg:px-8">
              Order status : {order.status}
            </h6>
            <div className="border-t border-gray-200 py-6 px-2 sm:px-4 md:px-6 lg:px-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={item.product.id}>{item.product.title}</a>
                            </h3>
                            <p className="ml-4">${discountedPrice(item.product)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{item.product.color}</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-600 rounded-md bg-gray-100 px-2 py-1 md:flex items-center justify-center gap-5">
                            Qty :
                            <div>{item.quantity}</div>
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 py-6 px-2 sm:px-4 md:px-6 lg:px-8">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total Amount</p>
                <p>${order.totalAmount}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total items in the Order</p>
                <p>{order.totalItems} items</p>
              </div>
            </div>

            <p className="mb-2 px-2 sm:px-4 md:px-6 lg:px-8 font-semibold text-sm text-gray-500">Shipping Details : </p>
            <div className="border rounded-md border-gray-900/10 bg-gray-50 px-2 sm:px-4 md:px-6 lg:px-8">
              <ul role="list" className="divide-y divide-gray-100">
                <li className="flex justify-between gap-x-4 py-3 overflow-hidden">
                  <div className="shrink-0 flex flex-col max-w-32 sm:max-w-44">
                    <p className="text-sm font-semibold mb-1 text-gray-900 flex items-center">
                      <MapPinIcon className='h-4 w-4'></MapPinIcon> Delivery Address</p>
                    <p className="text-sm leading-6 text-gray-500">{order.selectedAddress.street}</p>
                    <p className="text-sm leading-6 text-gray-500">{order.selectedAddress.city} - {order.selectedAddress.pinCode}</p>
                    <p className="text-sm leading-6 text-gray-500">{order.selectedAddress.state}</p>
                  </div>
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold mb-1 text-gray-900 flex items-center"><PhoneIcon className='h-4 w-4 rotate-12'></PhoneIcon> Contact Info</p>
                      <p className="text-sm leading-5 text-gray-500">{order.selectedAddress.name}</p>
                      <p className="mt-1 text-sm leading-5 text-gray-500">Phone : {order.selectedAddress.phone}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}
