import React, { useEffect, useState } from 'react';
import './App.css';
import ComparisonView from './ComparisonView'; // Import the new component

function App() {
  const [superheroes, setSuperheroes] = useState([]);
  const [selectedHeroes, setSelectedHeroes] = useState([]);
  const [currentView, setCurrentView] = useState('table'); // 'table' or 'comparison'

  useEffect(() => {
    fetch('/api/superheroes')
      .then((response) => response.json())
      .then((data) => setSuperheroes(data))
      .catch((error) => console.error('Error fetching superheroes:', error));
  }, []);

  const handleSelectHero = (hero) => {
    setSelectedHeroes(prevSelected => {
      if (prevSelected.find(h => h.id === hero.id)) {
        return prevSelected.filter(h => h.id !== hero.id);
      }
      if (prevSelected.length < 2) {
        return [...prevSelected, hero];
      }
      return prevSelected;
    });
  };

  const handleCompareClick = () => {
    if (selectedHeroes.length === 2) {
      setCurrentView('comparison');
    }
  };

  const handleBackToTable = () => {
    setCurrentView('table');
    setSelectedHeroes([]); // Clear selections when going back
  };

  if (currentView === 'comparison') {
    return (
      <ComparisonView
        hero1={selectedHeroes[0]}
        hero2={selectedHeroes[1]}
        onBack={handleBackToTable}
      />
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Superheroes</h1>
        <table>
          <thead>
            <tr>
              <th>Select</th> {/* New column for checkboxes */}
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
              <tr key={hero.id} className={selectedHeroes.find(h => h.id === hero.id) ? 'selected' : ''}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedHeroes.some(h => h.id === hero.id)}
                    onChange={() => handleSelectHero(hero)}
                    aria-label={`Select ${hero.name}`}
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
        <button 
          style={{ marginTop: '20px' }} 
          aria-label="Add Hero"
          onClick={() => alert('Add Hero functionality not implemented yet.')}
        >
          Add Hero
        </button>
        <button 
          onClick={handleCompareClick} 
          disabled={selectedHeroes.length !== 2}
          style={{ marginTop: '20px', marginLeft: '10px' }}
          aria-label="Compare selected heroes"
        >
          Compare Selected Heroes
        </button>
      </header>
    </div>
  );
}

export default App;
