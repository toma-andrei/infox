import styles from "./UserPage.module.css";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import ImageTextCard from "../../UI/ImageTextCard/ImageTextCard";

const UserPage = (props) => {
  const { admin, author } = useAuth();
  const cards = [
    {
      to: "/user/show_profile",
      image: "😃",
      title: "Profil",
      description: "Editare date personale (parolă, oraș, etc.)",
      shouldBeAdmin: false,
      shouldBeAuthor: false,
    },
    {
      to: "/user/problems",
      image: "🏁",
      title: "Probleme",
      description: "Lista problemelor încercate și/sau rezolvate de tine",
      shouldBeAdmin: false,
      shouldBeAuthor: false,
    },
    {
      to: "/user/proposed_problems",
      image: "🧡",
      title: "Probleme propuse",
      description: "Propune o problemă nouă sau editează una propusă anterior",
      shouldBeAdmin: false,
      shouldBeAuthor: true,
    },
    {
      to: "/user/accept_problems",
      image: "👀",
      title: "Probleme de acceptat",
      description: "Acceptă probleme propuse de alți utilizatori",
      shouldBeAdmin: true,
      shouldBeAuthor: false,
    },
    {
      to: "/user/admin",
      image: "👀",
      title: "Pagina de administrare",
      description: "Administreaza alti useri",
      shouldBeAdmin: true,
      shouldBeAuthor: false,
    },
  ];
  return (
    <main>
      <div className="features">
        {cards.map((card) => {
          //should be admin?
          return card.shouldBeAdmin ? (
            //if should be admin, check if user is admin
            admin ? (
              //if admin show card else not
              <ImageTextCard {...card} />
            ) : null
          ) : //should be author?
          card.shouldBeAuthor ? (
            //if should be author, check if user is author
            author ? (
              //if author show card else not
              <ImageTextCard {...card} />
            ) : null
          ) : (
            <ImageTextCard {...card} />
          );
        })}
      </div>
    </main>
  );
};

export default UserPage;
