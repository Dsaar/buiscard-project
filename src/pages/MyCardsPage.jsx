import React, { useEffect, useState, useCallback } from 'react';
import { Container } from '@mui/material';
import axios from 'axios';
import BCards from '../cards/components/BCards';
import { getToken } from '../users/services/localStorageService';
import { useSnack } from '../providers/SnackBarProvider';
import { useCurrentUser } from '../users/providers/UserProvider';
import ENDPOINTS from '../api/endpoints';
import PageHeader from '../components/PageHeader'; 
import { useSearchParams } from 'react-router-dom';

function MyCardsPage() {
  const [myCards, setMyCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const setSnack = useSnack();
  const { user } = useCurrentUser();
  const [searchParams]=useSearchParams();

  const fetchMyCards = async () => {
    try {
      const token = getToken();
      const response = await axios.get(
        ENDPOINTS.cards.myCards,
        { headers: { 'x-auth-token': token } }
      );
      setMyCards(response.data);
      setFilteredCards(response.data);
      setSnack("success", "Your cards loaded successfully.");
    } catch (err) {
      console.error('Failed to load your cards', err);
      setSnack("error", "Failed to load your cards.");
    }
  };

  useEffect(() => {
    fetchMyCards();
  }, []);

  useEffect(() => {
    const q = searchParams.get("q")?.toLowerCase() || "";
    setFilteredCards(
      myCards.filter((card) =>
        card.title.toLowerCase().includes(q) ||
        card.subtitle.toLowerCase().includes(q) ||
        card.description.toLowerCase().includes(q)
      )
    );
  }, [searchParams, myCards]);


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
      <PageHeader
        title="My Cards"
        description="Manage and review all the cards you have created."
      />
      <BCards
        cards={filteredCards}
        setCards={setMyCards}
        onToggleLike={handleToggleLike}
        user={user}
      />
    </Container>
  );
}

export default MyCardsPage;
