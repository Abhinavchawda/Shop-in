import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from '@headlessui/react'
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectItems } from '../cart/cartSlice'
import { selectUserInfo } from '../user/userSlice'

const navigation = [
    { name: 'Home', link: '/', user: true, admin: true },
    { name: 'About', link: '/about', user: true, admin: true },
    { name: 'Contact', link: '/contact', user: true, admin: true },

    { name: 'Admin', link: '/admin', admin: true },
    { name: 'Orders', link: '/admin/orders', admin: true },
]
const userNavigation = [
    { name: 'My Profile', link: '/profile' },
    { name: 'My Orders', link: '/orders' },
    { name: 'Sign Out', link: '/logout' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function NavBar({ children }) {
    const items = useSelector(selectItems)
    const user = useSelector(selectUserInfo)

    // const handleSearch = (e) => {
    //     console.log(e.target.value)
    // }
    return (
        <>
            {/*This example requires updating your template:
  
          <html class="h-full bg-gray-100">
          <body class="h-full">*/}
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-gray-900 backdrop-blur-lg md:w-[90%] mx-auto md:rounded-xl md:mt-5">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl px-2 md:px-4 lg:px-8">
                                <div className="flex h-16 items-center justify-between">
                                    <div className="flex items-center">
                                        <NavLink to="/">
                                            <div className='bg-white p-1 ml-0 rounded-xl hidden md:block'>
                                                <img
                                                    className="h-12 w-12"
                                                    src='/Shop-in-logo.png'
                                                    alt="Shop-in"
                                                />
                                            </div>
                                        </NavLink>
                                        <div className="hidden md:block">
                                            <div className="ml-4 flex items-baseline space-x-2">
                                                {navigation.map((item) =>
                                                (<Link
                                                    key={item.name}
                                                    to={item.link}
                                                    className={(item.name === "Admin" || item.name === "Orders") ? "text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg p-2 text-sm font-medium flex items-center" : classNames(
                                                        item.current
                                                            ? 'bg-gray-900 text-white'
                                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'rounded-lg p-2 text-sm font-medium flex items-center'
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {
                                                        ((item.name === "Admin" || item.name === "Orders") ? ((user && user.role === "admin") && item.name) :  item.name)
                                                    }
                                                </Link>
                                                )
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex items-center justify-center gap-5'>
                                        <input className='rounded-xl bg-gray-900 text-white border hover:border-white w-[55vw] md:w-[37vw]'
                                            placeholder='Search Products'>
                                            {/* onChange={e=>handleSearch(e)} */}
                                        </input>
                                    </div>

                                    <div className="hidden md:block">
                                        <div className="ml-4 flex items-center">
                                            <Link to='/cart'>
                                                <button
                                                    type="button"
                                                    className="relative rounded-full bg-gray-900 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                                >
                                                    <span className="absolute -inset-1.5" ></span>
                                                    <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </Link>
                                            {items?.length > 0 && <span className='inline-flex items-center rounded-lg bg-blue-200 text-blue-700 mb-7 -ml-3 px-2 py-1 text-xs z-50 font-bold'>
                                                {items?.length}
                                            </span>}

                                            {/* Profile dropdown */}
                                            <Menu as="div" className="relative ml-3 z-50">
                                                <div>
                                                    <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                        <span className="absolute -inset-1.5" />
                                                        <span className="sr-only">Open user menu</span>
                                                        <img className="h-8 w-8 rounded-full" src="/UserImageLogo.png" alt="" />
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
                                                    <MenuItems className="absolute right-0 z-50 mt-1 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        {userNavigation.map((item) => (
                                                            <MenuItem key={item.name}>
                                                                {({ focus }) => (
                                                                    <Link
                                                                        to={item.link}
                                                                        className={classNames(
                                                                            focus ? 'bg-gray-100' : '',
                                                                            'block px-2 py-1 text-sm text-gray-700'
                                                                        )}
                                                                    >
                                                                        {item.name}
                                                                    </Link>
                                                                )}
                                                            </MenuItem>
                                                        ))}
                                                    </MenuItems>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                        <DisclosureButton className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-0.5" />
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </DisclosureButton>
                                    </div>
                                </div>
                            </div>

                            <DisclosurePanel className="md:hidden">
                                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                    {navigation.map((item) =>
                                    (<Link key={item.name}
                                        to={item.link}
                                    >
                                        <DisclosureButton
                                            key={item.name}
                                            as="a"
                                            className={classNames(
                                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'block rounded-md px-3 py-2 text-base font-medium'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {
                                                ((item.name === "Admin" || item.name === "Orders") ? ((user && user.role === "admin") && item.name) : item.name)
                                            }
                                        </DisclosureButton>
                                    </Link>
                                    )
                                    )}
                                </div>
                                <div className="border-t border-gray-700 pb-3 pt-4">
                                    <div className="flex items-center px-5">
                                        <div className="flex-shrink-0">
                                            <img className="h-10 w-10 rounded-full" src="/UserImageLogo.png" alt="User" />
                                        </div>
                                        <div className="mx-3">
                                            <div className="text-base font-medium leading-none text-white mb-1">{user && user.name}</div>
                                            <div className="text-sm font-medium leading-none text-gray-400 mt-2">{user && user.email}</div>
                                        </div>
                                        <Link to='/cart'>
                                            <button
                                                type="button"
                                                className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                            >
                                                <span className="absolute -inset-1.5" />
                                                <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </Link>
                                        {items?.length > 0 && <span className='inline-flex items-center rounded-lg bg-blue-200 text-blue-700 mb-7 -ml-3 px-2 py-1 text-xs z-50 font-bold'>
                                            {items?.length}
                                        </span>}

                                    </div>
                                    <div className="mt-3 space-y-1 px-2">
                                        {userNavigation.map((item) => (
                                            <DisclosureButton
                                                key={item.name}
                                                as="a"
                                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                            >
                                                {({ focus }) => (
                                                    <Link
                                                        to={item.link}
                                                        className={classNames(
                                                            focus ? 'bg-gray-100' : '',
                                                            'block px-4 py-2 text-sm text-gray-200'
                                                        )}
                                                    >

                                                        {item.name}
                                                    </Link>)}
                                            </DisclosureButton>
                                        ))}
                                    </div>
                                </div>
                            </DisclosurePanel>
                        </>
                    )}
                </Disclosure>
                
                <main>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
                </main>
            </div>
        </>
    )
}