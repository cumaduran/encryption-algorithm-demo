<template>
  <v-container>
    <v-container v-show="!isimage">
      <v-form ref="myform">
        <!--SELECT IMAGE-->
        <v-row justify="center" align="center">
          <v-col cols="12" sm="10" lg="8" xl="6">
            <v-file-input
              v-model="image"
              :value="image"
              show-size
              outlined
              :rules="big"
              accept="image/png, image/jpeg, image/bmp, image/tiff, image/webp"
              placeholder="Pick an Image"
              prepend-icon="mdi-camera"
              label="Select an Image"
              shaped
              chips
              color="success"
              @change="check"
            />
          </v-col>
        </v-row>
        <v-row justify="center" align="center">
          <!--      SELECT ROUND-->
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
          <!--      SELECT TRAVERSAL-->
          <v-col cols="12" sm="4">
            <v-autocomplete
              v-model="travel"
              auto-select-first
              clearable
              color="purple"
              dark
              outlined
              shaped
              :rules="ruleTravel"
              :items="travels"
              label="Matrix Traversal Method"
            />
          </v-col>
        </v-row>
        <!--CIPHER BUTTON-->
        <v-row justify="center" align="center">
          <v-col cols="12" sm="10" lg="8" xl="6" class="text-center">
            <v-btn outlined dark color="success" :disabled="!isActive" @click="gonder">
              CIPHER IMAGE
              <v-icon right dark>
                mdi-lock-plus
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
    <!--RESULTS-->
    <v-container v-if="isimage">
      <!--ORIGINAL AND CIPHER-->
      <v-row justify="center">
        <v-col cols="12" class="text-center">
          <p class="display-3">
            RESULTS
          </p>
          <v-btn outlined dark color="warning" large @click="refresh">
            CIPHER ANOTHER <v-icon right dark>
              mdi-restore
            </v-icon>
          </v-btn>
        </v-col>
        <!-- ORIGINAL-->
        <v-col cols="12" sm="6" xl="4">
          <v-card elevation="10" outlined dark raised>
            <div v-if="normalimage.mimetype==='image/tiff'" class="indigo text-center">
              <p>Tiff images does not support your browser! You can download image, If you wish.</p>
              <a :href="'uploads/images/'+normalimage.filename"> <v-btn elevation="10" color="success" large rounded>
                Download <v-icon right>
                  mdi-download
                </v-icon>
              </v-btn>
              </a>
            </div>
            <v-img v-else :src="'uploads/images/'+normalimage.filename" max-width="750" max-height="750" />
            <v-card-title class="deep-purple">
              ORIGINAL IMAGE
            </v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <p class="headline">
                    Original Name : {{ normalimage.originalname }}
                  </p>
                </v-list-item>
                <v-divider />
                <v-list-item>
                  <p class="headline">
                    Image Size : {{ normalimage.size/1000 }} KB
                  </p>
                </v-list-item>
                <v-divider />
                <v-list-item>
                  <p class="headline">
                    Mime Type: {{ normalimage.mimetype }}
                  </p>
                </v-list-item>
                <v-divider />
                <v-list-item v-if="isCiphered">
                  <p class="headline">
                    Height of Image : {{ cipheredImage.height }}px
                  </p>
                </v-list-item>
                <v-divider />
                <v-list-item v-if="isCiphered">
                  <p class="headline">
                    Width of Image : {{ cipheredImage.width }}px
                  </p>
                </v-list-item>
                <v-divider />
                <v-list-item>
                  <p v-if="isCiphered" class="headline">
                    Channels of Image : {{ cipheredImage.channels }}
                  </p>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
        <!--CIPHERED-->
        <v-col cols="12" sm="6" xl="4">
          <p v-if="!isCiphered" class="text-red">
            <v-icon large color="warning">
              mdi-alert-octagram-outline
            </v-icon>Please note that this is just a demo.
          </p>
          <p v-if="!isCiphered">
            <v-icon large color="warning">
              mdi-alert-octagram-outline
            </v-icon> Encryption may take time, depending on the size and properties of the file you upload.
          </p>
          <v-skeleton-loader
            v-if="loading"
            type="card-avatar"
          />
          <p v-if="!isCiphered">
            <v-icon large color="error">
              mdi-alert-octagram-outline
            </v-icon> If you do not want to wait, you can query the picture from the <nuxt-link to="/gallery">
              Gallery
            </nuxt-link> using this file name. => {{ normalimage.filename }}
          </p>

          <v-card
            v-else
            elevation="10"
            outlined
            dark
            raised
          >
            <div v-if="normalimage.mimetype==='image/tiff'" class="indigo text-center">
              <p>Tiff images does not support your browser! You can download image, If you wish.</p>
              <a :href="'uploads/ciphered/'+cipheredImage.filename"> <v-btn elevation="10" color="success" large rounded>
                Download <v-icon right>
                  mdi-download
                </v-icon>
              </v-btn>
              </a>
            </div>
            <v-img v-else :src="'uploads/ciphered/'+cipheredImage.filename" max-width="750" max-height="750" />
            <v-card-title class="green">
              CIPHERED IMAGE
            </v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <p class="headline">
                    File Name : {{ normalimage.filename }}
                  </p>
                </v-list-item>
                <v-divider />
                <v-list-item>
                  <p class="headline">
                    Height of Image : {{ cipheredImage.height }}px
                  </p>
                </v-list-item>
                <v-divider />
                <v-list-item>
                  <p class="headline">
                    Width of Image : {{ cipheredImage.width }}px
                  </p>
                </v-list-item>
                <v-divider />
                <v-list-item>
                  <p class="headline">
                    Channels of Image : {{ cipheredImage.channels }}
                  </p>
                </v-list-item>
                <v-divider />
                <v-list-item>
                  <p class="headline">
                    Number of Pixel of Image : {{ cipheredImage.arrsize }}
                  </p>
                </v-list-item>
                <v-divider />
                <v-list-item>
                  <p class="headline">
                    Total Block Numbers : {{ cipheredImage.ciphered[0] }}
                  </p>
                </v-list-item>
                <v-divider />
                <v-list-item>
                  <p class="headline">
                    Encryption Time : {{ cipheredImage.exec[0] }} seconds {{ Math.round(cipheredImage.exec[1] / Math.pow(10,6)) }} miliseconds
                  </p>
                </v-list-item>
                <v-divider />
                <v-list-item>
                  <p class="headline">
                    Round Size : {{ round }}
                  </p>
                </v-list-item>
                <v-divider />
                <v-list-item>
                  <p class="headline">
                    Matrix Traversal Method : {{ travel }}
                  </p>
                </v-list-item>
                <v-divider />
                <v-list-item>
                  <p class="headline">
                    Parallel Execution : No
                  </p>
                </v-list-item>
                <v-divider />
                <v-list-item>
                  <p class="headline">
                    Number of CPU : 1
                  </p>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>

export default {
  layout: 'default',
  data () {
    return {
      image: [],
      cipheredImage: { ciphered: [0], exec: [0, 0] },
      isActive: false,
      isCiphered: false,
      isimage: false,
      travel: 'zigzag',
      round: 8,
      rounds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      travels: ['zigzag'],
      normalimage: { },
      ciphered: '',
      loading: true,
      big: [
        value => !value || /^.+\.(([tT][iI][fF][fF])|([wW][eE][bB][pP])|([jJ][pP][eE][gG])|([jJ][pP][gG])|([pP][nN][gG]))$/.test(value.name) || 'Support only jpg,png,tiff or webp images !',
        value => !value || value.size < 500000 || 'Image size should be less than 500 KB !'],
      /* big: [value => !value || value.size < 500000 || 'Image size should be less than 500 KB !'], */
      ruleTravel: [(value => value && value.length > 0) || 'Traversal required!']
    }
  },
  watch: {
    // control button visibility
    image (val) {
      // if any images is selected by user, activate the button
      this.isActive = (typeof val !== 'undefined' && this.$refs.myform.validate())
    }
  },
  methods: {
    check () {
    /*  this.isActive = this.$refs.myform.validate() */
    },
    async gonder () {
      // create new Form Data object for posting images
      const formdata = new FormData()
      // Append uploaded images into FormData object
      formdata.append('cipher', this.image)
      formdata.append('round', this.round)
      formdata.append('travel', this.travel)
      // Send image to server and save to disk, return image properties
      this.normalimage = await this.$axios
        .$post('/cmd', formdata, { headers: { 'Content-Type': 'multipart/form-data' } })
      if (this.normalimage.path) {
        // hide inputs
        this.isimage = true
        // send file properties which located on disk and wait ciphered version
        this.cipheredImage = await this.$axios
          .$post('/cipher/image', { path: this.normalimage.path, filename: this.normalimage.filename, round: this.round, travel: this.travel })
        this.isCiphered = true
        this.loading = false
      }
    },
    refresh () {
      this.image = []
      this.isimage = false
      // empty file-input array
      this.isCiphered = false
      this.loading = true
      this.cipheredImage = { ciphered: [0], exec: [0, 0] }
      this.normalimage = { }
    }

  }

}
</script>
