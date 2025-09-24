export const PaginationButtons = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  return (
    <div className='flex justify-center mt-6 gap-2'>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className='px-4 py-2 border rounded disabled:opacity-50'
      >
        Anterior
      </button>
      <span className='px-2 py-2'>
        {currentPage} / {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className='px-4 py-2 border rounded disabled:opacity-50'
      >
        Siguiente
      </button>
    </div>
  );
};
