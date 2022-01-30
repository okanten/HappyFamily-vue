<template>
    <section class="splash">
      <Button :onClick="handleJoin" additionalClass="background-join" text="Join existing game" />
      <Button :onClick="handleNew" text="Start new game" />
    </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Button from '@/components/input/Button.vue';
  
  export default defineComponent({
    name: 'Splash',
    props: {},
    components: {
      Button,
    },
    methods: {
      handleJoin() {
        this.$router.push({ name: "JoinBlank" })
      },
      handleNew() {
        this.$router.push({ name: "CreateGame" })
      }
    }
  })
</script>

<style scoped>
</style>
