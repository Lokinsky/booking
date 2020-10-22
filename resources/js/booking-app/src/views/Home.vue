<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <QuestComponent/>

  </div>
</template>

<script>
import QuestComponent from '../components/Quests.vue'

export default {
  name: 'Home',
  components: {
    QuestComponent
  }
}
</script>
<style lang="scss">
.home{
  display: grid;
  justify-self: center;
}
</style>