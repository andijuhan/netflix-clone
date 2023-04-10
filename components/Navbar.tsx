import { BsChevronDown } from 'react-icons/bs';
import { BsSearch } from 'react-icons/bs';
import { BsBellFill } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
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
               showBackground ? 'bg-black bg-opacity-95' : ''
            }`}
         >
            <img className='h-7' src='images/logo.png' alt='' />
            <div className='ml-8 gap-7 hidden lg:flex'>
               <NavbarItem label='Home' />
               <NavbarItem label='Series' />
               <NavbarItem label='Film' />
               <NavbarItem label='New & Popular' />
               <NavbarItem label='My List' />
            </div>
            <div
               onClick={toggleMobileMenu}
               className='lg:hidden flex items-center ml-auto cursor-pointer'
            >
               <GiHamburgerMenu
                  className='text-white transition duration-300'
                  size={30}
               />
               <MobileMenu
                  showMobileMenu={showMobileMenu}
                  setShowMobileMenu={setShowMobileMenu}
               />
            </div>
            <div className='hidden lg:flex flex-row ml-auto gap-7 items-center'>
               <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition drop-shadow-xl'>
                  <BsSearch />
               </div>
               <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition drop-shadow-xl'>
                  <BsBellFill />
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
