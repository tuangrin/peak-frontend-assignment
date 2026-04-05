<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

import { useProduct } from '@/stores/product'
const productStore = useProduct()

const isLoading = ref<boolean>(true)

const backToProductList = () => {
  router.push('/products')
}

const onSetData = () => {
   setTimeout(() => {
    isLoading.value = false
    productStore.updateProductInCart(0)
      localStorage.removeItem('cartList')
  }, 1000)
}

defineExpose({onSetData})
</script>

<template>
  <div>
 <div
      v-if="isLoading"
      class="absolute inset-0 z-20 flex items-center justify-center bg-white/70 backdrop-blur-sm"
    >
      <ProgressSpinner strokeWidth="3" />
    </div>

    <div v-else class="flex flex-col items-center p-3 gap-y-2">
      <i class="pi pi-shopping-bag" style="font-size: 5rem;"></i>
      <h2 class="text-2xl text-blue-900 font-medium my-2">ยืนยันคำสั่งซื้อเรียบร้อย หมายเลขออเดอร์ #0001</h2>
      <p>ทีมงานจะดำเนินการจัดเตรียมสินค้าและจัดส่งให้โดยเร็วที่สุด</p>
      <p>ขอบคุณที่สั่งซื้อสินค้ากับเรา</p>
      <div>
        <Button class="!text-sm !px-3 !py-1 mt-3" @click="backToProductList"
        >กลับสู่หน้ารายการสินค้า</Button
        >
      </div>
    </div>
  </div>
</template>

<style scoped></style>
