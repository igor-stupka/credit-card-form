<template>
  <main
    id="app"
    class="wrapper"
  >
    <card-form />
  </main>
</template>

<script>

import CardForm from './components/CardForm';

export default {
  name: 'App',
  components: {
    CardForm
  }
};
</script>

<style lang="sass">
@import "../css/main"

.wrapper
  min-height: 100vh
  display: flex
  padding: 50px 15px
  @media screen and (max-width: 700px), (max-height: 500px)
    flex-wrap: wrap
    flex-direction: column
</style>
