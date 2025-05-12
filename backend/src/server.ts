import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

/**
This is a superheroes API server that supports 3 GET endpoints
The data is stored in a JSON file in the project folder called superheroes.json
1. /api/superheroes - returns a list of all superheroes, as a JSON array
2. /api/superheroes/:id - returns a specific superhero by id, as a JSON object
3. /api/superheroes/:id/powerstats - returns a the powers statistics for superhero
by id, as a JSON object
*/

// Define interfaces for type safety
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
  powerstats: PowerStats | null;
}

// Get proper __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.TEST_PORT || process.env.PORT || 3000;

// Root route
app.get('/', (req, res) => {
  res.send('Save the World!');
});

// Utility function to load superheroes data
/**
 * Loads superhero data from a JSON file.
 *
 * @returns {Promise<Superhero[]>} A promise that resolves with the parsed superhero data
 *                         or rejects with an error if the file cannot be read.
 */
const loadSuperheroes = (): Promise<Superhero[]> => {
  return new Promise((resolve, reject) => {
    const dataPath = path.join(__dirname, '../data/superheroes.json');
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

// API route to fetch superheroes data
app.get('/api/superheroes', async (req, res) => {
  try {
    const superheroes = await loadSuperheroes();
    res.json(superheroes);
  } catch (err) {
    console.error('Error loading superheroes data:', err);
    res.status(500).send('Internal Server Error');
  }
});

// API route to fetch a specific superhero by ID
app.get('/api/superheroes/:id', async (req, res) => {
  const superheroId = req.params.id;
  try {
    const superheroes = await loadSuperheroes();
    const superhero = superheroes.find((hero) => hero.id.toString() === superheroId);
    if (superhero) {
      res.json(superhero);
    } else {
      res.status(404).send('Superhero not found');
    }
  } catch (err) {
    console.error('Error loading superheroes data:', err);
    res.status(500).send('Internal Server Error');
  }
});

// API route to fetch power stats of a specific superhero by ID
app.get('/api/superheroes/:id/powerstats', async (req, res) => {
  const superheroId = req.params.id;
  try {
    const superheroes = await loadSuperheroes();
    const superhero = superheroes.find((hero) => hero.id.toString() === superheroId);
    if (superhero) {
      const powerstats = superhero.powerstats;
      if (powerstats) {
        res.json(powerstats);
      } else {
        res.status(404).send('Power stats not found for this superhero');
      }
    } else {
      res.status(404).send('Superhero not found');
    }
  } catch (err) {
    console.error('Error loading superheroes data:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server only if not in test environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  }).on('error', (err) => {
    const error = err as NodeJS.ErrnoException;
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Please use a different port.`);
    } else if (error.code === 'EACCES') {
      console.error(`Permission denied. Unable to bind to port ${PORT}.`);
    } else {
      console.error('An unexpected error occurred while starting the server:', error);
    }
    process.exit(1);
  });
}

export default app;