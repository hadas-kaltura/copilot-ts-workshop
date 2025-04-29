import React from 'react';
import './App.css';

function SuperheroComparison({ hero1, hero2, onBack }) {
  const compareStats = (stat1, stat2) => {
    if (stat1 === stat2) return 'tie';
    return stat1 > stat2 ? 'winner-left' : 'winner-right';
  };

  const calculateOverallWinner = () => {
    const stats = ['intelligence', 'strength', 'speed', 'durability', 'power', 'combat'];
    let hero1Points = 0;
    let hero2Points = 0;

    stats.forEach(stat => {
      if (hero1.powerstats[stat] > hero2.powerstats[stat]) hero1Points++;
      else if (hero2.powerstats[stat] > hero1.powerstats[stat]) hero2Points++;
    });

    if (hero1Points === hero2Points) return 'It\'s a tie!';
    return `${hero1Points > hero2Points ? hero1.name : hero2.name} wins!`;
  };

  return (
    <div className="comparison-container">
      <button className="back-button" onClick={onBack}>← Back to Heroes</button>
      <h1>Superhero Comparison</h1>
      <div className="comparison-grid">
        <div className="hero-card">
          <h2>{hero1.name}</h2>
          <img src={hero1.image} alt={hero1.name} />
        </div>
        <div className="vs">VS</div>
        <div className="hero-card">
          <h2>{hero2.name}</h2>
          <img src={hero2.image} alt={hero2.name} />
        </div>
        
        <div className={`stat ${compareStats(hero1.powerstats.intelligence, hero2.powerstats.intelligence)}`}>
          Intelligence: {hero1.powerstats.intelligence}
        </div>
        <div className="stat-label">Intelligence</div>
        <div className={`stat ${compareStats(hero2.powerstats.intelligence, hero1.powerstats.intelligence)}`}>
          Intelligence: {hero2.powerstats.intelligence}
        </div>

        <div className={`stat ${compareStats(hero1.powerstats.strength, hero2.powerstats.strength)}`}>
          Strength: {hero1.powerstats.strength}
        </div>
        <div className="stat-label">Strength</div>
        <div className={`stat ${compareStats(hero2.powerstats.strength, hero1.powerstats.strength)}`}>
          Strength: {hero2.powerstats.strength}
        </div>

        <div className={`stat ${compareStats(hero1.powerstats.speed, hero2.powerstats.speed)}`}>
          Speed: {hero1.powerstats.speed}
        </div>
        <div className="stat-label">Speed</div>
        <div className={`stat ${compareStats(hero2.powerstats.speed, hero1.powerstats.speed)}`}>
          Speed: {hero2.powerstats.speed}
        </div>

        <div className={`stat ${compareStats(hero1.powerstats.durability, hero2.powerstats.durability)}`}>
          Durability: {hero1.powerstats.durability}
        </div>
        <div className="stat-label">Durability</div>
        <div className={`stat ${compareStats(hero2.powerstats.durability, hero1.powerstats.durability)}`}>
          Durability: {hero2.powerstats.durability}
        </div>

        <div className={`stat ${compareStats(hero1.powerstats.power, hero2.powerstats.power)}`}>
          Power: {hero1.powerstats.power}
        </div>
        <div className="stat-label">Power</div>
        <div className={`stat ${compareStats(hero2.powerstats.power, hero1.powerstats.power)}`}>
          Power: {hero2.powerstats.power}
        </div>

        <div className={`stat ${compareStats(hero1.powerstats.combat, hero2.powerstats.combat)}`}>
          Combat: {hero1.powerstats.combat}
        </div>
        <div className="stat-label">Combat</div>
        <div className={`stat ${compareStats(hero2.powerstats.combat, hero1.powerstats.combat)}`}>
          Combat: {hero2.powerstats.combat}
        </div>
      </div>
      <div className="winner-announcement">
        <h2>{calculateOverallWinner()}</h2>
      </div>
    </div>
  );
}

export default SuperheroComparison;