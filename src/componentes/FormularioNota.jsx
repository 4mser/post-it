import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FormularioNota = ({ agregarNota, cerrarModal, cantidadNotas }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipo, setTipo] = useState('normal');
  const [rotacion, setRotacion] = useState(0);

  useEffect(() => {
    const calcularRotacion = () => {
      const rotacionBase = (cantidadNotas % 2 === 0) ? 2 : -2;
      return window.innerWidth < 640 ? rotacionBase / 2 : rotacionBase;
    };
    setRotacion(calcularRotacion());
  }, [cantidadNotas]);

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (descripcion.trim()) {
      agregarNota({
        titulo,
        descripcion,
        tipo,
        rotacion,
      });
      setTitulo('');
      setDescripcion('');
      setTipo('normal');
      cerrarModal();
    } else {
      alert('La descripción es obligatoria');
    }
  };

  return (
    <motion.form
      onSubmit={manejarEnvio}
      className="bg-white p-6 relative modal-content"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
    >
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="block w-full mb-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{ backgroundColor: 'white' }}
      />
      <textarea
        placeholder="Descripción"
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
      <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600">
        Agregar Post-It
      </button>
    </motion.form>
  );
};

export default FormularioNota;
