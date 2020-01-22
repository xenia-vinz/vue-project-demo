<template>
  <div
    :class="[{'visible': currentMode === 'final'}]"
    class="final"
  >
    <div class="final__inner">

      <div class="final-title">
        С наступающим вас праздником!
      </div>
      <div class="final-text">
        <p>Благодарим вас за выбор! Подарок будет отправлен на твою почту!</p>
        <p>Хочешь поздравить так же коллег и друзей? Поделись с ними нашими пожеланиями и отправь от нас подарок.</p>
      </div>
      <div class="final-actions">
        <button
          @click="showSharePopup"
          class="final-btn"
        >
          Поделиться открыткой
        </button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Final',
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
  },
  mounted() {
  },
  methods: {
    showSharePopup() {
      this.$modal.show('sharing');
    },
  },
};
</script>

<style scoped lang="scss">
  @import '@/scss/_utils.scss';
  .final {
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
      min-height: 70vh;
    }
    &__inner {
      padding: 60px 15px;
    }
  }
    .final-title {
      font-family: $font_lifehack;
      color: $c_red;
      text-align: center;
      font-size: 30px;
      line-height: 30px;
      margin: 0 0 45px;
    }
    .final-actions {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 60px 0;

    }
      .final-btn {
        @include btn();
      }
</style>
