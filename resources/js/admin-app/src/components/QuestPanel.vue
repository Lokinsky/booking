<template>
  <div class="quests-panel">
    <div class="quests-table">
          <div class="item header">
            <div class="name">{{locale[lang]['label']['name']}}</div>
            <div class="mob">{{locale[lang]['label']['mob']}}</div>
            <div class="email">{{locale[lang]['label']['email']}}</div>
            <div class="quest">{{locale[lang]['label']['quest']}}</div>
            <div class="status">
              {{locale[lang]['label']['status']['self']}}
            </div>
            <div class="date">{{locale[lang]['label']['day']}}</div>
            <div class="time">{{locale[lang]['label']['time']}}</div>
            <div class=""></div>
          </div>
      <template v-for="(book, index) in quests">
          <div class="item" :key="index">
            <div class="name">{{book['name']}}</div>
            <div class="mob">{{book['mob']}}</div>
            <div class="email">{{book['email']}}</div>
            <div class="quest">{{book['quest'].length>0?book['quest'][0]['name']:'––'}}</div>
            <div class="status">
              <select v-model="book['status']" name="" id="">
                <option value="new">{{locale[lang]['label']['status']['new']}}</option>
                <option value="cancel">{{locale[lang]['label']['status']['cancel']}}</option>
                <option value="success">{{locale[lang]['label']['status']['success']}}</option>
              </select>
            </div>
            <div class="date">{{locale[lang]['label']['week'][(new Date(Number(book['date'])).getDay())]}}</div>
            <div class="time">{{new Date(Number(book['time'])+Number(book['date'])).getHours()+':00'}} </div>
            <div class="update-record" v-on:click='updateBook(book)'>{{locale[lang]['button']['update']}}</div>
          </div>
      </template>
    </div>
    <div class="footer">
        <div v-if="page-1>0" class="previos" v-on:click="toPage(page-1)"><h3>{{locale[lang]['button']['back']}}</h3></div>
        <div v-if="page>2" class="toFirst" v-on:click="toPage(page=1)"><h3>1</h3></div>
        <div class="current"><h3>{{page}}</h3></div>
        <div v-if="page<meta.last_page" >...</div>
        <div v-if="page<meta.last_page" class="next" v-on:click="toPage(page+1)"><h3>{{page+1}}</h3></div>
      </div>
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  name: 'QuestPanele',
  data(){
    return{
      page:1,
      quests:Array,
      lang:document.documentElement.lang,
      meta: Object,
      bookToUpdate:Object,
      week:{
        'en':['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        'ru':['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота']
      },
      status:{
        'en':{'new':'New','cancel':'Canceled','success':'Success'},
        'ru':{'new':'Новый','cancel':'Отменен','success':'Завершен'},
      },
      locale:{
        'en':{
          'button':{
            'back':'Back',
            'update':'Update'
          },
          'label':{
            'hour':'Hour',
            'quest':'Quest',
            'name':'Name',
            'email':'E-mail',
            'mob':'Mobile',
            'time':'Time',
            'day':'Day',
            'status':{'self':"Status",'new':'New','cancel':'Canceled','success':'Success'},
            'week':['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
          }
        },
        'ru':{
          'button':{
            'back':'Назад',
            'update':'Обновить'
          },
          'label':{
            'hour':'Час',
            'quest':'Квест',
            'name':'Имя',
            'email':'Почта',
            'mob':'Моб.',
            'time':'Время',
            'day':'День',
            'status':{'self':'Статус','new':'Новый','cancel':'Отменен','success':'Завершен'},
            'week':['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота']
          }
        }
      }
    }
  },
  mounted(){
    this.toPage(this.page)
  },
  methods:{
    async toPage(page){
      /**
       * "Пагинатор" – функция получения данных посредством пагинации.
       * @return void
       */
      this.page = page;
      await fetch('http://127.0.0.1:8000/api/getBooks?page='+page)
        .then(resp => {return resp.json();})
        .then(data => {this.quests = data['data'];this.meta = data['meta']; console.log(data);})
        .catch(err=>{console.log(err);});
    },
    updateBook(book){
      /**
       * Обновление записи бронирования.
       * @return void
       */
      $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url: "http://127.0.0.1:8000/api/updateBook",
                type: "POST"
      })
      $.ajax({ 
        data: {
          book
      }}).done(function( res ) {
        console.log(res);});
      this.toPage(this.page);
      console.log(book);
    }
  }
}
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.quests-panel{
  padding: 10px;
  display: grid;
  grid-auto-flow: row;
  height: max-content;
  justify-self: center;
  .quests-table{
    display: grid;
    grid-auto-flow: row;
    grid-gap: 10px;
    .header{
        height: 60px;
        background-color: black;
        color: whitesmoke;
        font-size: 20pt;
        font-weight: 500;
      }
    .item{
      align-content: center;
      height: 40px;
      background-color: silver;
      border-radius: 4px;
      &:nth-child(even){
        background-color: seashell;
      }
      display: grid;
      grid-auto-flow: column;
      grid-gap: 10px;
      >div{
        width: 10vw;
        text-align: center;
      }
      >.update-record{
        cursor: pointer;
        border-radius: 4px;
        background-color: #42b983;
        color: whitesmoke;
        font-weight: 400;
        &:hover{
          box-shadow: 1px 1px 4px 2px rgba($color: #000000, $alpha: 0.12);
        }

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
