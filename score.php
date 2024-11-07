<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ゲーム結果</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body id="score-page">
    <h1>ゲーム終了！</h1>
    <?php
    $score = isset($_GET['score']) ? htmlspecialchars($_GET['score']) : 0;
	
	if ($score >= 40) {
        $comment = "モグラ叩きマスターだね！おめでとう！";
    } else if ($score >= 25) {
        $comment = "すごい！もう少しでモグラ叩きマスターだね！";
    } else if ($score > 9) {
        $comment = "頑張ったね！今度はもっと上を目指そう！";
    } else {
        $comment = "もう少し頑張ろう！次はきっとできる！";
    }
	
    echo "<p>あなたのスコア: <strong>{$score}</strong></p>";
	echo "<p>{$comment}</p>";
    ?>
    <a href="index.html">もう一度遊ぶ</a>
</body>
</html>