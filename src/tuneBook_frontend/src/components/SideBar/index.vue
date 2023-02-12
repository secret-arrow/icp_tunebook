<template>
    <div class="flex flex-col justify-between py-5 px-5 h-auto">
        <div>
            <div class="px-5 py-2 my-2 w-full rounded-lg bg-[] hover:bg-[rgba(64,158,255,0.1)]" @click="()=>$router.push('/original')"> 
                <p class="text-lg font-semibold cursor-pointer hover:text-[#409eff]" :class="currentPath == '/original' ? 'text-[#409eff]' : 'text-[#606266]'">Original Tunes</p>
            </div>
            <div class="px-5 py-2 my-2 w-full rounded-lg bg-[] hover:bg-[rgba(64,158,255,0.1)]" @click="()=>$router.push('/tunebook')"> 
                <p class="text-lg font-semibold cursor-pointer hover:text-[#409eff]" :class="currentPath == '/tunebook' ? 'text-[#409eff]' : 'text-[#606266]'">My TuneBook</p>
            </div>
            <div class="px-5 py-2 my-2 w-full rounded-lg bg-[] hover:bg-[rgba(64,158,255,0.1)]" @click="()=>$router.push('/playground')"> 
                <p class="text-lg font-semibold cursor-pointer hover:text-[#409eff]" :class="currentPath == '/playground' ? 'text-[#409eff]' : 'text-[#606266]'">Playground</p>
            </div>
            <div class="px-5 py-2 my-2 w-full rounded-lg bg-[] hover:bg-[rgba(64,158,255,0.1)]" @click="()=>$router.push('/communities')"> 
                <p class="text-lg font-semibold cursor-pointer hover:text-[#409eff]" :class="currentPath == '/communities' ? 'text-[#409eff]' : 'text-[#606266]'">Community</p>
            </div>
        </div>
        <div>
            <div class="px-5 py-2 my-2 w-full rounded-lg bg-[] hover:bg-[rgba(64,158,255,0.1)]" v-if = "userIdentity != ''" @click="logout"> 
                <p class="text-md font-bold cursor-pointer text-[#606266] hover:text-[#409eff] text-center">Logout</p>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { onBeforeMount , ref } from 'vue';
    import { useRouter } from 'vue-router';
    import {useAuthStore} from "@/stores/auth";
    import { storeToRefs } from "pinia";

    const router = useRouter();
    const currentPath = ref("");
    
    const authStore = useAuthStore();
    const { userIdentity } = storeToRefs(authStore);
    const { setIdentity , setUserProfile } = authStore;  

    const logout = () => {
        setIdentity("");
        setUserProfile({}); 
    }

    onBeforeMount(()=>{
        currentPath.value = router.currentRoute.value.fullPath;
    })
</script>