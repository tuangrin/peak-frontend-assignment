<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'
import type { ProductType } from '@/types'

import { useRouter } from 'vue-router'
const router = useRouter()

import { useProduct } from '@/stores/product'
const productStore = useProduct()

import { useToast } from 'primevue/usetoast'
const toast = useToast()

const shippingPrice = ref<number>(40)
const cartLists = ref<ProductType[]>([])

const syncCartCount = () => {
  const totalItems = cartLists.value.reduce((sum, item) => sum + (item.quantity ?? 1), 0)
  productStore.updateProductInCart(totalItems)
}

watch(
  cartLists,
  (newVal) => {
    localStorage.setItem('cartList', JSON.stringify(newVal))
    syncCartCount()
  },
  { deep: true },
)

const totalPrice = computed(() =>
  cartLists.value.reduce((sum, item) => sum + item.price * (item.quantity ?? 1), 0),
)

const total = computed(() => totalPrice.value + shippingPrice.value)

const formatPrice = (num: number) => {
  return num.toLocaleString('th-TH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

const deleteItem = (item: ProductType) => {
  cartLists.value = cartLists.value.filter((i) => i.id !== item.id)
  localStorage.setItem('cartList', JSON.stringify(cartLists.value))
  renderLoading()
  toast.add({
    severity: 'success',
    summary: 'ลบสินค้าออกจากตะกร้าเรียบร้อย',
    life: 3000,
  })
}

const clearCart = () => {
  cartLists.value = []
  localStorage.setItem('cartList', JSON.stringify(cartLists.value))
  renderLoading()
  toast.add({
    severity: 'success',
    summary: 'ลบสินค้าออกจากตะกร้าเรียบร้อย',
    life: 3000,
  })
}

const backToProductList = () => {
  router.push('/products')
}

const onOrderProduct = () => {
  emit('onOrderProduct', cartLists.value)
}

const renderLoading = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 500)
}

const isLoading = ref<boolean>(true)

const emit = defineEmits(['onOrderProduct'])

onMounted(() => {
  cartLists.value = JSON.parse(localStorage.getItem('cartList') ?? '[]')
  syncCartCount()

  setTimeout(() => {
    isLoading.value = false
  }, 500)
})
</script>

<template>
  <div class="p-3 min-h-screen relative">
    <div
      v-if="isLoading"
      class="absolute inset-0 z-20 flex items-center justify-center bg-white/70 backdrop-blur-sm"
    >
      <ProgressSpinner strokeWidth="3" />
    </div>

    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-8 border-r border-slate-300 p-3 flex flex-col">
        <div v-if="cartLists.length > 0">
          <div class="mb-3 flex items-center justify-between">
            <h2 class="text-lg font-medium text-blue-900">ตะกร้าสินค้า</h2>
            <Button label="ลบทั้งหมด" severity="danger" text size="small" @click="clearCart" />
          </div>
          <table class="w-full">
            <thead>
              <tr class="text-lg">
                <th></th>
                <th>สินค้า</th>
                <th>ราคา</th>
                <th>จำนวน</th>
                <th>รวม</th>
              </tr>
            </thead>
            <tbody class="text-center divide-y divide-slate-200">
              <tr v-for="item in cartLists" :key="item.id" class="hover:bg-sky-50 text-sm">
                <td class="w-px whitespace-nowrap px-2">
                  <i
                    class="pi pi-times-circle hover:opacity-80 cursor-pointer"
                    @click="deleteItem(item)"
                  />
                </td>
                <td class="flex items-center justify-center">
                  <img
                    :src="item.photos?.[0] || 'https://via.placeholder.com/60'"
                    alt="product"
                    class="w-18 h-18 object-cover rounded-lg"
                  />

                  <span class="truncate">
                    {{ item.title }}
                  </span>
                </td>
                <td>{{ formatPrice(item.price) }}</td>
                <td>
                  <InputNumber
                    v-model="item.quantity"
                    class="quantity-input"
                    inputClass="w-10 text-center text-sm"
                    showButtons
                    buttonLayout="horizontal"
                    :step="1"
                    :min="1"
                    size="small"
                  >
                    <template #incrementbuttonicon>
                      <span class="pi pi-plus text-xs" />
                    </template>
                    <template #decrementbuttonicon>
                      <span class="pi pi-minus text-xs" />
                    </template>
                  </InputNumber>
                </td>
                <td>{{ formatPrice(item.price * (item.quantity ?? 1)) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="bg-sky-100 rounded-lg flex-1 flex justify-center items-center">
          <p class="text-blue-900">ไม่มีรายการสินค้า</p>
        </div>

        <div>
          <Button class="!text-sm !px-3 !py-1 mt-3" @click="backToProductList"
            >เลือกดูสินค้าต่อ</Button
          >
        </div>
      </div>

      <div class="col-span-4 p-4">
        <h2 class="text-lg font-medium text-blue-900">สรุปรายการสั่งซื้อ</h2>
        <hr class="text-slate-200 my-2" />
        <div class="flex justify-between text-sm">
          <span>ราคารวมสินค้า</span>
          <span>{{ formatPrice(totalPrice) }} ฿</span>
        </div>

        <div class="flex justify-between text-sm">
          <span>ค่าส่ง</span>
          <span>{{ formatPrice(shippingPrice) }} ฿</span>
        </div>
        <hr class="text-slate-200 my-2" />
        <div class="flex justify-between text-base text-blue-900 font-semibold">
          <span>ราคาสุทธิ</span>
          <span>{{ formatPrice(total) }} ฿</span>
        </div>

        <div class="mt-2">
          <Button
            label="ดำเนินการสั่งซื้อสินค้า"
            :disabled="cartLists.length == 0"
            class="!px-3 !py-1 mt-3 w-full !rounded-full !bg-emerald-500 !border-emerald-500 hover:!bg-emerald-600"
            @click="onOrderProduct"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.quantity-input.p-inputnumber) {
  width: fit-content;
}

:deep(.quantity-input .p-inputnumber-button) {
  width: 1.75rem;
  padding: 0.25rem;
}

:deep(.quantity-input .p-inputtext) {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}
</style>
