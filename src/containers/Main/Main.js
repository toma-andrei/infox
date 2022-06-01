import { useContext } from "react";
import { AuthContext } from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import styles from "./Main.module.css";
import pawn from "../../assets/img/mainPage/pawn.png";
import horse from "../../assets/img/mainPage/horse.png";
import tower from "../../assets/img/mainPage/tower.png";
import brain from "../../assets/img/mainPage/brain.png";
import exercises from "../../assets/img/mainPage/exercises.png";
import useAuth from "../../hooks/useAuth";
import ImageTextCard from "../UI/ImageTextCard/ImageTextCard";

const Main = (props) => {
  const { jwt } = useAuth();
  const cards = [
    {
      to: "/problems/display_year/9",
      image: pawn,
      alt: "pawn",
      title: "Clasa a IX-a",
      description:
        "Bazele limbajelor C şi C++: variabile, structuri de control, tablouri, algoritmi elementari.",
    },
    {
      to: "/problems/display_year/10",
      image: horse,
      alt: "horse",
      title: "Clasa a X-a",
      description:
        "Şiruri de caractere, subprograme, recursivitate, divide & impera, alocare dinamica.",
    },
    {
      to: "/problems/display_year/11",
      image: tower,
      alt: "tower",
      title: "Clasa a XI-a",
      description:
        "Grafuri, arbori, greedy, programarea dinamică, backtracking.",
    },
    {
      to: "/problems/hard",
      image: brain,
      alt: "brain",
      title: "Probleme dificile",
      description: "Problemele cu cele mai puține surse corecte trimise.",
    },
  ];
  // return isShownOnMainPage;
  return jwt != null ? (
    <main>
      <div className="features">
        {cards.map((card) => {
          return <ImageTextCard {...card} main={true} />;
        })}
      </div>
    </main>
  ) : (
    <div></div>
  );
};

export default Main;
