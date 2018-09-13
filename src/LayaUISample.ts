import test = ui.test.TestPageUI;
import Label = Laya.Label;
import Handler = Laya.Handler;
import Loader = Laya.Loader;
import WebGL = Laya.WebGL;

//程序入口
Laya.init(640, 1136, WebGL);
Laya.Stat.show(0, 0);
var emitter = new barrage.emitter.ringEmitter();
emitter.setup({position: new barrage.common.vec3(320, 300, 0), lifeTime : 200, degrees : 30, intervalTime: 0.5}, false);
emitter.addAction(barrage.actions.move, {speed: 2});
emitter.addAction(barrage.actions.direct, {speed: 1});

emitter.start();