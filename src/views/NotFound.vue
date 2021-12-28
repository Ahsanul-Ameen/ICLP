// adapted from: https://codepen.io/irwin-basa-sandoval/pen/KKmxVXJ

<template>
  <b-container class="page_404">
    <center>
      <div class="four_zero_four_bg">
        <h1 class="text-center ">404</h1>
      </div>
      <div class="contant_box_404">
        <h3 class="h2">
          Looks like you're lost
        </h3>
        <p>The page you're looking for is not available!</p>
      </div>
    </center>
  </b-container>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style lang="scss" scoped>

.page_404 {
  padding: 40px 0;
  background: #fff;
  font-family: "Arvo", serif;
}

.page_404 img {
  width: 100%;
}

.four_zero_four_bg {
  background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
  height: 400px;
  background-position: center;
}

.four_zero_four_bg h1 {
  font-size: 80px;
}

.four_zero_four_bg h3 {
  font-size: 80px;
}

.contant_box_404 {
  margin-top: -50px;
}

</style>
