const inputNum = document.getElementById('num');
const inputR = document.getElementById('R');
const inputG = document.getElementById('G');
const inputB = document.getElementById('B');
const currentValueNum = document.getElementById('num-value');
const currentValueR = document.getElementById('R-value');
const currentValueG = document.getElementById('G-value');
const currentValueB = document.getElementById('B-value');

let hanabiNum = 20;

const rangeOnChangeNum = (e) => {
	currentValueNum.innerText = e.target.value;
}
const rangeOnChangeR = (e) => {
	currentValueR.innerText = e.target.value;
}
const rangeOnChangeG = (e) => {
	currentValueG.innerText = e.target.value;
}
const rangeOnChangeB = (e) => {
	currentValueB.innerText = e.target.value;
}

window.onload = () => {
	// 変更に合わせてイベントを発火する
	inputNum.addEventListener('input', rangeOnChangeNum);
	inputR.addEventListener('input', rangeOnChangeR);
	inputG.addEventListener('input', rangeOnChangeG);
	inputB.addEventListener('input', rangeOnChangeB);
	// ページ読み込み 時の値をセット
}



onload = function () {
	draw();
};

function rgb2hex(rgb) {
	return "#" + rgb.map(function (value) {
		return ("0" + value.toString(16)).slice(-2);
	}).join("");
}


function draw() {


	setInterval(function () {
		if ((Math.random() * 100) > 50) {
			return;
		}
		
		var color = rgb2hex([ parseInt(inputR.value), parseInt(inputG.value), parseInt(inputB.value)]);	
		var hanabi = {
			// 火花の数
			'quantity': parseInt(inputNum.value),
			// 火花の大きさ
			'size': 2,
			// 減衰率
			'circle': 1.0,
			// 重力
			'gravity': 1.1,
			// 火花の速度
			'speed': 5,
			// 位置
			'top': (Math.random()),
			'left': (Math.random()),
			// 色
			'color': color
		};
		Math.Radian = Math.PI * 2;
		var hibana = [];

		var cvs = {
			// canvas element
			'elem': undefined,
			// canvas width(window max)
			'width': 0,
			// canvas width(window height)
			'height': 0,
			// 2d context
			'ctx': undefined,
			// element offset(left)
			'left': 0,
			// element offset(top)
			'top': 0,
			// explode point(x)
			'pos_x': 0,
			// explode point(y)
			'pos_y': 0
		};
		var frame = 0;



		// キャンバス初期化
		cvs.elem = document.getElementById('hanabi');
		cvs.width = cvs.elem.width;
		cvs.height = cvs.elem.height;
		cvs.ctx = cvs.elem.getContext('2d');
		cvs.left = cvs.elem.getBoundingClientRect ? cvs.elem.getBoundingClientRect().left : 0;
		cvs.top = cvs.elem.getBoundingClientRect ? cvs.elem.getBoundingClientRect().top : 0;

		// 火花を詰める
		setTimeout(function () {
			cvs.pos_y = cvs.height * hanabi.top;
			cvs.pos_x = cvs.width * hanabi.left;
			for (var i = 0; i < hanabi.quantity; ++i) {
				var angle = Math.random() * Math.Radian;
				var speed = Math.random() * hanabi.speed;

				hibana.push({
					'pos_x': cvs.pos_x,
					'pos_y': cvs.pos_y,
					'vel_x': Math.cos(angle) * speed,
					'vel_y': Math.sin(angle) * speed
				});

			};

			requestAnimationFrame(render);

		}, 0)



		// 花火の描画
		function render() {
			if (!hibana.length || hanabiNum<0) {
				return;
			};
			frame++;
			cvs.ctx.fillStyle = (frame % 2) ? "rgba(255, 255, 255, 0.8)" : hanabi.color;
			for (var i = 0, len = hibana.length; i < len; i++) {
				var s = hibana[i];
				s.pos_x += s.vel_x;
				s.pos_y += s.vel_y;
				s.vel_x *= hanabi.circle;
				s.vel_y *= hanabi.circle;
				s.pos_y += hanabi.gravity;
				if (hanabi.size < 0.1 || !s.pos_x || !s.pos_y || s.pos_x > cvs.width || s.pos_y > cvs.height) {
					hibana[i] = undefined;
					return;
				};

				cvs.ctx.beginPath();
				cvs.ctx.arc(s.pos_x, s.pos_y, hanabi.size, 0, Math.Radian, true);
				cvs.ctx.fill();
			};

			hanabi.size *= hanabi.circle;
			cvs.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
			cvs.ctx.fillRect(0, 0, cvs.width, cvs.height);
			requestAnimationFrame(render);
		}
	}, 400);

}
