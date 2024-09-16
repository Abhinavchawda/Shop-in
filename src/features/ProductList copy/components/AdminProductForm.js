import { useDispatch, useSelector } from 'react-redux'
import { clearSelectedProduct, createProductAsync, deleteProductAsync, fetchProductByIdAsync, selectBrands, selectProductById, updateProductAsync } from '../../ProductList/ProductSlice'
import { useForm, SubmitHandler } from "react-hook-form"
import { useParams, Link, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'

import PopUp from '../../popUp/PopUp'

export default function AdminProductForm() {
    const dispatch = useDispatch()
    const params = useParams()

    const { register, handleSubmit, watch, setValue, reset, formState: { errors }, } = useForm()

    const brands = useSelector(selectBrands)
    const selectedProduct = useSelector(selectProductById)

    useEffect(() => {
        if (params.id) {
            dispatch(fetchProductByIdAsync(params.id))
        }
        else {
            dispatch(clearSelectedProduct())
        }
    }, [params.id, dispatch])

    useEffect(() => {
        //we use condition of params.id    ,coz we are using same form for add and edit a product
        if (selectedProduct && params.id) {
            setValue('title', selectedProduct.title)
            setValue('description', selectedProduct.description)
            setValue('rating', selectedProduct.rating)
            setValue('category', selectedProduct.category)
            setValue('brand', selectedProduct.brand)
            setValue('tags', selectedProduct.tags)
            setValue('price', selectedProduct.price)
            setValue('stock', selectedProduct.stock)
            setValue('discountPercentage', selectedProduct.discountPercentage)
            setValue('thumbnail', selectedProduct.thumbnail)
            setValue('image1', selectedProduct.images[0])
            if (selectedProduct.images.length > 2) {
                setValue('image2', selectedProduct.images[1])
                setValue('image3', selectedProduct.images[2])
            }
        }
    }, [selectedProduct, params.id && setValue])

    const handleDelete = () => {
        dispatch(deleteProductAsync(selectedProduct))
        alert('Product Deleted ! ')
        setMessage("Product Deleted ")
        setShow(1);
        func();
        { <Navigate to='/admin' replace={true}></Navigate> }
        reset()
    }

    const [show, setShow] = useState(0);
    const [message, setMessage] = useState("msg");
    const func = () => {
        setTimeout(() => {
            setShow(false)
        }, 2000)
    }


    return (
        <div>
            {show &&
                <PopUp title={message}></PopUp>
            }

            <form noValidate onSubmit={handleSubmit((data) => {
                const product = { ...data }
                product.images = [product.image1, product.image2, product.image3]
                delete product.image1
                delete product.image2
                delete product.image3
                // delete product.thumbnail

                //convert string into number
                product.price = +product.price
                product.discountPercentage = +product.discountPercentage
                product.stock = +product.stock

                product.rating = +product.rating

                if (params.id) {
                    product.id = params.id
                    product.rating = selectedProduct.rating
                    dispatch(updateProductAsync(product))
                    // alert('Product Updated ! ')
                    setMessage("Product Updated !")
                    setShow(true);

                    reset()
                    // setShow(0)
                }
                else {
                    dispatch(createProductAsync(product))
                    // alert('Product Added ! ')
                    setMessage("Product Added !")
                    setShow(1);
                    func();
                    reset();
                }
                reset()     //reset the form
                console.log(product);
            })}>

                <div className="space-y-12 bg-white p-5 md:p-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                            {selectedProduct ? "Edit Product" : "Add Product"}
                        </h2>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                            <div className="sm:col-span-4">
                                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                    Product Name
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                                        <input
                                            type="text"
                                            {...register('title', { required: ("name is required") })}
                                            id="title"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                    Description
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="description"
                                        {...register('description', { required: ("description is required") })}
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about the Product.</p>
                            </div>

                            <div className="sm:col-span-2  sm:col-start-1">
                                <label htmlFor="rating" className="block text-sm font-medium leading-6 text-gray-900">
                                    Rating
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                                        <input
                                            type='text'
                                            {...register('rating', { required: ("rating is required") })}
                                            id="rating"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                        {/* <select className='rounded-lg' id='rating'>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select> */}
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-2  sm:col-start-1">
                                <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                                    Category
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                                        <input
                                            type="text"
                                            {...register('category', { required: ("category is required") })}
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
                                    {/* <select className='rounded-md'>
                                        <option className='text-gray-400'>--Choose Brand--</option>
                                        {brands.map(brand=>
                                            <option value={brand.value} > {brand.label} </option>
                                        )}
                                        <option></option>
                                    </select> */}
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                                        <input
                                            type="text"
                                            {...register('brand', { required: ("brand is required") })}
                                            id="brand"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="tags" className="block text-sm font-medium leading-6 text-gray-900">
                                    Tags
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                                        <input
                                            type="text"
                                            {...register('tags', { required: ("tags is required") })}
                                            id="tags"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                    Price
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                                        <input
                                            type="number"
                                            {...register('price', { required: ("price is required"), min: 0 })}
                                            id="price"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Discount Percentage
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                                        <input
                                            type="number"
                                            {...register('discountPercentage', { required: ("Discount Percentage is required"), min: 0, max: 100 })}
                                            id="discountPercentage"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Stock
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                                        <input
                                            type="number"
                                            {...register('stock', { required: ("stock is required"), min: 0 })}
                                            id="stock"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='text-gray-500 text-xl sm:col-span-full'>Images of the Product</div>

                            <div className="sm:col-span-full">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Thumbnail Image
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                                        <input
                                            type="text"
                                            {...register('thumbnail')}
                                            id="thumbnail"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Image 1
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                                        <input
                                            type="text"
                                            {...register('image1')}
                                            id="image1"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Image 2
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                                        <input
                                            type="text"
                                            {...register('image2')}
                                            id="image2"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Image 3
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                                        <input
                                            type="text"
                                            {...register('image3')}
                                            id="image3"
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
                        onClick={e => (<Navigate to='/admin' replace={true}></Navigate>)}
                        type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    {selectedProduct && <button
                        onClick={handleDelete}
                        type="submit"
                        className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                        {<TrashIcon className='h-5 w-5 hover:scale-125  transition-transform duration-300'></TrashIcon>}
                    </button>}
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