import { Dispatch, SetStateAction } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface MobileMenuProps {
   showMobileMenu: boolean;
   setShowMobileMenu: Dispatch<SetStateAction<boolean>>;
}

const MobileMenu = ({ showMobileMenu, setShowMobileMenu }: MobileMenuProps) => {
   if (!showMobileMenu) {
      return null;
   }

   return (
      <div className='bg-black fixed inset-0 justify-center items-center py-5 flex flex-col border-2 z-50'>
         <div
            onClick={() => setShowMobileMenu(false)}
            className='absolute top-1 right-1 h-10 w-10 rounded-full bg-neutral-800 flex justify-center items-center text-neutral-400 cursor-pointer'
         >
            <AiOutlineClose size={30} />
         </div>
         <div className='flex flex-col gap-8 text-3xl font-semibold text-white uppercase'>
            <div className='px-3 gap-3 flex flex-col'>Home</div>
            <div className='px-3 gap-3 flex flex-col'>Series</div>
            <div className='px-3 gap-3 flex flex-col'>Films</div>
            <div className='px-3 gap-3 flex flex-col'>New & Popular</div>
            <div className='px-3 gap-3 flex flex-col'>My List</div>
         </div>
      </div>
   );
};

export default MobileMenu;
