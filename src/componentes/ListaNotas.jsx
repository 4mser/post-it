import React from 'react';
import Nota from './Nota';
import { motion, AnimatePresence } from 'framer-motion';

const ListaNotas = ({ notas, onNotaClick, onAgregarClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8  mt-12">
      <motion.div
        className="bg-yellow-200 p-4 rounded-md shadow-md m-2 w-full cursor-pointer flex justify-center items-center flex-col text-center border-[4px] border-yellow-400 text-yellow-600 font-medium h-auto md:h-60"
        whileHover={{ scale: 1.1, rotate: 0 }}
        initial={{ opacity: 0, scale: 0.2, rotate: -2, x: -4}}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        onClick={onAgregarClick}
      >
        <p>Click para agregar una nueva nota</p>
        <p className='text-2xl '>+</p>
      </motion.div>
      <AnimatePresence>
        {notas.map((nota, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className='pr-4 md:px-0'
          >
            <Nota nota={nota} onClick={() => onNotaClick(nota)} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ListaNotas;
