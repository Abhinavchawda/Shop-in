import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserInfo, updateUserAsync } from '../userSlice';
import { useForm, SubmitHandler } from "react-hook-form"
// import { selectLoggedInUser } from '../../auth/authSlice';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { MapPinIcon, PhoneIcon } from '@heroicons/react/20/solid';

export default function User() {

  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  // const user = useSelector(selectLoggedInUser);

  const [selectedEditIndex, setSelectedEditIndex] = useState(-1)
  const [addAddressForm, setAddAddressForm] = useState(false)
  const [showAddBtn, setShowAddBtn] = useState(true)

  const { register, handleSubmit, watch, setValue, reset, formState: { errors }, } = useForm()

  const handleRemove = (e, index) => {
    const newUser = { ...user, addresses: [...user.addresses] }
    newUser.addresses.splice(index, 1)
    dispatch(updateUserAsync(newUser))
  }

  const handleEdit = (data, index) => {
    const newUser = { ...user, addresses: [...user.addresses] }
    newUser.addresses.splice(index, 1, data)
    // console.log("new user is : ", newUser)
    dispatch(updateUserAsync(newUser))
    setSelectedEditIndex(-1)
  }

  const handleEditForm = (index) => {
    setSelectedEditIndex(index)
    const address = user.addresses[index]
    setValue('name', address.name)
    setValue('email', address.email)
    setValue('phone', address.phone)
    setValue('street', address.street)
    setValue('state', address.state)
    setValue('city', address.city)
    setValue('pinCode', address.pinCode)
  }

  const handleAdd = (data) => {
    setShowAddBtn(false)
    setAddAddressForm(true)
    const newUser = { ...user, addresses: [...user.addresses, data] }
    dispatch(updateUserAsync(newUser))
    setAddAddressForm(false)
    setShowAddBtn(true)
  }

  return (
    <div className='min-h-screen'>
      <div className='md:p-5'>
        <div className='text-xl font-semibold px-5'>My Profile</div>
        <div className='pb-10'>

          <div className="bg-white mt-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-5 rounded-xl shadow-xl">
            <div className="border-t border-gray-200">
              <h2 className="font-bold text-2xl mt-4 py-4 px-2 sm:px-4 lg:px-8">
                Name : {user?.addresses.length > 0 && user.addresses[0]?.name}
              </h2>
              <h6 className="font-bold text-xl py-4 px-2 sm:px-4 lg:px-8">
                Email : {user?.email}
              </h6>

              {user.role === "admin" &&
                <h6 className="font-bold text-xl text-red-500 py-4 px-4 sm:px-6 lg:px-8">
                  Role : {user?.role}
                </h6>
              }
            </div>

            <p className="mb-2 text-sm text-gray-500 px-2 sm:px-4 lg:px-8">Your Addresses : </p>

            {user.addresses && user.addresses.map((address, index) =>
              <div key={index} className="border rounded-md border-gray-900/10 mx-1 md:mx-5 my-3">
                <ul role="list" className="divide-y divide-gray-100 px-2 sm:px-4 lg:px-8">
                  <li className="flex justify-between gap-x-6 py-3 overflow-hidden">
                    <div className="flex min-w-0 gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold mb-1 text-gray-900 flex items-center"><PhoneIcon className='h-4 w-4 rotate-12'></PhoneIcon> Contact Info</p>
                        <p className="text-sm font-semibold leading-6 text-gray-900">{address?.name}</p>
                        <p className="mt-1 text-sm leading-5 text-gray-500">Phone : {address?.phone}</p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col">
                      <p className="text-sm font-semibold mb-1 text-gray-900 flex items-center">
                        <MapPinIcon className='h-4 w-4'></MapPinIcon> Delivery Address</p>
                      <p className="text-sm leading-6 text-gray-500">{address?.street}</p>
                      <p className="text-sm leading-6 text-gray-500">{address?.city} - {address?.pinCode}</p>
                      <p className="text-sm leading-6 text-gray-500">{address?.state}</p>
                    </div>
                    <div className="flex flex-col gap-4 justify-center items-center">
                      {/* Edit  */}
                      <PencilIcon
                        className="h-5 w-5 hover:scale-125"
                        onClick={e => handleEditForm(index)}
                      ></PencilIcon>
                      {/* Remove */}
                      <TrashIcon
                        className="h-5 w-5 hover:scale-125"
                        onClick={e => handleRemove(e, index)}
                      ></TrashIcon>
                    </div>
                  </li>
                </ul>

                {selectedEditIndex === index &&
                  <form noValidate onSubmit={handleSubmit((data) => {
                    handleEdit(data, index)
                    reset()
                    console.log(data);
                  })}>

                    <div className="space-y-12 bg-white p-5 md:p-10">
                      <div className="pb-2">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div className="sm:col-span-4">
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                              Name
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register('name', { required: ("name is required") })}
                                id="name"
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                              Email address
                            </label>
                            <div className="mt-2">
                              <input
                                id="email"
                                {...register('email', { required: ("email is required") })}
                                type="email"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                              Phone
                            </label>
                            <div className="mt-2">
                              <input
                                id="phone"
                                {...register('phone', { required: ("phone is required") })}
                                type="tel"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="col-span-full">
                            <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                              Street address
                            </label>
                            <div className="mt-2">
                              <input
                                id="street"
                                {...register('street', { required: "street is required" })}
                                type="text"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2 sm:col-start-1">
                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                              City
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register('city', { required: ("city is required") })}
                                id="city"
                                autoComplete="address-level2"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                              State / Province
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register('state', { required: ("state is required") })}
                                id="state"
                                autoComplete="address-level1"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                              ZIP / Postal code
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register('pinCode', { required: ("pin code is required") })}
                                id="pinCode"
                                autoComplete="pinCode"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mt-8 flex items-center justify-center gap-x-6">
                          <button type="button" className="text-sm font-semibold leading-6 text-gray-900"
                            onClick={e => setSelectedEditIndex(-1)}>
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>}
              </div>
            )}

            {showAddBtn && <div className="mt-5 flex justify-center">
              <button
                onClick={e => (setAddAddressForm(true), setShowAddBtn(false))}
                type="button"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add New Address
              </button>
            </div>}

            {addAddressForm && <form noValidate onSubmit={handleSubmit((data) => {
              handleAdd(data)
              reset()
              // console.log(data);
            })}>

              <div className="space-y-12 bg-white p-5 md:p-10">
                <div className="pb-2">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                    <div className="sm:col-span-4">
                      <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                        Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('name', { required: ("name is required") })}
                          id="name"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register('email', { required: ("email is required") })}
                          type="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                        Phone
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          {...register('phone', { required: ("phone is required") })}
                          type="tel"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          id="street"
                          {...register('street', { required: "street is required" })}
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('city', { required: ("city is required") })}
                          id="city"
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('state', { required: ("state is required") })}
                          id="state"
                          autoComplete="address-level1"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('pinCode', { required: ("pin code is required") })}
                          id="pinCode"
                          autoComplete="pinCode"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-center gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900"
                      onClick={e => { setAddAddressForm(false); setShowAddBtn(true); setSelectedEditIndex(-1) }}>
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add Address
                    </button>
                  </div>
                </div>
              </div>
            </form>}
          </div>
        </div>


      </div>
    </div>
  );
}
