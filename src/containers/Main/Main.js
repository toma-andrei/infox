import { useContext } from "react";
import { AuthContext } from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import styles from "./Main.module.css";
import pawn from "../../assets/img/mainPage/pawn.png";
import horse from "../../assets/img/mainPage/horse.png";
import tower from "../../assets/img/mainPage/tower.png";
import brain from "../../assets/img/mainPage/brain.png";
import logo from "../../assets/img/favicon.ico";
import exercises from "../../assets/img/mainPage/exercises.png";
import useAuth from "../../hooks/useAuth";
import ImageTextCard from "../UI/ImageTextCard/ImageTextCard";
import { ProblemsContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Main = (props) => {
  const { jwt } = useAuth();
  const problems = useContext(ProblemsContext);
  const navigate = useNavigate();

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
    {
      to: "/about",
      image: logo,
      alt: "about",
      title: "Despre InfoX",
      description: "Problemele cu cele mai puține surse corecte trimise.",
    },
  ];

  //this is called when user logs out
  useEffect(() => {
    if (props.fromLogout) {
      navigate("/");

      return () => {
        console.log("unmounting");
        problems.clearContext();
      };
    }
  });

  // return isShownOnMainPage;
  return jwt != null ? (
    <main>
      <div className="features">
        {cards.map((card) => {
          return <ImageTextCard {...card} main={true} key={card.alt} />;
        })}
      </div>
    </main>
  ) : (
    <div></div>
  );
};

export default Main;
