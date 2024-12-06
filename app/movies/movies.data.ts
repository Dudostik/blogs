import { Movie } from "./movies";

export const movies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    director: "Christopher Nolan",
    releaseYear: 2010,
    genres: ["Sci-Fi", "Thriller"],
    rating: 8.8,
    actors: [
      { name: "Leonardo DiCaprio", role: "Dom Cobb" },
      { name: "Joseph Gordon-Levitt", role: "Arthur" },
      { name: "Elliot Page", role: "Ariadne" }
    ]
  },
  {
    id: 2,
    title: "The Dark Knight",
    director: "Christopher Nolan",
    releaseYear: 2008,
    genres: ["Action", "Drama"],
    rating: 9.0,
    actors: [
      { name: "Christian Bale", role: "Bruce Wayne" },
      { name: "Heath Ledger", role: "Joker" },
      { name: "Michael Caine", role: "Alfred" }
    ]
  },
  {
    id: 3,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    releaseYear: 1994,
    genres: ["Crime", "Drama"],
    rating: 8.9,
    actors: [
      { name: "John Travolta", role: "Vincent Vega" },
      { name: "Samuel L. Jackson", role: "Jules Winnfield" },
      { name: "Uma Thurman", role: "Mia Wallace" }
    ]
  },
  {
    id: 4,
    title: "Interstellar",
    director: "Christopher Nolan",
    releaseYear: 2014,
    genres: ["Sci-Fi", "Drama"],
    rating: 8.6,
    actors: [
      { name: "Matthew McConaughey", role: "Cooper" },
      { name: "Anne Hathaway", role: "Brand" },
      { name: "Jessica Chastain", role: "Murph" }
    ]
  },
  {
    id: 5,
    title: "Django Unchained",
    director: "Quentin Tarantino",
    releaseYear: 2012,
    genres: ["Drama", "Western"],
    rating: 8.4,
    actors: [
      { name: "Jamie Foxx", role: "Django" },
      { name: "Christoph Waltz", role: "Dr. King Schultz" },
      { name: "Leonardo DiCaprio", role: "Calvin Candie" }
    ]
  },
  {
    id: 6,
    title: "The Matrix",
    director: "The Wachowskis",
    releaseYear: 1999,
    genres: ["Sci-Fi", "Action"],
    rating: 8.7,
    actors: [
      { name: "Keanu Reeves", role: "Neo" },
      { name: "Laurence Fishburne", role: "Morpheus" },
      { name: "Carrie-Anne Moss", role: "Trinity" }
    ]
  },
  {
    id: 7,
    title: "Fight Club",
    director: "David Fincher",
    releaseYear: 1999,
    genres: ["Drama"],
    rating: 8.8,
    actors: [
      { name: "Brad Pitt", role: "Tyler Durden" },
      { name: "Edward Norton", role: "The Narrator" },
      { name: "Helena Bonham Carter", role: "Marla Singer" }
    ]
  },
  {
    id: 8,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    director: "Peter Jackson",
    releaseYear: 2001,
    genres: ["Fantasy", "Adventure"],
    rating: 8.8,
    actors: [
      { name: "Elijah Wood", role: "Frodo Baggins" },
      { name: "Ian McKellen", role: "Gandalf" },
      { name: "Viggo Mortensen", role: "Aragorn" }
    ]
  }
];