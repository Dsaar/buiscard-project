import {
	TextField,
	Grid,
	FormControlLabel,
	Checkbox,
	Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useForm from "../../hooks/useForm";
import signupSchema from "../models/signupShcema";
import initialSignupForm from "../helpers/initialForms/initialSignupForm";
import Form from "../../components/Form";
import { useCurrentUser } from "../providers/UserProvider";
import { getUser, setTokenInLocalStorage } from "../services/localStorageService";
import ENDPOINTS from "../../api/endpoints";

function RegisterForm() {
	const navigate = useNavigate();
	const { setUser, setToken } = useCurrentUser();

	const handleSignUp = async (userDetails) => {
		const userDetailsForServer = {
			name: {
				first: userDetails.first,
				middle: userDetails.middle,
				last: userDetails.last,
			},
			phone: userDetails.phone,
			email: userDetails.email,
			password: userDetails.password,
			image: {
				url: userDetails.url,
				alt: userDetails.alt,
			},
			address: {
				state: userDetails.state,
				country: userDetails.country,
				city: userDetails.city,
				street: userDetails.street,
				houseNumber: userDetails.houseNumber,
				zip: userDetails.zip,
			},
			isBusiness: userDetails.isBusiness,
		};

		try {
			const response = await axios.post(
				ENDPOINTS.users.register,
				userDetailsForServer
			);

			const loginResponse = await axios.post(
				ENDPOINTS.users.login,
				{
					email: userDetails.email,
					password: userDetails.password,
				}
			);

			setTokenInLocalStorage(loginResponse.data);
			setToken(loginResponse.data);
			setUser(getUser());
			navigate("/");
		} catch (error) {
			console.error("Signup failed:", error);
			if (error.response?.data) {
				alert(error.response.data);
			}
		}
	};

	const { formDetails, errors, handleChange, handleSubmit } = useForm(
		initialSignupForm,
		signupSchema,
		handleSignUp
	);

	const fields = [
		{ name: "first", label: "First Name" },
		{ name: "middle", label: "Middle Name", required: false },
		{ name: "last", label: "Last Name" },
		{ name: "phone", label: "Phone", type: "phone" },
		{ name: "email", label: "Email", type: "email" },
		{ name: "password", label: "Password", type: "password" },
		{ name: "url", label: "Image URL", required: false },
		{ name: "alt", label: "Image Alt", required: false },
		{ name: "state", label: "State", required: false },
		{ name: "country", label: "Country" },
		{ name: "city", label: "City" },
		{ name: "street", label: "Street" },
		{ name: "houseNumber", label: "House Number", type: "number" },
		{ name: "zip", label: "Zip", type: "number", required: false },
	];

	return (
		<Form
			onSubmit={handleSubmit}
			onReset={() => { }}
			title="Sign Up Form"
		>
			<Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
				{fields.map((field) => (
					<Grid item xs={12} sm={6} key={field.name}>
						<TextField
							fullWidth
							sx={{ width: '400px' }}
							name={field.name}
							label={field.label}
							type={field.type || "text"}
							required={field.required !== false}
							error={!!errors[field.name]}
							helperText={errors[field.name]}
							onChange={handleChange}
							value={formDetails[field.name]}
						/>
					</Grid>
				))}
				<Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "flex-start" }}>
					<Box sx={{ width: "400px" }}>
						<FormControlLabel
							control={
								<Checkbox
									checked={formDetails.isBusiness}
									onChange={(e) =>
										handleChange({
											target: {
												name: "isBusiness",
												value: e.target.checked,
											},
										})
									}
									name="isBusiness"
								/>
							}
							label="Signup as business"
							sx={{ pl: 0, ml: '-220px' }}
						/>
					</Box>
				</Grid>

			</Grid>
		</Form>
	);
}

export default RegisterForm;
