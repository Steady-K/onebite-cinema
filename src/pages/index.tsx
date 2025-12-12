import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import style from "./index.module.css";
import movies from "@/mock/dummy.json";
import MovieItem from "@/components/movie-item";

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={style.recomendedMovies}>
          {movies.slice(0, 3).map((movie) => (
            <MovieItem key={movie.id} {...movie} variant="large" />
          ))}
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div className={style.allMovies}>
          {movies.map((movie) => (
            <MovieItem key={movie.id} {...movie} variant="small" />
          ))}
        </div>
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
