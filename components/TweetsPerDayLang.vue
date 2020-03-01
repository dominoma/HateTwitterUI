<template>
  <apexchart
    type="line"
    :height="300"
    :options="chart.options"
    :series="chart.series"
  ></apexchart>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { Hashtag } from '~/types'

import LangCodes from '~/assets/data/langCodes.json'

@Component
export default class TweetsPerDayLang extends Vue {
  @Prop()
  hashtag!: Hashtag

  @Emit('area-selected')
  handleZoomed(area: { min: number | undefined; max: number | undefined }) {
    return area
  }

  get langs() {
    return Object.entries(this.hashtag.lang)
      .sort((a, b) => b[1] - a[1])
      .map(([l]) => l)
      .slice(0, 3)
      .sort((a, b) => a.localeCompare(b))
  }

  get chart() {
    return {
      options: {
        chart: {
          events: {
            zoomed: (_chartContext: any, { xaxis }: any) => {
              this.handleZoomed(xaxis)
            },
            scrolled: (_chartContext: any, { xaxis }: any) => {
              this.handleZoomed(xaxis)
            }
          },
          group: 'timeline',
          id: 'langs'
        },
        theme: {
          mode: 'dark',
          palette: 'palette1'
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          tooltip: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        }
      },
      series: this.langs.map((lang) => ({
        name: (LangCodes as any)[lang] || lang,
        data: this.hashtag.dateLang
          .filter((el) => el.lang === lang)
          .map(({ date, value }) => ({ x: date, y: value }))
          .sort((a, b) => a.x.localeCompare(b.x))
      }))
    }
  }
}
</script>
