<?php

// Initialize cURL
$ch = curl_init();

// URL to send the request to
$url = "https://www.instagram.com/graphql/query";

// Data to be sent in the POST request
$data = [
    "av" => "17841469649526587",
    "__d" => "www",
    "__user" => "0",
    "__a" => "1",
    "__req" => "2",
    "__hs"=> "20023.HYP:instagram_web_pkg.2.1..0.1",
    "dpr"=> "1",
    "__ccg"=> "UNKNOWN",
    "__rev"=> "1017707390",
    "__s"=> "zwqtqy:ufbrmy:zrxx9i",
    "__hsi"=> "7430473441358606271",
    "__dyn"=> "7xeUjG1mxu1syUbFp41twpUnwgU7SbzEdF8aUco2qwJxS0k24o1DU2_CwjE1xoswaq0yE462mcw5Mx62G5UswoEcE7O2l0Fwqo31w9O1TwQzXwae4UaEW2G0AEco5G0zK5o4q3y1Sx-0lKq2-azqwt8d-2u2J0bS1LwTwKG1pg2fwxyo6O1FwlEcUed6goK2O4UrAwHxW1oCz8rwHwcOEymUhw",
    "__csr"=> "gggDlsAcTeysJMNP9KhbuZAREZAtEQCBqqBl6t6ACDTmHuHAFeq8KWh4GHWApLKGKbHCgCmmniCZpizUjFoi9ABoC5FBogzGCgVzWBAUzoS5Cdy9Wy4meF96DUGjgSjzoKu4tvwg8jxqQ2KUWeAVXCzo01eV8cU4Sm5AE5l0tU5K3u0cyw43xaaCxsM0Qy0bnw65w2b824wiy02tAi433895CPG4nCWbS0VIE2ICLxu5axC152tDBgogW0CU8Suswmxqexh8Sq2R0vUizo17opwl4118iu0Q82jClxNe1fwv85qE880Qx1e01Ltw4Xw3LE",
    "__comet_req"=> "7",
    "fb_dtsg"=> "NAcOJkHmpwP-dpA4lwbJ84Pn5SUQVoMu3OtpibF9JfR_Go37jao6L7A:17843696212148243:1729833580",
    "jazoest"=> "26180",
    "lsd"=> "uPtDBVQPflLh7VDlybsE6G",
    "__spin_r"=> "1017707390",
    "__spin_b"=> "trunk",
    "__spin_t"=> "1730041914",
    "fb_api_caller_class"=> "RelayModern",
    "fb_api_req_friendly_name"=> "PolarisProfilePageContentQuery",
    "variables"=> '{"id":"'.$_GET['uid'].'","render_surface":"PROFILE"}',
    "server_timestamps"=> true,
    "doc_id" => "8557171251032559"
];

// Convert data array to JSON
$jsonData = json_encode($data);

// Set cURL options
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Content-Length: ' . strlen($jsonData)
]);

// Execute the request and get the response
$response = curl_exec($ch);

// Check for errors
if ($response === false) {
    echo "cURL Error: " . curl_error($ch);
} else {
    echo $response;
}

// Close the cURL session
curl_close($ch);

?>
