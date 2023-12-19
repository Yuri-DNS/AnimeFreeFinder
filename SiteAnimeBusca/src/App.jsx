import { useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    async function obterHTML() {
      try {
        const response = await axios.get('http://localhost:3001/api/scrape');
        console.log(response.data.html); // HTML da página
      } catch (error) {
        console.error('Erro ao obter HTML:', error.message);
      }
    }

    obterHTML();
  }, []);

  return (
    <>
      {/* Seu conteúdo JSX aqui */}
    </>
  );
}

export default App;
