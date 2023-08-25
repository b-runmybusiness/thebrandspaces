import { defineStore } from "pinia";

export const useStore = defineStore("store", () => {
    const docTitle = ref("Untitled Document.md");
    const rawText = ref("");
    const parsedText = ref("");
    const isPreviewActive = ref(false);
    const docs = ref([]);
    const currentDocId = ref("");

    // set current document to be edited
    const setCurrentDoc = (id) => {
        const doc = docs.value.find((doc) => doc.id === id);
        if (doc) {
            currentDocId.value = doc.id;
            docTitle.value = doc.title;
            rawText.value = doc.content;
        }
    };

    return {
        rawText,
        parsedText,
        docTitle
    };
});