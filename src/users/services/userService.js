export const getUserById = async (userId) => {
	const token = getToken();
	if (!token) throw new Error("No token found");

	const response = await axios.get(
		`${ENDPOINTS.users.all}/${userId}`,
		{
			headers: { 'x-auth-token': token },
		}
	);
	return response.data;
};
