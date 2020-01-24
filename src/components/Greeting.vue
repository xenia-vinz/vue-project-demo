<template>
  <div
    :class="{'visible': currentMode === 'greeting'}"
    class="greeting"
  >
    <div class="greeting__inner">
      <div
        v-if="content.title"
        class="greeting-title"
        v-html="content.title"
      />
      <div
        v-if="content.text"
        class="greeting__content"
        v-html="content.text"
      />
      <div class="greeting__actions">
        <button
          v-if="content.buttonText"
          class="greeting-btn"
          @click="startQuiz"
          v-html="content.buttonText"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Greeting',
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
    content: {
      get() {
        return this.$store.getters['pages/getPage']('greeting');
      },
    },
  },
  mounted() {
    this.$store.dispatch('pages/loadPage', {
      page: 'greeting',
    });
  },
  methods: {
    startQuiz() {
      window.scrollTo(0, 0);
      this.$store.dispatch('setMode', {
        mode: 'quiz',
      });
    },
  },
};
</script>

<style scoped lang="scss">
  @import '@/scss/_utils.scss';
  .greeting {
    position: absolute;
    max-width: 600px;
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
      padding: 0 15px;

      @include breakpoint($tablet) {
        padding: 0;
      }
      @include breakpoint($desktop) {
        padding: 8.1vh 0 0;
      }
      @include breakpoint($desktop) {
        padding: 10.32vh 0 0;
      }
    }
    &__content {
      padding: 0 5px;
      text-align: center;
      font-size: 13px;
      line-height: 20px;

      @include breakpoint($tablet) {
        padding: 0;
        font-size: 18px;
        line-height: 26px;
      }
    }
    &__actions {
      padding: 16px 0 53px;
      text-align: center;

      @include breakpoint($tablet) {
        padding: 37px 0 155px;
      }
      @include breakpoint($desktop) {
        padding: 37px 0;
      }
    }
  }
    .greeting-title {
      font-family: $font_lifehack;
      color: $c_red;
      text-align: center;
      font-size: 25px;
      line-height: 32px;
      margin: 0 0 5px;

      @include breakpoint($tablet) {
        margin: 0 0 11px;
        font-size: 70px;
        line-height: 85px;
      }
    }
    .greeting-btn {
      @include btn();
      min-width: 290px;
      max-width: 100%;
      padding: 17px 0;

      @include breakpoint($tablet) {
        min-width: 320px;
        padding: 16px 0;
      }
    }
</style>
