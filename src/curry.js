// function curry(f) {
//   return function (a) {
//     return function (b) {
//       return f(a,  b);
//     }
//   }
// }
//
// function sum(a, b) {
//   return a + b;
// }
//
// let curriedSum = curry(sum)
//
// console.log(curriedSum(1)(2))
//

function newCurry(func) {
  return function curried(...args) {
    console.log('args', args)
    console.log('func.length', func.length)
    // args [ 1, 2, 3 ]
    // func.length 3
    // 6
    // args [ 1 ]
    // func.length 3
    // args [ 1, 2, 3 ]
    // func.length 3
    // 6
    // args [ 1 ]
    // func.length 3
    // args [ 1, 2 ]
    // func.length 3
    // args [ 1, 2, 3 ]
    // func.length 3
    // 6

    // func 是要转换的函数
    if (args.length >= func.length) { // (1)
      // 如果传入的 args 长度与原始函数所定义的（func.length）相同或者更长，那么只需要将调用传递给它即可。
      // curriedNewSum 后边每次调用的传参长度 与 newSum 接收几个参数 相比较, 大于或等于 就直接执行
      return func.apply(this, args);
    } else {
      // 获取一个偏函数：否则，func 还没有被调用。取而代之的是，
      // 返回另一个包装器 pass，它将重新应用 curried，将之前传
      // 入的参数与新的参数一起传入。然后，在一个新的调用中，再次，
      // 我们将获得一个新的偏函数（如果参数不足的话），或者最终的结果。

      // 人话就是,递归调用 curriedNewSum 后边的函数,将参数拼接下, 等拼接长度足够了,会进入上边的if
      // 紧接着执行
      return function (...args2) { // (2)
        return curried.apply(this, args.concat(args2));
      }
    }
  };
}

// 例如，让我们看看 newSum(a, b, c) 这个例子。它有三个参数，所以 sum.length = 3
function newSum(a, b, c) {
  return a + b + c;
}

let curriedNewSum = newCurry(newSum);
// 对于调用 curried(1)(2)(3)：
// 第一个调用 curried(1) 将 1 保存在词法环境中，然后返回一个包装器 pass。
// 包装器 pass 被调用，参数为 (2)：它会获取之前的参数 (1)，将它与得到的 (2) 连在一起，
// 并一起调用 curried(1, 2)。由于参数数量仍小于 3，curry 函数依然会返回 pass。
// 包装器 pass 再次被调用，参数为 (3)，在接下来的调用中，pass(3) 会获取之前的参
// 数 (1, 2) 并将 3 与之合并，执行调用 curried(1, 2, 3) — 最终有 3 个参数，它们被传入最原始的函数中。
console.log(curriedNewSum(1, 2, 3))
console.log(curriedNewSum(1)(2, 3))
console.log(curriedNewSum(1)(2)(3))

//只允许确定参数长度的函数
//
// 柯里化要求函数具有固定数量的参数。
//
// 使用 rest 参数的函数，例如 f(...args)，不能以这种方式进行柯里化。

//比柯里化多一点
//
// 根据定义，柯里化应该将 sum(a, b, c) 转换为 sum(a)(b)(c)。
//
// 但是，如前所述，JavaScript 中大多数的柯里化实现都是高级版的：它们使得函数可以被多参数变体调用。

// 柯里化 是一种转换，将 f(a,b,c) 转换为可以被以 f(a)(b)(c) 的形式进行调用。
// JavaScript 实现通常都保持该函数可以被正常调用，并且如果参数数量不足，则返回偏函数。
