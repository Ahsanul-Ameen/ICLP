<template>
  <div>
    <b-breadcrumb :items="ancestors" />
    <div class="mx-5 my-3">
      <b-tabs content-class="mt-0 p-4 bg-white shadow">
        <b-tab title="Problem" active :title-item-class="['border-left', 'border-right']">
          <pre>{{statement}}</pre>
          <div class="w-25">
            submit solution:
            <b-form @submit.prevent="onsubmit">
              <FileSubmit v-model="submission" />
              <SolutionLanguages v-model="language" />
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
import Submissions from "@/components/Submissions";
import FileSubmit from "@/components/FileSubmit";
import SolutionLanguages from "@/components/SolutionLanguages";

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
          text: "Loops",
        },
      ],
      submission: null,
      language: "c++ 17",
      statement: `
      *Problems* in Computer Science are often classified as belonging to a certain class of problems (e.g.,
      NP, Unsolvable, Recursive). In this problem you will be analyzing a property of an algorithm whose
      classification is not known for all possible inputs.
      Consider the following algorithm:
      1. input n
      2. print n
      3. if n = 1 then STOP
      4. if n is odd then n ←− 3n + 1
      5. else n ←− n/2
      6. GOTO 2
      Given the input 22, the following sequence of numbers will be printed
      22 11 34 17 52 26 13 40 20 10 5 16 8 4 2 1
      It is conjectured that the algorithm above will terminate (when a 1 is printed) for any integral input
      value. Despite the simplicity of the algorithm, it is unknown whether this conjecture is true. It has
      been verified, however, for all integers n such that 0 < n < 1, 000, 000 (and, in fact, for many more
      numbers than this.)
      Given an input n, it is possible to determine the number of numbers printed before and including
      the 1 is printed. For a given n this is called the cycle-length of n. In the example above, the cycle
      length of 22 is 16.
      For any two numbers i and j you are to determine the maximum cycle length over all numbers
      between and including both i and j.
      Input
      The input will consist of a series of pairs of integers i and j, one pair of integers per line. All integers
      will be less than 10,000 and greater than 0.
      You should process all pairs of integers and for each pair determine the maximum cycle length over
      all integers between and including i and j.
      You can assume that no operation overflows a 32-bit integer.
      Output
      For each pair of input integers i and j you should output i, j, and the maximum cycle length for
      integers between and including i and j. These three numbers should be separated by at least one space
      with all three numbers on one line and with one line of output for each line of input. The integers i
      and j must appear in the output in the same order in which they appeared in the input and should be
      followed by the maximum cycle length (on the same line).
      Sample Input
      1 10
      100 200
      201 210
      900 1000
      Sample Output
      1 10 20
      100 200 125
      201 210 89
      900 1000 174
      `,
    };
  },
  methods: {
    onsubmit() {
      alert(`${this.submission.name} ${this.language}`);
    },
  },
  components: {
    Submissions,
    FileSubmit,
    SolutionLanguages,
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