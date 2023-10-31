
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import CepTableVue from './components/CepTable.vue'
import FormEditTableVue from './components/FormEditTable.vue'

const app = createApp(App)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.component('CepTable', CepTableVue)
app.component('FormEdit', FormEditTableVue)
app.mount('#app') 