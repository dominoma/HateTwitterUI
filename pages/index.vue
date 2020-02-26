<template>
  <b-card no-body>
    <b-tabs card>
      <b-tab title="Tweets insgesamt" lazy>
        <b-card-title>
          Anzahl der Tweets mit dem Hashtag
          <code>#{{ tweetsChart.hashtag }}</code> pro Tag
        </b-card-title>
        <b-card-text>
          <D3LineChart
            ref="chart1"
            :config="tweetsChart.config"
            :datum="tweetsChart.data"
          ></D3LineChart>
        </b-card-text>
      </b-tab>
      <b-tab title="Tweets nach Sprachen" lazy>
        <b-card-title>
          Anzahl der Tweets mit dem Hashtag
          <code>#{{ langChart.hashtag }}</code> nach Sprachen
        </b-card-title>
        <b-card-text>
          <D3LineChart
            :config="langChart.config"
            :datum="langChart.data"
          ></D3LineChart>
        </b-card-text>
      </b-tab>
      <b-tab title="Sprachen" lazy>
        <b-card-title>
          Verteilung der Tweets mit dem Hashtag
          <code>#{{ langDistChart.hashtag }}</code> nach Sprachen
        </b-card-title>
        <b-card-text>
          <D3PieChart
            :config="langDistChart.config"
            :datum="langDistChart.data"
          ></D3PieChart>
        </b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { D3LineChart, D3PieChart } from 'vue-d3-charts'

import hashtag from './hashtag.json'

@Component({
  components: {
    D3LineChart,
    D3PieChart
  }
})
export default class Index extends Vue {
  get langChart() {
    const langs = Object.entries(hashtag.lang)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([key]) => key)
    const data = Object.values(
      hashtag.dateLang.reduce((acc, entry) => {
        const val = acc[entry.date] || {
          when: entry.date,
          ...Object.fromEntries(langs.map((key) => [key, 0]))
        }
        val[entry.lang] = entry.value
        acc[entry.date] = val
        return acc
      }, {} as { [key: string]: { [key: string]: number } })
    )
    const config = {
      date: { key: 'when', inputFormat: '%Y-%m-%d', outputFormat: '%d.%m.' },
      values: langs,
      curve: 'curveMonotoneX',
      color: {
        scheme: 'schemeSet1'
      }
    }
    return { data, config, hashtag: hashtag.hashtag }
  }

  get tweetsChart() {
    const data = Object.entries(hashtag.date).map(([date, count]) => ({
      when: date,
      Tweets: count
    }))
    const config = {
      date: { key: 'when', inputFormat: '%Y-%m-%d', outputFormat: '%d.%m.' },
      values: ['Tweets'],
      curve: 'curveMonotoneX'
    }
    return { data, config, hashtag: hashtag.hashtag }
  }

  get langDistChart() {
    const others = Object.entries(hashtag.lang)
      .map(([lang, value]) => ({
        name: lang,
        total: value
      }))
      .sort((a, b) => b.total - a.total)
    const data = others.splice(0, 5)
    const othersEntry = others.reduce(
      (acc, el) => {
        acc.total += el.total
        return acc
      },
      {
        name: 'Andere',
        total: 0
      }
    )
    data.push(othersEntry)
    const config = {
      key: 'name',
      value: 'total',
      color: {
        scheme: 'schemeSet1'
      }
    }
    return { data, config, hashtag: hashtag.hashtag }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
