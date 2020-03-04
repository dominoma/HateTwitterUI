<template>
  <apexchart
    type="bubble"
    :height="300"
    :options="chart.options"
    :series="chart.series"
  ></apexchart>
</template>
<script lang="ts">
import { Vue, Component, Prop, PropSync, Emit } from 'vue-property-decorator'
import { Hashtag, Zoom } from '~/types'

function getSentiment(pos: number, neg: number) {
  return pos + neg === 0 ? 0 : Math.floor(((pos - neg) / (pos + neg)) * 100)
}

@Component
export default class HashtagBubbles extends Vue {
  @Prop()
  hashtagList!: Hashtag[]

  @PropSync('zoom')
  zoomedArea!: Zoom

  @Emit('selected')
  handleDataSelected(hashtagName: string) {
    return hashtagName
  }

  get chart() {
    return {
      series: this.hashtagList.map((ht) => ({
        name: ht.name,
        data: [
          {
            y: getSentiment(ht.tweets.pos, ht.tweets.neg),
            z: ht.tweets.total,
            x: Object.entries(ht.tweetDates).sort(
              (a, b) => b[1].total - a[1].total
            )[0][0]
          }
        ]
      })),
      options: {
        chart: {
          events: {
            zoomed: (_chartContext: any, { xaxis }: any) => {
              this.zoomedArea = xaxis
            },
            scrolled: (_chartContext: any, { xaxis }: any) => {
              this.zoomedArea = xaxis
            },

            dataPointSelection: (
              _event: any,
              _chartContext: any,
              config: any
            ) => {
              this.handleDataSelected(
                this.chart.series[config.seriesIndex].name
              )
            }
          }
        },
        theme: {
          mode: 'dark',
          palette: 'palette1'
        },
        xaxis: {
          type: 'datetime',
          tooltip: {
            enabled: false
          },
          min: this.zoomedArea.min,
          max: this.zoomedArea.max
        }
        // tooltip: {
        //   x: {
        //     formatter: (_value: any, { seriesIndex }: any) => {
        //       return seriesIndex ? this.chart.series[seriesIndex].name : ''
        //     }
        //   }
        // }
      }
    }
  }
}
</script>
