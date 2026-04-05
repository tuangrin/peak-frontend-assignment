<script setup lang="ts">
import { computed } from 'vue'

import { useRouter } from 'vue-router'
const router = useRouter()

import { useProduct } from '@/stores/product'
const productStore = useProduct()

const goToCart = () => {
  router.push('/cart')
}
const goToProductList = () => {
  router.push('/products')
}

const cartCount = computed(() => productStore.productInCart)
</script>

<template>
  <div class="py-2 px-4 bg-blue-800 flex justify-between items-center">
    <div class="font-medium cursor-pointer hover:opacity-85" @click="goToProductList">
      <span class="text-sky-300">PEAK</span>
      <span class="text-white">shop</span>
    </div>

    <div class="relative">
      <div
        v-if="cartCount > 0"
        class="bg-red-500 text-white rounded-full text-center text-[10px] absolute -top-1 -right-1 px-1"
      >
        {{ cartCount }}
      </div>
      <i
        class="pi pi-cart-plus cursor-pointer text-white hover:opacity-70 pr-2"
        @click="goToCart"
      />
    </div>
  </div>
</template>

<style scoped></style>
