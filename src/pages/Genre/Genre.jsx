import CardComponent from "./components/CardComponent";
import anime from "../../assets/anime.png";
import fantasy from "../../assets/fantasy.png";
import horror from "../../assets/horror.png";

const Genre = () => {
return (
    <div className="flex flex-col m-10">
        <div className="flex flex-row justify-evenly">
            <CardComponent genre="Fantasy" image={fantasy} path="/fantasy"/>
            <CardComponent genre="Horror" image={horror} path="/horror"/>
            <CardComponent genre="Anime" image={anime} path="/anime"/>
        </div>
    </div>
);
};

export default Genre;
