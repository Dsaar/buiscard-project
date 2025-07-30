import { TextField, Grid, Box } from "@mui/material";
import Form from "../../../components/Form";

function CreateCardFormMobile({ fields, formDetails, errors, handleChange, handleSubmit }) {
	return (
		<Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "100vh", py: 4 }}>
			<Form onSubmit={handleSubmit} title="Create Card">
				<Grid container spacing={2}>
					{fields.map((field) => (
						<Grid item xs={12} key={field.name}>
							<TextField
							sx={{width:'350px'}}
								fullWidth
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
				</Grid>
			</Form>
		</Box>
	);
}

export default CreateCardFormMobile;
