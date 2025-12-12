import Link from "next/link";
import style from "./movie-item.module.css";
import { MovieData } from "@/types";

export default function MovieItem({
  id,
  posterImgUrl,
  variant = "small",
}: MovieData & { variant?: "large" | "small" }) {
  return (
    <Link className={style.container} href={`/movie/${id}`}>
      <img
        className={variant === "large" ? style.posterLarge : style.posterSmall}
        src={posterImgUrl}
      />
    </Link>
  );
}
