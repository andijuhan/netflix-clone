import { useRouter } from 'next/router';
import useMovie from '../../hooks/useMovie';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import FavoriteButton from '../../components/FavoriteButton';

const Watch = () => {
   const router = useRouter();
   const { movieId } = router.query;
   const [showNav, setShowNav] = useState(true);

   const { data } = useMovie(movieId as string);

   useEffect(() => {
      setTimeout(() => {
         setShowNav(false);
      }, 10000);
   }, []);

   const toggleShowNav = () => {
      if (!showNav) {
         setShowNav(true);
         setTimeout(() => {
            setShowNav(false);
         }, 10000);
      }
   };

   return (
      <div
         onMouseMove={toggleShowNav}
         className='relative h-screen w-screen bg-neutral-900 lg:bg-black'
      >
         <nav
            className={`lg:fixed w-full p-4 z-10 ${
               showNav ? 'opacity-100' : 'lg:opacity-0'
            } flex items-center gap-8 bg-black bg-opacity-70 transition duration-500`}
         >
            <AiOutlineArrowLeft
               onClick={() => router.back()}
               className='text-white cursor-pointer'
               size={40}
            />
            <p className='text-white text-xl md:text-3xl font-bold'>
               <span className='font-light'>Watching : </span>
               {data?.title}
            </p>
         </nav>
         <video
            className='lg:h-full w-full'
            autoPlay
            controls
            src={data?.videoUrl}
         ></video>
         <div
            className={`absolute ${
               showNav ? '' : 'opacity-0'
            } hidden lg:left-[2vw] lg:top-[7vw] lg:flex lg:flex-col items-center gap-2 transition duration-500`}
         >
            <div className='flex flex-col gap-4 text-sm items-center justify-center'>
               <FavoriteButton movieId={data?.id} scale='scale-150' />
               <p className='text-white'>Watch list</p>
            </div>
         </div>
         <div className='lg:hidden w-full mt-7 px-7 flex'>
            <FavoriteButton movieId={data?.id} scale='scale-150' />
         </div>
      </div>
   );
};

export default Watch;
