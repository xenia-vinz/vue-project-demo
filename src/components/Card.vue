<template>
  <div
    :class="[{'visible': currentMode === 'card'}]"
    class="card"
  >
    <div class="card__inner">
      <div
        class="card-goback"
        @click="toQuiz">
        Назад
      </div>

      <div class="card-top">
        <div
          class="card-top-title"
          v-html="staticContent.title">
        </div>
        <div
          class="card-top-intro"
          v-html="staticContent.intro">
        </div>
        <div
          class="card-top-text"
          v-html="staticContent.top">
        </div>
      </div>

      <div class="card-content">
        <div class="card-content-image"></div>
        <div class="card-content__inner">
          <img
            class="card-content__background"
            src="@/assets/card-border.svg"
            alt=""
          >
          <div
            v-if="content.title"
            class="card-content-title"
          >
            {{ content.title[0] }}
          </div>
          <div
            v-if="content.list"
            class="card-content-list">
            <ul>
              <li
                v-for="item in content.list"
                :key="item"
              >
                {{ item }}
              </li>
            </ul>
          </div>
          <div
            class="card-content-text"
            v-html="staticContent.bottom">
          </div>
          <div class="card-content-actions">
            <button
              v-if="canGoToGifts"
              class="card-content-button"
              @click="showConfirmForm"
            >
              <span class="card-content-button__ico card-content-button__ico--gift"></span>
              <span class="card-content-button__label">Выбрать подарок</span>
            </button>
            <button
              class="card-content-button"
              @click="showSharePopup"
            >
              <span class="card-content-button__ico card-content-button__ico--share"></span>
              <span class="card-content-button__label">Поделиться открыткой</span>
            </button>
          </div>
        </div>
      </div>

      <modal
        :adaptive="true"
        name="email"
      >
        <div class="card-confirm-popup popup">
          <img
             class="card-confirm-popup__background"
             src="@/assets/quiz.svg"
             alt=""
           >
          <div
            class="card-confirm-popup-close popup-close"
            @click="closeConfirmForm"
          >
            &times;
          </div>

          <div
            v-if="!fail"
            class="card-confirm-popup__inner popup__inner">
            <div class="card-confirm-popup-title popup-title">
              Пожалуйста, введите адрес почты:
            </div>
            <div action="" class="card-confirm-popup-form">

              <div class="card-confirm-popup-form__row">
                <input
                  v-model="email"
                  class="card-confirm-popup-form-input card-confirm-popup-form-input--text"
                  type="text"
                >
              </div>

              <div class="card-confirm-popup-form__row">

                <div
                  class="card-confirm-popup-form-input card-confirm-popup-form-input--radio input-radio--wrap"
                >
                  <label class="input-checkbox">
                    <input
                      v-model="agreement"
                      class="input-checkbox__input"
                      value="1"
                      name="agreement"
                      type="checkbox"
                    >
                    <span class="input-checkbox__label">
                      <p>Я ознакомился и согласен с условиями <a target="_blank"  href="/content/uploads/agreement.pdf">пользовательского соглашения</a> и даю согласие на <a target="_blank" href="/content/uploads/eula.pdf">обработку персональных данных</a></p>
                    </span>
                  </label>
                </div>
              </div>
              <div class="card-confirm-popup-form__row card-confirm-popup-form__row--submit">
                <button
                  class="card-confirm-popup-form-btn"
                  :disabled="!isValidForm"
                  @click="saveEmail"
                >
                  Далее
                </button>
              </div>
            </div>
          </div>
          <div
            v-if="fail"
            class="card-confirm-popup__inner popup__inner">

            <div
              v-if="failMessage"
              class="card-confirm-popup-error">
              <p>{{ failMessage }}</p>
            </div>
            <div
              v-else
              class="card-confirm-popup-error">
              <p>Что-то пошло не так, попробуйте позже</p>
            </div>
          </div>
        </div>
      </modal>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
  },
  data() {
    return {
      email: '',
      agreement: false,
      fail: false,
      failMessage: false,
    };
  },
  computed: {
    isValidForm() {
      const _regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let _valid = true;

      if (!this.email || this.email === '' || !this.agreement) {
        _valid = false;
      } else if (!_regexp.test(this.email)) {
        _valid = false;
      }
      return _valid;
    },
    canGoToGifts() {
      const _data = this.$store.getters['card/getData'];
      let _allow = false;

      if (_data) {
        if (_data.hasEmail && _data.hasEmail === '0') {
          _allow = true;
        }
        if (_data.hasGift && _data.hasGift === '0') {
          _allow = true;
        }
      }
      return _allow;
    },
    currentMode: {
      get() {
        return this.$store.getters.getCurrentMode;
      },
    },
    cardData: {
      get() {
        return this.$store.getters['card/getData'];
      },
    },
    staticContent: {
      get() {
        return this.$store.getters['pages/getPage']('card');
      },
    },
    content: {
      get() {
        return this.$store.getters['card/getContent'];
      },
    },
    guid: {
      get() {
        const _data = this.$store.getters['card/getData'];
        return (_data && _data.guid) ? _data.guid : false;
      },
    },
  },
  created() {
    const
      that = this;

    this.$store.subscribe((mutation) => {
      switch (mutation.type) {
        case 'card/SAVE_DATA':
          that.saveCard(mutation.payload);
          break;
        default:
          // do nothing
          break;
      }
    });
  },
  mounted() {
    this.$store.dispatch('pages/loadPage', {
      page: 'card',
    });
  },
  methods: {
    toQuiz() {
      this.$store.dispatch('setMode', {
        mode: 'quiz',
      });
    },
    toGifts() {
      window.scrollTo(0, 0);
      this.$store.dispatch('setMode', {
        mode: 'gifts',
      });
    },
    showSharePopup() {
      this.$modal.show('sharing');
    },
    saveCard(data) {
      this.$store.dispatch('setMode', {
        mode: 'card',
        guid: 'test',
      });
      this.$store.dispatch('card/loadCard', {
        guid: 'test',
      }, {
        root: true,
      });

      console.log(data);
      /*
        const
          that = this,
          _prefix = process.env.NODE_ENV === 'production' ? '' : 'http://valio-ny',
          _data = {
            properties: data
          };

        this.$superagent
          .post(_prefix + '/?api=cards/create')
          .type('form')
          .send(_data)
          .then((response) => {
            let
              _guid = false;

            if (response.body) {
              if (response.body.guid) {
                _guid = response.body.guid;
              }
            }

            that.$store.dispatch('setMode', {
              mode: 'card',
              guid: _guid
            });
            that.$store.dispatch('card/loadCard', {
              guid: _guid
            }, {
              root: true
            });
          })
          .catch((error) => {
            console.error(error);
          })
      */
    },
    showConfirmForm() {
      if (this.cardData.hasEmail && this.cardData.hasEmail === '1') {
        this.toGifts();
      } else {
        this.$modal.show('email');
      }
    },
    closeConfirmForm() {
      this.$modal.hide('email');
      this.fail = false;
      this.failMessage = false;
      this.email = '';
      this.agreement = false;
    },
    saveEmail() {
      this.$store.dispatch('setMode', {
        mode: 'gifts',
      });

      /*
        const
          that = this,
          _prefix = process.env.NODE_ENV === 'production' ? '' : 'http://valio-ny',
          _data = {
            guid: this.guid,
            email: this.email
          };

        this.$root.$emit('preload');
        this.fail = false;
        this.failMessage = false;

        this.$superagent
          .post(_prefix + '/?api=cards/email')
          .type('form')
          .send(_data)
          .then((response) => {

            if (response.body.status && response.body.status == 'error') {
              that.fail = true;
              that.$root.$emit('preloadStop');
              if (response.body.response) {
                if (response.body.response.message && response.body.response.message.indexOf('1062#') === 0) {
                  that.failMessage = 'Данный e-mail уже зарегистрирован!'
                }
              }
            } else {
              window.scrollTo(0,0);
              that.$root.$emit('preloadStop');
              that.$store.dispatch('setMode', {
                mode: 'gifts'
              });
            }
          })
          .catch((error) => {
            console.error(error);
          })
      */
    },
  },
};
</script>

<style scoped lang="scss">
  @import '@/scss/_utils.scss';
  .card {
    position: absolute;
    padding: 70px 0 60px;
    height: 0;
    opacity: 0;
    visibility: hidden;
    overflow: hidden;

    transition: opacity .2s linear;
    &.visible {
      position: relative;
      height: auto;
      opacity: 1;
      visibility: visible;
    }
    @include breakpoint($tablet) {
    }
    @include breakpoint($desktop) {
    }

    &__inner {
      padding: 0 15px;
      max-width: 900px;
    }
  }
    .card-goback {
      position: absolute;
      top: 20px;
      left: 0;
      margin: 0 0 26px 11px;
      color: $c_steel;
      font-family: $font_lifehack;
      font-size: 20px;
      line-height: 125%;
      cursor: pointer;
      &:before {
        content: '';
        display: inline-block;
        vertical-align: middle;
        width: 40px;
        height: 7px;
        margin-right: 11px;
        @include bg(100%);
        background-image: url('../assets/arrow-back.svg');
      }

      @include breakpoint($tablet) {
        top: 32px;
      }
      @include breakpoint($desktop) {
      }
      @include breakpoint($large) {
      }
    }
    // top
      .card-top {
      }
        .card-top-title {
          position: relative;
          margin: 0 0 17px;
          font-family: $font_lifehack;
          color: $c_red;
          text-align: left;
          font-size: 30px;
          line-height: 30px;

          @include breakpoint($tablet) {
            margin: 0 0 9px;
            font-size: 60px;
            line-height: 96px;
          }
        }
        .card-top-intro {
          font-size: 13px;
          line-height: 20px;

          @include breakpoint($tablet) {
            font-size: 18px;
            line-height: 26px;
          }
        }
        .card-top-text {
          font-size: 13px;
          line-height: 20px;

          @include breakpoint($tablet) {
            margin: 0 382px 0 0;
            min-height: 374px;
            font-size: 18px;
            line-height: 26px;
          }
        }
    // content
      .card-content {
        position: relative;

        &__inner {
          position: relative;
          padding: 79px 15px 100px 24px;
          background: $c_sand;
          overflow: hidden;
          z-index: 105;
          &:before,
          &:after {
            content: '';
            display: block;
            position: absolute;
            left: -5px;
            right: -5px;
            z-index: 106;
          }
            &:before {
              height: 61px;
              top: -3px;
              @include bg(cover, bottom);
              background-image: url('../assets/card-bg-top.svg');
            }
            &:after {
              height: 85px;
              bottom: -9px;
              @include bg(cover, top);
              background-image: url('../assets/card-bg-bottom.svg');
            }

          @include breakpoint($tablet) {
            min-height: 800px;
            padding: 111px 97px 83px 97px;
            &:before,
            &:after {
              display: none;
            }
          }
        }
        &__background {
          display: none;

          @include breakpoint($tablet) {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
          }
        }
      }
        .card-content-image {
          position: relative;
          display: block;
          left: 11px;
          margin: -24px 0 -34.125%;
          @include padding-hack(136.49%);
          @include bg();
          background-image: url('../assets/santa.png');
          z-index: 110;

          @include breakpoint($tablet) {
            position: absolute;
            left: auto;
            right: 0;
            top: -363px;
            width: 378px;
            height: 484px;
            margin: 0;
            &:before,
            &:after {
              display: none;
            }
          }
        }
        .card-content-title {
          position: relative;
          margin: 0 0 13px;
          font-family: $font_lifehack;
          color: $c_red;
          text-align: center;
          font-size: 20px;
          line-height: 25px;

          @include breakpoint($tablet) {
            font-size: 30px;
            line-height: 30px;
          }
        }
        .card-content-list {
          position: relative;
          ul {
            li {
              position: relative;
              margin: 0 0 1.35em;
              padding: 0 0 0 22px;
              list-style: none outside none;
              font-size: 13px;
              line-height: 20px;
              &:before {
                content: '';
                display: block;
                position: absolute;
                top: 4px;
                left: 0;
                width: 12px;
                height: 12px;
                @include bg();
                background-image: url('../assets/list-marker.svg');
              }

              @include breakpoint($tablet) {
                font-size: 18px;
                line-height: 26px;
              }
            }
          }
        }
        .card-content-text {
          position: relative;
          margin: 0 0 26px;
          padding: 1px 0 0 20px;
          font-size: 13px;
          line-height: 20px;

          @include breakpoint($tablet) {
            font-size: 18px;
            line-height: 26px;
          }
        }
        .card-content-actions {
          position: relative;

          @include breakpoint($tablet) {
            display:flex;
            justify-content: center;
            align-items: center;
          }
        }
          .card-content-button {
            @include btn();
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            margin: 0 0 10px;
            padding: 17px;
            transition: all .3s ease;
            background: $c_white;
            &:hover {
              background: $c_red;
            }

            @include breakpoint($tablet) {
              width: auto;
              margin: 0 20px 10px;
              min-width: 280px;
            }

            &__ico {
              display: block;
              width: 26px;
              height: 26px;
              margin: 0 6px 0 0;
              border-radius: 100px;
              @include bg();
              .card-content-button:hover & {
                background-color: $c_white;
              }
              &--gift {
                background-image: url('../assets/ico-gift.svg');
              }
              &--share {
                width: 14px;
                height: 20px;
                background-image: url('../assets/ico-card.svg');
              }

              @include breakpoint($tablet) {
                margin: 0 10px 0 0;
                width: 28px;
                height: 28px;
                &--share {
                  width: 21px;
                  height: 30px;
                }
              }
            }
            &__label {
              display: block;
              position: relative;
              top: 2px;
              font-family: $font_lifehack;
              font-size: 16px;
              line-height: 25px;
              color: $c_red;
              .card-content-button:hover & {
                color: $c_sand;
              }

              @include breakpoint($tablet) {
                font-size: 20px;
                line-height: 25px;
              }
            }
          }
    // confirmation popup
      .card-confirm-popup {
        position: relative;
        padding: 22px;

        &__background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
        }
        &__inner {
          @include breakpoint($tablet) {
            padding: 20px 30px;
          }
        }
      }
        .card-confirm-popup-title {
          position: relative;
          margin: 0 0 17px;
          font-family: $font_lifehack;
          color: $c_red;
          text-align: center;
          font-size: 20px;
          line-height: 25px;

          @include breakpoint($tablet) {
            font-size: 30px;
            line-height: 30px;
          }
          @include breakpoint($desktop) {
            margin: 0 0 20px;
          }
        }
        .card-confirm-popup-form {
          &__row {
            margin: 0 0 10px;
            &--submit {
              display: flex;
              justify-content: center;
              align-items: flex-start;
            }
          }
        }
        .card-confirm-popup-form-input {
          width: 100%;
        }
        .card-confirm-popup-form-btn {
          @include btn();
        }
</style>
