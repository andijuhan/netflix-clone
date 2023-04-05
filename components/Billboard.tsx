import { BiInfoCircle } from 'react-icons/bi';
import { BiDownArrow } from 'react-icons/bi';
import useBillboard from '../hooks/useBillboard';
import PlayButton from './PlayButton';
import useInfoModal from '../hooks/useInfoModal';
import { useCallback } from 'react';

const Billboard = () => {
   const { data } = useBillboard();
   const { openModal } = useInfoModal();

   const handleOpenModal = useCallback(() => {
      openModal(data?.id);
   }, [openModal, data?.id]);

   return (
      <div className='relative lg:h-[50.25vw]'>
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

         <div className='absolute top-[70%] md:top-[40%] ml-4 md:ml-16'>
            <p className='text-white text-2xl md:text-5xl h-full w-[50%] lg:text-7xl drop-shadow-xl font-medium'>
               {data?.title}
            </p>
            <p className='text-white text-md md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl'>
               {data?.description}
            </p>
            <div className='flex items-center mt-3 md:mt-4 lg:mt-8 gap-3'>
               <PlayButton movieId={data?.id} />
               <button
                  onClick={handleOpenModal}
                  className='bg-white text-white bg-opacity-40 rounded-md py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold hover:bg-opacity-30 flex items-center transition'
               >
                  <BiInfoCircle className='mr-1' />
                  More Info
               </button>
            </div>
         </div>
         <div className='absolute left-1/2 transform -translate-x-1/2 bottom-7'>
            <BiDownArrow
               className='text-white opacity-30 animate-pulse'
               size={40}
            />
         </div>
      </div>
   );
};

export default Billboard;
