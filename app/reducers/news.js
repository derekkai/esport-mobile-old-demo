import produce from 'immer';

const prefix = 'news';
export const REQUEST_NEWS_DATA = `${prefix}/REQUEST_NEWS_DATA`;
const SET_NEWS_DATA = `${prefix}/SET_NEWS_DATA`;

/**
 * Request News data.
 */
export const requestNewsData = () => ({
  type: REQUEST_NEWS_DATA,
});

/**
 * Set news data.
 * @param {array} payload news data.
 */
export const setNewsData = payload => ({
  type: SET_NEWS_DATA,
  payload,
});

const initalState = {
  entity: [],
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initalState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_NEWS_DATA: {
        draft.entity = action.payload;
      }
    }
  });
