import { BsFillPlayFill } from 'react-icons/bs';
import useBillboard from '../hooks/useBillboard';

const Billboard = () => {
   const { data } = useBillboard();

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
               <button className='bg-white animate-pulse text-white bg-opacity-40 rounded-md py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold hover:bg-opacity-30 flex items-center transition'>
                  <BsFillPlayFill className='mr-1' />
                  Watch Now
               </button>
            </div>
         </div>
      </div>
   );
};

export default Billboard;
