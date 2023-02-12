<template>
    <el-dialog v-model="isModalOn" title="You are not registered, setup your profile!" width="600"
        :before-close="handleClose">
        <div class="grid grid-cols-12 gap-3">
            <div class="col-span-6">
                <div class="border-2px boder-[#409eff]">
                    <img :src="avatarLink ? avatarLink : 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-541.jpg?w=360'"
                        class="w-full aspect-square border-[2px] border-[#409eff]" />
                </div>
            </div>
            <div class="flex flex-col justify-between col-span-6">
                <div>

                    <p>UserName</p>
                    <el-input v-model="username" class="w-full" paceholder="Please input username" />
                    <el-upload v-model:file-list="fileList" :before-upload="beforeUpload" class="upload-demo">
                        <el-button class="w-full" type="primary">Select Avatar</el-button>
                        <template #tip>
                            <div class="el-upload__tip">
                                jpg/png files with a size less than 500KB.<br>
                            </div>
                            <p class="text-lg">{{ selectedAvatar }}</p>
                        </template>
                    </el-upload>
                </div>
                <div>
                    <el-button class="w-full" type="primary" :loading-icon="Eleme" :loading="loading"
                        @click="onSetProfoile">Confirm</el-button>
                </div>
            </div>
        </div>
    </el-dialog>
</template>
<script setup lang="ts">

import { ref, watch } from "vue";
import type { UploadRawFile } from 'element-plus'
import { ElMessageBox } from 'element-plus'
import { useAuthStore } from "@/stores/auth";
import { tuneBook_backend } from 'declarations/tuneBook_backend/index';
import { Eleme } from '@element-plus/icons-vue'
import { convertToDataURL } from '@/util/avatarLink';

const props = defineProps(['modalVisibility']);

const authStore = useAuthStore();
const { userIdentity, setUserProfile } = authStore;

const isModalOn = ref(props.modalVisibility);
const username = ref("");
const fileList = ref([]);
const avatarByteArray = ref();
const selectedAvatar = ref("");
const avatarLink = ref();
const loading = ref(false);

watch(() => props.modalVisibility, () => {
    isModalOn.value = props.modalVisibility;
})

const beforeUpload = (uploadFile: UploadRawFile) => {
    if (uploadFile) {

        console.log("sdfsdfsd", uploadFile)
        const reader = new FileReader();

        reader.onload = async (e) => {
            const arrayBuffer = await uploadFile.arrayBuffer();
            const byteArray = new Uint8Array(arrayBuffer);
            avatarByteArray.value = byteArray;
            selectedAvatar.value = uploadFile.name;
            const chunks = [];
            chunks.push(new Uint8Array(byteArray));

            const blob = new Blob(chunks, { type: "image/jpeg" });

            let new_url = await convertToDataURL(blob);
            avatarLink.value = new_url;
        };

        reader.readAsArrayBuffer(uploadFile);
    }
}

const onSetProfoile = async () => {
    loading.value = true;
    const userData = await tuneBook_backend.update_profile(userIdentity, username.value, avatarByteArray.value);
    setUserProfile(userData);
    loading.value = false;
    isModalOn.value = false;
}

const handleClose = (done: () => void) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
}

</script>