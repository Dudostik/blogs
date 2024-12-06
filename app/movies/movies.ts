export interface Movie {
  id: number;
  title: string;
  director: string;
  releaseYear: number;
  genres: string[];
  rating: number;  // Рейтинг от 1 до 10
  actors: { name: string; role: string }[];  // Список актеров с их ролями
}

export function getMoviesByDirector(movies: Movie[], director: string): Movie[] {
  // Реализовать поиск фильмов по режиссеру
  return movies.filter((movie) => movie.director === director)
}

export function getMoviesByGenres(movies: Movie[], genres: string[]): Movie[] {
  // Реализовать поиск фильмов по нескольким жанрам
  const genresSet = new Set(genres)
  return movies.filter((movie) => movie.genres.some((genre) => genresSet.has(genre)))
}

export function getActorsByMovieTitle(movies: Movie[], title: string): string[] {
  // Реализовать получение списка актеров по названию фильма
  const movie = movies.find((movie) => movie.title === title)
  return movie ? movie.actors.map(actor => actor.name) : []
}

export function getAllUniqueActors(movies: Movie[]): string[] {
  // Реализовать получение списка уникальных актеров
  const actorSet = new Set<string>()
  
  movies.forEach(movie => {
    movie.actors.forEach(actor => {
      actorSet.add(actor.name)
    })
  })
  
  return Array.from(actorSet)
}

export function getMoviesByYearRange(movies: Movie[], startYear: number, endYear: number): Movie[] {
  // Реализовать фильтрацию фильмов по диапазону лет
  return movies.filter((movie) => movie.releaseYear >= startYear && movie.releaseYear <= endYear)
}

export function getMoviesByRating(movies: Movie[], minRating: number): Movie[] {
  // Реализовать фильтрацию фильмов по рейтингу
  return movies.filter((movie) => movie.rating >= minRating)
}

export function countMoviesByGenre(movies: Movie[]): Record<string, number> {
  // Реализовать подсчет количества фильмов для каждого жанра
  const genreCount: Record<string, number> = {}
  
  movies.forEach(movie => {
    movie.genres.forEach(genre => {
      if (!genreCount[genre]) {
        genreCount[genre] = 0
      }
      genreCount[genre]++
    })
  })
  
  return genreCount
}

export function getMoviesByActorAndRole(movies: Movie[], actor: string, role: string): Movie[] {
  // Реализовать поиск фильмов с актером в указанной роли
  return movies.filter((movie) => movie.actors.some((someActor) => someActor.name === actor && someActor.role === role))
}

/*
export function sortMoviesByYearAndRating(movies: Movie[]): Movie[] {
  // Реализовать сортировку фильмов по году и рейтингу
  return movies.sort(() => {})
}*/

export function getOldestAndNewestMovies(movies: Movie[]): { oldest: Movie; newest: Movie } {
  // Реализовать получение самого старого и самого нового фильма
  const oldest = movies.reduce((oldestMovie, currentMovie) => {
    return (currentMovie.releaseYear < oldestMovie.releaseYear) ? currentMovie : oldestMovie
  })
  
  const newest = movies.reduce((newestMovie, currentMovie) => {
    return (currentMovie.releaseYear > newestMovie.releaseYear) ? currentMovie : newestMovie
  })
  
  return { oldest, newest }
}