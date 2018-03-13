/**
 * waterfall-light.js
 * auther: liutongtong
 */

//these are default config
let defaultConfig = {
    data: [],
    colNum: 5, //which means 20% of total width
    wrapperClass: "wfl-wrapper",
    containerClass: "wfl-image-container"
};

function Waterfall(cf) {
    this.config = Object.assign({}, defaultConfig, cf);
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
            _this.renderNext();
        }
        window.onresize = function () {
            _this.renderNext();
        }
    },
    insertNextElem: function(src) {
        let elem = document.createElement('div');
        elem.setAttribute('class', this._containerClass);
        let pic = document.createElement('img');
        pic.setAttribute('src', src);
        elem.appendChild(pic);
        document.getElementsByClassName(this._wrapperClass)[0].appendChild(elem);
    },
    renderNext: function () {
        let elems = document.getElementsByClassName(this._containerClass);
        let curElem = elems[elems.length - 1];
        if(curElem.offsetTop < document.documentElement.clientHeight + document.documentElement.scrollTop){
            this.renderHTML()
        }
    },
    renderHTML: function () {
        this.curIndex++;
        if (this.curIndex >= this._data.length) return;

        if (this.isNewRow) {
            this.curRowIndex++;
        }

        this.insertNextElem(this._data[this.curIndex].src);

        let elems = document.getElementsByClassName(this._containerClass);
        let curElem = elems[elems.length - 1];
        let width = 100 / this.colNum + '%';
        curElem.setAttribute('style', 'width: ' + width);
        this.renderNext();
    }
};

export default Waterfall;