<template>
    <section class="splash">
      <Button additionalClass="background-join" text="Join existing game" />
      <Button text="Start new game" />
    </section>
</template>

<script>
  import Button from '@/components/Button.vue'
  export default {
    name: 'Splash',
    props: {},
    components: {
      Button,
    }
  }
</script>

<style scoped>
</style>
