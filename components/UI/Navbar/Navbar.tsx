import React, { Fragment } from 'react'
import Link from '../../Misc/Link'
import { Menu, Transition } from '@headlessui/react'
import {
  Cross1Icon,
  CrossCircledIcon,
  HamburgerMenuIcon,
} from '@radix-ui/react-icons'

type NavItemType = {
  id: number
  label: string
  to: string
}

type NavItemsType = NavItemType[]

const NavItems: NavItemsType = [
  {
    id: 1,
    label: 'Home',
    to: '/',
  },
  {
    id: 2,
    label: 'Blogs',
    to: '/blogs',
  },
  {
    id: 3,
    label: 'I know',
    to: '/know',
  },
  {
    id: 4,
    label: 'Books',
    to: '/books',
  },
]

const Navbar = () => {
  return (
    <div className="w-full">
      <div className="max-w-5xl mx-auto bg-gray-100 rounded-t-lg">
        <ul className="px-14 pb-3 hidden sm:flex py-4 flex-row text-xl justify-end space-x-2">
          {NavItems.map((item) => (
            <Link
              key={item.id}
              href={item.to}
              activeClassName={'bg-gray-200 text-gray-900'}
              className={
                'py-1.5 px-3 cursor-pointer text-gray-600 text-xl rounded hover:bg-gray-200 hover:text-gray-900'
              }
            >
              {item.label}
            </Link>
          ))}
        </ul>

        {/* Mobile Navbar */}
        <Menu as={'div'} className="flex sm:hidden px-3 pb-1">
          <div className="w-full flex justify-end py-4">
            <Menu.Button className={'focus:outline-none'}>
              <HamburgerMenuIcon className="h-9 w-9" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <div className="w-full bg-gray-100 absolute left-0 top-0">
              <Menu.Items
                className={
                  'flex flex-col bg-gray-100 absolute left-0 w-full z-30'
                }
              >
                <div className="flex justify-end pt-4">
                  <Menu.Item>
                    {({ active }) => (
                      <button className={'px-3 focus:outline-none'}>
                        <Cross1Icon className="h-9 w-9" />
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-5 shadow-xl border-b rounded-b-lg flex flex-col">
                  {NavItems.map((item) => (
                    <Menu.Item key={item.id}>
                      {({ active }) => (
                        <Link
                          href={item.to}
                          activeClassName="bg-gray-200 text-gray-900"
                          className="my-1 mx-3 px-3 py-1.5 text-gray-600 rounded-lg text-xl hover:bg-gray-200 hover:text-gray-900"
                        >
                          {item.label}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
              <div className="w-full h-screen bg-gray-100 opacity-70 absolute z-20" />
            </div>
          </Transition>
        </Menu>
      </div>
    </div>
  )
}

export default Navbar
