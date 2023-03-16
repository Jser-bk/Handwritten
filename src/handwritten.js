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

// 深拷贝
export const deepClone = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    // 如果不是复杂数据类型，直接返回
    return obj;
  }

  let copy = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepClone(obj[key]);
    }
  }

  return copy;
};

// instanceof
export const myInstanceOf = (leftValue, rightValue) => {
  let rightPrototype = rightValue.prototype;
  // 判断右值是否是一个函数
  while (true) {
    if (leftValue === null) return false;
    if (rightPrototype === leftValue.prototype) return true;
    leftValue = leftValue.__proto__;
  }
};

// new操作符
export const myNew = () => {
  // 获取构造函数和参数
  const Constructor = Array.prototype.shift.call(arguments);
  const args = arguments;
  // 创建一个新的对象，并将其原型指向构造函数的原型
  const obj = Object.create(Constructor.prototype);
  // 将构造函数的this指向新创建的对象，并执行构造函数
  const result = Constructor.apply(obj, args);
  // 如果构造函数返回一个对象，则返回该对象；否则返回新创建的对象
  if (result && (typeof result === 'object' || typeof result === 'function')) {
    return result;
  }
  return obj;
};

// call
export const myCall = (context, ...args) => {
  context = context || window;
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};

// apply
export const myApply = (thisArg, argsArray) => {
  thisArg = thisArg || window;
  let fn = Symbol('fn');
  thisArg[fn] = this;
  let result = thisArg[fn](...argsArray);
  delete thisArg[fn];
  return result;
};

// bind
export const myBind = (thisArg) => {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);
  return function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(thisArg, args.concat(bindArgs));
  };
};

// Object.create()
export const create = (obj) => {
  function F() {}
  F.prototype = obj;
  return new F();
};

// JSON.parse()
export const parseJSON = (jsonStr) => {
  jsonStr = jsonStr.trim();
  if (jsonStr === '') {
    return null;
  }
  // 对象处理
  if (jsonStr[0] === '{') {
    let obj = {};
    jsonStr = jsonStr.slice(1, -1);
    const regex = /"(.+?)":\s*(.+?)(?=,|}|$)/gs;
    let match;
    while ((match = regex.exec(jsonStr)) !== null) {
      let key = match[1];
      let value = match[2];
      obj[key] = parseJSON(value);
    }
    return obj;
  }
  // 数组处理
  if (jsonStr[0] === '[') {
    let arr = [];
    jsonStr = jsonStr.slice(1, -1);
    const regex = /(?<=^|,)\s*(.+?)(?=,|]|$)/gs;
    let match;
    while ((match = regex.exec(jsonStr)) !== null) {
      let value = match[1];
      arr.push(parseJSON(value));
    }
    return arr;
  }
  // 数字处理
  if (/^-?(?:0|[1-9]\d*)(?:.\d+)?(?:[eE][+-]?\d+)?$/.test(jsonStr)) {
    return parseFloat(jsonStr);
  }
  // Boolean类型处理
  if (jsonStr === 'true') {
    return true;
  }
  if (jsonStr === 'false') {
    return false;
  }
  // null处理
  if (jsonStr === 'null') {
    return null;
  }
  // 字符串处理
  if (/^".*"$/.test(jsonStr) || /^'.*'$/.test(jsonStr)) {
    return jsonStr.slice(1, -1).replace(/\(.)/g, '$1');
  }
  throw new SyntaxError('Invalid JSON string');
};

// JSON.stringify()
export const myStringify = (obj, pretty) => {
  const result = [];

  // 遍历对象的属性
  for (let key in obj) {
    // 判断属性值是否是函数类型或undefined类型
    if (typeof obj[key] === 'function' || typeof obj[key] === 'undefined') {
      continue;
    }

    // 将属性名和对应的值添加到数组中
    const value = obj[key];

    if (typeof value === 'string') {
      result.push(`"${key}":"${value}"`);
    } else if (typeof value === 'number' || typeof value === 'boolean' || value === null) {
      result.push(`"${key}":${value}`);
    }

    // 如果属性值是一个对象，则递归调用stringify方法
    else if (typeof value === 'object') {
      const nested = stringify(value, pretty);
      result.push(`"${key}":${nested}`);
    }
  }

  // 根据pretty选项控制输出结果的格式
  if (pretty) {
    return `{\n${result.join(',\n')}\n}`;
  } else {
    return `{${result.join(',')}}`;
  }
};

// Promise.all()
export const promiseAll = async (promises) => {
  const results = [];

  for (const promise of promises) {
    try {
      const result = await Promise.resolve(promise);
      results.push(result);
    } catch (reason) {
      throw reason;
    }
  }

  return results;
};

// toTree1
export const arrayToTreeRec = (nodes, parentId = null) => {
  return nodes
    .filter((node) => node.parentId === parentId)
    .map((node) => ({ ...node, children: arrayToTreeRec(nodes, node.id) }));
};

// toTree2
export const arrayToTreeLoop = (nodes) => {
  const map = {};
  const tree = [];

  for (const node of nodes) {
    map[node.id] = { ...node, children: [] };
  }

  for (const node of Object.values(map)) {
    if (node.parentId === null) {
      tree.push(node);
    } else {
      map[node.parentId].children.push(node);
    }
  }

  return tree;
};

// toTree3
export const arrayToTreeReduce = (nodes) => {
  const map = {};
  const tree = nodes.reduce((acc, node) => {
    map[node.id] = { ...node, children: [] };

    if (node.parentId === null) {
      acc.push(map[node.id]);
    } else {
      map[node.parentId].children.push(map[node.id]);
    }

    return acc;
  }, []);

  return tree;
};

// toTree4
export const arrayToTreeMap = (nodes) => {
  const map = new Map(nodes.map((node) => [node.id, { ...node, children: [] }]));
  const tree = [];

  for (const node of map.values()) {
    if (node.parentId === null) {
      tree.push(node);
    } else {
      map.get(node.parentId).children.push(node);
    }
  }

  return tree;
};

// toTree5
export const arrayToTreeDFS = (nodes) => {
  const map = new Map(nodes.map((node) => [node.id, { ...node, children: [] }]));
  const tree = [];
  for (const node of map.values()) {
    if (node.parentId === null) {
      dfs(node, tree);
    }
  }
  function dfs(node, parent) {
    if (parent) {
      parent.children.push(node);
    }
    for (const child of node.children) {
      dfs(map.get(child.id), node);
    }
  }
  return tree;
};

// map
export const map = (arr, callback) => {
  const result = []; // 创建一个空数组
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i], i, arr)); // 调用回调函数，将结果添加到新数组中
  }
  return result; // 返回新数组
};
