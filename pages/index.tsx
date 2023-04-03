import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Navbar from '../components/Navbar';
import Billboard from '../components/Billboard';
import MovieList from '../components/MovieList';
import useMovieList from '../hooks/useMovieList';
import useFavorites from '../hooks/useFavorites';

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
   const { data: movies = [] } = useMovieList();
   const { data: favorites = [] } = useFavorites();
   //data alias movies default empty array

   return (
      <div>
         <Navbar />
         <Billboard />
         <div className='pb-40'>
            <MovieList title='Trending Now' data={movies} />
            <MovieList title='My List' data={favorites} />
         </div>
      </div>
   );
};

export default Home;
