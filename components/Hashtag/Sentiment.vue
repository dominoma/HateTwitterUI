<template>
  <fusioncharts
    type="angulargauge"
    width="100%"
    :height="300"
    data-format="json"
    :data-source="dataSource"
  ></fusioncharts>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Hashtag } from '~/types'

@Component
export default class Sentiment extends Vue {
  @Prop()
  hashtag!: Hashtag

  @Prop()
  range!: { min: number | undefined; max: number | undefined }

  getRangedData() {
    if (this.range && (this.range.min || this.range.max)) {
      const { val, total } = Object.entries(this.hashtag.tweetDates)
        .filter(([date]) => {
          const ts = +new Date(date)
          return (
            (!this.range!.min || this.range!.min <= ts) &&
            (!this.range!.max || ts <= this.range!.max)
          )
        })
        .reduce(
          (acc, [, { pos, neg }]) => {
            acc.val = acc.val + (pos - neg)
            acc.total = acc.total + (pos + neg)
            return acc
          },
          { val: 0, total: 0 }
        )
      if (total === 0) {
        return 0
      } else {
        return Math.floor((val / total) * 100)
      }
    } else {
      return this.hashtag.tweets.pos + this.hashtag.tweets.neg === 0
        ? 0
        : Math.floor(
            ((this.hashtag.tweets.pos - this.hashtag.tweets.neg) /
              (this.hashtag.tweets.pos + this.hashtag.tweets.neg)) *
              100
          )
    }
  }

  get dataSource() {
    return {
      chart: {
        caption: 'Sentiment-Kontext in %',
        lowerlimit: '-100',
        upperlimit: '100',
        showvalue: '1',
        numbersuffix: '%',
        theme: 'candy',
        showtooltip: '0'
      },
      colorrange: {
        color: [
          {
            minvalue: '-100',
            maxvalue: '-38',
            code: '#ff0000'
          },
          {
            minvalue: '-38',
            maxvalue: '38',
            code: '#ffff00'
          },
          {
            minvalue: '38',
            maxvalue: '100',
            code: '#00ff00'
          }
        ]
      },
      dials: {
        dial: [
          {
            value: this.getRangedData()
          }
        ]
      }
    }
  }
}
</script>
