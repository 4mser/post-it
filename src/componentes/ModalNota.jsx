import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ModalNota = ({ nota, actualizarNota, eliminarNota, cerrarModal }) => {
  const [titulo, setTitulo] = useState(nota.titulo);
  const [descripcion, setDescripcion] = useState(nota.descripcion);
  const [tipo, setTipo] = useState(nota.tipo);

  const manejarActualizacion = (e) => {
    e.preventDefault();
    if (descripcion.trim()) {
      actualizarNota({
        ...nota,
        titulo,
        descripcion,
        tipo,
      });
      cerrarModal();
    } else {
      alert('La descripción es obligatoria');
    }
  };

  const manejarEliminacion = () => {
    eliminarNota(nota);
    cerrarModal();
  };

  const obtenerColor = () => {
    switch (tipo) {
      case 'rutina':
        return 'bg-blue-300';
      case 'pensamiento':
        return 'bg-purple-300';
      case 'urgente':
        return 'bg-red-300';
      default:
        return 'bg-yellow-300';
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={cerrarModal}
    >
      <motion.div
        className={`${obtenerColor()} p-6 rounded-lg shadow-lg relative w-full max-w-lg`}
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        exit={{ y: 50 }}
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={manejarActualizacion} className="relative">
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="block w-full mb-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ backgroundColor: 'white' }}
          />
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="block w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            style={{ backgroundColor: 'white' }}
          />
          <div className="flex justify-around mb-4">
            <button
              type="button"
              className={`w-10 h-10 rounded-full ${tipo === 'normal' ? 'border-4 border-neutral-500' : ''} bg-yellow-300 hover:border-4 hover:border-neutral-500`}
              onClick={() => setTipo('normal')}
            />
            <button
              type="button"
              className={`w-10 h-10 rounded-full ${tipo === 'rutina' ? 'border-4 border-neutral-500' : ''} bg-blue-300 hover:border-4 hover:border-neutral-500`}
              onClick={() => setTipo('rutina')}
            />
            <button
              type="button"
              className={`w-10 h-10 rounded-full ${tipo === 'pensamiento' ? 'border-4 border-neutral-500' : ''} bg-purple-300 hover:border-4 hover:border-neutral-500`}
              onClick={() => setTipo('pensamiento')}
            />
            <button
              type="button"
              className={`w-10 h-10 rounded-full ${tipo === 'urgente' ? 'border-4 border-neutral-500' : ''} bg-red-300 hover:border-4 hover:border-neutral-500`}
              onClick={() => setTipo('urgente')}
            />
          </div>
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600">
              Actualizar
            </button>
            <button type="button" onClick={manejarEliminacion} className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600">
              Eliminar
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ModalNota;
