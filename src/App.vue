<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/rules">Rules</router-link>
  </div>
  <router-view/>
</template>

<style lang="scss">
header {
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}


.animated-button {
  border-style: none;
  border-radius: 0.3em;
  color: white;
  background: linear-gradient(8deg, #f72585, #b5179e, #7209b7, #560bad, #480ca8, #3a0ca3, #3f37c9, #4361ee, #4895ef, #4cc9f0);
  background-size: 2000% 2000%;

  -webkit-animation: button-animation 3s ease infinite;
  -moz-animation: button-animation 3s ease infinite;
  animation: button-animation 3s ease infinite;
  padding: 0.6em 5em;
}

.background-join { 
  background: linear-gradient(8deg, #126594, #55316e, #211729);
  background-size: 2000% 2000%;
  -webkit-animation: button-animation 3s ease infinite;
  -moz-animation: button-animation 3s ease infinite;
  animation: button-animation 3s ease infinite;
}

@-webkit-keyframes button-animation {
  0%{background-position:29% 0%}
  50%{background-position:72% 100%}
  100%{background-position:29% 0%}
}
@-moz-keyframes button-animation {
  0%{background-position:29% 0%}
  50%{background-position:72% 100%}
  100%{background-position:29% 0%}
}
@keyframes button-animation {
  0%{background-position:29% 0%}
  50%{background-position:72% 100%}
  100%{background-position:29% 0%}
}



</style>
