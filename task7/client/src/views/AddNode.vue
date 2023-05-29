<template>
    <div class="h-screen top-0 fixed z-20  w-screen flex justify-center items-center overflow-hidden md:container">
        <blur-overlay @click="toggelA" :styleCom="['absolute', 'backdrop-blur-xl', 'h-full', 'w-screen']" />
        <div class="text-white w-[25rem] text-left h-fit overflow-hidden relative rounded-md">
            <form class="relative z-40 p-10 flex flex-wrap gap-4">
                <h2 class="text-center w-full text-xl p-3 text-co">Nodes</h2>
                <input v-model.trim="node.title" type="text" class="w-full px-4 py-2 text-co outline-none rounded-sm" placeholder="Title" required/>
                <textarea v-model.trim="node.text" type="text" class="w-full px-4 py-2 text-co outline-none rounded-sm" placeholder="Enter Your Node" required/>
                <div class="flex w-full justify-center p-2">
                    <button @click.prevent="addNode" type="submit" class="duration-150 rounded-sm bg-co px-3.5 py-2 text-white font-bold shadow-sm hover:bg-amber-400">Save</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import BlurOverlay from "@/components/blurOverlay.vue";
import {useRoute, useRouter} from "vue-router";
const route = useRoute()
const router = useRouter()
const par = ref('');
import axios from "axios";
const node = ref({
    title: '',
    text: '',
});

const data = ()=>{
  par.value = route.query.action
  node.value.title = route.query.title
  node.value.text = route.query.text
}
onMounted(data)

const addNode = async ()=>{
  if (par.value === 'add'){
    if (node.value.text !== '' && node.value.title !== ''){
      await axios.post('nodes', {
        title: node.value.title,
        text: node.value.text
      })
    }
  }else {
    await axios.patch(`nodes/${route.query.id}`, {
      title: node.value.title,
      text: node.value.text
    })
    router.back()
  }
}


</script>