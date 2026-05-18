import React, { createContext, useContext, useEffect, useState } from "react";

import { OmdbSearchItem } from "../models/movie.model";
import { getAllSaved, toggleSave } from "../storage/saved";

type MovieContextType = {
  savedMovies: OmdbSearchItem[];

  loadSavedMovies: () => Promise<void>;

  toggleSaveMovie: (movie: OmdbSearchItem) => Promise<void>;

  isMovieSaved: (imdbID: string) => boolean;
};

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const [savedMovies, setSavedMovies] = useState<OmdbSearchItem[]>([]);

  const loadSavedMovies = async () => {
    const all = await getAllSaved();

    setSavedMovies(Object.values(all) as OmdbSearchItem[]);
  };

  const isMovieSaved = (imdbID: string) => {
    return savedMovies.some((movie) => movie.imdbID === imdbID);
  };

  const toggleSaveMovie = async (movie: OmdbSearchItem) => {
    await toggleSave(movie);

    await loadSavedMovies();
  };

  useEffect(() => {
    loadSavedMovies();
  }, []);

  return (
    <MovieContext.Provider
      value={{
        savedMovies,
        loadSavedMovies,
        toggleSaveMovie,
        isMovieSaved,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error("useMovieContext must be used inside MovieProvider");
  }

  return context;
};
