import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { FaCartShopping } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';

import logo from '/logo.png';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';

const navigation = [
  // { name: 'Home', href: '/', key: 'dashboard' },
  { name: 'About Us', href: '/about', key: 'about' },
  { name: 'Restaurants', href: '/all-restuarant', key: 'restaurants' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function UserHeader() {
  const navigate = useNavigate();
  const location = useLocation(); // Use this to get the current route

  const userLogout = async () => {
    try {
      await axiosInstance({ method: "PUT", url: 'user/logout' });
      localStorage.clear();
      toast.success("Logout successfully");
      navigate('/');
      window.location.reload()
    } catch (error) {
      console.error(error);
    }
  };

  
  return (
    <Disclosure as="nav" className="bg-orange-600">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 left-0 flex items-start pt-3 sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex gap-1 items-center">
            <Link to="">
              <img alt="Your Company" src={logo} className="h-12 w-auto" />
            </Link>
            <h2 className="text-white font-semibold ps-2">GOURMENT</h2>
          </div>

          {/* Logo and Navigation */}
          <div className="flex flex-1 items-center justify-start sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-2">
                {navigation.map((item) => (
                  <Link
                    key={item.key}
                    to={item.href}
                    className={classNames(
                      location.pathname === item.href
                        ? 'bg-gray-50 text-black transition ease-in-out delay-1'
                        : 'hover:-translate-y-1 text-white hover:scale-110  duration-300',
                      'rounded-md px-3 py-2 text-sm font-medium   '
                    )}
                    aria-current={location.pathname === item.href ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Notification Bell and Profile - Positioned Right */}
          <div className="flex items-center ml-auto space-x-4 mx-3">
            <button
              type="button"
              className="relative rounded-full ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300 ...  p-1 text-white "
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button>
            <Link to="/cart">
              <FaCartShopping style={{ color: 'white' }} className="w- relative transition ease-in-out delay-15 hover:cursor-pointer hover:-translate-y-1 hover:scale-110 hover: duration-300 ..." />
            </Link>

            {/* Profile Dropdown */}
            <Menu as="div" className="relative">
              <div>
                <MenuButton className="relative flex transition ease-in-out delay-150 rounded-lg hover:-translate-y-1 hover:scale-110  duration-300 ... ">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <FaUserCircle style={{ color: 'white' }} className="size-6 " />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none">
                    Your Profile
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/order" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none">
                    Your Order
                  </Link>
                </MenuItem>
                <MenuItem>
                <button
                onClick={userLogout}
                className="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:outline-none"
              >
                Sign out
              </button>

                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.key}
              as="a"
              href={item.href}
              className={classNames(
                location.pathname === item.href
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium'
              )}
              aria-current={location.pathname === item.href ? 'page' : undefined}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

export default UserHeader;
