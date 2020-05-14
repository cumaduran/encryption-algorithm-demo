<template>
  <v-container>
    <!--IF CIPHER IS NOT COMPLETED-->
    <v-row v-if="typeof ciphered != 'object'" justify="center" align="center">
      <v-col cols="12" sm="4" class="text-center">
        <p class="text--red">
          <v-icon large color="primary">
            mdi-alert-octagram-outline
          </v-icon> Please note that this is just a demo.
        </p>
        <p>
          <v-icon large color="primary">
            mdi-alert-octagram-outline
          </v-icon> Encryption may take time, depending on the size and properties of the file you upload.
        </p>
        <p>
          <v-icon large color="error">
            mdi-alert-octagram-outline
          </v-icon> Please check back in a little while.
        </p>
      </v-col>

      <v-col cols="12" sm="4" class="text-center">
        <p>Encryption is in progress. Please wait.</p>
        <v-skeleton-loader
          type="card"
        />
      </v-col>
    </v-row>
    <!--IF CIPHER COMPLETED-->
    <v-row v-else justify="center">
      <!-- ORIGINAL-->
      <v-col cols="12" sm="6" xl="4" class="text-center">
        <v-card elevation="10" outlined dark raised>
          <div v-if="original.mimetype==='image/tiff'" class="indigo text-center">
            <p>Tiff images does not support your browser! You can download image, If you wish.</p>
            <a :href="'/uploads/images/'+original.name+original.ext"> <v-btn elevation="10" color="success" large rounded>
              Download <v-icon right>
                mdi-download
              </v-icon>
            </v-btn>
            </a>
          </div>
          <v-img v-else :src="'/uploads/images/'+original.name+original.ext" max-width="750" max-height="750" />
          <v-card-title class="deep-purple">
            ORIGINAL IMAGE
          </v-card-title>
          <v-card-text elevation="20">
            <v-list shaped dark>
              <v-list-item dark>
                <p class="headline">
                  {{ original.originalname }}
                </p>
              </v-list-item>
              <v-divider />
              <v-list-item>
                <p class="headline">
                  Image Size : {{ original.imageSize/1000 }} KB
                </p>
              </v-list-item>
              <v-divider />
              <v-list-item>
                <p class="headline">
                  Mime Type: {{ original.mimetype }}
                </p>
              </v-list-item>
              <v-divider />

              <v-list-item>
                <p class="headline">
                  Height of Image : {{ ciphered.height }}px
                </p>
              </v-list-item>
              <v-divider />

              <v-list-item>
                <p class="headline">
                  Width of Image : {{ ciphered.width }}px
                </p>
              </v-list-item>
              <v-divider />

              <v-list-item>
                <p class="headline">
                  Channels of Image : {{ ciphered.channels }}
                </p>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <!--CIPHERED-->
      <v-col cols="12" sm="6" xl="4">
        <v-card
          elevation="10"
          outlined
          dark
          raised
        >
          <div v-if="original.mimetype==='image/tiff'" class="indigo text-center">
            <p>Tiff images does not support your browser! You can download image, If you wish.</p>
            <a :href="'/uploads/ciphered/'+ciphered.name+ciphered.ext"> <v-btn elevation="10" color="success" large rounded>
              Download <v-icon right>
                mdi-download
              </v-icon>
            </v-btn>
            </a>
          </div>

          <v-img v-else :src="'/uploads/ciphered/'+ciphered.name+ciphered.ext" max-width="750" max-height="750" />
          <v-card-title class="green">
            CIPHERED IMAGE
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <p class="headline">
                  File Name : {{ ciphered.name }}
                </p>
              </v-list-item>
              <v-divider />
              <v-list-item>
                <p class="headline">
                  Height of Image : {{ ciphered.height }}px
                </p>
              </v-list-item>
              <v-divider />
              <v-list-item>
                <p class="headline">
                  Width of Image : {{ ciphered.width }}px
                </p>
              </v-list-item>
              <v-divider />
              <v-list-item>
                <p class="headline">
                  Channels of Image : {{ ciphered.channels }}
                </p>
              </v-list-item>
              <v-divider />
              <v-list-item>
                <p class="headline">
                  Number of Pixel of Image : {{ ciphered.pixels }}
                </p>
              </v-list-item>
              <v-divider />
              <v-list-item>
                <p class="headline">
                  Total Block Numbers : {{ ciphered.blocks }}
                </p>
              </v-list-item>
              <v-divider />
              <v-list-item>
                <p class="headline">
                  Encryption Time : {{ ciphered.second }} seconds {{ Math.round(ciphered.milisecond/ Math.pow(10,6)) }} miliseconds
                </p>
              </v-list-item>
              <v-divider />
              <v-list-item>
                <p class="headline">
                  Round Size : {{ ciphered.round }}
                </p>
              </v-list-item>
              <v-divider />
              <v-list-item>
                <p class="headline">
                  Matrix Traversal Method : {{ ciphered.method }}
                </p>
              </v-list-item>
              <v-divider />
              <v-list-item>
                <p class="headline">
                  Parallel Execution : {{ ciphered.parallel }}
                </p>
              </v-list-item>
              <v-divider />
              <v-list-item>
                <p class="headline">
                  Number of CPU : {{ ciphered.cpu }}
                </p>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  layout: 'default',
  name: 'IdVue',
  async asyncData (context) {
    const orj = await context.app.$axios.$get('/original/' + context.params.id)
    const ciph = await context.app.$axios.$get('/cipher/' + context.params.id)
    return { original: orj[0], ciphered: ciph[0] }
  },
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  }
}
</script>
