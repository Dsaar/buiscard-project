import AddIcon from "@mui/icons-material/Add";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddNewItemButton({
	to,
	setIsDialogOpen,
	actionFunc,
	text = "",
	sx = {},
	background = "#FFA600",
	backgroundHover = "#e59500",
}) {
	const [buttonSize, setButtonSize] = useState(64);
	const navigate = useNavigate();

	useEffect(() => {
		const newSize = Math.max(80, text.length * 8 + 40);
		setButtonSize(newSize);
	}, [text]);

	const handleClick = () => {
		if (to) {
			navigate(to);
		} else if (setIsDialogOpen) {
			setIsDialogOpen(true);
		} else if (actionFunc) {
			actionFunc();
		} else {
			console.error("You must provide a navigation path, actionFunc, or setIsDialogOpen.");
		}
	};

	return (
		<Button
			aria-label="add"
			variant="contained"
			sx={{
				position: "fixed",
				bottom: 75,
				right: 40,
				background: background,
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				width: `${buttonSize}px`,
				height: `${buttonSize}px`,
				borderRadius: "50%",
				padding: "10px",
				boxSizing: "border-box",
				"&:hover": {
					backgroundColor: backgroundHover,
					cursor: "pointer",
				},
				zIndex: 10000000,
				...sx,
			}}
			onClick={handleClick}
		>
			<AddIcon style={{ color: "white" }} />
			<Typography style={{ color: "white" }}>{text}</Typography>
		</Button>
	);
}

export default AddNewItemButton;
