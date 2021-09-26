<!doctype html>
<html>
  <head>
    <title> debug </title>
    <meta charset="utf-8">
  </head>
  <body>
      <button>asdfasdfasdf</button>
      <p></p>
      <a>요소 1</a>
  </body>


<script>
// http://stackoverflow.com/questions/4787698/failure-to-override-elements-addeventlistener-in-firefox
(function() {
    Error.stackTraceLimit = Infinity;
    /* stack frame이란 현재 쌓여 있는 스택 영역  */
    // stack trace 무제한 설정

    
    var _interfaces = Object.getOwnPropertyNames(window).filter(function(i) {
      return /^HTML/.test(i);
    }).map(function(i) {
      return window[i];
    });

    // var _interfaces = [ HTMLDivElement, HTMLImageElement, HTMLUListElement, HTMLElement, HTMLDocument ];
    for (var i = 0; i < _interfaces.length; i++) {
      (function(original) {
        _interfaces[i].prototype.addEventListener = function(type, listener, useCapture) {
          console.log('addEventListener ' + type, listener, useCapture);
          console.trace();
          console.log('--------');
          /* _interfaces의 각 인덱스들을 순서대로(+1) 나타내고, -----로 구분함. */

          return original.apply(this, arguments);
        }
      })(_interfaces[i].prototype.addEventListener);
    }
})();

// window 화면 상에 나타나는 요소(배열)들의 property들을 나열하고, stackframe을 나타내고 구분하는? 
// TODO:  즉시 실행문. but 결과값이 undefined 값이 왜??
// TODO: addEventListener 가 어떻게 사용되고 있는 것인지? 

</script>
