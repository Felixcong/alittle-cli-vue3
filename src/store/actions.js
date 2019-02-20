/**
 * demo示例 开发时请删除以下demo
 * */
import api from '../api';

export const showModal = ({ commit }, { modaldata, type }) => {
  commit('showModal', { modaldata, type });
  commit('toggleModal');
};
