// 防抖
export const debounce = (fn, delay) => {
  let timer;
  return function () {
    let context = this; // 保存 this
    let args = arguments; // 保存参数
    clearTimeout(timer); // 清除上次定时器
    timer = setTimeout(function () {
      // 新建一个定时器
      fn.apply(context, args); // 执行函数
    }, delay);
  };
};

// 节流
export const throttle = (fn, interval) => {
  let timer;
  return function () {
    let context = this; // 保存 this
    let args = arguments; // 保存参数
    if (!timer) {
      // 如果定时器不存在
      timer = setTimeout(function () {
        // 新建一个定时器
        fn.apply(context, args); // 执行函数
        timer = null; // 清空定时器
      }, interval);
    }
  };
};
