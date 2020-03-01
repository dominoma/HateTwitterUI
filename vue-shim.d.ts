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
declare module 'vue-world-map' {
  // eslint-disable-next-line import/no-duplicates
  import { VueConstructor } from 'vue'
  const x: VueConstructor<Vue>
  export default x
}
declare module 'vue-fusioncharts' {
  // eslint-disable-next-line import/no-duplicates
  import { PluginObject } from 'vue'
  const x: PluginObject<any>
  export default x
}
declare module 'vue-tweet-embed' {
  // eslint-disable-next-line import/no-duplicates
  import { VueConstructor } from 'vue'
  export const Tweet: VueConstructor<Vue>
}
