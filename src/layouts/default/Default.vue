<template>
  <v-app>
    <default-bar />
    <navigation />
    <default-view />
  </v-app>
</template>

<script setup>
  import navigation from '@/components/navigation.vue';
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'
</script>
