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

  const chooseColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-purple-200 text-purple-600';
      case 'dispatched':
        return 'bg-yellow-200 text-yellow-600';
      case 'delivered':
        return 'bg-green-200 text-green-600';
      case 'received':
        return 'bg-green-200 text-green-600';
      case 'cancelled':
        return 'bg-red-200 text-red-600';
      default:
        return 'bg-purple-200 text-purple-600';
    }
  };

  return (
    <div className='min-h-screen overflow-hidden'>
      <div className='text-xl font-semibold p-4'>My Orders</div>

      {(!orders || orders?.length == 0) &&
        <div className='flex items-center justify-center text-xl font-semibold pt-8'>
          No Orders, Please Place an Order !
        </div>
      }

      {Array.isArray(orders) && orders.map((order, index) => (

        <div key={index} className='pb-5'>

          <div className="bg-white mt-5 mx-auto max-w-5xl px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 pb-5 rounded-xl shadow-xl">
            <div className='flex items-center justify-between'>
              <h2 className="font-bold text-wrap text-2xl pt-3 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10">
                Order id : {order.id?.substr(order.id?.length - 5)}
              </h2>
              <h2 className="font-semibold text-wrap pt-3 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10">
                Order Date : {order.date?.substr(0, 10)}
              </h2>
            </div>
            <h6 className="font-semibold flex justify-start items-center text-blue-600 my-2 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10">
              <div className='flex flex-wrap items-center justify-around'>
                Order status : {'   '}

                <span
                  className={`${chooseColor(
                    order.status
                  )} py-1 px-3 rounded-xl text-sm mx-4`}
                >
                  {order.status}
                </span>
              </div>
            </h6>
            <div className="border-t border-gray-200 py-4 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10">
              <div className="flow-root">
                <ul role="list" className="-my-4 divide-y divide-gray-200">
                  {Array.isArray(Array.isArray(order?.items)) && order.items?.map((item) => (
                    <li key={item.id} className="flex py-3">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 my-auto">
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col my-auto gap-1">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={item.product.id}>{item.product.title}</a>
                            </h3>
                            <p className="ml-4">${discountedPrice(item.product)}</p>
                          </div>
                          {/* <p className="mt-1 text-sm text-gray-500">{item.product.color}</p> */}
                        </div>
                        <div className="flex items-end justify-between text-sm">
                          <p className="text-gray-600 rounded-md bg-gray-100 px-2 py-1 md:flex items-center justify-center gap-5">
                            Qty : {item.quantity}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 py-4 px-2 sm:px-4 md:px-6 lg:px-8">
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
