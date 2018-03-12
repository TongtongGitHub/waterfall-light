/**
 * waterfall-light.js
 * auther: liutongtong
 * dependency: jQuery
 */

//these are default config
let defaultConfig = {
    data: [],
    colNum: 5, //which means 20% of total width
    wrapperClass: "wfl-wrapper",
    containerClass: "wfl-image-container"
};

function Waterfall(cf) {
    this.config = $.extend({}, defaultConfig, cf);
    this.init();
}
Waterfall.prototype = {
    init: function () {
        //init data
        let _this = this;
        this._data = this.config.data;
        this.curIndex = -1; //current image index
        this.curRowIndex = -1;
        this.isNewRow = true;
        this.colNum = this.config.colNum;

        this._containerClass = this.config.containerClass;
        this._wrapperClass = this.config.wrapperClass;

        this.renderHTML();

        window.onscroll = function () {
            if ($('.' + _this._containerClass).last().offset().top < $(window).height() + $(document).scrollTop()) {
                _this.renderHTML();
            }
        }
        window.onresize = function () {
            if ($('.' + _this._containerClass).last().offset().top + $(document).scrollTop()) {
                _this.renderHTML();
            }
        }
    },
    renderHTML: function () {
        this.curIndex++;
        if (this.curIndex >= this._data.length) return;

        if (this.isNewRow) {
            this.curRowIndex++;
        }

        let _itemTemp = "<div class='" + this._containerClass +"'><img src='" + this._data[this.curIndex].src + "'/></div>";
        $('.' + this._wrapperClass).append(_itemTemp);
        let curItem = $('.' + this._containerClass).last();
        let width = 100 / this.colNum + '%';
        curItem.css('width', width);

        if ($('.' + this._containerClass).last().offset().top < $(window).height() + $(document).scrollTop()) {
            return this.renderHTML();
        }
    }
};

export default Waterfall;