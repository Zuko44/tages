<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Product, Materials } from '../types/index';
import items from '../sources/items.json';
import materials from '../sources/materials.json';

const container = ref<Product[]>(items);
const material = ref<Materials[]>(materials);

onMounted(() => {});
</script>

<template>
  <div class="wrapper">
    <header class="header">
      <nav class="header__navigation">
        Главная / Системы хранения /
        <span class="header__navigation__bold"
          >Комплекты стеллажных систем</span
        >
      </nav>
      <p class="header__title">Комплекты стеллажных систем</p>
    </header>
    <article class="filtr">
      <div class="filtr__left">
        <p class="paragraph-design">Сортировать по:</p>
        <select class="select-design">
          <option>Цена по возрастанию</option>
          <option>Цена по убыванию</option>
        </select>
      </div>
      <div class="filtr__right">
        <p class="paragraph-design">Материал:</p>
        <select class="select-design">
          <option v-for="item in material" :key="item.id">
            {{ item.name }}
          </option>
        </select>
      </div>
    </article>
    <main class="main-component">
      <article
        class="main-component__good"
        v-for="item in items"
        :key="item.id"
      >
        <div class="main-component__discount" v-if="item.code == 'L422WH'">
          Скидка
        </div>
        <div class="main-component__code" v-if="item.code != null"></div>
        <img :src="item.image.url" alt="goods" />
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

.header__navigation__bold {
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
}
</style>
