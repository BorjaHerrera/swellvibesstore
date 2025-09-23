import { useNavigate } from 'react-router-dom';

const useNavigationPage = () => {
  const navigate = useNavigate();

  const goToPage = (page) => {
    navigate(`/${page}`);
  };
  return { goToPage };
};

export default useNavigationPage;
