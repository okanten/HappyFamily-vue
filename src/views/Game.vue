<template>
  <div class="home">
    <Header title="Happy Family!"/>
    <SubmitWord />
  </div>
</template>

<script>
import Header from '@/components/Header'
import SubmitWord from '@/components/game/SubmitWord'

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
  computed: {
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
