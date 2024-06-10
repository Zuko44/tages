<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Product, Materials } from '../types/index';
import items from '../sources/items.json';
import materials from '../sources/materials.json';
import { useGoodsStore } from '../stores/goods';

const goodsStore = useGoodsStore();
const container = ref<Product[]>(items);
const material = ref<Materials[]>(materials);
const selectedPrice = ref<string>('0');
const selectedMaterial = ref<string>('0');
const temporaryProductsStorage = ref<Product[]>(items);

const saveToBoxHandler = (id: string) => {
  const good = container.value.find((good: Product) => good.id === id);
  if (good) {
    goodsStore.saveGoodToBoxHandler(good);
  }
};

const saveToFavoritesHandler = (id: string) => {
  const good = container.value.find((good: Product) => good.id === id);
  if (good) {
    goodsStore.saveGoodToFavoritesHandler(good);
  }
};

const deleteFromBoxHandler = (id: string) => {
  goodsStore.deleteInBoxHandler(id);
};

const deleteFromFavoritesHandler = (id: string) => {
  goodsStore.deleteInFavoritesHandler(id);
};

const sortByAscendingPrice = () => {
  container.value.sort(
    (product1, product2) =>
      product1.price.current_price - product2.price.current_price,
  );
};

const sortByDescendingPrice = () => {
  container.value.sort(
    (product1, product2) =>
      product2.price.current_price - product1.price.current_price,
  );
};

const sortByPrice = () => {
  if (selectedPrice.value === '1') {
    sortByAscendingPrice();
  }
  if (selectedPrice.value === '2') {
    sortByDescendingPrice();
  }
};

const sortByMaterial = () => {
  container.value = temporaryProductsStorage.value;
  container.value = container.value.filter(
    (product) => product.material === Number(selectedMaterial.value),
  );
  sortByPrice();
};
</script>

<template>
  <div class="wrapper">
    <header class="header">
      <nav class="header__navigation">
        Главная / Системы хранения /
        <span class="header__bold">Комплекты стеллажных систем</span>
      </nav>
      <p class="header__title">Комплекты стеллажных систем</p>
    </header>
    <article class="filtr">
      <div class="filtr__left">
        <p class="paragraph-design">Сортировать по:</p>
        <select
          class="select-design"
          @change="sortByPrice"
          v-model="selectedPrice"
        >
          <option value="0" disabled hidden>Сортировка по цене</option>
          <option value="1">Цена по возрастанию</option>
          <option value="2">Цена по убыванию</option>
        </select>
      </div>
      <div class="filtr__right">
        <p class="paragraph-design">Материал:</p>
        <select
          class="select-design"
          @change="sortByMaterial"
          v-model="selectedMaterial"
        >
          <option value="0" disabled hidden>Сортировка по материалу</option>
          <option v-for="item in material" :key="item.id" :value="item.id">
            {{ item.name }}
          </option>
        </select>
      </div>
    </article>
    <main class="main-component">
      <article
        class="main-component__good"
        v-for="item in container"
        :key="item.id"
      >
        <div class="main-component__discount" v-if="item.code == 'L422WH'">
          Скидка
        </div>
        <div class="main-component__code" v-if="item.code != null">
          {{ item.code }}
        </div>
        <div class="main-component__title">{{ item.name }}</div>
        <img :src="item.image.url" alt="goods" />
        <div class="main-component__price">
          <span
            class="main-component__price-old"
            v-if="item.price.old_price != null"
            >{{ Math.round(item.price.old_price) }}</span
          >
          <span class="main-component__price-new">{{
            Math.round(item.price.current_price)
          }}</span>
        </div>
        <span
          v-if="!goodsStore.boxContainsGood(item.id)"
          @click="saveToBoxHandler(item.id)"
          class="main-component__icons-left"
          title="добавить в корзину"
        >
          <img src="../assets/icons/box.svg" alt="box" />
        </span>
        <span
          v-if="goodsStore.boxContainsGood(item.id)"
          @click="deleteFromBoxHandler(item.id)"
          class="main-component__icons-left"
          title="удалить из корзины"
        >
          <img src="../assets/icons/selected.svg" alt="box" />
        </span>
        <span
          v-if="!goodsStore.favoritesContainsGood(item.id)"
          @click="saveToFavoritesHandler(item.id)"
          class="main-component__icons-right"
          title="добавить в избранное"
        >
          <img src="../assets/icons/heart.svg" alt="favorites" />
        </span>
        <span
          v-if="goodsStore.favoritesContainsGood(item.id)"
          @click="deleteFromFavoritesHandler(item.id)"
          class="main-component__icons-right"
          title="удалить из избранного"
        >
          <img src="../assets/icons/selected.svg" alt="box" />
        </span>
      </article>
    </main>
  </div>
</template>

<style scoped>
.header__title {
  font-weight: 600;
  font-size: 36px;
  font-family: 'SFPro';
  line-height: 48px;
  color: rgba(0, 0, 0, 1);
  margin-top: 32px;
}

.header__navigation {
  font-weight: 400;
  font-size: 16px;
  font-family: 'SFUIText';
  line-height: 16px;
  margin-top: 32px;
}

.header__bold {
  font-weight: bold;
}

.filtr {
  display: flex;
  flex-direction: row;
  margin-top: 32px;
}

.filtr__right {
  margin-left: 24px;
}

@media (max-width: 650px) {
  .filtr {
    flex-direction: column;
  }
  .filtr__right {
    margin-left: 0px;
    margin-top: 16px;
  }
}

.select-design {
  width: 288px;
  height: 40px;
  background: rgba(242, 242, 242, 1);
  padding: 0px 16px;
}

option {
  margin-left: 16px;
}

.paragraph-design {
  font-family: 'SFPro';
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: rgba(79, 79, 79, 1);
  margin-left: 16px;
  margin-bottom: 3%;
}

.main-component {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.main-component__good {
  width: 336px;
  height: 352px;
  border: 1px solid rgba(238, 238, 238, 1);
  margin: 47px 48px 0px 0px;
  position: relative;
}

img {
  width: 238px;
  height: 237px;
  display: block;
  margin: 5px auto;
}

.main-component__discount {
  width: 81px;
  height: 24px;
  position: absolute;
  top: 8px;
  font-size: 14px;
  color: rgba(255, 255, 255, 1);
  background: rgba(235, 87, 87, 1);
  text-align: center;
}

.main-component__code {
  color: rgba(136, 136, 136, 1);
  font-family: 'SFUIText';
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  position: absolute;
  top: 269px;
  left: 12.19px;
}

.main-component__title {
  position: absolute;
  top: 290px;
  left: 12px;
  font-family: 'SFUIText';
  font-weight: 500;
  font-size: 16px;
  line-height: 22.4px;
  color: rgba(0, 0, 0, 1);
}

.main-component__price {
  position: absolute;
  top: 322px;
  left: 12px;
}

.main-component__price-old {
  text-decoration: line-through;
  color: rgba(136, 136, 136, 1);
  line-height: 22.4px;
  font-size: 16px;
  font-weight: 400;
  font-family: 'SFUIText';
  margin-right: 12px;
}

.main-component__price-new {
  color: rgba(0, 0, 0, 1);
  font-family: 'SFUIText';
  font-weight: 400;
  font-size: 16px;
  line-height: 22.4px;
}

.main-component__icons-left img,
.main-component__icons-right img {
  width: 21.6px;
  height: 21.6px;
}

.main-component__icons-left {
  position: absolute;
  top: 312px;
  left: 239px;
  cursor: pointer;
}

.main-component__icons-right {
  position: absolute;
  top: 312px;
  left: 286px;
  cursor: pointer;
}

@media (max-width: 840px) {
  .main-component__good {
    width: 320px;
    margin: 47px 10px 0px 0px;
  }
}

@media (max-width: 720px) {
  .main-component__good {
    width: 320px;
    margin: 47px auto 0px;
  }
}

@media (max-width: 470px) {
  .main-component__good {
    width: 320px;
  }
  .main-component__icons-left {
    top: 312px;
    left: 189px;
  }

  .main-component__icons-right {
    top: 312px;
    left: 226px;
  }
}
</style>
