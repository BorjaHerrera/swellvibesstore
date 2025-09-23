export const ProductsTable = ({ products, onEdit, onDelete }) => {
  return (
    <div className='overflow-x-auto'>
      <table className='w-full text-sm text-left border border-gray-700 rounded-lg overflow-hidden'>
        <thead className='bg-gray-800 text-white'>
          <tr>
            <th className='px-4 py-2 border'>Nombre</th>
            <th className='px-4 py-2 border'>Categoría</th>
            <th className='px-4 py-2 border'>Marca</th>
            <th className='px-4 py-2 border'>Estilo</th>
            <th className='px-4 py-2 border text-center'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr key='no-products'>
              <td colSpan='5' className='px-4 py-6 text-center text-gray-400'>
                No se encontraron productos
              </td>
            </tr>
          ) : (
            products.map((p) => (
              <tr key={p._id} className='odd:bg-gray-900 even:bg-gray-800'>
                <td className='px-4 py-2 border'>{p.name}</td>
                <td className='px-4 py-2 border'>{p.section?.name || '-'}</td>
                <td className='px-4 py-2 border'>{p.brand}</td>
                <td className='px-4 py-2 border'>{p.style || '-'}</td>
                <td className='px-4 py-2 border text-center flex gap-2 justify-center'>
                  <button
                    onClick={() => onEdit(p)}
                    className='px-3 py-1 rounded bg-sky-800 hover:bg-sky-900 text-white font-semibold transition'
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(p)}
                    className='px-3 py-1 rounded bg-pink-700 hover:bg-pink-800 text-white font-semibold transition'
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
