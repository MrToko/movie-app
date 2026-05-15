// Bu dosya OMDb API'sinden dönen veri yapısını tanımlamak için kullanılır.
// Çünkü: REST API response modelleme scalable architecture extend edilebilirlik
export interface OmdbSearchItem {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface MovieRating {
  Source: string;
  Value: string;
}

export interface OmdbDetail {
  Title: string;
  Year: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Poster: string;
  Ratings?: MovieRating[];
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  imdbID: string;
  Type?: string;
}