import React, { useEffect, useState, useCallback } from 'react';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import BCards from '../cards/components/Bcards';
import { getToken } from '../users/services/localStorageService';
import { useSnack } from '../providers/SnackBarProvider';
import { useCurrentUser } from '../users/providers/UserProvider';
import ENDPOINTS from '../api/endpoints';

function MyCardsPage() {
  const [myCards, setMyCards] = useState([]);
  const setSnack = useSnack();
  const { user } = useCurrentUser();

  const fetchMyCards = async () => {
    try {
      const token = getToken();
      const response = await axios.get(
        ENDPOINTS.cards.myCards,
        { headers: { 'x-auth-token': token } }
      );
      setMyCards(response.data);
      setSnack("success", "Your cards loaded successfully.");
    } catch (err) {
      console.error('Failed to load your cards', err);
      setSnack("error", "Failed to load your cards.");
    }
  };

  useEffect(() => {
    fetchMyCards();
  }, []);

  const handleToggleLike = useCallback(async (cardId) => {
    try {
      const token = getToken();
      await axios.patch(
        ENDPOINTS.cards.toggleLike(cardId),
        {},
        { headers: { 'x-auth-token': token } }
      );
      setMyCards((prev) =>
        prev.map((card) =>
          card._id === cardId
            ? {
              ...card,
              likes: card.likes.includes(user._id)
                ? card.likes.filter((id) => id !== user._id)
                : [...card.likes, user._id],
            }
            : card
        )
      );
      setSnack("success", "Card like status updated.");
    } catch (err) {
      console.error("Like toggle failed", err);
      setSnack("error", "Failed to like card.");
    }
  }, [user]);

  return (
    <Container sx={{ paddingBottom: 10 }}>
      <Typography variant="h4" gutterBottom>
        My Cards
      </Typography>
      <BCards cards={myCards} setCards={setMyCards} onToggleLike={handleToggleLike} user={user} />
    </Container>
  );
}

export default MyCardsPage;
