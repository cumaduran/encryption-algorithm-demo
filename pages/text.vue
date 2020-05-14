<template>
  <v-container>
    <div v-if="!isCiphered">
      <!--   PLAIN TEXT-->
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10" lg="8" xl="6">
          <v-textarea
            v-model="plain"
            auto-grow
            autofocus
            clearable
            color="success"
            counter
            dark
            outlined
            shaped
            rows="3"
            label="Please enter the text you want to be encrypted."
          />
        </v-col>
      </v-row>
      <!--ROUND SELECT-->
      <v-row justify="center" align="center">
        <v-col cols="12" sm="4">
          <v-autocomplete
            v-model="round"
            clearable
            color="purple"
            dark
            outlined
            shaped
            :items="rounds"
            label="Select Round"
          />
        </v-col>
      </v-row>
      <!--  CIPHER BUTTON-->
      <v-row justify="center" align="center">
        <v-col cols="12" sm="10" lg="8" xl="6" class="text-center">
          <v-btn outlined dark color="success" :disabled="!isActive" @click="cipher">
            CIPHER TEXT
            <v-icon right dark>
              mdi-lock-plus
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <!--ORIGINAL AND RESULT TEXT-->
    <v-row v-if="isCiphered">
      <v-col cols="12" class="text-center">
        <p class="display-3">
          RESULTS
        </p>
      </v-col>
      <!-- ORIGINAL-->
      <v-col cols="12" md="6">
        <v-card elevation="10" shaped outlined dark raised>
          <v-card-title class="deep-purple">
            ORIGINAL TEXT
          </v-card-title>
          <v-card-text>
            <p class="display-1 mt-2">
              {{ plain }}
            </p>
          </v-card-text>
        </v-card>
        <!--STATISTICS-->
        <v-card>
          <v-card-title class="indigo mt-10">
            SIMPLE STATISTICS
          </v-card-title>
          <v-card-text class="text-center">
            <v-list>
              <v-list-item>
                <p class="headline">
                  Number of Characters in Plain Text : {{ plain.length }}
                </p>
              </v-list-item>
              <v-list-item>
                <p class="headline">
                  Number of Characters in Ciphered Text : {{ cipheredText.length }}
                </p>
              </v-list-item>
              <v-list-item>
                <p class="headline">
                  Number of Rounds : {{ round }}
                </p>
              </v-list-item>
              <v-list-item>
                <p class="headline">
                  Encryption Time : {{ time[0] }} seconds {{ Math.round(time[1] / Math.pow(10,6)) }} miliseconds
                </p>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <!--CIPHERED-->
      <v-col cols="12" md="6">
        <v-card
          elevation="10"
          shaped
          outlined
          dark
          raised
        >
          <v-card-title class="green">
            CIPHERED TEXT
          </v-card-title>
          <v-card-text>
            <p class="display-1 mt-2">
              {{ cipheredText }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-row v-if="isCiphered" justify="center" align="center">
        <v-col cols="12" sm="10" lg="8" xl="6" class="text-center">
          <v-btn outlined dark color="warning" :disabled="!isActive" @click="again">
            CIPHER NEW TEXT
            <v-icon right dark>
              mdi-restore
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-row>
    <!-- TRY AGAIN-->
  </v-container>
</template>
<script>
export default {
  layout: 'default',
  name: 'TextCipher',
  data () {
    return {
      plain: '',
      cipheredText: '',
      isActive: false,
      round: 8,
      rounds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      isCiphered: false,
      time: [0, 0]
    }
  },
  watch: {
    plain (val) {
      if (val === null) { this.plain = '' } else { val.length > 0 ? this.isActive = true : this.isActive = false }
    }
  },
  methods: {
    cipher () {
      this.$axios.post('/cipher/text', { plain: this.plain, round: this.round })
        .then((response) => {
          this.cipheredText = response.data.cipher
          this.time = response.data.time
          this.isCiphered = true
        })
    },
    again () {
      this.isCiphered = false
      this.plain = ''
      this.cipheredText = ''
      this.round = 8
    }
  }
}
</script>
