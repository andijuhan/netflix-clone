/* eslint-disable @next/next/no-img-element */
import { BsFillPlayFill, BsChevronDown } from 'react-icons/bs';
import { useRouter } from 'next/router';
import FavoriteButton from './FavoriteButton';
import useInfoModal from '../hooks/useInfoModal';

interface MovieCardProps {
   data: Record<string, any>;
   index: number;
}

const MovieCard = ({ data: movie, index }: MovieCardProps) => {
   const router = useRouter();
   const { openModal } = useInfoModal();

   return (
      <div className='relative  lg:h-[12vw] rounded-md group'>
         <img
            className='hidden lg:block cursor-pointer object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 md:group-hover:opacity-0 w-full h-[12vw] brightness-90'
            src={movie.thumbnailUrl}
            alt={movie.title}
         />
         <div
            className={`lg:opacity-0 lg:absolute lg:top-0 transition duration-200 lg:z-10 visible w-full lg:scale-0 lg:group-hover:scale-110 lg:group-hover:-translate-y-[6vw] ${
               index === 3
                  ? 'lg:group-hover:-translate-x-[2vw]'
                  : 'lg:group-hover:translate-x-[2vw]'
            } lg:group-hover:opacity-100`}
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
                  <FavoriteButton movieId={movie?.id} />
                  <div
                     onClick={() => openModal(movie.id)}
                     className='hidden cursor-pointer ml-auto w-10 h-10 border-white border-2 rounded-full lg:flex justify-center items-center transition hover:border-neutral-300'
                  >
                     <BsChevronDown className='text-white' />
                  </div>
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
         </div>
      </div>
   );
};

export default MovieCard;
