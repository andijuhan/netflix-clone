import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';
import useCurrentUser from '../hooks/useCurrentUser';
import { useRouter } from 'next/router';

export const getServerSideProps = async (context: NextPageContext) => {
   const session = await getSession(context);
   console.log(session);

   if (!session) {
      return {
         redirect: {
            destination: '/auth',
            permanent: false,
         },
      };
   }

   return {
      props: {},
   };
};

const Profiles = () => {
   const { data: user } = useCurrentUser();
   const router = useRouter();

   return (
      <div className='flex h-full justify-center items-center'>
         <div className='flex flex-col'>
            <h1 className='text-3xl md:text-6xl text-center text-white'>
               Who is watching?
            </h1>
            <div className='flex items-center justify-center gap-8 mt-10'>
               <div onClick={() => router.push('/')}>
                  <div className='flex flex-col w-44 mx-auto cursor-pointer group'>
                     <div className='w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent hover:border-white overflow-hidden'>
                        <img src='/images/default-red.png' alt='' />
                     </div>
                     <div className='mt-4 text-gray-400 text-2xl text-center group-hover:text-white'>
                        {user?.name}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Profiles;
