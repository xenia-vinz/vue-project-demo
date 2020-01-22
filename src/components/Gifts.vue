<template>
  <div
    :class="[{'visible': currentMode === 'gifts'}]"
    class="gifts"
  >
    <div class="gifts__inner">
      <div
        class="gifts-goback"
        @click="toCard">
        Назад
      </div>

      <div
        class="gifts-title">
        Выбери свой подарок:
      </div>

      <div
        :class="[{'gift-list--has-selected': selected !== null }]"
        class="gifts-list"
        >

        <div
          v-for="gift in gifts"
          :key="gift.guid"
          :class="[{'gifts-list-item--active': selected === gift.guid  }]"
          class="gifts-list-item"
          @click="selectGift(gift.guid)"
        >
          <div class="gifts-list-item__content">
            <div class="gifts-list-item__content-title">
              {{ gift.title }}
            </div>
            <div class="gifts-list-item__content-text">
              {{ gift.description }}
            </div>
          </div>
          <img
            class="gifts-list-item__image"
            :src="makeImgUrl(gift.image)"
          >
        </div>
      </div>

      <div
        class="gifts-actions">
        <button
          :disabled="!selected && cardGuid"
          @click="saveGift"
          class="gifts-actions-btn"
        >
          Выбрать
        </button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Gifts',
  props: {
  },
  data() {
    return {
      fail: false,
      selected: null,
    };
  },
  computed: {
    currentMode: {
      get() {
        return this.$store.getters.getCurrentMode;
      },
    },
    gifts: {
      get() {
        return this.$store.getters['gifts/getData'];
      },
    },
    cardGuid: {
      get() {
        const
          _data = this.$store.getters['card/getData'];
        let
          _guid = false;

        if (_data) {
          if (_data.guid) {
            _guid = _data.guid;
          }
        }
        return _guid;
      },
    },
  },
  mounted() {
    this.$store.dispatch('gifts/loadGifts');
  },
  methods: {
    toCard() {
      this.$store.dispatch('setMode', {
        mode: 'card',
      });
    },
    selectGift(data) {
      this.$emit('gifts-list-item--active');
      this.selected = data;
    },
    saveGift() {
      this.$store.dispatch('setMode', {
        mode: 'final',
      });
      this.$root.$emit('preloadStop');
      /*
      const
        that = this,
        _prefix = process.env.NODE_ENV === 'production' ? '' : 'http://valio-ny',
        _data = {
          guid: this.cardGuid,
          gift: this.selected
        };

      this.$root.$emit('preload');
      this.$superagent
        .post(_prefix + '/?api=cards/gift')
        .type('form')
        .send(_data)
        .then((response) => {
          let
            _fail = false;

          if (response.body.status && response.body.status == 'error') {
            _fail = true;
          }

          if (_fail) {
            that.fail = true;
          } else {
            window.scrollTo(0,0);
            that.$store.dispatch('setMode', {
              mode: 'final'
            });
          }
          that.$root.$emit('preloadStop');
        })
        .catch((error) => {
          console.error(error);
        })
      */
    },
    makeImgUrl(data) {
      const
        _prefix = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080/sample/';

      return _prefix + data;
    },
  },
};
</script>

<style scoped lang="scss">
  @import '@/scss/_utils.scss';
  .gifts {
    position: absolute;
    opacity: 0;
    visibility: hidden;
    height: 0;
    overflow: hidden;
    transition: opacity .2s linear;
    &.visible {
      position: relative;
      opacity: 1;
      visibility: visible;
      height: auto;
    }
    &__inner {
      padding: 80px 15px 0;
      transition: all .5s linear;
    }
  }
    .gifts-goback {
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
    }
    .gifts-title {
      font-family: $font_lifehack;
      color: $c_red;
      text-align: center;
      font-size: 30px;
      line-height: 30px;
      margin: 0 0 45px;
    }
    .gifts-list {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-wrap: wrap;
      & * {
        transition: all .2s ease;
      }

    }
      .gifts-list-item {
        cursor: pointer;
        @include breakpoint($tablet) {
          flex-basis: 30%;
        }
        @include breakpoint($desktop) {
          flex-basis: 30%;
        }
        &__content {
          opacity: 0;
          .gifts-list-item:hover & {
            opacity: 1;
          }
        }
          &__content-title {
            color: $c_red;
            font-weight: bold;
            font-size: 14px;
            line-height: 19px;
            @include breakpoint($desktop) {
              color: $c_red;
              font-weight: bold;
              font-size: 18px;
              line-height: 23px;
            }
          }
          &__content-text {
            @include breakpoint($desktop) {
              font-size: 18px;
              line-height: 23px;
            }
          }
        &__image {
          opacity: .8;
          transition: opacity .2s ease, transform .2s ease;
          .gifts-list-item:hover &,
          .gifts-list-item--active & {
            animation: shake .8s infinite;
            animation-timing-function: linear;
          }
          .gifts-list-item--active & {
            opacity: 1;
            transform: scale(1.3);
          }
          .gifts-list--has-selected & {
            transform: scale(0.9);
          }
        }
      }
    .gifts-actions {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 60px 0;
    }
      .gifts-actions-btn {
        @include btn();
      }

  @keyframes shake {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(5deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
</style>
