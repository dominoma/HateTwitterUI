<template>
  <apexchart
    type="bar"
    :height="300"
    :options="chart.options"
    :series="chart.series"
  ></apexchart>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { Hashtag, Zoom } from '~/types'

/**
 * This chart shows the top 5 tweets of the dataset provided by 'hashtagList'
 */
@Component
export default class HashtagsTotal extends Vue {
  @Prop()
  range!: Zoom

  @Prop()
  hashtagList!: Hashtag[]

  @Emit('selected')
  handleDataSelected(hashtagName: string) {
    return hashtagName
  }

  /**
   * This function sums up all tweets in the time range given by the property 'range'
   * and returns the top 5 hashtags and their corresponding tweets
   */
  getRangedData() {
    if (this.range && (this.range.min || this.range.max)) {
      return this.hashtagList
        .map((ht) => ({
          x: ht.name,
          y: Object.entries(ht.tweetDates)
            .filter(([date]) => {
              const ts = +new Date(date)
              return (
                (!this.range!.min || this.range!.min <= ts) &&
                (!this.range!.max || ts <= this.range!.max)
              )
            })
            .reduce((acc, [, { total }]) => {
              return acc + total
            }, 0)
        }))
        .sort((a, b) => b.y - a.y)
        .slice(0, 5)
    } else {
      return this.hashtagList
        .map((ht) => ({
          x: ht.name,
          y: ht.tweets.total
        }))
        .sort((a, b) => b.y - a.y)
        .slice(0, 5)
    }
  }

  get chart() {
    return {
      options: {
        theme: {
          mode: 'dark',
          palette: 'palette1'
        },
        chart: {
          events: {
            dataPointSelection: (
              _event: any,
              _chartContext: any,
              config: any
            ) => {
              this.handleDataSelected(
                this.chart.series[0].data[config.dataPointIndex].x
              )
            }
          }
        },
        plotOptions: {
          bar: {
            distributed: true,
            horizontal: true
          }
        },

        xaxis: {}
      },
      series: [
        {
          name: 'Tweets insgesamt',
          data: this.getRangedData().sort((a, b) => a.x.localeCompare(b.x))
        }
      ]
    }
  }
}
</script>
