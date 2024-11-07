// JavaScript Document
let score = 0;
let timeLeft = 30;
let timerInterval;
let activeHoles = []; // 複数のアクティブなモグラを管理
let moleIntervals = [800, 1200]; // 表示間隔を設定
const moleTypes = ["mogura.png", "mogura2.png", "mogura3.png"]; // モグラの種類

// スコアを更新
function updateScore() {
    document.getElementById("score").textContent = score;
	showComment();  // スコア更新時にコメントを表示
}

// コメントを表示する関数
function showComment() {
    let comment = "";
    if (score >= 40) {
        comment = "すごい！モグラ叩きマスターだね！";
    } else if (score >= 25) {
        comment = "がんばれ！あと少しだ！";
    } else if (score > 9) {
        comment = "いいね！その調子！";
    } else if (score > -9) {
        comment = "うーん、もう少し頑張って！";
    } else if (score < -20) {
        comment = "ちょっと才能ないかも、、、";
	}else {
		comment = "ゲームスタート！頑張ってモグラを叩こう！";
    }

    // コメントエリアに表示
    document.getElementById("comment-area").textContent = comment;
}

// タイマーを更新
function updateTimer() {
    document.getElementById("timer").textContent = timeLeft;
}

// モグラが出現する位置をランダムに決定
function randomHole() {
    const holes = document.querySelectorAll(".hole");
    const index = Math.floor(Math.random() * holes.length);
    return holes[index];
}

// モグラの画像をランダムに選択
function randomMoleImage() {
    return moleTypes[Math.floor(Math.random() * moleTypes.length)];
}

// モグラの位置を更新
function showMole() {
    let activeHole = randomHole();

    // 他のモグラと被らないように
    while (activeHoles.includes(activeHole)) {
        activeHole = randomHole();
    }

    activeHole.classList.add("active");
    activeHoles.push(activeHole);
	
	// ランダムにモグラの画像を選択して設定
    activeHole.querySelector("img").src = randomMoleImage();
	
	// 1000ms経過後にモグラを非表示にする
    setTimeout(() => {
        activeHole.classList.remove("active");
		activeHoles = activeHoles.filter(h => h !== activeHole);
    }, 1000);
}

// スコアエフェクトを表示する関数
function showScoreEffect(text, x, y) {
    const effect = document.createElement("div");
    effect.className = "score-effect";
    effect.textContent = text;
	
	// スコアが増えると青、減ると赤に設定
    if (text === "+1") {
        effect.style.color = "blue";  // スコアが+1の場合は青
    } else if (text === "-1") {
        effect.style.color = "red";   // スコアが-1の場合は赤
    }
    effect.style.left = `${x}px`;
    effect.style.top = `${y}px`;
    document.body.appendChild(effect);

    setTimeout(() => effect.remove(), 1000); // 1秒後に消去
}

// ゲーム終了時の処理
function endGame() {
    clearInterval(timerInterval);
    // PHPにスコアを送信して別ページへ移動
    window.location.href = `score.php?score=${score}`;
}

// ゲームスタート
function startGame() {
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimer();
        } else {
            endGame();
        }
    }, 1000);
	
	// 異なる間隔でモグラが表示されるように
    moleIntervals.forEach(interval => {
        setInterval(() => {
            if (timeLeft > 0) showMole(interval);
        }, interval);
	});
}

// モグラが叩かれたときの処理
document.querySelectorAll(".hole").forEach(hole => {
    hole.addEventListener("click", (event) => {
		// 現在のモグラがクリックされた場合のみスコアを増加
        if (activeHoles.includes(hole)) {
            score++;
            updateScore();
            showScoreEffect("+1", event.clientX, event.clientY);
            hole.classList.remove("active");
            activeHoles = activeHoles.filter(h => h !== hole);
        } else {
            score--;
            updateScore();
            showScoreEffect("-1", event.clientX, event.clientY);
        }
    });
});

// ゲーム開始
startGame();