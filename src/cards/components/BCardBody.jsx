import { CardContent, Divider, Typography } from "@mui/material";

function BCardBody({ title, subtitle, phone, city, bizNumber }) {
	return (
		<CardContent>
			<Typography variant="h5">{title}</Typography>
			<Typography variant="h6">{subtitle}</Typography>
			<Divider sx={{ marginY: 1 }} />
			<Typography variant="body2">
				<strong>Phone:</strong> {phone}
			</Typography>
			<Typography variant="body2">
				<strong>Address:</strong> {city}
			</Typography>
			<Typography variant="body2">Card Number: {bizNumber}</Typography>
		</CardContent>
	);
}

export default BCardBody;