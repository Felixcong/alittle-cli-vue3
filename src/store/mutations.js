/**
 * demo示例 开发时请删除以下demo
 * */
const state = {
  show: false,
  myIndexes: []
};
const mutations = {
  toggleModal(state) {
    state.show = state.show ? false : true;
  },
  setMyIndexes(state, myIndexes) {
    state.myIndexes = myIndexes;
    if (state.myIndexesClone.length === 0) {
      state.myIndexesClone = Object.assign([], myIndexes);
    }
  }
};
export default {
  state,
  mutations
};
