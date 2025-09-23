export const calculateTotals = (items) => {
  const totalItems = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + (item.quantity || 0) * (item.product?.price || 0),
    0
  );
  return { totalItems, totalPrice };
};
