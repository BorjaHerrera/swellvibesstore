import { useEffect, useRef, useState } from 'react';
import { heroArticles } from '../../utils/heroArticles';
import { Link } from 'react-router-dom';

export const CarouselHome = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const videoRef = useRef(null);
  const [hover, setHover] = useState(false);

  const startCarrouselLoop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroArticles.length);
    }, 5000);
  };

  useEffect(() => {
    startCarrouselLoop();
    return () => clearInterval(intervalRef.current);
  }, [currentIndex]);

  useEffect(() => {
    const currentArticle = heroArticles[currentIndex];
    if (currentArticle.image.endsWith('.mp4') && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, [currentIndex]);

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroArticles.length);
  };

  const goPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? heroArticles.length - 1 : prev - 1
    );
  };

  return (
    <section
      className='relative w-full h-screen overflow-hidden'
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {heroArticles.map((article, index) => (
        <article
          key={article.id}
          className='absolute top-0 left-0 w-full h-full transition-opacity duration-1000'
          style={{ opacity: index === currentIndex ? 1 : 0 }}
        >
          {article.image.endsWith('.mp4') ? (
            <>
              {/* Vídeo desktop */}
              <video
                ref={index === currentIndex ? videoRef : null}
                src={article.image}
                muted
                loop
                playsInline
                className='w-full h-full object-cover max-[1100px]:hidden'
              />
              {/* Imagen móviles/tablets */}
              <img
                src='https://res.cloudinary.com/djvxu2kyn/image/upload/v1758789122/sincerely-media-oC32cy4x-ZA_tdtdsz.jpg'
                alt={article.title}
                className='hidden max-[1100px]:block w-full h-full object-cover'
              />
            </>
          ) : (
            <img
              src={article.image}
              alt={article.title}
              className='w-full h-full object-cover'
            />
          )}
          <div className='absolute bottom-20  left-3 flex flex-col items-start justify-start text-white text-start px-4 pr-8 z-10 w-3/5 max-[1100px]:w-3/4 max-[700px]:w-full'>
            <h1 className='max-[600px]:text-4xl max-[900px]:text-5xl min-[901px]:text-6xl font-bold mb-4'>
              {article.title}
            </h1>
            <Link
              to={article.buylink}
              className='font-semibold text-white text-xl underline underline-offset-4'
            >
              {article.textLink}
            </Link>
          </div>
        </article>
      ))}
      {hover && (
        <>
          <button
            onClick={goPrev}
            className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white px-3 py-2 text-2xl rounded-full max-[900px]:hidden'
          >
            ‹
          </button>
          <button
            onClick={goNext}
            className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white px-3 py-2 rounded-full text-2xl max-[900px]:hidden'
          >
            ›
          </button>
        </>
      )}
      <div className='absolute top-4 right-4 flex gap-2 hidden max-[900px]:flex'>
        {heroArticles.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-4 h-4 rounded-full transition border border-teal-800 ${
              index === currentIndex ? 'bg-white scale-110' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
