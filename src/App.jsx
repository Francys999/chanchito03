import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cardlist from './components/Cardlist';

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log('Iniciando fetch de datos...');
      
      try {
        console.log('📡 Haciendo llamada a la API...');
        const response = await fetch('https://dog.ceo/api/breeds/image/random/6');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Datos recibidos:', data);
        
        if (data.status === 'success' && Array.isArray(data.message)) {
          const dogDetails = data.message.map((imageUrl, index) => {
            const urlParts = imageUrl.split('/');
            const breedIndex = urlParts.findIndex(part => part === 'breeds') + 1;
            const breed = urlParts[breedIndex] || 'Desconocida';
            
            return {
              type: breed.charAt(0).toUpperCase() + breed.slice(1),
              image: imageUrl
            };
          });
          
          console.log('Datos procesados:', dogDetails);
          setCharacters(dogDetails);
        } else {
          throw new Error('Formato de respuesta inesperado');
        }
      } catch (error) {
        console.error('Error fetching data:', error);        
      }
    };
    
    fetchData();
  }, []);

  console.log(characters);
  
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/card-list" element={<Cardlist data={characters} />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;