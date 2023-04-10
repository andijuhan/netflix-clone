/* eslint-disable @next/next/no-img-element */
import { BsFillPlayFill, BsChevronDown } from 'react-icons/bs';
import { useRouter } from 'next/router';
import FavoriteButton from './FavoriteButton';
import useInfoModal from '../hooks/useInfoModal';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';

const cardVariant = {
   rest: {
      opacity: 0,
      scale: 0.7,
   },
   anim: {
      opacity: 1,
      scale: 1,
      zIndex: -1,
   },
   hover: {
      opacity: 0,
   },
};

const cardDetailVarian = {
   rest: {
      opacity: 0,
      scale: 1,
      x: 0,
      y: 0,
   },
   anim: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
   },
};

interface MovieCardProps {
   data: Record<string, any>;
   index: number;
   showCard: boolean;
}

const MovieCard = ({ data: movie, index, showCard }: MovieCardProps) => {
   if (index > 3) {
      index -= 3;
   }
   const [windowSize, setWindowSize] = useState([
      window.innerWidth,
      window.innerHeight,
   ]);

   const { ref, inView } = useInView();
   const animation = useAnimation();

   const router = useRouter();
   const { openModal } = useInfoModal();

   useEffect(() => {
      const handleWindowResize = () => {
         setWindowSize([window.innerWidth, window.innerHeight]);
      };

      window.addEventListener('resize', handleWindowResize);

      return () => {
         window.removeEventListener('resize', handleWindowResize);
      };
   });

   useEffect(() => {
      if (inView) {
         animation.start({
            opacity: 1,
            scale: 1,
         });
      }
      if (!inView) {
         animation.start({ opacity: 0, scale: 0 });
      }
   }, [inView]);
   console.log(inView);

   return (
      <AnimatePresence mode='wait'>
         {showCard ? (
            <motion.div
               className='relative lg:h-[12vw] rounded-md group'
               ref={ref}
               animate={animation}
               transition={{
                  type: 'spring',
                  duration: 0.7,
                  delay: 0.2 * index,
                  ease: 'easeInOut',
               }}
            >
               <motion.img
                  className='hidden lg:block cursor-pointer object-cover shadow-xl rounded-md w-full h-[12vw] group-hover:hidden'
                  src={movie.thumbnailUrl}
                  alt={movie.title}
                  variants={cardVariant}
                  initial='rest'
                  animate='anim'
                  whileHover='hover'
                  exit={{
                     opacity: 0,
                     scale: 1,
                     transition: {
                        type: 'spring',
                        duration: 0.5,
                        delay: 0.1 * index,
                        ease: 'easeOut',
                     },
                  }}
                  transition={{
                     type: 'spring',
                     duration: 0.7,
                     delay: 0.2 * index,
                     ease: 'easeInOut',
                  }}
               />
               <motion.div
                  className={`lg:absolute lg:top-0 lg:z-10 w-full lg:hidden group-hover:block`}
                  initial='rest'
                  whileHover={{
                     opacity: 1,
                     scale: 1.1,
                     x: index === (3 || 7) ? -30 : 30,
                     y: -60,
                     zIndex: 40,
                  }}
                  animate={windowSize[0] >= 1024 ? undefined : 'anim'}
                  variants={cardDetailVarian}
                  transition={{
                     type: 'spring',
                     duration: 0.5,
                     delay: windowSize[0] >= 1024 ? 0 : 0.2 * index,
                     bounce: 0.4,
                  }}
               >
                  <img
                     className='cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full lg:h-[12vw]'
                     src={movie.thumbnailUrl}
                     alt={movie.title}
                  />
                  <div className='lg:z-10 bg-zinc-800 p-4 lg:absolute w-full rounded-b-md shadow-md'>
                     <div className='flex items-center gap-3'>
                        <div
                           onClick={() => router.push(`/watch/${movie.id}`)}
                           className='cursor-pointer w-10 h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300'
                        >
                           <BsFillPlayFill size={30} />
                        </div>
                        <FavoriteButton movieId={movie?.id} type='card' />
                     </div>
                     <p className='text-green-400 font-semibold text-lg mt-4'>
                        {movie.title}
                     </p>
                     <div className='flex mt-4 gap-2 items-center'>
                        <p className='text-white text-sm'>{movie.duration}</p>
                     </div>
                     <div className='flex mt-4 gap-2 items-center'>
                        <p className='text-white text-sm'>{movie.genre}</p>
                     </div>
                  </div>
               </motion.div>
            </motion.div>
         ) : null}
      </AnimatePresence>
   );
};

export default MovieCard;
