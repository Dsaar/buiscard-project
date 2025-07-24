import { Card, CardMedia } from "@mui/material";
import BCardBody from "./BCardBody";
import BCardFooter from "./BCardFooter";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../router/routesDictionary";

function BCard({ card, onDelete, toggleLike, isLiked }) {
	const navigate = useNavigate();

	const handleCardClick = () => {
		navigate(ROUTES.cardDetailsDynamic(card._id));
	};

	return (
		<Card
			sx={{ maxWidth: 300, mx: 2, cursor: "pointer" }}
			onClick={handleCardClick}
		>
			<CardMedia
				sx={{ height: 140 }}
				image={card.image.url}
				title="Business logo"
			/>
			<BCardBody
				title={card.title}
				subtitle={card.subtitle}
				bizNumber={card.bizNumber}
				phone={card.phone}
				city={card.address.city}
			/>
			<BCardFooter
				toggleLike={toggleLike}
				isLiked={isLiked}
				cardId={card._id}
				bizNumber={card.bizNumber}
				onDelete={onDelete}
			/>
		</Card>
	);
}

export default BCard;
