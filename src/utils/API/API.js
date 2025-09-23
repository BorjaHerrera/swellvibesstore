const url = 'https://surfstoreback.onrender.com/api/v1';

export const API = async ({
  endpoint,
  method = 'GET',
  body,
  isJSON = true,
  token = null
}) => {
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (isJSON && body && !(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  // prettier-ignore
  const bodyData = isJSON && !(body instanceof FormData) 
  ? (body ? JSON.stringify(body) : null) 
  : body;

  try {
    const res = await fetch(url + endpoint, {
      method,
      headers,
      body: bodyData
    });

    const response = await res.json();

    if (!res.ok) {
      console.error('Respuesta con error:', res.status, response);
      const error = new Error('Error en la solicitud');
      error.details = {
        ...response,
        status: res.status
      };
      throw error;
    }
    return response;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    throw error;
  }
};
