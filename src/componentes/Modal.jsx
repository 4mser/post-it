import React from 'react';
import { motion } from 'framer-motion';

const Modal = ({ children, cerrarModal }) => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={cerrarModal}
    >
      <motion.div
        className="bg-white p-6 rounded-lg shadow-md relative w-full max-w-lg"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        exit={{ y: 50 }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Modal;
