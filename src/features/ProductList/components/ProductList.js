import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StarIcon } from '@heroicons/react/20/solid'

import { selectTotalItems, selectAllProducts, fetchProductsByFilterAsync, selectBrands, selectCategories, fetchBrandsAsync, fetchCategoriesAsync } from '../ProductSlice';

import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom';

import { ITEMS_PER_PAGE, discountedPrice } from '../../../app/constants';
import Pagination from '../../common/Pagination';
import { setSelection } from '@testing-library/user-event/dist/cjs/event/selection/setSelection.js';

const sortOptions = [
  { name: 'Best Rating', sort: 'rating', order: 'desc', current: false },
  // { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', sort: 'price', order: 'asc', current: false },
  { name: 'Price: High to Low', sort: 'price', order: 'desc', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductList() {
  const dispatch = useDispatch();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const products = useSelector(selectAllProducts);
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);

  const totalItems = useSelector(selectTotalItems);

  const filters = [
    {
      id: 'brand',
      name: 'Brand',
      options: brands,
    },
    {
      id: 'category',
      name: 'Category',
      options: categories,
    },
  ]

  const [filter, setFilter] = useState([]);
  const [sort, setSort] = useState([]);
  const [page, setPage] = useState(1);
  // const ITEMS_PER_PAGE = 10;

  const handleFilter = (e, section, option) => {
    //section is for knowing that what by which property we are filtering
    //option is for knowing that what is the option choose
    //eg. section - brand , option - apple

    // const newFilter = { ...filter }
    const newFilter = {}

    //to manage closing filter
    if (option === "close") {
      setFilter({})
      console.log("filter obj", {});
    }
    else {
      // if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value)
      }
      else {
        newFilter[section.id] = [option.value]
      }
      // }
      // else {
      //   const index = newFilter[section.id].findIndex(i => i === option.value)
      //   newFilter[section.id].splice(index, 1)
      // }
      setFilter(newFilter);
      // console.log("filter obj", { filter });
    }
  }

  const handleSort = (e, option) => {
    const newSort = { ...sort, _sort: option.sort, _order: option.order };
    setSort(newSort)
    console.log({ newSort })
  }

  const handlePage = (page) => {
    console.log({ page });
    setPage(page);
  }

  useEffect(() => {
    const pagination = { _page: page, _per_page: ITEMS_PER_PAGE };
    dispatch(fetchProductsByFilterAsync({ filter, sort, pagination, admin: true }));
  }, [dispatch, filter, sort, page])

  useEffect(() => {
    setPage(1)    //when we apply filter and let say we are on 8 page but there are so less items that it occupy only 2 pages.  
  }, [totalItems, sort])

  useEffect(() => {
    dispatch(fetchBrandsAsync())
    dispatch(fetchCategoriesAsync())
  }, [])

  const [selected, setSelected] = useState(null);

  return (
    <div className="bg-white rounded-xl shadow-xl">
      <div>
        {/* Mobile filter dialog */}
        <MobileFilter mobileFiltersOpen={mobileFiltersOpen} setMobileFiltersOpen={setMobileFiltersOpen} handleFilter={handleFilter} filters={filters} selected={selected} setSelected={setSelected}></MobileFilter>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">All Products</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </MenuButton>
                </div>

                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <MenuItem key={option.name}>
                          {({ focus }) => (
                            <p
                              onClick={e => handleSort(e, option)}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                focus ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </p>
                          )}
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Transition>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <DesktopFilter handleFilter={handleFilter} filters={filters} selected={selected} setSelected={setSelected}></DesktopFilter>

              {/* Product grid */}
              <div className="lg:col-span-3">

                <div className='flex flex-wrap'>

                  <div className='flex flex-wrap items-center'>
                    {filter?.brand?.length > 0 &&
                      <div className='text-blue-600 m-2'>Filter by Brand : </div>
                    }

                    <div className='flex items-center flex-wrap gap-2 m-2'>
                      {filter?.brand?.length > 0 &&
                        <div className='flex items-center justify-center gap-2 bg-blue-200 text-blue-600 rounded-lg py-1 px-2'>
                          {filter.brand[0]} {<XMarkIcon
                            onClick={e => { setFilter({}); setSelected(null) }}
                            className='h-5 w-5 hover:scale-125'></XMarkIcon>}
                        </div>
                      }
                    </div>
                  </div>

                  <div className='flex flex-wrap items-center'>

                    {filter?.category?.length > 0 &&
                      <div className='text-blue-600 m-2'>Filter by Category : </div>
                    }

                    <div className='flex items-center flex-wrap gap-2 m-2'>
                      {filter?.category?.length > 0 &&
                        <div className='flex items-center justify-center gap-2 bg-blue-200 text-blue-600 rounded-lg py-1 px-2'>
                          {filter.category} {<XMarkIcon
                            onClick={e => { setFilter({}); setSelected(null) }}
                            className='h-5 w-5 hover:scale-125'></XMarkIcon>}
                        </div>
                      }
                    </div>
                  </div>

                </div>

                <ProductsGrid products={products}></ProductsGrid>
              </div>
            </div>
          </section>
        </main>

        {/* product list section ends */}

        <Pagination page={page} setPage={setPage} handlePage={handlePage} totalItems={totalItems}></Pagination>
      </div>
    </div>
  );
}


function MobileFilter({ mobileFiltersOpen, setMobileFiltersOpen, handleFilter, filters, selected, setSelected }) {
  return (
    <Transition show={mobileFiltersOpen}>
      <Dialog className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
        <TransitionChild
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 z-40 flex">
          <TransitionChild
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Categories</h3>

                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <DisclosureButton className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  onClick={e => { setSelected(null); handleFilter(e, section, "close") }} className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </DisclosureButton>
                        </h3>
                        <DisclosurePanel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  checked={option.value === selected}
                                  onChange={(e) => { setSelected(option.value); handleFilter(e, section, option) }}
                                  defaultChecked={option.checked}
                                  // onChange={e => handleFilter(e, section, option)}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}

function DesktopFilter({ handleFilter, filters, selected, setSelected }) {
  return (
    <form className="hidden lg:block">
      <h3 className="sr-only">Categories</h3>

      {filters.map((section) => (
        <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">{section.name}</span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon
                        onClick={e => { setSelected(null); handleFilter(e, section, "close") }} className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </DisclosureButton>
              </h3>
              <DisclosurePanel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        checked={option.value === selected}
                        onChange={(e) => { setSelected(option.value); handleFilter(e, section, option) }}
                        defaultChecked={option.checked}
                        // onChange={e => handleFilter(e, section, option)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  );
}


function ProductsGrid({ products }) {
  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {Array.isArray(products) && products.map((product) => (
            <Link
              key={product.id}
              to={`/product-detail/${product.id}`}
              className="group shadow-lg bg-white rounded-lg relative overflow-hidden hover:scale-105 transition duration-300 ease-in-out"
            >
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg">
                <img
                  className="w-full h-full object-cover object-center"
                  src={product.thumbnail}
                  alt={product.title}
                />
              </div>
              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{product.title}</h3>
                <div className="flex justify-between items-center gap-1 text-blue-950">
                  <div className='flex justify-center items-center gap-2'>
                  <StarIcon className="h-5 w-5" />
                  <span className="text-xs">{product.rating}</span>
                  </div>
                  
                  <div className="flex flex-col items-center text-sm font-medium text-gray-900">
                    <p>${Math.round(discountedPrice(product) * (1 - product.discountPercentage / 100))}</p>
                    <p className="line-through text-gray-400">${discountedPrice(product)}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}