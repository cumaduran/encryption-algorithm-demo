<template>
  <v-container>
    <v-card dark shaped outlined raised elevation="15">
      <v-toolbar dark>
        <v-toolbar-title class="text-center">
          GALLERY OF CIPHERED IMAGES
        </v-toolbar-title>
        <v-spacer />
        <v-text-field
          v-model="search"
          dark
          single-line
          prepend-inner-icon="mdi-magnify"
          clearable
          clear-icon="mdi-close"
          placeholder="Search"
          :footer-props="{
            showFirstLastPage: true,
            firstIcon: 'mdi-arrow-collapse-left',
            lastIcon: 'mdi-arrow-collapse-right',
            prevIcon: 'mdi-minus',
            nextIcon: 'mdi-plus'
          }"
        />
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="normalimages"
        :search="search"
        dark
      >
        <template v-slot:item.image="{item}">
          <v-avatar @click="openimg('/uploads/images/'+item.name+item.ext)">
            <img :src="'/uploads/images/'+item.name+item.ext" alt="">
          </v-avatar>
        </template>
        <template v-slot:item.name="{item}">
          <v-chip dark color="primary">
            {{ item.name }}
          </v-chip>
        </template>
        <template v-slot:item.imageSize="{item}">
          <v-chip dark>
            {{ item.imageSize/1000 }} KB
          </v-chip>
        </template>
        <template v-slot:item.action="{item}">
          <v-btn dark rounded :to="/gallery/+item.name">
            Ciphered
            <v-icon right dark>
              mdi-image
            </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <v-overlay
      :z-index="0"
      :value="showimg"
      class="text-center"
    >
      <v-img :src="img" max-width="400" max-height="400" />
      <v-spacer />
      <v-btn
        x-large
        color="error"
        icon
        elevation="15"
        @click="showimg = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-overlay>
  </v-container>
</template>
<script>
export default {
  layout: 'default',
  name: 'Index',
  async asyncData (context) {
    // get original images
    const data = await context.app.$axios.$get('/originals')
    return { normalimages: data }
  },
  data () {
    return {
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Image', value: 'image' },
        { text: 'Name', value: 'name' },
        { text: 'Show Ciphered', value: 'action' },
        { text: 'Original Name', value: 'originalname' },
        { text: 'Extension', value: 'ext' },
        { text: 'Mime Type', value: 'mimetype' },
        { text: 'Image Size', value: 'imageSize' },
        { text: 'Number of Rounds', value: 'round' },
        { text: 'Traversal', value: 'method' }],
      search: '',
      img: '',
      showimg: false
    }
  },

  methods: {
    openimg (path) {
      this.img = path
      this.showimg = true
    }
  }
}
</script>

<style scoped>

</style>
