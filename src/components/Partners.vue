<template>
  <div
    v-if="currentMode == 'greeting'"
    class="partners"
  >
    <div class="partner partner--1oe">
      <img
        src="@/assets/logo/ffm.png"
        alt="">
    </div>
    <div class="partner partner--2oe">
      <img
        src="@/assets/logo/mpj.png"
        alt="">
    </div>
    <div class="partner partner--3oe">
      <img
        src="@/assets/logo/vkusterria.png"
        alt="">
    </div>
    <div class="partner partner--4oe">
      <img
        src="@/assets/logo/tallink.png"
        alt="">
    </div>
    <div class="partner partner--5oe">
      <img
        src="@/assets/logo/valio.png"
        alt="">
    </div>
    <div class="partner partner--6oe">
      <img
        src="@/assets/logo/redmond.png"
        alt="">
    </div>
    <div class="partner partner--7oe">
      <img
        src="@/assets/logo/sgardarika.png"
        alt="">
    </div>
    <div class="partner partner--8oe">
      <img
        src="@/assets/logo/polyandria.png"
        alt="">
    </div>
    <div class="partner partner--9oe">

    </div>
  </div>
</template>

<script>
export default {
  name: 'Partners',
  props: {
  },
  computed: {
    currentMode: {

      get() {
        return this.$store.getters.getCurrentMode;
      },
    },
  },
};
</script>

<style scoped lang="scss">
  @import '@/scss/_utils.scss';
  .partners {
    height: 218px;
    @include breakpoint($tablet) {
      height: 472px;
    }
    @include breakpoint($desktop) {
      height: 0;
    }
  }
    .partner {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      @include bg(100% auto, bottom);

      &--1oe {
        // mobile
          top: 80px;
          left: 10px;
          width: 76px;
          @include padding-hack(164.58%);
          background-image: url('../assets/partner-1oe.svg');
          img {
            position: absolute;
            bottom: 7.2%;
            margin: 0 3%;
            max-width: 73%;
          }
        // tablet
          @include breakpoint($tablet) {
            top: -5px;
            left: 14px;
            width: 143px;
            @include padding-hack(278.79%);
            img {
              bottom: 4.8%;
            }
          }
        // desktop
          @include breakpoint($desktop) {
            top: -6px;
            left: 17px;
            width: 161px;
            img {
              bottom: 5.2%;
            }
          }
        // large
          @include breakpoint($large) {
            top: -7px;
            left: 35px;
            width: 212px;
          }
      }
      &--2oe {
        // mobile
          top: -2px;
          left: 120px;
          width: 69px;
          @include padding-hack(171.057%);
          background-image: url('../assets/partner-2oe.svg');
          img {
            position: absolute;
            bottom: 26.486%;
            max-width: 49.155%;
          }
        // tablet
          @include breakpoint($tablet) {
            top: -5px;
            left: 75px;
            width: 142px;
          }
        // desktop
          @include breakpoint($desktop) {
            top: -10px;
            left: 82px;
            width: 160px;
          }
        // large
          @include breakpoint($large) {
            top: -6px;
            left: 124px;
            width: 210px;
          }
      }
      &--3oe {
        // mobile
          top: -82px;
          right: 6px;
          width: 67px;
          @include padding-hack(265.4%);
          background-image: url('../assets/partner-3oe.svg');
          img {
            position: absolute;
            bottom: 9.5%;
            margin: 0 3%;
            max-width: 73%;
          }
        // tablet
          @include breakpoint($tablet) {
            top: -10px;
            right: auto;
            left: 171px;
            width: 133px;
          }
        // desktop
          @include breakpoint($desktop) {
            top: -9px;
            right: auto;
            left: 195px;
            width: 150px;
            img {
              max-width: 78%;
              margin: 0;
            }
          }
        // large
          @include breakpoint($large) {
            top: -7px;
            right: auto;
            left: 271px;
            width: 197px;
          }
      }
      &--4oe {
        // mobile
          top: -57px;
          width: 76px;
          left: 70px;
          @include padding-hack(278.78%);
          background-image: url('../assets/partner-4oe.svg');
          img {
            position: absolute;
            bottom: 7.5%;
            margin: 0 3%;
            max-width: 73%;
          }
        // tablet
          @include breakpoint($tablet) {
            top: -81px;
            left: 334px;
            width: 153px;
          }
        // desktop
          @include breakpoint($desktop) {
            top: -236px;
            left: 317px;
            width: 170px;
            img {
              max-width: 80%;
            }
          }
        // large
          @include breakpoint($large) {
            top: -284px;
            left: 431px;
            width: 227px;
          }
      }
      &--5oe {
        // mobile
          top: -13px;
          right: 78px;
          width: 60px;
          @include padding-hack(160.09%);
          background-image: url('../assets/partner-5oe.svg');
          img {
            position: absolute;
            bottom: 11.5%;
            margin: 0 3%;
            max-width: 73%;
          }
        // tablet
          @include breakpoint($tablet) {
            top: -8px;
            right: 252px;
            width: 114px;
          }
        // desktop
          @include breakpoint($desktop) {
            top: -8px;
            right: 311px;
            width: 120px;
            img {
              bottom: 12.5%;
              margin: 0;
            }
          }
        // large
          @include breakpoint($large) {
            top: -5px;
            right: 386px;
            width: 159px;
            img {

            }
          }
      }
      &--6oe {
        // mobile
          top: -74px;
          left: 10px;
          width: 60px;
          @include padding-hack(259.06%);
          background-image: url('../assets/partner-6oe.svg');
          img {
            position: absolute;
            bottom: 16.9%;
            margin: 0 3%;
            max-width: 77%;
          }
        // tablet
          @include breakpoint($tablet) {
            top: -20px;
            left: auto;
            right: 163px;
            width: 132px;
          }
        // desktop
          @include breakpoint($desktop) {
            top: -42px;
            right: 194px;
            width: 150px;
            img {
              bottom: 17.5%;
              margin: 0;
              max-width: 85%;
            }
          }
        // large
          @include breakpoint($large) {
            top: -48px;
            right: 235px;
            width: 197px;
          }
      }
      &--7oe {
        // mobile
          top: 74px;
          right: 66px;
          width: 62px;
          @include padding-hack(157.72%);
          background-image: url('../assets/partner-7oe.svg');
          img {
            position: absolute;
            bottom: 9.9%;
            margin: 0 3%;
            max-width: 65%;
          }
        // tablet
          @include breakpoint($tablet) {
            top: -23px;
            right: 90px;
            width: 110px;
            @include padding-hack(183.44%);
            img {
              bottom: 8.9%;
              margin: 0;
            }
          }
        // desktop
          @include breakpoint($desktop) {
            top: -42px;
            right: 111px;
            width: 125px;
            img {
              bottom: 9%;
              margin: 0;
              max-width: 70%;
            }
          }
        // large
          @include breakpoint($large) {
            top: -49px;
            right: 126px;
            width: 164px;
            img {
              bottom: 8%;
            }
          }
      }
      &--8oe {
        // mobile
          top: 94px;
          right: 7px;
          width: 78px;
          @include padding-hack(153.85%);
          background-image: url('../assets/partner-8oe.svg');
          img {
            position: absolute;
            right: 15%;
            bottom: 7.9%;
            margin: 0 3%;
            max-width: 70%;
          }
        // tablet
          @include breakpoint($tablet) {
            top: -35px;
            right: 17px;
            width: 158px;
            @include padding-hack(245.68%);
            img {
              right: 13%;
              bottom: 5.9%;
            }
          }
        // desktop
          @include breakpoint($desktop) {
            top: -54px;
            right: 31px;
            width: 193px;
            img {
              right: 15%;
              bottom: 5.1%;
            }
          }
        // large
          @include breakpoint($large) {
            top: -69px;
            right: 17px;
            width: 253px;
          }
      }
      &--9oe {
        // mobile
        top: 37px;
        width: 56px;
        left: 140px;
        @include padding-hack(278.78%);
          background-image: url('../assets/partner-9oe-m.svg');

          // tablet
          @include breakpoint($tablet) {
            top: -115px;
            left: 250px;
            width: 118px;
          background-image: url('../assets/partner-9oe-t.svg');
            @include padding-hack(245.68%);
          }
        // desktop
          @include breakpoint($desktop) {
            top: -124px;
            left: 475px;
            width: 123px;
          background-image: url('../assets/partner-9oe-d.svg');
          }
        // large
          @include breakpoint($large) {
            top: -149px;
            left: 595px;
            width: 143px;
          }
      }
    }
</style>
