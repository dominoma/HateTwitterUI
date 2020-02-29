<template>
  <apexchart
    type="pie"
    :height="300"
    :options="chart.options"
    :series="chart.series"
  ></apexchart>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Hashtag } from '~/types'

@Component
export default class TweetsPerLang extends Vue {
  @Prop()
  hashtag!: Hashtag

  get chart() {
    const others = Object.entries(this.hashtag.lang).sort((a, b) => b[1] - a[1])
    const data = others.splice(0, 4)
    const othersEntry = others.reduce(
      (acc, el) => {
        acc[1] += el[1]
        return acc
      },
      ['Andere', 0]
    )
    data.push(othersEntry)
    const lang = Object.fromEntries(data)
    return {
      options: {
        labels: Object.keys(lang),
        theme: {
          mode: 'dark',
          palette: 'palette1'
        }
      },
      series: Object.values(lang),
      hashtag: this.hashtag.hashtag
    }
  }
}
</script>
