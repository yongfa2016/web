window.onload = function() {
    var view = document.querySelector('.view');
    var ul = document.querySelector('ul');
    var ol = document.querySelector('ol');
    var firstChild = document.querySelector('.view li:first-Child');
    var lastChild = document.querySelector('.view li:last-Child');
    var startX, endX, width, size, timer, lis, flag = false,
        index = 0;


    function init() {
        ul.insertBefore(lastChild.cloneNode(true), ul.firstChild);
        ul.appendChild(firstChild.cloneNode(true));
        lis = document.querySelectorAll('.view li');
        size = lis.length;
        setWidth();
        index--;
        ul.style.left = index * width + 'px';
        autoScroll();
    }

    // 并获取元素的个数


    // 设置相应元素的宽度，ul 和 li
    function setWidth() {
        width = view.clientWidth;
        ul.style.width = width * size + "px";
        for (var i = 0; i < lis.length; i++) {
            lis[i].style.width = width + "px";
        }
    }
    // li的宽度 = 窗口宽度

    // ul = li宽度 * li数量
    // 封装成了一个函数（窗口发生变化时，实时设置）
    window.addEventListener('resize', function() {
        setWidth();
        ul.style.left = width * index + "px";
    })

    // 监听窗口变化，调用上一步封装方法
    // ul位置也再次调整

    // 绑订触屏事件，检测手势方向
    view.addEventListener('touchstart', function(ev) {
        touches = ev.targetTouches[0];
        startX = touches.clientX;
        clearInterval(timer);
        // console.log(startX);
    })
    view.addEventListener('touchend', function(ev) {
        if (flag) return;
        flag = true;
        touches = ev.changedTouches[0];
        endX = touches.clientX;
        ul.style.transition = 'all 0.5s ';

        if (startX < endX) {
            index++;
            ul.style.left = index * width + "px";
        } else {
            index--;
            ul.style.left = index * width + "px";
        }
        autoScroll();

    })

    // 更改ul的位置，并设置一个过渡效果

    // 监听过渡完成 webkitTransitionEnd
    ul.addEventListener('webkitTransitionEnd', function() {
            flag = false;
            ul.style.transition = '';
            if (index == 1 - size) {
                index = -1;
            }
            if (index == 0) {
                index = 2 - size;
            }

            ul.style.left = index * width + "px";
        })
        // 边界值的判断，重置ul位置

    // 清空过渡效果

    // 开启自动滚动，定时器完成，并封装一个函数
    function autoScroll() {
        timer = setInterval(function() {
            ul.style.transition = 'all 0.5s ';
            index--;
            ul.style.left = index * width + "px";
        }, 3000);
    }
    // 在定时器里去设置ul位置
    // 过渡效再次打开

    // 清除定时器（touchstart），并再次开启自动滚动（touchend）

    // 设置节流阀，避免快速滚动bug
    init();


    var scrollTop;
    var search = document.querySelector('.search');
    window.addEventListener('scroll', function() {
        scrollTop = window.scrollY;
        // console.log(scrollTop);
        var opacity = '';
        if (scrollTop <= 600) {
            opacity = scrollTop / 600;
            search.style.background = 'rgba(201,21,35,' + opacity + ')';
        }
    })

    function timecout() {
        var Day = document.getElementById('day');
        var Left = document.querySelector('span:nth-Child(2)');
        var Middle = document.querySelector('span:nth-child(4)');
        var Right = document.querySelector('span:nth-child(6)');
        var time = new Date();
        var endTime = new Date('2017/7/28 21:55:00');
        var t = time.getTime();
        var nt = endTime.getTime();
        var st = (nt - t) / 1000;
        var d = Math.floor(st / 60 / 60 / 24);
        var h = Math.floor(st / 3600);
        var m = Math.floor((st % 3600) / 60);
        var s = Math.floor(st % 60);
        h = h < 10 ? '0' + h : h;
        s = s < 10 ? '0' + s : s;
        m = m < 10 ? '0' + m : m;
        // Day.innerHTML = d + '天-';
        Left.innerHTML = h;
        Middle.innerHTML = m;
        Right.innerHTML = s;



        setTimeout(timecout, 1000);

    }
    timecout();




    /*  function showtime3() {
          var Left = document.querySelector('span:first-Child');
          var Middle = document.querySelector('span:nth-child(3)');
          var Right = document.querySelector('span:nth-child(5)');
          var nowtime = new Date(),
              endtime = new Date("2016/7/29,00:00:00"),
              lefttime = parseInt((endtime.getTime() - nowtime.getTime()) / 1000),
              d = Math.floor(lefttime / (60 * 60 * 24)),
              h = Math.floor(lefttime / (60 * 60) % 24),
              m = Math.floor(lefttime / 60 % 60),
              s = Math.floor(lefttime % 60);
          h = h < 10 ? '0' + h : h;
          s = s < 10 ? '0' + s : s;
          m = m < 10 ? '0' + m : m;
          Left.innerHTML = h;
          Middle.innerHTML = m;
          Right.innerHTML = s;
          setTimeout(showtime3, 1000);
      }
      showtime3();*/

}
