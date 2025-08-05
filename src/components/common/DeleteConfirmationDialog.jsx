import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

export default function DeleteConfirmationDialog({ open, onClose, onConfirm }) {
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Confirm Account Deletion</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Are you sure you want to delete your account? This action cannot be undone.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="primary">
					Cancel
				</Button>
				<Button onClick={onConfirm} color="error" variant="contained">
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
}
