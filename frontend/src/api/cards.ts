import type { SortField, SortOrder } from "../constants/constants";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function getCards(
  sort?: SortField,
  order?: SortOrder
) {
  let url = `${API_BASE_URL}/api/cards`;
  if (sort) {
    url += `?sort=${sort}`;
  }

  if (order) {
    url += `&order=${order}`;
  }

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Error fetching cards: ${res.statusText}`);
  }

  return res.json();
}

export async function incrementClick(cardId: number) {
  const res = await fetch(`${API_BASE_URL}/api/cards/${cardId}/click`, {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error(`Error incrementing click: ${res.statusText}`);
  }

  return res.json();
}

export async function resetCards() {
  const res = await fetch(`${API_BASE_URL}/api/cards/reset`, {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error(`Error incrementing click: ${res.statusText}`);
  }

  return res.json();
}
