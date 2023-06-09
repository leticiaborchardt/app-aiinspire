"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { LogOut, Plus, PlusCircle } from 'lucide-react';

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }

    setUpProviders();
  }, []);

  useEffect(() => { 
    if (toggleDropdown === true) {
      let handler = (e) => {
        if (!menuRef.current.contains(e.target)) {
          setToggleDropdown(false);
        }
      }
  
      document.addEventListener('mousedown', handler);
  
      return() => {
        document.removeEventListener('mousedown', handler);
      }
    }
  })

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Logo"
          width={35}
          height={35}
          className="object-contain"
        />
        <p className='logo_text'>AIInspire</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href="/create-prompt" className='black_btn gap-2'>
              Create Prompt
              <Plus width={15}/>
            </Link>

            <button
              type="button"
              className='outline_btn gap-2'
              onClick={signOut}
            >
              Sign Out
              <LogOut width={15} />
            </button>

            <Link href="/profile">
              <Image
                src={session?.user?.image}
                alt='Profile'
                width={37}
                height={37}
                className='rounded-full'
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className='black_btn'
                >
                  Sign In
                </button>
              ))
            }
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user?.image}
              width={37}
              height={37}
              className='rounded-full hover:cursor-pointer'
              alt='profile'
              onClick={() => setToggleDropdown((prev) => !prev)}
              ref={menuRef}
            />

            <div className={toggleDropdown ? 'dropdown--active' : 'dropdown--inactive'}>
              <Link
                href='/profile'
                className='dropdown_link'
                onClick={() => setToggleDropdown(false)}
              >
                My Profile
              </Link>
              <Link
                href='/create-prompt'
                className='dropdown_link'
                onClick={() => setToggleDropdown(false)}
              >
                Create Prompt
              </Link>
              <button
                type='button'
                onClick={() => {
                  setToggleDropdown(false);
                  signOut();
                }}
                className='mt-5 w-full black_btn'
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav