<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      expand-on-hover
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <!--DOCUMENTATION-->
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-book-open</v-icon>
          </v-list-item-action>
          <v-list-item-content class="white--text">
            <a href="/out/index.html">
              Documentation
            </a>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-content>
      <v-container fluid fill-height>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      app
      dark

      class="text-center"
    >
      <v-col class="text-center">
        <span>&copy; {{ new Date().getFullYear() }}</span>
        <v-divider class="mr-5 ml-5" vertical dark />
        <a href="https://github.com/0xcmdr"><v-icon>mdi-github</v-icon></a>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: true,
      drawer: true,
      miniVariant: true,
      title: 'Image/Text Encryption Algorithm - Simple Demo',
      items: [
        {
          icon: 'mdi-shield-home-outline',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-image',
          title: 'Image Cipher',
          to: '/image'
        },
        {
          icon: 'mdi-script-text',
          title: 'Text Cipher',
          to: '/text'
        },
        {
          icon: 'mdi-image-multiple',
          title: 'Gallery',
          to: '/gallery'
        }

      ]

    }
  }
}
</script>
<style>
  a:link{
    text-decoration:none;
  }
</style>
