<script setup lang="ts">
import { computed, reactive } from 'vue'
import type { CustomerForm } from '@/types'

const customer = reactive<CustomerForm>({
  name: '',
  phone: null as number | null,
  addressLine: '',
  subdistrict: '',
  district: '',
  province: '',
  postalCode: null as number | null,
})

const isCustomerFormValid = computed(() => {
  return Boolean(
    customer.name.trim() &&
      customer.phone &&
      customer.addressLine.trim() &&
      customer.subdistrict.trim() &&
      customer.district.trim() &&
      customer.province.trim() &&
      customer.postalCode,
  )
})

const onBackStep = () => {
  emit('onBackStep')
}

const onNextStep = () => {
  emit('onNextStep', customer)
}
const emit = defineEmits(['onNextStep', 'onBackStep'])
</script>

<template>
  <div>
    <div class="grid grid-cols-1 gap-2">
      <div class="grid grid-cols-2 gap-x-2">
        <div class="col-span-1">
          <p>ชื่อ <small class="text-red-500">*</small></p>
          <InputText type="text" v-model="customer.name" class="w-full" size="small" />
        </div>
        <div class="col-span-1">
          <p>เบอร์โทรศัพท์ <small class="text-red-500">*</small></p>
          <InputNumber v-model="customer.phone" class="w-full" size="small" />
        </div>
      </div>

      <div class="grid grid-cols-1 gap-x-2">
        <div>
          <p>บ้านเลขที่/อาคาร/ถนน <small class="text-red-500">*</small></p>
          <InputText type="text" v-model="customer.addressLine" class="w-full" size="small" />
        </div>
      </div>

      <div class="grid grid-cols-12 gap-x-2">
        <div class="col-span-3">
          <p>ตำบล/แขวง <small class="text-red-500">*</small></p>
          <InputText type="text" v-model="customer.subdistrict" class="w-full" size="small" />
        </div>
        <div class="col-span-3">
          <p>อำเภอ/เขต <small class="text-red-500">*</small></p>
          <InputText v-model="customer.district" class="w-full" size="small" />
        </div>
        <div class="col-span-3">
          <p>จังหวัด <small class="text-red-500">*</small></p>
          <InputText v-model="customer.province" class="w-full" size="small" />
        </div>
        <div class="col-span-3">
          <p>รหัสไปรษณีย์ <small class="text-red-500">*</small></p>
          <InputNumber v-model="customer.postalCode" class="w-full" size="small" />
        </div>
      </div>
    </div>
    <div class="flex justify-between">
      <Button
        label="ย้อนกลับ"
        class="!px-5 !py-1 mt-3 !rounded-full !bg-amber-500 !border-amber-500 hover:!bg-amber-600"
        @click="onBackStep"
      />
      <Button
        label="ถัดไป"
        :disabled="!isCustomerFormValid"
        class="!px-5 !py-1 mt-3 !rounded-full !bg-emerald-500 !border-emerald-500 hover:!bg-emerald-600"
        @click="onNextStep"
      />
    </div>
  </div>
</template>

<style scoped></style>
