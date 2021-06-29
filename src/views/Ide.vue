<template>
  <b-container>
    <editor buttonAction="Save As File" @editorDone="downloadString" />
  </b-container>
</template>

<script>
import Editor from "../components/Editor.vue";
export default {
  components: { Editor },
  methods: {
    downloadString(payload) {
      var blob = new Blob([payload.code], { type: "text/plain" });
      var a = document.createElement("a");
      console.log(payload);
      a.download = "code." + payload.extension;
      a.href = URL.createObjectURL(blob);
      a.dataset.downloadurl = ["text/plain", a.download, a.href].join(":");
      a.style.display = "none";
      document.body.appendChild(a);
      console.log(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function() {
        URL.revokeObjectURL(a.href);
      }, 1500);
    },
  },
};
</script>

<style></style>
