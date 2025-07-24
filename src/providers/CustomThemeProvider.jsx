import { createContext, useContext, useState } from "react";
import {
	createTheme,
	ThemeProvider,
	CssBaseline,
	GlobalStyles,
} from "@mui/material";

// Step 1: create the context
const ThemeContext = createContext();

// Step 2: create the provider
export default function CustomThemeProvider({ children }) {
	const [isDark, setIsDark] = useState(false);

	const toggleMode = () => {
		setIsDark((prev) => !prev);
	};

	const theme = createTheme({
		palette: {
			mode: isDark ? "dark" : "light",
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<GlobalStyles
				styles={{
					"*": {
						margin: 0,
						padding: 0,
						boxSizing: "border-box",
					},
				}}
			/>
			<ThemeContext.Provider value={{ toggleMode, isDark }}>
				{children}
			</ThemeContext.Provider>
		</ThemeProvider>
	);
}

// Step 3: create custom hook for using the context (optional)
export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a provider");
	}
	return context;
};
