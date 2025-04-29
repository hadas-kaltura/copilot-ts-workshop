import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

interface PowerStats {
  intelligence: number;
  strength: number;
  speed: number;
  durability: number;
  power: number;
  combat: number;
}

interface Superhero {
  id: number;
  name: string;
  image: string;
  team: string | null;
  powerstats: PowerStats;
}

/** 
This is a superheroes API server that supports multiple endpoints
The data is stored in a JSON file in the project folder called superheroes.json
1. /superheroes/all - returns a list of all superheroes, as a JSON array
2. /superheroes/:id - returns a specific superhero by id, as a JSON object
3. /superheroes/:id/powerstats - returns the powers statistics for superhero by id, as a JSON object
4. /superheroes/:id/assign-team - assigns a team to a superhero
5. /superheroes/team/:teamName - filters superheroes by team
*/

// Get proper __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.TEST_PORT || process.env.PORT || 3000;

// Utility function to load superheroes data
/**
 * Asynchronously loads superhero data from a JSON file.
 * 
 * @returns A Promise that resolves with the parsed superhero data from the JSON file
 * @throws {Error} If there's an error reading the file or parsing the JSON
 * 
 * @example
 * try {
 *   const heroes = await loadSuperheroes();
 *   console.log(heroes);
 * } catch (error) {
 *   console.error('Failed to load superheroes:', error);
 * }
 */
const loadSuperheroes = (): Promise<Superhero[]> => {
  const dataPath = path.join(__dirname, '../data/superheroes.json');
  return new Promise((resolve, reject) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(JSON.parse(data));
    });
  });
};

// Utility function to save superheroes data
const saveSuperheroes = async (superheroes: Superhero[]): Promise<void> => {
  const dataPath = path.join(__dirname, '../data/superheroes.json');
  return new Promise((resolve, reject) => {
    fs.writeFile(dataPath, JSON.stringify(superheroes, null, 2), 'utf8', (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

// Root route
app.get('/', (req, res) => {
  res.send('Save the World!');
});

// API route to fetch superheroes data
app.get('/api/superheroes', async (_req, res) => {
  try {
    const superheroes: Superhero[] = await loadSuperheroes();
    res.json(superheroes);
  } catch (err) {
    console.error('Error reading superheroes data:', err);
    res.status(500).send('Internal Server Error');
  }
});

// API route to fetch a specific superhero by ID
app.get('/api/superheroes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const superheroes: Superhero[] = await loadSuperheroes();
    const superhero = superheroes.find(hero => String(hero.id) === String(id));
    if (!superhero) {
      return res.status(404).send('Superhero not found');
    }
    res.json(superhero);
  } catch (err) {
    console.error('Error reading superheroes data:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/superheroes/:id/powerstats', async (req, res) => {
  const { id } = req.params;
  try {
    const superheroes: Superhero[] = await loadSuperheroes();
    const superhero = superheroes.find(hero => String(hero.id) === String(id));
    if (!superhero) {
      return res.status(404).send('Superhero not found');
    }
    res.json(superhero.powerstats);
  } catch (err) {
    console.error('Error reading superheroes data:', err);
    res.status(500).send('Internal Server Error');
  }
});

// API route to assign a team to a superhero
app.put('/api/superheroes/:id/assign-team', express.json(), async (req, res) => {
  const { id } = req.params;
  const { team } = req.body;

  if (!team) {
    return res.status(400).send('Team name is required');
  }

  try {
    const superheroes: Superhero[] = await loadSuperheroes();
    const superheroIndex = superheroes.findIndex(hero => String(hero.id) === String(id));
    
    if (superheroIndex === -1) {
      return res.status(404).send('Superhero not found');
    }

    superheroes[superheroIndex].team = team;
    await saveSuperheroes(superheroes);
    res.json(superheroes[superheroIndex]);
  } catch (err) {
    console.error('Error updating superhero team:', err);
    res.status(500).send('Internal Server Error');
  }
});

// API route to filter superheroes by team
app.get('/api/superheroes/team/:teamName', async (req, res) => {
  const { teamName } = req.params;
  try {
    const superheroes: Superhero[] = await loadSuperheroes();
    const teamHeroes = superheroes.filter(hero => 
      hero.team?.toLowerCase() === teamName.toLowerCase()
    );
    
    if (teamHeroes.length === 0) {
      return res.status(404).send('No superheroes found for this team');
    }
    
    res.json(teamHeroes);
  } catch (err) {
    console.error('Error reading superheroes data:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server only if not in test environment
if (process.env.NODE_ENV !== 'test') {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    }).on('error', (err) => {
      console.error('Failed to start server:', err);
      process.exit(1);
    });
  } catch (error) {
    console.error('Critical error while starting server:', error);
    process.exit(1);
  }
}

export default app;
