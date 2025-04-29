import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

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
const loadSuperheroes = () => {
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

// API route to fetch superheroes data
app.get('/api/superheroes', async (req, res) => {
  try {
    const superheroes = await loadSuperheroes();
    res.json(superheroes);
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