<template>
  <div class="quests-component">
      <div class="header">
        <h3>{{locale[lang]['label']['quest']}}</h3>
      </div>
      <div class="container">
        <template v-for="(quest,index) in quests">
          <div class="item" v-bind:key="index" v-on:click="book(quest['id'])">
            <div class="header"><h4>{{quest['questName']}}</h4></div>
            <div class="body">
              <div>
                <img :src="quest['img']" alt="" srcset="">
              </div>
            </div>
            <div class="footer">
              <div>{{locale[lang]['label']['played']}}: <a href="">{{quest['sellTimes']}}</a></div>
              <div>{{locale[lang]['label']['time']}}: <a href="">{{quest['time']}} {{locale[lang]['label']['hour']}}</a></div>
            </div>
          </div>
        </template>
        
      </div>  
      <div class="footer">
        <div v-if="page-1>0" class="previos" v-on:click="toPage(page-1)"><h3>{{locale[lang]['button']['back']}}</h3></div>
        <div v-if="page>2" class="toFirst" v-on:click="toPage(1)"><h3>1</h3></div>
        <div class="current"><h3>{{page}}</h3></div>
        <div v-if="page<meta.last_page" >...</div>
        <div v-if="page<meta.last_page" class="next" v-on:click="toPage(page+1)"><h3>{{page+1}}</h3></div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'quests-component',
  props: {
    msg: String,
  },
  data(){
    return{
      quests: Array,
      page: Number,
      meta: Object,
      lang:document.documentElement.lang,
      locale:{
        'en':{
          'button':{
            'back':'Back'
          },
          'label':{
            'hour':'Hour',
            'quest':'Quest',
            'played':'Played',
            'time':'Time',
          }
        },
        'ru':{
          'button':{
            'back':'Назад'
          },
          'label':{
            'hour':'Час',
            'quest':'Квест',
            'played':'Сыграли',
            'time':'Время',
          }
        }
      }
    }
  },
  created(){
    
  },
  updated(){
  },
  mounted(){
    this.page = 1;
    this.paginateMe(this.page);
    
  },
  methods:{
    toPage(val){
      /**
       * Функция управления страницами.
       * @return void
       */
      if(val<=0)
        this.page = 1
      this.page = val
      this.paginateMe(this.page)
    },
    async paginateMe(page){
      /**
       * Пагинатор – функция для получения данных о квестах посредством пагинации на стороне сервера.
       * @return void
       */
      await fetch('http://127.0.0.1:8000/api/getQuests?page='+page)
        .then(resp => {return resp.json();})
        .then(data => {this.quests = data['data'];this.meta = data['meta'];})
        .catch(err=>{console.log(err);});
    },
    book(questId){
      /**
       * Функция переадресации пользователя на страницу оформления брони.
       * @return void
       */
      console.log(questId);
      this.$router.push({ path: `/booking/${questId}`})
    }
  }
}
</script>

<style scoped lang="scss">
.quests-component{
  width: inherit;
  
  display: grid;
  justify-content: center;
  .header{
    width: inherit;
  }
  .container{
    width: 100%;
    display: grid;
    justify-content: center;
    //overflow-y: scroll;
    grid-template-columns: repeat(3, 20vw);
    grid-auto-rows: auto;
    grid-gap: 10px;
    @media screen and (max-width: 1300px){
            grid-template-columns: repeat(2, 40vw);
    }
    @media screen and (max-width: 900px){
            grid-template-columns: repeat(1, 100vw);
    }
    .item{
      display: grid;
      justify-content: center;
      align-self:baseline ;
      grid-auto-flow: row;
      width: 100%;
      cursor: pointer;
      @media screen and (max-width: 1300px){
      }
      .body{
        display: grid;
        justify-content: left;
        width: inherit;
        >div{
          width: inherit;
        }
        img{
          width: inherit;
        }
        p{
          text-align: left;
        }
      }
      >.footer{
        text-align: left;
      }
    }
  }
  >.footer{
    display: grid;
    height: min-content;
    grid-auto-flow: column;
    justify-content: center;
    grid-gap: 10px;
    align-items: center;
    div{
      
      cursor: pointer;
      h3{
        &:hover{
          text-shadow: 1px 1px 4px rgba($color: #42b983, $alpha: 0.6);
        }
      }
    }
    .current{
      h3{
        font-size: 24pt;
        color: #42b983;
      }
    }
    
  }
}
</style>
