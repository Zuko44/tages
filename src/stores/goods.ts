import { ref, onMounted } from 'vue';
import { defineStore } from 'pinia';
import type { Product } from '../types/index';

export const useGoodsStore = defineStore('goodsStore', () => {
  const goodsFavorites = ref<Product[]>([]);
  const goodsInBox = ref<Product[]>([]);

  const saveGoodToFavoritesHandler = (good: Product) => {
    if (!favoritesContainsGood(good.id)) {
      goodsFavorites.value.push(good);
    }
    saveInFavorites();
  };

  const saveGoodToBoxHandler = (good: Product) => {
    if (!boxContainsGood(good.id)) {
      goodsInBox.value.push(good);
    }
    saveInBox();
  };

  const favoritesContainsGood = (id: string) => {
    return goodsFavorites.value.find((good: Product) => good.id === id);
  };

  const boxContainsGood = (id: string) => {
    return goodsInBox.value.find((good: Product) => good.id === id);
  };

  const deleteInFavoritesHandler = (id: string) => {
    goodsFavorites.value = goodsFavorites.value.filter(
      (good) => good.id !== id,
    );
    saveInFavorites();
  };

  const deleteInBoxHandler = (id: string) => {
    goodsInBox.value = goodsInBox.value.filter((good) => good.id !== id);
    saveInBox();
  };

  const saveInFavorites = () => {
    const parsedFavorites = JSON.stringify(goodsFavorites.value);
    localStorage.setItem('favorites', parsedFavorites);
  };

  const saveInBox = () => {
    const parsedBox = JSON.stringify(goodsInBox.value);
    localStorage.setItem('box', parsedBox);
  };

  const getAndSetGoodsFromLocalStorage = () => {
    const favoritesOnLocalStorage = localStorage.getItem('favorites');
    const boxOnLocalStorage = localStorage.getItem('box');
    let goodsFavoritesStorage: Product[] = [];
    let goodsBoxStorage: Product[] = [];

    if (favoritesOnLocalStorage !== null) {
      goodsFavoritesStorage = JSON.parse(favoritesOnLocalStorage);
      goodsFavorites.value = goodsFavoritesStorage;
    }
    if (boxOnLocalStorage !== null) {
      goodsBoxStorage = JSON.parse(boxOnLocalStorage);
      goodsInBox.value = goodsBoxStorage;
    }
  };

  onMounted(() => {
    getAndSetGoodsFromLocalStorage();
  });

  return {
    saveGoodToFavoritesHandler,
    saveGoodToBoxHandler,
    deleteInFavoritesHandler,
    deleteInBoxHandler,
    favoritesContainsGood,
    boxContainsGood,
  };
});
