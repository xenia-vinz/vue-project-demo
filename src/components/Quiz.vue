<template>
  <div
    :class="[{'visible': currentMode === 'quiz'}, currentClass]"
    class="quiz"
  >
    <div
      class="quiz__inner">
      <div
        class="quiz-goback"
        @click="goToPrevious"
      >
        Назад
      </div>
      <div class="quiz-question">
        <img
          class="quiz-question__background"
          src="@/assets/quiz.svg"
          alt=""
        >
        <div class="quiz-question__inner">
          <img
            class="quiz-question__background"
            src="@/assets/quiz-border.svg"
            alt=""
          >
          <div class="quiz-question-intro">
            {{ question.intro }}
          </div>
          <div class="quiz-question-title">
            {{ question.title }}
          </div>
          <div class="quiz-question-inputs">
            <input
              v-if="question.type === 'input'"
              v-model="answer"
              class="quiz-question-input quiz-question-input--text"
              type="text"
            >
            <div
              v-if="question.type === 'radio'"
              class="quiz-question-input quiz-question-input--radio input-radio--wrap"
            >
              <label
                v-for="input in question.answers"
                :key="input.value"
                class="input-radio"
              >
                <input
                  v-model="answer"
                  class="input-radio__input"
                  :value="input.value"
                  :name="question.slug"
                  type="radio"
                >
                <span class="input-radio__label">
                  {{ input.label }}
                </span>
              </label>
            </div>
          </div>
          <div class="quiz-question-actions">
            <button
              class="quiz-question-btn"
              :disabled="!answer"
              @click="goToNext"
            >
              {{ question.button }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Quiz',
  props: {
  },
  data() {
    return {
      answer: null,
    };
  },
  computed: {
    currentMode: {
      get() {
        return this.$store.getters.getCurrentMode;
      },
    },
    currentClass() {
      let
        _class = '';

      if (this.$_.has(this.question, 'group')) {
        _class = 'quiz--' + this.question.group;
      }
      return _class;
    },
    question: {
      get() {
        return this.$store.getters['quiz/getCurrent'];
      },
    },
    savedAnswer: {
      get() {
        const _currentSlug = this.question.slug;

        return this.$store.getters['quiz/getAnswer'](_currentSlug);
      },
    },
  },
  mounted() {
    this.$store.dispatch('quiz/loadQuiz');
  },
  methods: {
    goToPrevious() {
      this.$store.dispatch('quiz/previous');
      this.answer = this.savedAnswer;
    },
    goToNext() {
      const _answer = this.answer;
      const _slug = this.question.slug;
      window.scrollTo(0, 0);
      this.$store.dispatch('quiz/next', {
        slug: _slug,
        answer: _answer,
      });
      this.answer = this.savedAnswer;
    },
  },
};
</script>

<style scoped lang="scss">
  @import '@/scss/_utils.scss';

  .quiz {
    position: absolute;
    top: 0;

    margin: 0 15px;
    padding: 70px 0 117px;

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
    @include breakpoint($tablet) {
      margin: 0 39px;
      padding: 104px 0 154px;
    }
    @include breakpoint($desktop) {
      max-width: 603px;
      padding: 8vh 0;
    }
  }
    .quiz-goback {
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
        top: 30px;
        left: -30px;
      }
      @include breakpoint($desktop) {
        position: fixed;
        top: 30px;
        left: 114px;
      }
      @include breakpoint($large) {
        position: absolute;
        top: 4vh;
        left: 0;
      }
    }
    .quiz-question {
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
        position: relative;
        padding: 18px;
        @include breakpoint($tablet) {
          padding: 0 80px;
        }
      }
    }
      .quiz-question-intro {
        position: relative;
        margin: 0 0 28px;
        padding: 60px 0 0;

        color: $c_sand_dark;
        text-align: center;

        font-size: 14px;
        line-height: 20px;

        @include breakpoint($tablet) {
          padding: 67px 0 0;
          margin: 0 0 45px;

          font-size: 18px;
          line-height: 23px;
        }
        @include breakpoint($desktop) {
          padding: 65px 0 0;

          font-size: 16px;
          line-height: 144%;
        }
      }
      .quiz-question-title {
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
      .quiz-question-inputs {
        position: relative;
        margin: 0 0 20px;
      }
        .quiz-question-input {
          &--text {
            width: 100%;
          }
          &--radio {
            padding: 0 0 15px;
            font-size: 14px;
            line-height: 20px;
            @include breakpoint($tablet) {
              font-size: 18px;
              line-height: 24px;
            }
          }
        }
      .quiz-question-actions {
        position: relative;
        padding: 0 0 60px;
        text-align: center;

        @include breakpoint($tablet) {
          padding: 0 0 67px;
        }
        @include breakpoint($desktop) {
          padding: 0 0 65px;
        }
      }
        .quiz-question-btn {
          @include btn();
        }
</style>
