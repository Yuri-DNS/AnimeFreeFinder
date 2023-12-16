import './Content.css'
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AgentList from '../Valorant/Valorant';
import Valorantdle from '../Valorantdle/Valorantdle';
// import NotFound from '../NotFound/NotFound';

export default function Content(){
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = {
        language: 'pt-BR',
        isPlayableCharacter: true,
    };

    useEffect(() => {
        axios.get('https://valorant-api.com/v1/agents', {params})
          .then((response) => {
            setAgents(response.data.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error:', error);
            setLoading(false);
          });
      }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
    <>
      <aside>
          <Routes>
              <Route path='/' exact element = { <AgentList agentsData={agents}/> }/>
              <Route path='/Valorantdle' exact element = { <Valorantdle agentsData={agents}/> }/>
              {/*<Route path='/*' exact element = { <NotFound/> }/>*/}
          </Routes>
      </aside>
    </>
    );
}