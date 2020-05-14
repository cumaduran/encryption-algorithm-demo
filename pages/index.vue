<template>
  <v-layout>
    <v-flex class="text-center">
      <img
        src="/logo.svg"
        height="150"
        width="150"
      >
      <blockquote class="blockquote">
        <p class="title">
          Welcome !
        </p>
        <p v-for="(value,index) in warnings" :key="index">
          <v-icon v-if="index ==warnings.length-1" x-large color="red">
            mdi-alert-octagon-outline
          </v-icon>
          <v-icon v-else x-large color="warning">
            mdi-alert-octagon-outline
          </v-icon>
          {{ value }}
        </p>
        <p>
          <v-icon color="success">
            mdi-clover
          </v-icon> Good Encryptions!
        </p>
        <v-icon class="">
          mdi-ghost
        </v-icon> <a href="https://ieeexplore.ieee.org/abstract/document/9044816">An Image Encryption Algorithm Based on Chaotic Selection of Robust Cryptographic Primitives </a>
        <footer class="mt-5">
          <small class="">
            <em>@0xcmdr</em>
          </small>
          <v-divider class="mr-5 ml-5" vertical dark />
          <a href="https://github.com/0xcmdr" alt="0xcmdr Github"><v-icon>mdi-github</v-icon></a>
        </footer>
      </blockquote>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  layout: 'default',
  data () {
    return {
      warnings: [
        'This website is designed to simply show the Image / Text Encryption Algorithm in the link below. You can review the article for more details.',
        'While programming the algorithm, JavaScript and NodeJS were mainly used.',
        'In order not to overload the servers, the application has not been parallelized. It runs on a single processor core at normal runtime.',
        'For the above reasons, keep in mind that the speed and performance of the algorithm will differ from what is shown on this site in actual usage scenarios.',
        'If you are curious about the details of the functions in the algorithm, you can look at the documentation in the menu on the left.',
        'The algorithm only performs encryption. CKG Key Generation and Decryption functions will be added in later versions.'
      ]
    }
  }
}
</script>
