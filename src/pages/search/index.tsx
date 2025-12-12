import SearchableLayout from "@/components/searchable-layout";

import { ReactNode } from "react";
import Movies from "@/mock/dummy.json";
import MovieItem from "@/components/movie-item";
import style from "./index.module.css";

export default function Page() {
  return (
    <div className={style.search_movies}>
      {Movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} variant="large" />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
