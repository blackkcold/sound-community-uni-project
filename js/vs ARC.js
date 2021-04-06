var audioCtx;
var canvas;
var canvasCtx;
var analyser;
var drawVisual
//元素汇集
var file = document.getElementById("file");
var audio = document.getElementById("sound");


canvas = document.getElementById('visualizer');
canvasCtx = canvas.getContext("2d");
//创建数据	
var WIDTH = canvas.width,
HEIGHT = canvas.height;
//canvas初始化
visualizer();

file.onchange = function () {
	
	var files = this.files;//声音文件
	audio.src = URL.createObjectURL(files[0]);

}



function visualizer(){
	
	var AudioContext = window.AudioContext || window.webkitAudioContext;
	audioCtx = new AudioContext;
	analyser = audioCtx.createAnalyser();
	//loading media

	var source = audioCtx.createMediaElementSource(audio);
	//create node

	source.connect(analyser);
	analyser.connect(audioCtx.destination);
	//connecting: source - analyser - destination/distortion

	canvasCtx.clearRect(0,0,WIDTH,HEIGHT);
	//清理画布

	var draw = function(){

		canvasCtx.fillStyle = 'white';
		canvasCtx.beginPath();
		canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
		canvasCtx.closePath();
		canvasCtx.fill();
		//生成圆形画布
		
		var lineVS = function () {
		//开始绘制频谱
			canvasCtx.lineWidth = 2;
			var gradient = canvasCtx.createLinearGradient(0, 100, 200, 100);
			gradient.addColorStop("0", "#77B7C1");
			gradient.addColorStop("1.0", "#796E94");
			canvasCtx.strokeStyle = gradient;
			//渐变上色

			canvasCtx.beginPath();
			canvasCtx.globalCompositeOperation = "source-atop";

			analyser.fftSize = 1024;
			var bufferlength = analyser.fftSize;
			//傅里叶变换对数据进行处理
			var dataArray = new Uint8Array(bufferlength);

			drawVisual = requestAnimationFrame(draw);
			//持续刷新
			analyser.getByteTimeDomainData(dataArray);
			//时间域数据转换到数组
			
			var sliceWidth = WIDTH * 1.2 / bufferlength;
			var x = -5; //调整起始点
		
			for(var i = 0; i < bufferlength; i++) {
			
				var v = dataArray[i] / 128.0;
				var y = v * HEIGHT/2; //+30 可下移音轨

				if(i === 0) {
					canvasCtx.moveTo(x, y);
				} else {
					canvasCtx.lineTo(x, y);
				}

				x += sliceWidth;
			}
	
			canvasCtx.lineTo(canvas.width, canvas.height/4);
			canvasCtx.stroke();
		}
        lineVS();
	}
draw();
	
}