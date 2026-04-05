import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import Aura from '@primeuix/themes/aura'
import { definePreset } from '@primeuix/themes'

import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import IconField from 'primevue/iconfield'
import Button from 'primevue/button'
import Breadcrumb from 'primevue/breadcrumb'
import Paginator from 'primevue/paginator'
import Galleria from 'primevue/galleria'
import Stepper from 'primevue/stepper'
import StepList from 'primevue/steplist'
import StepPanels from 'primevue/steppanels'
import StepItem from 'primevue/stepitem'
import Step from 'primevue/step'
import StepPanel from 'primevue/steppanel'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import MultiSelect from 'primevue/multiselect'
import ProgressSpinner from 'primevue/progressspinner'
import Image from 'primevue/image';


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ToastService)

app.component('InputText', InputText)
app.component('InputNumber', InputNumber)
app.component('IconField', IconField)
app.component('Button', Button)
app.component('Breadcrumb', Breadcrumb)
app.component('Paginator', Paginator)
app.component('Galleria', Galleria)
app.component('Stepper', Stepper)
app.component('StepList', StepList)
app.component('StepPanels', StepPanels)
app.component('StepItem', StepItem)
app.component('Step', Step)
app.component('StepPanel', StepPanel)
app.component('Toast', Toast)
app.component('MultiSelect', MultiSelect)
app.component('ProgressSpinner', ProgressSpinner)
app.component('Image', Image)


const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#DBEAFE',
      100: '#BFDBFE',
      200: '#93C5FD',
      300: '#60A5FA',
      400: '#3B82F6',
      500: '#2563EB',
      600: '#1D4ED8',
      700: '#1E40AF',
      800: '#1E3A8A',
      900: '#1E3A8A',
      950: '#172554',
    },
  },
})

app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      darkModeSelector: 'none',
    },
  },
})

app.mount('#app')
