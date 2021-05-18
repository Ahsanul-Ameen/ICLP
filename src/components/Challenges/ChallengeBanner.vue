<template>
  <div class="banner m-5">
    <b-container>
      <b-row>
        <b-col offset-md="1" class="pt-5"
          ><h4 class="font-weight-bold" font-weight-bold>
            <b-icon icon="bar-chart-fill" class="text-primary"></b-icon>
            {{ heading }}
          </h4></b-col
        >
      </b-row>
      <b-row>
        <b-col offset-md="1" class="pb-5 pt-5"
          ><slot>Sorry, this challenge is currently unavailable.</slot></b-col
        >
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  props: {
    heading: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.banner {
  border-style: solid;
  border-radius: 100px;
}
</style>
