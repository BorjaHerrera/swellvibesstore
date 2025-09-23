export const applyFiltersToURL = ({ filters, section, setSearchParams }) => {
  const params = new URLSearchParams();

  if (section) {
    params.set('section', section);
  }

  Object.entries(filters).forEach(([key, values]) => {
    values.forEach((value) => {
      if (value?.trim()) {
        params.append(key, value);
      }
    });
  });

  setSearchParams(params);
};
