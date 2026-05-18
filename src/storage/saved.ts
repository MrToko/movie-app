import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";

import { auth, db } from "../firebase/config";

export type SavedMovie = {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
};

function getUserSavedMoviesCollection() {
  const userId = auth.currentUser?.uid;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  return collection(
    db,
    "users",
    userId,
    "savedMovies"
  );
}

export async function getAllSaved(): Promise<
  Record<string, SavedMovie>
> {
  try {
    const querySnapshot = await getDocs(
      getUserSavedMoviesCollection()
    );

    const movies: Record<string, SavedMovie> = {};

    querySnapshot.forEach((document) => {
      const data = document.data() as SavedMovie;

      movies[data.imdbID] = data;
    });

    return movies;
  } catch (error) {
    console.log("Error getting saved movies:", error);

    return {};
  }
}

export async function isSaved(imdbID: string) {
  const all = await getAllSaved();

  return Boolean(all[imdbID]);
}

export async function toggleSave(movie: SavedMovie) {
  try {
    const userId = auth.currentUser?.uid;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const movieRef = doc(
      db,
      "users",
      userId,
      "savedMovies",
      movie.imdbID
    );

    const all = await getAllSaved();

    let nowSaved: boolean;

    if (all[movie.imdbID]) {
      await deleteDoc(movieRef);

      nowSaved = false;
    } else {
      await setDoc(movieRef, movie);

      nowSaved = true;
    }

    return nowSaved;
  } catch (error) {
    console.log(
      "Error toggling saved movie:",
      error
    );

    return false;
  }
}