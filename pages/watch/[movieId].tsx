/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import useMovie from '../../hooks/useMovie';
import { AiOutlineArrowLeft, AiOutlineHome } from 'react-icons/ai';
import { BsInfoLg, BsChevronRight, BsSearch } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { RiShareForwardFill } from 'react-icons/ri';
import { useCallback, useEffect, useState } from 'react';
import FavoriteButton from '../../components/FavoriteButton';
import useMovieList from '../../hooks/useTrendingMovies';
import MovieList from '../../components/MovieList';
import useInfoModal from '../../hooks/useInfoModal';
import InfoModal from '../../components/InfoModal';
import { AnimatePresence, motion } from 'framer-motion';

const Watch = () => {
   const router = useRouter();
   const { movieId } = router.query;
   const [showNav, setShowNav] = useState(true);
   const [showInfo, setShowInfo] = useState(false);
   const [showList, setShowList] = useState(false);

   const { data } = useMovie(movieId as string);
   const { data: allMovies = [] } = useMovieList();

   const { isOpen, closeModal } = useInfoModal();

   useEffect(() => {
      setShowInfo(true);
      setTimeout(() => {
         setShowNav(false);
         setShowInfo(false);
      }, 10000);
   }, []);

   const onMouseMoveHandler = useCallback(() => {
      if (!showNav) {
         setShowNav(true);
         setTimeout(() => {
            setShowNav(false);
         }, 10000);
      }
   }, [showNav, setShowNav]);

   const toggleShowInfo = useCallback(() => {
      setShowInfo(!showInfo);
      setShowList(false);
   }, [showInfo, setShowInfo]);

   const toggleShowList = useCallback(() => {
      setShowInfo(false);
      setShowList(!showList);
   }, [showList, setShowList]);

   return (
      <div
         onMouseMove={onMouseMoveHandler}
         className='relative h-screen w-screen bg-neutral-900 lg:bg-black'
      >
         <InfoModal visible={isOpen} onClose={closeModal} />
         <nav
            className={`lg:fixed w-full p-4 z-30 ${
               showNav ? 'lg:bg-opacity-100' : 'lg:bg-opacity-10'
            } flex items-center gap-5 bg-black transition duration-500 border-b-2 border-neutral-700`}
         >
            <AiOutlineHome
               onClick={() => router.push('/')}
               className='text-white cursor-pointer hover:scale-110 transition duration-300'
               size={35}
            />
            <AiOutlineArrowLeft
               onClick={() => router.back()}
               className='text-white cursor-pointer hover:scale-110 transition duration-300'
               size={40}
            />
            <p className='text-white lg:text-xl md:text-3xl font-bold drop-shadow-lg'>
               <span className='font-light'>Watching : </span>
               {data?.title}
            </p>
            <BsSearch
               className='hidden lg:block text-white cursor-pointer ml-auto mr-8 hover:scale-110 transition duration-300'
               size={35}
            />
         </nav>
         <div className='relative mx-auto lg:h-full w-full flex justify-center lg:items-center'>
            <video
               className={`lg:w-[85%] ${showInfo && 'brightness-[0.3]'} ${
                  showList && 'brightness-[0.2]'
               } transition duration-300`}
               autoPlay
               controls
               onEnded={() => {
                  setShowList(true);
               }}
               src={data?.videoUrl}
            ></video>
            <div className='absolute left-[7vw] bottom-[20%] w-[85%] z-40 flex flex-col justify-center items-center'>
               <AnimatePresence mode='wait'>
                  {showList ? (
                     <>
                        <motion.div
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           exit={{ opacity: 0 }}
                           transition={{
                              type: 'spring',
                              duration: 1,
                           }}
                           className='text-4xl text-white font-semibold opacity-90'
                        >
                           Recomended Movies
                        </motion.div>
                        <MovieList data={allMovies} />
                     </>
                  ) : null}
               </AnimatePresence>
            </div>
            <AnimatePresence mode='wait'>
               {showInfo ? (
                  <motion.div
                     initial={{ opacity: 0, x: '100vw' }}
                     animate={{ opacity: 1, x: '3vw' }}
                     exit={{ opacity: 0, x: '100vw' }}
                     transition={{
                        type: 'spring',
                        duration: 1,
                        bounce: 0.2,
                     }}
                     className='hidden lg:block absolute h-full w-[30%] right-0 top-[1] bg-zinc-900 shadow-2xl z-30 overflow-auto'
                  >
                     <div className='w-full relative'>
                        <div className='w-8 h-8 bg-black bg-opacity-80 rounded-full flex justify-center items-center absolute top-4 left-5 cursor-pointer text-white p-2'>
                           <AiOutlineClose
                              onClick={() => setShowInfo(false)}
                              className=''
                           />
                        </div>
                        <img
                           className='w-full object-cover rounded-tr-md'
                           src={data?.thumbnailUrl}
                           alt=''
                        />
                        <div className='py-5 px-6'>
                           <p className='text-green-500 font-semibold text-2xl mb-4'>
                              {data?.title}{' '}
                              <span className='text-neutral-500 text-base'>
                                 (2023)
                              </span>
                           </p>
                           <p className='text-white'>{data?.duration}</p>
                           <p className='text-yellow-500 mb-4'>{data?.genre}</p>
                           <p className='text-white text-lg opacity-70 pr-12'>
                              {data?.description}
                           </p>
                        </div>
                     </div>
                  </motion.div>
               ) : null}
            </AnimatePresence>
         </div>

         <div className='absolute hidden left-[2vw] top-[25%] lg:flex flex-col items-center gap-6 transition duration-500 z-40'>
            <div className='flex flex-col gap-1 text-sm items-center justify-center hover:scale-110 transition duration-300'>
               <div
                  onClick={toggleShowInfo}
                  className='text-white border-2 cursor-pointer border-white rounded-full w-[65px] h-[65px] flex justify-center items-center drop-shadow-2xl'
               >
                  <BsInfoLg size={30} />
               </div>
               <p className='text-white'>Info</p>
            </div>
            <div className='flex flex-col gap-1 text-sm items-center justify-center drop-shadow-2xl hover:scale-110 transition duration-300'>
               <FavoriteButton
                  movieId={data?.id}
                  size='lg:w-[60px] lg:h-[60px]'
                  type='card'
               />
               <p className='text-white'>My List</p>
            </div>
            <div className='flex flex-col gap-1 text-sm items-center justify-center hover:scale-110 transition duration-300'>
               <div className='text-white border-2 cursor-pointer border-white rounded-full w-[58px] h-[58px] flex justify-center items-center drop-shadow-2xl'>
                  <RiShareForwardFill size={25} />
               </div>
               <p className='text-white'>Share</p>
            </div>
            <div className='flex flex-col gap-1 text-sm items-center justify-center hover:scale-110 transition duration-300'>
               <div
                  onClick={toggleShowList}
                  className='text-white border-2 cursor-pointer border-white rounded-full w-[58px] h-[58px] flex justify-center items-center drop-shadow-2xl'
               >
                  <BsChevronRight size={25} />
               </div>
               <p className='text-white'>More</p>
            </div>
         </div>
         <div className='lg:hidden mt-7 px-7 flex gap-3 w-full items-center'>
            <div className='flex'>
               <FavoriteButton movieId={data?.id} type='card' />
            </div>
            <div className='text-white border-2 cursor-pointer border-white rounded-full w-[40px] h-[40px] flex justify-center items-center'>
               <RiShareForwardFill size={25} />
            </div>
         </div>

         <div className='lg:hidden w-full'>
            <div className='py-5 px-7'>
               <p className='text-green-500 font-semibold text-xl mb-2'>
                  {data?.title}{' '}
                  <span className='text-neutral-500 text-base'>(2023)</span>
               </p>
               <p className='text-white text-lg'>{data?.duration}</p>
               <p className='text-yellow-500 text-lg mb-2'>{data?.genre}</p>
               <p className='text-white'>{data?.description}</p>
            </div>
            <div className='px-4 pb-20 mt-14'>
               <MovieList data={allMovies} />
            </div>
         </div>
      </div>
   );
};

export default Watch;
