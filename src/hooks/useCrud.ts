import axios from "axios";
import { useConfirm } from "../providers/AlertDialogProvider";

const backend_host = import.meta.env.VITE_BACKEND_HOST;

const useCrud = (endpoint?: string) => {
  const confirm = useConfirm();

  const getModel = async (_endpoint = endpoint) => {
    try {
      const response = await axios.get(`${backend_host}${_endpoint}`);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching data:", error);
      return Promise.reject(error.response?.data || error);
    }
  };

  const deleteModel = async (_endpoint = endpoint) => {
    const confirmation = await confirm({
      title: "Eliminar item",
      body: "¿Estás seguro de que quieres eliminar este registro? No podrás recuperarlo una vez eliminado.",
      cancelButton: "Cancelar",
      actionButton: "Eliminar!",
    });
    
    if (confirmation) {
      try {
        const response = await axios.delete(`${backend_host}${_endpoint}`);
        return response.data;
      } catch (error: any) {
        const backendMessage = error.response?.data?.message || "Error desconocido";
        console.error('Error al eliminar el registro:', backendMessage);
        throw error;
      }
    }
  };

  const insertModel = async (_data: any, _endpoint = endpoint) => {
    const confirmation = await confirm({
      title: "Registrar nuevo registro",
      body: "¿Estás seguro de que quieres ingresar este registro?",
      cancelButton: "Cancelar",
      actionButton: "Registrar",
    });
    
    if (!confirmation) {
      throw new Error('Acción cancelada por el usuario');
    }
    
    try {
      const response = await axios.post(`${backend_host}${_endpoint}`, _data);
      console.log(response);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        const backendMessage = error.response.data?.message || "Error desconocido";
        console.error('Error al registrar el registro:', backendMessage);
        throw error;
      } else {
        console.error('Network error or server is not responding:', error);
        return Promise.reject({ message: error.message || 'Error de red' });
      }
    }
  };

  const updateModel = async (_data: any, _endpoint = endpoint) => {
    const confirmation = await confirm({
      title: "Actualizar el registro",
      body: "¿Estás seguro de que quieres actualizar este registro?",
      cancelButton: "Cancelar",
      actionButton: "Actualizar",
    });
    
    if (!confirmation) {
      throw new Error('Acción cancelada por el usuario');
    }
    
    try {
      const response = await axios.put(`${backend_host}${_endpoint}`, _data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        const backendMessage = error.response.data?.message || "Error desconocido";
        console.error('Error al actualizar el registro:', backendMessage);
        throw error;
      } else {
        console.error('Network error or server is not responding:', error);
        return Promise.reject({ message: 'Network error or server is not responding' });
      }
    }
  };

  return {
    getModel,
    insertModel,
    deleteModel,
    updateModel,
  };
};

export default useCrud;
