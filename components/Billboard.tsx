/* eslint-disable @next/next/no-img-element */
import { BiInfoCircle } from 'react-icons/bi';
import { FiChevronDown } from 'react-icons/fi';
import useBillboard from '../hooks/useBillboard';
import PlayButton from './PlayButton';
import useInfoModal from '../hooks/useInfoModal';
import { useCallback } from 'react';
import { motion } from 'framer-motion';
import FavoriteButton from './FavoriteButton';

const Billboard = () => {
   const { data, isLoading } = useBillboard();
   const { openModal } = useInfoModal();

   const handleOpenModal = useCallback(() => {
      openModal(data?.id);
   }, [openModal, data?.id]);

   return (
      <div className='relative lg:h-[50.25vw]'>
         {isLoading ? (
            <div className='w-full h-screen flex justify-center items-center'>
               <img src='/images/loading.svg' alt='' />
            </div>
         ) : (
            <>
               <div className='w-full h-screen lg:h-[50.25vw] object-cover object-center overflow-hidden'>
                  <video
                     className='w-full h-screen lg:h-[56.25vw] object-cover brightness-[60%] scale-150'
                     autoPlay
                     muted
                     loop
                     poster={data?.thumbnailUrl}
                     src={data?.videoUrl}
                  ></video>
               </div>

               <div className='absolute lg:bottom-[20%] bottom-[10%] ml-4 md:ml-16'>
                  <motion.p
                     initial={{ x: '-100vw' }}
                     animate={{ x: 0 }}
                     transition={{
                        type: 'spring',
                        duration: 0.7,
                        ease: 'easeInOut',
                        bounce: 0.3,
                     }}
                     className='text-white text-4xl md:text-5xl h-full lg:w-[50%] lg:text-7xl drop-shadow-xl font-medium'
                  >
                     {data?.title}
                  </motion.p>
                  <motion.p
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{
                        type: 'spring',
                        duration: 0.7,
                        ease: 'easeInOut',
                        delay: 0.5,
                        bounce: 0.3,
                     }}
                     className='text-white md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl opacity-80'
                  >
                     {data?.description}
                  </motion.p>
                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{
                        type: 'spring',
                        duration: 0.7,
                        ease: 'easeInOut',
                        delay: 0.9,
                        bounce: 0.3,
                     }}
                     className='flex items-center mt-4 lg:mt-8 gap-3'
                  >
                     <PlayButton movieId={data?.id} />
                     <FavoriteButton movieId={data?.id} type={'billboard'} />
                  </motion.div>
               </div>
               <div className='absolute left-1/2 transform -translate-x-1/2 bottom-7'>
                  <FiChevronDown
                     className='text-white opacity-30 animate-pulse'
                     size={40}
                  />
               </div>
            </>
         )}
      </div>
   );
};

export default Billboard;
