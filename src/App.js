import React, { useState } from 'react';
import FormularioNota from './componentes/FormularioNota';
import ListaNotas from './componentes/ListaNotas';
import ModalNota from './componentes/ModalNota';
import Modal from './componentes/Modal';
import { AnimatePresence } from 'framer-motion';

const App = () => {
  const [notas, setNotas] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [notaSeleccionada, setNotaSeleccionada] = useState(null);
  const [filtros, setFiltros] = useState({
    normal: false,
    rutina: false,
    pensamiento: false,
    urgente: false,
    todo: false,
  });

  const agregarNota = (nota) => {
    setNotas([...notas, nota]);
  };

  const actualizarNota = (notaActualizada) => {
    setNotas(notas.map((nota) => (nota === notaSeleccionada ? notaActualizada : nota)));
    setNotaSeleccionada(null);
  };

  const eliminarNota = (notaAEliminar) => {
    setNotas(notas.filter((nota) => nota !== notaAEliminar));
  };

  const cerrarModal = () => {
    setMostrarFormulario(false);
    setNotaSeleccionada(null);
  };

  const alternarFiltro = (tipo) => {
    setFiltros((prev) => ({
      ...prev,
      [tipo]: !prev[tipo],
      todo: false,
    }));
  };

  const alternarFiltroTodo = () => {
    if (filtros.todo) {
      setFiltros({
        normal: false,
        rutina: false,
        pensamiento: false,
        urgente: false,
        todo: false,
      });
    } else {
      setFiltros({
        normal: true,
        rutina: true,
        pensamiento: true,
        urgente: true,
        todo: true,
      });
    }
  };

  const notasFiltradas = Object.values(filtros).every(v => v === false) || filtros.todo
    ? notas
    : notas.filter(nota => filtros[nota.tipo]);

  return (
    <div className="p-4 min-h-screen md:px-32">
      <h1 className="text-3xl font-bold mb-4 text-slate-700">Simulador de Post-It!</h1>
      <div className="flex justify-between items-center mb-4 mt-5 text-slate-700">
        <div className="flex gap-2 w-full flex-wrap">
          <div
            className={`flex items-center space-x-1 cursor-pointer ${filtros.todo ? 'font-bold' : ''}`}
            onClick={alternarFiltroTodo}
          >
            <div className="bg-gray-300 w-4 h-4 rounded-full"></div>
            <span>Todo</span>
          </div>
          <div
            className={`flex items-center space-x-1 cursor-pointer ${filtros.normal ? 'font-bold' : ''}`}
            onClick={() => alternarFiltro('normal')}
          >
            <div className="bg-yellow-300 w-4 h-4 rounded-full"></div>
            <span>Normal</span>
          </div>
          <div
            className={`flex items-center space-x-1 cursor-pointer ${filtros.rutina ? 'font-bold' : ''}`}
            onClick={() => alternarFiltro('rutina')}
          >
            <div className="bg-blue-300 w-4 h-4 rounded-full"></div>
            <span>Rutina</span>
          </div>
          <div
            className={`flex items-center space-x-1 cursor-pointer ${filtros.pensamiento ? 'font-bold' : ''}`}
            onClick={() => alternarFiltro('pensamiento')}
          >
            <div className="bg-purple-300 w-4 h-4 rounded-full"></div>
            <span>Pensamiento</span>
          </div>
          <div
            className={`flex items-center space-x-1 cursor-pointer ${filtros.urgente ? 'font-bold' : ''}`}
            onClick={() => alternarFiltro('urgente')}
          >
            <div className="bg-red-300 w-4 h-4 rounded-full"></div>
            <span>Urgente</span>
          </div>
        </div>
      </div>
      {mostrarFormulario && (
        <Modal cerrarModal={cerrarModal}>
          <FormularioNota agregarNota={agregarNota} cerrarModal={cerrarModal} cantidadNotas={notas.length} />
        </Modal>
      )}
      {notaSeleccionada && (
        <ModalNota
          nota={notaSeleccionada}
          actualizarNota={actualizarNota}
          eliminarNota={eliminarNota}
          cerrarModal={cerrarModal}
        />
      )}
      <AnimatePresence>
        <ListaNotas
          notas={notasFiltradas}
          onNotaClick={(nota) => setNotaSeleccionada(nota)}
          onAgregarClick={() => setMostrarFormulario(true)}
        />
      </AnimatePresence>
    </div>
  );
};

export default App;
