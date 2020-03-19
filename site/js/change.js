function init() {
    //图片ul
    let ul = document.getElementById("ul");
    let ulLis = ul.children;
//获取每个li的宽度
    let liWidth = ulLis[0].offsetWidth;

//在ul的最后一个li后面添加上第一个图
    ul.appendChild(ulLis[0].cloneNode(true));

//图片运动速度
    function animate(obj, target) {
        clearInterval(obj.timer);
        let speed = obj.offsetLeft < target ? 50 : -50;
        obj.timer = setInterval(() => {
            obj.style.left = obj.offsetLeft + speed + 'px';
            if (Math.abs(target - obj.offsetLeft) <= Math.abs(speed)) {
                clearInterval(obj.tiemr);
                obj.style.left = target + 'px';
            }
        }, 30);
    }

    var timer = null;
    var key = 0;
    var circle = 0;
    var olLis = document.querySelectorAll('#ol li');
//轮播
    timer = setInterval(autoPlay, 3000);

//自动播放
    function autoPlay() {
        key++;
        if (key > ulLis.length - 1) {
            ul.style.left = 0;
            key = 1;
        }
        animate(ul, -key * liWidth);
        circle++;
        if (circle > olLis.length - 1) {
            circle = 0;
        }
        for (var i = 0, len = olLis.length; i < len; i++) {
            olLis[i].className = '';
        }
        olLis[circle].className = 'current';
    }
}
