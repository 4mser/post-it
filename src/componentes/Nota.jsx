import React from 'react';
import { motion } from 'framer-motion';

const Nota = ({ nota, onClick }) => {
  const obtenerColor = () => {
    switch (nota.tipo) {
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
      onClick={onClick}
      className={`${obtenerColor()} p-4 rounded shadow-md hover:shadow-xl m-2 w-full h-40 md:h-60 cursor-pointer transition-shadow`}
      whileHover={{ scale: 1.1, rotate: 0 }}
      initial={{ rotate: nota.rotacion, opacity: 0, scale: 0.9 }}
      animate={{ rotate: nota.rotacion, opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <h2 className="font-bold text-xl text-slate-700">{nota.titulo}</h2>
      <p className='font-medium text-slate-700/80'>{nota.descripcion}</p>
    </motion.div>
  );
};

export default Nota;
