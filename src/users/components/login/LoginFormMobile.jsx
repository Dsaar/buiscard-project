// LoginFormMobile.jsx
import {
	TextField,
	Grid,
	Box,
	Button
} from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useNavigate } from "react-router-dom";
import Form from "../../../components/Form";

function LoginFormMobile({ formDetails, errors, handleChange, handleSubmit }) {
	const navigate = useNavigate();

	return (
		<Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "100vh", py: 4 }}>
			<Form
				onSubmit={handleSubmit}
				onReset={() => { }}
				title="Sign In Form"
				styles={{ maxWidth: "100%" }}
			>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
						sx={{width:'320px'}}
							fullWidth
							name="email"
							label="Email"
							type="email"
							value={formDetails.email}
							onChange={handleChange}
							error={!!errors.email}
							helperText={errors.email}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							sx={{ width: '320px' }}
							fullWidth
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
						<Button
							sx={{ width: '320px' }}
							fullWidth
							variant="outlined"
							startIcon={<PersonAddAltIcon />}
							onClick={() => navigate("/register")}
						>
							Sign Up
						</Button>
					</Grid>
				</Grid>
			</Form>
		</Box>
	);
}

export default LoginFormMobile;
