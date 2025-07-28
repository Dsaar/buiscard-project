import React, { useEffect, useState } from 'react';
import { AppBar, Box, Toolbar, Button, TextField, IconButton, Avatar } from '@mui/material';
import NavLinkTemplate from '/src/components/NavLinkTemplate';
import ROUTES from '../../router/routesDictionary';
import { useTheme } from '../../providers/CustomThemeProvider';
import { useCurrentUser } from '../../users/providers/UserProvider';
import { removeToken } from '../../users/services/localStorageService';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getUserById } from '../../users/services/userService';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';


function Header() {
	const { toggleMode, isDark } = useTheme();
	const { user, setUser, setToken } = useCurrentUser();
	const [fullUser, setFullUser] = useState(null);
	const navigate = useNavigate();
	const [query, setQuery] = useState("");
	const [searchParams, setSearchParams] = useSearchParams();

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

	return (
		<AppBar position="sticky" color="primary" elevation={10}>
			<Toolbar>
				<Box sx={{ display: 'flex', flexGrow: 1, gap: 2 }}>
					<NavLinkTemplate to={ROUTES.root} label="Home" />
					<NavLinkTemplate to={ROUTES.about} label="About" />
					<NavLinkTemplate to={ROUTES.myCards} label="My Card" />
					<NavLinkTemplate to={ROUTES.favorite} label="Favorite Card" />
					<NavLinkTemplate to={ROUTES.sandbox} label="Sandbox" />
				</Box>

				<TextField
					placeholder="Search"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					size="small"
					sx={{ bgcolor: 'white', borderRadius: 1 }}
				/>

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

					{user ? (
						<Button onClick={handleLogout} sx={{ color: 'white' }}>
							Logout
						</Button>
					) : (
						<>
							<NavLinkTemplate to={ROUTES.register} label="SIGNUP" />
							<NavLinkTemplate to={ROUTES.login} label="LOGIN" />
						</>
					)}

					<IconButton onClick={toggleMode} sx={{ color: 'white' }}>
						{isDark ? <LightModeIcon /> : <DarkModeIcon />}
					</IconButton>

				</Box>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
