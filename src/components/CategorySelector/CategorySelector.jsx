export const CategorySelector = ({
  categories,
  selectedCategory,
  onChange
}) => {
  return (
    <div className='mb-4'>
      <select
        value={selectedCategory}
        onChange={(e) => onChange(e.target.value)}
        className='w-full mb-3 p-3 rounded bg-white/10 border border-gray-700 text-white'
      >
        <option key='default-category' value=''>
          --Selecciona categoría--
        </option>
        {categories.map((c) => (
          <option key={c._id} value={c.slug} className='text-black'>
            {c.name}
          </option>
        ))}
      </select>
    </div>
  );
};
