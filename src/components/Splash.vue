<template>
    <section class="splash">
      <Button :onClick="handleJoin" additionalClass="background-join" text="Join existing game" />
      <Button :onClick="handleNew" text="Start new game" />
    </section>
</template>

<script>
  import Button from '@/components/Button.vue'
  export default {
    name: 'Splash',
    props: {},
    components: {
      Button,
    },
    methods: {
      handleJoin() {
        alert('Join');
      },
      handleNew() {
        alert('New');
      }
    }
  }
</script>

<style scoped>
</style>
