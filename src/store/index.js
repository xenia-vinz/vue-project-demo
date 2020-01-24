import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mode: null,
  },
  mutations: {
    SET_MODE(state, data) {
      Vue.set(state, 'mode', data);
    },
  },
  actions: {
    setMode: (state, data) => {
      const _params = new URLSearchParams(window.location.search);
      const _isCard = window.location.pathname.indexOf('cards/') > 0;
      let _url = '/';

      if (data.mode !== 'card' && _isCard) {
        _url += _params.toString();
        window.history.replaceState(null, null, _url);
      }
      if (data.mode === 'card' && data.guid) {
        if (_params.toString() !== '') {
          _url = `/cards/${data.guid}?${_params.toString()}`;
        } else {
          _url = `/cards/${data.guid}`;
        }
        window.history.replaceState(null, null, _url);
      }
      state.commit('SET_MODE', data.mode);
    },
  },
  getters: {
    getCurrentMode(state) {
      return state.mode;
    },
  },
  modules: {
    pages: {
      namespaced: true,
      state: {
        loaded: {},
        current: {},
      },
      mutations: {
        SET_LOADED_PAGE(state, data) {
          Vue.set(state.loaded, data.path, data);
        },
      },
      actions: {
        loadPage: (state, data) => {
          const _prefix = '/sample';
          const _path = '/page-' + data.page + '.json';
          let pageData = {};

          Vue.superagent.get(_prefix + _path).then((response) => {
            if (response.body) {
              pageData = response.body;
              pageData.path = data.page;
              state.commit('SET_LOADED_PAGE', pageData);
            }
          });
        },
      },
      getters: {
        getPage: state => (path) => {
          let _result = false;

          if (state.loaded[path]) {
            _result = state.loaded[path];
          }
          return _result;
        },
        getCurrentPage(state) {
          return state.current;
        },
      },
    },
    quiz: {
      namespaced: true,
      state: {
        questions: {},
        answers: {},
        current: null,
      },
      mutations: {
        SET_QUESTIONS(state, data) {
          if (!Vue.$_.isEmpty(data) && Vue.$_.has(data, '0')) {
            state.questions = data;
            Vue.set(state, 'current', 0);
          }
        },
        SET_CURRENT(state, index) {
          Vue.set(state, 'current', index);
        },
        SET_ANSWER(state, data) {
          Vue.set(state.answers, data.slug, data.answer);
        },
      },
      actions: {
        loadQuiz: (context) => {
          const _prefix = '/sample';
          const _path = '/quiz.json';

          Vue.superagent.get(_prefix + _path).then((response) => {
            const _response = response.body || {};

            if (_response.questions && _response.results) {
              context.commit('SET_QUESTIONS', _response.questions);
              context.dispatch('card/saveResults', _response.results, {
                root: true,
              });
            }
          });
        },
        previous: (context) => {
          const _index = context.state.current;

          if (_index > 0) {
            context.commit('SET_CURRENT', _index - 1);
          } else {
            context.dispatch('setMode', {
              mode: 'greeting',
            }, {
              root: true,
            });
          }
        },
        next: (context, data) => {
          const _questions = Vue.$_.keys(context.state.questions);
          const _answers = context.state.answers;
          const _nextIndex = context.state.current + 1;

          context.commit('SET_ANSWER', data);
          if (_nextIndex < _questions.length) {
            context.commit('SET_CURRENT', _nextIndex);
          } else {
            context.dispatch('card/saveAnswers', _answers, {
              root: true,
            });
          }
        },
      },
      getters: {
        getCurrent(state) {
          const _index = state.current;
          let _result = {};

          if (state.questions[_index]) {
            _result = state.questions[_index];
          }

          return _result;
        },
        getAnswer: state => (slug) => {
          let _result = null;

          if (state.answers[slug]) {
            _result = state.answers[slug];
          }
          return _result;
        },
      },
    },
    card: {
      namespaced: true,
      state: {
        data: null,
        source: null,
      },
      mutations: {
        SET_SOURCE(state, data) {
          Vue.set(state, 'source', data);
        },
        SET_DATA(state, data) {
          Vue.set(state, 'data', data);
        },
        SAVE_DATA(state, data) {
          Vue.set(state, 'data', data);
        },
      },
      actions: {
        saveAnswers: (context, data) => {
          context.commit('SAVE_DATA', data);
        },
        saveResults: (context, data) => {
          context.commit('SET_SOURCE', data);
        },
        loadCard: (context, data) => {
          const _prefix = '/sample';
          const _path = '/card-' + data.guid + '.json';

          Vue.superagent.get(_prefix + _path).then((response) => {
            if (response.body) {
              context.commit('SET_DATA', response.body);
            }
          });
        },
      },
      getters: {
        getData(state) {
          return state.data;
        },
        getContent(state) {
          const _data = state.data;
          const _source = state.source;
          const _result = {};

          Vue.$_.each(_data, (answer, slug) => {
            let _calculated;
            let _item;

            // check if there is result for out answer
            if (_source[slug]) {
              if (_source[slug].group && _source[slug].type) {
                _item = _source[slug];
              }
            }

            if (_item) {
              if (!_result[_item.group]) {
                _result[_item.group] = [];
              }

              if (_item.type === 'input') {
                _calculated = Vue.$_.template(_item.text)({
                  value: answer,
                });
              }

              if (_item.type === 'radio') {
                _calculated = _item.text[answer];
              }
              _result[_item.group].push(_calculated);
            }
          });

          return _result;
        },
      },
    },
    gifts: {
      namespaced: true,
      state: {
        data: null,
      },
      mutations: {
        SET_DATA(state, data) {
          Vue.set(state, 'data', data);
        },
      },
      actions: {
        loadGifts: (context) => {
          const _path = '/gifts.json';
          const _prefix = '/sample';

          Vue.superagent.get(_prefix + _path).then((response) => {
            if (response.body) {
              context.commit('SET_DATA', response.body);
            }
          });
        },
      },
      getters: {
        getData(state) {
          return state.data;
        },
      },
    },
  },
});
