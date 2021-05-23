<template>
  <div>
    <b-breadcrumb :items="ancestors" />
    <div class="mx-5 my-3">
      <b-tabs content-class="mt-0 p-4 bg-white shadow">
        <b-tab title="Problem" active :title-item-class="['border-left', 'border-right']">
          <p>I'm the first tab of problem {{id}}</p>
          <div class="w-25">
            submit solution:
            <b-form @submit.prevent="onsubmit">
              <b-form-select v-model="language" :options="languageOptions"></b-form-select>
              <b-form-file
                v-model="file"
                :state="Boolean(file)"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
                required
              ></b-form-file>
              <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>
              <b-button type="submit" variant="primary">Submit</b-button>
            </b-form>
          </div>
        </b-tab>
        <b-tab title="Submissions" :title-item-class="['border-right']">
          <Submissions :problem_id="id" :user_id="45" />
        </b-tab>
        <b-tab title="Discussions" :title-item-class="['border-right']">
          <div id="disqus_thread"></div>
          <noscript>
            Please enable JavaScript to view the
            <a
              href="https://disqus.com/?ref_noscript"
            >comments powered by Disqus.</a>
          </noscript>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import Submissions from "../components/Submissions.vue";

export default {
  name: "Problem",
  props: ["id"],
  data() {
    return {
      ancestors: [
        // TODO: make it dynamic
        {
          text: "Coding challenge",
          href: "/problems",
        },
        {
          text: "python",
          href: "/python",
        },
        {
          text: "Loops",
        },
      ],
      file: undefined,
      languageOptions: [
        {
          value: "cpp",
          text: "C++ (g++17)",
        },
        "python",
      ],
      language: "cpp",
    };
  },
  methods: {
    onsubmit() {
      alert(`${this.file.name} ${this.language}`);
    },
  },
  components: {
    Submissions,
  },
  mounted() {
    //TODO: either create own blog, or use vue-disqus
    /**
     *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
     *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables    */
    window.disqus_config = function () {
      // this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
      this.page.identifier = `problem_${this.id}`; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };
    (function () {
      // DON'T EDIT BELOW THIS LINE
      var d = document,
        s = d.createElement("script");
      s.src = "https://iclp.disqus.com/embed.js";
      s.setAttribute("data-timestamp", +new Date());
      (d.head || d.body).appendChild(s);
    })();
  },
};
</script>

<style scoped>
</style>