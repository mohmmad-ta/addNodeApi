<template>
    <div class="py-24 container overflow-hidden relative">
        <nav class="w-full items-center text-white z-[10] h-16 bg-none relative rounded-md overflow-hidden">
            <blur-overlay :styleCom="['absolute', 'backdrop-blur-xl', 'h-16', 'w-full']" />
            <div class="container flex justify-between h-16 absolute z-40 items-center">
                <h1 class="font-bold text-xl">Nodes List</h1>
                <router-link :to="{path: '/AddNode', query: {action: 'add'}}">
                  <div class="flex justify-center gap-2 items-center hover:text-co duration-150 cursor-pointer">
                    <p>Add New</p>
                    <i class="fa-solid fa-plus"></i>
                  </div>
                </router-link>
            </div>
        </nav>
        <NodesList :nodes="nodes" @toggelR="toggelR" />
    </div>
    <RemoveNode @deleteAllNodes="deleteNodes" @toggelR="toggelR" v-show="showR"/>
</template>

<script setup>
import BlurOverlay from "@/components/blurOverlay.vue";
import NodesList from "@/components/NodesList.vue";
import {RouterLink, useRouter} from "vue-router";
import axios from "axios";
import {ref, onMounted} from "vue";
import RemoveNode from "@/components/RemoveNode.vue";

const nodes = ref([]);
const showAdd = ref(false);
const showR = ref(false);
const isMyNodes = ref('');
const isdel = ref({});
const router = useRouter();
const getAllNodes = async ()=>{
  const {data} = await axios.get(`nodes`)
  nodes.value = data
}
onMounted(getAllNodes)
const deleteNodes = async ()=>{
    await axios.delete(`nodes/${isdel.value.id}`)
  const index = nodes.value.indexOf(isdel);
  nodes.value.splice(index, 1);
  isdel.value = null
}
const addNote = async (note) => {
  const {data} = await axios.post('http://localhost:3000/api/v1/nodes',note)
  nodes.value.push(note);
  isEditingModalOpen.value = false;
}
const editingNote = ref();
const editNote = async (note) => {
  const {data} = await axios.patch(`http://localhost:3000/api/v1/nodes/${note.id}`)
  const index = nodes.value.indexOf(editingNote.value);
  nodes.value[index] = note;
  editingNote.value = null;
  isEditingModalOpen.value = false;
}

const toggelR = (node)=>{
    isdel.value = node;
    console.log(isdel.value)
    if (showR.value === true){
        showR.value = false
    }else {
        showR.value = true
    }
}

</script>