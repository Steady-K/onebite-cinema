import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import MovieItem from "@/components/movie-item";
import style from "./index.module.css";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchMoives from "@/lib/fetch-movies";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const q = context.query.q;
  const movies = await fetchMoives(q as string);

  return {
    props: { movies },
  };
};

export default function Page({
  movies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={style.search_movies}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} variant="large" />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
