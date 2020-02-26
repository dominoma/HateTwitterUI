declare module '*.vue' {
  // eslint-disable-next-line import/no-duplicates
  import Vue from 'vue'
  export default Vue
}
declare module 'vue-d3-charts' {
  // eslint-disable-next-line import/no-duplicates
  import { VueConstructor } from 'vue'
  export const D3LineChart: VueConstructor<Vue>
  export const D3PieChart: VueConstructor<Vue>
}
