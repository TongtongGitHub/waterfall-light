import "./waterfall.scss";
import $ from 'jquery';

/*模拟块作用域*/
(function () {
    /*模拟从服务端获取的json数据*/
    var data = $.parseJSON('{"row":[{"src":"https://dummyimage.com/600x400/ccc/666","height": 187.5},{"src":"https://dummyimage.com/600x400/ccc/666","height": 156.25},{"src":"https://dummyimage.com/600x400/ccc/666","height": 375},{"src":"https://dummyimage.com/600x400/ccc/666","height": 156.25},{"src":"https://dummyimage.com/600x400/ccc/666","height": 375},' +
        '{"src":"https://dummyimage.com/600x400/ccc/666","height": 156.25},{"src":"https://dummyimage.com/600x400/ccc/666","height": 156.25},{"src":"https://dummyimage.com/600x400/ccc/666","height": 375},{"src":"https://dummyimage.com/600x400/ccc/666","height": 375}]}');
    var falls = {
        minHeights: [0, 0, 0, 0, 0],
        leftArray: [0, 260, 520, 780, 1040],
        topArray: [],
        imgArray: [],
        imageNumber: 0
    }

    function getMinHeight() {
        return Math.min.apply(null, falls.minHeights);
    }

    function getLeft() {
        for (var i = 0; i < falls.minHeights.length; i++) {
            if (getMinHeight() == falls.minHeights[i]) {
                return i;
            }
        }
        return -1;
    }

    function generateHtml() {
        var row = data.row,
            len = row.length,
            html = "";
        for (var i = 0; i < len; i++) {
            html += "<div class='img-box'>" +
                "<img src='" + row[i].src + "'/></div>";
        }
        $("#container").append(html);

        $("#container .img-box").each(function (j) {
            if (j >= falls.imageNumber) {
                falls.imgArray.push(this);

                $(this).css({
                    "position": "absolute",
                    "top": getMinHeight() + "px",
                    "left": falls.leftArray[getLeft()] + "px"
                });
                //插入一张图片重新计算该列的高度
                falls.minHeights[getLeft()] += data.row[j % 9].height;
            }
        });

        falls.imageNumber = falls.imgArray.length;

        /*判断图片是否充满整个屏幕，如果有一列没有充满，则继续加载图片*/
        if (getMinHeight() < window.screen.height) {
            return generateHtml();
        }

    }

    generateHtml();

    window.onscroll = function () {
        var minHeight = getMinHeight();
        if (window.screen.height + window.scrollY > minHeight) {
            generateHtml();
        }
    }

})();