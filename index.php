<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>JavaScript</title>
</head>
<body>
    <script src="js/utils.js"></script>
    <?php
        $path  = 'js/lessons';
        $files = scandir($path);
        echo '<script src="js/lessons/'.$files[count($files)-1].'"></script>';
    ?>
</body>
</html>