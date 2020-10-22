<template>
    <div class="booking-quest-component">
        <div class="item">
            <div class="header"><h3>{{quest['quest_name']}}</h3></div>
            <div class="body">
              <div class="poster">
                <img :src="quest['img']" alt="" srcset="">
              </div>

              <div class="description">
                <h3>{{locale[lang]['label']['description']}}</h3>
                <p>
                  {{quest['quest_description']}}
                </p>
              </div>
            </div>
            <div class="footer">
                <div class="shedule">
                    <div class="header">
                        <h3>{{locale[lang]['label']['shedule']}}</h3>
                    </div>
                    <template v-for="(book, index) in booking_dates">
                        <div v-if="book['hours'].length!=0" class="shedule-item" :key="index">
                            <div class="day">
                                <h3>
                                    {{(locale[lang]['label']['week'][new Date(book['day']).getDay()])}}
                                </h3>
                            </div>
                            <div class="time-strap">
                                <template v-for="(time, index) in book['hours']">
                                    <div 
                                        class="time-item"
                                        v-bind:class="{ booked: time['is_booked']}"
                                        :key="index"
                                        v-on:click='!time["is_booked"]?modal(true,{"day":book["day"],"time":time["time"]}):alert("Время уже занято")'>
                                            {{new Date(book['day']+time['time']).getHours()+':00'}}
                                    </div>
                                </template>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
          </div>
          <div name="modal" v-if="modal_booked" id='modal' class="modal-book">
              <div class="container">
                  <div class="close" v-on:click="modal(false)">{{(locale[lang]['button']['close'])}}</div>
                  <div class="content">
                        <input v-model="client['name']" required type="text" :placeholder="((locale[lang]['label']['name']))">
                        <input v-model="client['email']" required type="email" :placeholder="((locale[lang]['label']['email']))">
                        <input v-model="client['mob']" required type="text" :placeholder="((locale[lang]['label']['mob']))">
                  </div>
                  <div class="order" v-on:click="book_it()" >{{(locale[lang]['button']['order'])}}</div>
              </div>
          </div>
    </div>
</template>

<script>
import $ from 'jquery';
export default {
    data(){
        return{
            quest: Array,
            booking_dates:[],
            locale:{
                'en':{
                'button':{
                    'order':'Order',
                    'close':'Close'
                },
                'label':{
                    'name':'Name',
                    'email':'E-mail',
                    'mob':'Mobile',
                    'shedule':'Shedule',
                    'description':'Description',
                    'week':['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
                    }
                },
                'ru':{
                'button':{
                    'order':'Забронировать',
                    'close':'Закрыть'
                },
                'labels':{
                    'name':'Имя',
                    'email':'Почта',
                    'mob':'Моб.',
                    'shedule':'Расписание',
                    'description':'Описание',
                    'week':['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота']
                    }
                }
            },
            modal_booked:false,
            book_day: Number,
            book_time: Number,
            questId: this.$route.params['questId'],
            client:{
                name:'',
                email:'',
                mob:''
            },
            lang:document.documentElement.lang
        }
    },
    async mounted(){
        await this.getQuest();
        this.getShedule();

    },
    methods:{
        async getQuest(){
            /**
             * Получение данных о квесте.
             */
           await fetch('http://127.0.0.1:8000/api/getQuest/'+this.questId)
                .then(resp => {return resp.json();})
                .then(data => {this.quest = data.data[0];console.log(data);})
                .catch(err=>{console.log(err);});
       },
       getShedule(offset = 0){
           /**
            * Функция для генерации расписания брони.
            * @Number offset – Смещение расписания.
            */
           var date = new Date()
           let from = date.setHours(0,0,0,0)
           let dayStamps =  24 * 60 * 60 * 1000;
           let hourStamps = 60 * 60 * 1000;
           let shedule = [];
           let booked = this.quest['date_booked'];
          
           for (let i = 0; i<14; i++) {
                /**
                * Цикл генерирующий дни недели.
                */
                var day = new Date(from + (i+offset) * dayStamps).getTime();
                shedule[i] = {'day':day,'hours':[]}
                //Поиск забронированных временных слотов.
                let booked_day = booked.filter(book=>Number(book['date'])===day);
                for(let j = 1; j<24; j++){
                    /**
                     * Цикл для создания временных слотов, а также привязка
                     * забронированных данными из бд.
                     */
                    let time = hourStamps*j;
                    let book_time = booked_day.filter(book=>Number(book['time'])===time)
                    let is_expired = (Date.now()>new Date(day+time));
                    let is_booked = book_time[0]!=undefined?true:false;
                    if(!is_expired)
                        shedule[i]['hours'].push({'time':time,'is_booked':is_booked});
                }
           }
           this.booking_dates = shedule;
           console.log(shedule);
       },
       modal(is_modal,book = null){
           /**
            * Функция для создания модального окна
            */
           var body = document.getElementsByTagName("BODY")[0];
           if(is_modal&&book!=null){
                this.modal_booked = true;
                this.book_day = book['day']
                this.book_time = book['time']
                body.classList.add('no-scroll')
           }else{
                this.modal_booked = false;
                body.classList.remove('no-scroll')
                this.book_day = Number
                this.book_time = Number
           }
       },
       async book_it(){
           /**
            * Функция для бронирования временной ячейки.
            */
           $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url: "http://127.0.0.1:8000/api/bookTime",
                type: "POST"
            })
            
            if(this.client['name']!=''&&this.client['email']!=''&&this.client['mob']!=''){
                $.ajax({ data: {
                        client:this.client,
                        questId:this.questId,
                        book_time: {
                            day: this.book_day,
                            time: this.book_time
                        }
                    }
                }).done(function( res ) {
                    console.log(res);
                });
                await this.getQuest();
                this.getShedule();
                this.client = {}
                this.book_time = {}
                this.modal(false)
            }else{
                alert(this.lang=='en'?'Please, fill all fields.':'Пожалуйста, заполните все поля.')
            }
            
       }

    }
}
</script>
<style lang="scss" scoped>
.booking-quest-component{
    padding: 10px 0px;
    width: 100%;
    display: grid;
    grid-auto-flow: row;
    >.item{
        width: inherit;
        >header{
            h3{
                font-size: 28pt;
            }
        }
        >.body{
            width: inherit;
            display: grid;
            grid-auto-flow: row;
            >.poster{
                height: 450px;
                overflow: hidden;
                img{
                    transform: scale(2);
                }
            }
            >.description{
                background-color: rgb(0, 0, 0);
                padding: 10px;
                //width: 50vw;
                display: grid;
                grid-auto-flow: row;
                color: cornsilk;
                h3{
                    text-align: left;
                    font-weight: 600;
                }
                p{
                    padding: 10px;
                    background-color: #fff;
                    color: black;
                    box-shadow: 1px 1px 4px 4px rgba($color: #000000, $alpha: 0.13) inset;
                    border-radius: 10px;
                    text-align: left;
                    cursor: default;
                }
            }
            
        }
        
    }
    .footer{
        padding: 20px 0;
        display: grid;
        grid-auto-flow: row;
        grid-auto-columns: auto;
        grid-auto-rows: auto;
        >.shedule{
            display:grid;
            grid-auto-flow: row;
            justify-content: center;
            grid-gap: 6px;
            >.shedule-item{
                padding: 4px;
                display: grid;
                grid-auto-flow: column;
                justify-content: left;
                grid-gap: 10px;

                .day{
                    width: 10vw;
                    display: -webkit-box;
                    justify-self: left;
                    padding: 10px;
                    border-radius: 10px;
                    cursor: default;
                    background-color: whitesmoke;
                }
                .time-strap{
                    display: grid;
                    grid-auto-flow: column;
                    grid-gap: 10px;
                    font-size: 16pt;
                    >.time-item{
                        cursor: pointer;
                        padding: 2px;
                        display: grid;
                        align-items: center;
                        justify-content: left;
                        border-radius: 10px;
                        background-color: wheat;
                        &:hover{
                            background-color: #42b983;
                            color: whitesmoke;
                            box-shadow: 1px 1px 4px 2px rgba($color: #000000, $alpha: 0.1);
                        }
                    }
                    >.booked{
                        background-color: rgb(255, 117, 117);
                        &:hover{
                            background-color: red;
                        }
                    }
                }
                
            }
            
        }
    }
    .modal-book{
        z-index: 1;
        position: relative;
        background-color: rgba(0, 0, 0, 0.479);
        height: 100vh;
        width: 100vw;
        top: -100vh;
        display: grid;
        grid-auto-flow: row;
        justify-content: center;
        >.container{
            position: relative;
            top: 25vh;
            width: 50vw;
            height: 25vh;
            background-color: blanchedalmond;
            display: grid;
            grid-auto-flow: row;
            grid-gap: 10px;
            z-index: 3;
            padding: 10px;
            border-radius: 10px;
            box-shadow: 1px 1px 4px 2px rgba($color: #000000, $alpha: 0.1);
            >.close{
                height: 20px;
                display: grid;
                justify-self: right;
                cursor: pointer;
                font-weight: 700;
                &:hover{
                    text-shadow: 1px 1px 4px rgba($color: #000000, $alpha: 0.1);
                }
            }
            >.order{
                height: 20px;
                display: grid;
                justify-self: center;
                cursor: pointer;
                font-weight: 700;
                &:hover{
                    text-shadow: 1px 1px 4px rgba($color: #000000, $alpha: 0.1);
                }
            }
            >.content{
                display: grid;
                grid-auto-flow: row;
                >input{
                    border-radius: 4px;
                }
            }
        }
    }
}
</style>