import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormButton from "./FormButton";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import LoopIcon from "@mui/icons-material/Loop";

const Form = ({
	title = "",
	onSubmit,
	onReset,
	to = "/",
	color = "inherit",
	spacing = 2,
	styles = {},
	children,
}) => {
	const navigate = useNavigate();

	return (
		<Box
			component="form"
			color={color}
			sx={{
				mt: 2,
				p: { xs: 2, sm: 4 },
				width: "100%",
				maxWidth: "900px",
				...styles,
			}}
			onSubmit={onSubmit}
			autoComplete="off"
			noValidate
		>
			<Typography align="center" variant="h5" component="h1" mb={3}>
				{title.toUpperCase()}
			</Typography>

			<Grid container spacing={spacing}>
				{children}
			</Grid>

			<Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
				<Grid item xs={12} sm={6}>
					<Box sx={{ width: '400px', mx: 'auto' }}>
						<FormButton
							node="CANCEL"
							color="error"
							variant="outlined"
							onClick={() => navigate(to)}
							fullWidth
						/>
					</Box>
				</Grid>

				<Grid item xs={12} sm={6}>
					<Box sx={{ width: '400px', mx: 'auto' }}>
						<FormButton
							node={<LoopIcon />}
							variant="outlined"
							onClick={onReset}
							fullWidth
						/>
					</Box>
				</Grid>

				<Grid item xs={12}>
					<Box sx={{ width: '820px', mx: 'auto' }}>
						<FormButton
							node="SUBMIT"
							onClick={onSubmit}
							size="large"
							fullWidth
						/>
					</Box>
				</Grid>

			</Grid>

		</Box>
	);
};

export default Form;
