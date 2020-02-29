<template>
  <apexchart
    type="line"
    :height="300"
    :options="chart.options"
    :series="chart.series"
  ></apexchart>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Hashtag } from '~/types'

@Component
export default class TweetsPerDay extends Vue {
  @Prop()
  hashtag!: Hashtag

  get chart() {
    return {
      options: {
        chart: {},
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
          type: 'datetime'
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
