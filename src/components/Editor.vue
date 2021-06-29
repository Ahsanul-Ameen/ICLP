<template>
  <div>
    **This component is incomplete
    <b-form-group label="Select a language:" label-for="lang">
      <b-form-select
        id="lang"
        v-model="selectedLang"
        :options="options.map((elem) => elem.name)"
      ></b-form-select>
    </b-form-group>
    <prism-editor
      class="my-editor"
      v-model="code"
      :highlight="highlighter"
      line-numbers
    ></prism-editor>
    <b-button
      v-if="buttonAction"
      pill
      variant="primary"
      class="shadow-lg font-weight-bold m-4"
      @click="handleClick"
    >
      {{ buttonAction }}
    </b-button>
  </div>
</template>

<script>
/*
    There is a issue with line number during text wrapping. So we will not use line number. You can check this out-
    https://github.com/koca/vue-prism-editor/issues/87
 */

import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css";

import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";

export default {
  components: {
    PrismEditor,
  },
  data: () => ({
    code: "//write your code here",
    selectedLang: "C++",
    options: [
      { name: "C++", extension: "cpp", parser: languages.cpp },
      { name: "Java", extension: "java", parser: languages.java },
      { name: "Python", extension: "py", parser: languages.python },
      { name: "Javascript", extension: "js", parser: languages.js },
    ],
  }),
  props: ["buttonAction"],
  methods: {
    highlighter(code) {
      const cc = highlight(
        code,
        this.options.filter((elem) => elem.name == this.selectedLang)[0].parser
      );

      return cc;
    },
    handleClick() {
      let { name, extension } = this.options.filter(
        (elem) => elem.name == this.selectedLang
      )[0];
      this.$emit("editorDone", {
        code: this.code,
        name,
        extension,
      });
    },
  },
};
</script>

<style language="scss">
.my-editor {
  border: 2px solid;
  background: #eee;
  color: rgba(253, 89, 60, 255); /*indicator color*/

  /* No need to change these */
  min-height: 200px;
  max-height: 500px;
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  font-weight: bold;
  line-height: 1.5;
  padding: 10px;
}

.prism-editor__textarea {
  width: 999999px !important;
}
.prism-editor__editor {
  white-space: pre !important;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}

@import "../../node_modules/prismjs/themes/prism.css";
</style>
