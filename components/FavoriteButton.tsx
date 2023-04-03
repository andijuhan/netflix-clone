import axios from 'axios';
import React, { useCallback, useMemo } from 'react';
import useCurrentUser from '../hooks/useCurrentUser';
import useFavorites from '../hooks/useFavorites';
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineCheck } from 'react-icons/ai';

interface FavoriteButtonProps {
   movieId: string;
}

const FavoriteButton = ({ movieId }: FavoriteButtonProps) => {
   const { mutate: mutateFoforites } = useFavorites();
   const { data: currentUser, mutate } = useCurrentUser();

   const isFavorite = useMemo(() => {
      const list = currentUser?.favoriteIds || [];

      return list.includes(movieId);
   }, [currentUser, movieId]);

   const toggleFavorites = useCallback(async () => {
      let response;

      if (isFavorite) {
         response = await axios.delete('/api/favorite', { data: { movieId } });
      } else {
         response = await axios.post('/api/favorite', { movieId });
      }

      const updatedFavoriteIds = response?.data?.favoriteIds;

      mutate({
         ...currentUser,
         favoriteIds: updatedFavoriteIds,
      });

      mutateFoforites();
   }, [movieId, isFavorite, currentUser, mutate, mutateFoforites]);

   const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

   return (
      <div
         onClick={toggleFavorites}
         className='cursor-pointer w-6 h-6 lg:w-10 lg:h-10 border-2 text-white border-white rounded-full flex justify-center items-center transition hover:text-neutral-100 hover:border-neutral-100'
      >
         <Icon size={25} />
      </div>
   );
};

export default FavoriteButton;
