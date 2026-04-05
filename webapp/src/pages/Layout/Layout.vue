<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Navbar from '../../components/Navbar/Navbar.vue'
import { productServices } from '@/services/productService'
import type { ProductType } from '@/types'
import { useToast } from 'primevue/usetoast'
const toast = useToast()

import { useProduct } from '@/stores/product'
const productStore = useProduct()

const isLoading = ref<boolean>(true)
const getProductLists = async () => {
  try {
    const response = await productServices.getProductList()
    productStore.clearProductLists()
    productStore.addProductLists(response)
  } catch (error) {
    console.error('getProductLists error: ', error)
    const detail = error instanceof Error ? error.message : 'Failed to load products'
    toast.add({ severity: 'error', summary: 'Error', detail, life: 3000 })
  } finally {
    setTimeout(() => {
      isLoading.value = false
    }, 500)
  }
}

const setCart = () => {
  const cartList: ProductType[] = JSON.parse(localStorage.getItem('cartList') ?? '[]')
  let quantity = 0
  cartList.forEach((e: ProductType) => {
    if (e.quantity) {
      quantity += e.quantity
    }
  })
  productStore.updateProductInCart(quantity ?? 0)
}

onMounted(() => {
  getProductLists()
  setCart()
})
</script>

<template>
  <div class="">
    <div v-if="isLoading" class="h-screen flex justify-center items-center">
      <ProgressSpinner strokeWidth="3" />
    </div>
    <div v-else>
      <header class="breadcrumb-wrapper">
        <Navbar />
      </header>
      <router-view />
      <!-- Footer -->
    </div>
  </div>
</template>

<style scoped></style>
