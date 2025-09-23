import { useEffect, useState } from 'react';
import { API } from '../utils/API/API';

export const useRelatedProducts = ({ _id, section, brand, style, gender }) => {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const getRelatedProducts = async () => {
      try {
        const sectionSlug =
          typeof section === 'string' ? section : section?.slug;

        if (!sectionSlug) return;

        const params = new URLSearchParams();
        params.set('section', sectionSlug);

        const response = await API({
          method: 'GET',
          endpoint: `/productos?${params.toString()}`
        });

        const scored = response
          .filter((product) => product._id !== _id)
          .filter(
            (product, index, self) =>
              index === self.findIndex((p) => p._id === product._id)
          )
          .map((product) => {
            let relevance = 0;

            if (product.style && style && product.style === style)
              relevance += 3;
            if (product.gender && gender && product.gender === gender)
              relevance += 3;
            if (product.brand && brand && product.brand === brand)
              relevance += 2;
            if (
              product.section &&
              sectionSlug &&
              product.section === sectionSlug
            )
              relevance += 1;

            return { ...product, relevance };
          });

        const sorted = scored.sort((a, b) => {
          if (b.relevance === a.relevance) return Math.random() - 0.5;
          return b.relevance - a.relevance;
        });

        setRelated(sorted.slice(0, 4));
      } catch (err) {
        console.error('Error cargando productos relacionados:', err);
      }
    };

    getRelatedProducts();
  }, [_id, section, brand, style, gender]);

  return related;
};
