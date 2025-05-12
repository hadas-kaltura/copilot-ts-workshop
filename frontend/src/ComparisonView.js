import React from 'react';
import './App.css';

/**
 * ComparisonView component displays two heroes side by side for comparison
 * @param {Object} props - Component props
 * @param {Object} props.hero1 - First hero to compare
 * @param {Object} props.hero2 - Second hero to compare
 * @param {Function} props.onBack - Function to handle returning to table view
 */
const ComparisonView = ({ hero1, hero2, onBack }) => {
  // Stats to compare
  const statCategories = [
    { key: 'intelligence', label: 'Intelligence' },
    { key: 'strength', label: 'Strength' },
    { key: 'speed', label: 'Speed' },
    { key: 'durability', label: 'Durability' },
    { key: 'power', label: 'Power' },
    { key: 'combat', label: 'Combat' }
  ];

  // Calculate a winning hero by comparing total stats
  const calculateWinner = () => {
    const hero1Total = Object.values(hero1.powerstats).reduce(
      (sum, stat) => sum + parseInt(stat, 10), 0
    );
    
    const hero2Total = Object.values(hero2.powerstats).reduce(
      (sum, stat) => sum + parseInt(stat, 10), 0
    );

    if (hero1Total > hero2Total) {
      return {
        name: hero1.name,
        total: hero1Total,
        opponent: hero2.name,
        opponentTotal: hero2Total
      };
    } else if (hero2Total > hero1Total) {
      return {
        name: hero2.name,
        total: hero2Total,
        opponent: hero1.name,
        opponentTotal: hero1Total
      };
    } else {
      return { tie: true, total: hero1Total };
    }
  };

  const winner = calculateWinner();

  // Determine which hero is stronger in a particular stat
  const getStatWinner = (statKey) => {
    const stat1 = parseInt(hero1.powerstats[statKey], 10);
    const stat2 = parseInt(hero2.powerstats[statKey], 10);
    
    if (stat1 > stat2) return 'hero1';
    if (stat2 > stat1) return 'hero2';
    return 'tie';
  };

  return (
    <div className="comparison-view">
      <h1>Superhero Comparison</h1>
      
      <div className="comparison-container">
        <div className="hero-column">
          <h2>{hero1.name}</h2>
          <img 
            src={hero1.image} 
            alt={hero1.name} 
            className="comparison-image" 
          />
        </div>
        
        <div className="stats-column">
          <h3>Stats Comparison</h3>
          <table className="comparison-table">
            <thead>
              <tr>
                <th>{hero1.name}</th>
                <th>Category</th>
                <th>{hero2.name}</th>
              </tr>
            </thead>
            <tbody>
              {statCategories.map(({ key, label }) => {
                const winner = getStatWinner(key);
                return (
                  <tr key={key}>
                    <td className={winner === 'hero1' ? 'winning-stat' : ''}>
                      {hero1.powerstats[key]}
                    </td>
                    <td>{label}</td>
                    <td className={winner === 'hero2' ? 'winning-stat' : ''}>
                      {hero2.powerstats[key]}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        <div className="hero-column">
          <h2>{hero2.name}</h2>
          <img 
            src={hero2.image} 
            alt={hero2.name} 
            className="comparison-image" 
          />
        </div>
      </div>

      <div className="comparison-result">
        <h2>Final Verdict</h2>
        {winner.tie ? (
          <p>It's a tie! Both heroes have equal powers with a total of {winner.total} points.</p>
        ) : (
          <p>
            <strong>{winner.name}</strong> wins with a total of {winner.total} points, 
            compared to {winner.opponent}'s {winner.opponentTotal} points!
          </p>
        )}
      </div>

      <button 
        onClick={onBack} 
        className="back-button"
        aria-label="Back to superhero table"
      >
        Back to Superhero Table
      </button>
    </div>
  );
};

export default ComparisonView;
