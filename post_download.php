<?php
    if($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET["image_src"]) && isset($_GET["luid"]) ) {
        $imageName = $_GET["luid"] . ".jpg";
        $imageURL = $_GET["image_src"];
        foreach($_GET as $key => $value) {
            if($key === "luid") continue;
            $imageURL .= "&" . $key . "=" . $value;
        }
        $imageContent = file_get_contents($imageURL);
        file_put_contents($imageName, $imageContent);
    } else {
        echo "[-] Error while parsing request.";
    }
?>