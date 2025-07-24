import React from 'react';
import { AppBar, Box, Toolbar, Button, TextField, IconButton } from '@mui/material';
import NavLinkTemplate from '/src/components/NavLinkTemplate';
import ROUTES from '../../router/routesDictionary';
import { useTheme } from '../../providers/CustomThemeProvider';
import { useEffect, useState } from "react";
import { useCurrentUser } from '../../users/providers/UserProvider';
import { removeToken } from '../../users/services/localStorageService';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';



function Header() {
	const { toggleMode, isDark } = useTheme();
	const { user, setUser, setToken } = useCurrentUser();
	const navigate = useNavigate();
	const [query, setQuery] = useState("");
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		setSearchParams({ q: query });
	}, [query]);

	const handleLogout = () => {
		removeToken();
		setUser(null);
		setToken(null);
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
				/>

				<Box sx={{ display: 'flex', gap: 1, alignItems: 'center', ml: 2 }}>
					{user && (
						<IconButton sx={{ color: 'white' }} onClick={() => navigate(ROUTES.profile)}>
							<AccountCircleIcon />
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

					<Button onClick={toggleMode} sx={{ color: 'white' }}>
						{isDark ? 'Light' : 'Dark'} Mode
					</Button>
				</Box>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
