import { HoverEffect } from "../../components/ui/card-hover-effect";
import { useNavigate } from "react-router-dom";

import { useStoryContext } from "../../context/StoryContext";

const Romance = () => {
  const { setStory } = useStoryContext();
  const navigate = useNavigate();

  const handleClick = (desc) => {
    setStory(desc);
    navigate("/genre/romance/create");
  };

  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} onClick={handleClick} />
    </div>
  );
};

export default Romance;

const projects = [
  {
    description:
      "In the soft glow of candlelight, two hearts intertwined, bound by an eternal love.",
  },
  {
    description:
      "Underneath the starlit sky, a chance encounter ignited a flame that would never burn out.",
  },
  {
    description:
      "Amidst the bustling streets of Paris, two strangers found solace in each other's arms.",
  },
  {
    description:
      "Beneath the cherry blossom trees, a promise was made that would withstand the test of time.",
  },
  {
    description:
      "In the warmth of a cozy cafe, a shy smile sparked a romance that would change lives forever.",
  },
  {
    description:
      "Through laughter and tears, through ups and downs, love endured, unyielding and true.",
  },
];
