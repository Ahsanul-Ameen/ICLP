<template>
  <div>
    <b-breadcrumb :items="ancestors" />
    <div>
      <b-tabs content-class="mt-0 p-4 bg-white shadow">
        <b-tab title="Problem" active :title-item-class="['border-left', 'border-right']">
          <pre>{{statement}}</pre>
          <div class="w-25">
            submit solution:
            <b-form @submit.prevent="onsubmit">
              <FileSubmit id="submission" v-model="submission" />
              <SolutionLanguages id="language" v-model="language" />
              <b-button type="submit" variant="primary">Submit</b-button>
            </b-form>
          </div>
        </b-tab>
        <b-tab title="Submissions" :title-item-class="['border-right']">
          <Submissions :problemid="id" :userid="45" />
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
import apiUtil from "@/mixins/apiUtil";
import Submissions from "@/components/Submissions";
import FileSubmit from "@/components/FileSubmit";
import SolutionLanguages from "@/components/SolutionLanguages";

export default {
  name: "Problem",
  mixins: [apiUtil],
  props: ["id"],
  data() {
    return {
      ancestors: [
        {
          text: "Coding challenge",
          href: "/problems",
        },
        {
          text: null,
        },
      ],
      statement: null,
      submission: null,
      language: "c++ 17",
    };
  },
  methods: {
    onsubmit() {
      let formData = new FormData();
      formData.append("problemid", this.id);
      formData.append("language", this.language);
      formData.append("submission", this.submission);
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      this.apiPost("/protected/submit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(({ score }) => {
          this.submission = null;
          alert(`You received score: ${score}`);
        })
        .catch((err) => {
          this.submission = null;
          alert("error " + err);
        });
      this.apiGet(`/public/problem/${this.id}`).then((data) => {
        this.ancestors[this.ancestors.length - 1].text = data.title;
        this.statement = data.content;
      });
    },
  },
  components: {
    Submissions,
    FileSubmit,
    SolutionLanguages,
  },
  mounted() {
    // maybe we shold use vue-disqus instead
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