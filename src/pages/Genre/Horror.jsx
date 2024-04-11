import { HoverEffect } from "../../components/ui/card-hover-effect";
import { useNavigate } from "react-router-dom";

import { useStoryContext } from "../../context/StoryContext";

const Horror = () => {
  const { setStory } = useStoryContext();
  const navigate = useNavigate();

  const handleClick = (desc) => {
    setStory(desc);
    navigate("/genre/horror/create");
  };

  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} onClick={handleClick} />
    </div>
  );
};

export default Horror;

const projects = [
  {
    description:
      "In the darkness of the haunted mansion, a ghostly presence whispered of unspeakable horrors.",
  },
  {
    description:
      "Beneath the pale moonlight, a shadowy figure lurked, waiting to unleash its malevolent curse.",
  },
  {
    description:
      "Among the twisted trees of the forbidden forest, ancient evils stirred from their slumber.",
  },
  {
    description:
      "Within the abandoned asylum, the echoes of tortured souls cried out for vengeance.",
  },
  {
    description:
      "Amidst the chilling mist of the graveyard, the restless dead roamed in search of the living.",
  },
  {
    description:
      "In the flickering candlelight of the witch's hut, dark rituals promised power at a terrible price.",
  },
];
