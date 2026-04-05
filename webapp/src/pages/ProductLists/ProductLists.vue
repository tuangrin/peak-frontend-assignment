<script setup lang="ts">
import { productServices } from '@/services/productService'
import { ref, computed, onMounted } from 'vue'
import type { ProductType } from '../../types'
import { useProduct } from '@/stores/product'
const productStore = useProduct()

import { useToast } from 'primevue/usetoast'
const toast = useToast()

import { useRouter } from 'vue-router'
const router = useRouter()

const productLists = computed(() => productStore.productLists)

const currentPage = ref(1)
const limit = 20

const searchInput = ref<string>('')
const tagSelected = ref<string[]>([])

const filteredProducts = computed(() => {
  let lists = productLists.value

  const searchQuery = searchInput.value.toLowerCase().trim()
  if (searchQuery) {
    lists = lists.filter((item) => item.title.toLowerCase().includes(searchQuery))
  }

  if (tagSelected.value.length > 0) {
    lists = lists.filter((item) => tagSelected.value.some((tag) => item.tags?.includes(tag)))
  }

  return lists
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * limit
  return filteredProducts.value.slice(start, start + limit)
})

let debounceTimeout: ReturnType<typeof setTimeout> | null = null

const hasActiveFilters = computed(() => searchInput.value.trim().length > 0 || tagSelected.value.length > 0)
const activeSearchKeyword = computed(() => searchInput.value.trim())

const onSearch = () => {
  if (debounceTimeout) clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    currentPage.value = 1
  }, 500)
}

const onTagsChange = () => {
  currentPage.value = 1
}

const clearSearchFilter = () => {
  searchInput.value = ''
  currentPage.value = 1
}

const removeTagFilter = (tagToRemove: string) => {
  tagSelected.value = tagSelected.value.filter((tag) => tag !== tagToRemove)
  currentPage.value = 1
}

const clearAllFilters = () => {
  searchInput.value = ''
  tagSelected.value = []
  currentPage.value = 1
}

const updateCartCount = (cartList: (ProductType & { quantity: number })[]) => {
  const totalItems = cartList.reduce((sum, item) => sum + item.quantity, 0)
  productStore.updateProductInCart(totalItems)
}

const addToCart = (item: ProductType) => {
  const cartList: (ProductType & { quantity: number })[] = JSON.parse(
    localStorage.getItem('cartList') ?? '[]',
  )

  const existingIndex = cartList.findIndex((cartItem) => cartItem.id === item.id)

  if (existingIndex !== -1) {
    cartList[existingIndex]!.quantity += 1
  } else {
    cartList.push({
      ...item,
      quantity: 1,
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

const updatePage = (event: any) => {
  currentPage.value = event.page + 1
}

const tagOptions = computed(() => {
  const tags = productLists.value.flatMap((product) => product.tags ?? [])
  return [...new Set(tags)]
})


const goToDetailPage = (prod: ProductType) => {
  router.push(`/products/${prod.id}`)
}

onMounted(() => {
  // getProductLists()
})
</script>

<template>
  <div class="min-h-screen">
    <div class="max-w-6xl mx-auto">
      <div class="bg-white p-4 flex flex-col gap-y-5">
        <div class="flex justify-end">
          <MultiSelect v-model="tagSelected" display="chip" :options="tagOptions" filter placeholder="Select tags"
            :maxSelectedLabels="3" class="w-full md:w-80 mr-2" @change="onTagsChange" />
          <IconField class="relative">
            <InputIcon class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <InputText v-model="searchInput" placeholder="Search" class="pl-8" @input="onSearch" />
            <i v-if="searchInput.trim()"
              class="pi pi-times absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
              @click="clearSearchFilter" />
          </IconField>
        </div>

        <div v-if="hasActiveFilters" class="flex flex-wrap items-center gap-2">
          <span class="text-sm text-slate-500">Active filters:</span>
          <div v-if="activeSearchKeyword"
            class="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-800 transition hover:bg-sky-200">
            <span>{{ activeSearchKeyword }}</span>
            <i class="pi pi-times cursor-pointer text-xs" @click="clearSearchFilter" />
          </div>
          <div v-for="tag in tagSelected" :key="tag"
            class="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-800 transition hover:bg-sky-200">
            <span>{{ tag }}</span>
            <i class="pi pi-times cursor-pointer text-xs" @click="removeTagFilter(tag)" />
          </div>
          <span class="text-sm font-medium text-red-500 transition hover:text-red-600 cursor-pointer"
            @click="clearAllFilters">
            Clear all
          </span>
        </div>

        <div v-if="paginatedProducts.length > 0" class="flex flex-col gap-y-4">
          <p v-show="hasActiveFilters" class="text-sm text-slate-500">
            Found {{ filteredProducts.length }} products
          </p>
          <div class="grid grid-cols-4 gap-4">
            <div v-for="product in paginatedProducts" :key="product.id"
              class="bg-white hover:shadow-lg rounded-xl p-3 shadow-md flex flex-col h-100">
              <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img :src="product.photos[0]" class="w-full h-full object-contain cursor-pointer" loading="lazy"
                  :alt="product.title" @click="goToDetailPage(product)" />
              </div>

              <div class="mt-3 flex flex-col flex-1 overflow-hidden">
                <p class="font-medium text-base truncate cursor-pointer hover:opacity-70"
                  @click="goToDetailPage(product)">
                  {{ product.title }}
                </p>
                <p class="text-slate-400 text-xs line-clamp-2">
                  {{ product.description }}
                </p>
                <div class="mt-auto flex justify-between items-center">
                  <div>
                    <span class="font-semibold"> {{ product.price }}฿ </span>
                    <div class="flex text-xs gap-x-2">
                      <div v-for="(tag, indexTag) in product.tags" :key="indexTag"
                        class="bg-sky-200 text-sky-800 py-0.5 px-2 rounded-full cursor-pointer hover:opacity-80 transition">
                        {{ tag }}
                      </div>
                    </div>
                  </div>

                  <Button class="text-xs" @click="addToCart(product)"><i
                      class="pi pi-cart-plus cursor-pointer text-white hover:opacity-70" /></Button>
                </div>
              </div>
            </div>
          </div>

          <Paginator :rows="limit" :totalRecords="filteredProducts.length" @page="updatePage" />
        </div>

        <div v-else class="flex flex-col items-center justify-center h-64 gap-5 text-slate-500">
          <i class="pi pi-search " style="font-size: 3rem"></i>
          <p class="text-2xl">
            No results found <span v-show="searchInput">for {{ searchInput }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
