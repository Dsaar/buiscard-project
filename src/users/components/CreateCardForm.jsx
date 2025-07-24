import React from "react";
import { TextField, Grid } from "@mui/material";
import useForm from "../../hooks/useForm";
import createCardSchema from "../models/createCardSchema";
import initialCreateCardForm from "../helpers/initialForms/initialCreateCardForm";
import axios from "axios";
import Form from "../../components/Form";
import { getToken } from '../services/localStorageService';
import ENDPOINTS from "../../api/endpoints";

function CreateCardForm() {
	const handleCreateCard = async (data) => {
		const formattedData = {
			title: data.title,
			subtitle: data.subtitle,
			description: data.description,
			phone: data.phone,
			email: data.email,
			web: data.web,
			image: {
				url: data.imageUrl,
				alt: data.imageAlt,
			},
			address: {
				state: data.state,
				country: data.country,
				city: data.city,
				street: data.street,
				houseNumber: data.houseNumber,
				zip: data.zip,
			},
		};

		try {
			const token = getToken(); 
			console.log("Sending token:", token);// get token from localStorage
			const response = await axios.post(
				ENDPOINTS.cards.create,
				formattedData,
				{
					headers: {
						"x-auth-token": token, // pass token here
					},
				}
			);
			alert("Card created successfully!");
		} catch (error) {
			alert("Card creation failed.");
			console.error(error);
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

	return (
		<Form onSubmit={handleSubmit} title="Create Card">
			<Grid container spacing={2} sx={{ display: "flex", justifyContent: "center" }}>
				{fields.map((field) => (
					<Grid item xs={12} sm={6} key={field.name}>
						<TextField
							fullWidth
							sx={{ width: "400px" }}
							name={field.name}
							label={field.label}
							type={field.type || "text"}
							required={field.required !== false}
							error={!!errors[field.name]}
							helperText={errors[field.name]}
							value={formDetails[field.name]}
							onChange={handleChange}
						/>
					</Grid>
				))}
			</Grid>
		</Form>
	);
}

export default CreateCardForm;
