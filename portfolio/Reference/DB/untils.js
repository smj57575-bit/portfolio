$(document).ready(function() {

	if (window.location.protocol == "http:") {
		var restOfUrl = window.location.href.substr(5);
		// window.location = "https:" + restOfUrl;
	}

	var today = new Date();
	var month = today.getMonth() + 1;
	$("#event_txt").html(month + '월<br><span>추천상품</span><br><em>암보험</em>');

	//JEHUSA_CD 매체별 변경 적용
	//if (getAllUrlParams().jehusa_cd != undefined) $("input[name='JEHUSA_CD']").val(getAllUrlParams().jehusa_cd);

	/*var url = window.location.toString();
	if(url.indexOf('_cb_test') > 0) {
		$("#chatbot").show();
	} else {
		if($("#wrap").hasClass('driver') || $("#wrap").hasClass('cancer')) {
			$("#chatbot").show();
		} else {
			$("#chatbot").hide();
		}

	}*/

	//20210204 폼입력시 챗봇hidden (사용 안 함 - 주석처리)
	// $(".formBox input").focus(function() {
	// 	$("#chatbot").hide();
	// });
	// $(".formBox input").blur(function() {
	// 	$("#chatbot").show();
	// });

	$(".result .btnCall").click(function(){
		if ($(".result").attr('data-next-not') == '1') {
			alert('정상적으로 신청되었습니다.');
			$(".result").hide();
			$('.toastClose').trigger('click');

			$('#name, #name2').val('');
			$('#birth, #birth2').val('');
			$('#tel1, #tel2, #tel3, #tel1_2, #tel2_2, #tel3_2').val('');
			$('#gender_m, #gender2_m').prop('checked', false);
			$('#gender_f, #gender2_f').prop('checked', false);

			$('input[type="radio"][name="agreePop_1"]').prop('checked', false);
			$('input[type="radio"][name="agreePop_2"]').prop('checked', false);
			$('input[type="radio"][name="agreePop_3"]').prop('checked', false);

			$(".result").removeAttr('data-next-not');
			return false;
		}
		$(".result").removeAttr('data-next-not');
	});
});



function chkfrm_agree(gubun, frm) {

	

	$('.btnCheck').removeAttr("onclick");
	$(".result .btnCall").removeAttr('onclick');
	$('.agreePop').removeAttr('data-next-not');
	$(".result").removeAttr('data-next-not');
	$(".nStPop").hide();

	if (gubun == "cal") {
		$('.btnCheck').text("내 보험료 확인하기");
		$('.btnCheck').removeClass("gr");
	} else {
		$('.btnCheck').text("무료 상담신청");
		$('.btnCheck').addClass("gr");
	}

	if (frm == "1") {
		
		var name = ($('#name').val());
		var tel1 = ($('#tel1').val());
		var tel2 = ($('#tel2').val());
		var tel3 = ($('#tel3').val());
		var birth = ($('#birth').val());

		var name_filter = ['임임임', '장장장', '조조조', '윤윤윤', '박박박', '정정정', '이이이', '강강강', '최최최', '김김김', '고고고', '가가가', '나나나', '다다다', '라라라', '마마마', '바바바', '사사사', '아아아', '자자자', '차차차', '카카카', '타타타', '파파파', '하하하', '민민민', '김김김', '홍길동', '아무개', '이이', '김김', '가나다', '감수성', '견본',	'김개똥', '김고객', '김도드', '김또깡', '김똘똘', '김머기', '김머님', '김옥띠', '김치치', '김호탕', '나여자', '나중에', '노늬니', '노짱', '다다', '동반자', '라영밍', '마눌님', '무우운', '미미미', '슈이롱', '심심이', '오오오', '요술반지', '용만이', '이르음', '이름이', '이무개', '쩐득아인', '테스트', '포켓', '하호도', '홍길', '훈타훈', '거식히', '개똥이'];
		var tel_filter = ['11111111', '11112222', '11113333', '11114444', '11115555', '11116666', '11117777', '11118888', '11119999', '22221111', '22222222', '22223333', '22224444', '22225555', '22226666', '22227777', '22228888', '22229999', '33331111', '33332222', '33333333', '33334444', '33335555', '33336666', '33337777', '33338888', '33339999', '44441111', '44442222', '44443333', '44444444', '44445555', '44446666', '44447777', '44448888', '44449999', '55551111', '55552222', '55553333', '55554444', '55555555', '55556666', '55557777', '55558888', '55559999', '66661111', '66662222', '66663333', '66664444', '66665555', '66666666', '66667777', '66668888', '66669999', '77771111', '77772222', '77773333', '77774444', '77775555', '77776666', '77777777', '77778888', '77779999', '88881111', '88882222', '88883333', '88884444', '88885555', '88886666', '88887777', '88888888', '88889999', '99991111', '99992222', '99993333', '99994444', '99995555', '99996666', '99997777', '99998888', '99999999', '12341234', '12340000', '12341111', '12342222', '12343333', '12344444', '12345555', '12346666', '12347777', '12348888', '12349999', '11111234', '22221234', '33331234', '44441234', '55551234', '66661234', '77771234', '88881234', '99991234', '11110000', '22220000', '33330000', '44440000', '55550000', '66660000', '77770000', '88880000', '99990000'];
		var tel_box_filter = ['1111', '2222', '3333', '4444', '5555', '6666', '7777', '8888', '9999', '0000', '1234'];

		var phonenum = tel1 + tel2 + tel3;

		if (name == "") {
			alert("이름을 입력해 주십시오.");
			$('#name').focus();
			return;
		} else {
			if (name_filter.indexOf(name) > -1 || !chkName(name)) {
				alert("정확한 이름을 입력해 주십시오.");
				$('#name').focus();
				return;
			} else {
			}
		}

		if(tel1 != "010"){
			alert("010으로 시작하는 휴대폰번호를 입력해 주세요");
			$('#tel1').focus();
			return;
		}

		if (!$('input:radio[name=gender]').is(':checked')) {
			alert("성별을 선택해 주십시오.");
			$('#gender_m').focus();
			return;
		}

		if (birth == "") {
			alert("생년월일을 입력해 주십시오.");
			$('#birth').focus();
			return;
		} else {

			if (birth.length > 8 || birth.length < 8) {
				alert("올바른 생년월일을 입력해 주십시오.");
				$('#birth').val('').focus();
				return;
			} else {

				if (checkbirth(birth) == true) {
					var age = calcAge(birth);

					var age2 = calcAge2(birth); // 만 나이 아닌 나이
					//console.log($("#wrap").attr('class'), birth, age2);
					if ($("#wrap").hasClass('driver')) {
						// driver: 한국 나이(age2) 기준 — 79세 이상 가입불가 / ~78세 가입 가능
						if (age2 < 20 || age2 >= 79) {
							alert("해당 연령은 가입이 어려운 상품 입니다.");
							return;
						}
					} else if ($("#wrap").hasClass('kids') || $("#wrap").hasClass('young')|| $("#wrap").hasClass('pet')) {
						if (age2 >= 79) {
							alert("해당 연령은 가입이 어려운 상품 입니다.");
							return;
						}
					} else {
						if (age2 <= 19 || age2 >= 79) {
							alert("해당 연령은 가입이 어려운 상품 입니다.");
							return;
						}
					}

					if ($("#wrap").hasClass('dbhappyplus')) {
						// dbhappyplus: 19세 이하(2007년생~), 79세 이상(1947년생~) 가입불가 alert
						// 61~78세(1948~1965년생) 가입불가 안내(상담사 문구), 20~60세 가입 가능
						if (age2 <= 19 || age2 >= 79) {
							alert("해당 연령은 가입이 어려운 상품 입니다.");
							return;
						} else if (age2 >= 20 && age2 <= 60) { // 20~60세 가입 가능
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						} else { // 61~78세: 가입불가 안내 (상담사 문구)
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}
					}

					if ($("#wrap").hasClass('care')) {
						if (age2 <= 19 || age2 >= 79) { // 19세 이하 또는 79세 이상
							alert("해당 연령은 가입이 어려운 상품 입니다.");
							return;
						} else if (age2 >= 20 && age2 <= 60) { // 20세 이상 60세 이하 (가입가능)
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						} else { // 61세 이상 78세 이하 (가입불가안내팝업)
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}
					}

					if ($("#wrap").hasClass('cancer')) {
						// cancer: 19세 이하(2007년생~), 79세 이상(1947년생~) 가입불가 alert
						// 61~78세(1948~1965년생) 가입불가 안내(상담사 문구), 20~60세 가입 가능
						if (age2 <= 19 || age2 >= 79) {
							alert("해당 연령은 가입이 어려운 상품 입니다.");
							return;
						} else if (age2 >= 20 && age2 <= 60) { // 20~60세 가입 가능
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						} else { // 61~78세: 가입불가 안내 (상담사 문구)
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}
					}
	
					if ($("#wrap").hasClass('tome')) {
						// tome: 19세 이하(2007년생~), 79세 이상(1947년생~) 가입불가 alert
						// 50~78세(1948~1976년생) 가입불가 안내(상담사 문구), 20~49세 가입 가능
						if (age2 <= 19 || age2 >= 79) { // 19세 이하 또는 79세 이상
							alert("해당 연령은 가입이 어려운 상품 입니다.");
							return;
						} else if (age2 >= 20 && age2 <= 49) { // 20~49세 가입 가능
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						} else { // 50~78세: 가입불가 안내 (상담사 문구)
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}
					}


					if ($("#wrap").hasClass('familydementia')) {
						// familydementia: 19세 이하(2007년생~), 79세 이상(1947년생~) 가입불가 alert
						// 20~39세·71~78세 가입불가 안내(상담사 문구), 40~70세 가입 가능
						if (age2 <= 19 || age2 >= 79) { // 19세 이하 또는 79세 이상
							alert("해당 연령은 가입이 어려운 상품 입니다.");
							return;
						} else if (age2 >= 40 && age2 <= 70) { // 40~70세 가입 가능
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						} else { // 20~39세, 71~78세: 가입불가 안내 (상담사 문구)
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}
					}

					if ($("#wrap").hasClass('young')) {
						if (age2 <= 15 || age2 >= 79) { // 14세 이하 또는 79세 이상
							alert("해당 연령은 가입이 어려운 상품 입니다.");
							return;
						} else if (age2 >= 15 && age2 <= 40) { // 15세 이상 40세 이하 가입 가능
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						} else { 
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}
					}

					if ($("#wrap").hasClass('mental')) {
						if (age2 <= 19 || age2 >= 79) { // 19세 이하 또는 79세 이상
							alert("해당 연령은 가입이 어려운 상품 입니다.");
							return;
						} else if (age2 >= 20 && age2 <= 60) { // 20세 이상 60세 이하 가입 가능
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						} else { 
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}
					}

					if ($("#wrap").hasClass('hemilre')) {
						if (age2 <= 19 || age2 >= 79) { // 19세 이하 또는 79세 이상
							alert("해당 연령은 가입이 어려운 상품 입니다.");
							return;
						} else if (age2 >= 20 && age2 <= 60) { // 20세 이상 60세 이하 (가입가능)
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						} else { // 61세 이상 78세 이하 (가입불가안내팝업)
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}
					}

					if( $("#wrap").hasClass('pet') ) {
						if (age < 0 || age > 10) {
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}else{
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						}
					} else if($("#wrap").hasClass('kids')) {
						if (age < 0 || age > 15) {
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}else{
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						}
					} else if($("#wrap").hasClass('goodsilver')) {
						if (age < 20 || age > 50) {
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}else{
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						}
					} else if($("#wrap").hasClass('tome311') ) {
						if (age < 20 || age > 55) {
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}else{
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						}
					} else if($("#wrap").hasClass('tomeplus') || $("#wrap").hasClass('tooth') ) {
						if (age < 20 || age > 60) {
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}else{
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						}
					} else if($("#wrap").hasClass('dbhappyplus') ) {
						// dbhappyplus: 20~60세 boxType2(가입가능), 61~78세 boxType1(상담사 안내)
						if (age2 >= 20 && age2 <= 60) {
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						} else {
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}
					} else if($("#wrap").hasClass('silson') || $("#wrap").hasClass('silbi') ) {
						if (age < 20 || age > 65) {
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}else{
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						}
					} else if($("#wrap").hasClass('motorcycle') ) {
						if (age < 20 || age > 70) {
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}else{
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						}
					} else if($("#wrap").hasClass('driver')) {
						// driver: age2(한국 나이) 기준 — ~78세 가입 가능
						if (age2 < 20 || age2 >= 79) {
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}else{
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						}
					} else if($("#wrap").hasClass('accident') || $("#wrap").hasClass('house') ) {
						if (age < 20 || age > 80) {
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}else{
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						}
					} else if($("#wrap").hasClass('seniorcare')) {
						if (age < 30 || age > 53) {
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}else{
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						}
					} else if($("#wrap").hasClass('familydementia')) {
						// familydementia: 40~70세 가입가능, 20~39세·71~78세 상담사 안내
						if (age2 >= 40 && age2 <= 70) { // 40~70세 가입 가능
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						} else { // 20~39세, 71~78세: 가입불가 안내 (상담사 문구)
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}
					}else if($("#wrap").hasClass('young')) {
						if (age < 15 || age > 40) {
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}else{
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						}
					}else if($("#wrap").hasClass('hemilre')) {
						// if (age < 20 || age > 60) {
						// 	$(".result .boxType1").show();
						// 	$(".result .boxType2").hide();
						// }else{
						// 	$(".result .boxType1").hide();
						// 	$(".result .boxType2").show();
						// }
					}else if($("#wrap").hasClass('care')) {
					}else if($("#wrap").hasClass('cancer')) {
						// cancer: 20~60세 boxType2(가입가능), 61~78세 boxType1(상담사 안내)
						if (age2 >= 20 && age2 <= 60) {
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						} else {
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}
					}else if($("#wrap").hasClass('tome')) {
						// tome: 20~49세 boxType2(가입가능), 50~78세 boxType1(상담사 안내)
						if (age2 >= 20 && age2 <= 49) {
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						} else {
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}
					}else if($("#wrap").hasClass('mental')) {
						if (age < 20 || age > 60) {
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}else{
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						}
					} else {
						if (age < 20 || age > 65) {
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}else{
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						}
					}

					var currentDate = new Date();
					var inputDate = new Date(currentDate.getFullYear() + "-" + birth.substr(4, 2) + "-" + birth.substr(6, 4));
					inputDate.setMonth(inputDate.getMonth() - 6);

					if (currentDate > inputDate) {
						inputDate.setYear(inputDate.getFullYear() + 1);
					}

					var alert_year = inputDate.getFullYear();
					var alert_month = inputDate.getMonth() + 1;
					var alert_day = inputDate.getDate();

					//console.log(alert_year+alert_month+alert_day);

				} else {
					//alert("올바른 생년월일을 입력해 주십시오.");
					$('#birth').focus();
					return;
				}
			}

		}

		if (tel1 == "" || tel1.length < 3) {
			alert("휴대전화를 입력해 주십시오.");
			$('#tel1').focus();
			return;
		} else if ((tel2 == "" || tel2.length < 4) || (tel_box_filter.indexOf(tel2) > -1)) {
			alert("휴대전화를 정확히 입력해 주십시오.");
			$('#tel2').focus();
			return;
		} else if ((tel3 == "" || tel3.length < 4) || (tel_box_filter.indexOf(tel3) > -1)) {
			alert("휴대전화를 정확히 입력해 주십시오.");
			$('#tel3').focus();
			return;
		} else {

			if (phonenum.length > 11 || phonenum.length < 11) {
				alert("올바른 연락처를 입력해 주십시오.");
				$('#tel1').focus();
				return;
			} else {
				var regExp_ctn = /(01[016789])([1-9]{1}[0-9]{2,3})([0-9]{4})$/;
				if (!regExp_ctn.test(phonenum)) {
					alert("올바른 연락처를 입력해 주십시오.");
					$('#tel1').focus();
					return;
				} else if (tel_filter.indexOf(phonenum.slice(-8)) > -1) {
					alert("올바른 연락처를 입력해 주십시오.");
					$('#tel1').focus();
					return;
				}
			}
		}

		$('.btnCheck').attr("onclick", "chkfrm('" + gubun + "');");

	} else {
		

		var name = ($('#name2').val());
		var tel1 = ($('#tel1_2').val());
		var tel2 = ($('#tel2_2').val());
		var tel3 = ($('#tel3_2').val());
		var birth = ($('#birth2').val());

		var name_filter = ['임임임', '장장장', '조조조', '윤윤윤', '박박박', '정정정', '이이이', '강강강', '최최최', '김김김', '고고고', '가가가', '나나나', '다다다', '라라라', '마마마', '바바바', '사사사', '아아아', '자자자', '차차차', '카카카', '타타타', '파파파', '하하하', '민민민', '김김김', '홍길동', '아무개', '이이', '김김', '가나다', '감수성', '견본',	'김개똥', '김고객', '김도드', '김또깡', '김똘똘', '김머기', '김머님', '김옥띠', '김치치', '김호탕', '나여자', '나중에', '노늬니', '노짱', '다다', '동반자', '라영밍', '마눌님', '무우운', '미미미', '슈이롱', '심심이', '오오오', '요술반지', '용만이', '이르음', '이름이', '이무개', '쩐득아인', '테스트', '포켓', '하호도', '홍길', '훈타훈', '거식히', '개똥이'];
		var tel_filter = ['11111111', '11112222', '11113333', '11114444', '11115555', '11116666', '11117777', '11118888', '11119999', '22221111', '22222222', '22223333', '22224444', '22225555', '22226666', '22227777', '22228888', '22229999', '33331111', '33332222', '33333333', '33334444', '33335555', '33336666', '33337777', '33338888', '33339999', '44441111', '44442222', '44443333', '44444444', '44445555', '44446666', '44447777', '44448888', '44449999', '55551111', '55552222', '55553333', '55554444', '55555555', '55556666', '55557777', '55558888', '55559999', '66661111', '66662222', '66663333', '66664444', '66665555', '66666666', '66667777', '66668888', '66669999', '77771111', '77772222', '77773333', '77774444', '77775555', '77776666', '77777777', '77778888', '77779999', '88881111', '88882222', '88883333', '88884444', '88885555', '88886666', '88887777', '88888888', '88889999', '99991111', '99992222', '99993333', '99994444', '99995555', '99996666', '99997777', '99998888', '99999999', '12341234', '12340000', '12341111', '12342222', '12343333', '12344444', '12345555', '12346666', '12347777', '12348888', '12349999', '11111234', '22221234', '33331234', '44441234', '55551234', '66661234', '77771234', '88881234', '99991234', '11110000', '22220000', '33330000', '44440000', '55550000', '66660000', '77770000', '88880000', '99990000'];
		var tel_box_filter = ['1111', '2222', '3333', '4444', '5555', '6666', '7777', '8888', '9999', '0000', '1234'];

		var phonenum = tel1 + tel2 + tel3;

		if (name == "") {
			alert("이름을 입력해 주십시오.");
			$('#name2').focus();
			return;
		} else {
			if (name_filter.indexOf(name) > -1 || !chkName(name)) {
				alert("정확한 이름을 입력해 주십시오.");
				$('#name2').focus();
				return;
			} else {
			}
		}

		if(tel1 != "010"){
			alert("010으로 시작하는 휴대폰번호를 입력해 주세요");
			$('#tel1_2').focus();
			return;
		}

		if (!$('input:radio[name=gender2]').is(':checked')) {
			alert("성별을 선택해 주십시오.");
			$('#gender2_m').focus();
			return;
		}

		if (birth == "") {
			alert("생년월일을 입력해 주십시오.");
			$('#birth2').focus();
			return;
		} else {
			if (birth.length > 8 || birth.length < 8) {
				alert("올바른 생년월일을 입력해 주십시오.");
				$('#birth2').focus();
				return;
			} else {

			if (checkbirth2(birth) == true) {

				var age = calcAge(birth);
				var age2 = calcAge2(birth); // 만 나이 아닌 나이
				//console.log($("#wrap").attr('class'), birth, age2);
				if ($("#wrap").hasClass('driver')) {
					// driver: 한국 나이(age2) 기준 — 79세 이상 가입불가 / ~78세 가입 가능
					if (age2 < 20 || age2 >= 79) {
						alert("해당 연령은 가입이 어려운 상품 입니다.");
						return;
					}
				} else if ($("#wrap").hasClass('kids') || $("#wrap").hasClass('young') || $("#wrap").hasClass('pet')) {
					if (age2 >= 79) {
						alert("해당 연령은 가입이 어려운 상품 입니다.");
						return;
					}
				} else {
					if (age2 <= 19 || age2 >= 79) {
						alert("해당 연령은 가입이 어려운 상품 입니다.");
						return;
					}
				}

					if ($("#wrap").hasClass('dbhappyplus')) {
						// dbhappyplus: 19세 이하(2007년생~), 79세 이상(1947년생~) 가입불가 alert
						// 61~78세(1948~1965년생) 가입불가 안내(상담사 문구), 20~60세 가입 가능
						if (age2 <= 19 || age2 >= 79) {
							alert("해당 연령은 가입이 어려운 상품 입니다.");
							return;
						} else if (age2 >= 20 && age2 <= 60) { // 20~60세 가입 가능
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						} else { // 61~78세: 가입불가 안내 (상담사 문구)
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}
					}

					if ($("#wrap").hasClass('care')) {
						if (age2 <= 19 || age2 >= 79) { // 19세 이하 또는 79세 이상
							alert("해당 연령은 가입이 어려운 상품 입니다.");
							return;
						} else if (age2 >= 20 && age2 <= 60) { // 20세 이상 60세 이하 (가입가능)
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						} else { // 61세 이상 78세 이하 (가입불가안내팝업)
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}
					}

					if ($("#wrap").hasClass('cancer')) {
						// cancer: 19세 이하(2007년생~), 79세 이상(1947년생~) 가입불가 alert
						// 61~78세(1948~1965년생) 가입불가 안내(상담사 문구), 20~60세 가입 가능
						if (age2 <= 19 || age2 >= 79) {
							alert("해당 연령은 가입이 어려운 상품 입니다.");
							return;
						} else if (age2 >= 20 && age2 <= 60) { // 20~60세 가입 가능
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						} else { // 61~78세: 가입불가 안내 (상담사 문구)
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}
					}
	
					if ($("#wrap").hasClass('tome')) {
						// tome: 19세 이하(2007년생~), 79세 이상(1947년생~) 가입불가 alert
						// 50~78세(1948~1976년생) 가입불가 안내(상담사 문구), 20~49세 가입 가능
						if (age2 <= 19 || age2 >= 79) { // 19세 이하 또는 79세 이상
							alert("해당 연령은 가입이 어려운 상품 입니다.");
							return;
						} else if (age2 >= 20 && age2 <= 49) { // 20~49세 가입 가능
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						} else { // 50~78세: 가입불가 안내 (상담사 문구)
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}
					}


					if ($("#wrap").hasClass('familydementia')) {
						// familydementia: 19세 이하(2007년생~), 79세 이상(1947년생~) 가입불가 alert
						// 20~39세·71~78세 가입불가 안내(상담사 문구), 40~70세 가입 가능
						if (age2 <= 19 || age2 >= 79) { // 19세 이하 또는 79세 이상
							alert("해당 연령은 가입이 어려운 상품 입니다.");
							return;
						} else if (age2 >= 40 && age2 <= 70) { // 40~70세 가입 가능
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						} else { // 20~39세, 71~78세: 가입불가 안내 (상담사 문구)
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}
					}

					if ($("#wrap").hasClass('young')) {
						if (age2 <= 15 || age2 >= 79) { // 14세 이하 또는 79세 이상
							alert("해당 연령은 가입이 어려운 상품 입니다.");
							return;
						} else if (age2 >= 15 && age2 <= 40) { // 15세 이상 40세 이하 가입 가능
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						} else { 
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}
					}

					if ($("#wrap").hasClass('mental')) {
						if (age2 <= 19 || age2 >= 79) { // 19세 이하 또는 79세 이상
							alert("해당 연령은 가입이 어려운 상품 입니다.");
							return;
						} else if (age2 >= 20 && age2 <= 60) { // 20세 이상 60세 이하 가입 가능
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						} else { 
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}
					}

					if ($("#wrap").hasClass('hemilre')) {
						if (age2 <= 19 || age2 >= 79) { // 19세 이하 또는 79세 이상
							alert("해당 연령은 가입이 어려운 상품 입니다.");
							return;
						} else if (age2 >= 20 && age2 <= 60) { // 20세 이상 60세 이하 (가입가능)
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						} else { // 61세 이상 78세 이하 (가입불가안내팝업)
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}
					}
					
					var age = calcAge(birth);

					$('.agreePop').removeAttr('data-next-not');

					if( $("#wrap").hasClass('pet') ) {
						if (age < 0 || age > 10) {
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}else{
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						}
					} else if($("#wrap").hasClass('kids')) {
						if (age < 0 || age > 15) {
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}else{
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						}
					} else if($("#wrap").hasClass('goodsilver')) {
						if (age < 20 || age > 50) {
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}else{
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						}
					} else if($("#wrap").hasClass('tome311') ) {
						if (age < 20 || age > 55) {
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}else{
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						}
					} else if($("#wrap").hasClass('tomeplus') || $("#wrap").hasClass('tooth') ) {
						if (age < 20 || age > 60) {
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}else{
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						}
					} else if($("#wrap").hasClass('dbhappyplus') ) {
						// dbhappyplus: 20~60세 boxType2(가입가능), 61~78세 boxType1(상담사 안내)
						if (age2 >= 20 && age2 <= 60) {
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						} else {
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}
					} else if($("#wrap").hasClass('silson') || $("#wrap").hasClass('silbi') ) {
						if (age < 20 || age > 65) {
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}else{
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						}
					} else if($("#wrap").hasClass('motorcycle') ) {
						if (age < 20 || age > 70) {
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}else{
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						}
					} else if($("#wrap").hasClass('driver')) {
						// driver: age2(한국 나이) 기준 — ~78세 가입 가능
						if (age2 < 20 || age2 >= 79) {
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}else{
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						}
					} else if($("#wrap").hasClass('accident') || $("#wrap").hasClass('house') ) {
						if (age < 20 || age > 80) {
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}else{
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						}
					} else if($("#wrap").hasClass('seniorcare')) {
						if (age < 30 || age > 53) {
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}else{
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						}
					} else if($("#wrap").hasClass('familydementia')) {
						// familydementia: 40~70세 가입가능, 20~39세·71~78세 상담사 안내
						if (age2 >= 40 && age2 <= 70) { // 40~70세 가입 가능
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						} else { // 20~39세, 71~78세: 가입불가 안내 (상담사 문구)
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}
					}else if($("#wrap").hasClass('young')) {
						if (age < 15 || age > 40) {
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}else{
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						}
					}else if($("#wrap").hasClass('hemilre')) {
						// if (age < 20 || age > 60) {
						// 	$(".result .boxType1").show();
						// 	$(".result .boxType2").hide();
						// }else{
						// 	$(".result .boxType1").hide();
						// 	$(".result .boxType2").show();
						// }
					}else if($("#wrap").hasClass('care')) {
					}else if($("#wrap").hasClass('cancer')) {
						// cancer: 20~60세 boxType2(가입가능), 61~78세 boxType1(상담사 안내)
						if (age2 >= 20 && age2 <= 60) {
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						} else {
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}
					}else if($("#wrap").hasClass('tome')) {
						// tome: 20~49세 boxType2(가입가능), 50~78세 boxType1(상담사 안내)
						if (age2 >= 20 && age2 <= 49) {
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						} else {
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}
					}else if($("#wrap").hasClass('mental')) {
						if (age < 20 || age > 60) {
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}else{
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						}
					} else {
						if (age < 20 || age > 65) {
							$(".result .boxType1").show();
							$(".result .boxType2").hide();
						}else{
							$(".result .boxType1").hide();
							$(".result .boxType2").show();
						}
					}

					var currentDate = new Date();
					var inputDate = new Date(currentDate.getFullYear() + "-" + birth.substr(4, 2) + "-" + birth.substr(6, 4));
					inputDate.setMonth(inputDate.getMonth() - 6);

					if (currentDate > inputDate) {
						inputDate.setYear(inputDate.getFullYear() + 1);
					}

					var alert_year = inputDate.getFullYear();
					var alert_month = inputDate.getMonth() + 1;
					var alert_day = inputDate.getDate();

				} else {
					//alert("올바른 생년월일을 입력해 주십시오.");
					$('#birth2').focus();
					return;
				}

				
			}

		}

		if (tel1 == "" || tel1.length < 3) {
			alert("휴대전화를 입력해 주십시오.");
			$('#tel1_2').focus();
			return;
		} else if ((tel2 == "" || tel2.length < 4) || (tel_box_filter.indexOf(tel2) > -1)) {
			alert("휴대전화를 정확히 입력해 주십시오.");
			$('#tel2_2').focus();
			return;
		} else if ((tel3 == "" || tel3.length < 4) || (tel_box_filter.indexOf(tel3) > -1)) {
			alert("휴대전화를 정확히 입력해 주십시오.");
			$('#tel3_2').focus();
			return;
		} else {

			if (phonenum.length > 11 || phonenum.length < 11) {
				alert("올바른 연락처를 입력해 주십시오.");
				$('#tel1_2').focus();
				return;
			} else {
				var regExp_ctn = /(01[016789])([1-9]{1}[0-9]{2,3})([0-9]{4})$/;
				if (!regExp_ctn.test(phonenum)) {
					alert("올바른 연락처를 입력해 주십시오.");
					$('#tel1_2').focus();
					return;
				} else if (tel_filter.indexOf(phonenum.slice(-8)) > -1) {
					alert("올바른 연락처를 입력해 주십시오.");
					$('#tel1_2').focus();
					return;
				}
			}
		}

		$('.btnCheck').attr("onclick", "chkfrm2('" + gubun + "');");

	}

	

	$("input:radio[name='agreePop_1']:radio[value='n']").prop('checked', true);
	$("input:radio[name='agreePop_2']:radio[value='n']").prop('checked', true);
	$("input:radio[name='agreePop_3']:radio[value='n']").prop('checked', true);
	// $('.agreePop').css('display', 'block');

	
	
	/* 221101 수정 */
	if($("#wrap").hasClass("dbhappyplusOld")){
		$('.noticeBanner').css('display', 'block');
	}else{
		$('.agreePop').css('display', 'block');
	}

//	if($("#wrap").hasClass("dbhappyplus")){
//		$('.noticeBanner').css('display', 'block');
//	}else{
//		$('.agreePop').css('display', 'block');
//	}

	$(".noticeBanner .btns .btn2").click(function(){
		$('.noticeBanner').css('display', 'none');
		$('.agreePop').css('display', 'block');
	});

	$(".noticeBanner .btns .btn1").click(function(){
		$('.noticeBanner').css('display', 'none');
	});
	/* //221101 수정 */

}

function chkfrm(gubun) {// 폼 입력

	var nextNot = $('.agreePop').attr('data-next-not');

	var name = ($('#name').val());
	var tel1 = ($('#tel1').val());
	var tel2 = ($('#tel2').val());
	var tel3 = ($('#tel3').val());
	var birth = ($('#birth').val());
	var name_filter = ['임임임', '장장장', '조조조', '윤윤윤', '박박박', '정정정', '이이이', '강강강', '최최최', '김김김', '고고고', '가가가', '나나나', '다다다', '라라라', '마마마', '바바바', '사사사', '아아아', '자자자', '차차차', '카카카', '타타타', '파파파', '하하하', '민민민', '김김김', '홍길동', '아무개', '이이', '김김', '가나다', '감수성', '견본',	'김개똥', '김고객', '김도드', '김또깡', '김똘똘', '김머기', '김머님', '김옥띠', '김치치', '김호탕', '나여자', '나중에', '노늬니', '노짱', '다다', '동반자', '라영밍', '마눌님', '무우운', '미미미', '슈이롱', '심심이', '오오오', '요술반지', '용만이', '이르음', '이름이', '이무개', '쩐득아인', '테스트', '포켓', '하호도', '홍길', '훈타훈', '거식히', '개똥이'];

	var phonenum = tel1 + tel2 + tel3;

	var age = calcAge(birth);
	var currentDate = new Date();
	var inputDate = new Date(currentDate.getFullYear() + "-" + birth.substr(4, 2) + "-" + birth.substr(6, 4));
	inputDate.setMonth(inputDate.getMonth() - 6);

	if (currentDate > inputDate) {
		inputDate.setYear(inputDate.getFullYear() + 1);
	}

	var alert_year = inputDate.getFullYear();
	var alert_month = inputDate.getMonth() + 1;
	var alert_day = inputDate.getDate();


	var visit_date = getCookie("visit_date") == "" ? getTimeStamp() : getCookie("visit_date");
	var visit_code = getCookie("visit_code") == "" ? getAllUrlParams().jehusa_cd == undefined ? "" : getAllUrlParams().jehusa_cd : getCookie("visit_code");
	var utm_source = getCookie("utm_source") == "" ? getAllUrlParams().utm_source == undefined ? "" : getAllUrlParams().utm_source : getCookie("utm_source");
	var utm_medium = getCookie("utm_medium") == "" ? getAllUrlParams().utm_medium == undefined ? "" : getAllUrlParams().utm_medium : getCookie("utm_medium");
	var utm_campaign = getCookie("utm_campaign") == "" ? getAllUrlParams().utm_campaign == undefined ? "" : getAllUrlParams().utm_campaign : getCookie("utm_campaign");
	var utm_term = getCookie("utm_term") == "" ? getAllUrlParams().utm_term == undefined ? "" : getAllUrlParams().utm_term : getCookie("utm_term");
	var url_parmas = getCookie("url_parmas") == "" ? getAllUrlParams().url_parmas == undefined ? "" : getAllUrlParams().url_parmas : getCookie("url_parmas");

	var urlParams = "&visit_date="+encodeURI(visit_date)+"&visit_code="+visit_code+"&utm_source="+utm_source+"&utm_medium="+utm_medium+"&utm_campaign="+utm_campaign+"&utm_term="+encodeURI(utm_term)+"&url_parmas="+encodeURI(url_parmas);


	if (gubun == "cal") {



		if ($(":input:radio[name=agreePop_1]:checked").val() != "y") {
			$("#agreePop_1_warn").addClass("on");
			return;
		} else {
			$("#agreePop_1_warn").removeClass("on");
		}

		if ($(":input:radio[name=agreePop_2]:checked").val() != "y") {
			$("#agreePop_2_warn").addClass("on");
			return;
		} else {
			$("#agreePop_2_warn").removeClass("on");
		}

		if ($(":input:radio[name=agreePop_3]:checked").val() != "y") {
			$("#agreePop_3_warn").addClass("on");
			return;
		} else {
			$("#agreePop_3_warn").removeClass("on");
		}

		$('.agreePop').css('display', 'none');

		if (nextNot == '1') {
			$(".result").attr('data-next-not', '1');
			$(".result").show();
		} else {

			var check_agree = true;
			var queryString = $("form[name=frm]").serialize();
			queryString = queryString + "&check_agree=" + check_agree + "&age=" + age + urlParams + "&type=1";
			//console.log(queryString);

			$.ajax({
				url : "../process/getPremiumValue.php",
				type : "POST",
				dataType : 'html',
				data : queryString,
				success : function(result) {
					if (result == "error") {
						alert("처리중 오류가 발생하였습니다.\n관리자에게 문의 주시기 바랍니다.");
					} else {

						$('.rname').text(name);
						$('.yyyy').text(alert_year);
						$('.mm').text(alert_month);
						$('.dd').text(alert_day);
						$(".btnCall").attr("href", "javascript:void(0);javascript:chkfrm('tel')");

						$('.rst').html('<div class="type">월 <span class="fee orange">' + result + '</span><span class="orange">원</span><span class="txt">입니다</span></div><p class="cauTxt">위 보험료는 대표플랜에 대한 예시 보험료이며, <br/>피보험자와 계약내용에 따라 달라질 수 있습니다.</p>');

						gtag('event', 'click', {
							'event_category' : 'insucalculate',
							'event_label' : 'action'
						});

						//adn_btn_ok('103658','types1');

						// Criteo 세일즈 태그
						window.criteo_q = window.criteo_q || [];
						var deviceType = /iPad/.test(navigator.userAgent) ? "t" : /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Silk/.test(navigator.userAgent) ? "m" : "d";
						window.criteo_q.push(
							{ event: "setAccount", account: 89292},
							{ event: "setSiteType", type: deviceType},
							{ event: "trackTransaction", id: Math.floor(Math.random()*99999999999), item: [
									{id: "1", price: 1, quantity: 1 }
								]}
						);

						var mediaCode = ($('#JEHUSA_CD').val());
						if(mediaCode == "C5347" || mediaCode == "C5311" || mediaCode == "C5345" || mediaCode == "C5342" || mediaCode == "C5381" || mediaCode=="C5380") {

							if(mediaCode == "C5347" || mediaCode == "C5311") { // 종합보험
								gtag('event', 'conversion', {
									'send_to': 'AW-432190664/_3dGCPe014EDEMjpis4B',
									'value': 1.0
								});
							} else if (mediaCode == "C5345" || mediaCode == "C5342") { // 간편보험
								gtag('event', 'conversion', {
									'send_to': 'AW-432190664/rszICPO004EDEMjpis4B',
									'value': 1.0
								});
							} else if (mediaCode == "C5380") { // 화재보험
								gtag('event', 'conversion', {
									'send_to': 'AW-432190664/Vt2YCPXGnJEDEMjpis4B',
									'value': 1.0
								});
							}

							if (mediaCode != "C5380") { // 화재보험
								//FaceBook pixel-begin
								fbq('track', 'Lead');
								//FaceBook pixel-end
							}
						}

						var _nasa={};
						if(window.wcs) {
							_nasa["cnv"] = wcs.cnv("4","1"); // 전환유형, 전환가치 설정해야함. 설치매뉴얼 참고
							wcs_do(_nasa);
						}

					gtag('event', 'click', {
						'event_category' : 'insucalculate1',
						'event_label' : 'action'
					});

					$(".result").show();
					}
				}
			});
		}

	} else {

		if ($(":input:radio[name=agreePop_1]:checked").val() != "y") {
			$("#agreePop_1_warn").addClass("on");
			return;
		} else {
			$("#agreePop_1_warn").removeClass("on");
		}

		if ($(":input:radio[name=agreePop_2]:checked").val() != "y") {
			$("#agreePop_2_warn").addClass("on");
			return;
		} else {
			$("#agreePop_2_warn").removeClass("on");
		}

		if ($(":input:radio[name=agreePop_3]:checked").val() != "y") {
			$("#agreePop_3_warn").addClass("on");
			return;
		} else {
			$("#agreePop_3_warn").removeClass("on");
		}

		$('.agreePop').css('display', 'none');

		if (nextNot == '1') {
			$(".result").attr('data-next-not', '1');
			$(".result").show();
		} else {

			var check_agree = true;
			var queryString = $("form[name=frm]").serialize();
			queryString = queryString + "&check_agree=" + check_agree + urlParams + "&type=1";

			$.ajax({
				url : "../process/getCallProcess.php",
				type : "POST",
				dataType : 'html',
				data : queryString,
				success : function(result) {

					if (result.indexOf("SUCCESS") != -1) {

						gtag('event', 'click', {
							'event_category' : 'insutel',
							'event_label' : 'action'
						});

						//adn_btn_ok('103658','types1');

						// Criteo 세일즈 태그
						window.criteo_q = window.criteo_q || [];
						var deviceType = /iPad/.test(navigator.userAgent) ? "t" : /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Silk/.test(navigator.userAgent) ? "m" : "d";
						window.criteo_q.push(
							{ event: "setAccount", account: 89292},
							{ event: "setSiteType", type: deviceType},
							{ event: "trackTransaction", id: Math.floor(Math.random()*99999999999), item: [
									{id: "2", price: 1, quantity: 1 }
								]}
						);


						var mediaCode = ($('#JEHUSA_CD').val());
						if(mediaCode == "C5347" || mediaCode == "C5311" || mediaCode == "C5345" || mediaCode == "C5342" || mediaCode == "C5381" || mediaCode=="C5380") {

							if(mediaCode == "C5347" || mediaCode == "C5311") { // 종합보험
								gtag('event', 'conversion', {
									'send_to': 'AW-432190664/QoLBCPrfqoEDEMjpis4B',
									'value': 1.0
								});
							} else if (mediaCode == "C5345" || mediaCode == "C5342") { // 간편보험
								gtag('event', 'conversion', {
									'send_to': 'AW-432190664/8_PoCOvS14EDEMjpis4B',
									'value': 1.0
								});
							} else if (mediaCode == "C5380") { // 화재보험
								gtag('event', 'conversion', {
									'send_to': 'AW-432190664/QKY-CPLVnJEDEMjpis4B',
									'value': 1.0
								});
							}

							if (mediaCode != "C5380") { // 화재보험
								//FaceBook pixel-begin
								fbq('track', 'Lead');
								//FaceBook pixel-end
							}
						}


						var _nasa={};
						if(window.wcs) {
							_nasa["cnv"] = wcs.cnv("4","1"); // 전환유형, 전환가치 설정해야함. 설치매뉴얼 참고
							wcs_do(_nasa);
						}

						gtag('event', 'click', {
							'event_category' : 'insutel1',
							'event_label' : 'action'
						});

						setTimeout(function() {
							alert("정상적으로 신청되었습니다.");
							//$('.consult_newyear').show();//설날전용
							$(".result").hide();
						}, 1000);

					} else {
						alert("처리중 오류가 발생하였습니다.\n(" + result + ")\n관리자에게 문의 주시기 바랍니다.");
					}

				}
			});
		}

	}

}

function chkfrm2(gubun) {// 폼 입력

	var nextNot = $('.agreePop').attr('data-next-not');

	var name = ($('#name2').val());
	var phonenum = ($('#phonenum').val());
	var birth = ($('#birth2').val());
	var name_filter = ['임임임', '장장장', '조조조', '윤윤윤', '박박박', '정정정', '이이이', '강강강', '최최최', '김김김', '고고고', '가가가', '나나나', '다다다', '라라라', '마마마', '바바바', '사사사', '아아아', '자자자', '차차차', '카카카', '타타타', '파파파', '하하하', '민민민', '김김김', '홍길동', '아무개', '이이', '김김', '가나다'];

	var age = calcAge(birth);
	var currentDate = new Date();
	var inputDate = new Date(currentDate.getFullYear() + "-" + birth.substr(4, 2) + "-" + birth.substr(6, 4));
	inputDate.setMonth(inputDate.getMonth() - 6);

	if (currentDate > inputDate) {
		inputDate.setYear(inputDate.getFullYear() + 1);
	}

	var alert_year = inputDate.getFullYear();
	var alert_month = inputDate.getMonth() + 1;
	var alert_day = inputDate.getDate();

	var visit_date = getCookie("visit_date") == "" ? getTimeStamp() : getCookie("visit_date");
	var visit_code = getCookie("visit_code") == "" ? getAllUrlParams().jehusa_cd == undefined ? "" : getAllUrlParams().jehusa_cd : getCookie("visit_code");
	var utm_source = getCookie("utm_source") == "" ? getAllUrlParams().utm_source == undefined ? "" : getAllUrlParams().utm_source : getCookie("utm_source");
	var utm_medium = getCookie("utm_medium") == "" ? getAllUrlParams().utm_medium == undefined ? "" : getAllUrlParams().utm_medium : getCookie("utm_medium");
	var utm_campaign = getCookie("utm_campaign") == "" ? getAllUrlParams().utm_campaign == undefined ? "" : getAllUrlParams().utm_campaign : getCookie("utm_campaign");
	var utm_term = getCookie("utm_term") == "" ? getAllUrlParams().utm_term == undefined ? "" : getAllUrlParams().utm_term : getCookie("utm_term");
	var url_parmas = getCookie("url_parmas") == "" ? getAllUrlParams().url_parmas == undefined ? "" : getAllUrlParams().url_parmas : getCookie("url_parmas");

	var urlParams = "&visit_date="+encodeURI(visit_date)+"&visit_code="+visit_code+"&utm_source="+utm_source+"&utm_medium="+utm_medium+"&utm_campaign="+utm_campaign+"&utm_term="+encodeURI(utm_term)+"&url_parmas="+encodeURI(url_parmas);


	if (gubun == "cal") {



		if ($(":input:radio[name=agreePop_1]:checked").val() != "y") {
			$("#agreePop_1_warn").addClass("on");
			return;
		} else {
			$("#agreePop_1_warn").removeClass("on");
		}

		if ($(":input:radio[name=agreePop_2]:checked").val() != "y") {
			$("#agreePop_2_warn").addClass("on");
			return;
		} else {
			$("#agreePop_2_warn").removeClass("on");
		}

		if ($(":input:radio[name=agreePop_3]:checked").val() != "y") {
			$("#agreePop_3_warn").addClass("on");
			return;
		} else {
			$("#agreePop_3_warn").removeClass("on");
		}

		$('.agreePop').css('display', 'none');

		if (nextNot == '1') {
			$(".result").attr('data-next-not', '1');
			$(".result").show();
		} else {

			var check_agree = true;
			var queryString = $("form[name=frm2]").serialize();
			queryString = queryString + "&check_agree=" + check_agree + "&age=" + age + urlParams + "&type=2";
			//console.log(queryString);

			$.ajax({
				url : "../process/getPremiumValue.php",
				type : "POST",
				dataType : 'html',
				data : queryString,
				success : function(result) {
					if (result == "error") {
						alert("처리중 오류가 발생하였습니다.\n관리자에게 문의 주시기 바랍니다.");
					} else {

						$('.rname').text(name);
						$('.yyyy').text(alert_year);
						$('.mm').text(alert_month);
						$('.dd').text(alert_day);
						$(".btnCall").attr("href", "javascript:void(0);javascript:chkfrm2('tel')");

						$('.rst').html('<div class="type">월 <span class="fee orange">' + result + '</span><span class="orange">원</span><span class="txt">입니다</span></div><p class="cauTxt">위 보험료는 대표플랜에 대한 예시 보험료이며, <br/>피보험자와 계약내용에 따라 달라질 수 있습니다.</p>');

						gtag('event', 'click', {
							'event_category' : 'insucalculate',
							'event_label' : 'action'
						});

						var _nasa={};
						if(window.wcs) {
							_nasa["cnv"] = wcs.cnv("4","1"); // 전환유형, 전환가치 설정해야함. 설치매뉴얼 참고
							wcs_do(_nasa);
						}

					gtag('event', 'click', {
						'event_category' : 'insucalculate2',
						'event_label' : 'action'
					});

					$(".result").show();
					}
				}
			});
		}

	} else {

		if ($(":input:radio[name=agreePop_1]:checked").val() != "y") {
			$("#agreePop_1_warn").addClass("on");
			return;
		} else {
			$("#agreePop_1_warn").removeClass("on");
		}

		if ($(":input:radio[name=agreePop_2]:checked").val() != "y") {
			$("#agreePop_2_warn").addClass("on");
			return;
		} else {
			$("#agreePop_2_warn").removeClass("on");
		}

		if ($(":input:radio[name=agreePop_3]:checked").val() != "y") {
			$("#agreePop_3_warn").addClass("on");
			return;
		} else {
			$("#agreePop_3_warn").removeClass("on");
		}

		$('.agreePop').css('display', 'none');


		if (nextNot == '1') {
			$(".result").attr('data-next-not', '1');
			$(".result").show();
		} else {

			var check_agree = true;
			var queryString = $("form[name=frm2]").serialize();
			queryString = queryString + "&check_agree=" + check_agree + urlParams + "&type=2";

			$.ajax({
				url : "../process/getCallProcess.php",
				type : "POST",
				dataType : 'html',
				data : queryString,
				success : function(result) {

					if (result.indexOf("SUCCESS") != -1) {

						gtag('event', 'click', {
							'event_category' : 'insutel',
							'event_label' : 'action'
						});

						var _nasa={};
						if(window.wcs) {
							_nasa["cnv"] = wcs.cnv("4","1"); // 전환유형, 전환가치 설정해야함. 설치매뉴얼 참고
							wcs_do(_nasa);
						}

						gtag('event', 'click', {
							'event_category' : 'insutel2',
							'event_label' : 'action'
						});

						setTimeout(function() {
							alert("정상적으로 신청되었습니다.");
							//$('.consult_newyear').show();//설날전용
							$(".result").hide();
						}, 1000);

					} else {
						alert("처리중 오류가 발생하였습니다.\n(" + result + ")\n관리자에게 문의 주시기 바랍니다.");
					}

				}
			});
		}

	}

}

function checkbirth(birth) {

	var b1 = birth.substr(0,1);
	if( b1 != "1" && b1 != "2" ){
		alert("올바른 생년월일을 입력해주세요.");
		$('#birth').focus();
		return false;
	}

	if (birth.length > 5) {

		var month_arr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

		if (month_arr.indexOf(birth.substr(4, 2)) < 0) {
			alert("올바른 생년월일을 입력해주세요.");
			$('#birth').focus();
			return false;
		} else {
			if (birth.length == 8) {
				if (birth.substr(4, 2) == "02") {
					if (birth.substr(6, 2) > 29) {
						alert("올바른 생년월일을 입력해주세요.");
						$('#birth').focus();
						return false;
					} else {
						return true;
					}
				} else if (birth.substr(4, 2) == "04") {
					if (birth.substr(6, 2) > 30) {
						alert("올바른 생년월일을 입력해주세요.");
						$('#birth').focus();
						return false;
					} else {
						return true;
					}
				} else if (birth.substr(4, 2) == "06") {
					if (birth.substr(6, 2) > 30) {
						alert("올바른 생년월일을 입력해주세요.");
						$('#birth').focus();
						return false;
					} else {
						return true;
					}
				} else if (birth.substr(4, 2) == "09") {
					if (birth.substr(6, 2) > 30) {
						alert("올바른 생년월일을 입력해주세요.");
						$('#birth').focus();
						return false;
					} else {
						return true;
					}
				} else if (birth.substr(4, 2) == "11") {
					if (birth.substr(6, 2) > 30) {
						alert("올바른 생년월일을 입력해주세요.");
						$('#birth').focus();
						return false;
					} else {
						return true;
					}
				} else {
					if (birth.substr(6, 2) > 31) {
						alert("올바른 생년월일을 입력해주세요.");
						$('#birth').focus();
						return false;
					} else {
						return true;
					}
				}
			}
		}

	}
}

function checkbirth2(birth) {

	var b1 = birth.substr(0,1);
	if( b1 != "1" && b1 != "2" ){
		alert("올바른 생년월일을 입력해주세요.");
		$('#birth').focus();
		return false;
	}

	if (birth.length > 5) {

		var month_arr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

		if (month_arr.indexOf(birth.substr(4, 2)) < 0) {
			alert("올바른 생년월일을 입력해주세요.");
			$('#birth2').focus();
			return false;
		} else {
			if (birth.length == 8) {
				if (birth.substr(4, 2) == "02") {
					if (birth.substr(6, 2) > 29) {
						alert("올바른 생년월일을 입력해주세요.");
						$('#birth2').focus();
						return false;
					} else {
						return true;
					}
				} else if (birth.substr(4, 2) == "04") {
					if (birth.substr(6, 2) > 30) {
						alert("올바른 생년월일을 입력해주세요.");
						$('#birth2').focus();
						return false;
					} else {
						return true;
					}
				} else if (birth.substr(4, 2) == "06") {
					if (birth.substr(6, 2) > 30) {
						alert("올바른 생년월일을 입력해주세요.");
						$('#birth2').focus();
						return false;
					} else {
						return true;
					}
				} else if (birth.substr(4, 2) == "09") {
					if (birth.substr(6, 2) > 30) {
						alert("올바른 생년월일을 입력해주세요.");
						$('#birth2').focus();
						return false;
					} else {
						return true;
					}
				} else if (birth.substr(4, 2) == "11") {
					if (birth.substr(6, 2) > 30) {
						alert("올바른 생년월일을 입력해주세요.");
						$('#birth2').focus();
						return false;
					} else {
						return true;
					}
				} else {
					if (birth.substr(6, 2) > 31) {
						alert("올바른 생년월일을 입력해주세요.");
						$('#birth2').focus();
						return false;
					} else {
						return true;
					}
				}
			}
		}

	}
}

function checkphonenum(phone) {
	if (phone.length == 3) {
		if (phone == "000") {
			alert("올바른 전화번호를 입력해 주세요.");
			$('#tel1').focus();
			return false;
		} else {
			return true;
		}
	} else {
		return false;
	}
}

function checkphonenum2(phone) {
	if (phone.length == 3) {
		if (phone == "000") {
			alert("올바른 전화번호를 입력해 주세요.");
			$('#phonenum').focus();
			return false;
		} else {
			return true;
		}
	} else {
		return false;
	}
}