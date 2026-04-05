import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ProductType } from '@/types'

export const useProduct = defineStore('product', () => {
  const productLists = ref<ProductType[]>([])
  const productInCart = ref<number>(0)

  const addProductLists = (item: ProductType | ProductType[]) => {
    productLists.value.push(...(Array.isArray(item) ? item : [item]))
  }

  const clearProductLists = () => {
    productLists.value = []
  }

  const updateProductInCart = (item: number) => {
    productInCart.value = item
  }

  return {
    productLists,
    addProductLists,
    clearProductLists,
    productInCart,
    updateProductInCart,
  }
})
