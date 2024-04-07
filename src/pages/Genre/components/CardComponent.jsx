import { useNavigate } from "react-router-dom";
import {
  CardBody,
  CardContainer,
  CardItem,
} from "../../../components/ui/3d-card";

const CardComponent = ({ genre, image, path }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(path);
  };

  return (
    <CardContainer className="inter-var">
      <CardBody className="relative group/card w-auto h-auto rounded-xl p-6">
        <div onClick={handleCardClick} style={{ cursor: 'pointer' }}>
          <CardItem translateZ="100" className="w-full mt-4">
            <img
              src={image}
              height="1000"
              width="1000"
              className="h-60 w-60 object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
          <div className="flex items-center justify-center">
            <CardItem
              translateZ="50"
              className="mt-2 text-xl font-bold text-white"
            >
              {genre}
            </CardItem>
          </div>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default CardComponent;
