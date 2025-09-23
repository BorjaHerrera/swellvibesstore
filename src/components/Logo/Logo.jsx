import useNavigationPage from '../../hooks/useNavigationPage';

export const Logo = () => {
  const { goToPage } = useNavigationPage();
  return (
    <img
      className='w-20 cursor-pointer transform transition duration-300 origin-bottom-right hover:-translate-y-1 hover:-rotate-3'
      src='/assets/logo.png'
      alt='Swell Vibes Logo'
      onClick={() => goToPage('')}
    />
  );
};
