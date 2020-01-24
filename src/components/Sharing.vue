<template>

  <modal
    :adaptive="true"
    name="sharing"
  >
    <div class="sharing-popup popup">
      <img
        class="sharing-popup__background"
        src="@/assets/quiz.svg"
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
        const _data = this.$store.getters['card/getData'];
        let _url = window.location.origin;

        if (_data && _data.guid) {
          _url += '?card=' + _data.guid;
        }
        return _url;
      },
    },
  },
  methods: {
    showPopup() {
      this.$modal.show('sharing', {
        height: '400px',
      });
    },
    closePopup() {
      this.$modal.hide('sharing');
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
        position: relative;
        padding: 20px 30px;
        z-index:5;
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
      .sharing-popup-content {
        &__inner {
          display: none;
          @include breakpoint($tablet) {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
          }
        }
        &__image {
        }
        &__text {
          padding:0 0 0 20px;
        }
      }
      .sharing-popup-actions {
        padding: 10px 0;
        @include breakpoint($tablet) {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        > span {
          display: block;
          width:100%;
          margin: 0 0 10px;
          padding: 7px 16px;
          background: $c_white;
          cursor: pointer;
          &:hover {
            background: $c_red;
            .sharing-popup-actions-label {
              color: $c_white;
              &:before {
                background-color: $c_white;
              }
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
            border-radius: 60px;
            @include bg();
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
