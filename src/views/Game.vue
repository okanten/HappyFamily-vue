<template>
  <div class="home">
    <Header title="Happy Family!"/>
    <SubmitWord />
  </div>
</template>

<script>
import Header from '@/components/Header'
import SubmitWord from '@/components/SubmitWord'

export default {
  name: 'CreateGame',
  components: {
    Header,
    SubmitWord,
  },
  mounted() {

    if(this.$store.state.gameId == null) { 
      this.$router.push({ name: "Home" })
    }

  },
  data() {
    return {
      txtGameWord: ''
    }
  },
  methods: {
  }
}
</script>
