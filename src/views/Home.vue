<template>
  <div class="home">
    <Header title="Happy Family!"/>
    <Splash />
  </div>
</template>

<script>

import Header from '@/components/Header'
import Splash from '@/components/Splash'
import Textbox from '@/components/input/Textbox'

export default {
  name: 'Home',
  components: {
    Header,
    Splash,
    Textbox,
  },
}
</script>
