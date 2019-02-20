/**
 * demo示例 开发时请删除以下demo
 * */
export const alertmodal = state => state.alertmodal;

export const isExistInMyIndexes = state => name => {
  return state.myIndexes.find(item => item.display_name == name);
};
