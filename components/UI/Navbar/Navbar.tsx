import React from 'react'
import Link from '../../Misc/Link'

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
      <div className="max-w-6xl mx-auto bg-gray-100 rounded-t-lg px-8 py-3">
        <ul className="flex flex-row text-xl justify-end space-x-2">
          {NavItems.map((item) => (
            <Link key={item.id} href={item.to}>
              <li className="py-2 px-3 cursor-pointer hover:underline">
                {item.label}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Navbar
