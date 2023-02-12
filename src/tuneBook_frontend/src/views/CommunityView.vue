<template>
    <div class="flex flex-col bg-gray-100 w-full h-dvh">
      <HeaderComponent />
      <div class="flex flex-grow w-full h-fit">
        <SidebarComponent class="bg-white w-[210px]" />
        <div class="flex-grow flex justify-center items-center flex-col">
            <div class="text-3xl font-semibold w-fit text-[#409eff] m-4">Comming Soon...</div>
            <el-button type="primary" class="w-fit" @click="()=>$router.push('/')">Go Home</el-button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
    import HeaderComponent from '@/components/Header/index.vue'
    import SidebarComponent from '@/components/SideBar/index.vue';
    import OriginalTunes from '@/components/Dashboard/index.vue';
  </script>