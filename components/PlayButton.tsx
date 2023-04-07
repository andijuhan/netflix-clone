import { BsFillPlayFill } from 'react-icons/bs';
import { useRouter } from 'next/router';

interface PlayButtonProps {
   movieId: string;
}

const PlayButton = ({ movieId }: PlayButtonProps) => {
   const router = useRouter();

   return (
      <button
         onClick={() => router.push(`/watch/${movieId}`)}
         className='bg-white text-black rounded-md py-2 px-4 w-auto text-lg font-semibold flex items-center transition hover:text-red-600'
      >
         <BsFillPlayFill className='mr-1' />
         Play
      </button>
   );
};

export default PlayButton;
