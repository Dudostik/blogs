import { describe, test, expect } from 'vitest';
import { Movie } from './movies';
import {
  getMoviesByDirector,
  getMoviesByGenres,
  getActorsByMovieTitle,
  getAllUniqueActors,
  getMoviesByYearRange,
  getMoviesByRating,
  countMoviesByGenre,
  getMoviesByActorAndRole,
  //sortMoviesByYearAndRating,
  getOldestAndNewestMovies
} from './movies';
import { movies } from './movies.data';


test('getMoviesByDirector должна вернуть список фильмов, снятых указанным режиссёром', () => {
  const result = getMoviesByDirector(movies, 'Christopher Nolan');
  expect(result).toHaveLength(3);
  expect(result.every(movie => movie.director === 'Christopher Nolan')).toBe(true);
});

test('getMoviesByGenres должна вернуть список фильмов, которые относятся к указанным жанрам (хотя бы к одному)', () => {
  const result = getMoviesByGenres(movies, ['Sci-Fi', 'Drama']);
  expect(result).toHaveLength(7);
});

test('getActorsByMovieTitle должна вернуть список актёров из указанного фильма', () => {
  const result = getActorsByMovieTitle(movies, 'Inception');
  expect(result).toEqual(['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page']);
});

test('getAllUniqueActors должна вернуть список актёров без повторений', () => {
  const result = getAllUniqueActors(movies);
  expect(result).toContain('Leonardo DiCaprio');
  expect(result).toContain('Christian Bale');
  expect(result).toHaveLength(23);
});

test('getMoviesByYearRange должна вернуть список фильмов, снятых в указанный временной промежуток', () => {
  const result = getMoviesByYearRange(movies, 2000, 2010);
  expect(result).toHaveLength(3);
  expect(result.every(movie => movie.releaseYear >= 2000 && movie.releaseYear <= 2010)).toBe(true);
});

test('getMoviesByRating должна вернуть фильмы с указанным рейтингом и выше', () => {
  const result = getMoviesByRating(movies, 8.8);
  expect(result).toHaveLength(5);
  expect(result.every(movie => movie.rating >= 8.8)).toBe(true);
});

test('countMoviesByGenre должна вернуть набор жанров и количество фильмов, которые к ним относятся', () => {
  const result = countMoviesByGenre(movies);
  expect(result['Sci-Fi']).toBe(3);
  expect(result['Drama']).toBe(5); 
  expect(result['Action']).toBe(2);
  expect(result['Fantasy']).toBe(1);
});

test('getMoviesByActorAndRole должна вернуть фильм, в котором данный актёр сыграл конкретную роль', () => {
  const result = getMoviesByActorAndRole(movies, 'Leonardo DiCaprio', 'Dom Cobb');
  expect(result).toHaveLength(1);
});
/*
test('sortMoviesByYearAndRating должна вернуть отсортированный по годам и рейтингу список фильмов', () => {
  const result = sortMoviesByYearAndRating(movies);
  expect(result[0].releaseYear).toBe(1994);
  expect(result[result.length - 1].releaseYear).toBe(2014);
  expect(result[3].rating).toBeGreaterThan(result[2].rating);
});*/

test('getOldestAndNewestMovies должна вернуть самый старый и самый новый фильм', () => {
  const { oldest, newest } = getOldestAndNewestMovies(movies);
  expect(oldest.title).toBe('Pulp Fiction');
  expect(newest.title).toBe('Interstellar');
});
