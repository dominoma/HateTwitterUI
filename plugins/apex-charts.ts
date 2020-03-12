/**
 * This file imports apexcharts and fusioncharts to the webpage
 */
import { Plugin } from '@nuxt/types'
import VueApexCharts from 'vue-apexcharts'
import FusionCharts from 'fusioncharts'
import Charts from 'fusioncharts/fusioncharts.widgets'
import VueFusionCharts from 'vue-fusioncharts'
import Vue from 'vue'

import CandyTheme from 'fusioncharts/themes/fusioncharts.theme.candy'
Charts(CandyTheme(FusionCharts))

/** set custom theme for apexcharts */
const apexCharts: Plugin = () => {
  ;(window as any).Apex = {
    chart: {
      foreColor: '#ccc',
      toolbar: {
        show: true
      }
    },
    stroke: {
      width: 3
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      theme: 'dark'
    },
    grid: {
      borderColor: '#535A6C',
      xaxis: {
        lines: {
          show: true
        }
      }
    }
  }
  Vue.component('apexchart', VueApexCharts)
  Vue.use(VueFusionCharts, FusionCharts, Charts)
}
export default apexCharts
