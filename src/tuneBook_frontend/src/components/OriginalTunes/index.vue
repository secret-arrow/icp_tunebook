<template>
    <div class="grid grid-cols-12 pt-7 px-5 gap-3">
        <div class="col-span-4">
            <el-table ref="tuneList" :data="org_tunes" class="w-full bg-gray-100" highlight-current-row @current-change="onSelectTune">
                <el-table-column prop="name" label="Tune Name"/>
            </el-table>
        </div>
        <div class="col-span-8">
            <div>
                <div class="flex items-center px-3">
                    <div id="player" class="flex-grow"></div>
                    <el-button type="primary" @click="()=>$router.push('/playground')" class="ml-3">Edit</el-button>
                </div>
                <div id="tunedata"></div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">    
    import { ref, onBeforeMount , watch } from "vue";
    import { storeToRefs } from "pinia";
    import {useTuneStore} from "@/stores/tunes";
    import { tuneBook_backend } from 'declarations/tuneBook_backend/index';
    import ABCJS from "abcjs";
    import 'abcjs/abcjs-audio.css';
    import { useRouter } from "vue-router";
    import { ElTable } from 'element-plus'

    const router = useRouter();
    const tuneStore = useTuneStore();
    const { orgTunes, currentPage, currentTune } = storeToRefs(tuneStore);
    const { setCurrentPage, setOrgTunes, setCurrentTune } = tuneStore;  
    const org_tunes = ref([]);
    const currentTuenName = ref("");
    const currentTuneData = ref("");
    const tuneList = ref<InstanceType<typeof ElTable>>();


    const synth = new ABCJS.synth.CreateSynth();
    const synthControl = new ABCJS.synth.SynthController();

    onBeforeMount(async ()=>{
        let res = await tuneBook_backend.get_original_tune_list(0);
        let tunes = res.map((tune: string) => {return {name: tune.split('.abc')[0]}});
        org_tunes.value = tunes;
        setOrgTunes(tunes);
        synthControl.load("#player", null, {
            displayRestart: true,
            displayPlay: true,
            displayProgress: true,
            displayWarp: true
        });
        if(currentTune.value.name)
            tuneList.value!.setCurrentRow({name: currentTune.value.name});
    });

    watch(()=>currentTuneData.value, async () =>{
        const visualObj = ABCJS.renderAbc("tunedata", currentTuneData.value,  { responsive: "resize" });

        try {
            await synth.init({ visualObj: visualObj[0] });
            await synthControl.setTune(visualObj[0], false, {});
        } catch (error) {
        console.error("Error initializing or playing the tune", error);
        }
    })

    const onSelectTune = async (selectedTune: any) => {
        if(!selectedTune) return;
        currentTuenName.value = selectedTune.name;
        const tuneData = await tuneBook_backend.get_original_tune(`${selectedTune.name}.abc`);
        currentTuneData.value = tuneData;
        setCurrentTune({ origin: true, title: selectedTune.name, data: tuneData});
        const visualObj = ABCJS.renderAbc("tunedata", tuneData,  { responsive: "resize" });
    }
</script>