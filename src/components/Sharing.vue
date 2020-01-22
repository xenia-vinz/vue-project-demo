<template>

  <modal
    :adaptive="true"
    name="sharing"
  >
    <div class="sharing-popup popup">
          <img
             class="sharing-popup__background"
             src="@/assets/quiz.svg"
             alt=""
           >

      <div
        class="sharing-popup-close popup-close"
        @click="closePopup"
      >
        &times;
      </div>

      <div class="sharing-popup__inner popup__inner">
        <div class="sharing-popup-title popup-title">
          Поделиться открыткой:
        </div>
        <div class="sharing-popup-content popup-content">
            <div class="sharing-popup-content__inner">
              <img
                class="sharing-popup-content__image"
                src="@/assets/sharing-img.png"
              >
              <div class="sharing-popup-content__text">
                <p>С наступающим Новым годом!<br>Сегодня я - Йоулупукки! Вот подарки от меня,<br>Valio и друзей: Погадать и получить подарок</p>
              </div>
          </div>
        <social-sharing
          :url="sharingUrl"
          :media="sharingImage"
          title="С наступающим Новым годом!"
          description="Сегодня я - Йоулупукки! Вот подарки от меня,Valio и друзей. Погадать и получить подарок можно здесь:"
          inline-template
        >
          <div class="sharing-popup-actions">
            <network network="facebook">
              <span class="sharing-popup-actions-label sharing-popup-actions-label--fb">
                Facebook
              </span>
            </network>
            <network network="vk">
              <span class="sharing-popup-actions-label sharing-popup-actions-label--vk">
                ВКонтакте
              </span>
            </network>

            <network network="whatsapp">
              <span class="sharing-popup-actions-label sharing-popup-actions-label--whatsapp">
                Whatsapp
              </span>
            </network>
          </div>
        </social-sharing>
        </div>
        </div>
      </div>
  </modal>

</template>

<script>
export default {
  name: 'Sharing',
  props: {
  },
  data() {
    return {
    };
  },
  computed: {
    currentMode: {
      get() {
        return this.$store.getters.getCurrentMode;
      },
    },
    sharingImage: {
      get() {
        return window.location.origin + '/content/uploads/share.png';
      },
    },
    sharingUrl: {
      get() {
        const
          _data = this.$store.getters['card/getData'];
        let
          _url = window.location.origin;

        if (_data) {
          if (_data.guid) {
            _url = window.location.origin + '?card=' + _data.guid;
          }
        }
        return _url;
      },
    },
  },
  mounted() {
    const
      that = this;
    document.addEventListener('click', (e) => {
      // yandexMetrika goals
      if (!window.ym || (typeof ym !== 'function')) {
        return;
      }
      if (e.target && e.target.parentElement && e.target.parentElement.dataset && e.target.parentElement.dataset.link) {
        const
          share = '' + e.target.parentElement.dataset.link;
        let params;
        let cfg;
        let ymId;

        if (share && share.indexOf('#') === 0) {
          ymId = document.querySelector('body').dataset.ym;
          cfg = that.$store.getters['card/getData'];
          if (cfg && cfg.guid) {
            params = { card: cfg.guid };
            window.ym(ymId, 'reachGoal', share, params);
          } else {
            window.ym(ymId, 'reachGoal', share);
          }
        }
      }
    });
  },
  methods: {
    showPopup() {
      this.$modal.show('sharing', { height: '400px' });
    },
    closePopup() {
      this.$modal.hide('sharing');
    },
    share(data) {
      console.log(data);
    },
  },
};
</script>

<style lang="scss">
  @import '@/scss/_utils.scss';
  .sharing {
    display: none;
  }
  .sharing-popup {
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
            z-index:5;
            position:relative;
            padding:20px 30px;
        }
        &-content {
            &__inner {
                display:none;
                @include breakpoint($tablet) {
                    display:flex;
                }
            }
            &__image{
            }
            &__text{
                padding:0 0 0 20px;
            }
        }
    }
    .sharing-popup-title {
      font-family: $font_lifehack;
      color: $c_red;
      text-align: center;
      font-size: 30px;
      line-height: 30px;
      margin: 0 0 15px;
    }

    .sharing-popup-actions {
        @include breakpoint($tablet) {
            display: flex;
            justify-content: space-between;
          }
      padding:10px 0;
      align-items: center;
      > span {
        background:$c_white;
        padding:7px 16px;
        display: block;
        cursor: pointer;
        width:100%;
        margin:0 0 10px;
        &:hover {
            background:$c_red;
            .sharing-popup-actions-label {
                color:$c_white;
            }
             .sharing-popup-actions-label:before {
                background-color:$c_white;
             }
        }
        @include breakpoint($tablet) {
            margin: 0 10px 0 0;
        }

      }
    }
    .sharing-popup-actions-label {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      &:before {
        content: '';
        display: block;
        width: 30px;
        height: 30px;
        margin: 0 9px 0 0;
        @include bg();
        border-radius:60px;
      }
      &--vk {
        &:before {
          background-image: url('../assets/ico-vk.svg');
        }
      }
      &--fb {
        &:before {
          background-image: url('../assets/ico-fb.svg');
        }
      }
      &--whatsapp {
        &:before {
          background-image: url('../assets/ico-whatsapp.svg');
        }
      }
    }
</style>
