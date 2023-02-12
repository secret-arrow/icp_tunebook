<template>
    <div class="h-[80px] w-full border-b-gray-300 border-b-[1px] drop-shadow-lg bg-white sticky top-0 z-[5]">
        <div class="flex justify-between items-center h-full">
            <p class="pl-7 my-auto text-3xl font-bold text-blue-700 cursor-pointer" @click="$router.push('/')">TuneBooks</p>
            <div class="pr-7 flex flex-col justify-center">
                <el-button type="primary" @click="loginWithNFID" v-if="userIdentity == ''">Login</el-button>
                <div class="flex flex-col items-center" v-if="userIdentity">
                    <el-image class="h-[30px]" :src="avatarLink ? avatarLink : 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-541.jpg?w=30'" fit="contain" />
                    <p>{{ userProfile.username }}</p>
                </div>
            </div>
        </div>
    </div>
    <RegisterDialog :modalVisibility="isRegisterModal"/>
</template>
<script setup lang="ts">
    import { ref, onBeforeMount , watch } from "vue";
    import { storeToRefs } from "pinia";
    import { AuthClient } from "@dfinity/auth-client";
    import { Actor } from "@dfinity/agent";
    import {useAuthStore} from "@/stores/auth";
    import { tuneBook_backend } from 'declarations/tuneBook_backend/index';
    import RegisterDialog from '@/components/Header/RegisterDialog.vue';
    import {convertToDataURL} from '@/util/avatarLink';

    const authStore = useAuthStore();
    const { userIdentity , userProfile } = storeToRefs(authStore);
    const { setIdentity, setUserProfile } = authStore;  
    const isRegisterModal = ref(false);
    const avatarLink = ref("");

    watch(()=>userProfile.value, async ()=>{
        if(userIdentity.value){
            const byteArray = new Uint8Array(Object.keys(userProfile.value.avatar).length);
            Object.keys(userProfile.value.avatar).map((index) => {
                byteArray[index] = userProfile.value.avatar[index];
            });
            const chunks = [];
            chunks.push(new Uint8Array(byteArray));

            const blob = new Blob(chunks, { type: "image/jpeg" });
            let new_url= await convertToDataURL(blob);
            avatarLink.value = new_url;
        }
    })

    onBeforeMount(async ()=>{
        if(userIdentity.value){
            const byteArray = new Uint8Array(Object.keys(userProfile.value.avatar).length);
            Object.keys(userProfile.value.avatar).map((index) => {
                byteArray[index] = userProfile.value.avatar[index];
            });
            const chunks = [];
            chunks.push(new Uint8Array(byteArray));

            const blob = new Blob(chunks, { type: "image/jpeg" });
            let new_url= await convertToDataURL(blob);
            avatarLink.value = new_url;
        }
    })

    const loginWithNFID = async () => {
        let authClient = await AuthClient.create();
        const APP_NAME = "NFID example";
        const APP_LOGO = "https://nfid.one/icons/favicon-96x96.png";
        const CONFIG_QUERY = `?applicationName=${APP_NAME}&applicationLogo=${APP_LOGO}`;

        const identityProvider = `https://nfid.one/authenticate${CONFIG_QUERY}`;

        authClient.login({
        identityProvider,
        onSuccess: async () => {
            const identity: string = authClient.getIdentity().getPrincipal().toText();
            Actor.agentOf(tuneBook_backend).replaceIdentity(authClient.getIdentity());
            let authentication = await tuneBook_backend.authentication(identity);
            if(authentication.length ==0 ){ 
                isRegisterModal.value=true;
            }
            else{
                setUserProfile(authentication[0]);

            }
            setIdentity(identity);
        },
        windowOpenerFeatures: `
            left=${window.screen.width / 2 - 525 / 2},
            top=${window.screen.height / 2 - 705 / 2},
            toolbar=0,location=0,menubar=0,width=525,height=705
            `,
        });
    }
</script>