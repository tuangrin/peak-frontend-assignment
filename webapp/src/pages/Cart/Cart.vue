<script setup lang="ts">
import { reactive, ref } from 'vue'
import ShoppingCart from '@/components/Cart/ShoppingCart.vue'
import CustomerDetail from '@/components/Cart/CustomerDetail.vue'
import Payment from '@/components/Cart/Payment.vue'
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

const paymentRef = ref()
const onNextStep = (item: CustomerForm) => {
  Object.assign(customer, item)
  paymentRef.value?.onSetData()
}
</script>

<template>
  <div class="h-screen flex justify-center p-3">
    <Stepper value="1" class="basis-[50rem]" linear>
      <StepList>
        <Step value="1">สินค้าในตะกร้า</Step>
        <Step value="2">ที่อยู่จัดส่ง</Step>
        <Step value="3">วิธีการชำระเงิน</Step>
      </StepList>
      <StepPanels>
        <StepPanel v-slot="{ activateCallback }" value="1">
          <ShoppingCart @onOrderProduct="activateCallback('2')" />
        </StepPanel>

        <StepPanel v-slot="{ activateCallback }" value="2">
          <CustomerDetail @onBackStep="activateCallback('1')"  @onNextStep="(item) => { onNextStep(item); activateCallback('3') }" />
        </StepPanel>

        <StepPanel v-slot="{ activateCallback }" value="3">
          <Payment ref="paymentRef" />
        </StepPanel>
      </StepPanels>
    </Stepper>
  </div>
</template>

<style scoped></style>
