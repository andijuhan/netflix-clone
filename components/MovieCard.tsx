/* eslint-disable @next/next/no-img-element */
import { BsFillPlayFill } from 'react-icons/bs';
import { BsFillBookmarkFill } from 'react-icons/bs';

interface MovieCardProps {
   data: Record<string, any>;
   index: number;
}

const MovieCard = ({ data: movie, index }: MovieCardProps) => {
   return (
      <div className='bg-zinc-900 col-span relative h-[12vw] group'>
         <img
            className='cursor-pointer object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 md:group-hover:opacity-0 delay-200 w-full h-[12vw] brightness-75'
            src={movie.thumbnailUrl}
            alt={movie.title}
         />
         <div
            className={`opacity-0 absolute top-0 transition duration-200 z-10 invisible sm:visible delay-200 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] ${
               index === 3
                  ? 'group-hover:-translate-x-[2vw]'
                  : 'group-hover:translate-x-[2vw]'
            } group-hover:opacity-100`}
         >
            <img
               className='cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[12vw]'
               src={movie.thumbnailUrl}
               alt={movie.title}
            />
            <div className='z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full rounded-b-md shadow-md'>
               <div className='flex items-center gap-3'>
                  <div className='cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300'>
                     <BsFillPlayFill size={30} />
                  </div>
                  <div className='cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300'>
                     <BsFillBookmarkFill size={20} />
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
