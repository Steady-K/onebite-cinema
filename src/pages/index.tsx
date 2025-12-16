import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import style from "./index.module.css";
import MovieItem from "@/components/movie-item";
import fetchMoives from "@/lib/fetch-movies";
import { InferGetStaticPropsType } from "next";
import fetchRandomMovies from "@/lib/fetch-random-movies";

export const getStaticProps = async () => {
  const [allMovies, recoMovies] = await Promise.all([
    fetchMoives(),
    fetchRandomMovies(),
  ]);

  return {
    props: {
      allMovies,
      recoMovies,
    },
    revalidate: 60,
  };
};

export default function Home({
  allMovies,
  recoMovies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={style.recomendedMovies}>
          {recoMovies.map((movie) => (
            <MovieItem key={movie.id} {...movie} variant="large" />
          ))}
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div className={style.allMovies}>
          {allMovies.map((movie) => (
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
