import { isEmpty, shuffle } from 'lodash';
import MovieCard from './MovieCard';
import { useState } from 'react';

interface MovieListProps {
   data: Record<string, any>[];
   showMovieList: boolean;
}

const MovieList = ({ data, showMovieList }: MovieListProps) => {
   if (isEmpty(data)) {
      return null;
   }

   return (
      <div className='md:px-12 mt-[2vw] lg:space-y-8'>
         <div>
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-3'>
               {data.map((movie, index) => (
                  <MovieCard
                     key={movie.id}
                     index={index}
                     data={movie}
                     showCard={showMovieList}
                  />
               ))}
            </div>
         </div>
      </div>
   );
};

export default MovieList;
