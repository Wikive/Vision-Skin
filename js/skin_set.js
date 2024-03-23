function ringo_do_regex_data(data) {
    return new RegExp('(?:^|; )' + data + '=([^;]*)');
}

function ringo_get_post() {
    const check = document.getElementById('invert');
    if(check.checked === true) {
        document.cookie = 'main_css_darkmode=1; path=/';
    } else {
        document.cookie = 'main_css_darkmode=0; path=/';
    }

    const check_2 = document.getElementById('use_sys_darkmode');
    if(check_2.checked === true) {
        window.localStorage.setItem('main_css_use_sys_darkmode', '1');
    } else {
        window.localStorage.setItem('main_css_use_sys_darkmode', '0');
    }

    const check_3 = document.getElementById('off_sidebar');
    if(check_3.checked === true) {
        window.localStorage.setItem('main_css_off_sidebar', '1');
    } else {
        window.localStorage.setItem('main_css_off_sidebar', '0');
    }

    const check_4 = document.getElementById('fixed_width');
    if(check_4.options[check_4.selectedIndex].value) {
        window.localStorage.setItem('main_css_fixed_width', check_4.options[check_4.selectedIndex].value);
    } else {
        window.localStorage.setItem('main_css_fixed_width', '');
    }

    history.go(0);
}

function ringo_do_skin_set() {
    let cookies = document.cookie;
    
    if(!window.localStorage.getItem('main_css_use_sys_darkmode') || window.localStorage.getItem('main_css_use_sys_darkmode') === '1') {
        if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.cookie = 'main_css_darkmode=1; path=/';
        } else {
            document.cookie = 'main_css_darkmode=0; path=/';
        }
    }

    if(window.localStorage.getItem('main_css_off_sidebar') && window.localStorage.getItem('main_css_off_sidebar') === '1') {
        document.getElementById('ringo_add_style').innerHTML += `
            .vision .content-wrapper .vision-sidebar {
                display: none;
            }

            .vision .content-wrapper .vision-content {
                margin-right: 0;
                max-width: 100%;
            }
        `;
    }

    if(window.localStorage.getItem('main_css_fixed_width') && window.localStorage.getItem('main_css_fixed_width') !== '') {
        let fixed_width_data = window.localStorage.getItem('main_css_fixed_width');
        document.getElementById('ringo_add_style').innerHTML += `
            .vision .nav-wrapper .navbar, .vision .vision-top-notice, .vision .content-wrapper, .vision-footer p, .vision-footer #powered {
                max-width: ` + fixed_width_data + `px;
            }

            .vision .content-wrapper .vision-content {
                max-width: 100%;
            }
        `;
    }
}

function ringo_load_skin_set() {
    let cookies = document.cookie;
    
    if(window.location.pathname === '/change/skin_set') {
        let set_language = {
            "en-US" : {
                "save" : "Save",
                "darkmode" : "Darkmode",
                "use_sys_darkmode" : "Use system darkmode set",
                "off_sidebar" : "Turn off sidebar",
                "fixed_width" : "Fixed width",
                'default' : 'Default',
            }, "ko-KR" : {
                "save" : "저장",
                "darkmode" : "다크모드",
                "use_sys_darkmode" : "시스템 다크모드 설정 사용",
                "off_sidebar" : "사이드바 끄기",
                "fixed_width" : "고정폭",
                'default' : '기본값',
            }
        }

        let language = cookies.match(ringo_do_regex_data('language'))[1];
        let user_language = cookies.match(ringo_do_regex_data('user_language'))[1];
        if(user_language in set_language) {
            language = user_language;
        }

        if(!language in set_language) {
            language = "en-US";
        }

        let set_data = {};

        if(cookies.match(ringo_do_regex_data('main_css_darkmode')) && cookies.match(ringo_do_regex_data('main_css_darkmode'))[1] === '1') {
            set_data["invert"] = "checked";
        }

        if(!window.localStorage.getItem('main_css_use_sys_darkmode') || window.localStorage.getItem('main_css_use_sys_darkmode') === '1') {
            set_data["use_sys_darkmode"] = "checked";
        }

        if(window.localStorage.getItem('main_css_off_sidebar') && window.localStorage.getItem('main_css_off_sidebar') === '1') {
            set_data["off_sidebar"] = "checked";
        }

        let fixed_width_data = '';
        if(window.localStorage.getItem('main_css_fixed_width')) {
            fixed_width_data = window.localStorage.getItem('main_css_fixed_width');
        }

        let select_fixed_width = [set_language[language]['default'], '800', '900', '1000', '1100', '1200', '1300', '1500', '1600'];
        let select_fixed_width_html = '<select name="fixed_width" id="fixed_width">';
        for(let for_a = 0; for_a < select_fixed_width.length; for_a++) {
            let for_a_data = select_fixed_width[for_a];
            if(for_a_data === set_language[language]['default']) {
                for_a_data = '';
            }

            let selected = '';
            if(fixed_width_data === for_a_data) {
                selected = 'selected';
            }

            select_fixed_width_html += '<option value="' + for_a_data + '" ' + selected + '>' + select_fixed_width[for_a] + '</option>';
        }
        select_fixed_width_html += '</select>';

        document.getElementById("main_skin_set").innerHTML = ' \
            <input ' + set_data["use_sys_darkmode"] + ' type="checkbox" id="use_sys_darkmode" name="use_sys_darkmode" value="use_sys_darkmode"> ' + set_language[language]['use_sys_darkmode'] + ' \
            <hr class="main_hr"> \
            <input ' + set_data["invert"] + ' type="checkbox" id="invert" name="invert" value="invert"> ' + set_language[language]['darkmode'] + ' \
            <hr class="main_hr"> \
            <input ' + set_data["off_sidebar"] + ' type="checkbox" id="off_sidebar" name="off_sidebar" value="off_sidebar"> ' + set_language[language]['off_sidebar'] + ' \
            <hr class="main_hr"> \
            ' + select_fixed_width_html + ' \
            <hr class="main_hr"> \
            <button onclick="ringo_get_post();">' + set_language[language]['save'] + '</button> \
        ';
    }
}

window.addEventListener('DOMContentLoaded', ringo_do_skin_set);
window.addEventListener('DOMContentLoaded', ringo_load_skin_set);