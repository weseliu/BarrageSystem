import test = ui.test.TestPageUI;
import Label = Laya.Label;
import Handler = Laya.Handler;
import Loader = Laya.Loader;
import WebGL = Laya.WebGL;

//程序入口
Laya.init(640, 1136, WebGL);
Laya.Stat.show(0, 0);
// var emitter = new barrage.emitter.ringEmitter();
// emitter.setup({position: new barrage.common.vec3(320, 300, 0), lifeTime : 200, degrees : 30, intervalTime: 0.1}, false);
// emitter.addAction(barrage.actions.move, {speed: 5});
// emitter.addAction(barrage.actions.direct, {speed: -1, maxChangeValue : -90});

// emitter.start();

var txt = new laya.display.Text();
txt.text = "AAAAAA";
txt.fontSize = 30;
txt.color = "#ff0000";
txt.pos(320, 300);

// var action = actions.repeat(actions.rotateBy(1000, 720), 100);
var action = actions.sequence(actions.rotateBy(1000, 720), actions.rotateBy(1000, -720));
action.startWithTarget(txt);
Laya.stage.addChild(txt);