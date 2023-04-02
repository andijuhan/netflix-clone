interface NavbarItemProps {
   label: string;
}

const NavbarItem = ({ label }: NavbarItemProps) => {
   return (
      <div className='text-white cursor-pointer hover:text-gray-300 transition'>
         <span className='drop-shadow-xl'>{label}</span>
      </div>
   );
};

export default NavbarItem;
