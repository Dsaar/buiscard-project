import React, { useEffect, useState } from 'react';
import {
	AppBar,
	Box,
	Toolbar,
	Button,
	TextField,
	IconButton,
	Avatar,
	Drawer,
	List,
	ListItemButton,
	ListItemText,
	useMediaQuery,
	useTheme as useMuiTheme,
	Divider
} from '@mui/material';
import NavLinkTemplate from '/src/components/NavLinkTemplate';
import ROUTES from '../../router/routesDictionary';
import { useTheme } from '../../providers/CustomThemeProvider';
import { useCurrentUser } from '../../users/providers/UserProvider';
import { removeToken } from '../../users/services/localStorageService';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import { getUserById } from '../../users/services/userService';

function Header() {
	const { toggleMode, isDark } = useTheme();
	const { user, setUser, setToken } = useCurrentUser();
	const [fullUser, setFullUser] = useState(null);
	const navigate = useNavigate();
	const [query, setQuery] = useState("");
	const [searchParams, setSearchParams] = useSearchParams();
	const muiTheme = useMuiTheme();
	const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
	const [drawerOpen, setDrawerOpen] = useState(false);

	useEffect(() => {
		setSearchParams({ q: query });
	}, [query]);

	// Fetch full user profile when Header mounts or user changes
	useEffect(() => {
		const fetchUser = async () => {
			if (user?._id) {
				try {
					const fullData = await getUserById(user._id);
					setFullUser(fullData);
				} catch (err) {
					console.error("Failed to load full user profile:", err);
				}
			} else {
				setFullUser(null);
			}
		};
		fetchUser();
	}, [user]);

	const handleLogout = () => {
		removeToken();
		setUser(null);
		setToken(null);
		setFullUser(null);
		navigate('/');
	};

	// Build navigation links dynamically based on user type
	const getNavLinks = () => {
		const links = [
			{ to: ROUTES.root, label: 'Home' },
			{ to: ROUTES.about, label: 'About' }
		];

		if (!user) return links; // Only Home + About if no user


		// Show My Card for business OR admin
		if (user.isBusiness || user.isAdmin) {
			links.push({ to: ROUTES.myCards, label: 'My Card' });
		}
		
		links.push({ to: ROUTES.favorite, label: 'Favorite Card' });

		// Show Sandbox only for admin
		if (user.isAdmin) {
			links.push({ to: ROUTES.sandbox, label: 'Sandbox' });
		}

		return links;
	};


	// Drawer content for mobile
	const drawerContent = (
		<Box sx={{ width: 250, p: 2 }}>
			<TextField
				placeholder="Search"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				fullWidth
				size="small"
				sx={{ mb: 2 }}
			/>
			<Divider sx={{ mb: 2 }} />
			<List>
				{getNavLinks().map((link) => (
					<ListItemButton
						key={link.to}
						onClick={() => {
							navigate(link.to);
							setDrawerOpen(false);
						}}
					>
						<ListItemText primary={link.label} />
					</ListItemButton>
				))}
			</List>
			<Divider sx={{ my: 2 }} />
			{user ? (
				<Button onClick={handleLogout} fullWidth variant="outlined">
					Logout
				</Button>
			) : (
				<Box>
					<Button onClick={() => navigate(ROUTES.register)} fullWidth variant="contained" sx={{ mb: 1 }}>
						SIGNUP
					</Button>
					<Button onClick={() => navigate(ROUTES.login)} fullWidth variant="outlined">
						LOGIN
					</Button>
				</Box>
			)}
		</Box>
	);

	return (
		<AppBar position="sticky" color="primary" elevation={10}>
			<Toolbar>
				{isMobile ? (
					<>
						<IconButton onClick={() => setDrawerOpen(true)} sx={{ color: 'white' }}>
							<MenuIcon />
						</IconButton>
						<Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
							{drawerContent}
						</Drawer>
					</>
				) : (
					<Box sx={{ display: 'flex', flexGrow: 1, gap: 2 }}>
						{getNavLinks().map((link) => (
							<NavLinkTemplate key={link.to} to={link.to} label={link.label} />
						))}
					</Box>
				)}

				{!isMobile && (
					<TextField
						placeholder="Search"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						size="small"
						sx={{ bgcolor: 'white', borderRadius: 1 }}
					/>
				)}

				<Box sx={{ display: 'flex', gap: 1, alignItems: 'center', ml: 2 }}>
					{user && (
						<IconButton onClick={() => navigate(ROUTES.profile)}>
							{fullUser?.image?.url ? (
								<Avatar
									src={fullUser.image.url}
									alt={fullUser.image.alt || 'Profile'}
									sx={{ width: 40, height: 40 }}
								/>
							) : (
								<AccountCircleIcon sx={{ color: 'white', fontSize: 40 }} />
							)}
						</IconButton>
					)}

					{/* Always show login/logout actions */}
					{user ? (
						<Button onClick={handleLogout} sx={{ color: 'white' }}>
							Logout
						</Button>
					) : (
						<>
							<Button onClick={() => navigate(ROUTES.register)} sx={{ color: 'white' }}>
								SIGNUP
							</Button>
							<Button onClick={() => navigate(ROUTES.login)} sx={{ color: 'white' }}>
								LOGIN
							</Button>
						</>
					)}

					{/* Theme toggle icon */}
					<IconButton onClick={toggleMode} sx={{ color: 'white' }}>
						{isDark ? <LightModeIcon /> : <DarkModeIcon />}
					</IconButton>
				</Box>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
