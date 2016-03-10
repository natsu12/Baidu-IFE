/**
 * Created by Natsu.
 */
// ====================================================================

// 判断arr是否为一个数组，返回一个bool值
function isArray (arr) {
  /* Object.prototype.toString：取得对象的一个内部属性[[Class]]，然后依据这个属性，
   * 返回一个类似于"[object Array]"的字符串作为结果
   * 不直接调用而用call的原因：虽然Array继承自Object，也会有toString方法，但是这个方法有可能会被改写，
   * Object.prototype能一定程度保证其“纯洁性”
   */
  return Object.prototype.toString.call(arr) === '[Object Array]';
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction (fn) {
  return (typeof fn === 'function');
}
/* 或者以下实现方式：
function isFunction (fn) {
  return Object.prototype.toString.call(arr) === '[Object Function]';
}
*/

// ====================================================================

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject (src) {
  // 对于基本数据类型，只要直接返回即可
  if (src == null || typeof src != 'object') {  
    return src;
  }

  // 对于对象分为以下三种情况

  // 对于Date,String,Boolean等引用类型的数据，需要考虑调用构造函数重新构造，直接赋值依然会有引用问题（不是真正的clone引用变量）
  // 以Date为例
  if (src instanceof Date) {
    var clone = new Date(src.getDate());
    return clone;
  }

  // 对于数组，需要遍历，这样可以保证在在Array对象上扩展的属性也可以正确复制
  if (isArray(src)) {
    var clone = [];
    for (var i = 0; i < src.length; i++) {
      clone[i] = src[i];
    }
    return clone;
  }

  // 对于其他object，同样也需要遍历
  if (src instanceof Object) {
    var clone = {};
    for (var key in src) {
      if (src.hasOwnProperty(key)) {  // 忽略掉继承属性，只取属于它本身的属性
        clone[key] = cloneObject(src[key]);
      }
    }
    return clone;
  }
}

/* 测试用例：
var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a);
console.log(abObj.b.b1[0]);

console.log(tarObj.a);      // 1
console.log(tarObj.b.b1[0]);    // "hello"
*/

// ====================================================================

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
// 普通实现
function simpleUniqArray(arr) {
  if (arr.length < 2) return arr;
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i] == arr[j]) {
        arr.splice(j, 1);   // 数组的splice方法：删除数组中的某一个元素
      }
    }
  }
  return arr;
}

// 利用对象的keys方法进行筛选：把元素作为属性添加到对象中，重复的话自然不会有影响（类似桶排思想）
function uniqArray(arr) {
    var obj = {};
    for (var i = 0, len = arr.length; i < len; i++) {
        obj[arr[i]] = true;
    }
    return Object.keys(obj);
}

/* 使用示例
var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
console.log(b); // [1, 3, 5, 7]
*/

// ====================================================================

// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
  // 关键在于找到字符串中间非空的部分的下标值
  var head = 0, tail = str.length - 1;
  while(str[head] == ' ') head++;
  while(str[tail] == ' ') tail--;
  return str.substring(head, tail + 1);  // substring方法不包括tail下标
}

function trim(str) {
  // 对字符串的正则表达式处理通常用到replace方法
  // str.replace(re, newSub)：将字符串被re匹配到的部分，用newSub来代替。
  return str.replace(/^\s+|\s+$/g, '');
}

/* 使用示例
var str = '   hi!  ';
str = trim(str);
console.log(str); // 'hi!'
*/

// ====================================================================

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
  for (var i = 0; i < arr.length; i++)
    fn(arr[i], i);
}

/* 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item) {
    console.log(item)
}
each(arr, output);  // java, c, php, html

var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    console.log(index + ': ' + item)
}
each(arr, output);  // 0:java, 1:c, 2:php, 3:html
*/

// ====================================================================

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
  return Object.keys(obj).length;
}

/* 使用示例
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); // 3
*/

// ====================================================================

// 正则表达式
// 判断是否为邮箱地址
function isEmail(emailStr) {
  return emailStr.search(/^[a-z0-9]([-_\.]?[a-z0-9]+)*@([-_]?[a-z0-9]+)+[\.][a-z]{2,7}([\.][a-z]{2})?$/i) !== -1;
}

// 判断是否为手机号
function isMobilePhone(phone) {
  phone = phone + '';
  return phone.search(/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/) !== -1;
}

// ====================================================================

// 判断元素是否有某类名
function haveClass(element, className) {
  var name = element.className.match(/\S+/g) || [];
  // match方法：将字符串中匹配正则表达式的部分存放到数组中，\S+表示一个或多个非空字符（也就是被空格分开的若干单词）
  if (name.indexOf(className) != -1) {
    return true;
  } else {
    return false;
  }
}

// 为element增加一个样式名为newClassName的新类名
function addClass(element, newClassName) {
  if (haveClass(element, newClassName)) return;
  if (element.className == "") {
    element.className = newClassName;
  } else {
    element.className += " " + newClassName;
  }
  // 或者直接用trim方法（去掉首尾空格）
  // element.className = trim(element.className + ' ' + newClassName);
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
  if (haveClass(element, oldClassName)) {
    element.className = trim(element.className.replace(oldClassName, ''));
    // replace方法的第一个参数也可以是子字符串
  }
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
  return (element.parentNode == siblingNode.parentNode);
}

// ====================================================================

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
  var x = 0;
  var y = 0;
  var currentElement = element; // 从目标元素开始往上遍历

  while (currentElement !== null) {
    x += currentElement.offsetLeft;
    y += currentElement.offsetTop;
    currentElement = currentElement.offsetParent;
  }

  // 为了兼容，documentElement、body这两个值总会有一个恒为0
  var scrollLeft = document.documentElement.scrollLeft + document.body.scrollLeft;
  var scrollTop = document.documentElement.scrollTop + document.body.scrollTop;

  x -= scrollLeft;
  y -= scrollTop;

  return {
    x: x,
    y: y
  };
}

// ====================================================================

// 实现一个简单的Query
function $(selector) {
  // 思路是取出第一个字符，然后分情况去获取不同的元素
  var element = null;
  var prefix = selector.charAt(0);
  switch(prefix) {
    case '#':
      element = document.getElementById(selector.substring(1));
      break;
    case '.':
      element = document.getElementsByClassName(selector.substring(1));
      break;
    default:
      element = document.getElementsByTagName(selector);
  }
  return element;
}

// console.log($("#adom"));
// console.log($("div"));
// console.log($(".classa"));


// // ====================================================================

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
  element.addEventListener(event, listener);
}

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
  element.removeEventListener(event, listener);
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
  addEvent(element, "click", listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
  // 键盘事件一般来说element是window
  addEvent(element, "keydown", function (e) {
    var event = e || window.event; // window.event是IE写法
    if (event.keyCode == 13) {
      // 这里要注意调用listener函数要将this绑定到element上，因为listener里的this是element，参数是event
      listener.call(element, event);
    }
  })
}

/* 使用示例
addClickEvent($(".classa")[0], function () {
  console.log(this);  // 元素".classa"
});

addEnterEvent(window, function () {
});
*/

// 接下来我们把上面几个函数和$做一下结合，把他们变成$对象的一些方法
$.on = addEvent;
$.un = removeEvent;
$.click = addClickEvent;
$.enter = addEnterEvent;

// 事件代理
// 实现对element中所有标签为tag的子元素绑定事件（优点：把listener绑定在父元素上，减少DOM访问次数和listener数量）
// 原理：事件冒泡
function delegateEvent(element, tag, eventName, listener) {
  $.on(element, eventName, function (e) {
    var event = e || window.event;
    var target = event.target || event.srcElement;
    if (target && target.tagName == tag.toUpperCase()) {  // element.tagName得到元素标签名（大写）
      listener.call(target, event);
    }
  });
}
$.delegate = delegateEvent;

/* 使用示例
function clickListener(event) {
    console.log(event);
}

$.delegate($("#list"), "li", "click", clickListener);
*/

