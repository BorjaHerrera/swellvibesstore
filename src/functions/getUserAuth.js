export const getUserAuth = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    return {
      userId: user?._id || null,
      token: user?.token || null
    };
  } catch (error) {
    console.error('Error al obtener datos de usuario:', error);
    return { userId: null, token: null };
  }
};
