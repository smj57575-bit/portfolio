<?php
/**
 * 가이드·PC 공통 구조화 데이터 단일 관리
 * - driver-01: 아래 [1]~[5] JSON-LD 고정 출력
 * - 그 외: [1] Organization 공통(E-E-A-T) 
 */
if (!function_exists('db_print_guide_geo_meta')) {
	function db_print_guide_geo_meta($schema_key = '') {
		if ($schema_key === 'driver-01') {
      echo "\t<meta name=\"image\" content=\"https://dbinsure.co.kr/images/DB_metatag_thum_img_driver.jpg\">\n";
			echo "\t<meta name=\"twitter:image\" content=\"https://dbinsure.co.kr/images/DB_metatag_thum_img_driver.jpg\">\n";
      echo "\t<meta property=\"og:image\" content=\"https://dbinsure.co.kr/images/DB_metatag_thum_img_driver.jpg\">\n";
			echo "\t<meta property=\"article:published_time\" content=\"2026-04-06T00:00:00+09:00\">\n";
			echo "\t<meta property=\"article:author\" content=\"DB손해보험\">\n";
			echo "\t<meta property=\"article:section\" content=\"보험 가이드\">\n";
			echo "\t<meta name=\"language\" content=\"ko\">\n";
			echo "\t<link rel=\"canonical\" href=\"https://dbinsure.co.kr/guide/driver-01\">\n";
			echo "\t<link rel=\"alternate\" hreflang=\"ko\" href=\"https://dbinsure.co.kr/guide/driver-01\">\n";
			return;
		}

		if ($schema_key === 'care-01') {
			echo "\t<meta name=\"image\" content=\"https://dbinsure.co.kr/images/DB_metatag_thum_img_care.jpg\">\n";
			echo "\t<meta name=\"twitter:image\" content=\"https://dbinsure.co.kr/images/DB_metatag_thum_img_care.jpg\">\n";
      echo "\t<meta property=\"og:image\" content=\"https://dbinsure.co.kr/images/DB_metatag_thum_img_care.jpg\">\n";
			echo "\t<meta property=\"article:published_time\" content=\"2026-04-09T00:00:00+09:00\">\n";
			echo "\t<meta property=\"article:author\" content=\"DB손해보험\">\n";
			echo "\t<meta property=\"article:section\" content=\"보험 가이드\">\n";
			echo "\t<meta name=\"language\" content=\"ko\">\n";
			echo "\t<link rel=\"canonical\" href=\"https://dbinsure.co.kr/guide/care-01\">\n";
			echo "\t<link rel=\"alternate\" hreflang=\"ko\" href=\"https://dbinsure.co.kr/guide/care-01\">\n";
		}

    if ($schema_key === 'tome-01') {
		echo "\t<meta name=\"image\" content=\"https://dbinsure.co.kr/images/DB_metatag_thum_img_tome.jpg\">\n";
		echo "\t<meta name=\"twitter:image\" content=\"https://dbinsure.co.kr/images/DB_metatag_thum_img_tome.jpg\">\n";
		echo "\t<meta property=\"og:image\" content=\"https://dbinsure.co.kr/images/DB_metatag_thum_img_tome.jpg\">\n";
      echo "\t<meta property=\"article:published_time\" content=\"2026-04-16T00:00:00+09:00\">\n";
		echo "\t<meta property=\"article:author\" content=\"DB손해보험\">\n";
		echo "\t<meta property=\"article:section\" content=\"보험 가이드\">\n";
		echo "\t<meta name=\"language\" content=\"ko\">\n";
		echo "\t<link rel=\"canonical\" href=\"https://dbinsure.co.kr/guide/tome-01\">\n";
		echo "\t<link rel=\"alternate\" hreflang=\"ko\" href=\"https://dbinsure.co.kr/guide/tome-01\">\n";
	}

	if ($schema_key === 'dbhappyplus-01') {
		echo "\t<meta name=\"image\" content=\"https://dbinsure.co.kr/images/DB_metatag_thum_img_dbhappyplus.jpg\">\n";
		echo "\t<meta property=\"og:image\" content=\"https://dbinsure.co.kr/images/DB_metatag_thum_img_dbhappyplus.jpg\">\n";
		echo "\t<meta name=\"twitter:image\" content=\"https://dbinsure.co.kr/images/DB_metatag_thum_img_dbhappyplus.jpg\">\n";
		echo "\t<meta property=\"article:published_time\" content=\"2026-04-23T00:00:00+09:00\">\n";
		echo "\t<meta property=\"article:author\" content=\"DB손해보험\">\n";
		echo "\t<meta property=\"article:section\" content=\"보험 가이드\">\n";
		echo "\t<meta name=\"language\" content=\"ko\">\n";
		echo "\t<link rel=\"canonical\" href=\"https://dbinsure.co.kr/guide/dbhappyplus-01\">\n";
		echo "\t<link rel=\"alternate\" hreflang=\"ko\" href=\"https://dbinsure.co.kr/guide/dbhappyplus-01\">\n";
	}
}
}

if (!function_exists('db_get_insurance_agency_schemas')) {
	/** [1] Organization JSON-LD*/
	function db_get_insurance_agency_schemas($schema_key = '') {
		$offers = ['운전자보험', '암보험', '건강보험', '실비보험', '간병보험'];

		$page_to_index = [
			'cancer-01' => 1,
			'tome-01' => 2,
			'dbhappyplus-01' => 3,
			'care-01' => 4,
		];

		$build = function ($serviceName) {
			return [
				'@context' => 'https://schema.org',
				'@type' => 'OfferCatalog',
				'name' => '보험 상품 목록',
				'itemListElement' => [
					[
						'@type' => 'Offer',
						'itemOffered' => [
							'@type' => 'Service',
							'name' => $serviceName,
						],
					],
				],
			];
		};

		if ($schema_key !== '' && isset($page_to_index[$schema_key])) {
			return [$build($offers[$page_to_index[$schema_key]])];
		}

		$out = [];
		foreach ($offers as $name) {
			$out[] = $build($name);
		}
		return $out;
	}
}

if (!function_exists('db_print_insurance_agency_json_ld')) {
	function db_print_insurance_agency_json_ld($schema_key = '') {
		$flags = JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES;
		foreach (db_get_insurance_agency_schemas($schema_key) as $schema) {
			echo "\t<script type=\"application/ld+json\">" . json_encode($schema, $flags) . "</script>\n";
		}
	}
}

if (!function_exists('db_print_guide_structured_data')) {
	function db_print_guide_structured_data($schema_key = '') {
		if ($schema_key === 'driver-01') {
			echo <<<'HTML'
<!-- ================================================== -->
<!-- SEO·GEO 구조화 데이터 (기존 Structured Data 교체) -->
<!-- 적용일: 2026-04-06 | 담당: DB손해보험 SEO팀        -->
<!-- ================================================== -->

<!-- [1] Organization: E-E-A-T 강화 (전체 사이트 공통) -->
<script type="application/ld+json">
{ "@context": "https://schema.org", "@type": "InsuranceAgency",
  "name": "DB손해보험", "alternateName": "DB Insurance",
  "url": "https://dbinsure.co.kr",
  "logo": { "@type": "ImageObject", "url": "https://dbinsure.co.kr/images/new2023_logo.png", "width": 200, "height": 60 },
  "description": "DB손해보험은 1962년 설립된 대한민국 대표 손해보험사입니다.",
  "foundingDate": "1962",
  "address": { "@type": "PostalAddress", "addressCountry": "KR", "addressRegion": "서울특별시" },
  "contactPoint": { "@type": "ContactPoint", "telephone": "1588-0100", "contactType": "customer service" },
  "sameAs": [ "https://www.instagram.com/db_insurance", "https://www.youtube.com/@DBinsurance" ],
  "knowsAbout": ["운전자보험","자동차보험","형사합의금","12대 중과실 사고","교통사고처리지원금"],
  "areaServed": { "@type": "Country", "name": "대한민국" }
}
</script>

<!-- [2] BreadcrumbList: 검색결과 경로 표시 -->
<script type="application/ld+json">
{ "@context": "https://schema.org", "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "홈",           "item": "https://dbinsure.co.kr" },
    { "@type": "ListItem", "position": 2, "name": "보험 가이드",   "item": "https://dbinsure.co.kr/guide_info" },
    { "@type": "ListItem", "position": 3, "name": "운전자보험 가이드", "item": "https://dbinsure.co.kr/guide/driver-01" }
  ]
}
</script>

<!-- [3] Article + Speakable: 문서 정체성 + 음성 최적화 -->
<script type="application/ld+json">
{ "@context": "https://schema.org", "@type": "Article",
  "headline": "운전자보험은 왜 필요할까요? 자동차보험이 있는데도 필요한가요?",
  "description": "자동차보험만으로는 부족한 운전자의 형사·민사 책임, 비갱신형과 갱신형 차이, 주요 담보 구성까지 DB손해보험이 정리했습니다.",
  "url": "https://dbinsure.co.kr/guide/driver-01",
  "datePublished": "2026-03-25", "dateModified": "2026-04-06", "inLanguage": "ko-KR",
  "author": { "@type": "Organization", "name": "DB손해보험", "url": "https://dbinsure.co.kr" },
  "publisher": { "@type": "Organization", "name": "DB손해보험",
    "logo": { "@type": "ImageObject", "url": "https://dbinsure.co.kr/images/new2023_logo.png" }
  },
  "image": { "@type": "ImageObject", "url": "https://dbinsure.co.kr/images/DB_metatag_thum_img_driver.jpg", "width": 1200, "height": 630 },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://dbinsure.co.kr/guide/driver-01" },
  "keywords": "운전자보험, 자동차보험 차이, 교통사고처리지원금, 변호사선임비, 자동차사고벌금, 12대중과실, 스쿨존",
  "about": [
    {"@type":"Thing","name":"운전자보험"}, {"@type":"Thing","name":"교통사고처리지원금"},
    {"@type":"Thing","name":"변호사선임비"}, {"@type":"Thing","name":"12대 중과실 사고"}
  ],
  "speakable": { "@type": "SpeakableSpecification",
    "cssSelector": ["#sec02","#sec03","#sec04","#blog-article-title"] }
}
</script>

<!-- [4] FAQPage: AI 인용 핵심 / Rich Snippet 생성 -->
<script type="application/ld+json">
{ "@context": "https://schema.org", "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "운전자보험과 자동차보험은 어떻게 다른가요?",
      "acceptedAnswer": { "@type": "Answer", "text": "자동차보험은 사고로 인한 상대방의 피해(대인·대물)를 보장하는 의무보험입니다. 반면 운전자보험은 교통사고 후 운전자 본인이 부담하는 형사적 비용(형사합의금, 변호사선임비, 벌금)을 보장하는 선택 보험입니다. 즉, 자동차보험이 보장하지 않는 운전자의 법적 부담을 보완합니다." }},
    { "@type": "Question", "name": "자동차보험에 가입했는데도 운전자보험이 필요한가요?",
      "acceptedAnswer": { "@type": "Answer", "text": "네, 필요합니다. 신호위반·스쿨존 사고 등 12대 중과실 사고는 자동차보험 가입 여부와 무관하게 형사처벌을 받을 수 있습니다. 피해자와 합의해도 형사 처벌이 병행될 수 있으며, 형사합의금·벌금·변호사 비용이 발생합니다. 자동차보험은 이런 형사 비용을 보장하지 않으므로 운전자보험이 별도로 필요합니다." }},
    { "@type": "Question", "name": "운전자보험 3대 핵심 보장이 무엇인가요?",
      "acceptedAnswer": { "@type": "Answer", "text": "운전자보험의 3대 핵심 보장은 ① 교통사고처리지원금(형사합의금 지원), ② 변호사선임비용(경찰 조사~재판 법률 비용), ③ 자동차사고벌금(법원 벌금형 비용)입니다." }},
    { "@type": "Question", "name": "교통사고처리지원금이란 무엇인가요?",
      "acceptedAnswer": { "@type": "Answer", "text": "교통사고처리지원금은 중과실 사고나 사망·중상해 사고 발생 시 피해자와의 형사합의에 필요한 비용을 보장하는 특약입니다. DB손해보험은 공탁금을 보장 한도 70% 내에서 100% 전액 선지급합니다." }},
    { "@type": "Question", "name": "12대 중과실 사고란 무엇인가요?",
      "acceptedAnswer": { "@type": "Answer", "text": "12대 중과실 사고란 신호위반, 과속, 어린이보호구역 안전운전의무 위반 등으로 자동차보험 가입 여부와 관계없이 형사처벌을 받을 수 있는 교통사고 유형입니다." }},
    { "@type": "Question", "name": "운전자보험 가입 전 어떤 사항을 체크해야 하나요?",
      "acceptedAnswer": { "@type": "Answer", "text": "① 3대 핵심 보장 한도, ② 변호사선임비 보장 개시 시점(경찰 조사 단계부터인지), ③ 12대 중과실·스쿨존 사고 포함 여부, ④ 치료비·간병인 특약 필요 여부, ⑤ 비갱신형/갱신형 방식을 확인하세요." }}
  ]
}
</script>

<!-- [5] HowTo: 체크리스트 단계 구조화 -->
<script type="application/ld+json">
{ "@context": "https://schema.org", "@type": "HowTo",
  "name": "나에게 맞는 운전자보험 가입 전 체크리스트",
  "description": "운전자보험 가입 전 실제 사고 상황에 도움이 되는지를 기준으로 5가지 핵심 항목을 점검하는 체크리스트입니다.",
  "totalTime": "PT5M",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "3대 핵심 보장 한도 확인",
      "text": "형사합의금·변호사비·벌금 한도가 실제 사고 시 부담 금액을 충당할 수 있는지 확인합니다.",
      "url": "https://dbinsure.co.kr/guide/driver-01#sec04" },
    { "@type": "HowToStep", "position": 2, "name": "변호사선임비 보장 개시 시점 확인",
      "text": "경찰 조사 단계부터 보장되는지, 기소 이후부터 보장되는지 확인합니다.",
      "url": "https://dbinsure.co.kr/guide/driver-01#sec04" },
    { "@type": "HowToStep", "position": 3, "name": "중과실 사고 보장 범위 확인",
      "text": "12대 중과실 및 스쿨존 사고 포함 여부를 확인합니다.",
      "url": "https://dbinsure.co.kr/guide/driver-01#sec04" },
    { "@type": "HowToStep", "position": 4, "name": "운전 패턴에 맞는 특약 확인",
      "text": "치료비·간병인·수술비 특약이 본인의 운전 패턴에 필요한지 확인합니다.",
      "url": "https://dbinsure.co.kr/guide/driver-01#sec04" },
    { "@type": "HowToStep", "position": 5, "name": "보장 기간 및 갱신 방식 확인",
      "text": "비갱신형/갱신형 등 보장 기간과 갱신 방식이 합리적인지 확인합니다.",
      "url": "https://dbinsure.co.kr/guide/driver-01#sec04" }
  ]
}
</script>

HTML;
			return;
		}

		if ($schema_key === 'care-01') {
			echo <<<'HTML'
<!-- ================================================== -->
<!-- SEO·GEO 구조화 데이터 — care-01 전용              -->
<!-- 적용일: 2026-04-07 | 대상: /guide/care-01         -->
<!-- ================================================== -->

<!-- [1] Organization: care 도메인 맞춤 (knowsAbout 교체) -->
<script type="application/ld+json">
{ "@context": "https://schema.org", "@type": "InsuranceAgency",
  "name": "DB손해보험", "alternateName": "DB Insurance",
  "url": "https://dbinsure.co.kr",
  "logo": { "@type": "ImageObject", "url": "https://dbinsure.co.kr/images/new2023_logo.png", "width": 200, "height": 60 },
  "description": "DB손해보험은 1962년 설립된 대한민국 대표 손해보험사입니다.",
  "foundingDate": "1962",
  "address": { "@type": "PostalAddress", "addressCountry": "KR", "addressRegion": "서울특별시" },
  "contactPoint": { "@type": "ContactPoint", "telephone": "1588-0100", "contactType": "customer service" },
  "sameAs": [ "https://www.instagram.com/db_insurance", "https://www.youtube.com/@DBinsurance" ],
  "knowsAbout": ["간병보험","노인성 질환","초고령사회","치매","노인장기요양보험","간병비","장기 간병"],
  "hasOfferCatalog": { "@type": "OfferCatalog", "name": "DB손해보험 간병·건강 관련 상품",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "간병보험", "url": "https://dbinsure.co.kr/care" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "치매보험", "url": "https://dbinsure.co.kr/familydementia" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "암보험",   "url": "https://dbinsure.co.kr/cancer" }}
    ]
  },
  "areaServed": { "@type": "Country", "name": "대한민국" }
}
</script>

<!-- [2] BreadcrumbList -->
<script type="application/ld+json">
{ "@context": "https://schema.org", "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "홈",           "item": "https://dbinsure.co.kr" },
    { "@type": "ListItem", "position": 2, "name": "보험 가이드",   "item": "https://dbinsure.co.kr/guide_info" },
    { "@type": "ListItem", "position": 3, "name": "간병보험 가이드", "item": "https://dbinsure.co.kr/guide/care-01" }
  ]
}
</script>

<!-- [3] Article + Speakable -->
<script type="application/ld+json">
{ "@context": "https://schema.org", "@type": "Article",
  "headline": "초고령사회 속 노인성 질병 증가하는데, 간병 준비되셨나요?",
  "description": "초고령사회 진입으로 늘어나는 노인성 질환과 간병비 부담, 주요 위험과 경제적 대비 방법까지 DB손해보험이 정리했습니다.",
  "url": "https://dbinsure.co.kr/guide/care-01",
  "datePublished": "2026-04-09", "dateModified": "2026-04-09", "inLanguage": "ko-KR",
  "author": { "@type": "Organization", "name": "DB손해보험", "url": "https://dbinsure.co.kr" },
  "publisher": { "@type": "Organization", "name": "DB손해보험",
    "logo": { "@type": "ImageObject", "url": "https://dbinsure.co.kr/images/new2023_logo.png" }
  },
  "image": { "@type": "ImageObject", "url": "https://dbinsure.co.kr/images/DB_metatag_thum_img_care.jpg", "width": 1200, "height": 630 },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://dbinsure.co.kr/guide/care-01" },
  "keywords": "간병보험, 노인성 질환, 초고령사회, 간병비, 치매, 노인장기요양보험, 간병 파산, 노후 대비",
  "about": [
    {"@type":"Thing","name":"간병보험"}, {"@type":"Thing","name":"노인성 질환"},
    {"@type":"Thing","name":"초고령사회"}, {"@type":"Thing","name":"간병비"},
    {"@type":"Thing","name":"치매"}, {"@type":"Thing","name":"노인장기요양보험"}
  ],
  "articleSection": "보험 가이드",
  "speakable": { "@type": "SpeakableSpecification",
    "cssSelector": ["#sec02","#sec03","#sec04","#sec05","#blog-article-title"] }
}
</script>

<!-- [4] FAQPage: 간병 9문항 -->
<script type="application/ld+json">
{ "@context": "https://schema.org", "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "노인성 질환이란 무엇인가요?",
      "acceptedAnswer": { "@type": "Answer", "text": "노인성 질환은 원인이 불분명하고 여러 장기의 기능 저하가 동시에 나타나는 것이 특징입니다. 대표적으로 고혈압·당뇨병·뇌졸중·치매·심장질환·근골격계 질환이 있으며, 치매는 최고난도 간병이 필요합니다." }},
    { "@type": "Question", "name": "초고령사회에서 간병 문제가 왜 심각한가요?",
      "acceptedAnswer": { "@type": "Answer", "text": "2026년 대한민국 고령 인구 비중이 21%를 돌파했으며, 65세 이상 고령자의 86.1%가 만성질환을 앓고 있습니다. 35.9%는 3개 이상 복합질환을 가진 것으로 나타나 장기 간병 수요가 빠르게 늘고 있습니다." }},
    { "@type": "Question", "name": "사적 간병인을 고용하면 비용이 얼마나 드나요?",
      "acceptedAnswer": { "@type": "Answer", "text": "2026년 기준 사적 간병인 고용 비용은 월 평균 약 450만 원(하루 15만 원 수준)으로, 중위소득 가구 소득의 약 90%에 해당합니다. 간병비 물가 상승률은 연평균 10% 내외로 매우 높습니다." }},
    { "@type": "Question", "name": "간병 파산이란 무엇인가요?",
      "acceptedAnswer": { "@type": "Answer", "text": "간병 파산이란 장기 간병으로 인한 막대한 경제적 부담이 가족 전체의 재정을 무너뜨리는 현상을 말합니다. 노인성 질환은 오랜 기간 치료와 재활이 필요해 간병인 없이는 일상생활이 불가능한 경우가 많습니다." }},
    { "@type": "Question", "name": "노인장기요양보험과 간병보험은 어떻게 다른가요?",
      "acceptedAnswer": { "@type": "Answer", "text": "노인장기요양보험은 국가 운영 공적 지원 제도로 등급 판정 시 요양 서비스를 지원받을 수 있습니다. 간병보험은 민간 보험사 상품으로 공적 지원만으로 부족한 추가 간병비를 보완하는 역할을 합니다." }},
    { "@type": "Question", "name": "노인성 질환 예방을 위해 무엇을 해야 하나요?",
      "acceptedAnswer": { "@type": "Answer", "text": "저염·저당 식단으로 혈관 건강을 관리하고, 수영·스트레칭으로 근골격계 질환을 예방하며, 뇌혈관 정기 검사로 병기를 조기에 발견하는 것이 중요합니다." }},
    { "@type": "Question", "name": "간병보험은 어떤 질환을 보장하나요?",
      "acceptedAnswer": { "@type": "Answer", "text": "간병보험은 치매, 골절, 암, 당뇨 합병증 등 주요 노인성 질환을 보장합니다. 특약을 활용해 예기치 못한 지출을 방어하며, 전문 간병인과 요양기관 이용 비용을 보험금으로 충당할 수 있습니다." }},
    { "@type": "Question", "name": "간병 준비는 언제부터 시작해야 하나요?",
      "acceptedAnswer": { "@type": "Answer", "text": "간병비는 연평균 10% 이상 오르고 있어 준비 시점이 빠를수록 보험료 부담이 낮아집니다. 초고령사회에서 노인성 질환 간병은 대비의 문제로, 예방 습관과 간병보험을 함께 준비하는 것이 중요합니다." }}
  ]
}
</script>

<!-- [5] HowTo: 노인성 질환 3단계 대응 -->
<script type="application/ld+json">
{ "@context": "https://schema.org", "@type": "HowTo",
  "name": "노인성 질환 대비 3단계 가이드",
  "description": "노인성 질병을 예방하고 최소한의 손상으로 관리하기 위한 건강한 노후 준비 3단계 가이드입니다.",
  "totalTime": "PT10M",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Step 1: 예방 및 관리",
      "text": "저염·저당 식단으로 혈관 건강 관리, 수영·스트레칭으로 근골격계 질환 예방, 뇌혈관 정기 검사로 조기 발견.",
      "url": "https://dbinsure.co.kr/guide/care-01#sec04" },
    { "@type": "HowToStep", "position": 2, "name": "Step 2: 비용 절감 시스템 활용",
      "text": "간호·간병 통합서비스 활용과 노인장기요양보험 등급 판정을 통한 국가지원금 확보.",
      "url": "https://dbinsure.co.kr/guide/care-01#sec04" },
    { "@type": "HowToStep", "position": 3, "name": "Step 3: 경제적 안전장치 구축",
      "text": "간병보험으로 치매·골절·암·당뇨 합병증 등 주요 질환 보장, 특약으로 예기치 못한 지출 방어.",
      "url": "https://dbinsure.co.kr/guide/care-01#sec04" }
  ]
}
</script>

HTML;
			return;
		}

		if ($schema_key === 'dbhappyplus-01') {
			echo <<<'HTML'
<!-- ================================================== -->
<!-- SEO·GEO 구조화 데이터 — dbhappyplus-01 전용         -->
<!-- 적용일: 2026-04-23 | 대상: /guide/dbhappyplus-01    -->
<!-- ================================================== -->

<!-- [1] Organization: 순환계 도메인 맞춤 키워드로 교체 -->
<script type="application/ld+json">
{ "@context": "https://schema.org", "@type": "InsuranceAgency",
  "name": "DB손해보험", "alternateName": "DB Insurance",
  "url": "https://dbinsure.co.kr",
  "logo": { "@type": "ImageObject", "url": "https://dbinsure.co.kr/images/new2023_logo.png", "width": 200, "height": 60 },
  "description": "DB손해보험은 1962년 설립된 대한민국 대표 손해보험사입니다.",
  "foundingDate": "1962",
  "address": { "@type": "PostalAddress", "addressCountry": "KR", "addressRegion": "서울특별시" },
  "contactPoint": { "@type": "ContactPoint", "telephone": "1588-0100", "contactType": "customer service" },
  "sameAs": [ "https://www.instagram.com/db_insurance", "https://www.youtube.com/@DBinsurance" ],
  "knowsAbout": ["순환계질환","심혈관질환","뇌혈관질환","부정맥","협심증","2대질병 차이","고혈압보험"],
  "hasOfferCatalog": { "@type": "OfferCatalog", "name": "DB손해보험 건강 관련 주요 상품",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "순환계보험", "url": "https://dbinsure.co.kr/dbhappyplus" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "비갱신보험", "url": "https://dbinsure.co.kr/tome" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "암보험",      "url": "https://dbinsure.co.kr/cancer" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "실비보험",    "url": "https://dbinsure.co.kr/silbi" }}
    ]
  },
  "areaServed": { "@type": "Country", "name": "대한민국" }
}
</script>

<!-- [2] BreadcrumbList -->
<script type="application/ld+json">
{ "@context": "https://schema.org", "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "홈",             "item": "https://dbinsure.co.kr" },
    { "@type": "ListItem", "position": 2, "name": "보험 가이드",     "item": "https://dbinsure.co.kr/guide_info" },
    { "@type": "ListItem", "position": 3, "name": "순환계보험 가이드", "item": "https://dbinsure.co.kr/guide/dbhappyplus-01" }
  ]
}
</script>

<!-- [3] Article + Speakable -->
<script type="application/ld+json">
{ "@context": "https://schema.org", "@type": "Article",
  "headline": "순환계 질환 대비 준비되셨나요? 혈관 건강의 빈틈을 채우는 스마트한 방법",
  "description": "2대 질병과 순환계 질환의 차이, 보장 범위 확대가 필요한 이유, 전조증상 체크 포인트까지 DB손해보험이 정리했습니다.",
  "url": "https://dbinsure.co.kr/guide/dbhappyplus-01",
  "datePublished": "2026-04-23", "dateModified": "2026-04-23", "inLanguage": "ko-KR",
  "author": { "@type": "Organization", "name": "DB손해보험", "url": "https://dbinsure.co.kr" },
  "publisher": { "@type": "Organization", "name": "DB손해보험",
    "logo": { "@type": "ImageObject", "url": "https://dbinsure.co.kr/images/new2023_logo.png" }
  },
  "image": { "@type": "ImageObject", "url": "https://dbinsure.co.kr/images/DB_metatag_thum_img_dbhappyplus.jpg", "width": 1200, "height": 630 },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://dbinsure.co.kr/guide/dbhappyplus-01" },
  "keywords": "순환계질환, 심혈관질환, 뇌혈관질환, 부정맥, 협심증, 2대질병, 순환계보험, DB손해보험",
  "about": [
    {"@type":"Thing","name":"순환계 질환"}, {"@type":"Thing","name":"2대 질병"},
    {"@type":"Thing","name":"부정맥"}, {"@type":"Thing","name":"심혈관 질환"}
  ],
  "articleSection": "보험 가이드",
  "speakable": { "@type": "SpeakableSpecification",
    "cssSelector": ["#sec02","#sec03","#sec04","#blog-article-title"] }
}
</script>

<!-- [4] FAQPage: 2대질병 비교 및 질환 질문 6문항 -->
<script type="application/ld+json">
{ "@context": "https://schema.org", "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "순환계 질환이란 무엇인가요?",
      "acceptedAnswer": { "@type": "Answer", "text": "심장, 혈관 등 혈액 순환에 관련된 질환을 통칭합니다. 고혈압, 협심증, 심근경색, 부정맥 등을 포함하며 혈관이 크게 좁아질 때까지 전조증상이 없는 경우가 많아 예방이 중요합니다." }},
    { "@type": "Question", "name": "2대 질병과 순환계 질환의 가장 큰 차이점은 무엇인가요?",
      "acceptedAnswer": { "@type": "Answer", "text": "2대 질병은 뇌혈관·허혈성심장질환 등 중증 질환 중심의 좁은 보장인 반면, 순환계 질환은 부정맥, 협심증, 심부전 등 일상에서 흔히 발생하는 혈관 질환 전반을 넓게 보장합니다." }},
    { "@type": "Question", "name": "부정맥도 2대 질병 보험으로 보장받을 수 있나요?",
      "acceptedAnswer": { "@type": "Answer", "text": "일반적으로 부정맥은 2대 질병 주요 치료비 보험의 보장 범위에 포함되지 않는 경우가 많으므로 순환계 질환 전용 보험으로 대비하는 것이 안전합니다." }},
    { "@type": "Question", "name": "순환계 질환 보장으로 확대해야 하는 이유는 무엇인가요?",
      "acceptedAnswer": { "@type": "Answer", "text": "순환계 질환은 50여 개 이상의 다양한 질환을 포괄하여, 기존 2대 질병 보험의 사각지대(보장 공백)를 촘촘하게 메워주기 때문입니다." }},
    { "@type": "Question", "name": "고혈압 약을 먹고 있는 유병자도 가입이 가능한가요?",
      "acceptedAnswer": { "@type": "Answer", "text": "네, 고혈압이나 고지혈증 등 과거 병력이 있거나 약을 복용 중이더라도 심사 기준에 따라 간편 심사를 통과하면 유병자도 순환계 보험에 가입할 수 있습니다." }},
    { "@type": "Question", "name": "순환계 질환의 전조증상은 무엇인가요?",
      "acceptedAnswer": { "@type": "Answer", "text": "가슴 통증, 호흡곤란, 어지럼증, 팔다리 저림 현상 등이 있습니다. 이러한 신호가 나타나면 즉시 검진을 받아야 합니다." }}
  ]
}
</script>

<!-- [5] HowTo: 혈관 건강 예방 4단계 -->
<script type="application/ld+json">
{ "@context": "https://schema.org", "@type": "HowTo",
  "name": "순환계 질환 예방을 위한 깨끗한 혈관 만드는 생활 습관",
  "description": "혈관 건강을 지키기 위한 필수 생활 습관 4가지를 안내합니다.",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "저염식과 영양 관리", "text": "나트륨을 줄이고 혈행 개선에 도움을 주는 오메가3를 꾸준히 섭취하세요.", "url": "https://dbinsure.co.kr/guide/dbhappyplus-01#sec05" },
    { "@type": "HowToStep", "position": 2, "name": "꾸준한 유산소 운동", "text": "걷기, 수영 등 유산소 운동을 1주일에 3회, 한 번에 30분 이상 실천하세요.", "url": "https://dbinsure.co.kr/guide/dbhappyplus-01#sec05" },
    { "@type": "HowToStep", "position": 3, "name": "절대 금연", "text": "담배는 혈관을 즉각적으로 수축시키고 손상시킵니다. 금연은 필수입니다.", "url": "https://dbinsure.co.kr/guide/dbhappyplus-01#sec05" },
    { "@type": "HowToStep", "position": 4, "name": "정기적인 수치 검진", "text": "혈압, 혈당, 콜레스테롤 수치를 주기적으로 확인하고 관리하세요.", "url": "https://dbinsure.co.kr/guide/dbhappyplus-01#sec05" }
  ]
}
</script>

HTML;
			return;
		}

		if ($schema_key === 'tome-01') {
			echo <<<'HTML'
<!-- ================================================== -->
<!-- SEO·GEO 구조화 데이터 — tome-01 전용              -->
<!-- 적용일: 2026-04-13 | 대상: /guide/tome-01         -->
<!-- ================================================== -->

<!-- [1] Organization: 비갱신형 도메인 맞춤 -->
<script type="application/ld+json">
{ "@context": "https://schema.org", "@type": "InsuranceAgency",
  "name": "DB손해보험", "alternateName": "DB Insurance",
  "url": "https://dbinsure.co.kr",
  "logo": { "@type": "ImageObject", "url": "https://dbinsure.co.kr/images/new2023_logo.png", "width": 200, "height": 60 },
  "description": "DB손해보험은 1962년 설립된 대한민국 대표 손해보험사입니다.",
  "foundingDate": "1962",
  "address": { "@type": "PostalAddress", "addressCountry": "KR", "addressRegion": "서울특별시" },
  "contactPoint": { "@type": "ContactPoint", "telephone": "1588-0100", "contactType": "customer service" },
  "sameAs": [ "https://www.instagram.com/db_insurance", "https://www.youtube.com/@DBinsurance" ],
  "knowsAbout": ["비갱신형보험","갱신형보험","보험료 비교","보험 장단점","보장 기간","보험료 인상","장기 보험 유지","노후 보험 설계"],
  "hasOfferCatalog": { "@type": "OfferCatalog", "name": "DB손해보험 비갱신형·건강 관련 상품",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "비갱신보험",  "url": "https://dbinsure.co.kr/tome" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "암보험",      "url": "https://dbinsure.co.kr/cancer" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "실비보험",    "url": "https://dbinsure.co.kr/silbi" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "운전자보험",  "url": "https://dbinsure.co.kr/driver" }}
    ]
  },
  "areaServed": { "@type": "Country", "name": "대한민국" }
}
</script>

<!-- [2] BreadcrumbList -->
<script type="application/ld+json">
{ "@context": "https://schema.org", "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "홈",               "item": "https://dbinsure.co.kr" },
    { "@type": "ListItem", "position": 2, "name": "보험 가이드",       "item": "https://dbinsure.co.kr/guide_info" },
    { "@type": "ListItem", "position": 3, "name": "비갱신형보험 가이드", "item": "https://dbinsure.co.kr/guide/tome-01" }
  ]
}
</script>

<!-- [3] Article + Speakable -->
<script type="application/ld+json">
{ "@context": "https://schema.org", "@type": "Article",
  "headline": "비갱신형보험과 갱신형보험의 차이와 장단점 비교 (나에게 맞는 보험은 무엇일까?)",
  "description": "비갱신형보험과 갱신형보험의 차이, 장단점, 보험 선택 시 고려할 점까지 DB손해보험이 이해하기 쉽게 정리했습니다.",
  "url": "https://dbinsure.co.kr/guide/tome-01",
  "datePublished": "2026-04-16", "dateModified": "2026-04-16", "inLanguage": "ko-KR",
  "author": { "@type": "Organization", "name": "DB손해보험", "url": "https://dbinsure.co.kr" },
  "publisher": { "@type": "Organization", "name": "DB손해보험",
    "logo": { "@type": "ImageObject", "url": "https://dbinsure.co.kr/images/new2023_logo.png" }
  },
  "image": { "@type": "ImageObject", "url": "https://dbinsure.co.kr/images/DB_metatag_thum_img_tome.jpg", "width": 1200, "height": 630 },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://dbinsure.co.kr/guide/tome-01" },
  "keywords": "비갱신형보험, 갱신형보험, 보험 비교, 보험료 차이, 비갱신형 장단점, 보험 선택, 보장 기간",
  "about": [
    {"@type":"Thing","name":"비갱신형보험"}, {"@type":"Thing","name":"갱신형보험"},
    {"@type":"Thing","name":"보험료 비교"}, {"@type":"Thing","name":"보험 장단점"}
  ],
  "articleSection": "보험 가이드",
  "speakable": { "@type": "SpeakableSpecification",
    "cssSelector": ["#sec02","#sec03","#sec04","#sec05","#blog-article-title"] }
}
</script>

<!-- [4] FAQPage: 비갱신형 비교·선택 -->
<script type="application/ld+json">
{ "@context": "https://schema.org", "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "비갱신형보험이란 무엇인가요?",
      "acceptedAnswer": { "@type": "Answer", "text": "비갱신형보험은 가입 시 확정된 보험료를 납입 기간 동안 동일하게 유지하는 보험입니다. 납입이 끝나면 보험료 부담 없이 보장만 유지되며, 장기적으로 보험료 예측이 쉬운 것이 특징입니다." }},
    { "@type": "Question", "name": "갱신형보험이란 무엇인가요?",
      "acceptedAnswer": { "@type": "Answer", "text": "갱신형보험은 일정 주기(1년·3년·5년 등)마다 보험료가 다시 산출되는 보험입니다. 나이와 위험률 상승에 따라 보험료가 점점 인상되지만, 초기 보험료는 비갱신형보다 상대적으로 저렴합니다." }},
    { "@type": "Question", "name": "비갱신형보험과 갱신형보험의 가장 큰 차이는 무엇인가요?",
      "acceptedAnswer": { "@type": "Answer", "text": "가장 큰 차이는 시간이 지날수록 보험료가 변하느냐입니다. 비갱신형은 만기까지 보험료가 고정되지만, 갱신형은 주기적으로 보험료가 인상될 가능성이 높습니다. 장기 유지 시 총 납입액은 비갱신형이 상대적으로 유리합니다." }},
    { "@type": "Question", "name": "비갱신형보험의 핵심 장점은 무엇인가요?",
      "acceptedAnswer": { "@type": "Answer", "text": "비갱신형보험의 핵심 장점은 확정된 비용입니다. 소득이 있는 시기에 납입을 끝내고, 소득이 줄어드는 노후에는 보험료 부담 없이 보장만 받을 수 있습니다. 장기 자금 계획 수립에 매우 유리합니다." }},
    { "@type": "Question", "name": "비갱신형보험이 누구에게 더 적합한가요?",
      "acceptedAnswer": { "@type": "Answer", "text": "20~40대 사회초년생 및 직장인, 계획적인 지출을 선호하는 분, 암 진단비 등 핵심 보장을 중도 해지 없이 유지하려는 분, 운전자보험·건강보험 등 장기 유지가 필요한 상품을 고려하는 분에게 더 적합합니다." }},
    { "@type": "Question", "name": "보험 선택 시 어떤 점을 확인해야 하나요?",
      "acceptedAnswer": { "@type": "Answer", "text": "① 보장 기간(은퇴 이후까지 유지 가능한가), ② 보험료 변동(향후 인상 가능성이 없는가), ③ 소득 대비 보험료(노후에도 감당 가능한가), ④ 유지 가능성(중도 해지 위험이 없는가)을 반드시 확인하세요." }}
  ]
}
</script>

<!-- [5] HowTo: 보험 선택 3단계 -->
<script type="application/ld+json">
{ "@context": "https://schema.org", "@type": "HowTo",
  "name": "나에게 맞는 보험 선택 방법 — 비갱신형·갱신형 판단 3단계",
  "description": "보험 선택에서 지금 보험료만 보고 결정하는 실수를 피하기 위한 3가지 핵심 체크포인트입니다.",
  "totalTime": "PT5M",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "보장 기간과 납입 기간 확인",
      "text": "은퇴 이후까지 보험료 인상 없이 유지 가능한지, 중도 해지 위험은 없는지 확인합니다.",
      "url": "https://dbinsure.co.kr/guide/tome-01#sec04" },
    { "@type": "HowToStep", "position": 2, "name": "노후 경제력 점검",
      "text": "은퇴 후에도 인상되는 보험료를 감당할 수 있는 소득원이 있는지 확인합니다.",
      "url": "https://dbinsure.co.kr/guide/tome-01#sec04" },
    { "@type": "HowToStep", "position": 3, "name": "핵심 보장 범위 확인",
      "text": "진단비·수술비 등 핵심 보장이 충분히 포함되어 있는지, 장기적으로 필요한 보장이 담겨 있는지 확인합니다.",
      "url": "https://dbinsure.co.kr/guide/tome-01#sec04" }
  ]
}
</script>

HTML;
			return;
		}

		// 그 외 페이지: [1] 공통 Organization(HTML) + 상품별 OfferCatalog JSON
		echo <<<'HTML'
<!-- ================================================== -->
<!-- SEO·GEO 구조화 데이터 — 전체 사이트 공통 Organization -->
<!-- ================================================== -->
<!-- [1] Organization: E-E-A-T 강화 (전체 사이트 공통) -->
<script type="application/ld+json">
{ "@context": "https://schema.org", "@type": "InsuranceAgency",
  "name": "DB손해보험", "alternateName": "DB Insurance",
  "url": "https://dbinsure.co.kr",
  "logo": { "@type": "ImageObject", "url": "https://dbinsure.co.kr/images/new2023_logo.png", "width": 200, "height": 60 },
  "description": "DB손해보험은 1962년 설립된 대한민국 대표 손해보험사입니다.",
  "foundingDate": "1962",
  "address": { "@type": "PostalAddress", "addressCountry": "KR", "addressRegion": "서울특별시" },
  "contactPoint": { "@type": "ContactPoint", "telephone": "1588-0100", "contactType": "customer service" },
  "sameAs": [ "https://www.instagram.com/db_insurance", "https://www.youtube.com/@DBinsurance" ],
  "knowsAbout": ["운전자보험","자동차보험","형사합의금","12대 중과실 사고","교통사고처리지원금"],
  "areaServed": { "@type": "Country", "name": "대한민국" }
}
</script>

HTML;
		db_print_insurance_agency_json_ld($schema_key);
	}
}
