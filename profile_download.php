<?php
    if($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET["profile_url"]) && isset($_GET["luid"]) ) {
        $imageName = $_GET["luid"] . "_profile_pic.jpg";
        $imageURL = $_GET["profile_url"];
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