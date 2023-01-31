<!-- <template>
    <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
    >
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          v-bind="props"
        >
          Open Dialog
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          Use Google's location service?
        </v-card-title>
        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="$emit('close')"
          >
            No
          </v-btn>
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="store.deleteTask(task.id)"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template> -->

<template>
  <v-dialog v-model="dialog" :value="true" persistent max-width="300">
    <v-card>
      <v-card-title class="text-h5">
        Delete task?
      </v-card-title>
      <v-card-text>Are you sure  delete this task?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('close')" text>
          No
        </v-btn>
        <v-btn @click="store.deleteTask(task.id), $emit('close')" text>
          Yes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { ref } from 'vue';
import { useTodoStore } from '@/store/todoStore';
const store = useTodoStore();
const props = defineProps({
  task: Array
})
const dialog = ref(true)
</script>