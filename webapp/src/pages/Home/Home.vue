<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const goToProductList = () => {
  router.push('/products')
}
</script>

<template>
  <div class="h-screen flex flex-col justify-center items-center text-7xl gap-1">
    <h2 class="font-extralight mb-1">WELCOME TO</h2>
    <h3><span class="text-sky-600"> PEAK </span> Shop</h3>
    <div>
      <Button label="เข้าสู่เว็บไซต์" class="!px-8 !py-2 !rounded-full" @click="goToProductList" />
    </div>
  </div>
</template>
