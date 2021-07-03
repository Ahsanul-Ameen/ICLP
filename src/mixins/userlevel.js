import apiUtil from "@/mixins/apiUtil";

export default {
  mixins: [apiUtil],
  data() {
    return {
      level: null,
    }
  },
  methods: {
    fill_level(userid, topicid = 0) {
      this.apiGet(
        `/public/bestcodingscores/${userid}?topicid=${topicid}`
      ).then((data) => {
        const max_challenges_to_consider = 20;
        let best_lvl = 0,
          min_loss = 1e9;
        for (let lvl = 0; lvl <= 100; lvl++) {
          let hinge_loss = 0,
            solve_cnt = 0;
          for (
            let i = 0;
            i < Math.min(data.length, max_challenges_to_consider);
            i++
          ) {
            const e = data[i];
            const t = e.score == e.max_score ? 1 : -1,
              y = (lvl - e.max_score) / 50;
            hinge_loss += Math.max(0, 1 - t * y);
            if (e.max_score >= lvl) solve_cnt += t == 1;
          }
          if (solve_cnt >= 1 && hinge_loss <= min_loss) {
            min_loss = hinge_loss;
            best_lvl = lvl;
          }
        }
        this.level = best_lvl;
      });
    }
  },
};
