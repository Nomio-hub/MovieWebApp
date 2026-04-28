export type MovieSummary = {
 adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string; 
  softcore: boolean;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  softcore: boolean;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type Genre = {
  id: number;
  name: string;
};

export type MovieDetail = {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  overview: string;
  genres: { id: number; name: string }[];
  runtime: number;
  poster_path: string;
  backdrop_path: string;
  videos?: {
    results: {
      key: string;
      type: string;
      site: string;
    }[]
  }
}