import React, { useState } from 'react';
import BCard from './BCard';
import { Box, Grid, Typography, TablePagination } from '@mui/material';

function BCards({ cards, setCards, onToggleLike, user }) {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(6);

	// Guard against invalid cards
	if (!Array.isArray(cards) || cards.length === 0) {
		return (
			<Box>
				<Typography>No cards to show</Typography>
			</Box>
		);
	}

	const handleDelete = (cardId) => {
		setCards((prev) => prev.filter((card) => card._id !== cardId));
	};

	const paginatedCards = cards.slice(
		page * rowsPerPage,
		page * rowsPerPage + rowsPerPage
	);

	return (
		<Box>
			<Grid container spacing={3} justifyContent="center" alignItems="stretch">
				{paginatedCards.map((card) => (
					<Grid item key={card._id} xs={12} sm={6} md={4} lg={3} display="flex">
						<BCard
							card={card}
							onDelete={handleDelete}
							toggleLike={onToggleLike}
							isLiked={user ? card.likes.includes(user._id) : false}
						/>
					</Grid>
				))}
			</Grid>
			<Box display="flex" justifyContent="center" mt={4}>
				<TablePagination
					component="div"
					count={cards.length}
					page={page}
					onPageChange={(e, newPage) => setPage(newPage)}
					rowsPerPage={rowsPerPage}
					onRowsPerPageChange={(e) => {
						setRowsPerPage(parseInt(e.target.value, 10));
						setPage(0);
					}}
					rowsPerPageOptions={[6, 12, 24]}
				/>
			</Box>
		</Box>
	);
}

export default BCards;
