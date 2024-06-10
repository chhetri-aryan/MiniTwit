import { Fragment } from 'react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import { Bars3Icon, BellIcon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import { useAuth } from '../auth/auth';
import { navigation } from './NavItem';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Nav() {
  const { isLoggedIn, user } = useAuth();

  return (
    <Disclosure as="nav" className="bg-slate-800 fixed">
      {({ open }) => (
        <>
          <div className="flex">
            {/* Sidebar */}
            <div className="flex flex-col w-full md:w-80 h-screen bg-gray-800">
              <div className="flex items-center justify-start ms-3 h-16">
                <img className="h-10 w-auto" src={Logo} alt="Your Company" />
              </div>
              <div className="flex flex-col mt-4">
                {navigation.map((item) => (
                  <Link
                    to={item.href}
                    key={item.name}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium flex items-center gap-4 mt-1'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.icon} {item.name}
                  </Link>
                ))}
              </div>
              <div className="flex-1 mt-auto">
                {isLoggedIn ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="mt-20 relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <div className="flex items-center gap-2">
                          <UserCircleIcon height={45} color="#3276A2" />
                          <p className="text-white">{user.username}</p>
                        </div>
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
                      <MenuItems className="absolute left-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <MenuItem>
                          {({ focus }) => (
                            <a
                              href="#"
                              className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Your Profile
                            </a>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ focus }) => (
                            <a
                              href="#"
                              className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Settings
                            </a>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ focus }) => (
                            <NavLink
                              to="/logout"
                              className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Sign out
                            </NavLink>
                          )}
                        </MenuItem>
                      </MenuItems>
                    </Transition>
                  </Menu>
                ) : (
                  <div className="space-x-5">
                    <NavLink to="/login">
                      <span
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Login</span>
                        Login
                      </span>
                    </NavLink>
  
                    <NavLink to="/register">
                      <span
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Register</span>
                        Register
                      </span>
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
            {/* Main Content */}
          </div>
        </>
      )}
    </Disclosure>
  );
  
}
