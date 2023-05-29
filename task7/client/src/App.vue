<template>
    <main class="relative overflow-hidden">
        <img src="./assets/uu.jpg" class="fixed z-[1] w-screen h-screen top-0" alt="">
        <blur-overlay :styleCom="['fixed', 'backdrop-blur-md', 'h-screen', 'w-screen']" />
        <RouterView class="z-[5] relative" />
    </main>
</template>

<script setup>
import BlurOverlay from "@/components/blurOverlay.vue";

</script>