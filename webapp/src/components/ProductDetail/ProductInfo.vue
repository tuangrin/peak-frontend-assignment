<script setup lang="ts">
import { ref } from 'vue'
import type { ProductType } from '@/types'
import { useToast } from 'primevue/usetoast'
import { useProduct } from '@/stores/product'
const toast = useToast()
const productStore = useProduct()

const props = withDefaults(
  defineProps<{
    product: ProductType
  }>(),
  {},
)
const quantity = ref<number>(1)

const updateCartCount = (cartList: (ProductType & { quantity: number })[]) => {
  const totalItems = cartList.reduce((sum, item) => sum + item.quantity, 0)
  productStore.updateProductInCart(totalItems)
}

const addToCart = () => {
  const cartList: (ProductType & { quantity: number })[] = JSON.parse(
    localStorage.getItem('cartList') ?? '[]',
  )

  const existingIndex = cartList.findIndex((item) => item.id === props.product.id)

  if (existingIndex !== -1) {
    cartList[existingIndex]!.quantity += quantity.value
  } else {
    cartList.push({
      ...props.product,
      quantity: quantity.value,
    })
  }

  localStorage.setItem('cartList', JSON.stringify(cartList))
  updateCartCount(cartList)
  toast.add({
    severity: 'success',
    summary: 'สินค้าถูกเพิ่มในตะกร้าแล้ว',
    life: 3000,
  })
}
</script>

<template>
  <div>
    <div class="p-3 flex flex-col gap-y-4">
      <div class="flex flex-col gap-y-1">
        <h2 class="text-2xl text-blue-900 font-medium">
          {{ product.title }}
        </h2>
        <hr class="text-slate-200 my-2" />
        <span class="text-sm">{{ product.description }}</span>
        <span class="text-2xl font-medium mt-4 text-blue-800">{{ product.price }}฿</span>
      </div>

      <div class="flex gap-x-3 mt-2">
        <InputNumber
          v-model="quantity"
          class="quantity-input"
          inputClass="w-16 text-center"
          showButtons
          buttonLayout="horizontal"
          :step="1"
          :min="1"
          fluid
        >
          <template #incrementbuttonicon>
            <span class="pi pi-plus" />
          </template>
          <template #decrementbuttonicon>
            <span class="pi pi-minus" />
          </template>
        </InputNumber>
        <Button @click="addToCart"
          ><i class="pi pi-cart-plus cursor-pointer hover:opacity-70" /> Add to cart</Button
        >
      </div>

      <div class="flex items-center gap-3">
        <i class="pi pi-tag text-blue-900" />
        <div
          v-for="(tag, indexTag) in product.tags"
          :key="indexTag"
          class="bg-sky-200 text-sm text-sky-800 py-0.5 px-4 rounded-full cursor-pointer hover:opacity-80 transition"
        >
          {{ tag }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
