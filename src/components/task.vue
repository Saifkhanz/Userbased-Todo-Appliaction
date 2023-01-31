<template>
   <div>
    <v-list class="pa-0" flat>
        <!-- <draggable v-model="tasks" handle=".handle"> -->
        <new-list v-for="(task, index) in tasks" :key="index" :task="task" />
        <!-- </draggable> -->
    </v-list>
   </div>
</template>
<script setup>
import newList from './newList.vue';
import { useTodoStore } from '@/store/todoStore';
import { ref, computed, onMounted } from 'vue'
import { get, set } from "@firebase/database";
const store = useTodoStore();
const tasks = computed({
    get() {
        return store.tasksFiltered()
    },
    // set(value)
    // {
    // store.setTasks(value)
    // }   
})
onMounted(() => {
    store.getTodos()
    console.log("TASKS",tasks)
})
console.log("TASKS",tasks)
</script>
<style scoped>

</style>