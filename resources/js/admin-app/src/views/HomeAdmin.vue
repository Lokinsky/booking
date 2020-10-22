<template>
  <div class="home">
    <QuestPanel/>
  </div>
</template>

<script>
// @ is an alias to /src
import QuestPanel from '../components/QuestPanel.vue'

export default {
  name: 'HomeAdmin',
  components: {
    QuestPanel
  }
}
</script>
