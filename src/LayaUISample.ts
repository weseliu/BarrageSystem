import test = ui.test.TestPageUI;
import Label = Laya.Label;
import Handler = Laya.Handler;
import Loader = Laya.Loader;
import WebGL = Laya.WebGL;

//程序入口
Laya.init(640, 1136, WebGL);
var emitter = new barrage.emitter.ringEmitter();
emitter.addAction(barrage.actions.move, {speed: 100});
emitter.setup({position: new barrage.common.vec3(320, 100, 0), lifeTime : 10, degrees : 30, intervalTime: 0.5}, false);
emitter.start();