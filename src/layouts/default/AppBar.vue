<script>
import { ref } from 'vue';
import searchBar from '@/components/Tools/searchBar.vue';
</script>
<template>
<v-app-bar app color="teal-darken-4" image="https://picsum.photos/1920/1080?random" prominent>
    <template v-slot:image>
        <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
    </template>
    <v-app-bar-title>Todos</v-app-bar-title>
    <v-spacer></v-spacer>
    <search-bar />
    <v-btn icon>
        <v-icon>mdi-heart</v-icon>
    </v-btn>
</v-app-bar>
</template>
<style scoped>
 /* input{
  display: inline !important;
 } */
</style>
