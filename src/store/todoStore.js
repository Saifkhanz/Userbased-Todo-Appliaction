import { defineStore } from 'pinia';
import { ref as vueRef, computed, watch, reactive } from 'vue';
import { db, database } from '../firebase.js';
import {
    collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc
    , query, orderBy
} from 'firebase/firestore'
import { ref, onValue } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { useUserStore } from './userStore.js';

export const useTodoStore = defineStore('todo_store', () => {
    //  state

    const search = vueRef();
    const refernce = vueRef();
    let newTodo = vueRef([]);
    let saveTodo = vueRef([])
    const userStore = useUserStore()
    // userStore.userUID
    const r = collection(db, "USER", userStore.userUID, "TODOS")
    console.log("r from todo Store",r)
    // let snackbar = reactive({
    //     show: false,
    //     text: 'There is no message for you'
    // });
    const queryRefernce = query(r, orderBy('date', 'desc'))
    // Actions
    // getting data from firebase and store in pinia memory

    // async function getTodos(queryRefernce) {
    //     try {
    //         onSnapshot(queryRefernce, (docsSnap) => {
    //             const fbTodos = []
    //             docsSnap.forEach(doc => {
    //                 const t = {
    //                     id: doc.id,
    //                     content: doc.data().content,
    //                     done: doc.data().done,
    //                     favorite: doc.data().favorite
    //                 }
    //                 fbTodos.push(t)
    //             })
    //             newTodo.value = fbTodos
    //             saveTodo.value = newTodo.value
    //             console.log(newTodo.value, "SAVE TODO")
    //         })
    //     }
    //     catch (error) {
    //         console.log(error)
    //     }
    // }
    async function getTodos() {
        try {
            onSnapshot(queryRefernce, (docsSnap) => {
                const fbTodos = []
                docsSnap.forEach(doc => {
                    const t = {
                        id: doc.id,
                        content: doc.data().content,
                        done: doc.data().done,
                        favorite: doc.data().favorite
                    }
                    fbTodos.push(t)
                })
                newTodo.value = fbTodos
                saveTodo.value = newTodo.value
                console.log(newTodo.value, "SAVE TODO")
            })
        }
        catch (error) {
            console.log(error)
        }
    }
    // actions
    // add Task data in firebase  
    async function addTask(taskRef, textValue) {
        try {
            console.log("Debugging reference in add Task", taskRef, "TextVALUE",textValue)
            const newTask = await addDoc(taskRef, {
                content: textValue,
                done: false,
                date: Date.now(),
                favorite: false
            })
            refernce.value = taskRef;
            console.log("Your task is added", newTask,"Refernce in Todo Store",refernce.value)
            //  showSnackbar("Your task is added");
        } catch (error) {
            console.log(error)
        }
    }
    // Delete Task
    async function deleteTask(taskId) {
        console.log(taskId)
        console.log("refernce", r)
        try {
            deleteDoc(doc(r, taskId))
            dialogs.delete = false
            // showSnackbar("Your task is deleted");
        } catch (error) {
            console.log(error)
        }
    }

    // Filter Task
    function tasksFiltered() {
        if (!search.value) {
            return saveTodo.value
        }
        return saveTodo.value.filter(todo => todo.content.toLowerCase().includes(search.value.toLowerCase()))

    }
    //     watch(search, () => {
    //         saveTodo.value = newTodo.filter(todo => todo.content.toLowerCase().includes(search.value.toLowerCase()))
    //         console.log(search.value,"OO meri ",saveTodo.value)
    //   })
    // function setTasks(value) {
    //     saveTodo.value=value
    // }
    // get Data from firebase 
    function updateTask(payload) {
        const data = {
            content: payload.content
        }
        updateDoc(doc(r, payload.id), data).then(docRef => {
            console.log("A New Document Field has been added to an existing document");
            // showSnackbar("Your task is updated");
        }).catch((error) => {
            console.log(error)
        })
    }
    // add to favorite
    function addFavorite(taskIndex, taskId) {
        console.log("TASKID", taskIndex, "taskID", taskId);
        const index = newTodo.value.findIndex(todo => todo.id === taskId)
        console.log(index, "index");
        updateDoc(doc(r, taskId), {
            favorite: !newTodo.value[index].favorite
        })
        showSnackbar("Your task is added as Favorite");
    }
    // function showSnackbar(text) {
    //     if (snackbar.show) {
    //         snackbar.show = false
    //     }
    //     setTimeout(() => {
    //         snackbar.show = true
    //         snackbar.text = text
    //     }, 100)
    // }   
    return { addTask, getTodos, newTodo, saveTodo, search, tasksFiltered, deleteTask, updateTask, addFavorite }
})