<script setup>
import { ref, reactive } from 'vue';
import { useTodoStore } from '@/store/todoStore';
import deleteTask from "./dialouges/deleteTask.vue";
import Edit from './dialouges/edit.vue'
const dialogs = reactive({
    delete: false,
    edit: false
})
const store = useTodoStore();
const items = reactive([
    {
        icon: 'mdi-pencil',
        title: 'Edit Task',
        clickHandler: function () {

            dialogs.edit = true;
        }

    },
    {
        icon: 'mdi-delete',
        title: 'Delete Task',
        clickHandler: function () {
            dialogs.delete = true;
        }
    },
    {
        icon: 'mdi-heart',
        title: 'Add to favorite',
        clickHandler: function (taskIndex,taskId) {
            console.log("CLICK HANDLER",taskIndex,"hsa",taskId)
            // const index = store.newTodo.findIndex(todo => todo.id === taskId)
            // updateDoc(doc(r, taskId), {
            //     favorite: !store.newTodo[index].favorite
            // })
            // alert("Added to favorite")
            store.addFavorite(taskIndex,taskId)
        }
    },
])
function handleClick(index,taskId) {
    items[index].clickHandler(index,taskId)
}
const Props = defineProps({
    task: Array
})
// const store = useTodoStore();
</script>
<template>
    <div>
        <v-menu end>
            <template v-slot:activator="{ props }">
                <v-btn color="Blue Gray 50" v-bind="props">
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>
            <v-list>
                <!-- @click="item.clickHandler(item.text)" :value="item" -->
                <!-- <v-list-item v-for="(item,index) in items" :key="index"  @click="item.clickHandler(item)"> -->
                <v-list-item v-for="(item, index) in items" :key="index" @click="handleClick(index,task.id)">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{ item.title }}  {{task.content }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <deleteTask v-if="dialogs.delete" @close="dialogs.delete = false" :task="task" />
        <edit v-if="dialogs.edit" @close="dialogs.edit=false" :task="task" />
    </div>
</template>
<style scoped>

</style>