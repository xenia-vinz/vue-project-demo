<template>
  <div
    id="app"
    class="wrapper">

    <main
      :class="[currentClass, {'preloader': preloading}]"
      class="main">
      <div class="main__inner">

        <Snowf
          v-if="currentMode == 'greeting'"
          :amount="50"
          :size="5"
          :speed="1.5"
          :wind="0"
          :opacity="0.8"
          :swing="1"
          :resize="true"
          :image="null"
        />
        <Lights />
        <Partners />

        <Greeting />
        <Quiz />
        <Card />
        <Gifts />
        <Final />

        <Sharing />
      </div>
    </main>

    <Footer />

  </div>
</template>

<script>
import Snowf from 'vue-snowf';
import Lights from './components/Lights.vue';
import Partners from './components/Partners.vue';
import Greeting from './components/Greeting.vue';
import Quiz from './components/Quiz.vue';
import Card from './components/Card.vue';
import Gifts from './components/Gifts.vue';
import Final from './components/Final.vue';
import Sharing from './components/Sharing.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Snowf,
    Lights,
    Partners,
    Greeting,
    Footer,
    Quiz,
    Card,
    Gifts,
    Final,
    Sharing,
  },
  data() {
    return {
      preloading: false,
    };
  },
  computed: {
    currentMode: {
      get() {
        return this.$store.getters.getCurrentMode;
      },
    },
    currentClass() {
      return 'main--' + this.$store.getters.getCurrentMode;
    },
  },
  created() {
    const
      that = this;

    this.$root.$on('preload', () => {
      that.preloading = true;
    });
    this.$root.$on('preloadStop', () => {
      that.preloading = false;
    });

    this.$store.subscribe((mutation) => {
      switch (mutation.type) {
        case 'card/SAVE_DATA':
          this.preloading = true;
          break;
        case 'card/SET_DATA':
          this.preloading = false;
          break;
        case 'SET_MODE':
          this.preloading = false;
          break;
        default:
          // do nothing
          break;
      }
    });
  },
  mounted() {
    const
      _isCard = window.location.pathname.indexOf('cards/') > 0;
    let
      _card = false;

    if (_isCard) {
      _card = window.location.pathname.split('/').pop();
      this.$store.dispatch('setMode', {
        mode: 'card',
        guid: _card,
      });
      this.$store.dispatch('card/loadCard', {
        guid: _card,
      }, {
        root: true,
      });
      this.preloading = true;
    } else {
      this.$store.dispatch('setMode', {
        mode: 'greeting',
      });
    }
  },
};
</script>

<style lang="scss">
  @import '@/scss/_utils.scss';
  @import '@/scss/_base.scss';
  .main {
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;


    @include bg();
    background-image: url('assets/background.jpg');
    transition: all .2s linear;
    &--card {
      background-image: url('assets/background-card.jpg');
    }
    &--gifts {
      background-image: url('assets/background-gifts.jpg');
    }
    &--final {
      background-image: url('assets/background-ready.jpg');
    }

    @include breakpoint($desktop) {
      min-height: calc(100vh-150px);
    }
  }
</style>
