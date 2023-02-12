import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTuneStore = defineStore('tuneStore', () => {
  const currentPage = ref(0);
  const currentTune = ref({
    origin: true,
    title: "",
    data: ""
  });
  const orgTunes = ref([]);

  function setCurrentPage(pageNum) {
    currentPage.value = pageNum;
  }
  function setOrgTunes(tunes) {
    orgTunes.value = tunes;
  }
  function setCurrentTune(tune){
    currentTune.value = tune;
  };

  return { orgTunes, currentPage, currentTune, setCurrentPage, setOrgTunes, setCurrentTune }
})
