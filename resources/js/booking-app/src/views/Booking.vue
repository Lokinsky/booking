<template>
  <div class="booking">
      <div class="header">
        <router-link to="/">{{lang=='en'?'Back':'Назад'}}</router-link>
        <h3>{{lang=='en'?'Booking':'Бронирование'}}</h3>
      </div>
    <BookingQuets/>

  </div>
</template>

<script>
import BookingQuets from '../components/BookingQuest.vue'

export default {
  name: 'Booking',
  data(){
      return{
          lang:document.documentElement.lang
      }
  },
  components: {
    BookingQuets
  }
}
</script>
<style lang="scss">
.booking{
  display: grid;
  grid-auto-flow: row;
  justify-self: center;
  >.header{
      display: grid;
      grid-auto-flow: column;
      justify-content: center;
      grid-gap: 10px;
        h3{
            color: #42b983;
            font-weight: 700;
        }
  }
}
</style>