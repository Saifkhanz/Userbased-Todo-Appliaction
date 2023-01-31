<script setup>
import { ref } from 'vue';
import { useTodoStore } from '@/store/todoStore';
const newTaskTitle = ref('')
const Props = defineProps({
    refrence:Array
})
const store = useTodoStore();
console.log("INPUT COMPONENT",Props.refrence)
function addTodoTask() {
    store.addTask(Props.refrence, newTaskTitle.value)
    newTaskTitle.value = '';
}
</script>
<template>
    <div>

<v-text-field v-model="newTaskTitle" @click:append-inner="addTodoTask" @keyup.enter="addTodoTask(newTaskTitle.value)"
    label="No more tasks, please!" append-inner-icon="mdi-plus" class="pa-3" outlined hide-details clearable
    variant="solo"></v-text-field>
    </div>
</template>

<style>

</style>