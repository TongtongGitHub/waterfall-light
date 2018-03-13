import './waterfall.scss'
import Waterfall from "./waterfall-light";

let data = [];
for (var index = 0; index < 100; index++) {
    let randomH = Math.random() * 500;
    let randomW = Math.random() * 500;
    randomH = randomH > 200 ? randomH : 200;
    randomW = randomW > 200 ? randomW : 200;
    var image = {
        src: "https://dummyimage.com/" + randomW + "x" + randomH + "/ccc/666",
        height: randomH,
        width: randomW
    };
    data.push(image);
}

new Waterfall({
    data: data
});