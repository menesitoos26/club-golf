// src/services/api.js

const BASE_URL = 'https://dummyjson.com'; // Usamos una API pública de prueba

export const fetchAPI = async (endpoint, method = 'GET', body = null) => {
  const token = localStorage.getItem('golf_token');
  
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error en la llamada a la API:", error);
    throw error;
  }
};