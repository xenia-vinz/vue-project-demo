<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer-contacts-phone">
        <p>Телефон для связи:<br><a href="tel:88003331525">8 (800) 333 15 25</a></p>
        <p>Eжедневно с 09:00 до 21:00 по московскому времени.</p>
        <p>Звонки по России бесплатно. </p>
      </div>
      <div class="footer-contacts-email">
        <a
          href="mailto:happynewyear@valio.com"
          class="footer-contacts-email__link">
          <span class="footer-contacts-email__link-text">
            Написать нам
          </span>
        </a>
      </div>
      <div class="footer-contacts-url">
        <div class="footer-contacts-url__title">
          Официальный сайт:
        </div>
        <a
          href="https://valio.ru"
          target="_blank">
          www.valio.ru
        </a>
      </div>
      <div class="footer-contacts-social">
        <div class="footer-contacts-social__title">
          Присоединяйтесь к нам:
        </div>
        <div class="footer-contacts-social__links">
          <a
            href="https://www.instagram.com/valiorussia/"
            class="footer-contacts-social__link footer-contacts-social__link--instagram">
            instagram.com/valiorussia/
          </a>
          <a
            href="https://www.facebook.com/ValioRussia"
            class="footer-contacts-social__link footer-contacts-social__link--fb">
            facebook.com/ValioRussia
          </a>
          <a
            href="https://vk.com/valioclub"
            class="footer-contacts-social__link footer-contacts-social__link--vk">
            vk.com/valioclub
          </a>
        </div>
      </div>
      <div class="footer-contacts-address">
        <span class="footer-contacts-address__part footer-contacts-address__part--first">
          © 2019 ООО «Валио», 199178
        </span>
        <span class="footer-contacts-address__part footer-contacts-address__part--second">
          г. Санкт-Петербург,
        </span>
        <span class="footer-contacts-address__part footer-contacts-address__part--third">
          1-Н линия 18-я В. О., д. 29, литера А, пом, ком. 154
        </span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  props: {
  },
};
</script>

<style scoped lang="scss">
  @import '@/scss/_utils.scss';
  .footer {
    grid-row-start: 2;
    grid-row-end: 3;
    padding: 35px 0 30px;
    background: $c_sand;

    @include breakpoint($tablet) {
      padding: 32px 0 0;
    }
    @include breakpoint($desktop) {
      padding: 27px 0;
      height: 150px;
      z-index: 1000;
    }
    @include breakpoint($large) {
      padding: 30px 0;
    }

    &__inner {
      position: relative;
      margin: 0 20px;

      @include breakpoint($tablet) {
        margin: 0 15px;
        padding: 0 0 9px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        grid-gap: 0;
      }
      @include breakpoint($desktop) {
        margin: 0 165px;
        padding: 0;
        grid-template-columns: 370px 1fr 1fr 1fr;
        grid-template-rows: 67px 30px;
      }
      @include breakpoint($large) {
        margin: 0 165px;
        padding: 0;
        grid-template-columns: 610px 1.5fr 2fr 1fr;
        grid-template-rows: 62px 30px;
      }
    }
    a {
      font-weight: bold;
      text-decoration: none;
    }
  }
    .footer-contacts-phone {
      margin: 0 0 23px;
      line-height: 20px;

      @include breakpoint($tablet) {
        margin: 0;
        grid-row: 1 / 1;
        grid-column: 1 / 1;
      }
      @include breakpoint($desktop) {
        grid-row: 1 / 3;
        grid-column: 1 / 1;
        line-height: 22px;
      }
    }
    .footer-contacts-email {
      margin: 0 0 22px;
      line-height: 20px;

      @include breakpoint($tablet) {
        grid-row: 1 / 1;
        grid-column: 2 / 2;
        padding: 2px 0 0 30px;
        margin: 0;
      }
      @include breakpoint($desktop) {
        grid-row: 1 / 1;
        grid-column: 2 / 2;
        padding: 2px 0 0 47px;
      }
      @include breakpoint($large) {
        padding: 3px 0 0 0;
      }

      &__link {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 14px;
        font-weight: bold;
        line-height: 14px;
        text-decoration: none;
        &:before {
          content: '';
          display: block;
          width: 19px;
          height: 14px;
          margin: 0 3px 0 0;
          @include bg();
          background-image: url('../assets/ico-email.svg');
        }
      }
        &__link-text {
        }
    }
    .footer-contacts-url {
      margin: 0 0 20px;
      line-height: 20px;

      @include breakpoint($tablet) {
        grid-row: 1 / 1;
        grid-column: 3 / 3;
        margin: 0;
        padding: 0 0 0 20px;
      }
      @include breakpoint($desktop) {
        grid-row: 1 / 1;
        grid-column: 3 / 3;
        line-height: 22px;
        padding: 0 0 0 47px;
      }
      @include breakpoint($large) {
        padding: 0 0 0 5px;
      }
    }
    .footer-contacts-social {
      margin: 0 0 27px;

      @include breakpoint($tablet) {
        grid-row: 2 / 2;
        grid-column: 3 / 4;
        margin: 0;
        padding: 10px 0 0 20px;
      }
      @include breakpoint($desktop) {
        grid-row: 1 / 1;
        grid-column: 4 / 4;
        padding: 0;
        padding: 1px 0 0 45px;
      }
      @include breakpoint($large) {
        padding: 1px 0 0 29px;
      }

      &__title {
        margin: 0 0 10px;
        line-height: 20px;

        @include breakpoint($tablet) {
          margin: 0 0 6px;
        }
      }
      &__links {
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
        &__link {
          display: block;
          width: 30px;
          height: 30px;
          margin: 0 0 0 20px;
          font-size: 0;
          text-decoration: none;
          &:first-child {
            margin-left: 0;
          }
          @include bg();
          &--instagram {
            background-image: url('../assets/ico-instagram.svg');
          }
          &--fb {
            background-image: url('../assets/ico-fb.svg');
          }
          &--vk {
            background-image: url('../assets/ico-vk.svg');
          }

          @include breakpoint($desktop) {
            width: 20px;
            height: 20px;
            margin-left: 10px;
          }
        }
    }
    .footer-contacts-address {
      color: $c_sand_dark;
      line-height: 20px;

      @include breakpoint($tablet) {
        grid-row: 2 / 2;
        grid-column: 1 / 3;
        padding: 20px 0 0;
      }
      @include breakpoint($desktop) {
        grid-row: 2 / 2;
        grid-column: 2 / 5;
        padding: 0 0 0 47px;
      }
      @include breakpoint($large) {
        padding: 5px 0 0 0;
      }

      &__part {
        &--first {
          display: block;

          @include breakpoint($tablet) {
            display: inline;
          }
        }
        &--second {
          display: inline;
        }
        &--third {
          display: inline;

          @include breakpoint($tablet) {
            display: block;
          }
          @include breakpoint($desktop) {
            display: inline;
          }
        }
      }
    }
</style>
