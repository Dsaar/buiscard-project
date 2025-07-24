import React, { useEffect, useState } from 'react';
import {
	Container, Typography, Divider, Box, CircularProgress, TextField,
	Button, Grid,
} from '@mui/material';
import { getUserById } from '../users/services/userService';
import { useCurrentUser } from '../users/providers/UserProvider';
import { getToken } from '../users/services/localStorageService';
import axios from 'axios';
import ENDPOINTS from '../api/endpoints';

function UserProfilePage() {
	const { user } = useCurrentUser();
	const [details, setDetails] = useState(null);
	const [editMode, setEditMode] = useState(false);
	const [formData, setFormData] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (user && user._id) {
			getUserById(user._id)
				.then(data => {
					setDetails(data);
					setFormData({
						first: data.name.first,
						middle: data.name.middle,
						last: data.name.last,
						email: data.email,
						phone: data.phone,
					});
				})
				.catch((err) => console.error("Failed to fetch user details:", err))
				.finally(() => setLoading(false));
		} else {
			console.warn("User or user._id is undefined. Skipping fetch.");
			setLoading(false);
		}
	}, [user]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSave = async () => {
		try {
			const token = getToken();
			const updatedUser = {
				name: {
					first: formData.first,
					middle: formData.middle,
					last: formData.last,
				},
				phone: formData.phone,
				email: formData.email,
			};

			await axios.put(`${ENDPOINTS.users.all}/${user._id}`, updatedUser, {
				headers: { 'x-auth-token': token },
			});

			setDetails((prev) => ({
				...prev,
				...updatedUser,
			}));
			setEditMode(false);
		} catch (err) {
			console.error('Failed to update user:', err);
			alert('Update failed.');
		}
	};

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
		<Container sx={{ mt: 5 }}>
			<Typography variant="h4" gutterBottom>User Profile</Typography>
			<Divider sx={{ mb: 3 }} />

			{editMode ? (
				<Box component="form" sx={{ mt: 2 }}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={4}>
							<TextField
								label="First Name"
								name="first"
								value={formData.first}
								onChange={handleChange}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<TextField
								label="Middle Name"
								name="middle"
								value={formData.middle}
								onChange={handleChange}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<TextField
								label="Last Name"
								name="last"
								value={formData.last}
								onChange={handleChange}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								label="Email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								label="Phone"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								fullWidth
							/>
						</Grid>
					</Grid>

					<Box mt={3} display="flex" gap={2}>
						<Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
						<Button variant="outlined" onClick={() => setEditMode(false)}>Cancel</Button>
					</Box>
				</Box>
			) : (
				<Box sx={{ lineHeight: 2 }}>
					<Typography><strong>First Name:</strong> {details.name.first}</Typography>
					<Typography><strong>Middle Name:</strong> {details.name.middle}</Typography>
					<Typography><strong>Last Name:</strong> {details.name.last}</Typography>
					<Typography><strong>Email:</strong> {details.email}</Typography>
					<Typography><strong>Phone:</strong> {details.phone}</Typography>
					<Typography><strong>Admin:</strong> {details.isAdmin ? 'Yes' : 'No'}</Typography>
					<Typography><strong>Business:</strong> {details.isBusiness ? 'Yes' : 'No'}</Typography>
					<Typography><strong>ID:</strong> {details._id}</Typography>
					<Box mt={2}>
						<Button variant="outlined" onClick={() => setEditMode(true)}>Edit Profile</Button>
					</Box>
				</Box>
			)}
		</Container>
	);
}

export default UserProfilePage;
