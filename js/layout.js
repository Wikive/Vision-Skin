// func
function ringo_do_xss_encode(data) {
    data = data.replace(/'/g, '&#x27;');
    data = data.replace(/"/g, '&quot;');
    data = data.replace(/</g, '&lt;');
    data = data.replace(/</g, '&gt;');

    return data;
}

function ringo_do_url_encode(data) {
    return encodeURIComponent(data);
}

// event
ringo_do_side_button_1();
ringo_do_side_button_2();
ringo_do_side_button_3();

function ringo_do_side_button_1() {
    fetch("/api/recent_change/14").then(function(res) {
        return res.json();
    }).then(function(text) {
        let data = '';
        for(let for_a = 0; for_a < text.length; for_a++) {
            if(text[for_a][6] === '') {
                data += '<li><a class="recent-item" href="/w/'+ ringo_do_xss_encode(text[for_a][1]) + '">' + ringo_do_xss_encode(text[for_a][1]);
                data += '<span class="recent-time">' + ringo_do_xss_encode(text[for_a][2].replace(/^([^ ]+) /, '')) + '</span></a></li>'
            } else {
                data += '---<br>';
                data += '--- | ---<br>';
            }
        }
        document.getElementById('sidebar-1-list').innerHTML = data;
    }).catch(function(error) {
        document.getElementById('sidebar-1-item').innerHTML = 'API를 불러오지 못했습니다!';
    });
}

function ringo_do_side_button_2() {
    fetch("/api/recent_discuss/7").then(function(res) {
        return res.json();
    }).then(function(text) {
        let data = '';
        for(let for_a = 0; for_a < text.length; for_a++) {
            data += '<li><a class="recent-item" href="/thread/' + ringo_do_url_encode(text[for_a][3]) + '">' + ringo_do_xss_encode(text[for_a][1]);
            data += '<span class="recent-time">' + ringo_do_xss_encode(text[for_a][2].replace(/^([^ ]+) /, '')) + '</span></a></li>'
        }
        document.getElementById('sidebar-2-list').innerHTML = data;
    }).catch(function(error) {
        document.getElementById('sidebar-2-item').innerHTML = 'API를 불러오지 못했습니다!';
    });
}

function ringo_do_side_button_3() {
    fetch("https://namgall.wikiing.in/api/open_recent_changes/8").then(function(res) {
        return res.json();
    }).then(function(text) {
        let data = '';
        for(let for_a = 0; for_a < text.length; for_a++) {
            data += '<li><a class="recent-item" href="'+ text[for_a][8] + ringo_do_xss_encode(text[for_a][1]) + '">' + "[" + ringo_do_xss_encode(text[for_a][7]) + "] " + ringo_do_xss_encode(text[for_a][1]);
            data += '<span class="recent-time">' + ringo_do_xss_encode(text[for_a][2].replace(/^([^ ]+) /, '')) + '</span></a></li>'
        }
        document.getElementById('sidebar-3-list').innerHTML = data;
    }).catch(function(error) {
        document.getElementById('sidebar-3-item').innerHTML = 'API를 불러오지 못했습니다!';
    });
}

// Dropdown
$( function () {
	'use strict';
	$( '.dropdown' ).on( 'show.bs.dropdown', function () {
		$( this ).find( '.dropdown-menu' ).first().stop( true, true ).fadeToggle( 200 );
	} );

	$( '.dropdown' ).on( 'hide.bs.dropdown', function () {
		$( this ).find( '.dropdown-menu' ).first().stop( true, true ).fadeToggle( 200 );
	} );

	$( '.btn-group' ).on( 'show.bs.dropdown', function () {
		$( this ).find( '.dropdown-menu' ).first().stop( true, true ).fadeToggle( 200 );
	} );

	$( '.btn-group' ).on( 'hide.bs.dropdown', function () {
		$( this ).find( '.dropdown-menu' ).first().stop( true, true ).fadeToggle( 200 );
	} );
} );
