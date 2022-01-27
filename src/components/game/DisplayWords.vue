<template>
  <Button :onClick="handleClick" :text="btnDisplayWordsText" />
  
  <div v-if="isDisplayingWords"> 
    <div v-for="(word, index) in words" :key="index"> 
      <p>{{ word }}</p>
    </div>
  </div>

</template>
<script>

import Button from '@/components/input/Button.vue'

  export default {
    name: 'DisplayWords',
    components: {
      Button
    },
    mounted() {
    },
    computed: {
      words() {
        return this.$store.state.submittedWords
      }
    },
    data() {
      return {
        btnDisplayWordsText: 'Display words',
        isDisplayingWords: false,
        hasRetrievedWords: false,
      }
    },
    methods: {
      handleClick() {
        if(this.isDisplayingWords) {
          this.btnDisplayWordsText = "Display words"
          this.hideWords()
        } else {
          this.displayWords()
          this.btnDisplayWordsText = "Hide words"
        }
      },
      hideWords() {
        console.log('lol')
        this.isDisplayingWords = false
      },
      displayWords() {
        if (this.hasRetrievedWords) {
          this.isDisplayingWords = true
        } else {    
          const gameId = this.$store.state.gameId
          const gameIdPassword = this.$store.state.gameIdPassword
          const options = {
            method: 'POST',
            body: JSON.stringify({ password: gameIdPassword }),
            headers: {
              'Content-Type': 'application/json'
            },
          }
          
          let status = ''

          const url = 'http://localhost:8000/game/' + gameId + "/words"
          fetch(url, options)
          .then(res => {
            let json = res.json()
            status = res.status
            console.log(status)
            
            return json 
          })
          .then(data => {
            if (status == 200) {
              this.success = data.message
              console.log(data.words)
              this.$store.commit('setSubmittedWords', data.words)
              console.log(this.$store.state.submittedWords)
              this.isDisplayingWords = true
              this.hasRetrievedWords = true
            } else {
              this.errors.push(data.message)
            }
          })
          .catch(err => console.log(err.message))
        }
      }
    }
  }
</script>

<style lang="scss">
  .loaded {
    color: rgb(0, 4, 255);
  }

  .unloaded {
    color: rgb(255, 30, 0);
  }
</style>
