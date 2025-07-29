// RegisterFormDesktop.jsx
import {
	TextField,
	Grid,
	FormControlLabel,
	Checkbox,
	Box,
} from "@mui/material";
import Form from "../../../components/Form";

function RegisterFormDesktop({ fields, formDetails, errors, handleChange, handleSubmit }) {
	return (
		<Form onSubmit={handleSubmit} title="Sign Up Form">
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

export default RegisterFormDesktop;
