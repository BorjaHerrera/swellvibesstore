export const Footer = () => {
  return (
    <footer className='bg-teal-800 text-white text-center flex flex-col items-center gap-8 pt-16 pb-16 h-22 px-4'>
      <p>Code. Surf. Repeat. Designed by Borja Herrera.</p>

      <p>
        <a
          href='https://guess-the-wave.vercel.app/'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:text-teal-200'
        >
          GUESS THE WAVE
        </a>
      </p>

      <div className='flex gap-4 mt-2'>
        <a
          href='https://github.com/BorjaHerrera'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img src='/assets/github.png' alt='GitHub' className='w-8 h-8' />
        </a>
        <a
          href='https://www.linkedin.com/in/borjaherrera/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img src='/assets/linkedin.png' alt='LinkedIn' className='w-8 h-8' />
        </a>
      </div>
    </footer>
  );
};
