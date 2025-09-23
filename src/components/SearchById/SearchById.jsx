export const SearchById = ({
  productId,
  setProductId,
  onSearch,
  onClear,
  selectedCategory
}) => {
  return (
    <div className='mb-6 p-4 rounded bg-white/10'>
      <h3 className='text-lg font-semibold mb-4'>Buscar por ID</h3>
      <div className='flex flex-wrap gap-2'>
        <input
          type='text'
          placeholder='ID del producto...'
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className='flex-1 min-w-[200px] p-3 rounded bg-white/10 text-white border border-gray-700'
        />
        <button
          onClick={onSearch}
          disabled={!productId || !selectedCategory}
          className='px-4 py-2 rounded bg-gradient-to-r from-violet-600 to-purple-700 text-white font-semibold hover:opacity-90 transition'
        >
          Buscar
        </button>
        {productId && (
          <button
            onClick={onClear}
            className='px-4 py-2 rounded bg-gray-600 text-white font-semibold hover:bg-gray-700 transition'
          >
            Limpiar
          </button>
        )}
      </div>
    </div>
  );
};
