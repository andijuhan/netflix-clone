import { BsChevronDown } from 'react-icons/bs';
import { BsSearch } from 'react-icons/bs';
import { BsBell } from 'react-icons/bs';
import NavbarItem from './NavbarItem';
import MobileMenu from './MobileMenu';
import { useCallback, useEffect, useState } from 'react';
import AccountMenu from './AccountMenu';

const Navbar = () => {
   const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
   const [showAccountMenu, setShowAccountMenu] = useState<boolean>(false);
   const [showBackground, setShowBackground] = useState<boolean>(false);

   const toggleMobileMenu = useCallback(() => {
      setShowMobileMenu(!showMobileMenu);
   }, [showMobileMenu]);

   const toggleAccountMenu = useCallback(() => {
      setShowAccountMenu(!showAccountMenu);
   }, [showAccountMenu]);

   useEffect(() => {
      const handleScroll = () => {
         if (window.scrollY > 66) {
            setShowBackground(true);
         } else {
            setShowBackground(false);
         }
      };
      window.addEventListener('scroll', handleScroll);

      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   return (
      <nav className='w-full fixed z-40'>
         <div
            className={`px-4 md:px-16 py-6 flex items-center transition duration-500 ${
               showBackground ? 'bg-black opacity-90' : ''
            }`}
         >
            <img className='h-4 lg:h-7' src='images/logo.png' alt='' />
            <div className='ml-8 gap-7 hidden lg:flex'>
               <NavbarItem label='Home' />
               <NavbarItem label='Series' />
               <NavbarItem label='Film' />
               <NavbarItem label='New & Popular' />
               <NavbarItem label='My List' />
            </div>
            <div
               onClick={toggleMobileMenu}
               className='lg:hidden flex items-center gap-2 ml-8  cursor-pointer relative'
            >
               <p className='text-white text-sm'>Browser</p>
               <BsChevronDown
                  className={`text-white transition duration-300 ${
                     showMobileMenu ? 'rotate-180' : 'rotate-0'
                  }`}
               />
               <MobileMenu visible={showMobileMenu} />
            </div>
            <div className='flex flex-row ml-auto gap-7 items-center'>
               <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition drop-shadow-xl'>
                  <BsSearch />
               </div>
               <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition drop-shadow-xl'>
                  <BsBell />
               </div>
               <div
                  onClick={toggleAccountMenu}
                  className='flex items-center gap-2 cursor-pointer relative'
               >
                  <div className='w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden drop-shadow-xl'>
                     <img src='/images/default-red.png' alt='' />
                  </div>
                  <BsChevronDown
                     className={`text-white transition duration-300 ${
                        showAccountMenu ? 'rotate-180' : 'rotate-0'
                     }`}
                  />
                  <AccountMenu visible={showAccountMenu} />
               </div>
            </div>
         </div>
      </nav>
   );
};

export default Navbar;
