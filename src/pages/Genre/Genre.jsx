import CardComponent from "./components/CardComponent";
import romance from "../../assets/romance.png";
import fantasy from "../../assets/fantasy.png";
import horror from "../../assets/horror.png";

const Genre = () => {
return (
    <div className="flex flex-col m-10">
        <div className="flex flex-row justify-evenly">
            <CardComponent genre="Fantasy" image={fantasy} path="/genre/fantasy"/>
            <CardComponent genre="Horror" image={horror} path="/genre/horror"/>
            <CardComponent genre="Romance" image={romance} path="/genre/romance"/>
        </div>
    </div>
);
};

export default Genre;
