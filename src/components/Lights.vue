<template>
  <div
    class="lights"
  >
    <div
      :class="{'active' : phase == 1}"
      class="lights-phase"
    >
      <img
        class="lights-phase__background"
        src="@/assets/lights-phase-1.svg"
        alt=""
      >
    </div>
    <div
      :class="{'active' : phase == 2}"
      class="lights-phase"
    >
      <img
        class="lights-phase__background"
        src="@/assets/lights-phase-2.svg"
        alt=""
      >
    </div>
    <div
      :class="{'active' : phase == 3}"
      class="lights-phase"
    >
      <img
        class="lights-phase__background"
        src="@/assets/lights-phase-3.svg"
        alt=""
      >
    </div>
    <div
      :class="{'active' : phase == 4}"
      class="lights-phase"
    >
      <img
        class="lights-phase__background"
        src="@/assets/lights-phase-4.svg"
        alt=""
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'Lights',
  props: {
  },
  data() {
    return {
      phase: 1,
    };
  },
  computed: {
    total() {
      const
        _lights = this.$el.querySelectorAll('.lights-phase');

      return _lights.length;
    },
  },
  mounted() {
    const
      that = this;
    let
      _iterator = this.phase;

    setInterval(() => {
      if (_iterator < that.total) {
        _iterator += 1;
      } else {
        _iterator = 1;
      }

      that.phase = _iterator;
    }, 800);
  },
  methods: {
  },
};
</script>

<style scoped lang="scss">
  @import '@/scss/_utils.scss';
  .lights {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
  }
    .lights-phase {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      opacity: 0;
      transition: opacity .7s linear;
      &.active {
        opacity: 1;
      }
      .active + & {
        opacity: 0.5;
      }
      &__background {
        width: 100%;
        height: 100%;
      }
    }
</style>
