// LoginFormDesktop.jsx
import {
	TextField,
	Grid,
	Box,
	Button
} from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useNavigate } from "react-router-dom";
import Form from "../../../components/Form";

function LoginFormDesktop({ formDetails, errors, handleChange, handleSubmit }) {
	const navigate = useNavigate();

	return (
		<Form
			onSubmit={handleSubmit}
			onReset={() => { }}
			title="Sign In Form"
			styles={{ maxWidth: "900px" }}
		>
			<Grid container spacing={2} sx={{ display: "flex", justifyContent: "center" }}>
				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						sx={{ width: "400px" }}
						name="email"
						label="Email"
						type="email"
						value={formDetails.email}
						onChange={handleChange}
						error={!!errors.email}
						helperText={errors.email}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						sx={{ width: "400px" }}
						name="password"
						label="Password"
						type="password"
						value={formDetails.password}
						onChange={handleChange}
						error={!!errors.password}
						helperText={errors.password}
					/>
				</Grid>

				<Grid item xs={12}>
					<Box sx={{ width: "820px", mx: "auto" }}>
						<Button
							fullWidth
							variant="outlined"
							startIcon={<PersonAddAltIcon />}
							onClick={() => navigate("/register")}
						>
							Sign Up
						</Button>
					</Box>
				</Grid>
			</Grid>
		</Form>
	);
}

export default LoginFormDesktop;
