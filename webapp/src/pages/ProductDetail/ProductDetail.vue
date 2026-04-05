<script setup lang="ts">
import { productServices } from '@/services/productService'
import { ref, onMounted, computed } from 'vue'
import ProductMedia from '@/components/ProductDetail/ProductMedia.vue'
import ProductInfo from '@/components/ProductDetail/ProductInfo.vue'
import type { ProductType } from '../../types'
import { useProduct } from '@/stores/product'
const productStore = useProduct()

import { useRouter } from 'vue-router'
const router = useRouter()

import { useToast } from 'primevue/usetoast'
const toast = useToast()

const productLists = computed(() => productStore.productLists)

import { useRoute } from 'vue-router'
const route = useRoute()

const home = ref({
  icon: 'pi pi-home',
})

interface pageLists {
  label: string
  route?: string
}
const pageLists = ref<pageLists[]>([{ label: 'สินค้า', route: '/products' }])

const product = ref<ProductType>()

const getProductById = async (id: number) => {
  try {
    let response = productLists.value.find((e: ProductType) => e.id == id)

    if (!response) {
      console.log('Product not found:', id)
      return
    }

    product.value = response
    pageLists.value.push({ label: response.title ?? '' })
  } catch (error: unknown) {
    console.log('error:', error)
    const detail = error instanceof Error ? error.message : 'Failed to load products'
    toast.add({ severity: 'error', summary: 'Error', detail, life: 3000 })
  }
}

const backToProductList = () => {
  router.push('/products')
}

onMounted(() => {
  getProductById(Number(route.params.id))
})
</script>

<template>
  <div class="min-h-screen">
    <Breadcrumb class="fix" :model="pageLists">
      <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a
            :href="href"
            v-bind="props.action"
            @click="navigate"
            class="text-slate-500 text-sm hover:opacity-80"
          >
            <span class="">{{ item.label }}</span>
          </a>
        </router-link>
        <span v-else class="text-slate-500 text-sm">{{ item.label }}</span>
      </template>
    </Breadcrumb>

    <div class="max-w-6xl mx-auto">
      <div v-if="product" class="bg-white min-h-screen p-4 grid grid-cols-2 gap-x-2">
        <ProductMedia :product="product" />
        <ProductInfo :product="product" />
      </div>

      <div v-else class="flex flex-col items-center justify-center h-72 gap-y-5">
        <div class="flex flex-col items-center gap-y-2">
          <i class="pi pi-search" style="font-size: 4rem"></i>
          <p class="text-xl text-blue-900">No result found</p>
        </div>
        <div>
          <Button class="!text-sm !px-3 !py-1 mt-3" @click="backToProductList"
            >กลับไปยังหน้ารวมสินค้า</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.quantity-input.p-inputnumber) {
  width: 25%;
}
</style>
