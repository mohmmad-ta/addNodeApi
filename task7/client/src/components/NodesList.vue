<script setup>
import BlurOverlay from "@/components/blurOverlay.vue";
import {defineEmits} from "vue";
import {RouterLink} from "vue-router";
const p=defineProps({
    nodes: {
        type: Array
    },
})
const emit = defineEmits(['toggelR'])
const toggelR = (id)=>{
    emit('toggelR', id)
}
</script>

<template>
  <div class="h-fit top-0 relative flex-wrap  z-20  w-full gap-4 py-10 flex justify-center overflow-hidden">
      <div v-for="node in nodes" :key="node.id">
          <div class="h-36 w-96 overflow-hidden relative text-white rounded-md">
              <blur-overlay :styleCom="['absolute', 'backdrop-blur-2xl', 'h-full', 'w-full']" />
              <div class="p-4 z-10 absolute top-0 left-0 w-full">
                  <div class="flex justify-between w-full">
                      <h2 class="text-co text-xl font-bold">{{node.title}}</h2>
                      <div class="flex items-center gap-2">
                        <router-link :to="{path: '/AddNode', query: {action: 'edit', id: node.id, title: node.title, text: node.text}}">
                          <i class="fa-solid fa-pen-to-square hover:text-co duration-150 cursor-pointer"></i>
                        </router-link>
                        <i @click.prevent="toggelR(node)" class="fa-solid fa-xmark hover:text-co duration-150 cursor-pointer"></i>
                      </div>
                  </div>
                  <p class="py-1 text-sm">{{node.text.length > 200 ? node.text.slice(1,200)+ "...." :  node.text}}</p>
              </div>
          </div>
      </div>
  </div>
</template>
