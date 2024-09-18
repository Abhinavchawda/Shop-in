import React from 'react'
import { useDispatch } from 'react-redux'
import { useForm, SubmitHandler } from "react-hook-form"
import { createBrandAsync, createCategoryAsync } from '../AdminSlice'
import { useNavigate } from 'react-router-dom'
import NavBar from '../../navbar/NavBar'
import { fetchBrandsAsync, fetchCategoriesAsync } from '../../ProductList/ProductSlice'

function AdminBrandsCategories() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { register, handleSubmit, setValue, reset } = useForm()

    return (
        <div className='mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8'>
            <NavBar></NavBar>
            <form noValidate onSubmit={handleSubmit((data) => {
                if (data && data.brand) {
                    const brand = {
                        "value": data.brand,
                        "label": data.brand
                    }
                    dispatch(createBrandAsync(brand))
                    dispatch(fetchBrandsAsync())
                }
                if (data && data.category) {
                    const category = {
                        "value": data.category,
                        "label": data.category
                    }
                    dispatch(createCategoryAsync(category))
                    dispatch(fetchCategoriesAsync())
                }
                reset()     //reset the form
                navigate('/admin')
            })}>

                <div className="space-y-12 bg-white p-5 md:p-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                            <div className="sm:col-span-2  sm:col-start-1">
                                <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                                    Category
                                </label>
                                <div className="mt-2">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                                        <input
                                            type="text"
                                            {...register('category')}
                                            // {...register('category', { required: ("Category is required") })}
                                            id="category"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                                    Brand
                                </label>
                                <div className="mt-2">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                                        <input
                                            type="text"
                                            {...register('brand')}
                                            id="brand"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        onClick={e => navigate('/admin')}
                        type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mx-2"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AdminBrandsCategories