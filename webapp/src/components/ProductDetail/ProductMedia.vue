<script setup lang="ts">
import type { ProductType } from '@/types'

const props = defineProps<{
  product: ProductType
}>()
</script>

<template>
  <div>
    <div class="flex flex-col gap-y-5">
      <div>
        <Galleria
          :value="props.product.photos"
          :numVisible="3"
          :showThumbnails="true"
          :showItemNavigators="true"
          :circular="true"
          :autoPlay="false"
        >
          <template #item="slotProps">
            <Image :src="slotProps.item" :alt="props.product.title" preview>
            </Image>
          </template>

          <template #thumbnail="slotProps">
            <img
              :src="slotProps.item"
              class="w-32 h-32 object-cover rounded cursor-pointer"
              :alt="props.product.title"
              loading="lazy"
            />
          </template>
        </Galleria>
      </div>
    </div>
  </div>
</template>
