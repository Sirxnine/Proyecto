// src/App.tsx
import React, { useState } from 'react';

interface Card {
  id: number;
  nombre: string;
  descripcion: string;
  ataque: number;
  defensa: number;
  imagen: string; // Nueva variable para imágenes
}

const App: React.FC = () => {
  // Estado de las cartas
  const [cards, setCards] = useState<Card[]>([
    {
      id: 1,
      nombre: "Dragón Blanco",
      descripcion: "Un poderoso dragón de luz",
      ataque: 3000,
      defensa: 2500,
      imagen: "https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Dragón+Blanco"
    }
  ]);

  // Estado del formulario
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ataque, setAtaque] = useState('');
  const [defensa, setDefensa] = useState('');
  const [imagen, setImagen] = useState(''); // Nuevo estado para imagen
  const [editId, setEditId] = useState<number | null>(null);

  // CREATE - Crear carta
  const crearCarta = (e: React.FormEvent) => {
    e.preventDefault();
    
    const nuevaCarta: Card = {
      id: cards.length > 0 ? Math.max(...cards.map(c => c.id)) + 1 : 1,
      nombre,
      descripcion,
      ataque: parseInt(ataque),
      defensa: parseInt(defensa),
      imagen: imagen || "https://via.placeholder.com/300x200/6B7280/FFFFFF?text=Sin+Imagen"
    };

    setCards([...cards, nuevaCarta]);
    limpiarFormulario();
  };

  // UPDATE - Actualizar carta
  const actualizarCarta = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editId === null) return;

    setCards(cards.map(card =>
      card.id === editId
        ? {
            ...card,
            nombre,
            descripcion,
            ataque: parseInt(ataque),
            defensa: parseInt(defensa),
            imagen: imagen || card.imagen // Mantener imagen anterior si no se cambia
          }
        : card
    ));

    limpiarFormulario();
  };

  // DELETE - Eliminar carta
  const eliminarCarta = (id: number) => {
    setCards(cards.filter(card => card.id !== id));
  };

  // READ - Cargar datos para editar
  const editarCarta = (card: Card) => {
    setNombre(card.nombre);
    setDescripcion(card.descripcion);
    setAtaque(card.ataque.toString());
    setDefensa(card.defensa.toString());
    setImagen(card.imagen);
    setEditId(card.id);
  };

  const limpiarFormulario = () => {
    setNombre('');
    setDescripcion('');
    setAtaque('');
    setDefensa('');
    setImagen('');
    setEditId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        CRUD de Cartas 
      </h1>

      {/* Formulario */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">
          {editId ? 'Editar Carta' : 'Crear Carta'}
        </h2>
        
        <form onSubmit={editId ? actualizarCarta : crearCarta} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre de la carta"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          
          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows={3}
            required
          />

          <input
            type="url"
            placeholder="URL de la imagen (opcional)"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Ataque"
              value={ataque}
              onChange={(e) => setAtaque(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            
            <input
              type="number"
              placeholder="Defensa"
              value={defensa}
              onChange={(e) => setDefensa(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="flex space-x-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex-1"
            >
              {editId ? 'Actualizar' : 'Crear'}
            </button>
            
            {editId && (
              <button
                type="button"
                onClick={limpiarFormulario}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Lista de Cartas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div key={card.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {/* Imagen de la carta */}
            <img 
              src={card.imagen} 
              alt={card.nombre}
              className="w-full h-48 object-cover"
              onError={(e) => {
                // Si la imagen falla, usar placeholder
                e.currentTarget.src = "https://via.placeholder.com/300x200/6B7280/FFFFFF?text=Imagen+No+Disponible";
              }}
            />
            
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{card.nombre}</h3>
              <p className="text-gray-600 mb-3 text-sm">{card.descripcion}</p>
              
              <div className="flex justify-between mb-4">
                <div className="text-center">
                  <span className="block text-sm text-gray-500">Ataque</span>
                  <span className="text-red-600 font-bold text-lg">{card.ataque}</span>
                </div>
                <div className="text-center">
                  <span className="block text-sm text-gray-500">Defensa</span>
                  <span className="text-green-600 font-bold text-lg">{card.defensa}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => editarCarta(card)}
                  className="bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 flex-1 transition-colors"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarCarta(card.id)}
                  className="bg-red-500 text-white py-2 rounded hover:bg-red-600 flex-1 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cards.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No hay cartas creadas</p>
      )}
    </div>
  );
};

export default App;