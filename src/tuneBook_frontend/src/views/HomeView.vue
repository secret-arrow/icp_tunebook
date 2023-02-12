<template>
  <div class="flex flex-col bg-gray-100 w-full h-dvh">
    <HeaderComponent />
    <div class="flex flex-grow w-full">
      <SidebarComponent class="bg-white w-[210px]" />
      <OriginalTunes class="flex-grow" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import HeaderComponent from '@/components/Header/index.vue'
  import SidebarComponent from '@/components/SideBar/index.vue';
  import OriginalTunes from '@/components/Dashboard/index.vue';
</script>