import { useMediaQuery, useTheme } from "@mui/material";
import useForm from "../../../hooks/useForm";
import createCardSchema from "../../models/createCardSchema";
import initialCreateCardForm from "../../helpers/initialForms/initialCreateCardForm";
import axios from "axios";
import ENDPOINTS from "../../../api/endpoints";
import { getToken } from "../../services/localStorageService";
import { useSnack } from "../../../providers/SnackBarProvider";
import { useNavigate } from "react-router-dom";
import CreateCardFormDesktop from "./CreateCardFormDesktop";
import CreateCardFormMobile from "./CreateCardFormMobile";
import { formatCardData } from "../../helpers/formats/formatCardData";

function CreateCardForm() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const setSnack = useSnack();
	const navigate = useNavigate();

	const handleCreateCard = async (data) => {
		const formattedData = formatCardData(data);
		try {
			const token = getToken();
			await axios.post(
				ENDPOINTS.cards.create,
				formattedData,
				{ headers: { "x-auth-token": token } }
			);
			setSnack("success", "Card created successfully!");
			navigate("/my-cards");
		} catch (error) {
			console.error(error);
			setSnack("error", "Failed to create card.");
		}
	};


	const { formDetails, errors, handleChange, handleSubmit } = useForm(
		initialCreateCardForm,
		createCardSchema,
		handleCreateCard
	);

	const fields = [
		{ name: "title", label: "Title" },
		{ name: "subtitle", label: "Subtitle" },
		{ name: "description", label: "Description" },
		{ name: "phone", label: "Phone" },
		{ name: "email", label: "Email", type: "email" },
		{ name: "web", label: "Website", required: false },
		{ name: "imageUrl", label: "Image URL" },
		{ name: "imageAlt", label: "Image Alt" },
		{ name: "state", label: "State", required: false },
		{ name: "country", label: "Country" },
		{ name: "city", label: "City" },
		{ name: "street", label: "Street" },
		{ name: "houseNumber", label: "House Number", type: "number" },
		{ name: "zip", label: "Zip", type: "number", required: false },
	];

	return isMobile ? (
		<CreateCardFormMobile
			fields={fields}
			formDetails={formDetails}
			errors={errors}
			handleChange={handleChange}
			handleSubmit={handleSubmit}
		/>
	) : (
		<CreateCardFormDesktop
			fields={fields}
			formDetails={formDetails}
			errors={errors}
			handleChange={handleChange}
			handleSubmit={handleSubmit}
		/>
	);
}

export default CreateCardForm;
