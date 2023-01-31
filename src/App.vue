<script setup>
</script>
<template>
  <div>
  <v-app class="grey lighten-4">
 
    <!-- <app-bar/> -->

    <v-main>
      <v-content class="mx-4 mb-4">
        <router-view>
        </router-view>
      </v-content>
    </v-main>
  </v-app>
  <!-- <snackbar /> -->
  </div>
</template>
<style>
@import 'bulma\css\bulma.min.css';
</style>
<!-- <template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
    
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
     
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({ drawer: null })
}
</script> -->