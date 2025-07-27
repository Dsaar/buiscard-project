import React, { useEffect, useState } from 'react';
import {
	Container,
	Typography,
	Divider,
	Box,
	CircularProgress,
	Button,
	Avatar
} from '@mui/material';
import { getUserById } from '../users/services/userService';
import { useCurrentUser } from '../users/providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../router/routesDictionary';

function UserProfilePage() {
	const { user } = useCurrentUser();
	const [details, setDetails] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		if (user && user._id) {
			getUserById(user._id)
				.then(setDetails)
				.catch((err) => console.error('Failed to fetch user details:', err))
				.finally(() => setLoading(false));
		} else {
			setLoading(false);
		}
	}, [user]);

	if (loading) {
		return (
			<Box display="flex" justifyContent="center" mt={5}>
				<CircularProgress />
			</Box>
		);
	}

	if (!details) {
		return (
			<Container sx={{ mt: 5 }}>
				<Typography color="error">Unable to load user details.</Typography>
			</Container>
		);
	}

	return (
		<Container>
			<Typography variant="h4" gutterBottom>User Profile</Typography>
			<Divider sx={{ mb: 3 }} />

			{/* Avatar */}
			<Box display="flex" justifyContent="center" mb={3}>
				<Avatar
					src={details.image?.url}
					alt={details.image?.alt || `${details.name.first} ${details.name.last}`}
					sx={{ width: 120, height: 120, border: '2px solid #ccc' }}
				>
					{(!details.image?.url && details.name.first && details.name.last) &&
						`${details.name.first[0]}${details.name.last[0]}`}
				</Avatar>
			</Box>

			<Box sx={{ lineHeight: 2 }}>
				<Typography><strong>First Name:</strong> {details.name.first}</Typography>
				<Typography><strong>Middle Name:</strong> {details.name.middle}</Typography>
				<Typography><strong>Last Name:</strong> {details.name.last}</Typography>
				<Typography><strong>Email:</strong> {details.email}</Typography>
				<Typography><strong>Phone:</strong> {details.phone}</Typography>
				<Typography><strong>Admin:</strong> {details.isAdmin ? 'Yes' : 'No'}</Typography>
				<Typography><strong>Business:</strong> {details.isBusiness ? 'Yes' : 'No'}</Typography>
				<Typography><strong>ID:</strong> {details._id}</Typography>
			</Box>

			<Box mt={3}>
				<Button
					variant="outlined"
					onClick={() => navigate(ROUTES.profileEdit)}
				>
					Edit Profile
				</Button>
			</Box>
		</Container>
	);
}

export default UserProfilePage;
