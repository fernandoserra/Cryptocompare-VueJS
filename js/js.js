Vue.component('mostrar-datos', {
  props: ['listar', 'valortipo'],
  template: `

  <v-layout row wrap >
  <v-flex xs12>
    <v-card dark color="grey lighten-4">
      <v-card-text style="color:#000">
        <center><h2>USD - {{valortipo}}</h2></center>
        <div :id="'chart-'+id"></div> 
      </v-card-text>
    </v-card>
  </v-flex>

  <v-flex xs12>
    <v-card dark color="grey lighten-4">
      <v-card-text style="color:#000">
        <div v-if="listar.length > 1">
        
          {{mostrar(listar,valortipo)}}
          
          <v-data-table v-bind:headers="headers" :items="listar" hide-actions class="elevation-1">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.time }}</td>
              <td class="text-xs-right">{{ props.item.close }}</td>
              <td class="text-xs-right">{{ props.item.high }}</td>
              <td class="text-xs-right">{{ props.item.low }}</td>
              <td class="text-xs-right">{{ props.item.open }}</td>
              <td class="text-xs-right">{{ props.item.volumefrom }}</td>
              <td class="text-xs-right">{{ props.item.volumeto }}</td>
            </template>
          </v-data-table>

            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>`,
  data: function () {
    return {
      msj2: 'Inicio del componente ',
      headers: [
        {
          text: 'Fecha',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Cierre', value: 'Cierre' },
        { text: 'Alto ', value: 'Alto' },
        { text: 'Bajo', value: 'Bajo' },
        { text: 'Abierto', value: 'Abierto' },
        { text: 'VolumeFrom', value: 'VolumeFrom' },
        { text: 'VolumeTo', value: 'VolumeTo' }
      ]
    }
  },
  created: function () {
    console.log('creacion')
    console.log('vv: ' + this._uid)
    this.id = this._uid;
    console.log('va: ' + this.id)
  },
  mounted: function () {
  },
  methods: {
    mostrar: function (listar, valortipo) {
      console.log('mostrar Grafica')
      console.log('tipo: ' + valortipo + '(' + typeof valortipo + ')')

      var row_time = []
      var row_valor = []
      listar.forEach(element => {
        row_time.push(moment.unix(element.time).format("Y-MM-DD H:M:SS"))
        row_valor.push(element.high)
      });
      console.log(row_time)
      console.log("****************")
      console.log(row_valor)
      console.log(this.id)
      var chart = c3.generate({
        bindto: "#chart-" + this.id,
        data: {
          x: 'x',
          xFormat: '%Y-%m-%d %H:%M:%S',
          json: {
            x: row_time,
            data1: row_valor
          }
        },
        axis: {
          x: {
            type: 'timeseries',
            localtime: true,
            tick: {
              format: '%Y-%m-%d %H:%M:%S'
            }
          }
        }

      });

      return
    }
  }
})
new Vue({
  el: '#app',
  data: {
    titulo: 'Vue.js - Cryptocompare API ',
    listar: {},
    listar2: {},
    listar3: {},
    valortipo: {},
    valortipo2: {},
    valortipo3: {}
  },
  mounted: function () {
    this.BTC();
    this.ETH();
    this.DASH();
  },
  methods: {
    BTC: function () {
      console.log('Entrando a BTC')
      var urlServer = 'https://min-api.cryptocompare.com/data/histohour?fsym=BTC&tsym=USD&limit=24&aggregate=1&e=CCCAGG'
      var _this = this;
      var confiAxios = {
        url: urlServer,
        method: 'get',
        responseType: 'json',
        headers: { 'Content-Type': 'application/json' }
      };
      axios.request(confiAxios)
        .then(function (response) {
          var row = []
          response.data.Data.forEach(element => {
            row.push([element.time])
          });
          _this.valortipo = 'BTC'
          return _this.listar = response.data.Data
        });
    },

    ETH: function () {
      console.log('Entrando a ETH')
      var urlServer = 'https://min-api.cryptocompare.com/data/histohour?fsym=ETH&tsym=USD&limit=24&aggregate=1&e=CCCAGG'
      var _this = this;
      var confiAxios = {
        url: urlServer,
        method: 'get',
        responseType: 'json',
        headers: { 'Content-Type': 'application/json' }
      };
      axios.request(confiAxios)
        .then(function (response) {
          console.log(response.data.Data)
          var row = []
          response.data.Data.forEach(element => {
            row.push([element.time])
          });
          _this.valortipo2 = 'ETH'
          return _this.listar2 = response.data.Data
        });
    },
    DASH: function () {
      console.log('Entrando a DASH')
      var urlServer = 'https://min-api.cryptocompare.com/data/histohour?fsym=DASH&tsym=USD&limit=24&aggregate=1&e=CCCAGG'
      var _this = this;
      var confiAxios = {
        url: urlServer,
        method: 'get',
        responseType: 'json',
        headers: { 'Content-Type': 'application/json' }
      };
      axios.request(confiAxios)
        .then(function (response) {
          console.log(response.data.Data)
          var row = []
          response.data.Data.forEach(element => {
            row.push([element.time])
          });
          _this.valortipo3 = 'DASH'
          return _this.listar3 = response.data.Data
        });
    }
  }
})
