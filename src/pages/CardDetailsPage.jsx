import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
	Box,
	Typography,
	Grid,
	Paper,
	Divider,
	CircularProgress,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ENDPOINTS from '../api/endpoints';
import { getToken } from '../users/services/localStorageService';
import { useSnack } from '../providers/SnackBarProvider';
import { useCurrentUser } from '../users/providers/UserProvider';

function CardDetailsPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { user } = useCurrentUser();
	const [card, setCard] = useState(null);
	const [loading, setLoading] = useState(true);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const setSnack = useSnack();

	useEffect(() => {
		const fetchCard = async () => {
			try {
				const response = await axios.get(ENDPOINTS.cards.single(id));
				setCard(response.data);
			} catch (error) {
				console.error('Error fetching card:', error);
				setSnack('error', 'Failed to load card.');
			} finally {
				setLoading(false);
			}
		};

		fetchCard();
	}, [id, setSnack]);

	const handleDelete = async () => {
		try {
			const token = getToken();
			await axios.delete(ENDPOINTS.cards.single(id), {
				headers: { 'x-auth-token': token },
			});
			setSnack('success', 'Card deleted successfully.');
			setDeleteDialogOpen(false);
			navigate('/');
		} catch (error) {
			console.error('Delete failed:', error);
			setSnack('error', 'Failed to delete card.');
		}
	};

	const isOwner = user && card && (user._id === card.user_id || user._id === card.userId);

	if (loading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
				<CircularProgress />
			</Box>
		);
	}

	if (!card) {
		return (
			<Typography variant="h6" align="center" sx={{ mt: 5 }}>
				Card not found.
			</Typography>
		);
	}

	return (
		<Box
			sx={{
				p: 3,
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{/* Top Buttons */}
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					width: '100%',
					maxWidth: '1000px',
					mb: 2,
				}}
			>
				<Button
					variant="outlined"
					startIcon={<ArrowBackIcon />}
					onClick={() => navigate('/')}
				>
					Back to Cards
				</Button>
				{isOwner && (
					<Box>
						<Button
							variant="contained"
							color="primary"
							sx={{ mr: 1 }}
							startIcon={<EditIcon />}
							onClick={() => navigate(`/edit-card/${id}`)}
						>
							Edit
						</Button>
						<Button
							variant="outlined"
							color="error"
							startIcon={<DeleteIcon />}
							onClick={() => setDeleteDialogOpen(true)}
						>
							Delete
						</Button>
					</Box>
				)}
			</Box>

			{/* Main Card */}
			<Paper elevation={4} sx={{ p: 4, borderRadius: 3, maxWidth: '1000px', width: '100%' }}>
				<Typography variant="h4" align="center" gutterBottom>
					{card.title}
				</Typography>

				<Typography variant="subtitle1" align="center" color="text.secondary" gutterBottom>
					{card.subtitle}
				</Typography>

				<Divider sx={{ my: 3 }} />

				<Grid container spacing={3}>
					<Grid item xs={12} md={6}>
						<Typography variant="h6" gutterBottom>
							Contact Info
						</Typography>
						<Typography><b>Phone:</b> {card.phone}</Typography>
						<Typography><b>Email:</b> {card.email}</Typography>
						<Typography><b>Website:</b> {card.web}</Typography>
					</Grid>

					<Grid item xs={12} md={6}>
						<Typography variant="h6" gutterBottom>
							Address
						</Typography>
						<Typography><b>Street:</b> {card.address?.street}</Typography>
						<Typography><b>City:</b> {card.address?.city}</Typography>
						<Typography><b>Country:</b> {card.address?.country}</Typography>
						<Typography><b>Zip:</b> {card.address?.zip}</Typography>
					</Grid>

					<Grid item xs={12} md={6}>
						<Typography variant="h6" gutterBottom>
							Business Info
						</Typography>
						<Typography><b>Business Number:</b> {card.bizNumber}</Typography>
						<Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
							<FavoriteIcon color="error" sx={{ mr: 1 }} />
							<Typography>{card.likes?.length || 0} Likes</Typography>
						</Box>
						<Typography sx={{ mt: 2 }}><b>Description:</b> {card.description}</Typography>
					</Grid>

					<Grid item xs={12} md={6}>
						<Box
							component="img"
							src={card.image?.url}
							alt={card.image?.alt || 'Card image'}
							sx={{
								width: '100%',
								borderRadius: 2,
								boxShadow: 3,
								objectFit: 'cover',
								maxHeight: 300,
							}}
						/>
					</Grid>
				</Grid>
			</Paper>

			{/* Delete Confirmation Dialog */}
			<Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
				<DialogTitle>Delete this card?</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Are you sure you want to delete this card? This action cannot be undone.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
					<Button onClick={handleDelete} color="error" autoFocus>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
}

export default CardDetailsPage;
