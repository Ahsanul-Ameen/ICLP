<template>
  <b-overlay :show="show" variant="primary" opacity="0.1" :class="{'min-h-10em': show}">
    <template #overlay>
      <div class="text-center">
        <b-icon icon="three-dots" font-scale="3" animation="cylon"></b-icon>
        <p>loading, please wait...</p>
      </div>
    </template>
    <slot></slot>
  </b-overlay>
</template>

<script>
export default {
  props: ['show']
}
</script>

<style scoped lang="scss">

</style>
