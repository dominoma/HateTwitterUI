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

@Component
export default class TweetsPerDay extends Vue {
  @Prop()
  hashtag!: Hashtag

  @Emit('area-selected')
  handleZoomed(area: { min: number | undefined; max: number | undefined }) {
    return area
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
          id: 'tweets'
        },
        theme: {
          mode: 'dark',
          palette: 'palette1'
        },
        stroke: {
          curve: 'smooth'
        },
        markers: {
          size: 5
        },
        xaxis: {
          type: 'datetime',
          tooltip: {
            enabled: false
          }
        }
      },
      series: [
        {
          name: 'Tweets',
          data: Object.entries(this.hashtag.date).map(([date, value]) => ({
            x: date,
            y: value
          }))
        }
      ]
    }
  }
}
</script>
