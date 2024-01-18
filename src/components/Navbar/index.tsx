import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { CiMenuFries } from 'react-icons/ci'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  const [click, setClick] = React.useState(false)
  const handleClick = () => setClick(!click)

  const content = (
    <nav>
      {/* Mobile */}
      <div className="w-full lg:hidden block absolute top-24  left-0 right-0 z-10 pt-5 text-white bg-slate-900 transition">
        <ul className="text-center text-xl p-2">
          <li className="my-4 py-4 border-b border-slate-800 hover:border-synapsis-secondary hover:rounded">
            <Link href="/list-blog">List Blog</Link>
          </li>
          <li className="my-4 py-4 border-b border-slate-800 hover:border-synapsis-secondary hover:rounded">
            <Link href="/detail-blog">Detail Blog</Link>
          </li>
          <li className="my-4 py-4 border-b border-slate-800 hover:border-synapsis-secondary hover:rounded">
            <Link href="/admin-blog">Admin Blog</Link>
          </li>
        </ul>
      </div>
    </nav>
  )

  return (
    <nav>
      <div className="h-10vh flex justify-between z-50 text-black lg:py-5 lg:px-36 pr-3 py-4 border-b border-gray-200">
        <div className="flex items-center flex-1">
          <div className="hidden lg:block">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Logo synapsis"
                width={200}
                height={200}
                priority
              />
            </Link>
          </div>
          <div className="lg:hidden">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Logo synapsis"
                width={150}
                height={150}
                priority
                className="pl-5"
              />
            </Link>
          </div>
        </div>
        <div className="lg:flex items center justify-end font-normal hidden pt-5">
          <div className="flex-10">
            <ul className="flex space-x-5 gap-2 mr-16 text-[18px]">
              <li className="transition py-1 hover:border-b-2 border-slate-900 hover:border-synapsis-primary hover:text-synapsis-primary  cursor-pointer">
                <Link href="/list-blog">List Blog</Link>
              </li>
              <li className="transition py-1 hover:border-b-2 border-slate-900 hover:border-synapsis-primary hover:text-synapsis-primary  cursor-pointer">
                <Link href="/detail-blog">Detail Blog</Link>
              </li>
              <li className="transition py-1 hover:border-b-2 border-slate-900 hover:border-synapsis-primary hover:text-synapsis-primary  cursor-pointer">
                <Link href="/admin-blog">Admin Blog</Link>
              </li>
            </ul>
          </div>
        </div>
        <div>{click && content}</div>

        <button
          className="block sm:hidden transtion z-10"
          aria-label="Menu"
          onClick={handleClick}
        >
          {click ? <FaTimes /> : <CiMenuFries />}
        </button>
      </div>
    </nav>
  )
}
