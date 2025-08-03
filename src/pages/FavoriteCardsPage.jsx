import React, { useEffect, useState, useCallback } from "react";
import { Container } from "@mui/material";
import axios from "axios";
import { getToken } from "../users/services/localStorageService";
import { useCurrentUser } from "../users/providers/UserProvider";
import { useSnack } from "../providers/SnackBarProvider";
import BCards from "../cards/components/BCards";
import ENDPOINTS from "../api/endpoints";
import PageHeader from "../components/PageHeader"; // <-- import PageHeader

function FavoriteCardsPage() {
  const [favCards, setFavCards] = useState([]);
  const { user } = useCurrentUser();
  const setSnack = useSnack();

  const fetchFavoriteCards = async () => {
    try {
      const token = getToken();
      const response = await axios.get(
        ENDPOINTS.cards.all,
        {
          headers: { "x-auth-token": token },
        }
      );
      const liked = response.data.filter(card =>
        card.likes.includes(user?._id)
      );
      setFavCards(liked);
      setSnack("success", "Favorite cards loaded.");
    } catch (error) {
      console.error("Failed to fetch cards:", error);
      setSnack("error", "Failed to load favorite cards.");
    }
  };

  useEffect(() => {
    fetchFavoriteCards();
  }, [user]);

  const handleToggleLike = useCallback(async (cardId) => {
    try {
      const token = getToken();
      const response = await axios.patch(
        ENDPOINTS.cards.toggleLike(cardId),
        {},
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      const updatedCard = response.data;
      if (!updatedCard.likes.includes(user?._id)) {
        setFavCards((prev) => prev.filter(card => card._id !== updatedCard._id));
        setSnack("info", "Card removed from favorites.");
      } else {
        setSnack("success", "Card added to favorites.");
      }
    } catch (err) {
      console.error("Like toggle failed", err);
      setSnack("error", "Failed to update favorite status.");
    }
  }, [user]);

  return (
    <Container sx={{ paddingBottom: 10 }}>
      <PageHeader
        title="Favorite Cards"
        description="View and manage the cards you have liked."
      />
      <BCards
        cards={favCards}
        setCards={setFavCards}
        onToggleLike={handleToggleLike}
        user={user}
      />
    </Container>
  );
}

export default FavoriteCardsPage;
