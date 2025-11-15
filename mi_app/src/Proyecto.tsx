import React, { useState } from 'react';

interface Card {
  id: number;
  nombre: string;
  descripcion: string;
  ataque: number;
  defensa: number;
  imagen: string;
}

const Proyecto: React.FC = () => {
  // Estado de las cartas
  const [cards, setCards] = useState<Card[]>([
    {
      id: 1,
      nombre: "Mori Jin",
      descripcion: "El Rey Mono",
      ataque: 1000000,
      defensa: 1000000,
      imagen: "https://images.wallpapersden.com/image/download/the-god-of-high-school-jin-mori_bGdpZ2WUmZqaraWkpJRqZmdlrWdtbWU.jpg"
    },
    {
      id: 2,
      nombre: "Daewi Han",
      descripcion: "Guardian de la tierra",
      ataque: 500000,
      defensa: 500000,
      imagen: "https://comicvine.gamespot.com/a/uploads/original/11144/111444934/8608995-6cd91d59-41c0-4f22-b3b1-c7a129025814.jpeg"
    }
  ]);

  // Formulario
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ataque, setAtaque] = useState('');
  const [defensa, setDefensa] = useState('');
  const [imagen, setImagen] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  // Crear carta
  const crearCarta = (e: React.FormEvent) => {
    e.preventDefault();
    
    const nuevaCarta: Card = {
      id: cards.length > 0 ? Math.max(...cards.map(c => c.id)) + 1 : 1,
      nombre,
      descripcion,
      ataque: parseInt(ataque),
      defensa: parseInt(defensa),
      imagen: imagen || ""
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
            imagen: imagen || card.imagen
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
    <div className="min-h-screen bg-gradient-to-br from-blue-40 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🃏 Colección de Cartas Fantasticas
          </h1>
          <p className="text-gray-600 text-lg">
            Administra tu mazo de Cartas Brouh
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Formulario - Mas Cortito */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 sticky top-6">
              <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-3">
                {editId ? '✏️ Editar Carta' : '✨ Crear Nueva Carta'}
              </h2>
              
              <form onSubmit={editId ? actualizarCarta : crearCarta} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre de la Carta
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Goku Ultrainstinto"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Descripción de la Carta
                  </label>
                  <textarea
                    placeholder="Describe lo que quieras de tu personaje..."
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Enlace de la Imagen
                  </label>
                  <input
                    type="url"
                    placeholder="https://ejemplo.com/imagen.jpg"
                    value={imagen}
                    onChange={(e) => setImagen(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ⚔️ Ataque
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      value={ataque}
                      onChange={(e) => setAtaque(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      🛡️ Defensa
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      value={defensa}
                      onChange={(e) => setDefensa(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 flex-1 font-semibold shadow-md transition-all duration-200"
                  >
                    {editId ? '🔄 Actualizar' : '➕ Crear Carta'}
                  </button>
                  
                  {editId && (
                    <button
                      type="button"
                      onClick={limpiarFormulario}
                      className="bg-gray-500 text-white px-4 py-3 rounded-lg hover:bg-gray-600 font-semibold transition-colors"
                    >
                      ❌
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Lista de Cartas - Más verticales */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {cards.map((card) => (
                <div key={card.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
                  {/* Imagen más vertical */}
                  <div className="relative">
                    <img 
                      src={card.imagen} 
                      alt={card.nombre}
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://i.pinimg.com/474x/68/ba/fd/68bafdcf2f9dc6e86a5f1170bba06359.jpg";
                      }}
                    />
                    <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-lg text-sm font-bold">
                      ID: {card.id}
                    </div>
                  </div>
                  
                  {/* Contenido de la carta - Flujo vertical */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
                      {card.nombre}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed flex-grow">
                      {card.descripcion}
                    </p>
                    
                    {/* Estadísticas - En columna vertical */}
                    <div className="space-y-3 mb-5">
                      <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <span className="font-semibold text-red-700">⚔️ Poder de Ataque</span>
                        <span className="text-xl font-bold text-red-600 bg-white px-3 py-1 rounded-full border border-red-200">
                          {card.ataque}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="font-semibold text-green-700">🛡️ Poder de Defensa</span>
                        <span className="text-xl font-bold text-green-600 bg-white px-3 py-1 rounded-full border border-green-200">
                          {card.defensa}
                        </span>
                      </div>
                    </div>

                    {/* Botones - En columna vertical */}
                    <div className="space-y-2 mt-auto">
                      <button
                        onClick={() => editarCarta(card)}
                        className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 font-semibold transition-colors flex items-center justify-center"
                      >
                        ✏️ Editar Carta
                      </button>
                      <button
                        onClick={() => eliminarCarta(card.id)}
                        className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 font-semibold transition-colors flex items-center justify-center"
                      >
                        🗑️ Eliminar Carta
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {cards.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🃏</div>
                <h3 className="text-2xl font-bold text-gray-600 mb-2">No existen cartas creadas</h3>
                <p className="text-gray-500">Crea tu primera carta y arma tu mazo</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proyecto;