export const StatusMessage = ({ message }) => {
  if (!message) return null;
  return <p className='mt-3 text-center text-white'>{message}</p>;
};
