import { HoverEffect } from "../../components/ui/card-hover-effect";
import { useNavigate } from "react-router-dom";

import { useStoryContext } from "../../context/StoryContext";

const Fantasy = () => {
  const { setStory } = useStoryContext();
  const navigate = useNavigate();
  const handleClick = (desc) => {
    setStory(desc);
    navigate("/genre/fantasy/create");
  };
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} onClick={handleClick} />
    </div>
  );
};

export default Fantasy;

const projects = [
  {
    description:
      "Among the ancient ruins, a lone figure emerged, wielding magic long thought lost.",
  },
  {
    description:
      "Beneath the canopy of a forgotten forest, a secret kingdom awaited its chosen heir.",
  },
  {
    description:
      "Through the swirling mists of time, a doorway to another realm beckoned the brave-hearted.",
  },
  {
    description:
      "Amidst the crumbling walls of a once-great castle, a sorcerer plotted his return to glory.",
  },
  {
    description:
      "Within the depths of an ocean abyss, a mermaid sang of lost treasures and ancient curses.",
  },
  {
    description:
      "In the flickering firelight of a traveler's camp, tales of dragons and destiny captured eager ears.",
  },
];
