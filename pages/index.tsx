import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Navbar from '../components/Navbar';
import Billboard from '../components/Billboard';
import MovieList from '../components/MovieList';
import useTrendingMovies from '../hooks/useTrendingMovies';
import useFavorites from '../hooks/useFavorites';
import InfoModal from '../components/InfoModal';
import useInfoModal from '../hooks/useInfoModal';
import { useCallback, useState } from 'react';
import useMovieList from '../hooks/useMovieList';

export const getServerSideProps = async (context: NextPageContext) => {
   const session = await getSession(context);

   if (!session) {
      return {
         redirect: {
            destination: '/auth',
            permanent: false,
         },
      };
   }

   return {
      props: {},
   };
};

const Home = () => {
   const { data: trendingMovies = [] } = useTrendingMovies();
   const { data: favorites = [] } = useFavorites();
   const { data: allMovies = [] } = useMovieList();
   //data alias movies default empty array
   const { isOpen, closeModal } = useInfoModal();
   const [trending, setTrending] = useState(true);
   const [myList, setMyList] = useState(false);
   const [browse, setBrowse] = useState(false);

   const handleTrending = useCallback(() => {
      setTrending(true);
      setBrowse(false);
      setMyList(false);
   }, [setTrending, trending]);

   const handleMyList = useCallback(() => {
      setMyList(true);
      setBrowse(false);
      setTrending(false);
   }, [setMyList, myList]);

   const handleBrowse = useCallback(() => {
      setMyList(false);
      setTrending(false);
      setBrowse(true);
   }, [setBrowse, browse]);

   return (
      <div>
         <InfoModal visible={isOpen} onClose={closeModal} />
         <Navbar />
         <Billboard />
         <div className='pb-60 px-5 lg:px-0'>
            <div className='md:px-12 mt-[2vw] flex gap-5 lg:gap-20 mb-7'>
               <div className='flex flex-col'>
                  <button
                     onClick={handleTrending}
                     className='text-white text-md md:text-xl lg:text-2xl font-semibold mb-4'
                  >
                     Trending Now
                  </button>
                  <hr
                     className={`h-px border-2 ${
                        trending ? 'opacity-100' : 'opacity-0'
                     }  transition duration-500`}
                  />
               </div>

               <div className='flex flex-col'>
                  <button
                     onClick={handleBrowse}
                     className='text-white text-md md:text-xl lg:text-2xl font-semibold mb-4'
                  >
                     Browse All
                  </button>
                  <hr
                     className={`h-px border-2 ${
                        browse ? 'opacity-100' : 'opacity-0'
                     }  transition duration-500`}
                  />
               </div>

               <div className='flex flex-col'>
                  <button
                     onClick={handleMyList}
                     className='text-white text-md md:text-xl lg:text-2xl font-semibold mb-4'
                  >
                     My List
                  </button>
                  <hr
                     className={`h-px border-2 ${
                        myList ? 'opacity-100' : 'opacity-0'
                     }  transition duration-500`}
                  />
               </div>
            </div>
            {trending ? <MovieList data={trendingMovies} /> : null}
            {myList ? <MovieList data={favorites} /> : null}
            {browse ? <MovieList data={allMovies} /> : null}
         </div>
      </div>
   );
};

export default Home;
