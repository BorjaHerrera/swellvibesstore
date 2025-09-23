import { ProductForm } from '../ProductsForm/ProductForm';

export const EditProductModal = ({
  product,
  categories,
  message,
  onClose,
  onSave
}) => {
  if (!product) return null;

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-auto'>
      <div className='bg-[#0f172a] p-6 rounded-lg w-full max-w-3xl relative m-4 overflow-auto max-h-[90vh]'>
        {/* Botón de cierre */}
        <button
          className='absolute top-2 right-2 text-white text-xl font-bold'
          onClick={onClose}
        >
          ×
        </button>

        {/* Formulario */}
        <ProductForm
          key={product._id}
          title='Editar Producto'
          mode='edit'
          categories={categories}
          defaultValues={{
            ...product,
            section: product.section?._id || ''
          }}
          onSubmit={onSave}
          message={message}
        />
      </div>
    </div>
  );
};
