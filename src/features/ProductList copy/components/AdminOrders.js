import { useEffect, useState } from 'react';
import { ITEMS_PER_PAGE, discountedPrice } from '../../../app/constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from '../../order/orderSlice';
import {
  PencilIcon,
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';
import Pagination from '../../common/Pagination';
import { MapPinIcon, PhoneIcon } from '@heroicons/react/20/solid';

function AdminOrders() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setSort] = useState({});

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };
  const handleShow = () => {
    console.log('handleShow');
  };


  const handleUpdate = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    console.log({ sort });
    setSort(sort);
  };

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

  useEffect(() => {
    const pagination = { _page: page, _per_page: 3 };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);

  return (
    <div className="overflow-x-hidden">

      {/* <div className="bg-gray-100 flex items-center rounded-xl justify-center font-sans overflow-hidden">
        <div className="w-full">
          <div className="bg-white shadow-md rounded-xl my-6"> */}

            {/* <table className="w-full table-auto rounded-xl">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th
                    className="py-3 px-0 text-center cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: 'id',
                        order: sort?._order === 'asc' ? 'desc' : 'asc',
                      })
                    }
                  >
                    #Order{' '}
                    {sort._sort === 'id' &&
                      (sort._order === 'asc' ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                  <th className="py-3 text-center">Items</th>
                  <th
                    className="py-3 px-3 text-wrap text-center cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: 'totalAmount',
                        order: sort?._order === 'asc' ? 'desc' : 'asc',
                      })
                    }
                  >
                    Total Amount{' '}
                    {sort._sort === 'totalAmount' &&
                      (sort._order === 'asc' ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>

                  <th className="py-3 px-0 text-center">Shipping Address</th>

                  <th className="py-3 px-0 text-center">Order Status</th>
                  <th className="py-3 px-0 text-center">Payment Method</th>
                  <th className="py-3 px-0 text-center">Payment Status</th>
                  <th
                    className="py-3 px-0 text-left cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: 'createdAt',
                        order: sort?._order === 'asc' ? 'desc' : 'asc',
                      })
                    }
                  >
                    Order Time{' '}
                    {sort._sort === 'createdAt' &&
                      (sort._order === 'asc' ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                  <th
                    className="py-3 px-0 text-left cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: 'updatedAt',
                        order: sort?._order === 'asc' ? 'desc' : 'asc',
                      })
                    }
                  >
                    Last Updated{' '}
                    {sort._sort === 'updatedAt' &&
                      (sort._order === 'asc' ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                  <th className="py-3 px-0 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {orders && orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-0 text-center text-wrap">
                      <span className="font-medium">{order.id[order.id.length - 1]}</span>
                    </td>
                    <td className="py-3 px-0 text-center">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center flex-col bg-slate-100">
                          <div className="">
                            <img
                              className="w-10 h-10 rounded-xl"
                              src={item.product.thumbnail}
                              alt={item.product.title}
                            />
                          </div>
                          <span>
                            {item.product.title} - #{item.quantity} - $
                            {item.product.price}
                          </span>
                        </div>
                      ))}
                      <div className=''>
                        Total Amount = ${order.totalAmount}
                      </div>
                    </td>
                    <td className="py-3 px-0 text-center">
                      <div className="flex items-center justify-center">
                      </div>
                    </td>
                    <td className="py-3 px-0 text-center">
                      <div className="">
                        <div>
                          <strong>{order.selectedAddress.name}</strong>,
                        </div>
                        <div>{order.selectedAddress.street},</div>
                        <div>{order.selectedAddress.city}, </div>
                        <div>{order.selectedAddress.state}, </div>
                        <div>{order.selectedAddress.pinCode}, </div>
                        <div>{order.selectedAddress.phone}, </div>
                      </div>
                    </td>
                    <td className="py-3 px-0 text-center">
                      {order.id === editableOrderId ? (
                        <select onChange={(e) => handleUpdate(e, order)}>
                          <option value="pending">Pending</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <span
                          className={`${chooseColor(
                            order.status
                          )} py-1 px-3 rounded-full text-xs`}
                        >
                          {order.status}
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-0 text-center">
                      <div className="flex items-center justify-center">
                        {order.paymentMethod}
                      </div>
                    </td>

                    <td className="py-3 px-0 text-center">
                      {order.id === editableOrderId ? (
                        <select onChange={(e) => handleUpdate(e, order)}>
                          <option value="pending">Pending</option>
                          <option value="received">Received</option>
                        </select>
                      ) : (
                        <span
                          className={`${chooseColor(
                            order.paymentStatus
                          )} py-1 px-3 rounded-full text-xs`}
                        >
                          {order.paymentStatus}
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-0 text-center">
                      <div className="flex items-center justify-center">
                        {order.createdAt ? new Date(order.createdAt).toLocaleString() : null}
                      </div>
                    </td>


                    <td className="py-3 px-0 text-center">
                      <div className="flex items-center justify-center">
                        {order.updatedAt ? new Date(order.updatedAt).toLocaleString() : null}
                      </div>
                    </td>

                    <td className="py-3 px-0 text-center">
                      <div className="flex item-center justify-center">
                        <div className="w-6 mr-4 transform hover:text-purple-500 hover:scale-120">
                          <EyeIcon
                            className="w-6 h-6"
                            onClick={(e) => handleShow(order)}
                          ></EyeIcon>
                        </div>
                        <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-120">
                          <PencilIcon
                            className="w-6 h-6"
                            onClick={(e) => handleEdit(order)}
                          ></PencilIcon>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */}

          {/* </div>
        </div>
      </div> */}


      {orders && orders.map((order, index) => (
        <div key={index} className='pb-10'>

          <div className="bg-white mt-10 mx-auto max-w-5xl px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 pb-5 rounded-xl shadow-xl">
            <h2 className="font-bold text-wrap text-2xl pt-4 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10">
              Order id : {order.id?.substr(order.id?.length - 5)}
            </h2>
            <h6 className="font-bold flex justify-start items-center text-blue-600 my-4 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10">
              <div className='flex flex-wrap items-center justify-around'>
                Order status : {'   '}

                {order.id === editableOrderId ? (
                  <select onChange={(e) => handleUpdate(e, order)}
                    className='rounded-xl mx-4 text-sm'>
                    <option value="pending">Pending</option>
                    <option value="dispatched">Dispatched</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                ) : (
                  <span
                    className={`${chooseColor(
                      order.status
                    )} py-1 px-3 rounded-xl text-sm mx-4`}
                  >
                    {order.status}
                  </span>
                )}
              </div>

              <div className="flex item-center justify-center">
                {/* <div className="w-6 mr-4 transform hover:text-purple-500 hover:scale-120">
                  <EyeIcon
                    className="w-6 h-6"
                    onClick={(e) => handleShow(order)}
                  ></EyeIcon>
                </div> */}
                <div className="w-6 mr-2 transform hover:text-blue-500 hover:scale-110">
                  <PencilIcon
                    className="h-5 w-5 hover:scale-125"
                    onClick={(e) => handleEdit(order)}
                  ></PencilIcon>
                </div>
              </div>
            </h6>

            <div className="border-t border-gray-200 py-4 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10">
              <div className="flow-root">
                <ul role="list" className="-my-4 divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex py-3">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
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
                        <div className="flex items-end justify-between text-sm">
                          <p className="text-gray-600 rounded-md bg-gray-100 px-2 py-1 flex items-center justify-center gap-5">
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

            <div className="border-t border-gray-200 py-4 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total Amount</p>
                <p>${order.totalAmount}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total items in the Order</p>
                <p>{order.totalItems} items</p>
              </div>
            </div>

            <p className="mb-2 font-semibold text-sm text-gray-500 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10">Shipping Address : </p>
            <div className="border rounded-md border-gray-900/10 bg-gray-50 mx-2 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10">
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

      <Pagination
        page={page}
        setPage={setPage}
        handlePage={handlePage}
        totalItems={totalOrders}
      ></Pagination>
    </div>
  );
}

export default AdminOrders;