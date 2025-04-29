import React, { useEffect, useState } from 'react';
import './App.css';
import SuperheroComparison from './SuperheroComparison';

function App() {
  const [superheroes, setSuperheroes] = useState([]);
  const [selectedHeroes, setSelectedHeroes] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    fetch('/api/superheroes')
      .then((response) => response.json())
      .then((data) => setSuperheroes(data))
      .catch((error) => console.error('Error fetching superheroes:', error));
  }, []);

  const handleHeroSelect = (hero) => {
    if (selectedHeroes.find(h => h.id === hero.id)) {
      setSelectedHeroes(selectedHeroes.filter(h => h.id !== hero.id));
    } else if (selectedHeroes.length < 2) {
      setSelectedHeroes([...selectedHeroes, hero]);
    }
  };

  const handleCompare = () => {
    setShowComparison(true);
  };

  if (showComparison) {
    return (
      <SuperheroComparison 
        hero1={selectedHeroes[0]} 
        hero2={selectedHeroes[1]} 
        onBack={() => {
          setShowComparison(false);
          setSelectedHeroes([]);
        }}
      />
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Superheroes</h1>
        <div className="selection-info">
          {selectedHeroes.length < 2 ? (
            <p>Select two heroes to compare ({2 - selectedHeroes.length} remaining)</p>
          ) : (
            <button onClick={handleCompare} className="compare-button">
              Compare Heroes
            </button>
          )}
        </div>
        <table>
          <thead>
            <tr>
              <th>Select</th>
              <th>ID</th>
              <th>Name</th>
              <th>Image</th>
              <th>Intelligence</th>
              <th>Strength</th>
              <th>Speed</th>
              <th>Durability</th>
              <th>Power</th>
              <th>Combat</th>
            </tr>
          </thead>
          <tbody>
            {superheroes.map((hero) => (
              <tr 
                key={hero.id} 
                className={selectedHeroes.find(h => h.id === hero.id) ? 'selected' : ''}
                onClick={() => handleHeroSelect(hero)}
              >
                <td>
                  <input 
                    type="checkbox" 
                    checked={!!selectedHeroes.find(h => h.id === hero.id)}
                    readOnly
                  />
                </td>
                <td>{hero.id}</td>
                <td>{hero.name}</td>
                <td><img src={hero.image} alt={hero.name} width="50" /></td>
                <td>{hero.powerstats.intelligence}</td>
                <td>{hero.powerstats.strength}</td>
                <td>{hero.powerstats.speed}</td>
                <td>{hero.powerstats.durability}</td>
                <td>{hero.powerstats.power}</td>
                <td>{hero.powerstats.combat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
