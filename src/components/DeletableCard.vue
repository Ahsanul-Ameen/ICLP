<template>
  <b-card no-body>
    <b-container>
      <b-row align-h="end">
        <b-btn-close>
          <b-icon @click="$emit('delete-card', $event)" icon="x-circle" />
        </b-btn-close>
      </b-row>
      <slot></slot>
    </b-container>
  </b-card>
</template>

<script>
export default {};
</script>

<style>
</style>