/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import useMovie from '../../hooks/useMovie';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BsInfoLg } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { RiShareForwardFill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import FavoriteButton from '../../components/FavoriteButton';

const Watch = () => {
   const router = useRouter();
   const { movieId } = router.query;
   const [showNav, setShowNav] = useState(true);
   const [showInfo, setShowInfo] = useState(false);

   const { data } = useMovie(movieId as string);

   useEffect(() => {
      setTimeout(() => {
         setShowInfo(false);
      }, 10000);

      setTimeout(() => {
         setShowInfo(true);
      }, 1000);
   }, []);

   return (
      <div className='relative h-screen w-screen bg-neutral-900 lg:bg-black flex'>
         <nav
            className={`lg:fixed w-full p-4 z-10 ${
               showNav ? 'lg:opacity-100' : 'lg:opacity-0'
            } flex items-center gap-8 bg-black bg-opacity-80 transition duration-500`}
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
            className='lg:w-[85%] mx-auto'
            autoPlay
            controls
            src={data?.videoUrl}
         ></video>
         <div
            className={`absolute ${
               showNav ? 'opacity-100' : 'opacity-0'
            } hidden lg:left-[2vw] lg:top-[7vw] lg:flex lg:flex-col items-center gap-6 transition duration-500 z-40`}
         >
            <div className='flex flex-col gap-1 text-sm items-center justify-center'>
               <div
                  onClick={() => setShowInfo(!showInfo)}
                  className='text-white border-2 cursor-pointer border-white rounded-full w-[65px] h-[65px] flex justify-center items-center drop-shadow-2xl'
               >
                  <BsInfoLg size={30} />
               </div>
               <p className='text-white'>Info</p>
            </div>
            <div className='flex flex-col gap-4 text-sm items-center justify-center drop-shadow-2xl'>
               <FavoriteButton
                  movieId={data?.id}
                  size='lg:w-[60px] lg:h-[60px]'
               />
               <p className='text-white'>My List</p>
            </div>
            <div className='flex flex-col gap-1 text-sm items-center justify-center'>
               <div className='text-white border-2 cursor-pointer border-white rounded-full w-[58px] h-[58px] flex justify-center items-center drop-shadow-2xl'>
                  <RiShareForwardFill size={25} />
               </div>
               <p className='text-white'>Share</p>
            </div>
         </div>
         <div className='lg:hidden w-full mt-7 px-7 flex'>
            <FavoriteButton movieId={data?.id} />
         </div>
         <div
            className={`hidden lg:block absolute ${
               showInfo ? 'opacity-100' : 'opacity-0'
            } h-auto w-[30%] left-[9vw] top-[7vw] bg-zinc-900 shadow-2xl rounded-lg transition duration-500 ease-in-out z-40`}
         >
            <div className='w-full relative'>
               <div className='w-8 h-8 bg-black bg-opacity-80 rounded-full flex justify-center items-center absolute top-4 right-5 cursor-pointer text-white p-2'>
                  <AiOutlineClose
                     onClick={() => setShowInfo(false)}
                     className=''
                  />
               </div>
               <img
                  className='w-full object-cover rounded-tl-lg rounded-tr-lg'
                  src={data?.thumbnailUrl}
                  alt=''
               />
               <div className='py-5 px-4'>
                  <p className='text-green-500 font-semibold text-xl mb-2'>
                     {data?.title}
                  </p>
                  <p className='text-white text-lg'>{data?.duration}</p>
                  <p className='text-white text-lg mb-2'>{data?.genre}</p>
                  <p className='text-white'>{data?.description}</p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Watch;
