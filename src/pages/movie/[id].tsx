import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import fetchOneMovie from "@/lib/fetch-one-movie";
import { useRouter } from "next/router";

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const movie = await fetchOneMovie(Number(id));

  if (!movie) {
    return {
      notFound: true,
    };
  }
  return {
    props: { movie },
  };
};

export default function Page({
  movie,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if (router.isFallback) return "로딩 중입니다";

  if (!movie) return "문제가 발생했습니다. 다시 시도해주세요";

  const {
    id,
    releaseDate,
    title,
    company,
    genres,
    subTitle,
    description,
    runtime,
    posterImgUrl,
  } = movie;

  return (
    <div className={style.container}>
      <div
        className={style.poster_img_container}
        style={{ backgroundImage: `url('${posterImgUrl})` }}
      >
        <img src={posterImgUrl} />
      </div>
      <div className={style.info_container}>
        <div className={style.title}>{title}</div>
        <div>
          {releaseDate} / {genres} / {runtime}분
        </div>
        <div>{company}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.description}>{description}</div>
      </div>
    </div>
  );
}
