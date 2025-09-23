import { useState, useContext } from 'react';
import { API } from '../../utils/API/API';

import { SearchContext } from '../../components/SearchInput/SearchContext';
import { EditProductModal } from '../../components/EditProductModal/EditProductModal';
import { ConfirmModal } from '../../components/ConfirmModal/ConfirmModal';
import { CategorySelector } from '../../components/CategorySelector/CategorySelector';
import { SearchById } from '../../components/SearchById/SearchById';
import { ProductsTable } from '../../components/ProductsTable/ProductsTable';
import { StatusMessage } from '../../components/StatusMessage/StatusMessage';
import { SearchByName } from '../../components/SearchByName/SearchByName';
import { useCategories } from '../../hooks/useCategories';

export const ProductsDashboard = () => {
  const [productId, setProductId] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [message, setMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [manualResults, setManualResults] = useState([]);

  const categories = useCategories();

  const { state } = useContext(SearchContext);
  const { results } = state;
  const products = manualResults.length > 0 ? manualResults : results;

  const handleSearchById = async () => {
    if (!productId.trim() || !selectedCategory) return;
    try {
      const data = await API({
        endpoint: `/productos/${selectedCategory}/${productId}`
      });
      setManualResults(data ? [data] : []);
    } catch (err) {
      console.error('Error al buscar producto por ID:', err);
      setManualResults([]);
    }
  };

  const handleSave = async (formData) => {
    if (!editingProduct) return;
    try {
      const body = new FormData();
      body.append('name', formData.name);
      body.append('brand', formData.brand);
      body.append('style', formData.style || '');
      body.append('description', formData.description);
      let price = formData.price;
      if (typeof price === 'string') price = price.replace(',', '.');
      body.append('price', parseFloat(price).toFixed(2));
      body.append('gender', formData.gender || '');
      body.append('section', formData.section);

      if (formData.image && formData.image.length > 0) {
        const file = formData.image[0];
        if (file instanceof File) body.append('image', file);
      }

      const updatedProduct = await API({
        endpoint: `/productos/${editingProduct._id}`,
        method: 'PUT',
        body,
        token: localStorage.getItem('token')
      });

      if (manualResults.length > 0) {
        setManualResults((prev) =>
          prev.map((p) => (p._id === editingProduct._id ? updatedProduct : p))
        );
      }

      setMessage('Artículo actualizado correctamente ✅');
      // Modal no se cierra automáticamente
    } catch (err) {
      console.error('Error al actualizar producto:', err);
      setMessage('Error al actualizar producto ❌');
    }
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await API({
        endpoint: `/productos/${productToDelete._id}`,
        method: 'DELETE',
        token: localStorage.getItem('token')
      });
      if (manualResults.length > 0) {
        setManualResults((prev) =>
          prev.filter((p) => p._id !== productToDelete._id)
        );
      }
      setMessage('Producto eliminado correctamente ✅');
    } catch (err) {
      console.error('Error al eliminar producto:', err);
      setMessage('Error al eliminar producto ❌');
    } finally {
      setProductToDelete(null);
    }
  };

  return (
    <div className='w-full my-8 p-6 rounded-lg shadow-lg bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#1e3a8a] text-white'>
      <h2 className='text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500'>
        Gestionar Productos
      </h2>

      {/* Selector de categoría */}
      <CategorySelector
        categories={categories}
        selectedCategory={selectedCategory}
        onChange={setSelectedCategory}
      />

      {/* Buscar por ID */}
      <SearchById
        productId={productId}
        setProductId={setProductId}
        selectedCategory={selectedCategory}
        onSearch={handleSearchById}
        onClear={() => {
          setProductId('');
          setManualResults([]);
        }}
      />

      {/* Buscar por nombre */}
      <SearchByName />

      {/* Tabla de productos */}
      <ProductsTable
        products={products}
        onEdit={setEditingProduct}
        onDelete={setProductToDelete}
      />

      {/* Modal de edición */}
      <EditProductModal
        product={editingProduct}
        categories={categories}
        message={message}
        onClose={() => {
          setEditingProduct(null);
          setMessage('');
        }}
        onSave={handleSave}
      />

      {/* Confirm Delete Modal */}
      {productToDelete && (
        <ConfirmModal
          isOpen={!!productToDelete}
          message={`¿Eliminar el producto "${productToDelete.name}"?`}
          onConfirm={confirmDelete}
          onCancel={() => setProductToDelete(null)}
        />
      )}

      {/* Mensaje de estado */}
      <StatusMessage message={message} />
    </div>
  );
};
