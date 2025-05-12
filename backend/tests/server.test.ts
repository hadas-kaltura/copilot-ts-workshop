import request from 'supertest';
import app from '../src/server';
import fs from 'fs';
import { describe, expect, it, jest } from '@jest/globals';
import { PathOrFileDescriptor } from 'fs';

process.env.TEST_PORT = '3002'; // Set the test port

describe('GET /', () => {
  it('should respond with "Save the World!"', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Save the World!');
  });
});

describe('GET /api/superheroes', () => {
  it('should return all superheroes as an array', async () => {
    const response = await request(app).get('/api/superheroes');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    // Check structure of first hero
    const hero = response.body[0];
    expect(hero).toHaveProperty('id');
    expect(hero).toHaveProperty('name');
    expect(hero).toHaveProperty('image');
    expect(hero).toHaveProperty('powerstats');
  });

  it('should handle file read errors gracefully', async () => {
    // Mock with the correct signature
    jest.spyOn(fs, 'readFile').mockImplementation((
      path: PathOrFileDescriptor,
      options: BufferEncoding | { encoding?: BufferEncoding, flag?: string } | undefined | null | ((err: NodeJS.ErrnoException | null, data: Buffer) => void),
      callback?: (err: NodeJS.ErrnoException | null, data: Buffer | string) => void
    ): any => {
      // Handle the case where options is the callback
      if (typeof options === 'function') {
        options(new Error('fail') as NodeJS.ErrnoException, Buffer.from(''));
        return undefined;
      }
      // Handle the case where callback is provided
      if (callback) {
        callback(new Error('fail') as NodeJS.ErrnoException, Buffer.from(''));
      }
      return undefined;
    });
    
    const response = await request(app).get('/api/superheroes');
    expect(response.status).toBe(500);
    expect(response.text).toBe('Internal Server Error');
    jest.restoreAllMocks();
  });
});

describe('GET /api/superheroes/:id', () => {
  it('should return the superhero with the given id', async () => {
    const response = await request(app).get('/api/superheroes/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('name', 'A-Bomb');
  });

  it('should return 404 if superhero does not exist', async () => {
    const response = await request(app).get('/api/superheroes/9999');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Superhero not found');
  });

  it('should handle file read errors gracefully', async () => {
    // Mock with the correct signature
    jest.spyOn(fs, 'readFile').mockImplementation((
      path: PathOrFileDescriptor,
      options: BufferEncoding | { encoding?: BufferEncoding, flag?: string } | undefined | null | ((err: NodeJS.ErrnoException | null, data: Buffer) => void),
      callback?: (err: NodeJS.ErrnoException | null, data: Buffer | string) => void
    ): any => {
      // Handle the case where options is the callback
      if (typeof options === 'function') {
        options(new Error('fail') as NodeJS.ErrnoException, Buffer.from(''));
        return undefined;
      }
      // Handle the case where callback is provided
      if (callback) {
        callback(new Error('fail') as NodeJS.ErrnoException, Buffer.from(''));
      }
      return undefined;
    });
    
    const response = await request(app).get('/api/superheroes/1');
    expect(response.status).toBe(500);
    expect(response.text).toBe('Internal Server Error');
    jest.restoreAllMocks();
  });
});

describe('GET /api/superheroes/:id/powerstats', () => {
  it('should return the powerstats for the superhero', async () => {
    const response = await request(app).get('/api/superheroes/1/powerstats');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('intelligence');
    expect(response.body).toHaveProperty('strength');
    expect(response.body).toHaveProperty('speed');
    expect(response.body).toHaveProperty('durability');
    expect(response.body).toHaveProperty('power');
    expect(response.body).toHaveProperty('combat');
  });

  it('should return 404 if superhero does not exist', async () => {
    const response = await request(app).get('/api/superheroes/9999/powerstats');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Superhero not found');
  });

  it('should return 404 if superhero exists but has no powerstats', async () => {
    // Mock the data to simulate missing powerstats
    const originalReadFile = fs.readFile;
    // Mock with the correct signature
    jest.spyOn(fs, 'readFile').mockImplementation((
      path: PathOrFileDescriptor,
      options: BufferEncoding | { encoding?: BufferEncoding, flag?: string } | undefined | null | ((err: NodeJS.ErrnoException | null, data: Buffer) => void),
      callback?: (err: NodeJS.ErrnoException | null, data: Buffer | string) => void
    ): any => {
      // Handle the case where options is the callback
      if (typeof options === 'function') {
        options(null, Buffer.from(JSON.stringify([
          { id: 123, name: 'NoStats', image: '', powerstats: null }
        ])));
        return undefined;
      }
      // Handle the case where callback is provided
      if (callback) {
        callback(null, Buffer.from(JSON.stringify([
          { id: 123, name: 'NoStats', image: '', powerstats: null }
        ])));
      }
      return undefined;
    });
    
    const response = await request(app).get('/api/superheroes/123/powerstats');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Power stats not found for this superhero');
    fs.readFile = originalReadFile;
    jest.restoreAllMocks();
  });

  it('should handle file read errors gracefully', async () => {
    // Mock with the correct signature
    jest.spyOn(fs, 'readFile').mockImplementation((
      path: PathOrFileDescriptor,
      options: BufferEncoding | { encoding?: BufferEncoding, flag?: string } | undefined | null | ((err: NodeJS.ErrnoException | null, data: Buffer) => void),
      callback?: (err: NodeJS.ErrnoException | null, data: Buffer | string) => void
    ): any => {
      // Handle the case where options is the callback
      if (typeof options === 'function') {
        options(new Error('fail') as NodeJS.ErrnoException, Buffer.from(''));
        return undefined;
      }
      // Handle the case where callback is provided
      if (callback) {
        callback(new Error('fail') as NodeJS.ErrnoException, Buffer.from(''));
      }
      return undefined;
    });
    
    const response = await request(app).get('/api/superheroes/1/powerstats');
    expect(response.status).toBe(500);
    expect(response.text).toBe('Internal Server Error');
    jest.restoreAllMocks();
  });
});
