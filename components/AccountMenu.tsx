/* eslint-disable @next/next/no-img-element */
import { signOut } from 'next-auth/react';
import useCurrentUser from '../hooks/useCurrentUser';

interface AccountMenuProps {
   visible: boolean;
}

const AccountMenu = ({ visible }: AccountMenuProps) => {
   const { data } = useCurrentUser();
   if (!visible) {
      return null;
   }

   return (
      <div className='bg-black w-56 absolute top-14 bg-opacity-80 border border-gray-600 right-0 py-5 flex-col shadow-xl rounded-md'>
         <div className='flex flex-col gap-3'>
            <div className='px-3 flex flex-row gap-3 items-center w-full'>
               <img
                  className='w-8 rounded-md'
                  src='/images/default-red.png'
                  alt=''
               />
               <p className='text-white text-sm'>{data?.name}</p>
            </div>
            <hr className='bg-gray-600 border-0 h-px my-4' />
            <div
               onClick={() => signOut()}
               className='text-center text-white px-3 text-sm hover:underline'
            >
               Sign out
            </div>
         </div>
      </div>
   );
};

export default AccountMenu;
