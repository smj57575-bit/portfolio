<!DOCTYPE html>
<html lang="ko">

<head>
  <!-- base meta -->
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">

  <?php include __DIR__ . '/meta.php'; ?>
  <?php
  $currentPath = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
  function norm_path(string $p): string
  {
    $p = preg_replace('#/index\.php$#i', '/', $p);
    $p = rtrim($p, '/');
    return $p === '' ? '/' : $p;
  }
  $N = norm_path($currentPath);
  function isTop(string $section, string $N): bool
  {
    $section = rtrim($section, '/');
    return $N === $section || strpos($N, $section . '/') === 0;
  }
  function isExact(string $path, string $N): bool
  {
    return norm_path($path) === $N;
  }
  ?>
  <!-- basic meta -->

  <!-- favicon -->
  <link rel="shortcut icon" type="image/x-icon" href="/uploads/assets/ico.png">
  <!-- css -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
  <link rel="stylesheet" href="/uploads/assets/css/style.css?v=20260205">
  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">


  <!-- js -->
  <script type="text/javascript" src="/uploads/assets/js/main.js?v=20260205" defer></script>
  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js" defer></script>

  <!-- ConveyThis Script Start -->
  <script src="//cdn.conveythis.com/javascript/conveythis.js?api_key=pub_e83ca3237af49adf442aa3e1d2784b6c"></script>
  <!-- ConveyThis Script End -->
  <script>
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      });
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != 'dataLayer' ? '&l=' + l : '';
      j.async = true;
      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-TXCLRPQ');
  </script>
  <!-- End Google Tag Manager -->


  <!-- schema -->
  <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@graph": [{
                "@type": "Organization",
                "@id": "https://www.ob.co.kr/#organization",
                "name": "오비맥주",
                "alternateName": ["OB맥주", "Oriental Brewery", "OBC"],
                "url": "https://www.ob.co.kr",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://www.ob.co.kr/assets/img/common/ob-beer-logo.png",
                    "width": 300,
                    "height": 100
                },
                "image": {
                    "@type": "ImageObject",
                    "url": "https://www.ob.co.kr/assets/img/common/ob-beer-logo.png",
                    "width": 1200,
                    "height": 630
                },
                "description": "1933년 창립한 대한민국 대표 맥주 제조업체로, 카스, 한맥, OB라거 등 프리미엄 맥주 브랜드를 제조하는 기업입니다.",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "영동대로 517 아셈타워 8층",
                    "addressLocality": "강남구",
                    "addressRegion": "서울특별시",
                    "postalCode": "06164",
                    "addressCountry": "KR"
                },
                "contactPoint": [{
                        "@type": "ContactPoint",
                        "contactType": "customer service",
                        "email": "Partnership@ob.co.kr",
                        "availableLanguage": "Korean"
                    },
                    {
                        "@type": "ContactPoint",
                        "contactType": "public relations",
                        "email": "Partnership@ob.co.kr"
                    }
                ],
                "sameAs": [
                    "https://www.instagram.com/official.obc/",
                    "https://www.facebook.com/OrientalBreweryCompany/",
                    "https://www.linkedin.com/company/abikorea/",
                    "https://blog.naver.com/abipeople"
                ],
                "additionalProperty": [{
                        "@type": "PropertyValue",
                        "name": "사업 분야",
                        "value": "맥주 제조, 발효 기술, 품질 관리, 브랜드 마케팅"
                    },
                    {
                        "@type": "PropertyValue",
                        "name": "수상 내역",
                        "value": "World Beer Cup 국제콘테스트 금상, 벨기에 국제 식음료 품평회 수상, 대한민국 주류대상 대상"
                    },
                    {
                        "@type": "PropertyValue",
                        "name": "직원 수",
                        "value": "약 1,000명"
                    },
                    {
                        "@type": "PropertyValue",
                        "name": "주요 브랜드",
                        "value": "카스, 한맥, OB라거, 호가든, 버드와이저, 스텔라 아르투아, 코로나"
                    },
                    {
                        "@type": "PropertyValue",
                        "name": "기업 가치",
                        "value": "책임감 있는 음주 문화 조성"
                    }
                ],
                "keywords": "오비맥주, OB, 맥주, 카스, 한맥, 호가든, 버드와이저, 대한민국 맥주, 프리미엄 맥주, 라거"
            },
            {
                "@type": "WebSite",
                "@id": "https://www.ob.co.kr/#website",
                "url": "https://www.ob.co.kr",
                "name": "오비맥주 공식 홈페이지",
                "description": "대한민국 대표 맥주 제조업체 오비맥주의 공식 홈페이지입니다. 카스, 한맥, OB라거 등 다양한 프리미엄 맥주 브랜드 정보를 확인하세요.",
                "publisher": {
                    "@id": "https://www.ob.co.kr/#organization"
                },
                "inLanguage": "ko-KR",
                "mainEntity": {
                    "@id": "https://www.ob.co.kr/#organization"
                }
            },
            {
                "@type": "Brand",
                "@id": "https://www.cass.co.kr/",
                "name": "카스",
                "url": "https://www.cass.co.kr/",
                "alternateName": ["CASS", "Cass Beer"],
                "description": "깔끔하고 시원한 맛의 대한민국 대표 프리미엄 라거 맥주"
            },
            {
                "@type": "Brand",
                "@id": "https://hanmac.ob.co.kr/",
                "name": "한맥",
                "url": "https://hanmac.ob.co.kr/",
                "alternateName": ["HANMAC", "Hanmac Beer"],
                "description": "100% 국내산 고품질 쌀로 빚은 프리미엄 라거 맥주"
            },
            {
                "@type": "Brand",
                "@id": "https://www.oblager.kr/",
                "name": "OB라거",
                "url": "https://www.oblager.kr/",
                "alternateName": ["OB Lager", "OB Golden Lager"],
                "description": "100% 몰트 맥주가 주는 깊은 맛과 부드러운 목넘김의 프리미엄 맥주"
            },
            {
                "@type": "Brand",
                "name": "필굿",
                "alternateName": ["FILGOOD"],
                "description": "20대를 겨냥한 발포주 브랜드"
            },
            {
                "@type": "Brand",
                "@id": "https://www.budweiser.kr/",
                "name": "버드와이저",
                "url": "https://www.budweiser.kr/",
                "alternateName": ["Budweiser"],
                "description": "세계적인 프리미엄 라거 맥주"
            },
            {
                "@type": "Brand",
                "@id": "https://www.stellaartois.co.kr/",
                "name": "스텔라 아르투아",
                "url": "https://www.stellaartois.co.kr/",
                "alternateName": ["Stella Artois"],
                "description": "벨기에 전통 프리미엄 맥주"
            },
            {
                "@type": "Brand",
                "@id": "https://www.corona.com/en",
                "name": "코로나",
                "url": "https://www.corona.com/en",
                "alternateName": ["Corona"],
                "description": "멕시코의 대표적인 라이트 맥주"
            },
            {
                "@type": "Brand",
                "@id": "https://www.hoegaarden.co.kr/",
                "name": "호가든",
                "url": "https://www.hoegaarden.co.kr/",
                "alternateName": ["Hoegaarden"],
                "description": "벨기에 전통 밀맥주"
            },
            {
                "@type": "Brand",
                "@id": "http://www.gooseislandfranchise.com/",
                "name": "구스 아일랜드",
                "url": "http://www.gooseislandfranchise.com/",
                "alternateName": ["Goose Island"],
                "description": "시카고 크래프트 맥주 브랜드"
            },
            {
                "@type": "Brand",
                "name": "핸드앤몰트",
                "alternateName": ["Hand&Malt"],
                "description": "프리미엄 크래프트 맥주 브랜드"
            },
            {
                "@type": "Brand",
                "name": "레드 록",
                "alternateName": ["Red Rock"],
                "description": "크래프트 맥주 브랜드"
            },
            {
                "@type": "Brand",
                "@id": "https://www.michelobultra.co.kr/",
                "name": "미켈롭 울트라",
                "url": "https://www.michelobultra.co.kr/",
                "alternateName": ["Michelob Ultra"],
                "description": "저칼로리 프리미엄 라이트 맥주"
            },
            {
                "@type": "Brand",
                "name": "산토리",
                "alternateName": ["Suntory"],
                "description": "일본 프리미엄 맥주"
            },
            {
                "@type": "Brand",
                "name": "카프리",
                "alternateName": ["CAFRI"],
                "description": "프리미엄 맥주 브랜드"
            }
        ]
    }
    </script>

  <?php if (isExact('/about/faq.php', $N)): ?>
    <!-- 오비맥주 기업 및 브랜드 FAQ 스키마 -->
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "name": "오비맥주 기업 및 브랜드 FAQ",
        "description": "오비맥주 기업 정보, 브랜드, 역사, 기업문화, 복리후생 자주 묻는 질문",
        "dateModified": "2025-01-30",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "오비맥주는 어떤 배경에서 시작된 회사인가요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "오비맥주는 1933년에 설립돼 1952년 정식 민간기업으로 출범한 이후, 92년의 역사를 이어온 대한민국 대표 맥주회사입니다 (2025년 1월 기준). 설립 연도는 1933년이며, 대표 브랜드로는 카스, 한맥, 카스 0.0이 있습니다. 전국 3개의 양조장(경기 이천, 충북 청주, 광주광역시)을 운영하고 있으며, 2014년 세계 최대 맥주 기업 AB InBev에 합류했습니다."
            }
          },
          {
            "@type": "Question",
            "name": "오비맥주는 어떻게 지금의 국내 대표 맥주 회사로 성장했나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "오비맥주는 1933년 '소화기린맥주'로 시작해 92년간 국내 맥주 산업의 변화와 함께 성장하며 대한민국 대표 맥주 회사로 자리 잡았습니다 (2025년 1월 기준). 1948년 동양맥주주식회사로 상호를 변경하고, 1952년 민간기업으로 정식 출범했습니다. 1994년 카스를 출시하며 혁신적인 브랜드 포트폴리오를 확장했고, 2021년에는 대한민국 대표라거 프로젝트로 한맥을 출시하며 국내 맥주 시장을 선도하고 있습니다."
            }
          },
          {
            "@type": "Question",
            "name": "오비맥주의 기업 비전과 슬로건은 무엇인가요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "오비맥주의 슬로건은 '우리는 더 크게 환호할 미래를 위하여 큰 꿈을 꿉니다'입니다. 2022년 1월에 선포된 이 슬로건에서 '큰 꿈'은 오비맥주의 정체성이자 모든 기업 활동의 근간을 의미하며, '더 크게 환호할 미래'는 지역사회와 함께 만들어가는 지속가능한 성장을 뜻합니다."
            }
          },
          {
            "@type": "Question",
            "name": "오비맥주는 일하기 좋은 기업 문화를 갖고 있나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "오비맥주는 최고 고용주 협회(Top Employer Institute)로부터 2022년부터 2025년까지 4년 연속 '최우수 고용기업(Top Employer)'으로 선정된 기업으로, 일하기 좋은 기업 문화를 갖춘 회사로 평가받고 있습니다 (2025년 1월 기준). 직원 중심의 조직 문화를 바탕으로 근무지 자율선택제, 자율좌석제, 가족친화제도, 해피아워 등 다양한 제도를 운영하며, 모든 구성원이 존중받고 함께 배우고 성장하는 문화를 만들어가고 있습니다."
            }
          },
          {
            "@type": "Question",
            "name": "오비맥주의 주요 복리후생 제도는 무엇인가요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "오비맥주는 Growth(성장 지원), Refreshment(유연 근무), Family(가족 지원), Wellness(건강 지원), Specialty(특별 혜택) 5개 영역의 복리후생을 제공합니다. 주요 제도로는 근무지 자율선택제(연간 25일), Refresh 휴가 지원(유급 5일 + 100만원), 주택자금 지원(최대 5천만원), 의료비 지원(연 500만원/인), 자녀 학자금 지원 등이 있습니다. 직원들은 해피아워에서 동료들과 맥주를 즐기며 아이디어를 공유할 수 있습니다."
            }
          },
          {
            "@type": "Question",
            "name": "오비맥주는 어떤 브랜드를 운영하나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "오비맥주는 국내 브랜드인 카스, 한맥과 글로벌 브랜드인 버드와이저, 호가든, 스텔라 아르투아, 코로나, 코젤을 생산합니다. 카스는 대한민국 대표 맥주로서 최고 품질의 몰트와 홉을 사용하며, 한맥은 2021년 출시된 대한민국 대표 라거입니다. 무알코올 맥주로는 카스 0.0, 버드와이저 제로가 있습니다."
            }
          },
          {
            "@type": "Question",
            "name": "오비맥주의 양조장은 어디에 있나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "오비맥주는 전국 3곳에 양조장을 운영하고 있습니다. 이천 양조장(경기도 이천시)은 1973년 설립되어 카스, 한맥을 생산하며, 청주 양조장(충청북도 청원군)은 1996년 설립되어 버드와이저, 호가든을 생산합니다. 광주 양조장(광주광역시 광산구)은 1995년 설립되어 카스, 한맥, 스텔라 아르투아를 생산합니다."
            }
          },
          {
            "@type": "Question",
            "name": "AB InBev와의 관계는 어떻게 되나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "오비맥주는 2014년 세계 최대 맥주 기업 AB InBev에 합류했습니다. AB InBev는 100개국 이상에서 500개 이상의 브랜드를 생산하는 글로벌 맥주 기업으로, 오비맥주는 AB InBev의 글로벌 네트워크, 혁신 기술, 브랜드 포트폴리오를 활용하여 한국 맥주 산업을 선도하고 있습니다."
            }
          },
          {
            "@type": "Question",
            "name": "오비맥주의 주요 수상 및 인증 내역은 무엇인가요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "오비맥주는 다양한 국내외 상을 수상했습니다. 최고 고용주 협회로부터 2022-2025년 4년 연속 최우수 고용기업으로 선정되었으며, 2014년 몽골 조림 프로젝트로 UNCCD 생명의 토지상을 수상했습니다. 2012년에는 주류업계 최초로 1억불 수출탑을 달성했고, 2024년에는 음주운전 방지장치 시범사업으로 국제도로연맹 Find A Way 상을 수상했습니다."
            }
          },
          {
            "@type": "Question",
            "name": "오비맥주는 해외 수출도 하나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "네, 오비맥주는 일본, 중국, 몽골, 미국 등 전 세계로 수출하고 있으며, 2012년 주류업계 최초로 1억불 수출탑을 수상했습니다. 국내 대표 브랜드인 카스와 한맥을 중심으로 글로벌 시장에서 대한민국 맥주의 우수성을 알리고 있습니다."
            }
          }
        ]
      }
      </script>
    <!--  페이지 계층 구조 표시  -->
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "홈",
            "item": "https://www.ob.co.kr"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "FAQ",
            "item": "https://www.ob.co.kr/about/faq.php"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "기업·브랜드",
            "item": "https://www.ob.co.kr/about/faq.php"
          }
        ]
      }
      </script>
  <?php elseif (isExact('/sustainability/faq.php', $N)): ?>
    <!-- 지속가능경영(ESG) FAQ 스키마 -->
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "name": "오비맥주 지속가능경영(ESG) FAQ",
        "description": "오비맥주 ESG 활동, 책임음주, 환경보전, 지역나눔 자주 묻는 질문",
        "dateModified": "2025-01-30",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "오비맥주는 어떻게 ESG를 실천하나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "오비맥주는 2017년 'OB 좋은세상' 브랜드를 선포하며 본격적으로 ESG 경영을 시작했습니다. 책임음주, 환경보전, 지역나눔 3개 영역에서 활동하고 있으며, 음주운전 방지장치 의무화 기여, 16년째 몽골 조림 프로젝트, 행복도서관 12개소 운영 등의 성과를 이루었습니다. 2040 넷제로 달성을 목표로 재생에너지 100% 전환, 순환 패키징, 수자원 관리를 추진하고 있습니다."
            }
          },
          {
            "@type": "Question",
            "name": "오비맥주의 2025년 지속가능경영 목표는 무엇인가요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "오비맥주는 AB InBev 글로벌 프레임워크에 따라 4개 영역의 2025년 목표를 설정했습니다. 기후변화 대응으로 재생에너지 100% 전환과 탄소배출 25% 감축, 자원순환으로 100% 재사용 또는 재활용 가능한 포장재 사용, 수자원 관리로 물 부족 지역 수질 개선, 지속가능한 농업으로 농가 기술·재정 지원을 추진하고 있습니다."
            }
          },
          {
            "@type": "Question",
            "name": "오비맥주의 대표적인 ESG 캠페인은 무엇인가요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "책임음주 영역에서는 음주운전 방지장치(IID) 시범사업을 3차례 진행해 2024년 10월 의무화 법안 통과에 기여했고, 미성년자 음주 예방 캠페인 '귀하신분'을 2009년부터 운영하고 있습니다. 환경보전 영역에서는 2008년부터 16년째 몽골 조림 프로젝트로 46,500그루 나무를 심었고, 3개 양조장에 7.3MW 태양광 패널을 설치해 연간 2,800톤 CO2를 감축하고 있습니다. 지역나눔 영역에서는 2016년부터 행복도서관 12개소를 운영하고 있습니다."
            }
          },
          {
            "@type": "Question",
            "name": "책임음주를 위해 어떤 활동을 하나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "오비맥주는 음주운전 방지장치(IID) 시범사업을 2022년부터 3차례 진행하여 2024년 10월 의무화 법안 통과에 기여했습니다. '귀하신분' 캠페인으로 2009년부터 미성년자 음주 예방 활동을 전개하고 있으며, 카스 0.0을 2024 파리 올림픽 공식 파트너로 선정하여 건강한 음주 문화를 확산시키고 있습니다. 또한 적정 음주 문화 조성과 음주운전 근절 캠페인을 지속적으로 실시하고 있습니다."
            }
          },
          {
            "@type": "Question",
            "name": "환경보호를 위해 어떤 노력을 하나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "오비맥주는 4개 영역에서 환경보호 활동을 전개하고 있습니다. 기후변화 대응으로 3개 양조장에 7.3MW 태양광 패널을 설치해 연간 2,800톤 CO2를 감축하며, 2040 넷제로와 RE100을 목표로 하고 있습니다. 순환경제 실현을 위해 트레이 없는 포장으로 662톤 CO2를 줄였고, 주요 포장재 재활용률 68% 이상을 달성했습니다. 수자원 보호로 물 부족 지역 수질 개선에 기여하며, 지속가능한 농업으로 농가에 기술·재정 지원을 제공합니다."
            }
          },
          {
            "@type": "Question",
            "name": "지역사회와 어떻게 협력하나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "오비맥주는 지역사회 취약계층을 지원하고 있습니다. 재난·재해 지역에 생수 88만병을 기부했으며, 3개 지역 장학재단을 통해 총 14억원(이천 3.58억원, 광주 6.8억원, 청주 2.85억원)의 장학금을 지원했습니다. 2016년부터 행복도서관 12개소를 운영하며 지역 문화 발전에 기여하고 있으며, 지역 스타트업 육성 프로그램도 진행하고 있습니다."
            }
          },
          {
            "@type": "Question",
            "name": "윤리경영과 컴플라이언스는 어떻게 관리하나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "오비맥주는 매년 11월 컴플라이언스 먼스(Compliance Month)를 운영하며 임직원 윤리교육을 실시합니다. 협력업체 고충처리 시스템을 운영하여 투명하고 공정한 거래 관계를 유지하고 있으며, AB InBev 글로벌 윤리강령을 준수합니다. 또한 정기적인 윤리경영 점검과 리스크 관리를 통해 지속가능한 경영 기반을 구축하고 있습니다."
            }
          },
          {
            "@type": "Question",
            "name": "음주운전 예방에 어떻게 기여했나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "오비맥주는 음주운전 방지장치(IID) 시범사업을 2022년부터 3차례 진행했습니다. 1차(2022.8~12)는 렌터카 200대, 2차(2023.2~6)는 화물차 350대, 3차(2023.8~2024.1)는 음주운전 전력자 차량 300대에 IID를 장착했습니다. 이러한 노력의 결과 2024년 10월 25일 IID 의무화 법안이 통과되었으며, 2024년 국제도로연맹(IRF)으로부터 'Find A Way' 상을 수상했습니다."
            }
          },
          {
            "@type": "Question",
            "name": "탄소 감축을 위해 어떤 노력을 하나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "오비맥주는 3단계 탄소 감축 전략을 추진하고 있습니다. 재생에너지 전환으로 3개 양조장에 7.3MW 태양광 패널을 설치해 연간 2,800톤 CO2를 감축하고 있으며, 2040 넷제로와 RE100 달성을 목표로 합니다. 순환 패키징으로 트레이 없는 포장을 도입해 662톤 CO2를 줄였고, 2020년 이후 플라스틱 필름 96톤을 절감했습니다. Scope 3 관리로 공급망 전체의 탄소배출을 측정하고 감축 방안을 마련하고 있습니다."
            }
          },
          {
            "@type": "Question",
            "name": "ESG 평가와 인증은 어떻게 받고 있나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "오비맥주는 다양한 ESG 평가와 인증을 받고 있습니다. 2024년 국제도로연맹(IRF)으로부터 음주운전 방지장치 시범사업으로 'Find A Way' 상을 수상했으며, 2014년 유엔사막화방지협약(UNCCD)으로부터 몽골 조림 프로젝트로 '생명의 토지상'을 받았습니다. 카스 0.0은 2024 파리 올림픽 공식 파트너로 선정되었고, GPTW(Great Place To Work) Korea 인증을 획득했습니다."
            }
          },
          {
            "@type": "Question",
            "name": "ESG 성과는 어떻게 측정하나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "오비맥주는 3개 영역에서 정량적 성과를 측정하고 있습니다. 책임음주 영역에서는 IID 시범사업 3차 850대 운영, 귀하신분 캠페인 16년 지속, 카스 0.0 올림픽 파트너십을 달성했습니다. 환경보전 영역에서는 태양광 7.3MW 설치로 연간 2,800톤 CO2 감축, 몽골 46,500그루 조림 16년, 트레이 없는 포장으로 662톤 CO2 절감, 주요 포장재 68% 재활용률을 기록했습니다. 지역나눔 영역에서는 행복도서관 12개소, 생수 88만병 기부, 장학금 14억원 지원 실적을 보유하고 있습니다."
            }
          },
          {
            "@type": "Question",
            "name": "오비맥주 ESG의 경쟁력은 무엇인가요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "오비맥주의 ESG 경쟁력은 장기 지속성과 사회적 영향력입니다. 몽골 조림 프로젝트는 16년째 지속되는 대표적인 환경보전 활동이며, 행복도서관은 10년째 운영 중인 지역 문화 기여 사업입니다. 음주운전 방지장치 시범사업은 민간 기업 최초로 추진하여 법 제도 개선까지 이끌어낸 사회적 가치 창출 사례입니다. AB InBev 글로벌 네트워크를 활용한 Best Practice 공유와 2040 넷제로 등 명확한 장기 목표 설정도 주요 강점입니다."
            }
          }
        ]
      }
      </script>
    <!--  페이지 계층 구조 표시 -->
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "홈",
            "item": "https://www.ob.co.kr"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "FAQ",
            "item": "https://www.ob.co.kr/sustainability/faq.php"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "지속가능경영",
            "item": "https://www.ob.co.kr/sustainability/faq.php"
          }
        ]
      }
      </script>
    <!--  ESG 활동을 컬렉션으로 구조화  -->
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "오비맥주 지속가능경영 FAQ",
        "description": "오비맥주의 ESG 활동과 지속가능경영에 대한 자주 묻는 질문",
        "about": [
          {
            "@type": "Thing",
            "name": "책임음주",
            "description": "음주운전 예방, 미성년자 보호, 건강한 음주 문화"
          },
          {
            "@type": "Thing",
            "name": "환경보전",
            "description": "탄소중립, 재생에너지, 순환경제, 수자원 보호"
          },
          {
            "@type": "Thing",
            "name": "지역나눔",
            "description": "취약계층 지원, 장학사업, 문화 기여"
          }
        ]
      }
      </script>
  <?php endif; ?>
</head>


<body>
  <?php include __DIR__ . '/agegate.php'; ?>
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TXCLRPQ" height="0" width="0"
      style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->

  <!-- haeder -->
  <header class="site-header">
    <div class="header-inner">
      <div class="logo">
        <a href="/">
          <img src="/uploads/assets/img/common/ob-beer-logo.svg" alt="OB맥주 로고로 영어로 OB 한글로 오비맥주가 브랜드 컬러인 남색으로 표기되어 있습니다."
            title="OB 오비맥주 브랜드 로고">
        </a>
      </div>
      <button class="nav-toggle" type="button" aria-controls="primary-menu" aria-expanded="false" aria-label="메뉴 열기">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
      <nav id="primary-menu" class="gnb" aria-label="Primary Navigation" role="navigation">
        <ul class="menu-1depth">
          <?php
          $isFaq = isExact('/about/faq.php', $N) || isExact('/sustainability/faq.php', $N);
          $isAbout = isTop('/about', $N) && !$isFaq;
          ?>
          <li class="menu-item has-sub <?php echo $isAbout ? 'open-on-mobile' : ''; ?>">
            <a href="/about/" class="<?php echo $isAbout ? 'active' : ''; ?>"
              aria-expanded="<?php echo $isAbout ? 'true' : 'false'; ?>">기업소개</a>
            <ul class="menu-2depth">
              <li class="m2d-tit" aria-hidden="true">
                <h2>ABOUT</h2>
              </li>
              <li class="menu-item"><a href="/about/" class="<?php echo isExact('/about/', $N) ? 'active' : ''; ?>">오비맥주
                  소개</a></li>
              <li class="menu-item"><a href="/about/history.php"
                  class="<?php echo isExact('/about/history.php', $N) ? 'active' : ''; ?>">역사관</a>
              </li>
              <li class="menu-item"><a href="/about/markets.php"
                  class="<?php echo isExact('/about/markets.php', $N) ? 'active' : ''; ?>">수출현황</a>
              </li>
              <li class="menu-item"><a href="/about/partner.php"
                  class="<?php echo isExact('/about/partner.php', $N) ? 'active' : ''; ?>">동반성장</a>
              </li>
              <li class="menu-item"><a href="/about/contact.php"
                  class="<?php echo isExact('/about/contact.php', $N) ? 'active' : ''; ?>">찾아오시는 길</a>
              </li>
            </ul>
          </li>

          <li class="menu-item">
            <a href="/brands/" class="<?php echo isTop('/brands', $N) ? 'active' : ''; ?>">브랜드</a>
          </li>

          <li class="menu-item has-sub <?php echo isTop('/newsroom', $N) ? 'open-on-mobile' : ''; ?>">
            <a href="/newsroom/list.php" class="<?php echo isTop('/newsroom', $N) ? 'active' : ''; ?>"
              aria-expanded="<?php echo isTop('/newsroom', $N) ? 'true' : 'false'; ?>">뉴스룸</a>
            <ul class="menu-2depth">
              <li class="m2d-tit" aria-hidden="true">
                <h2>NEWSROOM</h2>
              </li>
              <li class="menu-item"><a href="/newsroom/list.php"
                  class="<?php echo isExact('/newsroom/list.php', $N) ? 'active' : ''; ?>">뉴스</a></li>
              <li class="menu-item"><a href="/newsroom/media.php"
                  class="<?php echo isExact('/newsroom/media.php', $N) ? 'active' : ''; ?>">미디어
                  라이브러리</a>
              </li>
            </ul>
          </li>

          <li class="menu-item">
            <a href="/career/" class="<?php echo isTop('/career', $N) ? 'active' : ''; ?>">인재채용</a>
          </li>

          <?php $isSustainability = isTop('/sustainability', $N) && !isExact('/sustainability/faq.php', $N); ?>
          <li class="menu-item has-sub <?php echo $isSustainability ? 'open-on-mobile' : ''; ?>">
            <a href="/sustainability/" class="<?php echo $isSustainability ? 'active' : ''; ?>"
              aria-expanded="<?php echo $isSustainability ? 'true' : 'false'; ?>">지속가능경영</a>
            <ul class="menu-2depth">
              <li class="m2d-tit" aria-hidden="true">
                <h2>SUSTAINABILITY</h2>
              </li>
              <li class="menu-item"><a href="/sustainability/"
                  class="<?php echo isExact('/sustainability/', $N) ? 'active' : ''; ?>">오비좋은세상 소개</a>
              </li>
              <li class="menu-item"><a href="/sustainability/drive.php"
                  class="<?php echo isExact('/sustainability/drive.php', $N) ? 'active' : ''; ?>">책임음주</a>
              </li>
              <li class="menu-item"><a href="/sustainability/ESG.php"
                  class="<?php echo isExact('/sustainability/ESG.php', $N) ? 'active' : ''; ?>">환경보전</a>
              </li>
              <li class="menu-item"><a href="/sustainability/social.php"
                  class="<?php echo isExact('/sustainability/social.php', $N) ? 'active' : ''; ?>">지역나눔</a>
              </li>
            </ul>
          </li>

          <li class="menu-item">
            <a href="/whoweare/" class="<?php echo isTop('/whoweare', $N) ? 'active' : ''; ?>">함께 빚어내는
              이야기</a>
          </li>

          <li class="menu-item has-sub <?php echo $isFaq ? 'open-on-mobile' : ''; ?>">
            <a href="/about/faq.php" class="<?php echo $isFaq ? 'active' : ''; ?>"
              aria-expanded="<?php echo $isFaq ? 'true' : 'false'; ?>">FAQ</a>
            <ul class="menu-2depth">
              <li class="m2d-tit" aria-hidden="true">
                <h2>FAQ</h2>
              </li>
              <li class="menu-item"><a href="/about/faq.php"
                  class="<?php echo isExact('/about/faq.php', $N) ? 'active' : ''; ?>">기업·브랜드</a>
              </li>
              <li class="menu-item"><a href="/sustainability/faq.php"
                  class="<?php echo isExact('/sustainability/faq.php', $N) ? 'active' : ''; ?>">지속가능경영</a>
              </li>
            </ul>
          </li>
        </ul>
        <div class="lang-m">
          <a href="#" lang="ko" hreflang="ko"><img src="/uploads/assets/img/common/flag-korean-language.png"
              alt="한국어 페이지로 보기 (대한민국 국기 아이콘)" title="한국어 페이지로 이동"></a>
          <a href="#" lang="en" hreflang="en"><img src="/uploads/assets/img/common/flag-english-language.png"
              alt="영문 페이지로 보기 (미국 국기 아이콘)" title="영문 페이지로 이동"></a>
        </div>
      </nav>
      <div class="nav-backdrop" hidden></div>
      <div class="lang">
        <a href="#" lang="ko" hreflang="ko"><img src="/uploads/assets/img/common/flag-korean-language.png"
            alt="한국어 페이지로 보기 (대한민국 국기 아이콘)" title="한국어 페이지로 이동"></a>
        <a href="#" lang="en" hreflang="en"><img src="/uploads/assets/img/common/flag-english-language.png"
            alt="영문 페이지로 보기 (미국 국기 아이콘)" title="영문 페이지로 이동"></a>
      </div>
    </div>
  </header>
