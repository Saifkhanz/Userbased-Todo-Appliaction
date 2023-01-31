<template>
        <div>
        <!--  Display Task -->
        <!-- <v-list lines="one" select-strategy="multiple"> -->
            <!-- <div v-for="task in tasks" :key="task.id"> -->

                
            <!-- <v-list-item value="notifications" @click="doneTask(task.id)" :class="{ 'blue': task.done }"> -->
                
            <v-list-item value="notifications">
                <template v-slot:prepend>
                    <v-list-item-action start>
                        <v-checkbox-btn @click.stop="markDone(task.id)" :model-value="task.done"
                            v-model="task.done"></v-checkbox-btn>
                    </v-list-item-action>
                     <v-list-item-content @click.stop="" >
                    <v-list-item-title  :class="{ 'text-decoration-line-through': task.done }"
                        class="text-wrap ml-3">{{
                            task.content
                        }}</v-list-item-title>
                     </v-list-item-content>
                    <v-list-item-action end>
                        <!-- <menu-data/> -->
                        <task-menu :task="task" />
                        <!-- <v-btn end icon="mdi-heart" color="primary"></v-btn> -->
                        <!-- <v-menu end>
                                <template v-slot:activator="{ props }">
                                    <v-btn color="Blue Gray 50" v-bind="props">
                                        <v-icon>mdi-dots-vertical</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    ssss@click="item.clickHandler(item.text)" :value="item"ssss
                                    <v-list-item v-for="(item, index) in items" :key="index" :value="index"
                                        @click="item.clickHandler(task.id)">
                                        <v-list-item-icon>
                                            <v-icon>{{ item.icon }}</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu> -->
                    </v-list-item-action>
                </template>
                <!-- <v-dialog v-model="dialogs.delete" width="500">
                        <template v-slot:activator="{}">
                            nahi<v-btn color="primary" v-on="on"></v-btn>nahi
                        </template>
                        <v-card>
                            <v-card-title>
                                Delete task
                            </v-card-title>
                            <v-card-text>
                                Which Task you want to delete?
                            </v-card-text>
                            <v-card-actions v-for="i in store.saveTodo" :key="i.id">
                                {{ i.content }}
                                <v-btn color="green darken-1" text @click="dialogs.delete = false">Cancel</v-btn>
                                <v-btn color="red darken-1" text @click="DeleteTask(i)">Delete</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog> -->

                </v-list-item>
                <v-divider></v-divider>

            </div>
        <!-- </v-list> -->

</template>
<script setup>
import TaskMenu from './TaskMenu.vue'
// import searchBar from "./Tools/searchBar.vue";
// import navigation from "./navigation.vue";
import { useTodoStore } from "@/store/todoStore";
import { reactive, ref, onMounted, computed } from "vue";
// import menuData from '../compo/menuData.vue'
// import { useRoute, useRouter } from 'vue-router';
import { db } from '../firebase.js';
import {
    collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc
    , query, orderBy
} from 'firebase/firestore'
import { get, set } from "@firebase/database";
import { useUserStore } from '@/store/userStore';
// const route = useRoute()
// const router = useRouter()
// const userUID = route.params.id
// const userR = collection(db, 'USER')
const Store = useUserStore();
const r = collection(db, "USER", Store.userUID, "TODOS")
// console.log("UID", userUID, r)
// const queryRefernce = query(r, orderBy('date', 'desc'))
// const newTaskTitle = ref('')
const store = useTodoStore();

const Props = defineProps({
    task: Array,
    // r:Array
})
console.log(Props, "RIP")
// function addTodoTask() {
//     store.addTask(r, newTaskTitle.value)
//     newTaskTitle.value = '';
// }
onMounted(() => {
    store.getTodos()
    // console.log("store se new list", store.newTodo.content)
})
// const dialogs = reactive({ delete: false })
// const items = reactive([
//     {
//         icon: 'mdi-pencil',
//         title: 'Edit Task',
//         clickHandler: function (taskId) {
//            
//             
//             let output = prompt("New Value", store.newTodo[index].content)
//             if (output) {
//                 store.newTodo[index].content = output
//                 const data = {
//                     content: store.newTodo[index].content
//                 }
//                 updateDoc(doc(r, taskId), data).then(docRef => {
//                     console.log("A New Document Field has been added to an existing document");
//                 }).catch((error) => {
//                     console.log(error)
//                 })
//             }
//             else {
//                 alert("Data is not update")
//             }
//         }

//     },
//     {
//         icon: 'mdi-delete',
//         title: 'Delete Task',
//         clickHandler: function (taskId) {
//             // if (confirm("Are you Sure"))
//             //     deleteDoc(doc(r, taskId))
//             dialogs.delete = true;
//             // DeleteTask(taskId);
//         }
//     },
//     {
//         icon: 'mdi-heart',
//         title: 'Add to favorite',
//         clickHandler: function (taskId) {
//             const index = store.newTodo.findIndex(todo => todo.id === taskId)
//             updateDoc(doc(r, taskId), {
//                 favorite: !store.newTodo[index].favorite
//             })
//             alert("Added to favorite")
//         }
//     },

// ])
const markDone = (taskId) => {
    const index = store.newTodo.findIndex(todo =>
        todo.id === taskId
        //    console.log(todo,taskId)
    )
    console.log(index)
    updateDoc(doc(r, taskId), {
        done: !store.newTodo[index].done
    })
}
// async function DeleteTask(taskId) {
//     console.log(taskId)
//     try {
//         deleteDoc(doc(r, taskId.id))
//         dialogs.delete = false

//     } catch (error) {
//         console.log(error)
//     }
// }
// const tasks = computed({
//     get() {
//         return store.tasksFiltered()
//     },
//     // set(value)
//     // {
//     // store.setTasks(value)
//     // }
// })
</script>
<style scoped>

</style>