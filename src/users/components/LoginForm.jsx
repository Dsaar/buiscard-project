import {
	TextField,
	Grid,
	Box,
	Button,
} from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LoopIcon from "@mui/icons-material/Loop";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import useForm from "../../hooks/useForm";
import loginSchema from "../models/loginSchema";
import initialLoginForm from "../helpers/initialForms/initialLogInForm";
import { getUser, setTokenInLocalStorage } from "../services/localStorageService";
import { useCurrentUser } from "../providers/UserProvider";
import Form from "../../components/Form";
import { useSnack } from '../../providers/SnackBarProvider'
import ENDPOINTS from "../../api/endpoints";

function LoginForm() {
	const { user, setUser, setToken } = useCurrentUser();
	const navigate = useNavigate();

	const setSnack = useSnack();

	const handleLogin = async (credentials) => {
		const failedAttempts = parseInt(localStorage.getItem("failedLoginAttempts")) || 0;
		const lockedUntil = localStorage.getItem("loginLockedUntil");

		// Check lockout
		if (lockedUntil && Date.now() < parseInt(lockedUntil)) {
			const minutesLeft = Math.ceil((parseInt(lockedUntil) - Date.now()) / 60000);
			setSnack("error", `You are locked out. Try again in ${minutesLeft} minute(s).`);
			return;
		}

		try {
			const response = await axios.post(
				ENDPOINTS.users.login,
				credentials
			);

			// Reset attempts on success
			localStorage.removeItem("failedLoginAttempts");
			localStorage.removeItem("loginLockedUntil");

			setTokenInLocalStorage(response.data);
			setToken(response.data);
			setUser(getUser());
			navigate("/");
		} catch (error) {
			const newAttempts = failedAttempts + 1;
			localStorage.setItem("failedLoginAttempts", newAttempts);

			if (newAttempts >= 3) {
				const lockUntil = Date.now() + 15 * 60 * 1000; // 15 minutes
				localStorage.setItem("loginLockedUntil", lockUntil);
				setSnack("error", "Too many failed attempts. You are locked out for 15 minutes.");
			} else {
				setSnack("error", `Login failed. You have ${3 - newAttempts} attempt(s) left.`);
			}
		}
	};

	const { formDetails, errors, handleChange, handleSubmit } = useForm(
		initialLoginForm,
		loginSchema,
		handleLogin
	);

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

export default LoginForm;
