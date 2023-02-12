<template>
  <div class="flex flex-col bg-gray-100 w-full h-dvh">
    <HeaderComponent />
    <div class="flex flex-grow w-full">
      <SidebarComponent class="bg-white w-[210px]" />
      <PlayGround class="flex-grow" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import HeaderComponent from '@/components/Header/index.vue'
  import SidebarComponent from '@/components/SideBar/index.vue';
  import PlayGround from '@/components/Playground/index.vue';
</script>