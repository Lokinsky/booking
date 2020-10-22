(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["about"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/booking-app/src/components/BookingQuest.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/booking-app/src/components/BookingQuest.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./resources/js/booking-app/node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      quest: Array,
      booking_dates: [],
      locale: {
        'en': {
          'button': {
            'order': 'Order',
            'close': 'Close'
          },
          'label': {
            'name': 'Name',
            'email': 'E-mail',
            'mob': 'Mobile',
            'shedule': 'Shedule',
            'description': 'Description',
            'week': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
          }
        },
        'ru': {
          'button': {
            'order': 'Забронировать',
            'close': 'Закрыть'
          },
          'labels': {
            'name': 'Имя',
            'email': 'Почта',
            'mob': 'Моб.',
            'shedule': 'Расписание',
            'description': 'Описание',
            'week': ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
          }
        }
      },
      modal_booked: false,
      book_day: Number,
      book_time: Number,
      questId: this.$route.params['questId'],
      client: {
        name: '',
        email: '',
        mob: ''
      },
      lang: document.documentElement.lang
    };
  },
  mounted: function mounted() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this.getQuest();

            case 2:
              _this.getShedule();

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  methods: {
    getQuest: function getQuest() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return fetch('http://127.0.0.1:8000/api/getQuest/' + _this2.questId).then(function (resp) {
                  return resp.json();
                }).then(function (data) {
                  _this2.quest = data.data[0];
                  console.log(data);
                })["catch"](function (err) {
                  console.log(err);
                });

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    getShedule: function getShedule() {
      var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      /**
       * Функция для генерации расписания брони.
       * @Number offset – Смещение расписания.
       */
      var date = new Date();
      var from = date.setHours(0, 0, 0, 0);
      var dayStamps = 24 * 60 * 60 * 1000;
      var hourStamps = 60 * 60 * 1000;
      var shedule = [];
      var booked = this.quest['date_booked'];

      for (var i = 0; i < 14; i++) {
        /**
        * Цикл генерирующий дни недели.
        */
        var day = new Date(from + (i + offset) * dayStamps).getTime();
        shedule[i] = {
          'day': day,
          'hours': []
        }; //Поиск забронированных временных слотов.

        var booked_day = booked.filter(function (book) {
          return Number(book['date']) === day;
        });

        var _loop = function _loop(j) {
          /**
           * Цикл для создания временных слотов, а также привязка
           * забронированных данными из бд.
           */
          var time = hourStamps * j;
          var book_time = booked_day.filter(function (book) {
            return Number(book['time']) === time;
          });
          var is_expired = Date.now() > new Date(day + time);
          var is_booked = book_time[0] != undefined ? true : false;
          if (!is_expired) shedule[i]['hours'].push({
            'time': time,
            'is_booked': is_booked
          });
        };

        for (var j = 1; j < 24; j++) {
          _loop(j);
        }
      }

      this.booking_dates = shedule;
      console.log(shedule);
    },
    modal: function modal(is_modal) {
      var book = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      /**
       * Функция для создания модального окна
       */
      var body = document.getElementsByTagName("BODY")[0];

      if (is_modal && book != null) {
        this.modal_booked = true;
        this.book_day = book['day'];
        this.book_time = book['time'];
        body.classList.add('no-scroll');
      } else {
        this.modal_booked = false;
        body.classList.remove('no-scroll');
        this.book_day = Number;
        this.book_time = Number;
      }
    },
    book_it: function book_it() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                /**
                 * Функция для бронирования временной ячейки.
                 */
                jquery__WEBPACK_IMPORTED_MODULE_1___default.a.ajaxSetup({
                  headers: {
                    'X-CSRF-TOKEN': jquery__WEBPACK_IMPORTED_MODULE_1___default()('meta[name="csrf-token"]').attr('content')
                  },
                  url: "http://127.0.0.1:8000/api/bookTime",
                  type: "POST"
                });

                if (!(_this3.client['name'] != '' && _this3.client['email'] != '' && _this3.client['mob'] != '')) {
                  _context3.next = 11;
                  break;
                }

                jquery__WEBPACK_IMPORTED_MODULE_1___default.a.ajax({
                  data: {
                    client: _this3.client,
                    questId: _this3.questId,
                    book_time: {
                      day: _this3.book_day,
                      time: _this3.book_time
                    }
                  }
                }).done(function (res) {
                  console.log(res);
                });
                _context3.next = 5;
                return _this3.getQuest();

              case 5:
                _this3.getShedule();

                _this3.client = {};
                _this3.book_time = {};

                _this3.modal(false);

                _context3.next = 12;
                break;

              case 11:
                alert(_this3.lang == 'en' ? 'Please, fill all fields.' : 'Пожалуйста, заполните все поля.');

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/booking-app/src/views/Booking.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/booking-app/src/views/Booking.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_BookingQuest_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/BookingQuest.vue */ "./resources/js/booking-app/src/components/BookingQuest.vue");
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Booking',
  data: function data() {
    return {
      lang: document.documentElement.lang
    };
  },
  components: {
    BookingQuets: _components_BookingQuest_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/booking-app/src/components/BookingQuest.vue?vue&type=style&index=0&id=4e127332&lang=scss&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/booking-app/src/components/BookingQuest.vue?vue&type=style&index=0&id=4e127332&lang=scss&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".booking-quest-component[data-v-4e127332] {\n  padding: 10px 0px;\n  width: 100%;\n  display: grid;\n  grid-auto-flow: row;\n}\n.booking-quest-component > .item[data-v-4e127332] {\n  width: inherit;\n}\n.booking-quest-component > .item > header h3[data-v-4e127332] {\n  font-size: 28pt;\n}\n.booking-quest-component > .item > .body[data-v-4e127332] {\n  width: inherit;\n  display: grid;\n  grid-auto-flow: row;\n}\n.booking-quest-component > .item > .body > .poster[data-v-4e127332] {\n  height: 450px;\n  overflow: hidden;\n}\n.booking-quest-component > .item > .body > .poster img[data-v-4e127332] {\n  transform: scale(2);\n}\n.booking-quest-component > .item > .body > .description[data-v-4e127332] {\n  background-color: black;\n  padding: 10px;\n  display: grid;\n  grid-auto-flow: row;\n  color: cornsilk;\n}\n.booking-quest-component > .item > .body > .description h3[data-v-4e127332] {\n  text-align: left;\n  font-weight: 600;\n}\n.booking-quest-component > .item > .body > .description p[data-v-4e127332] {\n  padding: 10px;\n  background-color: #fff;\n  color: black;\n  box-shadow: 1px 1px 4px 4px rgba(0, 0, 0, 0.13) inset;\n  border-radius: 10px;\n  text-align: left;\n  cursor: default;\n}\n.booking-quest-component .footer[data-v-4e127332] {\n  padding: 20px 0;\n  display: grid;\n  grid-auto-flow: row;\n  grid-auto-columns: auto;\n  grid-auto-rows: auto;\n}\n.booking-quest-component .footer > .shedule[data-v-4e127332] {\n  display: grid;\n  grid-auto-flow: row;\n  justify-content: center;\n  grid-gap: 6px;\n}\n.booking-quest-component .footer > .shedule > .shedule-item[data-v-4e127332] {\n  padding: 4px;\n  display: grid;\n  grid-auto-flow: column;\n  justify-content: left;\n  grid-gap: 10px;\n}\n.booking-quest-component .footer > .shedule > .shedule-item .day[data-v-4e127332] {\n  width: 10vw;\n  display: -webkit-box;\n  justify-self: left;\n  padding: 10px;\n  border-radius: 10px;\n  cursor: default;\n  background-color: whitesmoke;\n}\n.booking-quest-component .footer > .shedule > .shedule-item .time-strap[data-v-4e127332] {\n  display: grid;\n  grid-auto-flow: column;\n  grid-gap: 10px;\n  font-size: 16pt;\n}\n.booking-quest-component .footer > .shedule > .shedule-item .time-strap > .time-item[data-v-4e127332] {\n  cursor: pointer;\n  padding: 2px;\n  display: grid;\n  align-items: center;\n  justify-content: left;\n  border-radius: 10px;\n  background-color: wheat;\n}\n.booking-quest-component .footer > .shedule > .shedule-item .time-strap > .time-item[data-v-4e127332]:hover {\n  background-color: #42b983;\n  color: whitesmoke;\n  box-shadow: 1px 1px 4px 2px rgba(0, 0, 0, 0.1);\n}\n.booking-quest-component .footer > .shedule > .shedule-item .time-strap > .booked[data-v-4e127332] {\n  background-color: #ff7575;\n}\n.booking-quest-component .footer > .shedule > .shedule-item .time-strap > .booked[data-v-4e127332]:hover {\n  background-color: red;\n}\n.booking-quest-component .modal-book[data-v-4e127332] {\n  z-index: 1;\n  position: relative;\n  background-color: rgba(0, 0, 0, 0.479);\n  height: 100vh;\n  width: 100vw;\n  top: -100vh;\n  display: grid;\n  grid-auto-flow: row;\n  justify-content: center;\n}\n.booking-quest-component .modal-book > .container[data-v-4e127332] {\n  position: relative;\n  top: 25vh;\n  width: 50vw;\n  height: 25vh;\n  background-color: blanchedalmond;\n  display: grid;\n  grid-auto-flow: row;\n  grid-gap: 10px;\n  z-index: 3;\n  padding: 10px;\n  border-radius: 10px;\n  box-shadow: 1px 1px 4px 2px rgba(0, 0, 0, 0.1);\n}\n.booking-quest-component .modal-book > .container > .close[data-v-4e127332] {\n  height: 20px;\n  display: grid;\n  justify-self: right;\n  cursor: pointer;\n  font-weight: 700;\n}\n.booking-quest-component .modal-book > .container > .close[data-v-4e127332]:hover {\n  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);\n}\n.booking-quest-component .modal-book > .container > .order[data-v-4e127332] {\n  height: 20px;\n  display: grid;\n  justify-self: center;\n  cursor: pointer;\n  font-weight: 700;\n}\n.booking-quest-component .modal-book > .container > .order[data-v-4e127332]:hover {\n  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);\n}\n.booking-quest-component .modal-book > .container > .content[data-v-4e127332] {\n  display: grid;\n  grid-auto-flow: row;\n}\n.booking-quest-component .modal-book > .container > .content > input[data-v-4e127332] {\n  border-radius: 4px;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/booking-app/src/views/Booking.vue?vue&type=style&index=0&lang=scss&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/booking-app/src/views/Booking.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".booking {\n  display: grid;\n  grid-auto-flow: row;\n  justify-self: center;\n}\n.booking > .header {\n  display: grid;\n  grid-auto-flow: column;\n  justify-content: center;\n  grid-gap: 10px;\n}\n.booking > .header h3 {\n  color: #42b983;\n  font-weight: 700;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/booking-app/src/components/BookingQuest.vue?vue&type=style&index=0&id=4e127332&lang=scss&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/booking-app/src/components/BookingQuest.vue?vue&type=style&index=0&id=4e127332&lang=scss&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/vue-loader/lib??vue-loader-options!./BookingQuest.vue?vue&type=style&index=0&id=4e127332&lang=scss&scoped=true& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/booking-app/src/components/BookingQuest.vue?vue&type=style&index=0&id=4e127332&lang=scss&scoped=true&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/booking-app/src/views/Booking.vue?vue&type=style&index=0&lang=scss&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/booking-app/src/views/Booking.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Booking.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/booking-app/src/views/Booking.vue?vue&type=style&index=0&lang=scss&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/booking-app/src/components/BookingQuest.vue?vue&type=template&id=4e127332&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/booking-app/src/components/BookingQuest.vue?vue&type=template&id=4e127332&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "booking-quest-component" }, [
    _c("div", { staticClass: "item" }, [
      _c("div", { staticClass: "header" }, [
        _c("h3", [_vm._v(_vm._s(_vm.quest["quest_name"]))])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "body" }, [
        _c("div", { staticClass: "poster" }, [
          _c("img", { attrs: { src: _vm.quest["img"], alt: "", srcset: "" } })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "description" }, [
          _c("h3", [
            _vm._v(_vm._s(_vm.locale[_vm.lang]["label"]["description"]))
          ]),
          _vm._v(" "),
          _c("p", [
            _vm._v(
              "\n              " +
                _vm._s(_vm.quest["quest_description"]) +
                "\n            "
            )
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "footer" }, [
        _c(
          "div",
          { staticClass: "shedule" },
          [
            _c("div", { staticClass: "header" }, [
              _c("h3", [
                _vm._v(_vm._s(_vm.locale[_vm.lang]["label"]["shedule"]))
              ])
            ]),
            _vm._v(" "),
            _vm._l(_vm.booking_dates, function(book, index) {
              return [
                book["hours"].length != 0
                  ? _c("div", { key: index, staticClass: "shedule-item" }, [
                      _c("div", { staticClass: "day" }, [
                        _c("h3", [
                          _vm._v(
                            "\n                                " +
                              _vm._s(
                                _vm.locale[_vm.lang]["label"]["week"][
                                  new Date(book["day"]).getDay()
                                ]
                              ) +
                              "\n                            "
                          )
                        ])
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "time-strap" },
                        [
                          _vm._l(book["hours"], function(time, index) {
                            return [
                              _c(
                                "div",
                                {
                                  key: index,
                                  staticClass: "time-item",
                                  class: { booked: time["is_booked"] },
                                  on: {
                                    click: function($event) {
                                      !time["is_booked"]
                                        ? _vm.modal(true, {
                                            day: book["day"],
                                            time: time["time"]
                                          })
                                        : _vm.alert("Время уже занято")
                                    }
                                  }
                                },
                                [
                                  _vm._v(
                                    "\n                                        " +
                                      _vm._s(
                                        new Date(
                                          book["day"] + time["time"]
                                        ).getHours() + ":00"
                                      ) +
                                      "\n                                "
                                  )
                                ]
                              )
                            ]
                          })
                        ],
                        2
                      )
                    ])
                  : _vm._e()
              ]
            })
          ],
          2
        )
      ])
    ]),
    _vm._v(" "),
    _vm.modal_booked
      ? _c(
          "div",
          { staticClass: "modal-book", attrs: { name: "modal", id: "modal" } },
          [
            _c("div", { staticClass: "container" }, [
              _c(
                "div",
                {
                  staticClass: "close",
                  on: {
                    click: function($event) {
                      return _vm.modal(false)
                    }
                  }
                },
                [_vm._v(_vm._s(_vm.locale[_vm.lang]["button"]["close"]))]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "content" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.client["name"],
                      expression: "client['name']"
                    }
                  ],
                  attrs: {
                    required: "",
                    type: "text",
                    placeholder: _vm.locale[_vm.lang]["label"]["name"]
                  },
                  domProps: { value: _vm.client["name"] },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.client, "name", $event.target.value)
                    }
                  }
                }),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.client["email"],
                      expression: "client['email']"
                    }
                  ],
                  attrs: {
                    required: "",
                    type: "email",
                    placeholder: _vm.locale[_vm.lang]["label"]["email"]
                  },
                  domProps: { value: _vm.client["email"] },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.client, "email", $event.target.value)
                    }
                  }
                }),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.client["mob"],
                      expression: "client['mob']"
                    }
                  ],
                  attrs: {
                    required: "",
                    type: "text",
                    placeholder: _vm.locale[_vm.lang]["label"]["mob"]
                  },
                  domProps: { value: _vm.client["mob"] },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.client, "mob", $event.target.value)
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "order",
                  on: {
                    click: function($event) {
                      return _vm.book_it()
                    }
                  }
                },
                [_vm._v(_vm._s(_vm.locale[_vm.lang]["button"]["order"]))]
              )
            ])
          ]
        )
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/booking-app/src/views/About.vue?vue&type=template&id=3f7d5ef1&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/booking-app/src/views/About.vue?vue&type=template&id=3f7d5ef1& ***!
  \*******************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "about" }, [
      _c("h1", [_vm._v("This is an about page")])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/booking-app/src/views/Booking.vue?vue&type=template&id=69d35abd&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/booking-app/src/views/Booking.vue?vue&type=template&id=69d35abd& ***!
  \*********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "booking" },
    [
      _c(
        "div",
        { staticClass: "header" },
        [
          _c("router-link", { attrs: { to: "/" } }, [
            _vm._v(_vm._s(_vm.lang == "en" ? "Back" : "Назад"))
          ]),
          _vm._v(" "),
          _c("h3", [
            _vm._v(_vm._s(_vm.lang == "en" ? "Booking" : "Бронирование"))
          ])
        ],
        1
      ),
      _vm._v(" "),
      _c("BookingQuets")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/booking-app/src/components/BookingQuest.vue":
/*!******************************************************************!*\
  !*** ./resources/js/booking-app/src/components/BookingQuest.vue ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BookingQuest_vue_vue_type_template_id_4e127332_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BookingQuest.vue?vue&type=template&id=4e127332&scoped=true& */ "./resources/js/booking-app/src/components/BookingQuest.vue?vue&type=template&id=4e127332&scoped=true&");
/* harmony import */ var _BookingQuest_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BookingQuest.vue?vue&type=script&lang=js& */ "./resources/js/booking-app/src/components/BookingQuest.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _BookingQuest_vue_vue_type_style_index_0_id_4e127332_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BookingQuest.vue?vue&type=style&index=0&id=4e127332&lang=scss&scoped=true& */ "./resources/js/booking-app/src/components/BookingQuest.vue?vue&type=style&index=0&id=4e127332&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _BookingQuest_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _BookingQuest_vue_vue_type_template_id_4e127332_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _BookingQuest_vue_vue_type_template_id_4e127332_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "4e127332",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/booking-app/src/components/BookingQuest.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/booking-app/src/components/BookingQuest.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/booking-app/src/components/BookingQuest.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BookingQuest_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./BookingQuest.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/booking-app/src/components/BookingQuest.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BookingQuest_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/booking-app/src/components/BookingQuest.vue?vue&type=style&index=0&id=4e127332&lang=scss&scoped=true&":
/*!****************************************************************************************************************************!*\
  !*** ./resources/js/booking-app/src/components/BookingQuest.vue?vue&type=style&index=0&id=4e127332&lang=scss&scoped=true& ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_BookingQuest_vue_vue_type_style_index_0_id_4e127332_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/vue-loader/lib??vue-loader-options!./BookingQuest.vue?vue&type=style&index=0&id=4e127332&lang=scss&scoped=true& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/booking-app/src/components/BookingQuest.vue?vue&type=style&index=0&id=4e127332&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_BookingQuest_vue_vue_type_style_index_0_id_4e127332_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_BookingQuest_vue_vue_type_style_index_0_id_4e127332_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_BookingQuest_vue_vue_type_style_index_0_id_4e127332_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_BookingQuest_vue_vue_type_style_index_0_id_4e127332_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_BookingQuest_vue_vue_type_style_index_0_id_4e127332_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/booking-app/src/components/BookingQuest.vue?vue&type=template&id=4e127332&scoped=true&":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/booking-app/src/components/BookingQuest.vue?vue&type=template&id=4e127332&scoped=true& ***!
  \*************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BookingQuest_vue_vue_type_template_id_4e127332_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./BookingQuest.vue?vue&type=template&id=4e127332&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/booking-app/src/components/BookingQuest.vue?vue&type=template&id=4e127332&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BookingQuest_vue_vue_type_template_id_4e127332_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BookingQuest_vue_vue_type_template_id_4e127332_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/booking-app/src/views/About.vue":
/*!******************************************************!*\
  !*** ./resources/js/booking-app/src/views/About.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _About_vue_vue_type_template_id_3f7d5ef1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./About.vue?vue&type=template&id=3f7d5ef1& */ "./resources/js/booking-app/src/views/About.vue?vue&type=template&id=3f7d5ef1&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");

var script = {}


/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  script,
  _About_vue_vue_type_template_id_3f7d5ef1___WEBPACK_IMPORTED_MODULE_0__["render"],
  _About_vue_vue_type_template_id_3f7d5ef1___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/booking-app/src/views/About.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/booking-app/src/views/About.vue?vue&type=template&id=3f7d5ef1&":
/*!*************************************************************************************!*\
  !*** ./resources/js/booking-app/src/views/About.vue?vue&type=template&id=3f7d5ef1& ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_About_vue_vue_type_template_id_3f7d5ef1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./About.vue?vue&type=template&id=3f7d5ef1& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/booking-app/src/views/About.vue?vue&type=template&id=3f7d5ef1&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_About_vue_vue_type_template_id_3f7d5ef1___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_About_vue_vue_type_template_id_3f7d5ef1___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/booking-app/src/views/Booking.vue":
/*!********************************************************!*\
  !*** ./resources/js/booking-app/src/views/Booking.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Booking_vue_vue_type_template_id_69d35abd___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Booking.vue?vue&type=template&id=69d35abd& */ "./resources/js/booking-app/src/views/Booking.vue?vue&type=template&id=69d35abd&");
/* harmony import */ var _Booking_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Booking.vue?vue&type=script&lang=js& */ "./resources/js/booking-app/src/views/Booking.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Booking_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Booking.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/booking-app/src/views/Booking.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Booking_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Booking_vue_vue_type_template_id_69d35abd___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Booking_vue_vue_type_template_id_69d35abd___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/booking-app/src/views/Booking.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/booking-app/src/views/Booking.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/booking-app/src/views/Booking.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Booking_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Booking.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/booking-app/src/views/Booking.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Booking_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/booking-app/src/views/Booking.vue?vue&type=style&index=0&lang=scss&":
/*!******************************************************************************************!*\
  !*** ./resources/js/booking-app/src/views/Booking.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Booking_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Booking.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/booking-app/src/views/Booking.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Booking_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Booking_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Booking_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Booking_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Booking_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/booking-app/src/views/Booking.vue?vue&type=template&id=69d35abd&":
/*!***************************************************************************************!*\
  !*** ./resources/js/booking-app/src/views/Booking.vue?vue&type=template&id=69d35abd& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Booking_vue_vue_type_template_id_69d35abd___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Booking.vue?vue&type=template&id=69d35abd& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/booking-app/src/views/Booking.vue?vue&type=template&id=69d35abd&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Booking_vue_vue_type_template_id_69d35abd___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Booking_vue_vue_type_template_id_69d35abd___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);