<?php
    if (isset($_GET['uname']) && isset($_SERVER['HTTP_X_FBCLICK_XPACK'])) {
        extract($_GET);
        if (!function_exists('uid')) {
            function uid($uname) {
                $uid = shell_exec("python run.py $uname");
                return $uid;
            }
        }

        echo uid($uname);
    } else {
        echo "Header not found.";
    }
?>