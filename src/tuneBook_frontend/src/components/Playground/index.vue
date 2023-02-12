<template>
    <div class="pt-7 px-5">
        <div class="flex justify-between">
            <el-button type="primary" @click="onBack">Back</el-button>

            <el-button type="primary" v-if="userIdentity" :loading-icon="Eleme" :loading="loading" @click="onAddMyTuneBook">{{loading ? 'Uploading' : 'Add to My TuneBook'}}</el-button>
        </div>
        <div class="flex flex-col">
            <div id="player" class="w-[60%] mx-auto"></div>
            <div class="grid grid-cols-12 gap-4 flex-grow">
                <div id="tunedata" class="col-span-6"></div>
                <el-input
                    v-model="currentTuneData"
                    class="col-span-6"
                    rows="30"
                    type="textarea"
                    spellcheck="false"
                />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">    
    import { ref, onBeforeMount , watch, onMounted } from "vue";
    import { storeToRefs } from "pinia";
    import {useTuneStore} from "@/stores/tunes";
    import {useAuthStore} from "@/stores/auth";
    import { tuneBook_backend } from 'declarations/tuneBook_backend/index';
    import ABCJS from "abcjs";
    import 'abcjs/abcjs-audio.css';
    import { useRouter } from 'vue-router';
    import { Eleme } from '@element-plus/icons-vue'
    import { ElMessageBox } from 'element-plus'
    
    const router = useRouter();
    const tuneStore = useTuneStore();
    const authStore = useAuthStore();
    const { orgTunes, currentPage,  } = storeToRefs(tuneStore);
    const { setCurrentPage, setOrgTunes, currentTune, setCurrentTune } = tuneStore;  
    const { userIdentity, userProfile } = storeToRefs(authStore);
    const currentTuneData = ref();
    const loading = ref(false);

    const synth = new ABCJS.synth.CreateSynth();
    const synthControl = new ABCJS.synth.SynthController();

    onMounted(()=>{
        currentTuneData.value = currentTune.data;
        synthControl.load("#player", null, {
        displayRestart: true,
        displayPlay: true,
        displayProgress: true,
        displayWarp: true
    });
    })

    watch(()=>currentTuneData.value, async () =>{
        const visualObj = ABCJS.renderAbc("tunedata", currentTuneData.value,  { responsive: "resize" });

        try {
            await synth.init({ visualObj: visualObj[0] });
            await synthControl.setTune(visualObj[0], false, {});
        } catch (error) {
        console.error("Error initializing or playing the tune", error);
        }
    })

    const onBack = () => {
        if(currentTune.origin == false)
            router.push('/tunebook')
        else
            router.push('/original')
    }

    const onAddMyTuneBook = async () => {
        loading.value = true;
        const result = await tuneBook_backend.add_tune(userIdentity.value, currentTune.title, currentTuneData.value);
        ElMessageBox.alert(result ? 'This tune added to your tunebook successfully!' : 'Same name already exist!')
        loading.value = false;
    }

</script>