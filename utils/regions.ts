import {isEmpty} from "./helpers";
// fort

const CONTINENT_CODES = [
    {
        "display": "North America",
        "value": "C-NA"
    },
    {
        "display": "South America",
        "value": "C-SA"
    },
    {
        "display": "Asia",
        "value": "C-AS"
    },
    {
        "display": "Oceania",
        "value": "C-OC"
    },
    {
        "display": "Europe",
        "value": "C-EU"
    },
    {
        "display": "Africa",
        "value": "C-AF"
    }
];

const COUNTRY_CODES = [
    {
        "display": "United States of America",
        "value": "USA"
    },
    {
        "display": "Mexico",
        "value": "MEX"
    },
    {
        "display": "Canada",
        "value": "CAN"
    },
    {
        "display": "Argentina",
        "value": "ARG"
    },
    {
        "display": "Bolivia",
        "value": "BOL"
    },
    {
        "display": "Brazil",
        "value": "BRA"
    },
    {
        "display": "Chile",
        "value": "CHL"
    },
    {
        "display": "Colombia",
        "value": "COL"
    },
    {
        "display": "Ecuador",
        "value": "ECU"
    },
    {
        "display": "Guyana",
        "value": "GUY"
    },
    {
        "display": "Paraguay",
        "value": "PRY"
    },
    {
        "display": "Peru",
        "value": "PER"
    },
    {
        "display": "Suriname",
        "value": "SUR"
    },
    {
        "display": "Uruguay",
        "value": "URY"
    },
    {
        "display": "Venezuela",
        "value": "VEN"
    },
    {
        "display": "Afghanistan",
        "value": "AFG"
    },
    {
        "display": "Armenia",
        "value": "ARM"
    },
    {
        "display": "Azerbaijan",
        "value": "AZE"
    },
    {
        "display": "Bahrain",
        "value": "BHR"
    },
    {
        "display": "Bangladesh",
        "value": "BGD"
    },
    {
        "display": "Bhutan",
        "value": "BTN"
    },
    {
        "display": "Brunei",
        "value": "BRN"
    },
    {
        "display": "Cambodia",
        "value": "KHM"
    },
    {
        "display": "China",
        "value": "CHN"
    },
    {
        "display": "Cyprus",
        "value": "CYP"
    },
    {
        "display": "Georgia",
        "value": "GEO"
    },
    {
        "display": "India",
        "value": "IND"
    },
    {
        "display": "Indonesia",
        "value": "IDN"
    },
    {
        "display": "Iran",
        "value": "IRN"
    },
    {
        "display": "Iraq",
        "value": "IRQ"
    },
    {
        "display": "Israel",
        "value": "ISR"
    },
    {
        "display": "Japan",
        "value": "JPN"
    },
    {
        "display": "Jordan",
        "value": "JOR"
    },
    {
        "display": "Kazakhstan",
        "value": "KAZ"
    },
    {
        "display": "Kuwait",
        "value": "KWT"
    },
    {
        "display": "Kyrgyzstan",
        "value": "KGZ"
    },
    {
        "display": "Laos",
        "value": "LAO"
    },
    {
        "display": "Lebanon",
        "value": "LBN"
    },
    {
        "display": "Malaysia",
        "value": "MYS"
    },
    {
        "display": "Maldives",
        "value": "MDV"
    },
    {
        "display": "Mongolia",
        "value": "MNG"
    },
    {
        "display": "Myanmar",
        "value": "MMR"
    },
    {
        "display": "Nepal",
        "value": "NPL"
    },
    {
        "display": "North Korea",
        "value": "PRK"
    },
    {
        "display": "Oman",
        "value": "OMN"
    },
    {
        "display": "Pakistan",
        "value": "PAK"
    },
    {
        "display": "Palestine",
        "value": "PSE"
    },
    {
        "display": "Philippines",
        "value": "PHL"
    },
    {
        "display": "Qatar",
        "value": "QAT"
    },
    {
        "display": "Russia",
        "value": "RUS"
    },
    {
        "display": "Saudi Arabia",
        "value": "SAU"
    },
    {
        "display": "Singapore",
        "value": "SGP"
    },
    {
        "display": "South Korea",
        "value": "KOR"
    },
    {
        "display": "Sri Lanka",
        "value": "LKA"
    },
    {
        "display": "Syria",
        "value": "SYR"
    },
    {
        "display": "Taiwan",
        "value": "TWN"
    },
    {
        "display": "Tajikistan",
        "value": "TJK"
    },
    {
        "display": "Thailand",
        "value": "THA"
    },
    {
        "display": "Timor-Leste",
        "value": "TLS"
    },
    {
        "display": "Turkey",
        "value": "TUR"
    },
    {
        "display": "Turkmenistan",
        "value": "TKM"
    },
    {
        "display": "United Arab Emirates",
        "value": "ARE"
    },
    {
        "display": "Uzbekistan",
        "value": "UZB"
    },
    {
        "display": "Vietnam",
        "value": "VNM"
    },
    {
        "display": "Yemen",
        "value": "YEM"
    },
    {
        "display": "Australia",
        "value": "AUS"
    },
    {
        "display": "Fiji",
        "value": "FJI"
    },
    {
        "display": "Kiribati",
        "value": "KIR"
    },
    {
        "display": "Marshall Islands",
        "value": "MHL"
    },
    {
        "display": "Micronesia",
        "value": "FSM"
    },
    {
        "display": "Nauru",
        "value": "NRU"
    },
    {
        "display": "New Zealand",
        "value": "NZL"
    },
    {
        "display": "Palau",
        "value": "PLW"
    },
    {
        "display": "Papua New Guinea",
        "value": "PNG"
    },
    {
        "display": "Samoa",
        "value": "WSM"
    },
    {
        "display": "Solomon Islands",
        "value": "SLB"
    },
    {
        "display": "Tonga",
        "value": "TON"
    },
    {
        "display": "Tuvalu",
        "value": "TUV"
    },
    {
        "display": "Vanuatu",
        "value": "VUT"
    },
    {
        "display": "American Samoa",
        "value": "ASM"
    },
    {
        "display": "Cook Islands",
        "value": "COK"
    },
    {
        "display": "French Polynesia",
        "value": "PYF"
    },
    {
        "display": "Guam",
        "value": "GUM"
    },
    {
        "display": "New Caledonia",
        "value": "NCL"
    },
    {
        "display": "Niue",
        "value": "NIU"
    },
    {
        "display": "Norfolk Island",
        "value": "NFK"
    },
    {
        "display": "Northern Mariana Islands",
        "value": "MNP"
    },
    {
        "display": "Pitcairn Islands",
        "value": "PCN"
    },
    {
        "display": "Tokelau",
        "value": "TKL"
    },
    {
        "display": "Wake Island",
        "value": "WAK"
    },
    {
        "display": "Wallis and Futuna",
        "value": "WLF"
    },
    {
        "display": "Albania",
        "value": "ALB"
    },
    {
        "display": "Andorra",
        "value": "AND"
    },
    {
        "display": "Austria",
        "value": "AUT"
    },
    {
        "display": "Belarus",
        "value": "BLR"
    },
    {
        "display": "Belgium",
        "value": "BEL"
    },
    {
        "display": "Bosnia and Herzegovina",
        "value": "BIH"
    },
    {
        "display": "Bulgaria",
        "value": "BGR"
    },
    {
        "display": "Croatia",
        "value": "HRV"
    },
    {
        "display": "Czech Republic",
        "value": "CZE"
    },
    {
        "display": "Denmark",
        "value": "DNK"
    },
    {
        "display": "Estonia",
        "value": "EST"
    },
    {
        "display": "Finland",
        "value": "FIN"
    },
    {
        "display": "France",
        "value": "FRA"
    },
    {
        "display": "Germany",
        "value": "DEU"
    },
    {
        "display": "Greece",
        "value": "GRC"
    },
    {
        "display": "Hungary",
        "value": "HUN"
    },
    {
        "display": "Iceland",
        "value": "ISL"
    },
    {
        "display": "Ireland",
        "value": "IRL"
    },
    {
        "display": "Italy",
        "value": "ITA"
    },
    {
        "display": "Kosovo",
        "value": "KSV"
    },
    {
        "display": "Latvia",
        "value": "LVA"
    },
    {
        "display": "Liechtenstein",
        "value": "LIE"
    },
    {
        "display": "Lithuania",
        "value": "LTU"
    },
    {
        "display": "Luxembourg",
        "value": "LUX"
    },
    {
        "display": "Malta",
        "value": "MLT"
    },
    {
        "display": "Moldova",
        "value": "MDA"
    },
    {
        "display": "Monaco",
        "value": "MCO"
    },
    {
        "display": "Montenegro",
        "value": "MNE"
    },
    {
        "display": "Netherlands",
        "value": "NLD"
    },
    {
        "display": "North Macedonia",
        "value": "MKD"
    },
    {
        "display": "Norway",
        "value": "NOR"
    },
    {
        "display": "Poland",
        "value": "POL"
    },
    {
        "display": "Portugal",
        "value": "PRT"
    },
    {
        "display": "Romania",
        "value": "ROU"
    },
    {
        "display": "San Marino",
        "value": "SMR"
    },
    {
        "display": "Serbia",
        "value": "SRB"
    },
    {
        "display": "Slovakia",
        "value": "SVK"
    },
    {
        "display": "Slovenia",
        "value": "SVN"
    },
    {
        "display": "Spain",
        "value": "ESP"
    },
    {
        "display": "Sweden",
        "value": "SWE"
    },
    {
        "display": "Switzerland",
        "value": "CHE"
    },
    {
        "display": "Ukraine",
        "value": "UKR"
    },
    {
        "display": "United Kingdom",
        "value": "GBR"
    },
    {
        "display": "Algeria",
        "value": "DZA"
    },
    {
        "display": "Angola",
        "value": "AGO"
    },
    {
        "display": "Benin",
        "value": "BEN"
    },
    {
        "display": "Botswana",
        "value": "BWA"
    },
    {
        "display": "Burkina Faso",
        "value": "BFA"
    },
    {
        "display": "Burundi",
        "value": "BDI"
    },
    {
        "display": "Cape Verde",
        "value": "CPV"
    },
    {
        "display": "Cameroon",
        "value": "CMR"
    },
    {
        "display": "Central African Republic",
        "value": "CAF"
    },
    {
        "display": "Chad",
        "value": "TCD"
    },
    {
        "display": "Comoros",
        "value": "COM"
    },
    {
        "display": "Democratic Republic of the Congo",
        "value": "COD"
    },
    {
        "display": "Cote d'Ivoire",
        "value": "CIV"
    },
    {
        "display": "Djibouti",
        "value": "DJI"
    },
    {
        "display": "Egypt",
        "value": "EGY"
    },
    {
        "display": "Equatorial Guinea",
        "value": "GNQ"
    },
    {
        "display": "Eritrea",
        "value": "ERI"
    },
    {
        "display": "Eswatini",
        "value": "SWZ"
    },
    {
        "display": "Ethiopia",
        "value": "ETH"
    },
    {
        "display": "Gabon",
        "value": "GAB"
    },
    {
        "display": "Gambia",
        "value": "GMB"
    },
    {
        "display": "Ghana",
        "value": "GHA"
    },
    {
        "display": "Guinea",
        "value": "GIN"
    },
    {
        "display": "Guinea-Bissau",
        "value": "GNB"
    },
    {
        "display": "Kenya",
        "value": "KEN"
    },
    {
        "display": "Lesotho",
        "value": "LSO"
    },
    {
        "display": "Liberia",
        "value": "LBR"
    },
    {
        "display": "Libya",
        "value": "LBY"
    },
    {
        "display": "Madagascar",
        "value": "MDG"
    },
    {
        "display": "Malawi",
        "value": "MWI"
    },
    {
        "display": "Mali",
        "value": "MLI"
    },
    {
        "display": "Mauritania",
        "value": "MRT"
    },
    {
        "display": "Mauritius",
        "value": "MUS"
    },
    {
        "display": "Morocco",
        "value": "MAR"
    },
    {
        "display": "Mozambique",
        "value": "MOZ"
    },
    {
        "display": "Namibia",
        "value": "NAM"
    },
    {
        "display": "Niger",
        "value": "NER"
    },
    {
        "display": "Nigeria",
        "value": "NGA"
    },
    {
        "display": "Rwanda",
        "value": "RWA"
    },
    {
        "display": "Sao Tome and Principe",
        "value": "STP"
    },
    {
        "display": "Senegal",
        "value": "SEN"
    },
    {
        "display": "Seychelles",
        "value": "SYC"
    },
    {
        "display": "Sierra Leone",
        "value": "SLE"
    },
    {
        "display": "Somalia",
        "value": "SOM"
    },
    {
        "display": "South Africa",
        "value": "ZAF"
    },
    {
        "display": "South Sudan",
        "value": "SSD"
    },
    {
        "display": "Sudan",
        "value": "SDN"
    },
    {
        "display": "Tanzania",
        "value": "TZA"
    },
    {
        "display": "Togo",
        "value": "TGO"
    },
    {
        "display": "Tunisia",
        "value": "TUN"
    },
    {
        "display": "Uganda",
        "value": "UGA"
    },
    {
        "display": "Zambia",
        "value": "ZMB"
    },
    {
        "display": "Zimbabwe",
        "value": "ZWE"
    },
    {
        "display": "Guatemala",
        "value": "GTM"
    },
    {
        "display": "Cuba",
        "value": "CUB"
    },
    {
        "display": "Haiti",
        "value": "HTI"
    },
    {
        "display": "Dominican Republic",
        "value": "DOM"
    },
    {
        "display": "Honduras",
        "value": "HND"
    },
    {
        "display": "Nicaragua",
        "value": "NIC"
    },
    {
        "display": "El Salvador",
        "value": "SLV"
    },
    {
        "display": "Costa Rica",
        "value": "CRI"
    },
    {
        "display": "Panama",
        "value": "PAN"
    },
    {
        "display": "Jamaica",
        "value": "JAM"
    },
    {
        "display": "Trinidad and Tobago",
        "value": "TTO"
    },
    {
        "display": "Belize",
        "value": "BLZ"
    },
    {
        "display": "Bahamas",
        "value": "BHS"
    },
    {
        "display": "Barbados",
        "value": "BRB"
    },
    {
        "display": "Saint Lucia",
        "value": "LCA"
    },
    {
        "display": "Grenada",
        "value": "GRD"
    },
    {
        "display": "Saint Vincent and the Grenadines",
        "value": "VCT"
    },
    {
        "display": "Antigua and Barbuda",
        "value": "ATG"
    },
    {
        "display": "Dominica",
        "value": "DMA"
    },
    {
        "display": "Saint Kitts and Nevis",
        "value": "KNA"
    },
    {
        "display": "Puerto Rico",
        "value": "PRI"
    }
];

const STATE_CODES = [
        {
            "display": " Oost-Vlaanderen",
            "value": "OV",
            "country_code": "BEL"
        },
        {
            "display": "'Asīr",
            "value": "14",
            "country_code": "SAU"
        },
        {
            "display": "'Eua",
            "value": "01",
            "country_code": "TON"
        },
        {
            "display": "A'ana",
            "value": "AA",
            "country_code": "WSM"
        },
        {
            "display": "Aakkâr",
            "value": "AK",
            "country_code": "LBN"
        },
        {
            "display": "Aargau",
            "value": "AG",
            "country_code": "CHE"
        },
        {
            "display": "Aberdeen City",
            "value": "AD",
            "country_code": "GBR"
        },
        {
            "display": "Aberdeenshire",
            "value": "AB",
            "country_code": "GBR"
        },
        {
            "display": "Abia",
            "value": "AB",
            "country_code": "NGA"
        },
        {
            "display": "Abidjan",
            "value": "AB",
            "country_code": "CIV"
        },
        {
            "display": "Abim",
            "value": "01",
            "country_code": "UGA"
        },
        {
            "display": "Abra",
            "value": "AB",
            "country_code": "PHL"
        },
        {
            "display": "Abuja Federal Capital Territory",
            "value": "FC",
            "country_code": "NGA"
        },
        {
            "display": "Abyan",
            "value": "AB",
            "country_code": "YEM"
        },
        {
            "display": "Abū Z̧aby",
            "value": "AZ",
            "country_code": "ARE"
        },
        {
            "display": "Aceh",
            "value": "AC",
            "country_code": "IDN"
        },
        {
            "display": "Acquaviva",
            "value": "AC",
            "country_code": "SMR"
        },
        {
            "display": "Ad Daqahlīyah",
            "value": "DK",
            "country_code": "EGY"
        },
        {
            "display": "Ad Dawḩah",
            "value": "DA",
            "country_code": "QAT"
        },
        {
            "display": "Ad Dākhilīyah",
            "value": "DA",
            "country_code": "OMN"
        },
        {
            "display": "Adamaoua",
            "value": "AD",
            "country_code": "CMR"
        },
        {
            "display": "Adamawa",
            "value": "AD",
            "country_code": "NGA"
        },
        {
            "display": "Adana",
            "value": "01",
            "country_code": "TUR"
        },
        {
            "display": "Adjumani",
            "value": "02",
            "country_code": "UGA"
        },
        {
            "display": "Adrar",
            "value": "AD",
            "country_code": "MRT"
        },
        {
            "display": "Adygey",
            "value": "AD",
            "country_code": "RUS"
        },
        {
            "display": "Adıyaman",
            "value": "02",
            "country_code": "TUR"
        },
        {
            "display": "Afyonkarahisar",
            "value": "03",
            "country_code": "TUR"
        },
        {
            "display": "Agadez",
            "value": "AG",
            "country_code": "NER"
        },
        {
            "display": "Agago",
            "value": "78",
            "country_code": "UGA"
        },
        {
            "display": "Agalega Islands",
            "value": "AG",
            "country_code": "MUS"
        },
        {
            "display": "Agder",
            "value": "AG",
            "country_code": "NOR"
        },
        {
            "display": "Aguascalientes",
            "value": "AG",
            "country_code": "MEX"
        },
        {
            "display": "Agusan del Norte",
            "value": "AN",
            "country_code": "PHL"
        },
        {
            "display": "Agusan del Sur",
            "value": "AS",
            "country_code": "PHL"
        },
        {
            "display": "Ahal",
            "value": "AL",
            "country_code": "TKM"
        },
        {
            "display": "Ahuachapán",
            "value": "AH",
            "country_code": "SLV"
        },
        {
            "display": "Ahvenanmaan maakunta | Landskapet Åland",
            "value": "AH",
            "country_code": "FIN"
        },
        {
            "display": "Aiga-i-le-Tai",
            "value": "AL",
            "country_code": "WSM"
        },
        {
            "display": "Aileu | Aileu",
            "value": "AL",
            "country_code": "TLS"
        },
        {
            "display": "Ainaro | Ainaru",
            "value": "AN",
            "country_code": "TLS"
        },
        {
            "display": "Aisén del General Carlos Ibañez del Campo",
            "value": "AI",
            "country_code": "CHL"
        },
        {
            "display": "Ajlun",
            "value": "AJ",
            "country_code": "JOR"
        },
        {
            "display": "Aklan",
            "value": "AK",
            "country_code": "PHL"
        },
        {
            "display": "Aksaray",
            "value": "68",
            "country_code": "TUR"
        },
        {
            "display": "Akwa Ibom",
            "value": "AK",
            "country_code": "NGA"
        },
        {
            "display": "Al Anbār",
            "value": "AN",
            "country_code": "IRQ"
        },
        {
            "display": "Al Awsaţ",
            "value": "MA",
            "country_code": "ERI"
        },
        {
            "display": "Al Aḩmadī",
            "value": "AH",
            "country_code": "KWT"
        },
        {
            "display": "Al Bayḑā’",
            "value": "BA",
            "country_code": "YEM"
        },
        {
            "display": "Al Başrah",
            "value": "BA",
            "country_code": "IRQ"
        },
        {
            "display": "Al Baḩr al Aḩmar",
            "value": "BA",
            "country_code": "EGY"
        },
        {
            "display": "Al Buraymī",
            "value": "BU",
            "country_code": "OMN"
        },
        {
            "display": "Al Butnan",
            "value": "BN",
            "country_code": "LBY"
        },
        {
            "display": "Al Buḩayrah",
            "value": "BH",
            "country_code": "EGY"
        },
        {
            "display": "Al Bāḩah",
            "value": "11",
            "country_code": "SAU"
        },
        {
            "display": "Al Farwānīyah",
            "value": "FA",
            "country_code": "KWT"
        },
        {
            "display": "Al Fayyūm",
            "value": "FYM",
            "country_code": "EGY"
        },
        {
            "display": "Al Fujayrah",
            "value": "FU",
            "country_code": "ARE"
        },
        {
            "display": "Al Gharbīyah",
            "value": "GH",
            "country_code": "EGY"
        },
        {
            "display": "Al Iskandarīyah",
            "value": "ALX",
            "country_code": "EGY"
        },
        {
            "display": "Al Ismā'īlīyah",
            "value": "IS",
            "country_code": "EGY"
        },
        {
            "display": "Al Jabal al Akhdar",
            "value": "JK",
            "country_code": "LBY"
        },
        {
            "display": "Al Jabal al Gharbi",
            "value": "JG",
            "country_code": "LBY"
        },
        {
            "display": "Al Jahrā’",
            "value": "JA",
            "country_code": "KWT"
        },
        {
            "display": "Al Janūbī",
            "value": "DU",
            "country_code": "ERI"
        },
        {
            "display": "Al Janūbīyah | المحافظة الجنوبية",
            "value": "14",
            "country_code": "BHR"
        },
        {
            "display": "Al Jawf",
            "value": "12",
            "country_code": "SAU"
        },
        {
            "display": "Al Jawf",
            "value": "JA",
            "country_code": "YEM"
        },
        {
            "display": "Al Jifarah",
            "value": "JR",
            "country_code": "LBY"
        },
        {
            "display": "Al Jufrah",
            "value": "JF",
            "country_code": "LBY"
        },
        {
            "display": "Al Jīzah",
            "value": "GZ",
            "country_code": "EGY"
        },
        {
            "display": "Al Khawr wa adh Dhakhīrah",
            "value": "KH",
            "country_code": "QAT"
        },
        {
            "display": "Al Kufrah",
            "value": "KU",
            "country_code": "LBY"
        },
        {
            "display": "Al Lādhiqīyah",
            "value": "LA",
            "country_code": "SYR"
        },
        {
            "display": "Al Madīnah al Munawwarah",
            "value": "03",
            "country_code": "SAU"
        },
        {
            "display": "Al Mahrah",
            "value": "MR",
            "country_code": "YEM"
        },
        {
            "display": "Al Marj",
            "value": "MA",
            "country_code": "LBY"
        },
        {
            "display": "Al Marqab",
            "value": "MR",
            "country_code": "LBY"
        },
        {
            "display": "Al Maḩwīt",
            "value": "MW",
            "country_code": "YEM"
        },
        {
            "display": "Al Minyā",
            "value": "MN",
            "country_code": "EGY"
        },
        {
            "display": "Al Minūfīyah",
            "value": "MNF",
            "country_code": "EGY"
        },
        {
            "display": "Al Muthanná",
            "value": "MU",
            "country_code": "IRQ"
        },
        {
            "display": "Al Muḩarraq | محافظة المحرق",
            "value": "15",
            "country_code": "BHR"
        },
        {
            "display": "Al Qalyūbīyah",
            "value": "KB",
            "country_code": "EGY"
        },
        {
            "display": "Al Qaşīm",
            "value": "05",
            "country_code": "SAU"
        },
        {
            "display": "Al Qunayţirah",
            "value": "QU",
            "country_code": "SYR"
        },
        {
            "display": "Al Qādisīyah",
            "value": "QA",
            "country_code": "IRQ"
        },
        {
            "display": "Al Qāhirah",
            "value": "C",
            "country_code": "EGY"
        },
        {
            "display": "Al Uqşur",
            "value": "LX*",
            "country_code": "EGY"
        },
        {
            "display": "Al Wahat",
            "value": "AW",
            "country_code": "LBY"
        },
        {
            "display": "Al Wakrah",
            "value": "WA",
            "country_code": "QAT"
        },
        {
            "display": "Al Wusţá",
            "value": "WU",
            "country_code": "OMN"
        },
        {
            "display": "Al Wādī al Jadīd",
            "value": "WAD",
            "country_code": "EGY"
        },
        {
            "display": "Al Ḩasakah",
            "value": "HA",
            "country_code": "SYR"
        },
        {
            "display": "Al Ḩudaydah",
            "value": "HU",
            "country_code": "YEM"
        },
        {
            "display": "Al Ḩudūd ash Shamālīyah",
            "value": "08",
            "country_code": "SAU"
        },
        {
            "display": "Al ‘Āşimah",
            "value": "KU",
            "country_code": "KWT"
        },
        {
            "display": "Al ‘Āşimah | محافظة العاصمة",
            "value": "13",
            "country_code": "BHR"
        },
        {
            "display": "Alabama",
            "value": "AL",
            "country_code": "USA"
        },
        {
            "display": "Alajuela",
            "value": "AX",
            "country_code": "CRI"
        },
        {
            "display": "Alaska",
            "value": "AK",
            "country_code": "USA"
        },
        {
            "display": "Alba",
            "value": "AB",
            "country_code": "ROU"
        },
        {
            "display": "Albay",
            "value": "AL",
            "country_code": "PHL"
        },
        {
            "display": "Alberta",
            "value": "AB",
            "country_code": "CAN"
        },
        {
            "display": "Alborz",
            "value": "30",
            "country_code": "IRN"
        },
        {
            "display": "Alebtong",
            "value": "79",
            "country_code": "UGA"
        },
        {
            "display": "Alibori",
            "value": "AL",
            "country_code": "BEN"
        },
        {
            "display": "Almaty",
            "value": "AA",
            "country_code": "KAZ"
        },
        {
            "display": "Almaty [City]",
            "value": "AC",
            "country_code": "KAZ"
        },
        {
            "display": "Alta Verapaz",
            "value": "AV",
            "country_code": "GTM"
        },
        {
            "display": "Altay",
            "value": "AL",
            "country_code": "RUS"
        },
        {
            "display": "Alytaus apskritis",
            "value": "AL",
            "country_code": "LTU"
        },
        {
            "display": "Amasya",
            "value": "05",
            "country_code": "TUR"
        },
        {
            "display": "Amazonas",
            "value": "AM",
            "country_code": "COL"
        },
        {
            "display": "Amazonas",
            "value": "ZX",
            "country_code": "VEN"
        },
        {
            "display": "Amazonas | Amarumayu",
            "value": "AM",
            "country_code": "PER"
        },
        {
            "display": "American Samoa",
            "value": "AS",
            "country_code": "AUS"
        },
        {
            "display": "Amman",
            "value": "AM",
            "country_code": "JOR"
        },
        {
            "display": "Amnat Charoen | อำนาจเจริญ",
            "value": "ACR",
            "country_code": "THA"
        },
        {
            "display": "Amolatar",
            "value": "03",
            "country_code": "UGA"
        },
        {
            "display": "Amudat",
            "value": "80",
            "country_code": "UGA"
        },
        {
            "display": "Amur",
            "value": "AM",
            "country_code": "RUS"
        },
        {
            "display": "Amuria",
            "value": "04",
            "country_code": "UGA"
        },
        {
            "display": "Amuru",
            "value": "39",
            "country_code": "UGA"
        },
        {
            "display": "An Giang",
            "value": "44",
            "country_code": "VNM"
        },
        {
            "display": "An Najaf",
            "value": "NA",
            "country_code": "IRQ"
        },
        {
            "display": "An Nuqat al Khams",
            "value": "NK",
            "country_code": "LBY"
        },
        {
            "display": "Anambra",
            "value": "AN",
            "country_code": "NGA"
        },
        {
            "display": "Ancash | Anqash",
            "value": "AN",
            "country_code": "PER"
        },
        {
            "display": "Andalucía",
            "value": "AN",
            "country_code": "ESP"
        },
        {
            "display": "Andaman and Nicobar Islands",
            "value": "AN",
            "country_code": "IND"
        },
        {
            "display": "Andhra Pradesh",
            "value": "AP",
            "country_code": "IND"
        },
        {
            "display": "Andijon",
            "value": "AN",
            "country_code": "UZB"
        },
        {
            "display": "Andorra la Vella",
            "value": "AN",
            "country_code": "AND"
        },
        {
            "display": "Andrijevica",
            "value": "AN",
            "country_code": "MNE"
        },
        {
            "display": "Ang Thong | อ่างทอง",
            "value": "ATG",
            "country_code": "THA"
        },
        {
            "display": "Anguilla",
            "value": "AI",
            "country_code": "GBR"
        },
        {
            "display": "Angus",
            "value": "AN",
            "country_code": "GBR"
        },
        {
            "display": "Anhui Province | 安徽省",
            "value": "AH",
            "country_code": "CHN"
        },
        {
            "display": "Anjouan",
            "value": "AN",
            "country_code": "COM"
        },
        {
            "display": "Ankara",
            "value": "06",
            "country_code": "TUR"
        },
        {
            "display": "Annobón",
            "value": "AN",
            "country_code": "GNQ"
        },
        {
            "display": "Ansabā",
            "value": "AN",
            "country_code": "ERI"
        },
        {
            "display": "Anse Boileau",
            "value": "AB",
            "country_code": "SYC"
        },
        {
            "display": "Anse Royale",
            "value": "RO",
            "country_code": "SYC"
        },
        {
            "display": "Anse aux Pins",
            "value": "PI",
            "country_code": "SYC"
        },
        {
            "display": "Anse Étoile",
            "value": "ET",
            "country_code": "SYC"
        },
        {
            "display": "Antalya",
            "value": "07",
            "country_code": "TUR"
        },
        {
            "display": "Antananarivo",
            "value": "AV",
            "country_code": "MDG"
        },
        {
            "display": "Antioquia",
            "value": "AN",
            "country_code": "COL"
        },
        {
            "display": "Antique",
            "value": "AQ",
            "country_code": "PHL"
        },
        {
            "display": "Antofagasta",
            "value": "AN",
            "country_code": "CHL"
        },
        {
            "display": "Antrim and Newtownabbey",
            "value": "AA",
            "country_code": "GBR"
        },
        {
            "display": "Antsiranana",
            "value": "AS",
            "country_code": "MDG"
        },
        {
            "display": "Antwerpen",
            "value": "AP",
            "country_code": "BEL"
        },
        {
            "display": "Anzoátegui",
            "value": "BX",
            "country_code": "VEN"
        },
        {
            "display": "Apac",
            "value": "05",
            "country_code": "UGA"
        },
        {
            "display": "Apayao",
            "value": "AP",
            "country_code": "PHL"
        },
        {
            "display": "Appenzell Ausserrhoden ",
            "value": "AR",
            "country_code": "CHE"
        },
        {
            "display": "Appenzell Innerrhoden ",
            "value": "AI",
            "country_code": "CHE"
        },
        {
            "display": "Apure",
            "value": "CX",
            "country_code": "VEN"
        },
        {
            "display": "Apurímac | Apurimaq",
            "value": "AP",
            "country_code": "PER"
        },
        {
            "display": "Aqaba",
            "value": "AQ",
            "country_code": "JOR"
        },
        {
            "display": "Aqmola",
            "value": "AM",
            "country_code": "KAZ"
        },
        {
            "display": "Aqtöbe",
            "value": "AT",
            "country_code": "KAZ"
        },
        {
            "display": "Ar Raqqah",
            "value": "RA",
            "country_code": "SYR"
        },
        {
            "display": "Ar Rayyān",
            "value": "RA",
            "country_code": "QAT"
        },
        {
            "display": "Ar Riyāḑ",
            "value": "01",
            "country_code": "SAU"
        },
        {
            "display": "Arad",
            "value": "AR",
            "country_code": "ROU"
        },
        {
            "display": "Aragac̣otn",
            "value": "AG",
            "country_code": "ARM"
        },
        {
            "display": "Aragua",
            "value": "DX",
            "country_code": "VEN"
        },
        {
            "display": "Aragón",
            "value": "AR",
            "country_code": "ESP"
        },
        {
            "display": "Ararat",
            "value": "AR",
            "country_code": "ARM"
        },
        {
            "display": "Arauca",
            "value": "AR",
            "country_code": "COL"
        },
        {
            "display": "Arbīl",
            "value": "AR",
            "country_code": "IRQ"
        },
        {
            "display": "Ardabīl",
            "value": "24",
            "country_code": "IRN"
        },
        {
            "display": "Ardahan",
            "value": "75",
            "country_code": "TUR"
        },
        {
            "display": "Ards and North Down",
            "value": "AR",
            "country_code": "GBR"
        },
        {
            "display": "Arequipa | Ariqipa",
            "value": "AR",
            "country_code": "PER"
        },
        {
            "display": "Arges",
            "value": "AG",
            "country_code": "ROU"
        },
        {
            "display": "Argyll and Bute",
            "value": "AL",
            "country_code": "GBR"
        },
        {
            "display": "Arhangay",
            "value": "AR",
            "country_code": "MNG"
        },
        {
            "display": "Ariana",
            "value": "AN",
            "country_code": "TUN"
        },
        {
            "display": "Arica y Parinacota",
            "value": "AP",
            "country_code": "CHL"
        },
        {
            "display": "Arizona",
            "value": "AZ",
            "country_code": "USA"
        },
        {
            "display": "Arkansas",
            "value": "AR",
            "country_code": "USA"
        },
        {
            "display": "Arkhabīl Suquţrá",
            "value": "SU",
            "country_code": "YEM"
        },
        {
            "display": "Arkhangel'sk",
            "value": "AR",
            "country_code": "RUS"
        },
        {
            "display": "Armagh City, Banbridge and Craigavon",
            "value": "AC",
            "country_code": "GBR"
        },
        {
            "display": "Armavir",
            "value": "AV",
            "country_code": "ARM"
        },
        {
            "display": "Arta",
            "value": "AR",
            "country_code": "DJI"
        },
        {
            "display": "Artemisa",
            "value": "AR",
            "country_code": "CUB"
        },
        {
            "display": "Artibonite | Latibonit",
            "value": "AR",
            "country_code": "HTI"
        },
        {
            "display": "Artvin",
            "value": "08",
            "country_code": "TUR"
        },
        {
            "display": "Arua",
            "value": "06",
            "country_code": "UGA"
        },
        {
            "display": "Arunachal Pradesh",
            "value": "AR",
            "country_code": "IND"
        },
        {
            "display": "Arusha",
            "value": "AS",
            "country_code": "TZA"
        },
        {
            "display": "As Sulaymānīyah",
            "value": "SU",
            "country_code": "IRQ"
        },
        {
            "display": "As Suwaydā'",
            "value": "SU",
            "country_code": "SYR"
        },
        {
            "display": "As Suways",
            "value": "SUZ",
            "country_code": "EGY"
        },
        {
            "display": "Ash Shamāl",
            "value": "MS",
            "country_code": "QAT"
        },
        {
            "display": "Ash Shamālīyah | المحافظة الشمالية",
            "value": "17",
            "country_code": "BHR"
        },
        {
            "display": "Ash Sharqīyah",
            "value": "04",
            "country_code": "SAU"
        },
        {
            "display": "Ash Sharqīyah",
            "value": "SHR",
            "country_code": "EGY"
        },
        {
            "display": "Ash Shāriqah",
            "value": "SH",
            "country_code": "ARE"
        },
        {
            "display": "Ash Shīḩānīyah",
            "value": "SH",
            "country_code": "QAT"
        },
        {
            "display": "Ashanti",
            "value": "AH",
            "country_code": "GHA"
        },
        {
            "display": "Ashgabat",
            "value": "AB",
            "country_code": "TKM"
        },
        {
            "display": "Assaba",
            "value": "AS",
            "country_code": "MRT"
        },
        {
            "display": "Assam",
            "value": "AS",
            "country_code": "IND"
        },
        {
            "display": "Astana",
            "value": "AS",
            "country_code": "KAZ"
        },
        {
            "display": "Astrakhan'",
            "value": "AS",
            "country_code": "RUS"
        },
        {
            "display": "Asturias Principado de",
            "value": "AS",
            "country_code": "ESP"
        },
        {
            "display": "Aswān",
            "value": "ASN",
            "country_code": "EGY"
        },
        {
            "display": "Asyūţ",
            "value": "AST",
            "country_code": "EGY"
        },
        {
            "display": "Atacama",
            "value": "AT",
            "country_code": "CHL"
        },
        {
            "display": "Atacora",
            "value": "AK",
            "country_code": "BEN"
        },
        {
            "display": "Atlantique",
            "value": "AQ",
            "country_code": "BEN"
        },
        {
            "display": "Atlántico",
            "value": "AT",
            "country_code": "COL"
        },
        {
            "display": "Atlántida",
            "value": "AT",
            "country_code": "HND"
        },
        {
            "display": "Attapu",
            "value": "AT",
            "country_code": "LAO"
        },
        {
            "display": "Attica",
            "value": "AT",
            "country_code": "GRC"
        },
        {
            "display": "Atua",
            "value": "AT",
            "country_code": "WSM"
        },
        {
            "display": "Atyrau",
            "value": "AR",
            "country_code": "KAZ"
        },
        {
            "display": "Au Cap",
            "value": "LO",
            "country_code": "SYC"
        },
        {
            "display": "Auckland",
            "value": "AL",
            "country_code": "NZL"
        },
        {
            "display": "Aurora",
            "value": "AU",
            "country_code": "PHL"
        },
        {
            "display": "Australian Capital Territory",
            "value": "ACT",
            "country_code": "AUS"
        },
        {
            "display": "Austurland",
            "value": "AU",
            "country_code": "ISL"
        },
        {
            "display": "Auvergne-Rhône-Alpes",
            "value": "AR",
            "country_code": "FRA"
        },
        {
            "display": "Avannaata",
            "value": "AV",
            "country_code": "GRL"
        },
        {
            "display": "Aveiro",
            "value": "AV",
            "country_code": "PRT"
        },
        {
            "display": "Awdal",
            "value": "AW",
            "country_code": "SOM"
        },
        {
            "display": "Ayacucho | Ayakuchu",
            "value": "AY",
            "country_code": "PER"
        },
        {
            "display": "Aydın",
            "value": "09",
            "country_code": "TUR"
        },
        {
            "display": "Ayeyarwady",
            "value": "AY",
            "country_code": "MMR"
        },
        {
            "display": "Az Zawiyah",
            "value": "ZW",
            "country_code": "LBY"
        },
        {
            "display": "Azuay",
            "value": "AX",
            "country_code": "ECU"
        },
        {
            "display": "Az̧ Z̧a‘āyin",
            "value": "ZA",
            "country_code": "QAT"
        },
        {
            "display": "Az̧ Z̧āhirah",
            "value": "ZA",
            "country_code": "OMN"
        },
        {
            "display": "Ağrı",
            "value": "04",
            "country_code": "TUR"
        },
        {
            "display": "Aḑ Ḑāli‘",
            "value": "DA",
            "country_code": "YEM"
        },
        {
            "display": "Ba",
            "value": "01",
            "country_code": "FJI"
        },
        {
            "display": "Ba Ria-Vung Tau",
            "value": "43",
            "country_code": "VNM"
        },
        {
            "display": "Baalbek-Hermel",
            "value": "BH",
            "country_code": "LBN"
        },
        {
            "display": "Bac Can",
            "value": "53",
            "country_code": "VNM"
        },
        {
            "display": "Bac Giang",
            "value": "54",
            "country_code": "VNM"
        },
        {
            "display": "Bac Lieu",
            "value": "55",
            "country_code": "VNM"
        },
        {
            "display": "Bac Ninh",
            "value": "56",
            "country_code": "VNM"
        },
        {
            "display": "Bacău",
            "value": "BC",
            "country_code": "ROU"
        },
        {
            "display": "Badakhshoni Kuni",
            "value": "BK",
            "country_code": "TJK"
        },
        {
            "display": "Badakhshān",
            "value": "BDS",
            "country_code": "AFG"
        },
        {
            "display": "Baden-Württemberg",
            "value": "BW",
            "country_code": "DEU"
        },
        {
            "display": "Bafatá",
            "value": "BA",
            "country_code": "GNB"
        },
        {
            "display": "Baghdād",
            "value": "BG",
            "country_code": "IRQ"
        },
        {
            "display": "Baghlān",
            "value": "BGL",
            "country_code": "AFG"
        },
        {
            "display": "Bagmati ",
            "value": "P3",
            "country_code": "NPL"
        },
        {
            "display": "Bago",
            "value": "BA",
            "country_code": "MMR"
        },
        {
            "display": "Bahamas",
            "value": "BS",
            "country_code": "BHS"
        },
        {
            "display": "Baie Lazare",
            "value": "BL",
            "country_code": "SYC"
        },
        {
            "display": "Baie Sainte Anne",
            "value": "BS",
            "country_code": "SYC"
        },
        {
            "display": "Baja California",
            "value": "BC",
            "country_code": "MEX"
        },
        {
            "display": "Baja California Sur",
            "value": "BS",
            "country_code": "MEX"
        },
        {
            "display": "Baja Verapaz",
            "value": "BV",
            "country_code": "GTM"
        },
        {
            "display": "Bakool",
            "value": "BK",
            "country_code": "SOM"
        },
        {
            "display": "Bakı",
            "value": "BA",
            "country_code": "AZE"
        },
        {
            "display": "Balaka",
            "value": "BA",
            "country_code": "MWI"
        },
        {
            "display": "Bali",
            "value": "BA",
            "country_code": "IDN"
        },
        {
            "display": "Balkan",
            "value": "BA",
            "country_code": "TKM"
        },
        {
            "display": "Balkh",
            "value": "BAL",
            "country_code": "AFG"
        },
        {
            "display": "Balochistan | بلوچستان",
            "value": "BA",
            "country_code": "PAK"
        },
        {
            "display": "Balqa",
            "value": "BA",
            "country_code": "JOR"
        },
        {
            "display": "Balıkesir",
            "value": "10",
            "country_code": "TUR"
        },
        {
            "display": "Bamako",
            "value": "BA",
            "country_code": "MLI"
        },
        {
            "display": "Bamingui-Bangoran",
            "value": "BB",
            "country_code": "CAF"
        },
        {
            "display": "Banaadir",
            "value": "BN",
            "country_code": "SOM"
        },
        {
            "display": "Bandarban",
            "value": "2A",
            "country_code": "BGD"
        },
        {
            "display": "Bangka-Belitung",
            "value": "BB",
            "country_code": "IDN"
        },
        {
            "display": "Bangkok | กรุงเทพมหานคร",
            "value": "BKK",
            "country_code": "THA"
        },
        {
            "display": "Bangui",
            "value": "BGF",
            "country_code": "CAF"
        },
        {
            "display": "Banska Bystrica",
            "value": "BC",
            "country_code": "SVK"
        },
        {
            "display": "Banten",
            "value": "BT",
            "country_code": "IDN"
        },
        {
            "display": "Banī Suwayf",
            "value": "BNS",
            "country_code": "EGY"
        },
        {
            "display": "Bar",
            "value": "BA",
            "country_code": "MNE"
        },
        {
            "display": "Baranya",
            "value": "BA",
            "country_code": "HUN"
        },
        {
            "display": "Barbados",
            "value": "BD",
            "country_code": "BRB"
        },
        {
            "display": "Barbuda",
            "value": "BD",
            "country_code": "ATG"
        },
        {
            "display": "Barh el Ghazel",
            "value": "BG",
            "country_code": "TCD"
        },
        {
            "display": "Bari",
            "value": "BR",
            "country_code": "SOM"
        },
        {
            "display": "Barima-Waini",
            "value": "BA",
            "country_code": "GUY"
        },
        {
            "display": "Barinas",
            "value": "EX",
            "country_code": "VEN"
        },
        {
            "display": "Baringo",
            "value": "01",
            "country_code": "KEN"
        },
        {
            "display": "Barisal",
            "value": "1B",
            "country_code": "BGD"
        },
        {
            "display": "Bartın",
            "value": "74",
            "country_code": "TUR"
        },
        {
            "display": "Bas-Sassandra",
            "value": "BA",
            "country_code": "CIV"
        },
        {
            "display": "Bas-Uélé",
            "value": "BU",
            "country_code": "COD"
        },
        {
            "display": "Basel-Landschaft ",
            "value": "BL",
            "country_code": "CHE"
        },
        {
            "display": "Basel-Stadt ",
            "value": "BS",
            "country_code": "CHE"
        },
        {
            "display": "Bashkortostan",
            "value": "BK",
            "country_code": "RUS"
        },
        {
            "display": "Basilan",
            "value": "BS",
            "country_code": "PHL"
        },
        {
            "display": "Basse-Kotto",
            "value": "BK",
            "country_code": "CAF"
        },
        {
            "display": "Bataan",
            "value": "BA",
            "country_code": "PHL"
        },
        {
            "display": "Batanes",
            "value": "BN",
            "country_code": "PHL"
        },
        {
            "display": "Batangas",
            "value": "BT",
            "country_code": "PHL"
        },
        {
            "display": "Batha",
            "value": "BA",
            "country_code": "TCD"
        },
        {
            "display": "Batken",
            "value": "BA",
            "country_code": "KGZ"
        },
        {
            "display": "Batman",
            "value": "72",
            "country_code": "TUR"
        },
        {
            "display": "Baucau | Baukau",
            "value": "BA",
            "country_code": "TLS"
        },
        {
            "display": "Bauchi",
            "value": "BA",
            "country_code": "NGA"
        },
        {
            "display": "Bay",
            "value": "BY",
            "country_code": "SOM"
        },
        {
            "display": "Bay of Plenty | Te Moana-a-Toi",
            "value": "BOP",
            "country_code": "NZL"
        },
        {
            "display": "Bayan-Ölgiy",
            "value": "BO",
            "country_code": "MNG"
        },
        {
            "display": "Bayanhongor",
            "value": "BH",
            "country_code": "MNG"
        },
        {
            "display": "Bayburt",
            "value": "69",
            "country_code": "TUR"
        },
        {
            "display": "Bayelsa",
            "value": "BY",
            "country_code": "NGA"
        },
        {
            "display": "Bayern",
            "value": "BY",
            "country_code": "DEU"
        },
        {
            "display": "Bayqonyr (1)",
            "value": "BY",
            "country_code": "KAZ"
        },
        {
            "display": "Beau Vallon",
            "value": "BV",
            "country_code": "SYC"
        },
        {
            "display": "Beijing Municipality | 北京市",
            "value": "BJ",
            "country_code": "CHN"
        },
        {
            "display": "Beja",
            "value": "BE",
            "country_code": "PRT"
        },
        {
            "display": "Bel Air",
            "value": "BA",
            "country_code": "SYC"
        },
        {
            "display": "Belait",
            "value": "BE",
            "country_code": "BRN"
        },
        {
            "display": "Belfast City",
            "value": "BF",
            "country_code": "GBR"
        },
        {
            "display": "Belgorod",
            "value": "BL",
            "country_code": "RUS"
        },
        {
            "display": "Belize",
            "value": "BZ",
            "country_code": "BLZ"
        },
        {
            "display": "Belombre",
            "value": "BO",
            "country_code": "SYC"
        },
        {
            "display": "Ben Arous",
            "value": "BA",
            "country_code": "TUN"
        },
        {
            "display": "Ben Tre",
            "value": "50",
            "country_code": "VNM"
        },
        {
            "display": "Bender [Tighina]",
            "value": "BD",
            "country_code": "MDA"
        },
        {
            "display": "Benghazi",
            "value": "BG",
            "country_code": "LBY"
        },
        {
            "display": "Bengkulu",
            "value": "BE",
            "country_code": "IDN"
        },
        {
            "display": "Bengo",
            "value": "BGO",
            "country_code": "AGO"
        },
        {
            "display": "Benguela",
            "value": "BGU",
            "country_code": "AGO"
        },
        {
            "display": "Benguet",
            "value": "BG",
            "country_code": "PHL"
        },
        {
            "display": "Benue",
            "value": "BE",
            "country_code": "NGA"
        },
        {
            "display": "Berane",
            "value": "BE",
            "country_code": "MNE"
        },
        {
            "display": "Berat",
            "value": "BE",
            "country_code": "ALB"
        },
        {
            "display": "Berea",
            "value": "BE",
            "country_code": "LSO"
        },
        {
            "display": "Berlin",
            "value": "BE",
            "country_code": "DEU"
        },
        {
            "display": "Bermuda",
            "value": "BM",
            "country_code": "GBR"
        },
        {
            "display": "Berne",
            "value": "BE",
            "country_code": "CHE"
        },
        {
            "display": "Bethlehem | Bayt Laḩm",
            "value": "BTH",
            "country_code": "PSE"
        },
        {
            "display": "Beyrouth",
            "value": "BA",
            "country_code": "LBN"
        },
        {
            "display": "Bihar",
            "value": "BR",
            "country_code": "IND"
        },
        {
            "display": "Bihor",
            "value": "BH",
            "country_code": "ROU"
        },
        {
            "display": "Bijelo Polje",
            "value": "BI",
            "country_code": "MNE"
        },
        {
            "display": "Bilecik",
            "value": "11",
            "country_code": "TUR"
        },
        {
            "display": "Biliran",
            "value": "BI",
            "country_code": "PHL"
        },
        {
            "display": "Bingöl",
            "value": "12",
            "country_code": "TUR"
        },
        {
            "display": "Binh Dinh",
            "value": "31",
            "country_code": "VNM"
        },
        {
            "display": "Binh Duong",
            "value": "57",
            "country_code": "VNM"
        },
        {
            "display": "Binh Phuoc",
            "value": "58",
            "country_code": "VNM"
        },
        {
            "display": "Binh Thuan",
            "value": "40",
            "country_code": "VNM"
        },
        {
            "display": "Biobío",
            "value": "BI",
            "country_code": "CHL"
        },
        {
            "display": "Bioko Norte",
            "value": "BN",
            "country_code": "GNQ"
        },
        {
            "display": "Bioko Sur",
            "value": "BS",
            "country_code": "GNQ"
        },
        {
            "display": "Biombo",
            "value": "BM",
            "country_code": "GNB"
        },
        {
            "display": "Bishkek",
            "value": "GB",
            "country_code": "KGZ"
        },
        {
            "display": "Bissau",
            "value": "BS",
            "country_code": "GNB"
        },
        {
            "display": "Bistrița-Năsăud",
            "value": "BN",
            "country_code": "ROU"
        },
        {
            "display": "Bitlis",
            "value": "13",
            "country_code": "TUR"
        },
        {
            "display": "Bizerte",
            "value": "BZ",
            "country_code": "TUN"
        },
        {
            "display": "Bié",
            "value": "BIE",
            "country_code": "AGO"
        },
        {
            "display": "Bjelovarsko-bilogorska županija",
            "value": "BJ",
            "country_code": "HRV"
        },
        {
            "display": "Black River",
            "value": "BL",
            "country_code": "MUS"
        },
        {
            "display": "Blaenau Gwent",
            "value": "BW",
            "country_code": "GBR"
        },
        {
            "display": "Blagoevgrad",
            "value": "BL",
            "country_code": "BGR"
        },
        {
            "display": "Blantyre",
            "value": "BL",
            "country_code": "MWI"
        },
        {
            "display": "Blekinge län",
            "value": "K",
            "country_code": "SWE"
        },
        {
            "display": "Blue Nile",
            "value": "BN",
            "country_code": "SDN"
        },
        {
            "display": "Boa Vista",
            "value": "BV",
            "country_code": "CPV"
        },
        {
            "display": "Boaco",
            "value": "BO",
            "country_code": "NIC"
        },
        {
            "display": "Bobonaro | Bobonaru",
            "value": "BO",
            "country_code": "TLS"
        },
        {
            "display": "Bocas del Toro",
            "value": "BT",
            "country_code": "PAN"
        },
        {
            "display": "Bogra",
            "value": "5C",
            "country_code": "BGD"
        },
        {
            "display": "Bohol",
            "value": "BO",
            "country_code": "PHL"
        },
        {
            "display": "Bokeo",
            "value": "BK",
            "country_code": "LAO"
        },
        {
            "display": "Boké",
            "value": "B",
            "country_code": "GIN"
        },
        {
            "display": "Bolama",
            "value": "BL",
            "country_code": "GNB"
        },
        {
            "display": "Bolikhamxai",
            "value": "BL",
            "country_code": "LAO"
        },
        {
            "display": "Bolu",
            "value": "14",
            "country_code": "TUR"
        },
        {
            "display": "Bolívar",
            "value": "BO",
            "country_code": "COL"
        },
        {
            "display": "Bolívar",
            "value": "BX",
            "country_code": "ECU"
        },
        {
            "display": "Bolívar",
            "value": "FX",
            "country_code": "VEN"
        },
        {
            "display": "Bomet",
            "value": "02",
            "country_code": "KEN"
        },
        {
            "display": "Bomi",
            "value": "BM",
            "country_code": "LBR"
        },
        {
            "display": "Bong",
            "value": "BG",
            "country_code": "LBR"
        },
        {
            "display": "Borgo Maggiore",
            "value": "BO",
            "country_code": "SMR"
        },
        {
            "display": "Borgou",
            "value": "BO",
            "country_code": "BEN"
        },
        {
            "display": "Borkou",
            "value": "BO",
            "country_code": "TCD"
        },
        {
            "display": "Borno",
            "value": "BO",
            "country_code": "NGA"
        },
        {
            "display": "Borski okrug",
            "value": "BO",
            "country_code": "SRB"
        },
        {
            "display": "Borsod-Abaúj-Zemplén",
            "value": "BAZ",
            "country_code": "HUN"
        },
        {
            "display": "Botoșani",
            "value": "BT",
            "country_code": "ROU"
        },
        {
            "display": "Boucle du Mouhoun",
            "value": "BO",
            "country_code": "BFA"
        },
        {
            "display": "Bouenza",
            "value": "11",
            "country_code": "COG"
        },
        {
            "display": "Bourgogne-Franche-Comté",
            "value": "BF",
            "country_code": "FRA"
        },
        {
            "display": "Boyacá",
            "value": "BO",
            "country_code": "COL"
        },
        {
            "display": "Braga",
            "value": "BR",
            "country_code": "PRT"
        },
        {
            "display": "Bragança",
            "value": "BC",
            "country_code": "PRT"
        },
        {
            "display": "Brakna",
            "value": "BR",
            "country_code": "MRT"
        },
        {
            "display": "Brandenburg",
            "value": "BB",
            "country_code": "DEU"
        },
        {
            "display": "Braničevski okrug",
            "value": "BR",
            "country_code": "SRB"
        },
        {
            "display": "Bratislava",
            "value": "BL",
            "country_code": "SVK"
        },
        {
            "display": "Brava",
            "value": "BR",
            "country_code": "CPV"
        },
        {
            "display": "Brașov",
            "value": "BV",
            "country_code": "ROU"
        },
        {
            "display": "Bremen",
            "value": "HB",
            "country_code": "DEU"
        },
        {
            "display": "Brestskaya voblasts'",
            "value": "BR",
            "country_code": "BLR"
        },
        {
            "display": "Bretagne",
            "value": "BR",
            "country_code": "FRA"
        },
        {
            "display": "Bridgend",
            "value": "BG",
            "country_code": "GBR"
        },
        {
            "display": "British Columbia",
            "value": "BC",
            "country_code": "CAN"
        },
        {
            "display": "British Virgin Islands",
            "value": "VG",
            "country_code": "GBR"
        },
        {
            "display": "Brodsko-posavska županija",
            "value": "BR",
            "country_code": "HRV"
        },
        {
            "display": "Brokopondo",
            "value": "BR",
            "country_code": "SUR"
        },
        {
            "display": "Brong-Ahafo",
            "value": "BA",
            "country_code": "GHA"
        },
        {
            "display": "Brunei and Muara",
            "value": "BM",
            "country_code": "BRN"
        },
        {
            "display": "Brussels Hoofdstedelijk Gewest",
            "value": "BHG",
            "country_code": "BEL"
        },
        {
            "display": "Bryansk",
            "value": "BR",
            "country_code": "RUS"
        },
        {
            "display": "Brăila",
            "value": "BR",
            "country_code": "ROU"
        },
        {
            "display": "Brčko District",
            "value": "BR",
            "country_code": "BIH"
        },
        {
            "display": "Bua",
            "value": "02",
            "country_code": "FJI"
        },
        {
            "display": "Bubanza",
            "value": "BB",
            "country_code": "BDI"
        },
        {
            "display": "Buckinghamshire",
            "value": "BK",
            "country_code": "GBR"
        },
        {
            "display": "Budaka",
            "value": "07",
            "country_code": "UGA"
        },
        {
            "display": "Bududa",
            "value": "49",
            "country_code": "UGA"
        },
        {
            "display": "Budva",
            "value": "BU",
            "country_code": "MNE"
        },
        {
            "display": "Bueng Kan | บึงกาฬ",
            "value": "BKN",
            "country_code": "THA"
        },
        {
            "display": "Bugiri",
            "value": "08",
            "country_code": "UGA"
        },
        {
            "display": "Buhweju",
            "value": "81",
            "country_code": "UGA"
        },
        {
            "display": "Buikwe",
            "value": "82",
            "country_code": "UGA"
        },
        {
            "display": "Bujumbura Mairie",
            "value": "BM",
            "country_code": "BDI"
        },
        {
            "display": "Bujumbura Rural",
            "value": "BL",
            "country_code": "BDI"
        },
        {
            "display": "Bukedea",
            "value": "83",
            "country_code": "UGA"
        },
        {
            "display": "Bukidnon",
            "value": "BK",
            "country_code": "PHL"
        },
        {
            "display": "Bukomansimbi",
            "value": "84",
            "country_code": "UGA"
        },
        {
            "display": "Bukwa",
            "value": "09",
            "country_code": "UGA"
        },
        {
            "display": "Bulacan",
            "value": "BU",
            "country_code": "PHL"
        },
        {
            "display": "Bulambuli",
            "value": "85",
            "country_code": "UGA"
        },
        {
            "display": "Bulgan",
            "value": "BU",
            "country_code": "MNG"
        },
        {
            "display": "Buliisa",
            "value": "10",
            "country_code": "UGA"
        },
        {
            "display": "Bumthang",
            "value": "BU",
            "country_code": "BTN"
        },
        {
            "display": "Bundibugyo",
            "value": "11",
            "country_code": "UGA"
        },
        {
            "display": "Bungoma",
            "value": "03",
            "country_code": "KEN"
        },
        {
            "display": "Burdur",
            "value": "15",
            "country_code": "TUR"
        },
        {
            "display": "Burgas",
            "value": "BU",
            "country_code": "BGR"
        },
        {
            "display": "Burgenland",
            "value": "BU",
            "country_code": "AUT"
        },
        {
            "display": "Buriram | บุรีรัมย์",
            "value": "BRM",
            "country_code": "THA"
        },
        {
            "display": "Bursa",
            "value": "16",
            "country_code": "TUR"
        },
        {
            "display": "Bururi",
            "value": "BR",
            "country_code": "BDI"
        },
        {
            "display": "Buryat",
            "value": "BU",
            "country_code": "RUS"
        },
        {
            "display": "Busan",
            "value": "26",
            "country_code": "KOR"
        },
        {
            "display": "Bushenyi",
            "value": "12",
            "country_code": "UGA"
        },
        {
            "display": "Busia",
            "value": "04",
            "country_code": "KEN"
        },
        {
            "display": "Busia",
            "value": "13",
            "country_code": "UGA"
        },
        {
            "display": "Butaleja",
            "value": "15",
            "country_code": "UGA"
        },
        {
            "display": "Butambala",
            "value": "86",
            "country_code": "UGA"
        },
        {
            "display": "Butha-Buthe",
            "value": "BB",
            "country_code": "LSO"
        },
        {
            "display": "Buvuma",
            "value": "87",
            "country_code": "UGA"
        },
        {
            "display": "Buxoro",
            "value": "BU",
            "country_code": "UZB"
        },
        {
            "display": "Buyende",
            "value": "88",
            "country_code": "UGA"
        },
        {
            "display": "Buzău",
            "value": "BZ",
            "country_code": "ROU"
        },
        {
            "display": "Bács-Kiskun",
            "value": "BK",
            "country_code": "HUN"
        },
        {
            "display": "Bântéay Méanchey",
            "value": "OM",
            "country_code": "KHM"
        },
        {
            "display": "Béja",
            "value": "BJ",
            "country_code": "TUN"
        },
        {
            "display": "Békés",
            "value": "BE",
            "country_code": "HUN"
        },
        {
            "display": "Béni Mellal-Khénifra",
            "value": "BK",
            "country_code": "MAR"
        },
        {
            "display": "Béqaa",
            "value": "BI",
            "country_code": "LBN"
        },
        {
            "display": "Bābil",
            "value": "BB",
            "country_code": "IRQ"
        },
        {
            "display": "Bādghīs",
            "value": "BDG",
            "country_code": "AFG"
        },
        {
            "display": "Bāmyān",
            "value": "BAM",
            "country_code": "AFG"
        },
        {
            "display": "Bălți",
            "value": "BA",
            "country_code": "MDA"
        },
        {
            "display": "Bătdâmbâng",
            "value": "BA",
            "country_code": "KHM"
        },
        {
            "display": "Bīnshangul Gumuz",
            "value": "BE",
            "country_code": "ETH"
        },
        {
            "display": "Būr Sa‘īd",
            "value": "PTS",
            "country_code": "EGY"
        },
        {
            "display": "Būshehr",
            "value": "18",
            "country_code": "IRN"
        },
        {
            "display": "Ca Mau",
            "value": "59",
            "country_code": "VNM"
        },
        {
            "display": "Cabañas",
            "value": "CA",
            "country_code": "SLV"
        },
        {
            "display": "Cabinda",
            "value": "CAB",
            "country_code": "AGO"
        },
        {
            "display": "Cabo Delgado",
            "value": "P",
            "country_code": "MOZ"
        },
        {
            "display": "Cacheu",
            "value": "CA",
            "country_code": "GNB"
        },
        {
            "display": "Caerphilly",
            "value": "CA",
            "country_code": "GBR"
        },
        {
            "display": "Cagayan",
            "value": "CG",
            "country_code": "PHL"
        },
        {
            "display": "Cajamarca | Kashamarka",
            "value": "CA",
            "country_code": "PER"
        },
        {
            "display": "Cakaudrove",
            "value": "03",
            "country_code": "FJI"
        },
        {
            "display": "Caldas",
            "value": "CA",
            "country_code": "COL"
        },
        {
            "display": "California",
            "value": "CA",
            "country_code": "USA"
        },
        {
            "display": "Camagüey",
            "value": "CM",
            "country_code": "CUB"
        },
        {
            "display": "Camarines Norte",
            "value": "CN",
            "country_code": "PHL"
        },
        {
            "display": "Camarines Sur",
            "value": "CS",
            "country_code": "PHL"
        },
        {
            "display": "Cambridgeshire",
            "value": "CB",
            "country_code": "GBR"
        },
        {
            "display": "Camiguin",
            "value": "CM",
            "country_code": "PHL"
        },
        {
            "display": "Campeche",
            "value": "CM",
            "country_code": "MEX"
        },
        {
            "display": "Can Tho",
            "value": "CT",
            "country_code": "VNM"
        },
        {
            "display": "Canarias",
            "value": "CN",
            "country_code": "ESP"
        },
        {
            "display": "Canillo",
            "value": "CA",
            "country_code": "AND"
        },
        {
            "display": "Cankuzo",
            "value": "CA",
            "country_code": "BDI"
        },
        {
            "display": "Cantabria",
            "value": "CB",
            "country_code": "ESP"
        },
        {
            "display": "Canterbury",
            "value": "CB",
            "country_code": "NZL"
        },
        {
            "display": "Cao Bang",
            "value": "4",
            "country_code": "VNM"
        },
        {
            "display": "Capellen | Kapellen",
            "value": "CA",
            "country_code": "LUX"
        },
        {
            "display": "Capital",
            "value": "MA",
            "country_code": "MDV"
        },
        {
            "display": "Capiz",
            "value": "CP",
            "country_code": "PHL"
        },
        {
            "display": "Caquetá",
            "value": "CA",
            "country_code": "COL"
        },
        {
            "display": "Carabobo",
            "value": "GX",
            "country_code": "VEN"
        },
        {
            "display": "Carazo",
            "value": "CA",
            "country_code": "NIC"
        },
        {
            "display": "Caraș-Severin",
            "value": "CS",
            "country_code": "ROU"
        },
        {
            "display": "Carchi",
            "value": "CX",
            "country_code": "ECU"
        },
        {
            "display": "Cardiff",
            "value": "CR",
            "country_code": "GBR"
        },
        {
            "display": "Cargados Carajos",
            "value": "CC",
            "country_code": "MUS"
        },
        {
            "display": "Carmarthenshire",
            "value": "CM",
            "country_code": "GBR"
        },
        {
            "display": "Cartago",
            "value": "CX",
            "country_code": "CRI"
        },
        {
            "display": "Casablanca-Settat",
            "value": "CS",
            "country_code": "MAR"
        },
        {
            "display": "Casanare",
            "value": "CA",
            "country_code": "COL"
        },
        {
            "display": "Cascade",
            "value": "CA",
            "country_code": "SYC"
        },
        {
            "display": "Cascades",
            "value": "CD",
            "country_code": "BFA"
        },
        {
            "display": "Castelo Branco",
            "value": "CA",
            "country_code": "PRT"
        },
        {
            "display": "Castilla y León",
            "value": "CL",
            "country_code": "ESP"
        },
        {
            "display": "Castilla-La Mancha",
            "value": "CM",
            "country_code": "ESP"
        },
        {
            "display": "Catalunya",
            "value": "CT",
            "country_code": "ESP"
        },
        {
            "display": "Catanduanes",
            "value": "CT",
            "country_code": "PHL"
        },
        {
            "display": "Cauca",
            "value": "CA",
            "country_code": "COL"
        },
        {
            "display": "Causeway Coast and Glens",
            "value": "CC",
            "country_code": "GBR"
        },
        {
            "display": "Cavite",
            "value": "CV",
            "country_code": "PHL"
        },
        {
            "display": "Cayman Islands",
            "value": "KY",
            "country_code": "GBR"
        },
        {
            "display": "Cayo",
            "value": "CY",
            "country_code": "BLZ"
        },
        {
            "display": "Cañar",
            "value": "FX",
            "country_code": "ECU"
        },
        {
            "display": "Cebu",
            "value": "CB",
            "country_code": "PHL"
        },
        {
            "display": "Central",
            "value": "CPM",
            "country_code": "PNG"
        },
        {
            "display": "Central",
            "value": "CE",
            "country_code": "SLB"
        },
        {
            "display": "Central",
            "value": "CE",
            "country_code": "MDV"
        },
        {
            "display": "Central",
            "value": "2",
            "country_code": "LKA"
        },
        {
            "display": "Central",
            "value": "CE",
            "country_code": "BWA"
        },
        {
            "display": "Central",
            "value": "CP",
            "country_code": "GHA"
        },
        {
            "display": "Central",
            "value": "CE",
            "country_code": "ZMB"
        },
        {
            "display": "Central Darfur",
            "value": "CD",
            "country_code": "SDN"
        },
        {
            "display": "Central Equatoria",
            "value": "BG",
            "country_code": "SSD"
        },
        {
            "display": "Central Greece",
            "value": "CG",
            "country_code": "GRC"
        },
        {
            "display": "Central Macedonia",
            "value": "CM",
            "country_code": "GRC"
        },
        {
            "display": "Central River",
            "value": "MC",
            "country_code": "GMB"
        },
        {
            "display": "Central Singapore",
            "value": "CS",
            "country_code": "SGP"
        },
        {
            "display": "Centrale",
            "value": "CE",
            "country_code": "TGO"
        },
        {
            "display": "Centre",
            "value": "CT",
            "country_code": "BFA"
        },
        {
            "display": "Centre",
            "value": "CE",
            "country_code": "CMR"
        },
        {
            "display": "Centre Est",
            "value": "CE",
            "country_code": "BFA"
        },
        {
            "display": "Centre Nord",
            "value": "CN",
            "country_code": "BFA"
        },
        {
            "display": "Centre Ouest",
            "value": "CO",
            "country_code": "BFA"
        },
        {
            "display": "Centre Sud",
            "value": "CS",
            "country_code": "BFA"
        },
        {
            "display": "Centre | Sant",
            "value": "CE",
            "country_code": "HTI"
        },
        {
            "display": "Centre-Val de Loire",
            "value": "CV",
            "country_code": "FRA"
        },
        {
            "display": "Centro Sur",
            "value": "CS",
            "country_code": "GNQ"
        },
        {
            "display": "Ceredigion",
            "value": "CG",
            "country_code": "GBR"
        },
        {
            "display": "Cesar",
            "value": "CE",
            "country_code": "COL"
        },
        {
            "display": "Cetinje",
            "value": "CE",
            "country_code": "MNE"
        },
        {
            "display": "Ceuta",
            "value": "CE",
            "country_code": "ESP"
        },
        {
            "display": "Chachoengsao | ฉะเชิงเทรา",
            "value": "CCO",
            "country_code": "THA"
        },
        {
            "display": "Chagang-do",
            "value": "4",
            "country_code": "PRK"
        },
        {
            "display": "Chahār Maḩāl va Bakhtīārī",
            "value": "14",
            "country_code": "IRN"
        },
        {
            "display": "Chai Nat | ชัยนาท",
            "value": "CNT",
            "country_code": "THA"
        },
        {
            "display": "Chaiyaphum | ชัยภูมิ",
            "value": "CPM",
            "country_code": "THA"
        },
        {
            "display": "Chalatenango",
            "value": "CH",
            "country_code": "SLV"
        },
        {
            "display": "Champasak",
            "value": "CH",
            "country_code": "LAO"
        },
        {
            "display": "Chandigarh",
            "value": "CH",
            "country_code": "IND"
        },
        {
            "display": "Chanthaburi | จันทบุรี",
            "value": "CTI",
            "country_code": "THA"
        },
        {
            "display": "Chari-Baguirmi",
            "value": "CB",
            "country_code": "TCD"
        },
        {
            "display": "Charlotte",
            "value": "CH",
            "country_code": "VCT"
        },
        {
            "display": "Chechnya",
            "value": "CN",
            "country_code": "RUS"
        },
        {
            "display": "Chelyabinsk",
            "value": "CL",
            "country_code": "RUS"
        },
        {
            "display": "Cherkaska oblast",
            "value": "CE",
            "country_code": "UKR"
        },
        {
            "display": "Chernihivska oblast",
            "value": "CV",
            "country_code": "UKR"
        },
        {
            "display": "Chernivetska oblast",
            "value": "CH",
            "country_code": "UKR"
        },
        {
            "display": "Chhattisgarh",
            "value": "CT",
            "country_code": "IND"
        },
        {
            "display": "Chhukha",
            "value": "CK",
            "country_code": "BTN"
        },
        {
            "display": "Chiang Mai | เชียงใหม่",
            "value": "CMI",
            "country_code": "THA"
        },
        {
            "display": "Chiang Rai | เชียงราย",
            "value": "CRI",
            "country_code": "THA"
        },
        {
            "display": "Chiapas",
            "value": "CS",
            "country_code": "MEX"
        },
        {
            "display": "Chiesanuova",
            "value": "CH",
            "country_code": "SMR"
        },
        {
            "display": "Chihuahua",
            "value": "CH",
            "country_code": "MEX"
        },
        {
            "display": "Chikwawa",
            "value": "CK",
            "country_code": "MWI"
        },
        {
            "display": "Chimaltenango",
            "value": "CM",
            "country_code": "GTM"
        },
        {
            "display": "Chimborazo",
            "value": "HX",
            "country_code": "ECU"
        },
        {
            "display": "Chimbu",
            "value": "CPK",
            "country_code": "PNG"
        },
        {
            "display": "Chin",
            "value": "CH",
            "country_code": "MMR"
        },
        {
            "display": "Chinandega",
            "value": "CI",
            "country_code": "NIC"
        },
        {
            "display": "Chiquimula",
            "value": "CQ",
            "country_code": "GTM"
        },
        {
            "display": "Chiradzulu",
            "value": "CR",
            "country_code": "MWI"
        },
        {
            "display": "Chirang",
            "value": "CR",
            "country_code": "BTN"
        },
        {
            "display": "Chiriquí",
            "value": "CQ",
            "country_code": "PAN"
        },
        {
            "display": "Chitipa",
            "value": "CT",
            "country_code": "MWI"
        },
        {
            "display": "Chittagong",
            "value": "2D",
            "country_code": "BGD"
        },
        {
            "display": "Chittagong Hill Tracts",
            "value": "2E",
            "country_code": "BGD"
        },
        {
            "display": "Chișinău",
            "value": "CU",
            "country_code": "MDA"
        },
        {
            "display": "Chobe",
            "value": "CH",
            "country_code": "BWA"
        },
        {
            "display": "Chocó",
            "value": "CH",
            "country_code": "COL"
        },
        {
            "display": "Choiseul",
            "value": "CH",
            "country_code": "SLB"
        },
        {
            "display": "Choluteca",
            "value": "CH",
            "country_code": "HND"
        },
        {
            "display": "Chonburi | ชลบุรี",
            "value": "CBI",
            "country_code": "THA"
        },
        {
            "display": "Chongqing Municipality | 重庆市",
            "value": "CQ",
            "country_code": "CHN"
        },
        {
            "display": "Chontales",
            "value": "CO",
            "country_code": "NIC"
        },
        {
            "display": "Christmas Island",
            "value": "CXR",
            "country_code": "AUS"
        },
        {
            "display": "Chukot",
            "value": "CK",
            "country_code": "RUS"
        },
        {
            "display": "Chumphon | ชุมพร",
            "value": "CPN",
            "country_code": "THA"
        },
        {
            "display": "Chuquisaca",
            "value": "H",
            "country_code": "BOL"
        },
        {
            "display": "Chuuk",
            "value": "TRK",
            "country_code": "FSM"
        },
        {
            "display": "Chuvash",
            "value": "CV",
            "country_code": "RUS"
        },
        {
            "display": "Chüy",
            "value": "CU",
            "country_code": "KGZ"
        },
        {
            "display": "Cibao Nordeste",
            "value": "CN",
            "country_code": "DOM"
        },
        {
            "display": "Cibao Noroeste",
            "value": "CE",
            "country_code": "DOM"
        },
        {
            "display": "Cibao Norte",
            "value": "CT",
            "country_code": "DOM"
        },
        {
            "display": "Cibao Sur",
            "value": "CS",
            "country_code": "DOM"
        },
        {
            "display": "Cibitoke",
            "value": "CI",
            "country_code": "BDI"
        },
        {
            "display": "Ciego de Ávila",
            "value": "CA",
            "country_code": "CUB"
        },
        {
            "display": "Cienfuegos",
            "value": "CF",
            "country_code": "CUB"
        },
        {
            "display": "Città di San Marino",
            "value": "CI",
            "country_code": "SMR"
        },
        {
            "display": "Clackmannanshire",
            "value": "CL",
            "country_code": "GBR"
        },
        {
            "display": "Clarendon",
            "value": "CD",
            "country_code": "JAM"
        },
        {
            "display": "Clervaux | Klierf",
            "value": "CL",
            "country_code": "LUX"
        },
        {
            "display": "Cluj",
            "value": "CJ",
            "country_code": "ROU"
        },
        {
            "display": "Coahuila",
            "value": "CO",
            "country_code": "MEX"
        },
        {
            "display": "Cochabamba",
            "value": "C",
            "country_code": "BOL"
        },
        {
            "display": "Coclé",
            "value": "CC",
            "country_code": "PAN"
        },
        {
            "display": "Cocos (Keeling) Islands",
            "value": "CCK",
            "country_code": "AUS"
        },
        {
            "display": "Coimbra",
            "value": "CO",
            "country_code": "PRT"
        },
        {
            "display": "Cojedes",
            "value": "HX",
            "country_code": "VEN"
        },
        {
            "display": "Colima",
            "value": "CL",
            "country_code": "MEX"
        },
        {
            "display": "Collines",
            "value": "CO",
            "country_code": "BEN"
        },
        {
            "display": "Colorado",
            "value": "CO",
            "country_code": "USA"
        },
        {
            "display": "Colón",
            "value": "CL",
            "country_code": "HND"
        },
        {
            "display": "Colón",
            "value": "CN",
            "country_code": "PAN"
        },
        {
            "display": "Comayagua",
            "value": "CM",
            "country_code": "HND"
        },
        {
            "display": "Comilla",
            "value": "2F",
            "country_code": "BGD"
        },
        {
            "display": "Commewijne",
            "value": "CM",
            "country_code": "SUR"
        },
        {
            "display": "Comoé",
            "value": "CM",
            "country_code": "CIV"
        },
        {
            "display": "Compostela Valley",
            "value": "CL",
            "country_code": "PHL"
        },
        {
            "display": "Connaught | Connacht",
            "value": "CX",
            "country_code": "IRL"
        },
        {
            "display": "Connecticut",
            "value": "CT",
            "country_code": "USA"
        },
        {
            "display": "Constanța",
            "value": "CT",
            "country_code": "ROU"
        },
        {
            "display": "Conwy",
            "value": "CW",
            "country_code": "GBR"
        },
        {
            "display": "Cook Islands",
            "value": "CK",
            "country_code": "NZL"
        },
        {
            "display": "Copperbelt",
            "value": "CO",
            "country_code": "ZMB"
        },
        {
            "display": "Copán",
            "value": "CP",
            "country_code": "HND"
        },
        {
            "display": "Coquimbo",
            "value": "CO",
            "country_code": "CHL"
        },
        {
            "display": "Coronie",
            "value": "CR",
            "country_code": "SUR"
        },
        {
            "display": "Corozal",
            "value": "ZL",
            "country_code": "BLZ"
        },
        {
            "display": "Corse",
            "value": "CO",
            "country_code": "FRA"
        },
        {
            "display": "Cortés",
            "value": "CR",
            "country_code": "HND"
        },
        {
            "display": "Cotabato",
            "value": "NC",
            "country_code": "PHL"
        },
        {
            "display": "Cotopaxi",
            "value": "XX",
            "country_code": "ECU"
        },
        {
            "display": "Couffo",
            "value": "KO",
            "country_code": "BEN"
        },
        {
            "display": "Couva–Tabaquite–Talparo",
            "value": "CT",
            "country_code": "TTO"
        },
        {
            "display": "Cova Lima | Kovalima",
            "value": "CO",
            "country_code": "TLS"
        },
        {
            "display": "Covasna",
            "value": "CV",
            "country_code": "ROU"
        },
        {
            "display": "Crete",
            "value": "CE",
            "country_code": "GRC"
        },
        {
            "display": "Cross River",
            "value": "CR",
            "country_code": "NGA"
        },
        {
            "display": "Csongrád-Csanád",
            "value": "CC",
            "country_code": "HUN"
        },
        {
            "display": "Cumbria",
            "value": "CU",
            "country_code": "GBR"
        },
        {
            "display": "Cundinamarca",
            "value": "CU",
            "country_code": "COL"
        },
        {
            "display": "Cunene",
            "value": "CNN",
            "country_code": "AGO"
        },
        {
            "display": "Cuscatlán",
            "value": "CU",
            "country_code": "SLV"
        },
        {
            "display": "Cusco | Qusqu",
            "value": "CU",
            "country_code": "PER"
        },
        {
            "display": "Cuvette",
            "value": "8",
            "country_code": "COG"
        },
        {
            "display": "Cuvette-Ouest",
            "value": "15",
            "country_code": "COG"
        },
        {
            "display": "Cuyuni-Mazaruni",
            "value": "CU",
            "country_code": "GUY"
        },
        {
            "display": "Córdoba",
            "value": "CO",
            "country_code": "COL"
        },
        {
            "display": "Călărași",
            "value": "CL",
            "country_code": "ROU"
        },
        {
            "display": "Da Nang",
            "value": "DN",
            "country_code": "VNM"
        },
        {
            "display": "Dac Lac",
            "value": "33",
            "country_code": "VNM"
        },
        {
            "display": "Dac Nong",
            "value": "72",
            "country_code": "VNM"
        },
        {
            "display": "Dadra and Nagar Haveli",
            "value": "DN",
            "country_code": "IND"
        },
        {
            "display": "Daegu",
            "value": "27",
            "country_code": "KOR"
        },
        {
            "display": "Daejeon",
            "value": "30",
            "country_code": "KOR"
        },
        {
            "display": "Daga",
            "value": "DA",
            "country_code": "BTN"
        },
        {
            "display": "Dagestan",
            "value": "DA",
            "country_code": "RUS"
        },
        {
            "display": "Dahūk",
            "value": "DA",
            "country_code": "IRQ"
        },
        {
            "display": "Dakar",
            "value": "DK",
            "country_code": "SEN"
        },
        {
            "display": "Dakhla-Oued Ed-Dahab",
            "value": "OL",
            "country_code": "MAR"
        },
        {
            "display": "Dakhlet Nouadhibou",
            "value": "DN",
            "country_code": "MRT"
        },
        {
            "display": "Dalarnas län",
            "value": "W",
            "country_code": "SWE"
        },
        {
            "display": "Daman and Diu",
            "value": "DD",
            "country_code": "IND"
        },
        {
            "display": "Danilovgrad",
            "value": "DA",
            "country_code": "MNE"
        },
        {
            "display": "Dar es Salaam",
            "value": "DS",
            "country_code": "TZA"
        },
        {
            "display": "Dar'ā",
            "value": "DR",
            "country_code": "SYR"
        },
        {
            "display": "Darhan-Uul",
            "value": "DA",
            "country_code": "MNG"
        },
        {
            "display": "Darién",
            "value": "DN",
            "country_code": "PAN"
        },
        {
            "display": "Darnah",
            "value": "DA",
            "country_code": "LBY"
        },
        {
            "display": "Dashoguz",
            "value": "DA",
            "country_code": "TKM"
        },
        {
            "display": "Daugavpils",
            "value": "DG",
            "country_code": "LVA"
        },
        {
            "display": "Davao Occidental",
            "value": "DC",
            "country_code": "PHL"
        },
        {
            "display": "Davao Oriental",
            "value": "DO",
            "country_code": "PHL"
        },
        {
            "display": "Davao del Norte",
            "value": "DV",
            "country_code": "PHL"
        },
        {
            "display": "Davao del Sur",
            "value": "DR",
            "country_code": "PHL"
        },
        {
            "display": "Dayr az Zawr",
            "value": "DY",
            "country_code": "SYR"
        },
        {
            "display": "Dedza",
            "value": "DE",
            "country_code": "MWI"
        },
        {
            "display": "Deir El Balah | Dayr al Balaḩ",
            "value": "DEB",
            "country_code": "PSE"
        },
        {
            "display": "Delaware",
            "value": "DE",
            "country_code": "USA"
        },
        {
            "display": "Delhi",
            "value": "DL",
            "country_code": "IND"
        },
        {
            "display": "Delta",
            "value": "DE",
            "country_code": "NGA"
        },
        {
            "display": "Delta Amacuro",
            "value": "YX",
            "country_code": "VEN"
        },
        {
            "display": "Demerara-Mahaica",
            "value": "DE",
            "country_code": "GUY"
        },
        {
            "display": "Denbighshire",
            "value": "DE",
            "country_code": "GBR"
        },
        {
            "display": "Denguélé",
            "value": "DE",
            "country_code": "CIV"
        },
        {
            "display": "Denizli",
            "value": "20",
            "country_code": "TUR"
        },
        {
            "display": "Departamento Central Central",
            "value": "D8",
            "country_code": "PRY"
        },
        {
            "display": "Departamento de Alto Paraguay Alto Paraguay",
            "value": "D1",
            "country_code": "PRY"
        },
        {
            "display": "Departamento de Alto Paraná Alto Paraná",
            "value": "D2",
            "country_code": "PRY"
        },
        {
            "display": "Departamento de Amambay Amambay",
            "value": "D3",
            "country_code": "PRY"
        },
        {
            "display": "Departamento de Boquerón Boquerón",
            "value": "D4",
            "country_code": "PRY"
        },
        {
            "display": "Departamento de Caaguazú Caaguazú",
            "value": "D5",
            "country_code": "PRY"
        },
        {
            "display": "Departamento de Caazapá Caazapá",
            "value": "D6",
            "country_code": "PRY"
        },
        {
            "display": "Departamento de Canindeyú Canindeyú",
            "value": "D7",
            "country_code": "PRY"
        },
        {
            "display": "Departamento de Concepción Concepción",
            "value": "D9",
            "country_code": "PRY"
        },
        {
            "display": "Departamento de Cordillera Cordillera",
            "value": "D10",
            "country_code": "PRY"
        },
        {
            "display": "Departamento de Guairá Guairá",
            "value": "D11",
            "country_code": "PRY"
        },
        {
            "display": "Departamento de Itapúa Itapúa",
            "value": "D12",
            "country_code": "PRY"
        },
        {
            "display": "Departamento de Misiones Misiones",
            "value": "D13",
            "country_code": "PRY"
        },
        {
            "display": "Departamento de Paraguarí Paraguarí",
            "value": "D15",
            "country_code": "PRY"
        },
        {
            "display": "Departamento de Presidente Hayes Presidente Hayes",
            "value": "D16",
            "country_code": "PRY"
        },
        {
            "display": "Departamento de San Pedro San Pedro",
            "value": "D17",
            "country_code": "PRY"
        },
        {
            "display": "Departamento de Ñeembucú Ñeembucú",
            "value": "D14",
            "country_code": "PRY"
        },
        {
            "display": "Derbyshire",
            "value": "DB",
            "country_code": "GBR"
        },
        {
            "display": "Derry and Strabane",
            "value": "DR",
            "country_code": "GBR"
        },
        {
            "display": "Devon",
            "value": "DV",
            "country_code": "GBR"
        },
        {
            "display": "Dhaka",
            "value": "3G",
            "country_code": "BGD"
        },
        {
            "display": "Dhamār",
            "value": "DH",
            "country_code": "YEM"
        },
        {
            "display": "Dhī Qār",
            "value": "DQ",
            "country_code": "IRQ"
        },
        {
            "display": "Dibër",
            "value": "DI",
            "country_code": "ALB"
        },
        {
            "display": "Diego Martin",
            "value": "DM",
            "country_code": "TTO"
        },
        {
            "display": "Diekirch | Diekrech",
            "value": "DI",
            "country_code": "LUX"
        },
        {
            "display": "Dien Bien",
            "value": "71",
            "country_code": "VNM"
        },
        {
            "display": "Diffa",
            "value": "DF",
            "country_code": "NER"
        },
        {
            "display": "Dikhil",
            "value": "DK",
            "country_code": "DJI"
        },
        {
            "display": "Dimashq",
            "value": "DI",
            "country_code": "SYR"
        },
        {
            "display": "Dinagat Islands",
            "value": "DI",
            "country_code": "PHL"
        },
        {
            "display": "Dinajpur",
            "value": "5H",
            "country_code": "BGD"
        },
        {
            "display": "Diourbel",
            "value": "DB",
            "country_code": "SEN"
        },
        {
            "display": "Diyarbakır",
            "value": "21",
            "country_code": "TUR"
        },
        {
            "display": "Diyālá",
            "value": "DI",
            "country_code": "IRQ"
        },
        {
            "display": "Djibloho",
            "value": "DJ",
            "country_code": "GNQ"
        },
        {
            "display": "Dnipropetrovska oblast",
            "value": "DN",
            "country_code": "UKR"
        },
        {
            "display": "Dobrich",
            "value": "DO",
            "country_code": "BGR"
        },
        {
            "display": "Dodoma",
            "value": "DO",
            "country_code": "TZA"
        },
        {
            "display": "Dokolo",
            "value": "16",
            "country_code": "UGA"
        },
        {
            "display": "Dolenjska",
            "value": "DO",
            "country_code": "SVN"
        },
        {
            "display": "Dolj",
            "value": "DJ",
            "country_code": "ROU"
        },
        {
            "display": "Domagnano",
            "value": "DO",
            "country_code": "SMR"
        },
        {
            "display": "Donetska oblast",
            "value": "DO",
            "country_code": "UKR"
        },
        {
            "display": "Dong Nai",
            "value": "39",
            "country_code": "VNM"
        },
        {
            "display": "Dong Thap",
            "value": "45",
            "country_code": "VNM"
        },
        {
            "display": "Donga",
            "value": "DO",
            "country_code": "BEN"
        },
        {
            "display": "Dornod",
            "value": "DD",
            "country_code": "MNG"
        },
        {
            "display": "Dornogovi",
            "value": "DG",
            "country_code": "MNG"
        },
        {
            "display": "Dorset",
            "value": "DO",
            "country_code": "GBR"
        },
        {
            "display": "Dosso",
            "value": "DS",
            "country_code": "NER"
        },
        {
            "display": "Dowa",
            "value": "DO",
            "country_code": "MWI"
        },
        {
            "display": "Drenthe",
            "value": "DR",
            "country_code": "NLD"
        },
        {
            "display": "Drâa-Tafilalet",
            "value": "DT",
            "country_code": "MAR"
        },
        {
            "display": "Dubayy",
            "value": "DU",
            "country_code": "ARE"
        },
        {
            "display": "Dubrovačko-neretvanska županija",
            "value": "DU",
            "country_code": "HRV"
        },
        {
            "display": "Dumfries and Galloway",
            "value": "DG",
            "country_code": "GBR"
        },
        {
            "display": "Dumyāţ",
            "value": "DT",
            "country_code": "EGY"
        },
        {
            "display": "Dundee City",
            "value": "DN",
            "country_code": "GBR"
        },
        {
            "display": "Dundgovi",
            "value": "DU",
            "country_code": "MNG"
        },
        {
            "display": "Durango",
            "value": "DG",
            "country_code": "MEX"
        },
        {
            "display": "Durrës",
            "value": "DU",
            "country_code": "ALB"
        },
        {
            "display": "Dushanbe",
            "value": "DU",
            "country_code": "TJK"
        },
        {
            "display": "Dzavhan",
            "value": "DZ",
            "country_code": "MNG"
        },
        {
            "display": "Dâmbovița",
            "value": "DB",
            "country_code": "ROU"
        },
        {
            "display": "Díli | Díli",
            "value": "DI",
            "country_code": "TLS"
        },
        {
            "display": "Düzce",
            "value": "81",
            "country_code": "TUR"
        },
        {
            "display": "Dāykundī",
            "value": "DAY",
            "country_code": "AFG"
        },
        {
            "display": "East Ayrshire",
            "value": "EA",
            "country_code": "GBR"
        },
        {
            "display": "East Berbice-Corentyne",
            "value": "EB",
            "country_code": "GUY"
        },
        {
            "display": "East Darfur",
            "value": "ED",
            "country_code": "SDN"
        },
        {
            "display": "East Dunbartonshire",
            "value": "EB",
            "country_code": "GBR"
        },
        {
            "display": "East Equatoria",
            "value": "EE",
            "country_code": "SSD"
        },
        {
            "display": "East Kazakhstan",
            "value": "EK",
            "country_code": "KAZ"
        },
        {
            "display": "East Lothian",
            "value": "EL",
            "country_code": "GBR"
        },
        {
            "display": "East New Britain",
            "value": "EBR",
            "country_code": "PNG"
        },
        {
            "display": "East Renfrewshire",
            "value": "ER",
            "country_code": "GBR"
        },
        {
            "display": "East Sepik",
            "value": "ESW",
            "country_code": "PNG"
        },
        {
            "display": "East Sussex",
            "value": "SU",
            "country_code": "GBR"
        },
        {
            "display": "Eastern",
            "value": "5",
            "country_code": "LKA"
        },
        {
            "display": "Eastern",
            "value": "EP",
            "country_code": "GHA"
        },
        {
            "display": "Eastern",
            "value": "ES",
            "country_code": "RWA"
        },
        {
            "display": "Eastern",
            "value": "EA",
            "country_code": "SLE"
        },
        {
            "display": "Eastern",
            "value": "ES",
            "country_code": "ZMB"
        },
        {
            "display": "Eastern Cape",
            "value": "EC",
            "country_code": "ZAF"
        },
        {
            "display": "Eastern Highlands",
            "value": "EHG",
            "country_code": "PNG"
        },
        {
            "display": "Eastern Macedonia and Thrace",
            "value": "EMT",
            "country_code": "GRC"
        },
        {
            "display": "Eastern Samar",
            "value": "ES",
            "country_code": "PHL"
        },
        {
            "display": "Ebonyi",
            "value": "EB",
            "country_code": "NGA"
        },
        {
            "display": "Echternach | Iechternach",
            "value": "EC",
            "country_code": "LUX"
        },
        {
            "display": "Edinburgh, City of",
            "value": "ED",
            "country_code": "GBR"
        },
        {
            "display": "Edirne",
            "value": "22",
            "country_code": "TUR"
        },
        {
            "display": "Edo",
            "value": "ED",
            "country_code": "NGA"
        },
        {
            "display": "Eilean Siar",
            "value": "EI",
            "country_code": "GBR"
        },
        {
            "display": "Ekiti",
            "value": "EK",
            "country_code": "NGA"
        },
        {
            "display": "El Beni",
            "value": "B",
            "country_code": "BOL"
        },
        {
            "display": "El Callao | Qallaw",
            "value": "CA",
            "country_code": "PER"
        },
        {
            "display": "El Oro",
            "value": "OX",
            "country_code": "ECU"
        },
        {
            "display": "El Paraíso",
            "value": "EP",
            "country_code": "HND"
        },
        {
            "display": "El Progreso",
            "value": "PR",
            "country_code": "GTM"
        },
        {
            "display": "El Valle",
            "value": "EV",
            "country_code": "DOM"
        },
        {
            "display": "Elazığ",
            "value": "23",
            "country_code": "TUR"
        },
        {
            "display": "Elbasan",
            "value": "EL",
            "country_code": "ALB"
        },
        {
            "display": "Elgeyo/Marakwet",
            "value": "05",
            "country_code": "KEN"
        },
        {
            "display": "Embu",
            "value": "06",
            "country_code": "KEN"
        },
        {
            "display": "Encamp",
            "value": "EN",
            "country_code": "AND"
        },
        {
            "display": "Enga",
            "value": "EPW",
            "country_code": "PNG"
        },
        {
            "display": "English River",
            "value": "RA",
            "country_code": "SYC"
        },
        {
            "display": "Ennedi Est",
            "value": "EE",
            "country_code": "TCD"
        },
        {
            "display": "Ennedi Ouest",
            "value": "EO",
            "country_code": "TCD"
        },
        {
            "display": "Enriquillo",
            "value": "EQ",
            "country_code": "DOM"
        },
        {
            "display": "Enugu",
            "value": "EN",
            "country_code": "NGA"
        },
        {
            "display": "Epirus",
            "value": "EP",
            "country_code": "GRC"
        },
        {
            "display": "Ermera | Ermera",
            "value": "ER",
            "country_code": "TLS"
        },
        {
            "display": "Erongo",
            "value": "ER",
            "country_code": "NAM"
        },
        {
            "display": "Erzincan",
            "value": "24",
            "country_code": "TUR"
        },
        {
            "display": "Erzurum",
            "value": "25",
            "country_code": "TUR"
        },
        {
            "display": "Escaldes-Engordany",
            "value": "EG",
            "country_code": "AND"
        },
        {
            "display": "Esch-sur-Alzette | Esch-Uelzecht",
            "value": "ES",
            "country_code": "LUX"
        },
        {
            "display": "Escuintla",
            "value": "ES",
            "country_code": "GTM"
        },
        {
            "display": "Eskişehir",
            "value": "26",
            "country_code": "TUR"
        },
        {
            "display": "Esmeraldas",
            "value": "EX",
            "country_code": "ECU"
        },
        {
            "display": "Essequibo Islands-West Demerara",
            "value": "ES",
            "country_code": "GUY"
        },
        {
            "display": "Essex",
            "value": "ES",
            "country_code": "GBR"
        },
        {
            "display": "Est",
            "value": "ES",
            "country_code": "BFA"
        },
        {
            "display": "Est",
            "value": "ES",
            "country_code": "CMR"
        },
        {
            "display": "Estelí",
            "value": "ES",
            "country_code": "NIC"
        },
        {
            "display": "Estuaire",
            "value": "ES",
            "country_code": "GAB"
        },
        {
            "display": "Etelä-Karjala | Södra Karelen",
            "value": "ET",
            "country_code": "FIN"
        },
        {
            "display": "Etelä-Pohjanmaa | Södra Österbotten",
            "value": "EP",
            "country_code": "FIN"
        },
        {
            "display": "Etelä-Savo | Södra Savolax",
            "value": "ES",
            "country_code": "FIN"
        },
        {
            "display": "Extremadura",
            "value": "EX",
            "country_code": "ESP"
        },
        {
            "display": "Extrême-Nord",
            "value": "EN",
            "country_code": "CMR"
        },
        {
            "display": "Eşfahān",
            "value": "10",
            "country_code": "IRN"
        },
        {
            "display": "Fa'asaleleaga",
            "value": "FA",
            "country_code": "WSM"
        },
        {
            "display": "Faetano",
            "value": "FA",
            "country_code": "SMR"
        },
        {
            "display": "Falcón",
            "value": "IX",
            "country_code": "VEN"
        },
        {
            "display": "Falkirk",
            "value": "FA",
            "country_code": "GBR"
        },
        {
            "display": "Falkland Islands",
            "value": "FK",
            "country_code": "GBR"
        },
        {
            "display": "Famagusta | Αμμόχωστος",
            "value": "FG",
            "country_code": "CYP"
        },
        {
            "display": "Faranah",
            "value": "F",
            "country_code": "GIN"
        },
        {
            "display": "Farg`ona",
            "value": "FA",
            "country_code": "UZB"
        },
        {
            "display": "Faridpur",
            "value": "3I",
            "country_code": "BGD"
        },
        {
            "display": "Faro",
            "value": "FA",
            "country_code": "PRT"
        },
        {
            "display": "Faroe Islands",
            "value": "FO",
            "country_code": "DNK"
        },
        {
            "display": "Farāh",
            "value": "FRA",
            "country_code": "AFG"
        },
        {
            "display": "Fatick",
            "value": "FK",
            "country_code": "SEN"
        },
        {
            "display": "Federacija Bosne i Hercegovine",
            "value": "BI",
            "country_code": "BIH"
        },
        {
            "display": "Fejér",
            "value": "FJ",
            "country_code": "HUN"
        },
        {
            "display": "Fermanagh and Omagh",
            "value": "FM",
            "country_code": "GBR"
        },
        {
            "display": "Fianarantsoa",
            "value": "FI",
            "country_code": "MDG"
        },
        {
            "display": "Fier",
            "value": "FI",
            "country_code": "ALB"
        },
        {
            "display": "Fife",
            "value": "FI",
            "country_code": "GBR"
        },
        {
            "display": "Fiorentino",
            "value": "FI",
            "country_code": "SMR"
        },
        {
            "display": "Flacq",
            "value": "FL",
            "country_code": "MUS"
        },
        {
            "display": "Flevoland",
            "value": "FL",
            "country_code": "NLD"
        },
        {
            "display": "Flintshire",
            "value": "FL",
            "country_code": "GBR"
        },
        {
            "display": "Florida",
            "value": "FL",
            "country_code": "USA"
        },
        {
            "display": "Fontvieille",
            "value": "FO",
            "country_code": "MCO"
        },
        {
            "display": "Francisco Morazán",
            "value": "FM",
            "country_code": "HND"
        },
        {
            "display": "Free State",
            "value": "FS",
            "country_code": "ZAF"
        },
        {
            "display": "Freiburg",
            "value": "FR",
            "country_code": "CHE"
        },
        {
            "display": "French Guiana",
            "value": "GF",
            "country_code": "FRA"
        },
        {
            "display": "French Polynesia",
            "value": "PF",
            "country_code": "AUS"
        },
        {
            "display": "Friesland",
            "value": "FR",
            "country_code": "NLD"
        },
        {
            "display": "Fujian Province[e] | 福建省",
            "value": "FJ",
            "country_code": "CHN"
        },
        {
            "display": "Fukien",
            "value": "FK",
            "country_code": "TWN"
        },
        {
            "display": "Fès-Meknès",
            "value": "FK",
            "country_code": "MAR"
        },
        {
            "display": "Fārs",
            "value": "07",
            "country_code": "IRN"
        },
        {
            "display": "Fāryāb",
            "value": "FYB",
            "country_code": "AFG"
        },
        {
            "display": "Gabrovo",
            "value": "GA",
            "country_code": "BGR"
        },
        {
            "display": "Gabès",
            "value": "GB",
            "country_code": "TUN"
        },
        {
            "display": "Gabú",
            "value": "GA",
            "country_code": "GNB"
        },
        {
            "display": "Gafsa",
            "value": "GF",
            "country_code": "TUN"
        },
        {
            "display": "Gaga'emauga",
            "value": "GE",
            "country_code": "WSM"
        },
        {
            "display": "Gagaifomauga",
            "value": "GI",
            "country_code": "WSM"
        },
        {
            "display": "Galați",
            "value": "GL",
            "country_code": "ROU"
        },
        {
            "display": "Galguduud",
            "value": "GA",
            "country_code": "SOM"
        },
        {
            "display": "Galicia",
            "value": "GA",
            "country_code": "ESP"
        },
        {
            "display": "Galápagos",
            "value": "WX",
            "country_code": "ECU"
        },
        {
            "display": "Gambēla Hizboch",
            "value": "GA",
            "country_code": "ETH"
        },
        {
            "display": "Gandaki ",
            "value": "P4",
            "country_code": "NPL"
        },
        {
            "display": "Gangwon",
            "value": "42",
            "country_code": "KOR"
        },
        {
            "display": "Gansu Province | 甘肃省",
            "value": "GS",
            "country_code": "CHN"
        },
        {
            "display": "Gao",
            "value": "GO",
            "country_code": "MLI"
        },
        {
            "display": "Garissa",
            "value": "07",
            "country_code": "KEN"
        },
        {
            "display": "Gasa",
            "value": "GA",
            "country_code": "BTN"
        },
        {
            "display": "Gauteng",
            "value": "GP",
            "country_code": "ZAF"
        },
        {
            "display": "Gaza",
            "value": "G",
            "country_code": "MOZ"
        },
        {
            "display": "Gaza | Ghazzah",
            "value": "GZA",
            "country_code": "PSE"
        },
        {
            "display": "Gaziantep",
            "value": "27",
            "country_code": "TUR"
        },
        {
            "display": "Gbarpolu",
            "value": "GP",
            "country_code": "LBR"
        },
        {
            "display": "Gedarif",
            "value": "GD",
            "country_code": "SDN"
        },
        {
            "display": "Gedo",
            "value": "GE",
            "country_code": "SOM"
        },
        {
            "display": "Geita",
            "value": "GE",
            "country_code": "TZA"
        },
        {
            "display": "Gelderland",
            "value": "GE",
            "country_code": "NLD"
        },
        {
            "display": "Genève",
            "value": "GE",
            "country_code": "CHE"
        },
        {
            "display": "Georgia",
            "value": "GA",
            "country_code": "USA"
        },
        {
            "display": "Geylegphug",
            "value": "GE",
            "country_code": "BTN"
        },
        {
            "display": "Gezira",
            "value": "GZ",
            "country_code": "SDN"
        },
        {
            "display": "Geġark'unik'",
            "value": "GR",
            "country_code": "ARM"
        },
        {
            "display": "Ghanzi",
            "value": "GH",
            "country_code": "BWA"
        },
        {
            "display": "Ghat",
            "value": "GH",
            "country_code": "LBY"
        },
        {
            "display": "Ghaznī",
            "value": "GHA",
            "country_code": "AFG"
        },
        {
            "display": "Ghōr",
            "value": "GHO",
            "country_code": "AFG"
        },
        {
            "display": "Gia Lai",
            "value": "30",
            "country_code": "VNM"
        },
        {
            "display": "Gibraltar",
            "value": "GI",
            "country_code": "GBR"
        },
        {
            "display": "Gilbert Islands",
            "value": "G",
            "country_code": "KIR"
        },
        {
            "display": "Giresun",
            "value": "28",
            "country_code": "TUR"
        },
        {
            "display": "Gisborne | Te Tai Rāwhiti",
            "value": "GIS",
            "country_code": "NZL"
        },
        {
            "display": "Gitega",
            "value": "GI",
            "country_code": "BDI"
        },
        {
            "display": "Giurgiu",
            "value": "GR",
            "country_code": "ROU"
        },
        {
            "display": "Gjirokastër",
            "value": "GJ",
            "country_code": "ALB"
        },
        {
            "display": "Glacis",
            "value": "GL",
            "country_code": "SYC"
        },
        {
            "display": "Glarus",
            "value": "GL",
            "country_code": "CHE"
        },
        {
            "display": "Glasgow City",
            "value": "GL",
            "country_code": "GBR"
        },
        {
            "display": "Gloucestershire",
            "value": "GT",
            "country_code": "GBR"
        },
        {
            "display": "Goa",
            "value": "GA",
            "country_code": "IND"
        },
        {
            "display": "Golestān",
            "value": "27",
            "country_code": "IRN"
        },
        {
            "display": "Gomba",
            "value": "89",
            "country_code": "UGA"
        },
        {
            "display": "Gombe",
            "value": "GO",
            "country_code": "NGA"
        },
        {
            "display": "Gorenjska",
            "value": "GO",
            "country_code": "SVN"
        },
        {
            "display": "Gorgol",
            "value": "GO",
            "country_code": "MRT"
        },
        {
            "display": "Goriška",
            "value": "SP",
            "country_code": "SVN"
        },
        {
            "display": "Gorj",
            "value": "GJ",
            "country_code": "ROU"
        },
        {
            "display": "Gorno-Altay",
            "value": "GA",
            "country_code": "RUS"
        },
        {
            "display": "Gorontalo",
            "value": "GO",
            "country_code": "IDN"
        },
        {
            "display": "Gotlands län",
            "value": "X",
            "country_code": "SWE"
        },
        {
            "display": "Govi-Altay",
            "value": "GA",
            "country_code": "MNG"
        },
        {
            "display": "Govisumber",
            "value": "GS",
            "country_code": "MNG"
        },
        {
            "display": "Gracias a Dios",
            "value": "GD",
            "country_code": "HND"
        },
        {
            "display": "Granada",
            "value": "GR",
            "country_code": "NIC"
        },
        {
            "display": "Grand Bassa",
            "value": "GB",
            "country_code": "LBR"
        },
        {
            "display": "Grand Cape Mount",
            "value": "CM",
            "country_code": "LBR"
        },
        {
            "display": "Grand Gedeh",
            "value": "GG",
            "country_code": "LBR"
        },
        {
            "display": "Grand Kru",
            "value": "GK",
            "country_code": "LBR"
        },
        {
            "display": "Grand Port",
            "value": "GP",
            "country_code": "MUS"
        },
        {
            "display": "Grand' Anse (Mahé)",
            "value": "GM",
            "country_code": "SYC"
        },
        {
            "display": "Grand' Anse (Praslin)",
            "value": "GP",
            "country_code": "SYC"
        },
        {
            "display": "Grand-Est",
            "value": "GE",
            "country_code": "FRA"
        },
        {
            "display": "Grande Comore",
            "value": "GC",
            "country_code": "COM"
        },
        {
            "display": "Grande’Anse | Grandans",
            "value": "GA",
            "country_code": "HTI"
        },
        {
            "display": "Granma",
            "value": "GR",
            "country_code": "CUB"
        },
        {
            "display": "Graubünden",
            "value": "GR",
            "country_code": "CHE"
        },
        {
            "display": "Greater Accra",
            "value": "AA",
            "country_code": "GHA"
        },
        {
            "display": "Greater Poland | Wielkopolskie",
            "value": "GR",
            "country_code": "POL"
        },
        {
            "display": "Grenadines",
            "value": "GE",
            "country_code": "VCT"
        },
        {
            "display": "Grevenmacher | Gréivemaacher",
            "value": "GR",
            "country_code": "LUX"
        },
        {
            "display": "Gronigen",
            "value": "GR",
            "country_code": "NLD"
        },
        {
            "display": "Guadalcanal",
            "value": "GU",
            "country_code": "SLB"
        },
        {
            "display": "Guainía",
            "value": "GU",
            "country_code": "COL"
        },
        {
            "display": "Guam",
            "value": "GU",
            "country_code": "AUS"
        },
        {
            "display": "Guanacaste",
            "value": "GX",
            "country_code": "CRI"
        },
        {
            "display": "Guanajuato",
            "value": "GT",
            "country_code": "MEX"
        },
        {
            "display": "Guangdong Province[g] | 广东省",
            "value": "GD",
            "country_code": "CHN"
        },
        {
            "display": "Guangxi Zhuang Autonomous Region | 广西壮族自治区",
            "value": "GX",
            "country_code": "CHN"
        },
        {
            "display": "Guantánamo",
            "value": "GU",
            "country_code": "CUB"
        },
        {
            "display": "Guarda",
            "value": "GU",
            "country_code": "PRT"
        },
        {
            "display": "Guatemala",
            "value": "GU",
            "country_code": "GTM"
        },
        {
            "display": "Guaviare",
            "value": "GU",
            "country_code": "COL"
        },
        {
            "display": "Guayas",
            "value": "GX",
            "country_code": "ECU"
        },
        {
            "display": "Guelmim-Oued Noun",
            "value": "GN",
            "country_code": "MAR"
        },
        {
            "display": "Guernsey",
            "value": "GG",
            "country_code": "GBR"
        },
        {
            "display": "Guerrero",
            "value": "GR",
            "country_code": "MEX"
        },
        {
            "display": "Guidimaka",
            "value": "GD",
            "country_code": "MRT"
        },
        {
            "display": "Guimaras",
            "value": "GU",
            "country_code": "PHL"
        },
        {
            "display": "Guizhou Province | 贵州省",
            "value": "GZ",
            "country_code": "CHN"
        },
        {
            "display": "Gujarat",
            "value": "GJ",
            "country_code": "IND"
        },
        {
            "display": "Gulf",
            "value": "GPK",
            "country_code": "PNG"
        },
        {
            "display": "Gulu",
            "value": "17",
            "country_code": "UGA"
        },
        {
            "display": "Guria",
            "value": "GU",
            "country_code": "GEO"
        },
        {
            "display": "Gusinje",
            "value": "GU",
            "country_code": "MNE"
        },
        {
            "display": "Guárico",
            "value": "JX",
            "country_code": "VEN"
        },
        {
            "display": "Guéra",
            "value": "GR",
            "country_code": "TCD"
        },
        {
            "display": "Gwangju",
            "value": "29",
            "country_code": "KOR"
        },
        {
            "display": "Gwynedd",
            "value": "GW",
            "country_code": "GBR"
        },
        {
            "display": "Gyeonggi",
            "value": "41",
            "country_code": "KOR"
        },
        {
            "display": "Győr-Moson-Sopron",
            "value": "GMS",
            "country_code": "HUN"
        },
        {
            "display": "Gävleborgs län",
            "value": "X",
            "country_code": "SWE"
        },
        {
            "display": "Gôh-Djiboua",
            "value": "GD",
            "country_code": "CIV"
        },
        {
            "display": "Gümüşhane",
            "value": "29",
            "country_code": "TUR"
        },
        {
            "display": "Gīlān",
            "value": "01",
            "country_code": "IRN"
        },
        {
            "display": "Gəncə",
            "value": "GA",
            "country_code": "AZE"
        },
        {
            "display": "Ha",
            "value": "HA",
            "country_code": "BTN"
        },
        {
            "display": "Ha Giang",
            "value": "3",
            "country_code": "VNM"
        },
        {
            "display": "Ha Nam",
            "value": "63",
            "country_code": "VNM"
        },
        {
            "display": "Ha Tinh",
            "value": "23",
            "country_code": "VNM"
        },
        {
            "display": "Ha'apai",
            "value": "02",
            "country_code": "TON"
        },
        {
            "display": "HaDarom",
            "value": "D",
            "country_code": "ISR"
        },
        {
            "display": "HaMerkaz",
            "value": "M",
            "country_code": "ISR"
        },
        {
            "display": "HaTsafon",
            "value": "Z",
            "country_code": "ISR"
        },
        {
            "display": "Hadjer-Lamis",
            "value": "HL",
            "country_code": "TCD"
        },
        {
            "display": "Hai Duong",
            "value": "61",
            "country_code": "VNM"
        },
        {
            "display": "Hainan Province[h] | 海南省",
            "value": "HI",
            "country_code": "CHN"
        },
        {
            "display": "Haiphong",
            "value": "HP",
            "country_code": "VNM"
        },
        {
            "display": "Hajdú-Bihar",
            "value": "HB",
            "country_code": "HUN"
        },
        {
            "display": "Hakkâri",
            "value": "30",
            "country_code": "TUR"
        },
        {
            "display": "Halabja",
            "value": "HA",
            "country_code": "IRQ"
        },
        {
            "display": "Hallands län",
            "value": "N",
            "country_code": "SWE"
        },
        {
            "display": "Hamadān",
            "value": "13",
            "country_code": "IRN"
        },
        {
            "display": "Hamburg",
            "value": "HH",
            "country_code": "DEU"
        },
        {
            "display": "Hamgyŏng-bukto",
            "value": "9",
            "country_code": "PRK"
        },
        {
            "display": "Hamgyŏng-namdo",
            "value": "8",
            "country_code": "PRK"
        },
        {
            "display": "Hampshire",
            "value": "HA",
            "country_code": "GBR"
        },
        {
            "display": "Hanoi",
            "value": "HN",
            "country_code": "VNM"
        },
        {
            "display": "Hanover",
            "value": "HO",
            "country_code": "JAM"
        },
        {
            "display": "Hardap",
            "value": "HA",
            "country_code": "NAM"
        },
        {
            "display": "Harghita",
            "value": "HR",
            "country_code": "ROU"
        },
        {
            "display": "Harjumaa",
            "value": "HA",
            "country_code": "EST"
        },
        {
            "display": "Haryana",
            "value": "HR",
            "country_code": "IND"
        },
        {
            "display": "Haskovo",
            "value": "HA",
            "country_code": "BGR"
        },
        {
            "display": "Hatay",
            "value": "31",
            "country_code": "TUR"
        },
        {
            "display": "Hau Giang",
            "value": "73",
            "country_code": "VNM"
        },
        {
            "display": "Haut-Katanga",
            "value": "HK",
            "country_code": "COD"
        },
        {
            "display": "Haut-Lomami",
            "value": "HL",
            "country_code": "COD"
        },
        {
            "display": "Haut-Mbomou",
            "value": "HM",
            "country_code": "CAF"
        },
        {
            "display": "Haut-Ogooué",
            "value": "HO",
            "country_code": "GAB"
        },
        {
            "display": "Haut-Uélé",
            "value": "HU",
            "country_code": "COD"
        },
        {
            "display": "Haute-Kotto",
            "value": "HK",
            "country_code": "CAF"
        },
        {
            "display": "Hauts Bassins",
            "value": "HB",
            "country_code": "BFA"
        },
        {
            "display": "Hauts-de-France",
            "value": "HD",
            "country_code": "FRA"
        },
        {
            "display": "Hawaii",
            "value": "HI",
            "country_code": "USA"
        },
        {
            "display": "Hawke's Bay",
            "value": "HB",
            "country_code": "NZL"
        },
        {
            "display": "Hebei Province | 河北省",
            "value": "HE",
            "country_code": "CHN"
        },
        {
            "display": "Hebron | Al Khalīl",
            "value": "HBN",
            "country_code": "PSE"
        },
        {
            "display": "Heilongjiang Province | 黑龙江省",
            "value": "HL",
            "country_code": "CHN"
        },
        {
            "display": "Hela",
            "value": "LA",
            "country_code": "PNG"
        },
        {
            "display": "Helmand",
            "value": "HEL",
            "country_code": "AFG"
        },
        {
            "display": "Henan Province | 河南省",
            "value": "HA",
            "country_code": "CHN"
        },
        {
            "display": "Henegouwen",
            "value": "HG",
            "country_code": "BEL"
        },
        {
            "display": "Hentiy",
            "value": "HN",
            "country_code": "MNG"
        },
        {
            "display": "Herceg-Novi",
            "value": "HE",
            "country_code": "MNE"
        },
        {
            "display": "Heredia",
            "value": "HX",
            "country_code": "CRI"
        },
        {
            "display": "Herrera",
            "value": "HA",
            "country_code": "PAN"
        },
        {
            "display": "Hertfordshire",
            "value": "HR",
            "country_code": "GBR"
        },
        {
            "display": "Herāt",
            "value": "HER",
            "country_code": "AFG"
        },
        {
            "display": "Hessen",
            "value": "HE",
            "country_code": "DEU"
        },
        {
            "display": "Heves",
            "value": "HV",
            "country_code": "HUN"
        },
        {
            "display": "Hhohho",
            "value": "HH",
            "country_code": "SWZ"
        },
        {
            "display": "Hidalgo",
            "value": "HG",
            "country_code": "MEX"
        },
        {
            "display": "Highland",
            "value": "HL",
            "country_code": "GBR"
        },
        {
            "display": "Higuamo",
            "value": "HG",
            "country_code": "DOM"
        },
        {
            "display": "Hiiraan",
            "value": "HI",
            "country_code": "SOM"
        },
        {
            "display": "Hiiumaa",
            "value": "HI",
            "country_code": "EST"
        },
        {
            "display": "Himachal Pradesh",
            "value": "HP",
            "country_code": "IND"
        },
        {
            "display": "Ho Chi Minh",
            "value": "SG",
            "country_code": "VNM"
        },
        {
            "display": "Hoa Binh",
            "value": "14",
            "country_code": "VNM"
        },
        {
            "display": "Hodh ech Chargui",
            "value": "HC",
            "country_code": "MRT"
        },
        {
            "display": "Hodh el Gharbi",
            "value": "HG",
            "country_code": "MRT"
        },
        {
            "display": "Hoima",
            "value": "18",
            "country_code": "UGA"
        },
        {
            "display": "Holguín",
            "value": "HO",
            "country_code": "CUB"
        },
        {
            "display": "Holy Cross | Świętokrzyskie",
            "value": "HO",
            "country_code": "POL"
        },
        {
            "display": "Homa Bay",
            "value": "08",
            "country_code": "KEN"
        },
        {
            "display": "Homyel'skaya voblasts'",
            "value": "HO",
            "country_code": "BLR"
        },
        {
            "display": "Hong Kong Special Administrative Region | 香港特别行政区",
            "value": "HK",
            "country_code": "CHN"
        },
        {
            "display": "Horad Minsk",
            "value": "HM",
            "country_code": "BLR"
        },
        {
            "display": "Hormozgān",
            "value": "22",
            "country_code": "IRN"
        },
        {
            "display": "Houaphan",
            "value": "HO",
            "country_code": "LAO"
        },
        {
            "display": "Hovd",
            "value": "HD",
            "country_code": "MNG"
        },
        {
            "display": "Hovedstaden",
            "value": "84",
            "country_code": "DNK"
        },
        {
            "display": "Hrodzyenskaya voblasts'",
            "value": "HR",
            "country_code": "BLR"
        },
        {
            "display": "Huambo",
            "value": "HUA",
            "country_code": "AGO"
        },
        {
            "display": "Huancavelica | Wankawillka",
            "value": "HU",
            "country_code": "PER"
        },
        {
            "display": "Hubei Province | 湖北省",
            "value": "HB",
            "country_code": "CHN"
        },
        {
            "display": "Huehuetenango",
            "value": "HU",
            "country_code": "GTM"
        },
        {
            "display": "Huila",
            "value": "HU",
            "country_code": "COL"
        },
        {
            "display": "Hunan Province | 湖南省",
            "value": "HN",
            "country_code": "CHN"
        },
        {
            "display": "Hunedoara",
            "value": "HD",
            "country_code": "ROU"
        },
        {
            "display": "Hung Yen",
            "value": "66",
            "country_code": "VNM"
        },
        {
            "display": "Huánuco | Wanuku",
            "value": "HU",
            "country_code": "PER"
        },
        {
            "display": "Huíla",
            "value": "HUI",
            "country_code": "AGO"
        },
        {
            "display": "Hwanghae-bukto",
            "value": "6",
            "country_code": "PRK"
        },
        {
            "display": "Hwanghae-namdo",
            "value": "5",
            "country_code": "PRK"
        },
        {
            "display": "Höfuðborgarsvæði",
            "value": "HÖ",
            "country_code": "ISL"
        },
        {
            "display": "Hövsgöl",
            "value": "HG",
            "country_code": "MNG"
        },
        {
            "display": "Hārerī Hizb",
            "value": "HA",
            "country_code": "ETH"
        },
        {
            "display": "H̱efa",
            "value": "HA",
            "country_code": "ISR"
        },
        {
            "display": "Ialomița",
            "value": "IL",
            "country_code": "ROU"
        },
        {
            "display": "Iași",
            "value": "IS",
            "country_code": "ROU"
        },
        {
            "display": "Ibanda",
            "value": "19",
            "country_code": "UGA"
        },
        {
            "display": "Ibb",
            "value": "IB",
            "country_code": "YEM"
        },
        {
            "display": "Ica | Ika",
            "value": "IC",
            "country_code": "PER"
        },
        {
            "display": "Ida-Virumaa",
            "value": "ID",
            "country_code": "EST"
        },
        {
            "display": "Idaho",
            "value": "ID",
            "country_code": "USA"
        },
        {
            "display": "Idlib",
            "value": "ID",
            "country_code": "SYR"
        },
        {
            "display": "Ifugao",
            "value": "IF",
            "country_code": "PHL"
        },
        {
            "display": "Iganga",
            "value": "20",
            "country_code": "UGA"
        },
        {
            "display": "Ilfov",
            "value": "IF",
            "country_code": "ROU"
        },
        {
            "display": "Illes Balears",
            "value": "IB",
            "country_code": "ESP"
        },
        {
            "display": "Illinois",
            "value": "IL",
            "country_code": "USA"
        },
        {
            "display": "Ilocos Norte",
            "value": "IN",
            "country_code": "PHL"
        },
        {
            "display": "Ilocos Sur",
            "value": "IS",
            "country_code": "PHL"
        },
        {
            "display": "Iloilo",
            "value": "II",
            "country_code": "PHL"
        },
        {
            "display": "Imbabura",
            "value": "IX",
            "country_code": "ECU"
        },
        {
            "display": "Imereti",
            "value": "IM",
            "country_code": "GEO"
        },
        {
            "display": "Imo",
            "value": "IM",
            "country_code": "NGA"
        },
        {
            "display": "Incheon",
            "value": "28",
            "country_code": "KOR"
        },
        {
            "display": "Inchiri",
            "value": "IN",
            "country_code": "MRT"
        },
        {
            "display": "Indiana",
            "value": "IN",
            "country_code": "USA"
        },
        {
            "display": "Ingush",
            "value": "IN",
            "country_code": "RUS"
        },
        {
            "display": "Inhambane",
            "value": "I",
            "country_code": "MOZ"
        },
        {
            "display": "Inner Mongolia Autonomous Region | 内蒙古自治区",
            "value": "NM",
            "country_code": "CHN"
        },
        {
            "display": "Innlandet",
            "value": "IN",
            "country_code": "NOR"
        },
        {
            "display": "Intibucá",
            "value": "IN",
            "country_code": "HND"
        },
        {
            "display": "Inverclyde",
            "value": "IV",
            "country_code": "GBR"
        },
        {
            "display": "Ionian Islands",
            "value": "II",
            "country_code": "GRC"
        },
        {
            "display": "Iowa",
            "value": "IA",
            "country_code": "USA"
        },
        {
            "display": "Irbid",
            "value": "IR",
            "country_code": "JOR"
        },
        {
            "display": "Iringa",
            "value": "IG",
            "country_code": "TZA"
        },
        {
            "display": "Irkutsk",
            "value": "IK",
            "country_code": "RUS"
        },
        {
            "display": "Isabel",
            "value": "IS",
            "country_code": "SLB"
        },
        {
            "display": "Isabela",
            "value": "IB",
            "country_code": "PHL"
        },
        {
            "display": "Isingiro",
            "value": "26",
            "country_code": "UGA"
        },
        {
            "display": "Isiolo",
            "value": "09",
            "country_code": "KEN"
        },
        {
            "display": "Isla de la Juventud",
            "value": "IJ",
            "country_code": "CUB"
        },
        {
            "display": "Islamabad Capital Territory | وفاقی دارالحکومت",
            "value": "IS",
            "country_code": "PAK"
        },
        {
            "display": "Islas de la Bahía",
            "value": "IB",
            "country_code": "HND"
        },
        {
            "display": "Isle of Anglesey",
            "value": "AG",
            "country_code": "GBR"
        },
        {
            "display": "Isle of Man",
            "value": "IM",
            "country_code": "GBR"
        },
        {
            "display": "Isparta",
            "value": "32",
            "country_code": "TUR"
        },
        {
            "display": "Istarska županija",
            "value": "IS",
            "country_code": "HRV"
        },
        {
            "display": "Ituri",
            "value": "IT",
            "country_code": "COD"
        },
        {
            "display": "Ivano-Frankivska oblast",
            "value": "IV",
            "country_code": "UKR"
        },
        {
            "display": "Ivanovo",
            "value": "IV",
            "country_code": "RUS"
        },
        {
            "display": "Izabal",
            "value": "IZ",
            "country_code": "GTM"
        },
        {
            "display": "Iğdır",
            "value": "76",
            "country_code": "TUR"
        },
        {
            "display": "Jablanički okrug",
            "value": "JA",
            "country_code": "SRB"
        },
        {
            "display": "Jakarta Raya",
            "value": "JK",
            "country_code": "IDN"
        },
        {
            "display": "Jalal-Abad",
            "value": "DA",
            "country_code": "KGZ"
        },
        {
            "display": "Jalapa",
            "value": "JA",
            "country_code": "GTM"
        },
        {
            "display": "Jalisco",
            "value": "JA",
            "country_code": "MEX"
        },
        {
            "display": "Jamalpur",
            "value": "3J",
            "country_code": "BGD"
        },
        {
            "display": "Jambi",
            "value": "JA",
            "country_code": "IDN"
        },
        {
            "display": "Jammu and Kashmir",
            "value": "JK",
            "country_code": "IND"
        },
        {
            "display": "Jan Mayen",
            "value": "JA",
            "country_code": "NOR"
        },
        {
            "display": "Janūb Sīnā'",
            "value": "JS",
            "country_code": "EGY"
        },
        {
            "display": "Janūb al Bāţinah",
            "value": "BJ",
            "country_code": "OMN"
        },
        {
            "display": "Janūb ash Sharqīyah",
            "value": "SJ",
            "country_code": "OMN"
        },
        {
            "display": "Janūbī al Baḩrī al Aḩmar",
            "value": "DK",
            "country_code": "ERI"
        },
        {
            "display": "Jarash",
            "value": "JA",
            "country_code": "JOR"
        },
        {
            "display": "Jardin Exotique",
            "value": "JE",
            "country_code": "MCO"
        },
        {
            "display": "Jawa Barat",
            "value": "JR",
            "country_code": "IDN"
        },
        {
            "display": "Jawa Tengah",
            "value": "JT",
            "country_code": "IDN"
        },
        {
            "display": "Jawa Timur",
            "value": "JI",
            "country_code": "IDN"
        },
        {
            "display": "Jeju",
            "value": "49",
            "country_code": "KOR"
        },
        {
            "display": "Jelgava",
            "value": "JE",
            "country_code": "LVA"
        },
        {
            "display": "Jendouba",
            "value": "JE",
            "country_code": "TUN"
        },
        {
            "display": "Jenin | Janīn",
            "value": "JEN",
            "country_code": "PSE"
        },
        {
            "display": "Jericho and Al Aghwar | Arīḩā wal Aghwār",
            "value": "JRH",
            "country_code": "PSE"
        },
        {
            "display": "Jersey",
            "value": "JE",
            "country_code": "GBR"
        },
        {
            "display": "Jerusalem | Al Quds",
            "value": "JEM",
            "country_code": "PSE"
        },
        {
            "display": "Jessore",
            "value": "4K",
            "country_code": "BGD"
        },
        {
            "display": "Jharkhand",
            "value": "JH",
            "country_code": "IND"
        },
        {
            "display": "Jiangsu Province | 江苏省",
            "value": "JS",
            "country_code": "CHN"
        },
        {
            "display": "Jiangxi Province | 江西省",
            "value": "JX",
            "country_code": "CHN"
        },
        {
            "display": "Jigawa",
            "value": "JI",
            "country_code": "NGA"
        },
        {
            "display": "Jihomoravský kraj",
            "value": "JI",
            "country_code": "CZE"
        },
        {
            "display": "Jihočeský kraj",
            "value": "JK",
            "country_code": "CZE"
        },
        {
            "display": "Jilin Province | 吉林省",
            "value": "JL",
            "country_code": "CHN"
        },
        {
            "display": "Jinja",
            "value": "21",
            "country_code": "UGA"
        },
        {
            "display": "Jinotega",
            "value": "JI",
            "country_code": "NIC"
        },
        {
            "display": "Jiwaka",
            "value": "WK",
            "country_code": "PNG"
        },
        {
            "display": "Jizzax",
            "value": "JI",
            "country_code": "UZB"
        },
        {
            "display": "Johor",
            "value": "1",
            "country_code": "MYS"
        },
        {
            "display": "Jowzjān",
            "value": "JOW",
            "country_code": "AFG"
        },
        {
            "display": "Jubbada Dhexe",
            "value": "JD",
            "country_code": "SOM"
        },
        {
            "display": "Jubbada Hoose",
            "value": "JH",
            "country_code": "SOM"
        },
        {
            "display": "Jungoli",
            "value": "JG",
            "country_code": "SSD"
        },
        {
            "display": "Junín | Hunin",
            "value": "JU",
            "country_code": "PER"
        },
        {
            "display": "Jura",
            "value": "JU",
            "country_code": "CHE"
        },
        {
            "display": "Jutiapa",
            "value": "JU",
            "country_code": "GTM"
        },
        {
            "display": "Južnobanatski okrug",
            "value": "JZ",
            "country_code": "SRB"
        },
        {
            "display": "Južnobački okrug",
            "value": "JU",
            "country_code": "SRB"
        },
        {
            "display": "Jász-Nagykun-Szolnok",
            "value": "JNS",
            "country_code": "HUN"
        },
        {
            "display": "Jämtlands län",
            "value": "Z",
            "country_code": "SWE"
        },
        {
            "display": "Järvamaa",
            "value": "JÄ",
            "country_code": "EST"
        },
        {
            "display": "Jõgevamaa",
            "value": "JÕ",
            "country_code": "EST"
        },
        {
            "display": "Jönköpings län",
            "value": "F",
            "country_code": "SWE"
        },
        {
            "display": "Jāzān",
            "value": "09",
            "country_code": "SAU"
        },
        {
            "display": "Jēkabpils",
            "value": "JK",
            "country_code": "LVA"
        },
        {
            "display": "Jūrmala",
            "value": "JU",
            "country_code": "LVA"
        },
        {
            "display": "K'akheti",
            "value": "KA",
            "country_code": "GEO"
        },
        {
            "display": "Kaabong",
            "value": "22",
            "country_code": "UGA"
        },
        {
            "display": "Kabale",
            "value": "23",
            "country_code": "UGA"
        },
        {
            "display": "Kabardin-Balkar",
            "value": "KB",
            "country_code": "RUS"
        },
        {
            "display": "Kabarole",
            "value": "24",
            "country_code": "UGA"
        },
        {
            "display": "Kaberamaido",
            "value": "25",
            "country_code": "UGA"
        },
        {
            "display": "Kachin",
            "value": "KC",
            "country_code": "MMR"
        },
        {
            "display": "Kadavu",
            "value": "04",
            "country_code": "FJI"
        },
        {
            "display": "Kaduna",
            "value": "KD",
            "country_code": "NGA"
        },
        {
            "display": "Kaffrine",
            "value": "KA",
            "country_code": "SEN"
        },
        {
            "display": "Kafr ash Shaykh",
            "value": "KFS",
            "country_code": "EGY"
        },
        {
            "display": "Kagera",
            "value": "KG",
            "country_code": "TZA"
        },
        {
            "display": "Kahramanmaraş",
            "value": "46",
            "country_code": "TUR"
        },
        {
            "display": "Kainuu | Kajanaland",
            "value": "KA",
            "country_code": "FIN"
        },
        {
            "display": "Kairouan",
            "value": "KR",
            "country_code": "TUN"
        },
        {
            "display": "Kajiado",
            "value": "10",
            "country_code": "KEN"
        },
        {
            "display": "Kakamega",
            "value": "11",
            "country_code": "KEN"
        },
        {
            "display": "Kalangala",
            "value": "27",
            "country_code": "UGA"
        },
        {
            "display": "Kalasin | กาฬสินธุ์",
            "value": "KSN",
            "country_code": "THA"
        },
        {
            "display": "Kalimantan Barat",
            "value": "KB",
            "country_code": "IDN"
        },
        {
            "display": "Kalimantan Selatan",
            "value": "KS",
            "country_code": "IDN"
        },
        {
            "display": "Kalimantan Tengah",
            "value": "KT",
            "country_code": "IDN"
        },
        {
            "display": "Kalimantan Timur",
            "value": "KM",
            "country_code": "IDN"
        },
        {
            "display": "Kalimantan Utara",
            "value": "KU",
            "country_code": "IDN"
        },
        {
            "display": "Kalinga",
            "value": "KA",
            "country_code": "PHL"
        },
        {
            "display": "Kaliningrad",
            "value": "KN",
            "country_code": "RUS"
        },
        {
            "display": "Kaliro",
            "value": "28",
            "country_code": "UGA"
        },
        {
            "display": "Kalmar län",
            "value": "H",
            "country_code": "SWE"
        },
        {
            "display": "Kalmyk",
            "value": "KL",
            "country_code": "RUS"
        },
        {
            "display": "Kaluga",
            "value": "KG",
            "country_code": "RUS"
        },
        {
            "display": "Kalungu",
            "value": "90",
            "country_code": "UGA"
        },
        {
            "display": "Kamchatka",
            "value": "KQ",
            "country_code": "RUS"
        },
        {
            "display": "Kampala",
            "value": "29",
            "country_code": "UGA"
        },
        {
            "display": "Kamphaeng Phet | กำแพงเพชร",
            "value": "KPT",
            "country_code": "THA"
        },
        {
            "display": "Kamuli",
            "value": "30",
            "country_code": "UGA"
        },
        {
            "display": "Kamwenge",
            "value": "31",
            "country_code": "UGA"
        },
        {
            "display": "Kanchanaburi | กาญจนบุรี",
            "value": "KRI",
            "country_code": "THA"
        },
        {
            "display": "Kandahār",
            "value": "KAN",
            "country_code": "AFG"
        },
        {
            "display": "Kanem",
            "value": "KA",
            "country_code": "TCD"
        },
        {
            "display": "Kangwŏn-do",
            "value": "7",
            "country_code": "PRK"
        },
        {
            "display": "Kankan",
            "value": "K",
            "country_code": "GIN"
        },
        {
            "display": "Kano",
            "value": "KN",
            "country_code": "NGA"
        },
        {
            "display": "Kansas",
            "value": "KS",
            "country_code": "USA"
        },
        {
            "display": "Kanta-Häme | Egentliga Tavastland",
            "value": "KT",
            "country_code": "FIN"
        },
        {
            "display": "Kanungu",
            "value": "32",
            "country_code": "UGA"
        },
        {
            "display": "Kaohsiung",
            "value": "KH",
            "country_code": "TWN"
        },
        {
            "display": "Kaolack",
            "value": "KL",
            "country_code": "SEN"
        },
        {
            "display": "Kapchorwa",
            "value": "33",
            "country_code": "UGA"
        },
        {
            "display": "Kara",
            "value": "KA",
            "country_code": "TGO"
        },
        {
            "display": "Karabük",
            "value": "78",
            "country_code": "TUR"
        },
        {
            "display": "Karachay-Cherkess",
            "value": "KC",
            "country_code": "RUS"
        },
        {
            "display": "Karak",
            "value": "KA",
            "country_code": "JOR"
        },
        {
            "display": "Karakalpakstan",
            "value": "QR",
            "country_code": "UZB"
        },
        {
            "display": "Karaman",
            "value": "70",
            "country_code": "TUR"
        },
        {
            "display": "Karas",
            "value": "KA",
            "country_code": "NAM"
        },
        {
            "display": "Karbalā’",
            "value": "KA",
            "country_code": "IRQ"
        },
        {
            "display": "Kardzhali",
            "value": "KA",
            "country_code": "BGR"
        },
        {
            "display": "Karelia",
            "value": "KI",
            "country_code": "RUS"
        },
        {
            "display": "Karlovarský kraj",
            "value": "KA",
            "country_code": "CZE"
        },
        {
            "display": "Karlovačka županija",
            "value": "KA",
            "country_code": "HRV"
        },
        {
            "display": "Karnali ",
            "value": "P6",
            "country_code": "NPL"
        },
        {
            "display": "Karnataka",
            "value": "KA",
            "country_code": "IND"
        },
        {
            "display": "Karonga",
            "value": "KR",
            "country_code": "MWI"
        },
        {
            "display": "Kars",
            "value": "36",
            "country_code": "TUR"
        },
        {
            "display": "Karuzi",
            "value": "KR",
            "country_code": "BDI"
        },
        {
            "display": "Kasaï",
            "value": "KS",
            "country_code": "COD"
        },
        {
            "display": "Kasaï Central",
            "value": "KC",
            "country_code": "COD"
        },
        {
            "display": "Kasaï Oriental",
            "value": "KE",
            "country_code": "COD"
        },
        {
            "display": "Kasese",
            "value": "34",
            "country_code": "UGA"
        },
        {
            "display": "Kashkadarya",
            "value": "QA",
            "country_code": "UZB"
        },
        {
            "display": "Kassala",
            "value": "KA",
            "country_code": "SDN"
        },
        {
            "display": "Kassérine",
            "value": "KS",
            "country_code": "TUN"
        },
        {
            "display": "Kastamonu",
            "value": "37",
            "country_code": "TUR"
        },
        {
            "display": "Kasungu",
            "value": "KS",
            "country_code": "MWI"
        },
        {
            "display": "Katakwi",
            "value": "35",
            "country_code": "UGA"
        },
        {
            "display": "Katavi",
            "value": "KA",
            "country_code": "TZA"
        },
        {
            "display": "Katsina",
            "value": "KT",
            "country_code": "NGA"
        },
        {
            "display": "Kauno apskritis",
            "value": "KU",
            "country_code": "LTU"
        },
        {
            "display": "Kavango East",
            "value": "KE",
            "country_code": "NAM"
        },
        {
            "display": "Kavango West",
            "value": "KW",
            "country_code": "NAM"
        },
        {
            "display": "Kayah",
            "value": "KH",
            "country_code": "MMR"
        },
        {
            "display": "Kayanza",
            "value": "KY",
            "country_code": "BDI"
        },
        {
            "display": "Kayes",
            "value": "KY",
            "country_code": "MLI"
        },
        {
            "display": "Kayin",
            "value": "KN",
            "country_code": "MMR"
        },
        {
            "display": "Kayseri",
            "value": "38",
            "country_code": "TUR"
        },
        {
            "display": "Kayunga",
            "value": "36",
            "country_code": "UGA"
        },
        {
            "display": "Kaôh Kŏng",
            "value": "KK",
            "country_code": "KHM"
        },
        {
            "display": "Kebbi",
            "value": "KE",
            "country_code": "NGA"
        },
        {
            "display": "Kebili",
            "value": "KB",
            "country_code": "TUN"
        },
        {
            "display": "Kedah",
            "value": "2",
            "country_code": "MYS"
        },
        {
            "display": "Kelantan",
            "value": "3",
            "country_code": "MYS"
        },
        {
            "display": "Kemerovo",
            "value": "KE",
            "country_code": "RUS"
        },
        {
            "display": "Kent",
            "value": "KE",
            "country_code": "GBR"
        },
        {
            "display": "Kentucky",
            "value": "KY",
            "country_code": "USA"
        },
        {
            "display": "Kepulauan Riau",
            "value": "KR",
            "country_code": "IDN"
        },
        {
            "display": "Kerala",
            "value": "KL",
            "country_code": "IND"
        },
        {
            "display": "Kericho",
            "value": "12",
            "country_code": "KEN"
        },
        {
            "display": "Kermān",
            "value": "08",
            "country_code": "IRN"
        },
        {
            "display": "Kermānshāh",
            "value": "05",
            "country_code": "IRN"
        },
        {
            "display": "Keski-Pohjanmaa | Mellersta Österbotten",
            "value": "KE",
            "country_code": "FIN"
        },
        {
            "display": "Keski-Suomi | Mellersta Finland",
            "value": "KS",
            "country_code": "FIN"
        },
        {
            "display": "Kgalagadi",
            "value": "KG",
            "country_code": "BWA"
        },
        {
            "display": "Kgatleng",
            "value": "KL",
            "country_code": "BWA"
        },
        {
            "display": "Khabarovsk",
            "value": "KH",
            "country_code": "RUS"
        },
        {
            "display": "Khakass",
            "value": "KK",
            "country_code": "RUS"
        },
        {
            "display": "Khammouan",
            "value": "KH",
            "country_code": "LAO"
        },
        {
            "display": "Khan Yunis | Khān Yūnis",
            "value": "KYS",
            "country_code": "PSE"
        },
        {
            "display": "Khanh Hoa",
            "value": "34",
            "country_code": "VNM"
        },
        {
            "display": "Khanty-Mansiy",
            "value": "KM",
            "country_code": "RUS"
        },
        {
            "display": "Kharkivska oblast",
            "value": "KH",
            "country_code": "UKR"
        },
        {
            "display": "Khartoum",
            "value": "KH",
            "country_code": "SDN"
        },
        {
            "display": "Khatlon",
            "value": "KL",
            "country_code": "TJK"
        },
        {
            "display": "Khersonska oblast",
            "value": "KE",
            "country_code": "UKR"
        },
        {
            "display": "Khmelnytska oblast",
            "value": "KM",
            "country_code": "UKR"
        },
        {
            "display": "Khomas",
            "value": "KH",
            "country_code": "NAM"
        },
        {
            "display": "Khon Kaen | ขอนแก่น",
            "value": "KKN",
            "country_code": "THA"
        },
        {
            "display": "Khorāsān-e Jonūbī",
            "value": "29",
            "country_code": "IRN"
        },
        {
            "display": "Khorāsān-e Raẕavī",
            "value": "09",
            "country_code": "IRN"
        },
        {
            "display": "Khorāsān-e Shomālī",
            "value": "28",
            "country_code": "IRN"
        },
        {
            "display": "Khulna",
            "value": "4L",
            "country_code": "BGD"
        },
        {
            "display": "Khyber Pakhtunkhwa | خیبر پختون خواہ",
            "value": "KP",
            "country_code": "PAK"
        },
        {
            "display": "Khōst",
            "value": "KHO",
            "country_code": "AFG"
        },
        {
            "display": "Khūzestān",
            "value": "06",
            "country_code": "IRN"
        },
        {
            "display": "Kiambu",
            "value": "13",
            "country_code": "KEN"
        },
        {
            "display": "Kibaale",
            "value": "37",
            "country_code": "UGA"
        },
        {
            "display": "Kiboga",
            "value": "38",
            "country_code": "UGA"
        },
        {
            "display": "Kibuku",
            "value": "91",
            "country_code": "UGA"
        },
        {
            "display": "Kidal",
            "value": "KD",
            "country_code": "MLI"
        },
        {
            "display": "Kien Giang",
            "value": "47",
            "country_code": "VNM"
        },
        {
            "display": "Kigali City",
            "value": "KV",
            "country_code": "RWA"
        },
        {
            "display": "Kigoma",
            "value": "KM",
            "country_code": "TZA"
        },
        {
            "display": "Kilifi",
            "value": "14",
            "country_code": "KEN"
        },
        {
            "display": "Kilimanjaro",
            "value": "KL",
            "country_code": "TZA"
        },
        {
            "display": "Kilis",
            "value": "79",
            "country_code": "TUR"
        },
        {
            "display": "Kindia",
            "value": "D",
            "country_code": "GIN"
        },
        {
            "display": "Kingston",
            "value": "KG",
            "country_code": "JAM"
        },
        {
            "display": "Kirinyaga",
            "value": "15",
            "country_code": "KEN"
        },
        {
            "display": "Kirkūk",
            "value": "KI",
            "country_code": "IRQ"
        },
        {
            "display": "Kirov",
            "value": "KV",
            "country_code": "RUS"
        },
        {
            "display": "Kirovohradska oblast",
            "value": "KI",
            "country_code": "UKR"
        },
        {
            "display": "Kiruhura",
            "value": "40",
            "country_code": "UGA"
        },
        {
            "display": "Kirundo",
            "value": "KI",
            "country_code": "BDI"
        },
        {
            "display": "Kiryandongo",
            "value": "92",
            "country_code": "UGA"
        },
        {
            "display": "Kisii",
            "value": "16",
            "country_code": "KEN"
        },
        {
            "display": "Kisoro",
            "value": "41",
            "country_code": "UGA"
        },
        {
            "display": "Kisumu",
            "value": "17",
            "country_code": "KEN"
        },
        {
            "display": "Kitgum",
            "value": "42",
            "country_code": "UGA"
        },
        {
            "display": "Kitui",
            "value": "18",
            "country_code": "KEN"
        },
        {
            "display": "Kié-Ntem",
            "value": "KN",
            "country_code": "GNQ"
        },
        {
            "display": "Klaipėdos apskritis",
            "value": "KL",
            "country_code": "LTU"
        },
        {
            "display": "Koboko",
            "value": "43",
            "country_code": "UGA"
        },
        {
            "display": "Kocaeli",
            "value": "41",
            "country_code": "TUR"
        },
        {
            "display": "Kogi",
            "value": "KO",
            "country_code": "NGA"
        },
        {
            "display": "Kohgīlūyeh va Bowyer Aḩmad",
            "value": "17",
            "country_code": "IRN"
        },
        {
            "display": "Kolašin",
            "value": "KO",
            "country_code": "MNE"
        },
        {
            "display": "Kolda",
            "value": "KD",
            "country_code": "SEN"
        },
        {
            "display": "Kole",
            "value": "93",
            "country_code": "UGA"
        },
        {
            "display": "Kolubarski okrug",
            "value": "KL",
            "country_code": "SRB"
        },
        {
            "display": "Komi",
            "value": "KO",
            "country_code": "RUS"
        },
        {
            "display": "Komárom-Esztergom",
            "value": "KE",
            "country_code": "HUN"
        },
        {
            "display": "Kon Tum",
            "value": "28",
            "country_code": "VNM"
        },
        {
            "display": "Kongo Central",
            "value": "BC",
            "country_code": "COD"
        },
        {
            "display": "Konya",
            "value": "42",
            "country_code": "TUR"
        },
        {
            "display": "Koprivničko-križevačka županija",
            "value": "KO",
            "country_code": "HRV"
        },
        {
            "display": "Kordestān",
            "value": "12",
            "country_code": "IRN"
        },
        {
            "display": "Koroška",
            "value": "KO",
            "country_code": "SVN"
        },
        {
            "display": "Korçë",
            "value": "KO",
            "country_code": "ALB"
        },
        {
            "display": "Kosice",
            "value": "KI",
            "country_code": "SVK"
        },
        {
            "display": "Kosovo-Metohija",
            "value": "KM",
            "country_code": "SRB"
        },
        {
            "display": "Kosovski okrug",
            "value": "KO",
            "country_code": "SRB"
        },
        {
            "display": "Kosovsko-Mitrovački okrug",
            "value": "KS",
            "country_code": "SRB"
        },
        {
            "display": "Kosovsko-Pomoravski okrug",
            "value": "KP",
            "country_code": "SRB"
        },
        {
            "display": "Kosrae",
            "value": "KSA",
            "country_code": "FSM"
        },
        {
            "display": "Kostroma",
            "value": "KT",
            "country_code": "RUS"
        },
        {
            "display": "Kotayk'",
            "value": "KT",
            "country_code": "ARM"
        },
        {
            "display": "Kotido",
            "value": "44",
            "country_code": "UGA"
        },
        {
            "display": "Kotor",
            "value": "KT",
            "country_code": "MNE"
        },
        {
            "display": "Kouilou",
            "value": "5",
            "country_code": "COG"
        },
        {
            "display": "Koulikoro",
            "value": "KK",
            "country_code": "MLI"
        },
        {
            "display": "Krabi | กระบี่",
            "value": "KBI",
            "country_code": "THA"
        },
        {
            "display": "Kraj Vysočina",
            "value": "KR",
            "country_code": "CZE"
        },
        {
            "display": "Krapinsko-zagorska županija",
            "value": "KR",
            "country_code": "HRV"
        },
        {
            "display": "Krasnodar",
            "value": "KD",
            "country_code": "RUS"
        },
        {
            "display": "Krasnoyarsk",
            "value": "KX",
            "country_code": "RUS"
        },
        {
            "display": "Krong Keb",
            "value": "KB",
            "country_code": "KHM"
        },
        {
            "display": "Krong Pailin",
            "value": "PL",
            "country_code": "KHM"
        },
        {
            "display": "Kronobergs län",
            "value": "G",
            "country_code": "SWE"
        },
        {
            "display": "Královéhradecký kraj",
            "value": "KV",
            "country_code": "CZE"
        },
        {
            "display": "Krâchéh",
            "value": "KH",
            "country_code": "KHM"
        },
        {
            "display": "Krŏng Preăh Sihanouk",
            "value": "KA",
            "country_code": "KHM"
        },
        {
            "display": "Kuala Lumpur",
            "value": "14",
            "country_code": "MYS"
        },
        {
            "display": "Kuando Kubango | Cuando Cubango",
            "value": "CCU",
            "country_code": "AGO"
        },
        {
            "display": "Kujalleq",
            "value": "KU",
            "country_code": "GRL"
        },
        {
            "display": "Kukës",
            "value": "KU",
            "country_code": "ALB"
        },
        {
            "display": "Kumi",
            "value": "45",
            "country_code": "UGA"
        },
        {
            "display": "Kunaṟ",
            "value": "KNR",
            "country_code": "AFG"
        },
        {
            "display": "Kunduz",
            "value": "KDZ",
            "country_code": "AFG"
        },
        {
            "display": "Kunene",
            "value": "KU",
            "country_code": "NAM"
        },
        {
            "display": "Kurgan",
            "value": "KU",
            "country_code": "RUS"
        },
        {
            "display": "Kursk",
            "value": "KS",
            "country_code": "RUS"
        },
        {
            "display": "Kushtia",
            "value": "4M",
            "country_code": "BGD"
        },
        {
            "display": "Kuyavia-Pomerania | Kujawsko-pomorskie",
            "value": "KU",
            "country_code": "POL"
        },
        {
            "display": "Kvemo Kartli",
            "value": "KK",
            "country_code": "GEO"
        },
        {
            "display": "KwaZulu-Natal",
            "value": "KZN",
            "country_code": "ZAF"
        },
        {
            "display": "Kwale",
            "value": "19",
            "country_code": "KEN"
        },
        {
            "display": "Kwango",
            "value": "KG",
            "country_code": "COD"
        },
        {
            "display": "Kwanza Norte | Cuanza-Norte",
            "value": "CNO",
            "country_code": "AGO"
        },
        {
            "display": "Kwanza Sul | Cuanza-Sul",
            "value": "CUS",
            "country_code": "AGO"
        },
        {
            "display": "Kwara",
            "value": "KW",
            "country_code": "NGA"
        },
        {
            "display": "Kween",
            "value": "94",
            "country_code": "UGA"
        },
        {
            "display": "Kweneng",
            "value": "KW",
            "country_code": "BWA"
        },
        {
            "display": "Kwilu",
            "value": "KL",
            "country_code": "COD"
        },
        {
            "display": "Kyankwanzi",
            "value": "95",
            "country_code": "UGA"
        },
        {
            "display": "Kyegegwa",
            "value": "96",
            "country_code": "UGA"
        },
        {
            "display": "Kyenjojo",
            "value": "46",
            "country_code": "UGA"
        },
        {
            "display": "Kyivska oblast",
            "value": "KY",
            "country_code": "UKR"
        },
        {
            "display": "Kymenlaakso | Kymmenedalen",
            "value": "KY",
            "country_code": "FIN"
        },
        {
            "display": "Kyrenia | Κερύvεια",
            "value": "KY",
            "country_code": "CYP"
        },
        {
            "display": "Kyustendil",
            "value": "KY",
            "country_code": "BGR"
        },
        {
            "display": "Kâmpóng Cham",
            "value": "KC",
            "country_code": "KHM"
        },
        {
            "display": "Kâmpóng Chhnăng",
            "value": "KG",
            "country_code": "KHM"
        },
        {
            "display": "Kâmpóng Spœ",
            "value": "KS",
            "country_code": "KHM"
        },
        {
            "display": "Kâmpóng Thum",
            "value": "KT",
            "country_code": "KHM"
        },
        {
            "display": "Kâmpôt",
            "value": "KP",
            "country_code": "KHM"
        },
        {
            "display": "Kândal",
            "value": "KN",
            "country_code": "KHM"
        },
        {
            "display": "Kärnten",
            "value": "KÄ",
            "country_code": "AUT"
        },
        {
            "display": "Kédougou",
            "value": "KE",
            "country_code": "SEN"
        },
        {
            "display": "Kémo",
            "value": "KG",
            "country_code": "CAF"
        },
        {
            "display": "Kütahya",
            "value": "43",
            "country_code": "TUR"
        },
        {
            "display": "Kābul",
            "value": "KAB",
            "country_code": "AFG"
        },
        {
            "display": "Kāpīsā",
            "value": "KAP",
            "country_code": "AFG"
        },
        {
            "display": "Kırklareli",
            "value": "39",
            "country_code": "TUR"
        },
        {
            "display": "Kırıkkale",
            "value": "71",
            "country_code": "TUR"
        },
        {
            "display": "Kırşehir",
            "value": "40",
            "country_code": "TUR"
        },
        {
            "display": "L'oriental",
            "value": "OF",
            "country_code": "MAR"
        },
        {
            "display": "La Araucanía",
            "value": "AR",
            "country_code": "CHL"
        },
        {
            "display": "La Colle",
            "value": "CL",
            "country_code": "MCO"
        },
        {
            "display": "La Condamine",
            "value": "CO",
            "country_code": "MCO"
        },
        {
            "display": "La Digue and Inner Islands",
            "value": "DI",
            "country_code": "SYC"
        },
        {
            "display": "La Gare",
            "value": "GA",
            "country_code": "MCO"
        },
        {
            "display": "La Guajira",
            "value": "LA",
            "country_code": "COL"
        },
        {
            "display": "La Habana",
            "value": "CH",
            "country_code": "CUB"
        },
        {
            "display": "La Libertad",
            "value": "LI",
            "country_code": "SLV"
        },
        {
            "display": "La Libertad | Qispi kay",
            "value": "LA",
            "country_code": "PER"
        },
        {
            "display": "La Massana",
            "value": "MA",
            "country_code": "AND"
        },
        {
            "display": "La Paz",
            "value": "L",
            "country_code": "BOL"
        },
        {
            "display": "La Paz",
            "value": "PA",
            "country_code": "SLV"
        },
        {
            "display": "La Paz",
            "value": "LP",
            "country_code": "HND"
        },
        {
            "display": "La Rioja",
            "value": "RI",
            "country_code": "ESP"
        },
        {
            "display": "La Source",
            "value": "SO",
            "country_code": "MCO"
        },
        {
            "display": "La Union",
            "value": "LU",
            "country_code": "PHL"
        },
        {
            "display": "La Unión",
            "value": "UN",
            "country_code": "SLV"
        },
        {
            "display": "Labuan",
            "value": "15",
            "country_code": "MYS"
        },
        {
            "display": "Labé",
            "value": "L",
            "country_code": "GIN"
        },
        {
            "display": "Lac",
            "value": "LC",
            "country_code": "TCD"
        },
        {
            "display": "Lacs",
            "value": "LA",
            "country_code": "CIV"
        },
        {
            "display": "Laghmān",
            "value": "LAG",
            "country_code": "AFG"
        },
        {
            "display": "Lagos",
            "value": "LA",
            "country_code": "NGA"
        },
        {
            "display": "Laguna",
            "value": "LG",
            "country_code": "PHL"
        },
        {
            "display": "Lagunes",
            "value": "LN",
            "country_code": "CIV"
        },
        {
            "display": "Lai Chau",
            "value": "1",
            "country_code": "VNM"
        },
        {
            "display": "Laikipia",
            "value": "20",
            "country_code": "KEN"
        },
        {
            "display": "Lakes",
            "value": "EB",
            "country_code": "SSD"
        },
        {
            "display": "Lakshadweep",
            "value": "LD",
            "country_code": "IND"
        },
        {
            "display": "Lam Dong",
            "value": "35",
            "country_code": "VNM"
        },
        {
            "display": "Lambayeque | Lampalliqi",
            "value": "LA",
            "country_code": "PER"
        },
        {
            "display": "Lampang | ลำปาง",
            "value": "LPG",
            "country_code": "THA"
        },
        {
            "display": "Lamphun | ลำพูน",
            "value": "LPN",
            "country_code": "THA"
        },
        {
            "display": "Lampung",
            "value": "LA",
            "country_code": "IDN"
        },
        {
            "display": "Lamu",
            "value": "21",
            "country_code": "KEN"
        },
        {
            "display": "Lamwo",
            "value": "97",
            "country_code": "UGA"
        },
        {
            "display": "Lanao del Norte",
            "value": "LN",
            "country_code": "PHL"
        },
        {
            "display": "Lanao del Sur",
            "value": "LS",
            "country_code": "PHL"
        },
        {
            "display": "Lancashire",
            "value": "LA",
            "country_code": "GBR"
        },
        {
            "display": "Lang Son",
            "value": "9",
            "country_code": "VNM"
        },
        {
            "display": "Lao Cai",
            "value": "2",
            "country_code": "VNM"
        },
        {
            "display": "Lappi | Lappland",
            "value": "LA",
            "country_code": "FIN"
        },
        {
            "display": "Lara",
            "value": "KX",
            "country_code": "VEN"
        },
        {
            "display": "Larnaca | Λάρνακα",
            "value": "LA",
            "country_code": "CYP"
        },
        {
            "display": "Larvotto",
            "value": "LA",
            "country_code": "MCO"
        },
        {
            "display": "Las Tunas",
            "value": "LT",
            "country_code": "CUB"
        },
        {
            "display": "Lau",
            "value": "05",
            "country_code": "FJI"
        },
        {
            "display": "Lautém | Lautein",
            "value": "LA",
            "country_code": "TLS"
        },
        {
            "display": "Laâyoune-Sakia al Hamra",
            "value": "LS",
            "country_code": "MAR"
        },
        {
            "display": "Laḩij",
            "value": "LA",
            "country_code": "YEM"
        },
        {
            "display": "Le Kef",
            "value": "KF",
            "country_code": "TUN"
        },
        {
            "display": "Lebap",
            "value": "LE",
            "country_code": "TKM"
        },
        {
            "display": "Leicestershire",
            "value": "LE",
            "country_code": "GBR"
        },
        {
            "display": "Leinster | Laighin",
            "value": "LX",
            "country_code": "IRL"
        },
        {
            "display": "Leiria",
            "value": "LE",
            "country_code": "PRT"
        },
        {
            "display": "Lempira",
            "value": "LE",
            "country_code": "HND"
        },
        {
            "display": "Leningrad",
            "value": "LN",
            "country_code": "RUS"
        },
        {
            "display": "Leribe",
            "value": "LE",
            "country_code": "LSO"
        },
        {
            "display": "Les Mamelles",
            "value": "LM",
            "country_code": "SYC"
        },
        {
            "display": "Lesser Poland | Małopolskie",
            "value": "LE",
            "country_code": "POL"
        },
        {
            "display": "Leyte",
            "value": "LE",
            "country_code": "PHL"
        },
        {
            "display": "Lezhë",
            "value": "LE",
            "country_code": "ALB"
        },
        {
            "display": "León",
            "value": "LE",
            "country_code": "NIC"
        },
        {
            "display": "Lhuntshi",
            "value": "LH",
            "country_code": "BTN"
        },
        {
            "display": "Liaoning Province | 辽宁省",
            "value": "LN",
            "country_code": "CHN"
        },
        {
            "display": "Liban-Nord",
            "value": "AS",
            "country_code": "LBN"
        },
        {
            "display": "Liban-Sud",
            "value": "JA",
            "country_code": "LBN"
        },
        {
            "display": "Liberecký kraj",
            "value": "LI",
            "country_code": "CZE"
        },
        {
            "display": "Libertador General Bernardo O'Higgins",
            "value": "LI",
            "country_code": "CHL"
        },
        {
            "display": "Liepāja",
            "value": "LP",
            "country_code": "LVA"
        },
        {
            "display": "Likoma",
            "value": "LK",
            "country_code": "MWI"
        },
        {
            "display": "Likouala",
            "value": "7",
            "country_code": "COG"
        },
        {
            "display": "Lilongwe",
            "value": "LI",
            "country_code": "MWI"
        },
        {
            "display": "Lima | Lima",
            "value": "LI",
            "country_code": "PER"
        },
        {
            "display": "Limassol | Λεμεσός",
            "value": "LL",
            "country_code": "CYP"
        },
        {
            "display": "Limburg",
            "value": "LB",
            "country_code": "BEL"
        },
        {
            "display": "Limburg",
            "value": "LI",
            "country_code": "NLD"
        },
        {
            "display": "Limpopo",
            "value": "LP",
            "country_code": "ZAF"
        },
        {
            "display": "Limón",
            "value": "LX",
            "country_code": "CRI"
        },
        {
            "display": "Lincolnshire",
            "value": "LI",
            "country_code": "GBR"
        },
        {
            "display": "Lindi",
            "value": "LI",
            "country_code": "TZA"
        },
        {
            "display": "Line Islands",
            "value": "LI",
            "country_code": "KIR"
        },
        {
            "display": "Lipetsk",
            "value": "LP",
            "country_code": "RUS"
        },
        {
            "display": "Liquiça | Likisá",
            "value": "LI",
            "country_code": "TLS"
        },
        {
            "display": "Lira",
            "value": "47",
            "country_code": "UGA"
        },
        {
            "display": "Lisboa",
            "value": "LI",
            "country_code": "PRT"
        },
        {
            "display": "Lisburn and Castlereagh",
            "value": "LB",
            "country_code": "GBR"
        },
        {
            "display": "Litoral",
            "value": "LI",
            "country_code": "GNQ"
        },
        {
            "display": "Littoral",
            "value": "LI",
            "country_code": "BEN"
        },
        {
            "display": "Littoral",
            "value": "LT",
            "country_code": "CMR"
        },
        {
            "display": "Ličko-senjska županija",
            "value": "LI",
            "country_code": "HRV"
        },
        {
            "display": "Lobaye",
            "value": "LB",
            "country_code": "CAF"
        },
        {
            "display": "Loei | เลย",
            "value": "LEI",
            "country_code": "THA"
        },
        {
            "display": "Lofa",
            "value": "LO",
            "country_code": "LBR"
        },
        {
            "display": "Logone Occidental",
            "value": "LO",
            "country_code": "TCD"
        },
        {
            "display": "Logone Oriental",
            "value": "LR",
            "country_code": "TCD"
        },
        {
            "display": "Loja",
            "value": "LX",
            "country_code": "ECU"
        },
        {
            "display": "Lomaiviti",
            "value": "06",
            "country_code": "FJI"
        },
        {
            "display": "Lomami",
            "value": "LO",
            "country_code": "COD"
        },
        {
            "display": "Long An",
            "value": "41",
            "country_code": "VNM"
        },
        {
            "display": "Lopburi | ลพบุรี",
            "value": "LRI",
            "country_code": "THA"
        },
        {
            "display": "Lorestān",
            "value": "15",
            "country_code": "IRN"
        },
        {
            "display": "Loreto | Luritu",
            "value": "LO",
            "country_code": "PER"
        },
        {
            "display": "Los Lagos",
            "value": "LL",
            "country_code": "CHL"
        },
        {
            "display": "Los Ríos",
            "value": "LR",
            "country_code": "CHL"
        },
        {
            "display": "Los Ríos",
            "value": "RX",
            "country_code": "ECU"
        },
        {
            "display": "Los Santos",
            "value": "LS",
            "country_code": "PAN"
        },
        {
            "display": "Louang Namtha",
            "value": "LM",
            "country_code": "LAO"
        },
        {
            "display": "Louangphrabang",
            "value": "LP",
            "country_code": "LAO"
        },
        {
            "display": "Louga",
            "value": "LG",
            "country_code": "SEN"
        },
        {
            "display": "Louisiana",
            "value": "LA",
            "country_code": "USA"
        },
        {
            "display": "Lovech",
            "value": "LO",
            "country_code": "BGR"
        },
        {
            "display": "Lower River",
            "value": "LR",
            "country_code": "GMB"
        },
        {
            "display": "Lower Silesia | Dolnośląskie",
            "value": "LO",
            "country_code": "POL"
        },
        {
            "display": "Loṙi",
            "value": "LO",
            "country_code": "ARM"
        },
        {
            "display": "Lualaba",
            "value": "LU",
            "country_code": "COD"
        },
        {
            "display": "Luanda",
            "value": "LUA",
            "country_code": "AGO"
        },
        {
            "display": "Luapula",
            "value": "LP",
            "country_code": "ZMB"
        },
        {
            "display": "Lublin | Lubelskie",
            "value": "LU",
            "country_code": "POL"
        },
        {
            "display": "Lubombo",
            "value": "LU",
            "country_code": "SWZ"
        },
        {
            "display": "Lubusz | Lubuskie",
            "value": "LB",
            "country_code": "POL"
        },
        {
            "display": "Luhanska oblast",
            "value": "LU",
            "country_code": "UKR"
        },
        {
            "display": "Luik",
            "value": "LK",
            "country_code": "BEL"
        },
        {
            "display": "Lumbini ",
            "value": "P5",
            "country_code": "NPL"
        },
        {
            "display": "Lunda-Norte",
            "value": "LNO",
            "country_code": "AGO"
        },
        {
            "display": "Lunda-Sul",
            "value": "LSU",
            "country_code": "AGO"
        },
        {
            "display": "Lusaka",
            "value": "LS",
            "country_code": "ZMB"
        },
        {
            "display": "Luuka",
            "value": "98",
            "country_code": "UGA"
        },
        {
            "display": "Luweero",
            "value": "48",
            "country_code": "UGA"
        },
        {
            "display": "Luxembourg | Lëtzebuerg",
            "value": "LU",
            "country_code": "LUX"
        },
        {
            "display": "Luxemburg",
            "value": "LB",
            "country_code": "BEL"
        },
        {
            "display": "Luzern",
            "value": "LU",
            "country_code": "CHE"
        },
        {
            "display": "Lvivska oblast",
            "value": "LV",
            "country_code": "UKR"
        },
        {
            "display": "Lwengo",
            "value": "99",
            "country_code": "UGA"
        },
        {
            "display": "Lyantonde",
            "value": "100",
            "country_code": "UGA"
        },
        {
            "display": "Lääne-Virumaa",
            "value": "LV",
            "country_code": "EST"
        },
        {
            "display": "Läänemaa",
            "value": "LÄ",
            "country_code": "EST"
        },
        {
            "display": "Lékoumou",
            "value": "2",
            "country_code": "COG"
        },
        {
            "display": "Lōgar",
            "value": "LOG",
            "country_code": "AFG"
        },
        {
            "display": "Lənkəran",
            "value": "LA",
            "country_code": "AZE"
        },
        {
            "display": "Ma`an",
            "value": "MN",
            "country_code": "JOR"
        },
        {
            "display": "Macau Special Administrative Region | 澳门特别行政区",
            "value": "MO",
            "country_code": "CHN"
        },
        {
            "display": "Machakos",
            "value": "22",
            "country_code": "KEN"
        },
        {
            "display": "Machinga",
            "value": "MH",
            "country_code": "MWI"
        },
        {
            "display": "Macuata",
            "value": "07",
            "country_code": "FJI"
        },
        {
            "display": "Madaba",
            "value": "MD",
            "country_code": "JOR"
        },
        {
            "display": "Madang",
            "value": "MPM",
            "country_code": "PNG"
        },
        {
            "display": "Madhya Pradesh",
            "value": "MP",
            "country_code": "IND"
        },
        {
            "display": "Madre de Dios | Mayutata",
            "value": "MD",
            "country_code": "PER"
        },
        {
            "display": "Madrid Comunidad de",
            "value": "MD",
            "country_code": "ESP"
        },
        {
            "display": "Madriz",
            "value": "MD",
            "country_code": "NIC"
        },
        {
            "display": "Mae Hong Son | แม่ฮ่องสอน",
            "value": "MSN",
            "country_code": "THA"
        },
        {
            "display": "Mafeteng",
            "value": "MF",
            "country_code": "LSO"
        },
        {
            "display": "Mafraq",
            "value": "MA",
            "country_code": "JOR"
        },
        {
            "display": "Magadan",
            "value": "MG",
            "country_code": "RUS"
        },
        {
            "display": "Magallanes",
            "value": "MA",
            "country_code": "CHL"
        },
        {
            "display": "Magdalena",
            "value": "MA",
            "country_code": "COL"
        },
        {
            "display": "Maguindanao",
            "value": "MG",
            "country_code": "PHL"
        },
        {
            "display": "Magway",
            "value": "MG",
            "country_code": "MMR"
        },
        {
            "display": "Maha Sarakham | มหาสารคาม",
            "value": "MKM",
            "country_code": "THA"
        },
        {
            "display": "Mahaica-Berbice",
            "value": "MA",
            "country_code": "GUY"
        },
        {
            "display": "Mahajanga",
            "value": "MA",
            "country_code": "MDG"
        },
        {
            "display": "Maharashtra",
            "value": "MH",
            "country_code": "IND"
        },
        {
            "display": "Mahdia",
            "value": "MH",
            "country_code": "TUN"
        },
        {
            "display": "Mahilyowskaya voblasts'",
            "value": "MA",
            "country_code": "BLR"
        },
        {
            "display": "Mai-Ndombe",
            "value": "MN",
            "country_code": "COD"
        },
        {
            "display": "Maine",
            "value": "ME",
            "country_code": "USA"
        },
        {
            "display": "Maio",
            "value": "MA",
            "country_code": "CPV"
        },
        {
            "display": "Makamba",
            "value": "MA",
            "country_code": "BDI"
        },
        {
            "display": "Makira-Ulawa",
            "value": "MK",
            "country_code": "SLB"
        },
        {
            "display": "Makkah al Mukarramah",
            "value": "02",
            "country_code": "SAU"
        },
        {
            "display": "Makueni",
            "value": "23",
            "country_code": "KEN"
        },
        {
            "display": "Malaita",
            "value": "ML",
            "country_code": "SLB"
        },
        {
            "display": "Malange",
            "value": "MAL",
            "country_code": "AGO"
        },
        {
            "display": "Malatya",
            "value": "44",
            "country_code": "TUR"
        },
        {
            "display": "Malbousquet",
            "value": "MA",
            "country_code": "MCO"
        },
        {
            "display": "Maluku",
            "value": "MA",
            "country_code": "IDN"
        },
        {
            "display": "Maluku Utara",
            "value": "MU",
            "country_code": "IDN"
        },
        {
            "display": "Mambéré-Kadéï",
            "value": "HS",
            "country_code": "CAF"
        },
        {
            "display": "Mamou",
            "value": "M",
            "country_code": "GIN"
        },
        {
            "display": "Manabí",
            "value": "MX",
            "country_code": "ECU"
        },
        {
            "display": "Manafwa",
            "value": "101",
            "country_code": "UGA"
        },
        {
            "display": "Managua",
            "value": "MN",
            "country_code": "NIC"
        },
        {
            "display": "Manatuto | Manatutu",
            "value": "MT",
            "country_code": "TLS"
        },
        {
            "display": "Manawatū-Whanganui | Manawatū-Whanganui",
            "value": "MWT",
            "country_code": "NZL"
        },
        {
            "display": "Manchester",
            "value": "MH",
            "country_code": "JAM"
        },
        {
            "display": "Mandalay",
            "value": "ML",
            "country_code": "MMR"
        },
        {
            "display": "Mandera",
            "value": "24",
            "country_code": "KEN"
        },
        {
            "display": "Mandoul",
            "value": "MA",
            "country_code": "TCD"
        },
        {
            "display": "Mangghystau",
            "value": "MG",
            "country_code": "KAZ"
        },
        {
            "display": "Mangochi",
            "value": "MG",
            "country_code": "MWI"
        },
        {
            "display": "Manica",
            "value": "B",
            "country_code": "MOZ"
        },
        {
            "display": "Manicaland",
            "value": "MA",
            "country_code": "ZWE"
        },
        {
            "display": "Maniema",
            "value": "MA",
            "country_code": "COD"
        },
        {
            "display": "Manipur",
            "value": "MN",
            "country_code": "IND"
        },
        {
            "display": "Manisa",
            "value": "45",
            "country_code": "TUR"
        },
        {
            "display": "Manitoba",
            "value": "MB",
            "country_code": "CAN"
        },
        {
            "display": "Manouba",
            "value": "MN",
            "country_code": "TUN"
        },
        {
            "display": "Manufahi | Manufahi",
            "value": "MF",
            "country_code": "TLS"
        },
        {
            "display": "Manus",
            "value": "MRL",
            "country_code": "PNG"
        },
        {
            "display": "Manyara",
            "value": "MY",
            "country_code": "TZA"
        },
        {
            "display": "Manzini",
            "value": "MA",
            "country_code": "SWZ"
        },
        {
            "display": "Maputo",
            "value": "L",
            "country_code": "MOZ"
        },
        {
            "display": "Mara",
            "value": "MA",
            "country_code": "TZA"
        },
        {
            "display": "Maracha",
            "value": "50",
            "country_code": "UGA"
        },
        {
            "display": "Maradi",
            "value": "MA",
            "country_code": "NER"
        },
        {
            "display": "Maramureș",
            "value": "MM",
            "country_code": "ROU"
        },
        {
            "display": "Mardin",
            "value": "47",
            "country_code": "TUR"
        },
        {
            "display": "Margibi",
            "value": "MG",
            "country_code": "LBR"
        },
        {
            "display": "Marijampolės apskritis",
            "value": "MR",
            "country_code": "LTU"
        },
        {
            "display": "Marinduque",
            "value": "MQ",
            "country_code": "PHL"
        },
        {
            "display": "Maritime",
            "value": "MA",
            "country_code": "TGO"
        },
        {
            "display": "Mariy-El",
            "value": "ME",
            "country_code": "RUS"
        },
        {
            "display": "Markazī",
            "value": "00",
            "country_code": "IRN"
        },
        {
            "display": "Marlborough",
            "value": "MB",
            "country_code": "NZL"
        },
        {
            "display": "Marowijne",
            "value": "MA",
            "country_code": "SUR"
        },
        {
            "display": "Marrakech-Safi",
            "value": "MS",
            "country_code": "MAR"
        },
        {
            "display": "Marsabit",
            "value": "25",
            "country_code": "KEN"
        },
        {
            "display": "Marshall Islands",
            "value": "MI",
            "country_code": "MHL"
        },
        {
            "display": "Mary",
            "value": "MA",
            "country_code": "TKM"
        },
        {
            "display": "Maryland",
            "value": "MD",
            "country_code": "USA"
        },
        {
            "display": "Maryland",
            "value": "MY",
            "country_code": "LBR"
        },
        {
            "display": "Masaka",
            "value": "51",
            "country_code": "UGA"
        },
        {
            "display": "Masaya",
            "value": "MS",
            "country_code": "NIC"
        },
        {
            "display": "Masbate",
            "value": "MB",
            "country_code": "PHL"
        },
        {
            "display": "Maseru",
            "value": "MS",
            "country_code": "LSO"
        },
        {
            "display": "Mashonaland Central",
            "value": "MC",
            "country_code": "ZWE"
        },
        {
            "display": "Mashonaland East",
            "value": "ME",
            "country_code": "ZWE"
        },
        {
            "display": "Mashonaland West",
            "value": "MW",
            "country_code": "ZWE"
        },
        {
            "display": "Masindi",
            "value": "52",
            "country_code": "UGA"
        },
        {
            "display": "Masqaţ",
            "value": "MA",
            "country_code": "OMN"
        },
        {
            "display": "Massachusetts",
            "value": "MA",
            "country_code": "USA"
        },
        {
            "display": "Masvingo",
            "value": "MV",
            "country_code": "ZWE"
        },
        {
            "display": "Matabeleland North",
            "value": "MN",
            "country_code": "ZWE"
        },
        {
            "display": "Matabeleland South",
            "value": "MS",
            "country_code": "ZWE"
        },
        {
            "display": "Matagalpa",
            "value": "MT",
            "country_code": "NIC"
        },
        {
            "display": "Matam",
            "value": "MT",
            "country_code": "SEN"
        },
        {
            "display": "Matanzas",
            "value": "MA",
            "country_code": "CUB"
        },
        {
            "display": "Maule",
            "value": "ML",
            "country_code": "CHL"
        },
        {
            "display": "Mayabeque",
            "value": "MQ",
            "country_code": "CUB"
        },
        {
            "display": "Mayaro-Rio Claro",
            "value": "MR",
            "country_code": "TTO"
        },
        {
            "display": "Mayo-Kebbi Est",
            "value": "ME",
            "country_code": "TCD"
        },
        {
            "display": "Mayo-Kebbi Ouest",
            "value": "MO",
            "country_code": "TCD"
        },
        {
            "display": "Mayotte",
            "value": "YT",
            "country_code": "FRA"
        },
        {
            "display": "Maysān",
            "value": "MA",
            "country_code": "IRQ"
        },
        {
            "display": "Mayuge",
            "value": "53",
            "country_code": "UGA"
        },
        {
            "display": "Mazovia | Mazowieckie",
            "value": "MA",
            "country_code": "POL"
        },
        {
            "display": "Mačvanski okrug",
            "value": "MA",
            "country_code": "SRB"
        },
        {
            "display": "Maţrūḩ",
            "value": "MT",
            "country_code": "EGY"
        },
        {
            "display": "Ma’rib",
            "value": "MA",
            "country_code": "YEM"
        },
        {
            "display": "Mbale",
            "value": "54",
            "country_code": "UGA"
        },
        {
            "display": "Mbarara",
            "value": "55",
            "country_code": "UGA"
        },
        {
            "display": "Mbeya",
            "value": "MB",
            "country_code": "TZA"
        },
        {
            "display": "Mbomou",
            "value": "MB",
            "country_code": "CAF"
        },
        {
            "display": "Mchinji",
            "value": "MC",
            "country_code": "MWI"
        },
        {
            "display": "Mecklenburg-Vorpommern",
            "value": "MV",
            "country_code": "DEU"
        },
        {
            "display": "Meghalaya",
            "value": "ML",
            "country_code": "IND"
        },
        {
            "display": "Mehedinți",
            "value": "MH",
            "country_code": "ROU"
        },
        {
            "display": "Melaka",
            "value": "4",
            "country_code": "MYS"
        },
        {
            "display": "Melilla",
            "value": "ML",
            "country_code": "ESP"
        },
        {
            "display": "Mersch | Miersch",
            "value": "ME",
            "country_code": "LUX"
        },
        {
            "display": "Mersin",
            "value": "33",
            "country_code": "TUR"
        },
        {
            "display": "Merthyr Tydfil",
            "value": "MT",
            "country_code": "GBR"
        },
        {
            "display": "Meru",
            "value": "26",
            "country_code": "KEN"
        },
        {
            "display": "Meta",
            "value": "ME",
            "country_code": "COL"
        },
        {
            "display": "Metropolitan Manila",
            "value": "MM",
            "country_code": "PHL"
        },
        {
            "display": "Mexico City",
            "value": "DF",
            "country_code": "MEX"
        },
        {
            "display": "Međimurska županija",
            "value": "ME",
            "country_code": "HRV"
        },
        {
            "display": "Michigan",
            "value": "MI",
            "country_code": "USA"
        },
        {
            "display": "Michoacán",
            "value": "MI",
            "country_code": "MEX"
        },
        {
            "display": "Mid and East Antrim",
            "value": "ME",
            "country_code": "GBR"
        },
        {
            "display": "Mid-Ulster",
            "value": "MU",
            "country_code": "GBR"
        },
        {
            "display": "Midlands",
            "value": "MI",
            "country_code": "ZWE"
        },
        {
            "display": "Midlothian",
            "value": "ML",
            "country_code": "GBR"
        },
        {
            "display": "Midtjylland",
            "value": "82",
            "country_code": "DNK"
        },
        {
            "display": "Migori",
            "value": "27",
            "country_code": "KEN"
        },
        {
            "display": "Milne Bay",
            "value": "MBA",
            "country_code": "PNG"
        },
        {
            "display": "Mingəçevir",
            "value": "MI",
            "country_code": "AZE"
        },
        {
            "display": "Minnesota",
            "value": "MN",
            "country_code": "USA"
        },
        {
            "display": "Minskaya voblasts'",
            "value": "MI",
            "country_code": "BLR"
        },
        {
            "display": "Miranda",
            "value": "MX",
            "country_code": "VEN"
        },
        {
            "display": "Misamis Occidental",
            "value": "MD",
            "country_code": "PHL"
        },
        {
            "display": "Misamis Oriental",
            "value": "MN",
            "country_code": "PHL"
        },
        {
            "display": "Misratah",
            "value": "MS",
            "country_code": "LBY"
        },
        {
            "display": "Mississippi ",
            "value": "MS",
            "country_code": "USA"
        },
        {
            "display": "Missouri",
            "value": "MO",
            "country_code": "USA"
        },
        {
            "display": "Mitooma",
            "value": "102",
            "country_code": "UGA"
        },
        {
            "display": "Mityana",
            "value": "56",
            "country_code": "UGA"
        },
        {
            "display": "Mizoram",
            "value": "MZ",
            "country_code": "IND"
        },
        {
            "display": "Mohale's Hoek",
            "value": "MH",
            "country_code": "LSO"
        },
        {
            "display": "Mohéli",
            "value": "MO",
            "country_code": "COM"
        },
        {
            "display": "Mojkovac",
            "value": "MO",
            "country_code": "MNE"
        },
        {
            "display": "Moka",
            "value": "MO",
            "country_code": "MUS"
        },
        {
            "display": "Mokhotlong",
            "value": "MK",
            "country_code": "LSO"
        },
        {
            "display": "Mombasa",
            "value": "28",
            "country_code": "KEN"
        },
        {
            "display": "Mon",
            "value": "MO",
            "country_code": "MMR"
        },
        {
            "display": "Monaco-Ville",
            "value": "MO",
            "country_code": "MCO"
        },
        {
            "display": "Monagas",
            "value": "NX",
            "country_code": "VEN"
        },
        {
            "display": "Monastir",
            "value": "MS",
            "country_code": "TUN"
        },
        {
            "display": "Moneghetti",
            "value": "MG",
            "country_code": "MCO"
        },
        {
            "display": "Mongala",
            "value": "MO",
            "country_code": "COD"
        },
        {
            "display": "Mongar",
            "value": "MO",
            "country_code": "BTN"
        },
        {
            "display": "Monmouthshire",
            "value": "MO",
            "country_code": "GBR"
        },
        {
            "display": "Mono",
            "value": "MO",
            "country_code": "BEN"
        },
        {
            "display": "Mont Buxton",
            "value": "MB",
            "country_code": "SYC"
        },
        {
            "display": "Mont Fleuri",
            "value": "MF",
            "country_code": "SYC"
        },
        {
            "display": "Mont-Liban",
            "value": "JL",
            "country_code": "LBN"
        },
        {
            "display": "Montagnes",
            "value": "MN",
            "country_code": "CIV"
        },
        {
            "display": "Montana",
            "value": "MT",
            "country_code": "USA"
        },
        {
            "display": "Montana",
            "value": "MO",
            "country_code": "BGR"
        },
        {
            "display": "Monte-Carlo",
            "value": "MC",
            "country_code": "MCO"
        },
        {
            "display": "Montegiardino",
            "value": "MO",
            "country_code": "SMR"
        },
        {
            "display": "Montserrado",
            "value": "MO",
            "country_code": "LBR"
        },
        {
            "display": "Montserrat",
            "value": "MS",
            "country_code": "GBR"
        },
        {
            "display": "Mopti",
            "value": "MO",
            "country_code": "MLI"
        },
        {
            "display": "Moquegua | Muqiwa",
            "value": "MO",
            "country_code": "PER"
        },
        {
            "display": "Moravički okrug",
            "value": "MO",
            "country_code": "SRB"
        },
        {
            "display": "Moravskoslezský kraj",
            "value": "MO",
            "country_code": "CZE"
        },
        {
            "display": "Moray",
            "value": "MR",
            "country_code": "GBR"
        },
        {
            "display": "Morazán",
            "value": "MO",
            "country_code": "SLV"
        },
        {
            "display": "Mordovia",
            "value": "MR",
            "country_code": "RUS"
        },
        {
            "display": "Morelos",
            "value": "MO",
            "country_code": "MEX"
        },
        {
            "display": "Morobe",
            "value": "MPL",
            "country_code": "PNG"
        },
        {
            "display": "Morogoro",
            "value": "MO",
            "country_code": "TZA"
        },
        {
            "display": "Morona Santiago",
            "value": "SX",
            "country_code": "ECU"
        },
        {
            "display": "Moroto",
            "value": "57",
            "country_code": "UGA"
        },
        {
            "display": "Moscow City",
            "value": "MC",
            "country_code": "RUS"
        },
        {
            "display": "Moskva",
            "value": "MS",
            "country_code": "RUS"
        },
        {
            "display": "Mosteiros",
            "value": "MO",
            "country_code": "CPV"
        },
        {
            "display": "Moulins",
            "value": "MU",
            "country_code": "MCO"
        },
        {
            "display": "Mountain",
            "value": "MT",
            "country_code": "PHL"
        },
        {
            "display": "Moxico",
            "value": "MOX",
            "country_code": "AGO"
        },
        {
            "display": "Moyen-Chari",
            "value": "MC",
            "country_code": "TCD"
        },
        {
            "display": "Moyen-Ogooué",
            "value": "MO",
            "country_code": "GAB"
        },
        {
            "display": "Moyo",
            "value": "58",
            "country_code": "UGA"
        },
        {
            "display": "Mpigi",
            "value": "59",
            "country_code": "UGA"
        },
        {
            "display": "Mpumalanga",
            "value": "MP",
            "country_code": "ZAF"
        },
        {
            "display": "Mtskheta-Mtianeti",
            "value": "MM",
            "country_code": "GEO"
        },
        {
            "display": "Mtwara",
            "value": "MT",
            "country_code": "TZA"
        },
        {
            "display": "Mubende",
            "value": "60",
            "country_code": "UGA"
        },
        {
            "display": "Mubārak al Kabīr",
            "value": "MU",
            "country_code": "KWT"
        },
        {
            "display": "Muchinga",
            "value": "MU",
            "country_code": "ZMB"
        },
        {
            "display": "Mudug",
            "value": "MU",
            "country_code": "SOM"
        },
        {
            "display": "Mukdahan | มุกดาหาร",
            "value": "MDH",
            "country_code": "THA"
        },
        {
            "display": "Mukono",
            "value": "61",
            "country_code": "UGA"
        },
        {
            "display": "Mulanje",
            "value": "MU",
            "country_code": "MWI"
        },
        {
            "display": "Munster | An Mhumhain",
            "value": "MX",
            "country_code": "IRL"
        },
        {
            "display": "Muramvya",
            "value": "MU",
            "country_code": "BDI"
        },
        {
            "display": "Murang'a",
            "value": "29",
            "country_code": "KEN"
        },
        {
            "display": "Mureș",
            "value": "MS",
            "country_code": "ROU"
        },
        {
            "display": "Murmansk",
            "value": "MM",
            "country_code": "RUS"
        },
        {
            "display": "Murzuq",
            "value": "MU",
            "country_code": "LBY"
        },
        {
            "display": "Musandam",
            "value": "MU",
            "country_code": "OMN"
        },
        {
            "display": "Muyinga",
            "value": "MY",
            "country_code": "BDI"
        },
        {
            "display": "Muğla",
            "value": "48",
            "country_code": "TUR"
        },
        {
            "display": "Muş",
            "value": "49",
            "country_code": "TUR"
        },
        {
            "display": "Mwanza",
            "value": "MW",
            "country_code": "MWI"
        },
        {
            "display": "Mwanza",
            "value": "MZ",
            "country_code": "TZA"
        },
        {
            "display": "Mwaro",
            "value": "MW",
            "country_code": "BDI"
        },
        {
            "display": "Mykolaivska oblast",
            "value": "MY",
            "country_code": "UKR"
        },
        {
            "display": "Mymensingh",
            "value": "3N",
            "country_code": "BGD"
        },
        {
            "display": "Mzimba",
            "value": "MZ",
            "country_code": "MWI"
        },
        {
            "display": "Médenine",
            "value": "ME",
            "country_code": "TUN"
        },
        {
            "display": "Ménaka",
            "value": "ME",
            "country_code": "MLI"
        },
        {
            "display": "Mérida",
            "value": "LX",
            "country_code": "VEN"
        },
        {
            "display": "México",
            "value": "EM",
            "country_code": "MEX"
        },
        {
            "display": "Môndól Kiri",
            "value": "MK",
            "country_code": "KHM"
        },
        {
            "display": "Møre og Romsdal",
            "value": "MØ",
            "country_code": "NOR"
        },
        {
            "display": "Māzandarān",
            "value": "02",
            "country_code": "IRN"
        },
        {
            "display": "Nabatîyé",
            "value": "NA",
            "country_code": "LBN"
        },
        {
            "display": "Nabeul",
            "value": "NB",
            "country_code": "TUN"
        },
        {
            "display": "Nablus | Nāblus",
            "value": "NBS",
            "country_code": "PSE"
        },
        {
            "display": "Nadroga and Navosa",
            "value": "08",
            "country_code": "FJI"
        },
        {
            "display": "Naftalan",
            "value": "NA",
            "country_code": "AZE"
        },
        {
            "display": "Nagaland",
            "value": "NL",
            "country_code": "IND"
        },
        {
            "display": "Nairobi City",
            "value": "30",
            "country_code": "KEN"
        },
        {
            "display": "Naitasiri",
            "value": "09",
            "country_code": "FJI"
        },
        {
            "display": "Najin Sŏnbong-si",
            "value": "13",
            "country_code": "PRK"
        },
        {
            "display": "Najrān",
            "value": "10",
            "country_code": "SAU"
        },
        {
            "display": "Nakapiripirit",
            "value": "62",
            "country_code": "UGA"
        },
        {
            "display": "Nakaseke",
            "value": "63",
            "country_code": "UGA"
        },
        {
            "display": "Nakasongola",
            "value": "64",
            "country_code": "UGA"
        },
        {
            "display": "Nakhon Nayok | นครนายก",
            "value": "NYK",
            "country_code": "THA"
        },
        {
            "display": "Nakhon Pathom | นครปฐม",
            "value": "NPT",
            "country_code": "THA"
        },
        {
            "display": "Nakhon Phanom | นครพนม",
            "value": "NPM",
            "country_code": "THA"
        },
        {
            "display": "Nakhon Ratchasima | นครราชสีมา",
            "value": "NMA",
            "country_code": "THA"
        },
        {
            "display": "Nakhon Sawan | นครสวรรค์",
            "value": "NSN",
            "country_code": "THA"
        },
        {
            "display": "Nakhon Si Thammarat | นครศรีธรรมราช",
            "value": "NRT",
            "country_code": "THA"
        },
        {
            "display": "Nakuru",
            "value": "31",
            "country_code": "KEN"
        },
        {
            "display": "Nalut",
            "value": "NT",
            "country_code": "LBY"
        },
        {
            "display": "Nam Dinh",
            "value": "67",
            "country_code": "VNM"
        },
        {
            "display": "Namangan",
            "value": "NG",
            "country_code": "UZB"
        },
        {
            "display": "Namayingo",
            "value": "103",
            "country_code": "UGA"
        },
        {
            "display": "Namen",
            "value": "NN",
            "country_code": "BEL"
        },
        {
            "display": "Namibe",
            "value": "NAM",
            "country_code": "AGO"
        },
        {
            "display": "Namosi",
            "value": "10",
            "country_code": "FJI"
        },
        {
            "display": "Nampula",
            "value": "N",
            "country_code": "MOZ"
        },
        {
            "display": "Namutumba",
            "value": "14",
            "country_code": "UGA"
        },
        {
            "display": "Nan | น่าน",
            "value": "NAN",
            "country_code": "THA"
        },
        {
            "display": "Nana-Grébizi",
            "value": "KB",
            "country_code": "CAF"
        },
        {
            "display": "Nana-Mambéré",
            "value": "NM",
            "country_code": "CAF"
        },
        {
            "display": "Nandi",
            "value": "32",
            "country_code": "KEN"
        },
        {
            "display": "Nangarhār",
            "value": "NAN",
            "country_code": "AFG"
        },
        {
            "display": "Napak",
            "value": "104",
            "country_code": "UGA"
        },
        {
            "display": "Napo",
            "value": "NX",
            "country_code": "ECU"
        },
        {
            "display": "Narathiwat | นราธิวาส",
            "value": "NWT",
            "country_code": "THA"
        },
        {
            "display": "Nariño",
            "value": "NA",
            "country_code": "COL"
        },
        {
            "display": "Narok",
            "value": "33",
            "country_code": "KEN"
        },
        {
            "display": "Naryn",
            "value": "NA",
            "country_code": "KGZ"
        },
        {
            "display": "Nasarawa",
            "value": "NA",
            "country_code": "NGA"
        },
        {
            "display": "Nauru",
            "value": "NR",
            "country_code": "NRU"
        },
        {
            "display": "Navoi",
            "value": "NW",
            "country_code": "UZB"
        },
        {
            "display": "Naxçıvan",
            "value": "NV",
            "country_code": "AZE"
        },
        {
            "display": "Nayarit",
            "value": "NA",
            "country_code": "MEX"
        },
        {
            "display": "Naypyidaw",
            "value": "NY",
            "country_code": "MMR"
        },
        {
            "display": "Neamț",
            "value": "NT",
            "country_code": "ROU"
        },
        {
            "display": "Neath Port Talbot",
            "value": "NP",
            "country_code": "GBR"
        },
        {
            "display": "Nebbi",
            "value": "65",
            "country_code": "UGA"
        },
        {
            "display": "Nebraska",
            "value": "NE",
            "country_code": "USA"
        },
        {
            "display": "Negeri Sembilan",
            "value": "5",
            "country_code": "MYS"
        },
        {
            "display": "Negros Occidental",
            "value": "ND",
            "country_code": "PHL"
        },
        {
            "display": "Negros Oriental",
            "value": "NR",
            "country_code": "PHL"
        },
        {
            "display": "Nelson",
            "value": "NL",
            "country_code": "NZL"
        },
        {
            "display": "Nenets",
            "value": "NN",
            "country_code": "RUS"
        },
        {
            "display": "Neno",
            "value": "NE",
            "country_code": "MWI"
        },
        {
            "display": "Netherlands Antilles",
            "value": "AN",
            "country_code": "NLD"
        },
        {
            "display": "Neuchâtel",
            "value": "NE",
            "country_code": "CHE"
        },
        {
            "display": "Nevada",
            "value": "NV",
            "country_code": "USA"
        },
        {
            "display": "Nevis",
            "value": "NS",
            "country_code": "KNA"
        },
        {
            "display": "Nevşehir",
            "value": "50",
            "country_code": "TUR"
        },
        {
            "display": "New Brunswick",
            "value": "NB",
            "country_code": "CAN"
        },
        {
            "display": "New Caledonia",
            "value": "NC",
            "country_code": "AUS"
        },
        {
            "display": "New Hampshire",
            "value": "NH",
            "country_code": "USA"
        },
        {
            "display": "New Ireland",
            "value": "NIK",
            "country_code": "PNG"
        },
        {
            "display": "New Jersey",
            "value": "NJ",
            "country_code": "USA"
        },
        {
            "display": "New Mexico",
            "value": "NM",
            "country_code": "USA"
        },
        {
            "display": "New Plymouth",
            "value": "NP",
            "country_code": "NZL"
        },
        {
            "display": "New South Wales",
            "value": "NSW",
            "country_code": "AUS"
        },
        {
            "display": "New Taipei (Sin-Pak)",
            "value": "NT",
            "country_code": "TWN"
        },
        {
            "display": "New York",
            "value": "NY",
            "country_code": "USA"
        },
        {
            "display": "Newfoundland & Labrador",
            "value": "NL",
            "country_code": "CAN"
        },
        {
            "display": "Newport",
            "value": "NW",
            "country_code": "GBR"
        },
        {
            "display": "Newry, Mourne and Down",
            "value": "NM",
            "country_code": "GBR"
        },
        {
            "display": "Nghe An",
            "value": "22",
            "country_code": "VNM"
        },
        {
            "display": "Ngora",
            "value": "105",
            "country_code": "UGA"
        },
        {
            "display": "Ngounié",
            "value": "NG",
            "country_code": "GAB"
        },
        {
            "display": "Ngozi",
            "value": "NG",
            "country_code": "BDI"
        },
        {
            "display": "Niamey",
            "value": "NI",
            "country_code": "NER"
        },
        {
            "display": "Niari",
            "value": "9",
            "country_code": "COG"
        },
        {
            "display": "Niassa",
            "value": "A",
            "country_code": "MOZ"
        },
        {
            "display": "Nickerie",
            "value": "NI",
            "country_code": "SUR"
        },
        {
            "display": "Nicosia | Λευκωσία",
            "value": "NA",
            "country_code": "CYP"
        },
        {
            "display": "Nidwalden",
            "value": "NW",
            "country_code": "CHE"
        },
        {
            "display": "Niedersachsen",
            "value": "NI",
            "country_code": "DEU"
        },
        {
            "display": "Niederösterreich",
            "value": "NI",
            "country_code": "AUT"
        },
        {
            "display": "Niger",
            "value": "NI",
            "country_code": "NGA"
        },
        {
            "display": "Nikšić",
            "value": "NI",
            "country_code": "MNE"
        },
        {
            "display": "Nimba",
            "value": "NI",
            "country_code": "LBR"
        },
        {
            "display": "Ningxia Hui Autonomous Region | 宁夏回族自治区",
            "value": "NX",
            "country_code": "CHN"
        },
        {
            "display": "Ninh Binh",
            "value": "18",
            "country_code": "VNM"
        },
        {
            "display": "Ninh Thuan",
            "value": "36",
            "country_code": "VNM"
        },
        {
            "display": "Nippes | Nip",
            "value": "NI",
            "country_code": "HTI"
        },
        {
            "display": "Nitra",
            "value": "NI",
            "country_code": "SVK"
        },
        {
            "display": "Niuas",
            "value": "03",
            "country_code": "TON"
        },
        {
            "display": "Nizhegorod",
            "value": "NZ",
            "country_code": "RUS"
        },
        {
            "display": "Niğde",
            "value": "51",
            "country_code": "TUR"
        },
        {
            "display": "Nišavski okrug",
            "value": "NI",
            "country_code": "SRB"
        },
        {
            "display": "Njombe",
            "value": "NJ",
            "country_code": "TZA"
        },
        {
            "display": "Nkhata Bay",
            "value": "NB",
            "country_code": "MWI"
        },
        {
            "display": "Nkhotakota",
            "value": "NK",
            "country_code": "MWI"
        },
        {
            "display": "Noakhali",
            "value": "2O",
            "country_code": "BGD"
        },
        {
            "display": "Nong Bua Lamphu | หนองบัวลำภู",
            "value": "NBP",
            "country_code": "THA"
        },
        {
            "display": "Nong Khai | หนองคาย",
            "value": "NKI",
            "country_code": "THA"
        },
        {
            "display": "Nonthaburi | นนทบุรี",
            "value": "NBI",
            "country_code": "THA"
        },
        {
            "display": "Noord-Brabant",
            "value": "NB",
            "country_code": "NLD"
        },
        {
            "display": "Noord-Holland",
            "value": "NH",
            "country_code": "NLD"
        },
        {
            "display": "Nord",
            "value": "NO",
            "country_code": "BFA"
        },
        {
            "display": "Nord",
            "value": "NO",
            "country_code": "CMR"
        },
        {
            "display": "Nord | Nò",
            "value": "ND",
            "country_code": "HTI"
        },
        {
            "display": "Nord-Est | Nòdès",
            "value": "NE",
            "country_code": "HTI"
        },
        {
            "display": "Nord-Kivu",
            "value": "NK",
            "country_code": "COD"
        },
        {
            "display": "Nord-Ouest",
            "value": "NW",
            "country_code": "CMR"
        },
        {
            "display": "Nord-Ouest | Nòdwès",
            "value": "NO",
            "country_code": "HTI"
        },
        {
            "display": "Nord-Ubangi",
            "value": "NU",
            "country_code": "COD"
        },
        {
            "display": "Nordjylland",
            "value": "81",
            "country_code": "DNK"
        },
        {
            "display": "Nordland",
            "value": "NO",
            "country_code": "NOR"
        },
        {
            "display": "Nordrhein-Westfalen",
            "value": "NW",
            "country_code": "DEU"
        },
        {
            "display": "Norfolk",
            "value": "NF",
            "country_code": "GBR"
        },
        {
            "display": "Norfolk Island",
            "value": "NF",
            "country_code": "AUS"
        },
        {
            "display": "Normandie",
            "value": "NO",
            "country_code": "FRA"
        },
        {
            "display": "Norrbottens län",
            "value": "BD",
            "country_code": "SWE"
        },
        {
            "display": "Norte de Santander",
            "value": "NS",
            "country_code": "COL"
        },
        {
            "display": "North",
            "value": "NR",
            "country_code": "MDV"
        },
        {
            "display": "North Aegean",
            "value": "NA",
            "country_code": "GRC"
        },
        {
            "display": "North Ayrshire",
            "value": "NA",
            "country_code": "GBR"
        },
        {
            "display": "North Bahr-al-Ghazal",
            "value": "NB",
            "country_code": "SSD"
        },
        {
            "display": "North Bank",
            "value": "NB",
            "country_code": "GMB"
        },
        {
            "display": "North Carolina",
            "value": "NC",
            "country_code": "USA"
        },
        {
            "display": "North Central",
            "value": "NC",
            "country_code": "MDV"
        },
        {
            "display": "North Central",
            "value": "7",
            "country_code": "LKA"
        },
        {
            "display": "North Chungcheong",
            "value": "43",
            "country_code": "KOR"
        },
        {
            "display": "North Dakota",
            "value": "ND",
            "country_code": "USA"
        },
        {
            "display": "North Darfur",
            "value": "ND",
            "country_code": "SDN"
        },
        {
            "display": "North East",
            "value": "NE",
            "country_code": "SGP"
        },
        {
            "display": "North East",
            "value": "NE",
            "country_code": "BWA"
        },
        {
            "display": "North Gaza | Shamāl Ghazzah",
            "value": "NGZ",
            "country_code": "PSE"
        },
        {
            "display": "North Gyeongsang",
            "value": "47",
            "country_code": "KOR"
        },
        {
            "display": "North Jeolla",
            "value": "45",
            "country_code": "KOR"
        },
        {
            "display": "North Kazakhstan",
            "value": "NK",
            "country_code": "KAZ"
        },
        {
            "display": "North Kordofan",
            "value": "NK",
            "country_code": "SDN"
        },
        {
            "display": "North Lanarkshire",
            "value": "NL",
            "country_code": "GBR"
        },
        {
            "display": "North Ossetia",
            "value": "NO",
            "country_code": "RUS"
        },
        {
            "display": "North West",
            "value": "NW",
            "country_code": "SGP"
        },
        {
            "display": "North West",
            "value": "NW",
            "country_code": "BWA"
        },
        {
            "display": "North Western",
            "value": "6",
            "country_code": "LKA"
        },
        {
            "display": "North Yorkshire",
            "value": "NY",
            "country_code": "GBR"
        },
        {
            "display": "North-West",
            "value": "NW",
            "country_code": "ZAF"
        },
        {
            "display": "North-Western",
            "value": "NW",
            "country_code": "ZMB"
        },
        {
            "display": "Northamptonshire",
            "value": "NH",
            "country_code": "GBR"
        },
        {
            "display": "Northern",
            "value": "NPP",
            "country_code": "PNG"
        },
        {
            "display": "Northern",
            "value": "4",
            "country_code": "LKA"
        },
        {
            "display": "Northern",
            "value": "NP",
            "country_code": "GHA"
        },
        {
            "display": "Northern",
            "value": "NO",
            "country_code": "RWA"
        },
        {
            "display": "Northern",
            "value": "NO",
            "country_code": "SLE"
        },
        {
            "display": "Northern",
            "value": "NO",
            "country_code": "SDN"
        },
        {
            "display": "Northern",
            "value": "NR",
            "country_code": "ZMB"
        },
        {
            "display": "Northern Cape",
            "value": "NC",
            "country_code": "ZAF"
        },
        {
            "display": "Northern Mariana Islands",
            "value": "MP",
            "country_code": "AUS"
        },
        {
            "display": "Northern Samar",
            "value": "NS",
            "country_code": "PHL"
        },
        {
            "display": "Northern Territory",
            "value": "NT",
            "country_code": "AUS"
        },
        {
            "display": "Northland | Te Tai Tokerau",
            "value": "NTL",
            "country_code": "NZL"
        },
        {
            "display": "Northwest Territories",
            "value": "NT",
            "country_code": "CAN"
        },
        {
            "display": "Norðurland eystra",
            "value": "NR",
            "country_code": "ISL"
        },
        {
            "display": "Norðurland vestra",
            "value": "NO",
            "country_code": "ISL"
        },
        {
            "display": "Notranjsko-kraška",
            "value": "NO",
            "country_code": "SVN"
        },
        {
            "display": "Nottinghamshire",
            "value": "NT",
            "country_code": "GBR"
        },
        {
            "display": "Nouakchott Nord",
            "value": "NN",
            "country_code": "MRT"
        },
        {
            "display": "Nouakchott Ouest",
            "value": "NW",
            "country_code": "MRT"
        },
        {
            "display": "Nouakchott Sud",
            "value": "NS",
            "country_code": "MRT"
        },
        {
            "display": "Nouvelle-Aquitaine",
            "value": "NA",
            "country_code": "FRA"
        },
        {
            "display": "Nova Scotia",
            "value": "NS",
            "country_code": "CAN"
        },
        {
            "display": "Novgorod",
            "value": "NG",
            "country_code": "RUS"
        },
        {
            "display": "Novosibirsk",
            "value": "NS",
            "country_code": "RUS"
        },
        {
            "display": "Nsanje",
            "value": "NS",
            "country_code": "MWI"
        },
        {
            "display": "Ntcheu",
            "value": "NU",
            "country_code": "MWI"
        },
        {
            "display": "Ntchisi",
            "value": "NI",
            "country_code": "MWI"
        },
        {
            "display": "Ntoroko",
            "value": "106",
            "country_code": "UGA"
        },
        {
            "display": "Ntungamo",
            "value": "66",
            "country_code": "UGA"
        },
        {
            "display": "Nueva Ecija",
            "value": "NE",
            "country_code": "PHL"
        },
        {
            "display": "Nueva Esparta",
            "value": "OX",
            "country_code": "VEN"
        },
        {
            "display": "Nueva Segovia",
            "value": "NS",
            "country_code": "NIC"
        },
        {
            "display": "Nueva Vizcaya",
            "value": "NV",
            "country_code": "PHL"
        },
        {
            "display": "Nuevo León",
            "value": "NL",
            "country_code": "MEX"
        },
        {
            "display": "Nugaal",
            "value": "NU",
            "country_code": "SOM"
        },
        {
            "display": "Nunavut",
            "value": "NU",
            "country_code": "CAN"
        },
        {
            "display": "Nusa Tenggara Barat",
            "value": "NB",
            "country_code": "IDN"
        },
        {
            "display": "Nusa Tenggara Timur",
            "value": "NT",
            "country_code": "IDN"
        },
        {
            "display": "Nwoya",
            "value": "107",
            "country_code": "UGA"
        },
        {
            "display": "Nyamira",
            "value": "34",
            "country_code": "KEN"
        },
        {
            "display": "Nyandarua",
            "value": "35",
            "country_code": "KEN"
        },
        {
            "display": "Nyanga",
            "value": "NY",
            "country_code": "GAB"
        },
        {
            "display": "Nyeri",
            "value": "36",
            "country_code": "KEN"
        },
        {
            "display": "Nzérékoré",
            "value": "N",
            "country_code": "GIN"
        },
        {
            "display": "Nógrád",
            "value": "NG",
            "country_code": "HUN"
        },
        {
            "display": "Nīmrōz",
            "value": "NIM",
            "country_code": "AFG"
        },
        {
            "display": "Nīnawá",
            "value": "NI",
            "country_code": "IRQ"
        },
        {
            "display": "Nūristān",
            "value": "NUR",
            "country_code": "AFG"
        },
        {
            "display": "Oaxaca",
            "value": "OA",
            "country_code": "MEX"
        },
        {
            "display": "Obalno-kraška",
            "value": "JP",
            "country_code": "SVN"
        },
        {
            "display": "Oberösterreich",
            "value": "OB",
            "country_code": "AUT"
        },
        {
            "display": "Obock",
            "value": "OB",
            "country_code": "DJI"
        },
        {
            "display": "Obwalden",
            "value": "OW",
            "country_code": "CHE"
        },
        {
            "display": "Occidental Mindoro",
            "value": "MC",
            "country_code": "PHL"
        },
        {
            "display": "Occitanie",
            "value": "OC",
            "country_code": "FRA"
        },
        {
            "display": "Ocotepeque",
            "value": "OC",
            "country_code": "HND"
        },
        {
            "display": "Odeska oblast",
            "value": "OD",
            "country_code": "UKR"
        },
        {
            "display": "Odisha",
            "value": "OR",
            "country_code": "IND"
        },
        {
            "display": "Ogooué-Ivindo",
            "value": "OI",
            "country_code": "GAB"
        },
        {
            "display": "Ogooué-Lolo",
            "value": "OL",
            "country_code": "GAB"
        },
        {
            "display": "Ogooué-Maritime",
            "value": "OM",
            "country_code": "GAB"
        },
        {
            "display": "Ogun",
            "value": "OG",
            "country_code": "NGA"
        },
        {
            "display": "Ohangwena",
            "value": "OW",
            "country_code": "NAM"
        },
        {
            "display": "Ohio",
            "value": "OH",
            "country_code": "USA"
        },
        {
            "display": "Oio",
            "value": "OI",
            "country_code": "GNB"
        },
        {
            "display": "Oklahoma",
            "value": "OK",
            "country_code": "USA"
        },
        {
            "display": "Olancho",
            "value": "OL",
            "country_code": "HND"
        },
        {
            "display": "Olomoucký kraj",
            "value": "OL",
            "country_code": "CZE"
        },
        {
            "display": "Olt",
            "value": "OT",
            "country_code": "ROU"
        },
        {
            "display": "Omaheke",
            "value": "OH",
            "country_code": "NAM"
        },
        {
            "display": "Ombella-M'Poko",
            "value": "MP",
            "country_code": "CAF"
        },
        {
            "display": "Omsk",
            "value": "OM",
            "country_code": "RUS"
        },
        {
            "display": "Omusati",
            "value": "OS",
            "country_code": "NAM"
        },
        {
            "display": "Ondo",
            "value": "ON",
            "country_code": "NGA"
        },
        {
            "display": "Ontario",
            "value": "ON",
            "country_code": "CAN"
        },
        {
            "display": "Opole (Upper Silesia) | Opolskie",
            "value": "OP",
            "country_code": "POL"
        },
        {
            "display": "Orange Walk",
            "value": "OW",
            "country_code": "BLZ"
        },
        {
            "display": "Ordino",
            "value": "OR",
            "country_code": "AND"
        },
        {
            "display": "Ordu",
            "value": "52",
            "country_code": "TUR"
        },
        {
            "display": "Oregon",
            "value": "OR",
            "country_code": "USA"
        },
        {
            "display": "Orel",
            "value": "OL",
            "country_code": "RUS"
        },
        {
            "display": "Orellana",
            "value": "DX",
            "country_code": "ECU"
        },
        {
            "display": "Orenburg",
            "value": "OB",
            "country_code": "RUS"
        },
        {
            "display": "Orhon",
            "value": "ER",
            "country_code": "MNG"
        },
        {
            "display": "Oriental Mindoro",
            "value": "MR",
            "country_code": "PHL"
        },
        {
            "display": "Orkney Islands",
            "value": "OR",
            "country_code": "GBR"
        },
        {
            "display": "Oromīya",
            "value": "OR",
            "country_code": "ETH"
        },
        {
            "display": "Oruro",
            "value": "O",
            "country_code": "BOL"
        },
        {
            "display": "Osh",
            "value": "OH",
            "country_code": "KGZ"
        },
        {
            "display": "Osh [City]",
            "value": "OC",
            "country_code": "KGZ"
        },
        {
            "display": "Oshana",
            "value": "ON",
            "country_code": "NAM"
        },
        {
            "display": "Oshikoto",
            "value": "OT",
            "country_code": "NAM"
        },
        {
            "display": "Osječko-baranjska županija",
            "value": "OS",
            "country_code": "HRV"
        },
        {
            "display": "Oslo",
            "value": "OS",
            "country_code": "NOR"
        },
        {
            "display": "Osmaniye",
            "value": "80",
            "country_code": "TUR"
        },
        {
            "display": "Osrednjeslovenska",
            "value": "LJ",
            "country_code": "SVN"
        },
        {
            "display": "Osun",
            "value": "OS",
            "country_code": "NGA"
        },
        {
            "display": "Otago",
            "value": "OO",
            "country_code": "NZL"
        },
        {
            "display": "Otjozondjupa",
            "value": "OD",
            "country_code": "NAM"
        },
        {
            "display": "Otuke",
            "value": "108",
            "country_code": "UGA"
        },
        {
            "display": "Ouaddaï",
            "value": "OD",
            "country_code": "TCD"
        },
        {
            "display": "Ouaka",
            "value": "UK",
            "country_code": "CAF"
        },
        {
            "display": "Oudômxai",
            "value": "OU",
            "country_code": "LAO"
        },
        {
            "display": "Ouest",
            "value": "OU",
            "country_code": "CMR"
        },
        {
            "display": "Ouest | Lwès",
            "value": "OU",
            "country_code": "HTI"
        },
        {
            "display": "Ouham",
            "value": "AC",
            "country_code": "CAF"
        },
        {
            "display": "Ouham-Pendé",
            "value": "OP",
            "country_code": "CAF"
        },
        {
            "display": "Outer Islands",
            "value": "OI",
            "country_code": "SYC"
        },
        {
            "display": "Ouémé",
            "value": "OU",
            "country_code": "BEN"
        },
        {
            "display": "Overijssel",
            "value": "OV",
            "country_code": "NLD"
        },
        {
            "display": "Oxfordshire",
            "value": "OX",
            "country_code": "GBR"
        },
        {
            "display": "Oyam",
            "value": "67",
            "country_code": "UGA"
        },
        {
            "display": "Oyo",
            "value": "OY",
            "country_code": "NGA"
        },
        {
            "display": "Ozama",
            "value": "OZ",
            "country_code": "DOM"
        },
        {
            "display": "P'yŏngan-bukto",
            "value": "3",
            "country_code": "PRK"
        },
        {
            "display": "P'yŏngan-namdo",
            "value": "2",
            "country_code": "PRK"
        },
        {
            "display": "P'yŏngyang-si",
            "value": "1",
            "country_code": "PRK"
        },
        {
            "display": "Pabna",
            "value": "5P",
            "country_code": "BGD"
        },
        {
            "display": "Pader",
            "value": "68",
            "country_code": "UGA"
        },
        {
            "display": "Pahang",
            "value": "6",
            "country_code": "MYS"
        },
        {
            "display": "Paktiyā",
            "value": "PIA",
            "country_code": "AFG"
        },
        {
            "display": "Paktīkā",
            "value": "PKA",
            "country_code": "AFG"
        },
        {
            "display": "Palau",
            "value": "PU",
            "country_code": "PLW"
        },
        {
            "display": "Palauli",
            "value": "PA",
            "country_code": "WSM"
        },
        {
            "display": "Palawan",
            "value": "PL",
            "country_code": "PHL"
        },
        {
            "display": "Pallisa",
            "value": "69",
            "country_code": "UGA"
        },
        {
            "display": "Pampanga",
            "value": "PM",
            "country_code": "PHL"
        },
        {
            "display": "Pamplemousses",
            "value": "PA",
            "country_code": "MUS"
        },
        {
            "display": "Panamá",
            "value": "PM",
            "country_code": "PAN"
        },
        {
            "display": "Panamá Oeste",
            "value": "PO",
            "country_code": "PAN"
        },
        {
            "display": "Pando",
            "value": "N",
            "country_code": "BOL"
        },
        {
            "display": "Panevėžio apskritis",
            "value": "PN",
            "country_code": "LTU"
        },
        {
            "display": "Pangasinan",
            "value": "PN",
            "country_code": "PHL"
        },
        {
            "display": "Panjshayr",
            "value": "PAN",
            "country_code": "AFG"
        },
        {
            "display": "Paphos | Πάφος",
            "value": "PS",
            "country_code": "CYP"
        },
        {
            "display": "Papua",
            "value": "PA",
            "country_code": "IDN"
        },
        {
            "display": "Papua Barat",
            "value": "IB",
            "country_code": "IDN"
        },
        {
            "display": "Para",
            "value": "PR",
            "country_code": "SUR"
        },
        {
            "display": "Paramaribo",
            "value": "PM",
            "country_code": "SUR"
        },
        {
            "display": "Pardubický kraj",
            "value": "PA",
            "country_code": "CZE"
        },
        {
            "display": "Paro",
            "value": "PR",
            "country_code": "BTN"
        },
        {
            "display": "Parwān",
            "value": "PAR",
            "country_code": "AFG"
        },
        {
            "display": "Pasco | Pasqu",
            "value": "PA",
            "country_code": "PER"
        },
        {
            "display": "Pastaza",
            "value": "YX",
            "country_code": "ECU"
        },
        {
            "display": "Pathum Thani | ปทุมธานี",
            "value": "PTE",
            "country_code": "THA"
        },
        {
            "display": "Pattani | ปัตตานี",
            "value": "PTN",
            "country_code": "THA"
        },
        {
            "display": "Patuakhali",
            "value": "1Q",
            "country_code": "BGD"
        },
        {
            "display": "Paul",
            "value": "PA",
            "country_code": "CPV"
        },
        {
            "display": "Pavlodar",
            "value": "PA",
            "country_code": "KAZ"
        },
        {
            "display": "Pays-de-la-Loire",
            "value": "PD",
            "country_code": "FRA"
        },
        {
            "display": "Pazardzhik",
            "value": "PA",
            "country_code": "BGR"
        },
        {
            "display": "Peloponnese",
            "value": "PE",
            "country_code": "GRC"
        },
        {
            "display": "Pemagatsel",
            "value": "PM",
            "country_code": "BTN"
        },
        {
            "display": "Pemba North",
            "value": "PN",
            "country_code": "TZA"
        },
        {
            "display": "Pemba South",
            "value": "PS",
            "country_code": "TZA"
        },
        {
            "display": "Pembrokeshire",
            "value": "PE",
            "country_code": "GBR"
        },
        {
            "display": "Penal-Debe",
            "value": "PE",
            "country_code": "TTO"
        },
        {
            "display": "Pennsylvania",
            "value": "PA",
            "country_code": "USA"
        },
        {
            "display": "Penza",
            "value": "PZ",
            "country_code": "RUS"
        },
        {
            "display": "Perak",
            "value": "8",
            "country_code": "MYS"
        },
        {
            "display": "Perlis",
            "value": "9",
            "country_code": "MYS"
        },
        {
            "display": "Perm'",
            "value": "PE",
            "country_code": "RUS"
        },
        {
            "display": "Pernik",
            "value": "PE",
            "country_code": "BGR"
        },
        {
            "display": "Perth and Kinross",
            "value": "PK",
            "country_code": "GBR"
        },
        {
            "display": "Pest",
            "value": "PT",
            "country_code": "HUN"
        },
        {
            "display": "Petnjica",
            "value": "PE",
            "country_code": "MNE"
        },
        {
            "display": "Petén",
            "value": "PE",
            "country_code": "GTM"
        },
        {
            "display": "Pećki okrug",
            "value": "PE",
            "country_code": "SRB"
        },
        {
            "display": "Phalombe",
            "value": "PH",
            "country_code": "MWI"
        },
        {
            "display": "Phang Nga | พังงา",
            "value": "PNA",
            "country_code": "THA"
        },
        {
            "display": "Phatthalung | พัทลุง",
            "value": "PLG",
            "country_code": "THA"
        },
        {
            "display": "Phayao | พะเยา",
            "value": "PYO",
            "country_code": "THA"
        },
        {
            "display": "Phetchabun | เพชรบูรณ์",
            "value": "PNB",
            "country_code": "THA"
        },
        {
            "display": "Phetchaburi | เพชรบุรี",
            "value": "PBI",
            "country_code": "THA"
        },
        {
            "display": "Phichit | พิจิตร",
            "value": "PCT",
            "country_code": "THA"
        },
        {
            "display": "Phitsanulok | พิษณุโลก",
            "value": "PLK",
            "country_code": "THA"
        },
        {
            "display": "Phnom Penh",
            "value": "PP",
            "country_code": "KHM"
        },
        {
            "display": "Phoenix Islands",
            "value": "PI",
            "country_code": "KIR"
        },
        {
            "display": "Phra Nakhon Si Ayutthaya | พระนครศรีอยุธยา",
            "value": "AYA",
            "country_code": "THA"
        },
        {
            "display": "Phrae | แพร่",
            "value": "PRE",
            "country_code": "THA"
        },
        {
            "display": "Phu Tho",
            "value": "68",
            "country_code": "VNM"
        },
        {
            "display": "Phu Yen",
            "value": "32",
            "country_code": "VNM"
        },
        {
            "display": "Phuket | ภูเก็ต",
            "value": "PKT",
            "country_code": "THA"
        },
        {
            "display": "Phôngsali",
            "value": "PH",
            "country_code": "LAO"
        },
        {
            "display": "Pichincha",
            "value": "PX",
            "country_code": "ECU"
        },
        {
            "display": "Pinar del Río",
            "value": "PD",
            "country_code": "CUB"
        },
        {
            "display": "Pirkanmaa | Birkaland",
            "value": "PI",
            "country_code": "FIN"
        },
        {
            "display": "Pirotski okrug",
            "value": "PI",
            "country_code": "SRB"
        },
        {
            "display": "Pitcairn, Henderson, Ducie and Oeno Islands",
            "value": "PN",
            "country_code": "AUS"
        },
        {
            "display": "Piura | Piwra",
            "value": "PI",
            "country_code": "PER"
        },
        {
            "display": "Plaines Wilhems",
            "value": "PW",
            "country_code": "MUS"
        },
        {
            "display": "Plaisance",
            "value": "PL",
            "country_code": "SYC"
        },
        {
            "display": "Plateau",
            "value": "PL",
            "country_code": "BEN"
        },
        {
            "display": "Plateau",
            "value": "PL",
            "country_code": "NGA"
        },
        {
            "display": "Plateau Central",
            "value": "PC",
            "country_code": "BFA"
        },
        {
            "display": "Plateaux",
            "value": "14",
            "country_code": "COG"
        },
        {
            "display": "Plateaux",
            "value": "PL",
            "country_code": "TGO"
        },
        {
            "display": "Plav",
            "value": "PL",
            "country_code": "MNE"
        },
        {
            "display": "Pleven",
            "value": "PL",
            "country_code": "BGR"
        },
        {
            "display": "Pljevlja",
            "value": "PJ",
            "country_code": "MNE"
        },
        {
            "display": "Plovdiv",
            "value": "PV",
            "country_code": "BGR"
        },
        {
            "display": "Plužine",
            "value": "PZ",
            "country_code": "MNE"
        },
        {
            "display": "Plzeňský kraj",
            "value": "PL",
            "country_code": "CZE"
        },
        {
            "display": "Podgorica",
            "value": "PO",
            "country_code": "MNE"
        },
        {
            "display": "Podlaskie | Podlaskie",
            "value": "PO",
            "country_code": "POL"
        },
        {
            "display": "Podravska",
            "value": "PD",
            "country_code": "SVN"
        },
        {
            "display": "Podunavski okrug",
            "value": "PO",
            "country_code": "SRB"
        },
        {
            "display": "Pohjanmaa | Österbotten",
            "value": "PO",
            "country_code": "FIN"
        },
        {
            "display": "Pohjois-Karjala | Norra Karelen",
            "value": "PH",
            "country_code": "FIN"
        },
        {
            "display": "Pohjois-Pohjanmaa | Norra Österbotten",
            "value": "PP",
            "country_code": "FIN"
        },
        {
            "display": "Pohjois-Savo | Norra Savolax",
            "value": "PS",
            "country_code": "FIN"
        },
        {
            "display": "Pohnpei",
            "value": "PNI",
            "country_code": "FSM"
        },
        {
            "display": "Pointe La Rue",
            "value": "PR",
            "country_code": "SYC"
        },
        {
            "display": "Poltavska oblast",
            "value": "PO",
            "country_code": "UKR"
        },
        {
            "display": "Pomerania | Pomorskie",
            "value": "PM",
            "country_code": "POL"
        },
        {
            "display": "Pomeroon-Supenaam",
            "value": "PM",
            "country_code": "GUY"
        },
        {
            "display": "Pomoravski okrug",
            "value": "PM",
            "country_code": "SRB"
        },
        {
            "display": "Pomurska",
            "value": "PM",
            "country_code": "SVN"
        },
        {
            "display": "Pool",
            "value": "12",
            "country_code": "COG"
        },
        {
            "display": "Port Glaud",
            "value": "PG",
            "country_code": "SYC"
        },
        {
            "display": "Port Louis",
            "value": "PL",
            "country_code": "MUS"
        },
        {
            "display": "Port-Hercule",
            "value": "PH",
            "country_code": "MCO"
        },
        {
            "display": "Portalegre",
            "value": "PO",
            "country_code": "PRT"
        },
        {
            "display": "Portland",
            "value": "PL",
            "country_code": "JAM"
        },
        {
            "display": "Porto",
            "value": "PT",
            "country_code": "PRT"
        },
        {
            "display": "Porto Novo",
            "value": "PN",
            "country_code": "CPV"
        },
        {
            "display": "Portuguesa",
            "value": "PX",
            "country_code": "VEN"
        },
        {
            "display": "Potaro-Siparuni",
            "value": "PT",
            "country_code": "GUY"
        },
        {
            "display": "Potosí",
            "value": "P",
            "country_code": "BOL"
        },
        {
            "display": "Powys",
            "value": "PO",
            "country_code": "GBR"
        },
        {
            "display": "Poŭthĭsăt",
            "value": "PO",
            "country_code": "KHM"
        },
        {
            "display": "Požeško-slavonska županija",
            "value": "PO",
            "country_code": "HRV"
        },
        {
            "display": "Prachinburi | ปราจีนบุรี",
            "value": "PRI",
            "country_code": "THA"
        },
        {
            "display": "Prachuap Khiri Khan | ประจวบคีรีขันธ์",
            "value": "PKN",
            "country_code": "THA"
        },
        {
            "display": "Pradesh 1",
            "value": "P1",
            "country_code": "NPL"
        },
        {
            "display": "Pradesh 1",
            "value": "P2",
            "country_code": "NPL"
        },
        {
            "display": "Prahova",
            "value": "PH",
            "country_code": "ROU"
        },
        {
            "display": "Praia",
            "value": "PC",
            "country_code": "CPV"
        },
        {
            "display": "Presov",
            "value": "PV",
            "country_code": "SVK"
        },
        {
            "display": "Prey Vêng",
            "value": "PY",
            "country_code": "KHM"
        },
        {
            "display": "Preăh Vihéar",
            "value": "PH",
            "country_code": "KHM"
        },
        {
            "display": "Primor'ye",
            "value": "PR",
            "country_code": "RUS"
        },
        {
            "display": "Primorsko-goranska županija",
            "value": "PR",
            "country_code": "HRV"
        },
        {
            "display": "Prince Edward Island",
            "value": "PE",
            "country_code": "CAN"
        },
        {
            "display": "Princes Town",
            "value": "PR",
            "country_code": "TTO"
        },
        {
            "display": "Prizrenski okrug",
            "value": "PR",
            "country_code": "SRB"
        },
        {
            "display": "Provence-Alpes-Côte-d’Azur",
            "value": "PA",
            "country_code": "FRA"
        },
        {
            "display": "Príncipe",
            "value": "ST",
            "country_code": "STP"
        },
        {
            "display": "Pskov",
            "value": "PS",
            "country_code": "RUS"
        },
        {
            "display": "Puducherry",
            "value": "PY",
            "country_code": "IND"
        },
        {
            "display": "Puebla",
            "value": "PU",
            "country_code": "MEX"
        },
        {
            "display": "Pulau Pinang",
            "value": "7",
            "country_code": "MYS"
        },
        {
            "display": "Punakha",
            "value": "PN",
            "country_code": "BTN"
        },
        {
            "display": "Punjab",
            "value": "PB",
            "country_code": "IND"
        },
        {
            "display": "Punjab | پنجاب",
            "value": "PB",
            "country_code": "PAK"
        },
        {
            "display": "Puno | Punu",
            "value": "PU",
            "country_code": "PER"
        },
        {
            "display": "Puntarenas",
            "value": "PX",
            "country_code": "CRI"
        },
        {
            "display": "Putrajaya",
            "value": "16",
            "country_code": "MYS"
        },
        {
            "display": "Putumayo",
            "value": "PU",
            "country_code": "COL"
        },
        {
            "display": "Pwani",
            "value": "PW",
            "country_code": "TZA"
        },
        {
            "display": "Päijät-Häme | Päijänne-Tavastland",
            "value": "PÄ",
            "country_code": "FIN"
        },
        {
            "display": "Pärnumaa",
            "value": "PÄ",
            "country_code": "EST"
        },
        {
            "display": "Põlvamaa",
            "value": "PÕ",
            "country_code": "EST"
        },
        {
            "display": "Pčinjski okrug",
            "value": "PČ",
            "country_code": "SRB"
        },
        {
            "display": "Qacha's Nek",
            "value": "QN",
            "country_code": "LSO"
        },
        {
            "display": "Qalqilya | Qalqīlyah",
            "value": "QQA",
            "country_code": "PSE"
        },
        {
            "display": "Qaraghandy",
            "value": "QG",
            "country_code": "KAZ"
        },
        {
            "display": "Qazvīn",
            "value": "26",
            "country_code": "IRN"
        },
        {
            "display": "Qeqertalik",
            "value": "QT",
            "country_code": "GRL"
        },
        {
            "display": "Qeqqata",
            "value": "QE",
            "country_code": "GRL"
        },
        {
            "display": "Qinghai Province | 青海省",
            "value": "QH",
            "country_code": "CHN"
        },
        {
            "display": "Qinā",
            "value": "KN",
            "country_code": "EGY"
        },
        {
            "display": "Qom",
            "value": "25",
            "country_code": "IRN"
        },
        {
            "display": "Qostanay",
            "value": "QS",
            "country_code": "KAZ"
        },
        {
            "display": "Quang Binh",
            "value": "24",
            "country_code": "VNM"
        },
        {
            "display": "Quang Nam",
            "value": "27",
            "country_code": "VNM"
        },
        {
            "display": "Quang Ngai",
            "value": "29",
            "country_code": "VNM"
        },
        {
            "display": "Quang Ninh",
            "value": "13",
            "country_code": "VNM"
        },
        {
            "display": "Quang Tri",
            "value": "25",
            "country_code": "VNM"
        },
        {
            "display": "Quebec",
            "value": "QC",
            "country_code": "CAN"
        },
        {
            "display": "Queensland",
            "value": "QLD",
            "country_code": "AUS"
        },
        {
            "display": "Querétaro",
            "value": "QT",
            "country_code": "MEX"
        },
        {
            "display": "Quetzaltenango",
            "value": "QZ",
            "country_code": "GTM"
        },
        {
            "display": "Quezon",
            "value": "QZ",
            "country_code": "PHL"
        },
        {
            "display": "Quiché",
            "value": "QC",
            "country_code": "GTM"
        },
        {
            "display": "Quinara",
            "value": "QU",
            "country_code": "GNB"
        },
        {
            "display": "Quindío",
            "value": "QU",
            "country_code": "COL"
        },
        {
            "display": "Quintana Roo",
            "value": "QR",
            "country_code": "MEX"
        },
        {
            "display": "Quirino",
            "value": "QR",
            "country_code": "PHL"
        },
        {
            "display": "Quthing",
            "value": "QT",
            "country_code": "LSO"
        },
        {
            "display": "Qyzylorda",
            "value": "QO",
            "country_code": "KAZ"
        },
        {
            "display": "Qāsh-Barkah",
            "value": "GB",
            "country_code": "ERI"
        },
        {
            "display": "Ra",
            "value": "11",
            "country_code": "FJI"
        },
        {
            "display": "Rabat-Salé-Kénitra",
            "value": "RK",
            "country_code": "MAR"
        },
        {
            "display": "Rach'a-Lechkhumi-Kvemo Svaneti",
            "value": "RL",
            "country_code": "GEO"
        },
        {
            "display": "Rafah | Rafaḩ",
            "value": "RFH",
            "country_code": "PSE"
        },
        {
            "display": "Rajasthan",
            "value": "RJ",
            "country_code": "IND"
        },
        {
            "display": "Rajshahi",
            "value": "5R",
            "country_code": "BGD"
        },
        {
            "display": "Rakai",
            "value": "70",
            "country_code": "UGA"
        },
        {
            "display": "Rakhine",
            "value": "RA",
            "country_code": "MMR"
        },
        {
            "display": "Ramallah | Rām Allāh wal Bīrah",
            "value": "RBH",
            "country_code": "PSE"
        },
        {
            "display": "Rangpur",
            "value": "5S",
            "country_code": "BGD"
        },
        {
            "display": "Ranong | ระนอง",
            "value": "RNG",
            "country_code": "THA"
        },
        {
            "display": "Raplamaa",
            "value": "RA",
            "country_code": "EST"
        },
        {
            "display": "Rasinski okrug",
            "value": "RA",
            "country_code": "SRB"
        },
        {
            "display": "Ratchaburi | ราชบุรี",
            "value": "RBR",
            "country_code": "THA"
        },
        {
            "display": "Raymah",
            "value": "RA",
            "country_code": "YEM"
        },
        {
            "display": "Rayong | ระยอง",
            "value": "RYG",
            "country_code": "THA"
        },
        {
            "display": "Razgrad",
            "value": "RA",
            "country_code": "BGR"
        },
        {
            "display": "Raški okrug",
            "value": "RK",
            "country_code": "SRB"
        },
        {
            "display": "Ra’s al Khaymah",
            "value": "RK",
            "country_code": "ARE"
        },
        {
            "display": "Red Sea",
            "value": "RS",
            "country_code": "SDN"
        },
        {
            "display": "Redange | Réiden-Atert",
            "value": "RD",
            "country_code": "LUX"
        },
        {
            "display": "Redonda",
            "value": "RD",
            "country_code": "ATG"
        },
        {
            "display": "Regions of Republican Subordination",
            "value": "RR",
            "country_code": "TJK"
        },
        {
            "display": "Região Autónoma da Madeira",
            "value": "RM",
            "country_code": "PRT"
        },
        {
            "display": "Região Autónoma dos Açores",
            "value": "RA",
            "country_code": "PRT"
        },
        {
            "display": "Región Metropolitana de Santiago",
            "value": "RM",
            "country_code": "CHL"
        },
        {
            "display": "Remich | Réimech",
            "value": "RM",
            "country_code": "LUX"
        },
        {
            "display": "Renfrewshire",
            "value": "RF",
            "country_code": "GBR"
        },
        {
            "display": "Rennell and Bellona",
            "value": "RB",
            "country_code": "SLB"
        },
        {
            "display": "Republika Srpska",
            "value": "SR",
            "country_code": "BIH"
        },
        {
            "display": "Retalhuleu",
            "value": "RE",
            "country_code": "GTM"
        },
        {
            "display": "Rewa",
            "value": "12",
            "country_code": "FJI"
        },
        {
            "display": "Rheinland-Pfalz",
            "value": "RP",
            "country_code": "DEU"
        },
        {
            "display": "Rhode Island",
            "value": "RI",
            "country_code": "USA"
        },
        {
            "display": "Rhondda Cynon Taff",
            "value": "RC",
            "country_code": "GBR"
        },
        {
            "display": "Riau",
            "value": "RI",
            "country_code": "IDN"
        },
        {
            "display": "Ribeira Brava",
            "value": "RB",
            "country_code": "CPV"
        },
        {
            "display": "Ribeira Grande",
            "value": "RG",
            "country_code": "CPV"
        },
        {
            "display": "Ribeira Grande de Santiago",
            "value": "RS",
            "country_code": "CPV"
        },
        {
            "display": "Risaralda",
            "value": "RI",
            "country_code": "COL"
        },
        {
            "display": "Rivas",
            "value": "RI",
            "country_code": "NIC"
        },
        {
            "display": "River Cess",
            "value": "RI",
            "country_code": "LBR"
        },
        {
            "display": "River Gee",
            "value": "RG",
            "country_code": "LBR"
        },
        {
            "display": "River Nile",
            "value": "RN",
            "country_code": "SDN"
        },
        {
            "display": "Rivers",
            "value": "RI",
            "country_code": "NGA"
        },
        {
            "display": "Rivière du Rempart",
            "value": "RR",
            "country_code": "MUS"
        },
        {
            "display": "Rivnenska oblast",
            "value": "RI",
            "country_code": "UKR"
        },
        {
            "display": "Rizal",
            "value": "RI",
            "country_code": "PHL"
        },
        {
            "display": "Rize",
            "value": "53",
            "country_code": "TUR"
        },
        {
            "display": "Roche Caïman",
            "value": "RC",
            "country_code": "SYC"
        },
        {
            "display": "Rodrigues",
            "value": "RO",
            "country_code": "MUS"
        },
        {
            "display": "Rogaland",
            "value": "RO",
            "country_code": "NOR"
        },
        {
            "display": "Roi Et | ร้อยเอ็ด",
            "value": "RET",
            "country_code": "THA"
        },
        {
            "display": "Romblon",
            "value": "RO",
            "country_code": "PHL"
        },
        {
            "display": "Rostov",
            "value": "RO",
            "country_code": "RUS"
        },
        {
            "display": "Rožaje",
            "value": "RO",
            "country_code": "MNE"
        },
        {
            "display": "Rubirizi",
            "value": "109",
            "country_code": "UGA"
        },
        {
            "display": "Rukungiri",
            "value": "71",
            "country_code": "UGA"
        },
        {
            "display": "Rukwa",
            "value": "RU",
            "country_code": "TZA"
        },
        {
            "display": "Rumonge",
            "value": "RM",
            "country_code": "BDI"
        },
        {
            "display": "Rumphi",
            "value": "RU",
            "country_code": "MWI"
        },
        {
            "display": "Ruse",
            "value": "RU",
            "country_code": "BGR"
        },
        {
            "display": "Rutana",
            "value": "RT",
            "country_code": "BDI"
        },
        {
            "display": "Ruvuma",
            "value": "RV",
            "country_code": "TZA"
        },
        {
            "display": "Ruyigi",
            "value": "RY",
            "country_code": "BDI"
        },
        {
            "display": "Ryazan'",
            "value": "RZ",
            "country_code": "RUS"
        },
        {
            "display": "Réunion",
            "value": "RE",
            "country_code": "FRA"
        },
        {
            "display": "Río San Juan",
            "value": "SJ",
            "country_code": "NIC"
        },
        {
            "display": "Rôtânôkiri",
            "value": "RO",
            "country_code": "KHM"
        },
        {
            "display": "Rēzekne",
            "value": "RE",
            "country_code": "LVA"
        },
        {
            "display": "Rīf Dimashq",
            "value": "RD",
            "country_code": "SYR"
        },
        {
            "display": "Rīga",
            "value": "RI",
            "country_code": "LVA"
        },
        {
            "display": "Sa Kaeo | สระแก้ว",
            "value": "SKW",
            "country_code": "THA"
        },
        {
            "display": "Saaremaa",
            "value": "SA",
            "country_code": "EST"
        },
        {
            "display": "Saarland",
            "value": "SL",
            "country_code": "DEU"
        },
        {
            "display": "Sabah",
            "value": "12",
            "country_code": "MYS"
        },
        {
            "display": "Sabaragamuwa",
            "value": "9",
            "country_code": "LKA"
        },
        {
            "display": "Sabha",
            "value": "SA",
            "country_code": "LBY"
        },
        {
            "display": "Sacatepéquez",
            "value": "SA",
            "country_code": "GTM"
        },
        {
            "display": "Sachsen",
            "value": "SN",
            "country_code": "DEU"
        },
        {
            "display": "Sachsen-Anhalt",
            "value": "ST",
            "country_code": "DEU"
        },
        {
            "display": "Sagaing",
            "value": "SA",
            "country_code": "MMR"
        },
        {
            "display": "Sahel",
            "value": "SA",
            "country_code": "BFA"
        },
        {
            "display": "Saint Andrew",
            "value": "SA",
            "country_code": "GRD"
        },
        {
            "display": "Saint Andrew",
            "value": "SA",
            "country_code": "JAM"
        },
        {
            "display": "Saint Andrew",
            "value": "SA",
            "country_code": "VCT"
        },
        {
            "display": "Saint Ann",
            "value": "SN",
            "country_code": "JAM"
        },
        {
            "display": "Saint Barthelemy",
            "value": "BL",
            "country_code": "FRA"
        },
        {
            "display": "Saint Catherine",
            "value": "SC",
            "country_code": "JAM"
        },
        {
            "display": "Saint David",
            "value": "SD",
            "country_code": "GRD"
        },
        {
            "display": "Saint David",
            "value": "SD",
            "country_code": "VCT"
        },
        {
            "display": "Saint Elizabeth",
            "value": "SE",
            "country_code": "JAM"
        },
        {
            "display": "Saint George",
            "value": "SG",
            "country_code": "ATG"
        },
        {
            "display": "Saint George",
            "value": "SG",
            "country_code": "GRD"
        },
        {
            "display": "Saint George",
            "value": "SG",
            "country_code": "VCT"
        },
        {
            "display": "Saint Helena",
            "value": " Ascension and Tristan da Cunha",
            "country_code": "GBR"
        },
        {
            "display": "Saint James",
            "value": "SJ",
            "country_code": "JAM"
        },
        {
            "display": "Saint John",
            "value": "SJ",
            "country_code": "ATG"
        },
        {
            "display": "Saint John",
            "value": "SJ",
            "country_code": "GRD"
        },
        {
            "display": "Saint Kitts",
            "value": "KX",
            "country_code": "KNA"
        },
        {
            "display": "Saint Louis",
            "value": "SL",
            "country_code": "SYC"
        },
        {
            "display": "Saint Lucia",
            "value": "SL",
            "country_code": "LCA"
        },
        {
            "display": "Saint Mark",
            "value": "SM",
            "country_code": "GRD"
        },
        {
            "display": "Saint Martin",
            "value": "MF",
            "country_code": "FRA"
        },
        {
            "display": "Saint Mary",
            "value": "SM",
            "country_code": "ATG"
        },
        {
            "display": "Saint Mary",
            "value": "SM",
            "country_code": "JAM"
        },
        {
            "display": "Saint Patrick",
            "value": "SP",
            "country_code": "GRD"
        },
        {
            "display": "Saint Patrick",
            "value": "SP",
            "country_code": "VCT"
        },
        {
            "display": "Saint Paul",
            "value": "SP",
            "country_code": "ATG"
        },
        {
            "display": "Saint Peter",
            "value": "ST",
            "country_code": "ATG"
        },
        {
            "display": "Saint Petersburg City",
            "value": "SP",
            "country_code": "RUS"
        },
        {
            "display": "Saint Philip",
            "value": "SH",
            "country_code": "ATG"
        },
        {
            "display": "Saint Pierre and Miquelon",
            "value": "PM",
            "country_code": "FRA"
        },
        {
            "display": "Saint Thomas",
            "value": "ST",
            "country_code": "JAM"
        },
        {
            "display": "Saint-Louis",
            "value": "SL",
            "country_code": "SEN"
        },
        {
            "display": "Saint-Roman",
            "value": "SR",
            "country_code": "MCO"
        },
        {
            "display": "Sainte-Dévote",
            "value": "SD",
            "country_code": "MCO"
        },
        {
            "display": "Sakarya",
            "value": "54",
            "country_code": "TUR"
        },
        {
            "display": "Sakha",
            "value": "SK",
            "country_code": "RUS"
        },
        {
            "display": "Sakhalin",
            "value": "SL",
            "country_code": "RUS"
        },
        {
            "display": "Sakon Nakhon | สกลนคร",
            "value": "SNK",
            "country_code": "THA"
        },
        {
            "display": "Sal",
            "value": "SL",
            "country_code": "CPV"
        },
        {
            "display": "Salamat",
            "value": "SA",
            "country_code": "TCD"
        },
        {
            "display": "Salfit | Salfīt",
            "value": "SLT",
            "country_code": "PSE"
        },
        {
            "display": "Salima",
            "value": "SA",
            "country_code": "MWI"
        },
        {
            "display": "Salzburg",
            "value": "SA",
            "country_code": "AUT"
        },
        {
            "display": "Samangān",
            "value": "SAM",
            "country_code": "AFG"
        },
        {
            "display": "Samar",
            "value": "SM",
            "country_code": "PHL"
        },
        {
            "display": "Samara",
            "value": "SA",
            "country_code": "RUS"
        },
        {
            "display": "Samarkand",
            "value": "SA",
            "country_code": "UZB"
        },
        {
            "display": "Samburu",
            "value": "37",
            "country_code": "KEN"
        },
        {
            "display": "Samchi",
            "value": "SM",
            "country_code": "BTN"
        },
        {
            "display": "Samdrup Jongkhar",
            "value": "SJ",
            "country_code": "BTN"
        },
        {
            "display": "Samegrelo-Zemo Svaneti",
            "value": "SZ",
            "country_code": "GEO"
        },
        {
            "display": "Samsun",
            "value": "55",
            "country_code": "TUR"
        },
        {
            "display": "Samtskhe-Javakheti",
            "value": "SJ",
            "country_code": "GEO"
        },
        {
            "display": "Samut Prakan | สมุทรปราการ",
            "value": "SPK",
            "country_code": "THA"
        },
        {
            "display": "Samut Sakhon | สมุทรสาคร",
            "value": "SKN",
            "country_code": "THA"
        },
        {
            "display": "Samut Songkhram | สมุทรสงคราม",
            "value": "SKM",
            "country_code": "THA"
        },
        {
            "display": "San Andrés, Providencia y Santa Catalina",
            "value": "SA",
            "country_code": "COL"
        },
        {
            "display": "San José",
            "value": "SJ",
            "country_code": "CRI"
        },
        {
            "display": "San Juan-Laventille",
            "value": "SJ",
            "country_code": "TTO"
        },
        {
            "display": "San Luis Potosí",
            "value": "SL",
            "country_code": "MEX"
        },
        {
            "display": "San Marcos",
            "value": "SM",
            "country_code": "GTM"
        },
        {
            "display": "San Martín | San Martin",
            "value": "SA",
            "country_code": "PER"
        },
        {
            "display": "San Miguel",
            "value": "SM",
            "country_code": "SLV"
        },
        {
            "display": "San Salvador",
            "value": "SS",
            "country_code": "SLV"
        },
        {
            "display": "San Vicente",
            "value": "SV",
            "country_code": "SLV"
        },
        {
            "display": "Sanaag",
            "value": "SA",
            "country_code": "SOM"
        },
        {
            "display": "Sancti Spíritus",
            "value": "SS",
            "country_code": "CUB"
        },
        {
            "display": "Sangha",
            "value": "13",
            "country_code": "COG"
        },
        {
            "display": "Sangha-Mbaéré",
            "value": "SE",
            "country_code": "CAF"
        },
        {
            "display": "Sangre Grande",
            "value": "SG",
            "country_code": "TTO"
        },
        {
            "display": "Sankuru",
            "value": "SA",
            "country_code": "COD"
        },
        {
            "display": "Sant Julià de Lòria",
            "value": "JU",
            "country_code": "AND"
        },
        {
            "display": "Santa Ana",
            "value": "SA",
            "country_code": "SLV"
        },
        {
            "display": "Santa Bárbara",
            "value": "SB",
            "country_code": "HND"
        },
        {
            "display": "Santa Catarina",
            "value": "CT",
            "country_code": "CPV"
        },
        {
            "display": "Santa Catarina do Fogo",
            "value": "CF",
            "country_code": "CPV"
        },
        {
            "display": "Santa Cruz",
            "value": "S",
            "country_code": "BOL"
        },
        {
            "display": "Santa Cruz",
            "value": "CZ",
            "country_code": "CPV"
        },
        {
            "display": "Santa Elena",
            "value": "EX",
            "country_code": "ECU"
        },
        {
            "display": "Santa Rosa",
            "value": "SR",
            "country_code": "GTM"
        },
        {
            "display": "Santander",
            "value": "SA",
            "country_code": "COL"
        },
        {
            "display": "Santarém",
            "value": "SA",
            "country_code": "PRT"
        },
        {
            "display": "Santiago de Cuba",
            "value": "SC",
            "country_code": "CUB"
        },
        {
            "display": "Santo Domingo de los Tsáchilas",
            "value": "DX",
            "country_code": "ECU"
        },
        {
            "display": "Sar-e Pul",
            "value": "SAR",
            "country_code": "AFG"
        },
        {
            "display": "Saraburi | สระบุรี",
            "value": "SRI",
            "country_code": "THA"
        },
        {
            "display": "Saramacca",
            "value": "SA",
            "country_code": "SUR"
        },
        {
            "display": "Sarangani",
            "value": "SG",
            "country_code": "PHL"
        },
        {
            "display": "Saratov",
            "value": "SR",
            "country_code": "RUS"
        },
        {
            "display": "Saravan",
            "value": "SL",
            "country_code": "LAO"
        },
        {
            "display": "Sarawak",
            "value": "13",
            "country_code": "MYS"
        },
        {
            "display": "Saskatchewan",
            "value": "SK",
            "country_code": "CAN"
        },
        {
            "display": "Sassandra-Marahoué",
            "value": "SM",
            "country_code": "CIV"
        },
        {
            "display": "Satakunta | Satakunda",
            "value": "SA",
            "country_code": "FIN"
        },
        {
            "display": "Satu Mare",
            "value": "SM",
            "country_code": "ROU"
        },
        {
            "display": "Satun | สตูล",
            "value": "STN",
            "country_code": "THA"
        },
        {
            "display": "Satupa'itea",
            "value": "SA",
            "country_code": "WSM"
        },
        {
            "display": "Savanes",
            "value": "SV",
            "country_code": "CIV"
        },
        {
            "display": "Savanes",
            "value": "SA",
            "country_code": "TGO"
        },
        {
            "display": "Savannakhét",
            "value": "SV",
            "country_code": "LAO"
        },
        {
            "display": "Savanne",
            "value": "SA",
            "country_code": "MUS"
        },
        {
            "display": "Savinjska",
            "value": "SA",
            "country_code": "SVN"
        },
        {
            "display": "Schaffhausen",
            "value": "SH",
            "country_code": "CHE"
        },
        {
            "display": "Schleswig-Holstein",
            "value": "SH",
            "country_code": "DEU"
        },
        {
            "display": "Schwyz",
            "value": "SZ",
            "country_code": "CHE"
        },
        {
            "display": "Scottish Borders",
            "value": "SC",
            "country_code": "GBR"
        },
        {
            "display": "Sejong",
            "value": "50",
            "country_code": "KOR"
        },
        {
            "display": "Selangor",
            "value": "10",
            "country_code": "MYS"
        },
        {
            "display": "Selenge",
            "value": "SL",
            "country_code": "MNG"
        },
        {
            "display": "Sembabule",
            "value": "72",
            "country_code": "UGA"
        },
        {
            "display": "Semnān",
            "value": "20",
            "country_code": "IRN"
        },
        {
            "display": "Sennar",
            "value": "SI",
            "country_code": "SDN"
        },
        {
            "display": "Seoul",
            "value": "11",
            "country_code": "KOR"
        },
        {
            "display": "Serere",
            "value": "110",
            "country_code": "UGA"
        },
        {
            "display": "Sermersooq",
            "value": "SM",
            "country_code": "GRL"
        },
        {
            "display": "Serravalle",
            "value": "SE",
            "country_code": "SMR"
        },
        {
            "display": "Serua",
            "value": "13",
            "country_code": "FJI"
        },
        {
            "display": "Setúbal",
            "value": "SE",
            "country_code": "PRT"
        },
        {
            "display": "Severnobanatski okrug",
            "value": "SE",
            "country_code": "SRB"
        },
        {
            "display": "Severnobački okrug",
            "value": "SV",
            "country_code": "SRB"
        },
        {
            "display": "Sfax",
            "value": "SF",
            "country_code": "TUN"
        },
        {
            "display": "Shaanxi Province | 陕西省",
            "value": "SN",
            "country_code": "CHN"
        },
        {
            "display": "Shabeellaha Dhexe",
            "value": "SD",
            "country_code": "SOM"
        },
        {
            "display": "Shabeellaha Hoose",
            "value": "SH",
            "country_code": "SOM"
        },
        {
            "display": "Shabwah",
            "value": "SH",
            "country_code": "YEM"
        },
        {
            "display": "Shamāl Sīnā'",
            "value": "SIN",
            "country_code": "EGY"
        },
        {
            "display": "Shamāl al Bāţinah",
            "value": "BS",
            "country_code": "OMN"
        },
        {
            "display": "Shamāl ash Sharqīyah",
            "value": "SS",
            "country_code": "OMN"
        },
        {
            "display": "Shan",
            "value": "SH",
            "country_code": "MMR"
        },
        {
            "display": "Shandong Province | 山东省",
            "value": "SD",
            "country_code": "CHN"
        },
        {
            "display": "Shanghai Municipality | 上海市",
            "value": "SH",
            "country_code": "CHN"
        },
        {
            "display": "Shanxi Province | 山西省",
            "value": "SX",
            "country_code": "CHN"
        },
        {
            "display": "Sheema",
            "value": "111",
            "country_code": "UGA"
        },
        {
            "display": "Shemgang",
            "value": "SG",
            "country_code": "BTN"
        },
        {
            "display": "Shetland Islands",
            "value": "ZE",
            "country_code": "GBR"
        },
        {
            "display": "Shida Kartli",
            "value": "SK",
            "country_code": "GEO"
        },
        {
            "display": "Shimālī al Baḩrī al Aḩmar",
            "value": "SK",
            "country_code": "ERI"
        },
        {
            "display": "Shinyanga",
            "value": "SY",
            "country_code": "TZA"
        },
        {
            "display": "Shiselweni",
            "value": "SH",
            "country_code": "SWZ"
        },
        {
            "display": "Shkodër",
            "value": "SH",
            "country_code": "ALB"
        },
        {
            "display": "Shumen",
            "value": "SH",
            "country_code": "BGR"
        },
        {
            "display": "Siaya",
            "value": "38",
            "country_code": "KEN"
        },
        {
            "display": "Sibiu",
            "value": "SB",
            "country_code": "ROU"
        },
        {
            "display": "Sichuan Province | 四川省",
            "value": "SC",
            "country_code": "CHN"
        },
        {
            "display": "Sidi Bou Zid",
            "value": "SZ",
            "country_code": "TUN"
        },
        {
            "display": "Siirt",
            "value": "56",
            "country_code": "TUR"
        },
        {
            "display": "Sikasso",
            "value": "SK",
            "country_code": "MLI"
        },
        {
            "display": "Sikkim",
            "value": "SK",
            "country_code": "IND"
        },
        {
            "display": "Sila",
            "value": "SI",
            "country_code": "TCD"
        },
        {
            "display": "Silesia | Śląskie",
            "value": "SI",
            "country_code": "POL"
        },
        {
            "display": "Siliana",
            "value": "SL",
            "country_code": "TUN"
        },
        {
            "display": "Silistra",
            "value": "SI",
            "country_code": "BGR"
        },
        {
            "display": "Simiyu",
            "value": "SI",
            "country_code": "TZA"
        },
        {
            "display": "Sinaloa",
            "value": "SI",
            "country_code": "MEX"
        },
        {
            "display": "Sindh | سندھ",
            "value": "S",
            "country_code": "PAK"
        },
        {
            "display": "Sing Buri | สิงห์บุรี",
            "value": "SBR",
            "country_code": "THA"
        },
        {
            "display": "Singida",
            "value": "SD",
            "country_code": "TZA"
        },
        {
            "display": "Sinoe",
            "value": "SI",
            "country_code": "LBR"
        },
        {
            "display": "Sinop",
            "value": "57",
            "country_code": "TUR"
        },
        {
            "display": "Sint Maarten",
            "value": "SX",
            "country_code": "NLD"
        },
        {
            "display": "Sipaliwini",
            "value": "SI",
            "country_code": "SUR"
        },
        {
            "display": "Siparia",
            "value": "SI",
            "country_code": "TTO"
        },
        {
            "display": "Siquijor",
            "value": "SQ",
            "country_code": "PHL"
        },
        {
            "display": "Sirdaryo",
            "value": "SI",
            "country_code": "UZB"
        },
        {
            "display": "Sironko",
            "value": "73",
            "country_code": "UGA"
        },
        {
            "display": "Sisaket | ศรีสะเกษ",
            "value": "SSK",
            "country_code": "THA"
        },
        {
            "display": "Sisačko-moslavačka županija",
            "value": "SI",
            "country_code": "HRV"
        },
        {
            "display": "Sivas",
            "value": "58",
            "country_code": "TUR"
        },
        {
            "display": "Siĕmréab",
            "value": "SI",
            "country_code": "KHM"
        },
        {
            "display": "Sjælland",
            "value": "85",
            "country_code": "DNK"
        },
        {
            "display": "Skåne län",
            "value": "M",
            "country_code": "SWE"
        },
        {
            "display": "Sliven",
            "value": "SL",
            "country_code": "BGR"
        },
        {
            "display": "Smolensk",
            "value": "SM",
            "country_code": "RUS"
        },
        {
            "display": "Smolyan",
            "value": "SM",
            "country_code": "BGR"
        },
        {
            "display": "Soc Trang",
            "value": "52",
            "country_code": "VNM"
        },
        {
            "display": "Sofala",
            "value": "S",
            "country_code": "MOZ"
        },
        {
            "display": "Sofia",
            "value": "SF",
            "country_code": "BGR"
        },
        {
            "display": "Sofia (stolitsa)",
            "value": "SO",
            "country_code": "BGR"
        },
        {
            "display": "Sogd",
            "value": "LE",
            "country_code": "TJK"
        },
        {
            "display": "Sokoto",
            "value": "SO",
            "country_code": "NGA"
        },
        {
            "display": "Sololá",
            "value": "SO",
            "country_code": "GTM"
        },
        {
            "display": "Solothurn",
            "value": "SO",
            "country_code": "CHE"
        },
        {
            "display": "Somerset",
            "value": "SO",
            "country_code": "GBR"
        },
        {
            "display": "Somogy",
            "value": "SM",
            "country_code": "HUN"
        },
        {
            "display": "Son La",
            "value": "5",
            "country_code": "VNM"
        },
        {
            "display": "Songkhla | สงขลา",
            "value": "SKA",
            "country_code": "THA"
        },
        {
            "display": "Sonora",
            "value": "SO",
            "country_code": "MEX"
        },
        {
            "display": "Sonsonate",
            "value": "SO",
            "country_code": "SLV"
        },
        {
            "display": "Sool",
            "value": "SO",
            "country_code": "SOM"
        },
        {
            "display": "Soroti",
            "value": "74",
            "country_code": "UGA"
        },
        {
            "display": "Sorsogon",
            "value": "SR",
            "country_code": "PHL"
        },
        {
            "display": "Souss-Massa",
            "value": "SS",
            "country_code": "MAR"
        },
        {
            "display": "Sousse",
            "value": "SS",
            "country_code": "TUN"
        },
        {
            "display": "South",
            "value": "SO",
            "country_code": "MDV"
        },
        {
            "display": "South Aegean",
            "value": "SA",
            "country_code": "GRC"
        },
        {
            "display": "South Australia",
            "value": "SA",
            "country_code": "AUS"
        },
        {
            "display": "South Ayrshire",
            "value": "SA",
            "country_code": "GBR"
        },
        {
            "display": "South Carolina",
            "value": "SC",
            "country_code": "USA"
        },
        {
            "display": "South Central",
            "value": "SC",
            "country_code": "MDV"
        },
        {
            "display": "South Chungcheong",
            "value": "44",
            "country_code": "KOR"
        },
        {
            "display": "South Cotabato",
            "value": "SC",
            "country_code": "PHL"
        },
        {
            "display": "South Dakota",
            "value": "SD",
            "country_code": "USA"
        },
        {
            "display": "South Darfur",
            "value": "SF",
            "country_code": "SDN"
        },
        {
            "display": "South East",
            "value": "SE",
            "country_code": "SGP"
        },
        {
            "display": "South East",
            "value": "SE",
            "country_code": "BWA"
        },
        {
            "display": "South Gyeongsang",
            "value": "48",
            "country_code": "KOR"
        },
        {
            "display": "South Jeolla",
            "value": "46",
            "country_code": "KOR"
        },
        {
            "display": "South Kazakhstan",
            "value": "SK",
            "country_code": "KAZ"
        },
        {
            "display": "South Kordofan",
            "value": "SK",
            "country_code": "SDN"
        },
        {
            "display": "South Lanarkshire",
            "value": "SL",
            "country_code": "GBR"
        },
        {
            "display": "South West",
            "value": "SW",
            "country_code": "SGP"
        },
        {
            "display": "Southern",
            "value": "3",
            "country_code": "LKA"
        },
        {
            "display": "Southern",
            "value": "SO",
            "country_code": "BWA"
        },
        {
            "display": "Southern",
            "value": "SU",
            "country_code": "RWA"
        },
        {
            "display": "Southern",
            "value": "SO",
            "country_code": "SLE"
        },
        {
            "display": "Southern",
            "value": "SO",
            "country_code": "ZMB"
        },
        {
            "display": "Southern Grenadine Islands",
            "value": "SA",
            "country_code": "GRD"
        },
        {
            "display": "Southern Highlands",
            "value": "SHM",
            "country_code": "PNG"
        },
        {
            "display": "Southern Leyte",
            "value": "SL",
            "country_code": "PHL"
        },
        {
            "display": "Southland",
            "value": "SL",
            "country_code": "NZL"
        },
        {
            "display": "Splitsko-dalmatinska županija",
            "value": "SP",
            "country_code": "HRV"
        },
        {
            "display": "Spodnjeposavska",
            "value": "PS",
            "country_code": "SVN"
        },
        {
            "display": "Spélugues",
            "value": "SP",
            "country_code": "MCO"
        },
        {
            "display": "Srednjebanatski okrug",
            "value": "SR",
            "country_code": "SRB"
        },
        {
            "display": "Sremski okrug",
            "value": "SM",
            "country_code": "SRB"
        },
        {
            "display": "St. Gallen ",
            "value": "SG",
            "country_code": "CHE"
        },
        {
            "display": "Staffordshire",
            "value": "SS",
            "country_code": "GBR"
        },
        {
            "display": "Stann Creek",
            "value": "SC",
            "country_code": "BLZ"
        },
        {
            "display": "Stara Zagora",
            "value": "ST",
            "country_code": "BGR"
        },
        {
            "display": "Stavropol'",
            "value": "ST",
            "country_code": "RUS"
        },
        {
            "display": "Steiermark",
            "value": "ST",
            "country_code": "AUT"
        },
        {
            "display": "Stirling",
            "value": "ST",
            "country_code": "GBR"
        },
        {
            "display": "Stockholms län",
            "value": "AB",
            "country_code": "SWE"
        },
        {
            "display": "Stœ̆ng Trêng",
            "value": "ST",
            "country_code": "KHM"
        },
        {
            "display": "Středočeský kraj",
            "value": "ST",
            "country_code": "CZE"
        },
        {
            "display": "Subcarpathia | Podkarpackie",
            "value": "SU",
            "country_code": "POL"
        },
        {
            "display": "Suceava",
            "value": "SV",
            "country_code": "ROU"
        },
        {
            "display": "Suchitepéquez",
            "value": "SU",
            "country_code": "GTM"
        },
        {
            "display": "Sucre",
            "value": "SU",
            "country_code": "COL"
        },
        {
            "display": "Sucre",
            "value": "RX",
            "country_code": "VEN"
        },
        {
            "display": "Sucumbíos",
            "value": "UX",
            "country_code": "ECU"
        },
        {
            "display": "Sud",
            "value": "SU",
            "country_code": "CMR"
        },
        {
            "display": "Sud | Sid",
            "value": "SD",
            "country_code": "HTI"
        },
        {
            "display": "Sud-Est | Sidès",
            "value": "SE",
            "country_code": "HTI"
        },
        {
            "display": "Sud-Kivu",
            "value": "SK",
            "country_code": "COD"
        },
        {
            "display": "Sud-Ouest",
            "value": "SO",
            "country_code": "BFA"
        },
        {
            "display": "Sud-Ouest",
            "value": "SW",
            "country_code": "CMR"
        },
        {
            "display": "Sud-Ubangi",
            "value": "SU",
            "country_code": "COD"
        },
        {
            "display": "Sudurpashchim ",
            "value": "P7",
            "country_code": "NPL"
        },
        {
            "display": "Suffolk",
            "value": "SF",
            "country_code": "GBR"
        },
        {
            "display": "Sukhothai | สุโขทัย",
            "value": "STI",
            "country_code": "THA"
        },
        {
            "display": "Sulawesi Barat",
            "value": "SR",
            "country_code": "IDN"
        },
        {
            "display": "Sulawesi Selatan",
            "value": "SE",
            "country_code": "IDN"
        },
        {
            "display": "Sulawesi Tengah",
            "value": "ST",
            "country_code": "IDN"
        },
        {
            "display": "Sulawesi Tenggara",
            "value": "SG",
            "country_code": "IDN"
        },
        {
            "display": "Sulawesi Utara",
            "value": "SW",
            "country_code": "IDN"
        },
        {
            "display": "Sultan Kudarat",
            "value": "SK",
            "country_code": "PHL"
        },
        {
            "display": "Sulu",
            "value": "SU",
            "country_code": "PHL"
        },
        {
            "display": "Sumalē",
            "value": "SO",
            "country_code": "ETH"
        },
        {
            "display": "Sumatera Barat",
            "value": "SB",
            "country_code": "IDN"
        },
        {
            "display": "Sumatera Selatan",
            "value": "SL",
            "country_code": "IDN"
        },
        {
            "display": "Sumatera Utara",
            "value": "SU",
            "country_code": "IDN"
        },
        {
            "display": "Sumqayıt",
            "value": "SM",
            "country_code": "AZE"
        },
        {
            "display": "Sumska oblast",
            "value": "SU",
            "country_code": "UKR"
        },
        {
            "display": "Suphan Buri | สุพรรณบุรี",
            "value": "SPB",
            "country_code": "THA"
        },
        {
            "display": "Surat Thani | สุราษฎร์ธานี",
            "value": "SNI",
            "country_code": "THA"
        },
        {
            "display": "Surigao del Norte",
            "value": "ST",
            "country_code": "PHL"
        },
        {
            "display": "Surigao del Sur",
            "value": "SS",
            "country_code": "PHL"
        },
        {
            "display": "Surin | สุรินทร์",
            "value": "SRN",
            "country_code": "THA"
        },
        {
            "display": "Surrey",
            "value": "SR",
            "country_code": "GBR"
        },
        {
            "display": "Surt",
            "value": "ST",
            "country_code": "LBY"
        },
        {
            "display": "Surxondaryo",
            "value": "SU",
            "country_code": "UZB"
        },
        {
            "display": "Suðurland",
            "value": "SU",
            "country_code": "ISL"
        },
        {
            "display": "Suðurnes",
            "value": "SU",
            "country_code": "ISL"
        },
        {
            "display": "Svalbard",
            "value": "SV",
            "country_code": "NOR"
        },
        {
            "display": "Svalbard and Jan Mayen Island",
            "value": "SJ",
            "country_code": "NOR"
        },
        {
            "display": "Svay Riĕng",
            "value": "SR",
            "country_code": "KHM"
        },
        {
            "display": "Sverdlovsk",
            "value": "SV",
            "country_code": "RUS"
        },
        {
            "display": "Swansea",
            "value": "SW",
            "country_code": "GBR"
        },
        {
            "display": "Syddanmark",
            "value": "83",
            "country_code": "DNK"
        },
        {
            "display": "Sylhet",
            "value": "2T",
            "country_code": "BGD"
        },
        {
            "display": "Syunik'",
            "value": "SU",
            "country_code": "ARM"
        },
        {
            "display": "Szabolcs-Szatmár-Bereg ",
            "value": "SZB",
            "country_code": "HUN"
        },
        {
            "display": "São Domingos",
            "value": "SD",
            "country_code": "CPV"
        },
        {
            "display": "São Filipe",
            "value": "FP",
            "country_code": "CPV"
        },
        {
            "display": "São Lourenço dos Órgãos",
            "value": "LO",
            "country_code": "CPV"
        },
        {
            "display": "São Miguel",
            "value": "SM",
            "country_code": "CPV"
        },
        {
            "display": "São Salvador do Mundo",
            "value": "SS",
            "country_code": "CPV"
        },
        {
            "display": "São Tomé",
            "value": "STP",
            "country_code": "STP"
        },
        {
            "display": "São Vicente",
            "value": "SV",
            "country_code": "CPV"
        },
        {
            "display": "Sédhiou",
            "value": "SE",
            "country_code": "SEN"
        },
        {
            "display": "Ségou",
            "value": "SG",
            "country_code": "MLI"
        },
        {
            "display": "Södermanlands län",
            "value": "D",
            "country_code": "SWE"
        },
        {
            "display": "Sühbaatar",
            "value": "SB",
            "country_code": "MNG"
        },
        {
            "display": "Sălaj",
            "value": "SJ",
            "country_code": "ROU"
        },
        {
            "display": "Sīstān va Balūchestān",
            "value": "11",
            "country_code": "IRN"
        },
        {
            "display": "Sūhāj",
            "value": "SHG",
            "country_code": "EGY"
        },
        {
            "display": "Tabasco",
            "value": "TB",
            "country_code": "MEX"
        },
        {
            "display": "Tabora",
            "value": "TB",
            "country_code": "TZA"
        },
        {
            "display": "Tabūk",
            "value": "07",
            "country_code": "SAU"
        },
        {
            "display": "Tacna | Taqna",
            "value": "TA",
            "country_code": "PER"
        },
        {
            "display": "Tadjourah",
            "value": "TA",
            "country_code": "DJI"
        },
        {
            "display": "Tafilah",
            "value": "AT",
            "country_code": "JOR"
        },
        {
            "display": "Tagant",
            "value": "TG",
            "country_code": "MRT"
        },
        {
            "display": "Tahoua",
            "value": "TH",
            "country_code": "NER"
        },
        {
            "display": "Taichung",
            "value": "TG",
            "country_code": "TWN"
        },
        {
            "display": "Tailevu",
            "value": "14",
            "country_code": "FJI"
        },
        {
            "display": "Tainan",
            "value": "TN",
            "country_code": "TWN"
        },
        {
            "display": "Taipei",
            "value": "TP",
            "country_code": "TWN"
        },
        {
            "display": "Taita/Taveta",
            "value": "39",
            "country_code": "KEN"
        },
        {
            "display": "Taiwan",
            "value": "TA",
            "country_code": "TWN"
        },
        {
            "display": "Taiwan Province[l] | 台湾省",
            "value": "TW",
            "country_code": "CHN"
        },
        {
            "display": "Tak | ตาก",
            "value": "TAK",
            "country_code": "THA"
        },
        {
            "display": "Takamaka",
            "value": "TA",
            "country_code": "SYC"
        },
        {
            "display": "Takhār",
            "value": "TAK",
            "country_code": "AFG"
        },
        {
            "display": "Takêv",
            "value": "TA",
            "country_code": "KHM"
        },
        {
            "display": "Talas",
            "value": "TL",
            "country_code": "KGZ"
        },
        {
            "display": "Tamaulipas",
            "value": "TM",
            "country_code": "MEX"
        },
        {
            "display": "Tambacounda",
            "value": "TC",
            "country_code": "SEN"
        },
        {
            "display": "Tambov",
            "value": "TB",
            "country_code": "RUS"
        },
        {
            "display": "Tamil Nadu",
            "value": "TN",
            "country_code": "IND"
        },
        {
            "display": "Tana River",
            "value": "40",
            "country_code": "KEN"
        },
        {
            "display": "Tandjilé",
            "value": "TA",
            "country_code": "TCD"
        },
        {
            "display": "Tanga",
            "value": "TN",
            "country_code": "TZA"
        },
        {
            "display": "Tangail",
            "value": "3U",
            "country_code": "BGD"
        },
        {
            "display": "Tanganyika",
            "value": "TA",
            "country_code": "COD"
        },
        {
            "display": "Tanger-Tétouan-Al Hoceima",
            "value": "TC",
            "country_code": "MAR"
        },
        {
            "display": "Tanintharyi",
            "value": "TN",
            "country_code": "MMR"
        },
        {
            "display": "Taoudénit",
            "value": "TD",
            "country_code": "MLI"
        },
        {
            "display": "Taraba",
            "value": "TA",
            "country_code": "NGA"
        },
        {
            "display": "Taranaki | Taranaki",
            "value": "TKI",
            "country_code": "NZL"
        },
        {
            "display": "Tarapacá",
            "value": "TA",
            "country_code": "CHL"
        },
        {
            "display": "Targovishte",
            "value": "TA",
            "country_code": "BGR"
        },
        {
            "display": "Tarija",
            "value": "T",
            "country_code": "BOL"
        },
        {
            "display": "Tarlac",
            "value": "TR",
            "country_code": "PHL"
        },
        {
            "display": "Tarrafal",
            "value": "TF",
            "country_code": "CPV"
        },
        {
            "display": "Tarrafal de São Nicolau",
            "value": "TS",
            "country_code": "CPV"
        },
        {
            "display": "Tartumaa",
            "value": "TA",
            "country_code": "EST"
        },
        {
            "display": "Tashi Yangtse",
            "value": "TY",
            "country_code": "BTN"
        },
        {
            "display": "Tashigang",
            "value": "TA",
            "country_code": "BTN"
        },
        {
            "display": "Tashkent",
            "value": "TO",
            "country_code": "UZB"
        },
        {
            "display": "Tashkent City",
            "value": "TK",
            "country_code": "UZB"
        },
        {
            "display": "Tasman | Te Tai-o-Aorere",
            "value": "TAS",
            "country_code": "NZL"
        },
        {
            "display": "Tasmania",
            "value": "TAS",
            "country_code": "AUS"
        },
        {
            "display": "Tataouine",
            "value": "TA",
            "country_code": "TUN"
        },
        {
            "display": "Tatarstan",
            "value": "TT",
            "country_code": "RUS"
        },
        {
            "display": "Tauragės apskritis",
            "value": "TA",
            "country_code": "LTU"
        },
        {
            "display": "Tavuš",
            "value": "TV",
            "country_code": "ARM"
        },
        {
            "display": "Tawi-Tawi",
            "value": "TT",
            "country_code": "PHL"
        },
        {
            "display": "Tay Ninh",
            "value": "37",
            "country_code": "VNM"
        },
        {
            "display": "Tbong Khmum",
            "value": "TB",
            "country_code": "KHM"
        },
        {
            "display": "Tehrān",
            "value": "23",
            "country_code": "IRN"
        },
        {
            "display": "Tekirdağ",
            "value": "59",
            "country_code": "TUR"
        },
        {
            "display": "Tel Aviv",
            "value": "TA",
            "country_code": "ISR"
        },
        {
            "display": "Telangana",
            "value": "TG",
            "country_code": "IND"
        },
        {
            "display": "Teleorman",
            "value": "TR",
            "country_code": "ROU"
        },
        {
            "display": "Telšių apskritis",
            "value": "TE",
            "country_code": "LTU"
        },
        {
            "display": "Temburong",
            "value": "TE",
            "country_code": "BRN"
        },
        {
            "display": "Temotu",
            "value": "TE",
            "country_code": "SLB"
        },
        {
            "display": "Tennessee",
            "value": "TN",
            "country_code": "USA"
        },
        {
            "display": "Terengganu",
            "value": "11",
            "country_code": "MYS"
        },
        {
            "display": "Ternopilska oblast",
            "value": "TE",
            "country_code": "UKR"
        },
        {
            "display": "Tete",
            "value": "T",
            "country_code": "MOZ"
        },
        {
            "display": "Texas",
            "value": "TX",
            "country_code": "USA"
        },
        {
            "display": "Thaba-Tseka",
            "value": "TT",
            "country_code": "LSO"
        },
        {
            "display": "Thai Binh",
            "value": "20",
            "country_code": "VNM"
        },
        {
            "display": "Thai Nguyen",
            "value": "69",
            "country_code": "VNM"
        },
        {
            "display": "Thanh Hoa",
            "value": "21",
            "country_code": "VNM"
        },
        {
            "display": "Tharaka-Nithi",
            "value": "41",
            "country_code": "KEN"
        },
        {
            "display": "Thessaly",
            "value": "TY",
            "country_code": "GRC"
        },
        {
            "display": "Thimphu",
            "value": "TM",
            "country_code": "BTN"
        },
        {
            "display": "Thiès",
            "value": "TH",
            "country_code": "SEN"
        },
        {
            "display": "Thua Thien-Hue",
            "value": "26",
            "country_code": "VNM"
        },
        {
            "display": "Thurgau",
            "value": "TG",
            "country_code": "CHE"
        },
        {
            "display": "Thyolo",
            "value": "TH",
            "country_code": "MWI"
        },
        {
            "display": "Thüringen",
            "value": "TH",
            "country_code": "DEU"
        },
        {
            "display": "Tianjin Municipality | 天津市",
            "value": "TJ",
            "country_code": "CHN"
        },
        {
            "display": "Tibesti",
            "value": "TI",
            "country_code": "TCD"
        },
        {
            "display": "Tibet Autonomous Region | 西藏自治区",
            "value": "XZ",
            "country_code": "CHN"
        },
        {
            "display": "Ticino",
            "value": "TI",
            "country_code": "CHE"
        },
        {
            "display": "Tien Giang",
            "value": "46",
            "country_code": "VNM"
        },
        {
            "display": "Tigray",
            "value": "TI",
            "country_code": "ETH"
        },
        {
            "display": "Tillabéri",
            "value": "TL",
            "country_code": "NER"
        },
        {
            "display": "Timbuktu",
            "value": "TT",
            "country_code": "MLI"
        },
        {
            "display": "Timiș",
            "value": "TM",
            "country_code": "ROU"
        },
        {
            "display": "Tiranë",
            "value": "TI",
            "country_code": "ALB"
        },
        {
            "display": "Tiris Zemmour",
            "value": "TZ",
            "country_code": "MRT"
        },
        {
            "display": "Tirol",
            "value": "TI",
            "country_code": "AUT"
        },
        {
            "display": "Tivat",
            "value": "TI",
            "country_code": "MNE"
        },
        {
            "display": "Tlaxcala",
            "value": "TL",
            "country_code": "MEX"
        },
        {
            "display": "Toamasina",
            "value": "TM",
            "country_code": "MDG"
        },
        {
            "display": "Togdheer",
            "value": "TO",
            "country_code": "SOM"
        },
        {
            "display": "Tokat",
            "value": "60",
            "country_code": "TUR"
        },
        {
            "display": "Tokelau",
            "value": "TK",
            "country_code": "NZL"
        },
        {
            "display": "Toledo",
            "value": "OL",
            "country_code": "BLZ"
        },
        {
            "display": "Toliara",
            "value": "TL",
            "country_code": "MDG"
        },
        {
            "display": "Tolima",
            "value": "TO",
            "country_code": "COL"
        },
        {
            "display": "Tolna",
            "value": "TA",
            "country_code": "HUN"
        },
        {
            "display": "Tombali",
            "value": "TO",
            "country_code": "GNB"
        },
        {
            "display": "Tomsk",
            "value": "TO",
            "country_code": "RUS"
        },
        {
            "display": "Tongatapu",
            "value": "04",
            "country_code": "TON"
        },
        {
            "display": "Tongsa",
            "value": "TO",
            "country_code": "BTN"
        },
        {
            "display": "Toplički okrug",
            "value": "TO",
            "country_code": "SRB"
        },
        {
            "display": "Torfaen",
            "value": "TO",
            "country_code": "GBR"
        },
        {
            "display": "Tororo",
            "value": "75",
            "country_code": "UGA"
        },
        {
            "display": "Totonicapán",
            "value": "TO",
            "country_code": "GTM"
        },
        {
            "display": "Tozeur",
            "value": "TO",
            "country_code": "TUN"
        },
        {
            "display": "Tra Vinh",
            "value": "51",
            "country_code": "VNM"
        },
        {
            "display": "Trabzon",
            "value": "61",
            "country_code": "TUR"
        },
        {
            "display": "Trang | ตรัง",
            "value": "TRG",
            "country_code": "THA"
        },
        {
            "display": "Trans Nzoia",
            "value": "42",
            "country_code": "KEN"
        },
        {
            "display": "Trarza",
            "value": "TR",
            "country_code": "MRT"
        },
        {
            "display": "Trat | ตราด",
            "value": "TRT",
            "country_code": "THA"
        },
        {
            "display": "Trelawny",
            "value": "TY",
            "country_code": "JAM"
        },
        {
            "display": "Trencin",
            "value": "TC",
            "country_code": "SVK"
        },
        {
            "display": "Tripoli",
            "value": "TR",
            "country_code": "LBY"
        },
        {
            "display": "Tripura",
            "value": "TR",
            "country_code": "IND"
        },
        {
            "display": "Trnava",
            "value": "TA",
            "country_code": "SVK"
        },
        {
            "display": "Tromssan ja Finmarkun",
            "value": "TR",
            "country_code": "NOR"
        },
        {
            "display": "Trujillo",
            "value": "TX",
            "country_code": "VEN"
        },
        {
            "display": "Trøndelag/Trööndelage",
            "value": "TO",
            "country_code": "NOR"
        },
        {
            "display": "Tshopo",
            "value": "TO",
            "country_code": "COD"
        },
        {
            "display": "Tshuapa",
            "value": "TU",
            "country_code": "COD"
        },
        {
            "display": "Tuamasaga",
            "value": "TU",
            "country_code": "WSM"
        },
        {
            "display": "Tubas | Ţūbās",
            "value": "TBS",
            "country_code": "PSE"
        },
        {
            "display": "Tula",
            "value": "TL",
            "country_code": "RUS"
        },
        {
            "display": "Tulcea",
            "value": "TL",
            "country_code": "ROU"
        },
        {
            "display": "Tulkarm | Ţūlkarm",
            "value": "TKM",
            "country_code": "PSE"
        },
        {
            "display": "Tumbes | Tumpis",
            "value": "TU",
            "country_code": "PER"
        },
        {
            "display": "Tunapuna-Piarco",
            "value": "TU",
            "country_code": "TTO"
        },
        {
            "display": "Tunceli",
            "value": "62",
            "country_code": "TUR"
        },
        {
            "display": "Tungurahua",
            "value": "TX",
            "country_code": "ECU"
        },
        {
            "display": "Tunis",
            "value": "TU",
            "country_code": "TUN"
        },
        {
            "display": "Turkana",
            "value": "43",
            "country_code": "KEN"
        },
        {
            "display": "Turks and Caicos Islands",
            "value": "TC",
            "country_code": "GBR"
        },
        {
            "display": "Tutong",
            "value": "TU",
            "country_code": "BRN"
        },
        {
            "display": "Tuva",
            "value": "TU",
            "country_code": "RUS"
        },
        {
            "display": "Tuvalu",
            "value": "TV",
            "country_code": "TUV"
        },
        {
            "display": "Tuyen Quang",
            "value": "7",
            "country_code": "VNM"
        },
        {
            "display": "Tuzi",
            "value": "TU",
            "country_code": "MNE"
        },
        {
            "display": "Tver'",
            "value": "TV",
            "country_code": "RUS"
        },
        {
            "display": "Tyumen'",
            "value": "TY",
            "country_code": "RUS"
        },
        {
            "display": "Táchira",
            "value": "SX",
            "country_code": "VEN"
        },
        {
            "display": "Töv",
            "value": "TO",
            "country_code": "MNG"
        },
        {
            "display": "Tāʻizz",
            "value": "TA",
            "country_code": "YEM"
        },
        {
            "display": "Uasin Gishu",
            "value": "44",
            "country_code": "KEN"
        },
        {
            "display": "Ubon Ratchathani | อุบลราชธานี",
            "value": "UBN",
            "country_code": "THA"
        },
        {
            "display": "Ucayali | Ukayali",
            "value": "UC",
            "country_code": "PER"
        },
        {
            "display": "Udmurt",
            "value": "UD",
            "country_code": "RUS"
        },
        {
            "display": "Udon Thani | อุดรธานี",
            "value": "UDN",
            "country_code": "THA"
        },
        {
            "display": "Ul'yanovsk",
            "value": "UL",
            "country_code": "RUS"
        },
        {
            "display": "Ulaanbaatar",
            "value": "UB",
            "country_code": "MNG"
        },
        {
            "display": "Ulcinj",
            "value": "UL",
            "country_code": "MNE"
        },
        {
            "display": "Ulsan",
            "value": "31",
            "country_code": "KOR"
        },
        {
            "display": "Ulster | Ulaidh",
            "value": "UX",
            "country_code": "IRL"
        },
        {
            "display": "Umm al Qaywayn",
            "value": "UQ",
            "country_code": "ARE"
        },
        {
            "display": "Umm Şalāl",
            "value": "US",
            "country_code": "QAT"
        },
        {
            "display": "Unity",
            "value": "WH",
            "country_code": "SSD"
        },
        {
            "display": "Upper Demerara-Berbice",
            "value": "UD",
            "country_code": "GUY"
        },
        {
            "display": "Upper East",
            "value": "UE",
            "country_code": "GHA"
        },
        {
            "display": "Upper Nile",
            "value": "UN",
            "country_code": "SSD"
        },
        {
            "display": "Upper North",
            "value": "UN",
            "country_code": "MDV"
        },
        {
            "display": "Upper River",
            "value": "UR",
            "country_code": "GMB"
        },
        {
            "display": "Upper South",
            "value": "US",
            "country_code": "MDV"
        },
        {
            "display": "Upper Takutu-Upper Essequibo",
            "value": "UT",
            "country_code": "GUY"
        },
        {
            "display": "Upper West",
            "value": "UW",
            "country_code": "GHA"
        },
        {
            "display": "Uppsala län",
            "value": "C",
            "country_code": "SWE"
        },
        {
            "display": "Uri",
            "value": "UR",
            "country_code": "CHE"
        },
        {
            "display": "Uruzgān",
            "value": "URU",
            "country_code": "AFG"
        },
        {
            "display": "Usulután",
            "value": "US",
            "country_code": "SLV"
        },
        {
            "display": "Utah",
            "value": "UT",
            "country_code": "USA"
        },
        {
            "display": "Utenos apskritis",
            "value": "UT",
            "country_code": "LTU"
        },
        {
            "display": "Uthai Thani | อุทัยธานี",
            "value": "UTI",
            "country_code": "THA"
        },
        {
            "display": "Utrecht",
            "value": "UT",
            "country_code": "NLD"
        },
        {
            "display": "Uttar Pradesh",
            "value": "UP",
            "country_code": "IND"
        },
        {
            "display": "Uttaradit | อุตรดิตถ์",
            "value": "UTD",
            "country_code": "THA"
        },
        {
            "display": "Uttarakhand",
            "value": "UT",
            "country_code": "IND"
        },
        {
            "display": "Uusimaa | Nyland",
            "value": "UU",
            "country_code": "FIN"
        },
        {
            "display": "Uva",
            "value": "8",
            "country_code": "LKA"
        },
        {
            "display": "Uvs",
            "value": "UV",
            "country_code": "MNG"
        },
        {
            "display": "Uíge",
            "value": "UIG",
            "country_code": "AGO"
        },
        {
            "display": "Uşak",
            "value": "64",
            "country_code": "TUR"
        },
        {
            "display": "Va'a-o-Fonoti",
            "value": "VF",
            "country_code": "WSM"
        },
        {
            "display": "Vaisigano",
            "value": "VS",
            "country_code": "WSM"
        },
        {
            "display": "Vakaga",
            "value": "VK",
            "country_code": "CAF"
        },
        {
            "display": "Valais",
            "value": "VS",
            "country_code": "CHE"
        },
        {
            "display": "Valdesia",
            "value": "VD",
            "country_code": "DOM"
        },
        {
            "display": "Vale of Glamorgan",
            "value": "VA",
            "country_code": "GBR"
        },
        {
            "display": "Valgamaa",
            "value": "VA",
            "country_code": "EST"
        },
        {
            "display": "Valle",
            "value": "VA",
            "country_code": "HND"
        },
        {
            "display": "Valle del Cauca",
            "value": "VA",
            "country_code": "COL"
        },
        {
            "display": "Vallon de la Rousse",
            "value": "VR",
            "country_code": "MCO"
        },
        {
            "display": "Vallée du Bandama",
            "value": "VB",
            "country_code": "CIV"
        },
        {
            "display": "Valmiera",
            "value": "VM",
            "country_code": "LVA"
        },
        {
            "display": "Valparaíso",
            "value": "VS",
            "country_code": "CHL"
        },
        {
            "display": "Van",
            "value": "65",
            "country_code": "TUR"
        },
        {
            "display": "Vanuatu",
            "value": "VT",
            "country_code": "VUT"
        },
        {
            "display": "Varaždinska županija",
            "value": "VA",
            "country_code": "HRV"
        },
        {
            "display": "Vargas",
            "value": "XX",
            "country_code": "VEN"
        },
        {
            "display": "Varna",
            "value": "VA",
            "country_code": "BGR"
        },
        {
            "display": "Varsinais-Suomi | Egentliga Finland",
            "value": "VA",
            "country_code": "FIN"
        },
        {
            "display": "Vas",
            "value": "VS",
            "country_code": "HUN"
        },
        {
            "display": "Vaslui",
            "value": "VS",
            "country_code": "ROU"
        },
        {
            "display": "Vaud",
            "value": "VD",
            "country_code": "CHE"
        },
        {
            "display": "Vaupés",
            "value": "VA",
            "country_code": "COL"
        },
        {
            "display": "Vava'u",
            "value": "05",
            "country_code": "TON"
        },
        {
            "display": "Vayoć Jor",
            "value": "VD",
            "country_code": "ARM"
        },
        {
            "display": "Veliko Tarnovo",
            "value": "VE",
            "country_code": "BGR"
        },
        {
            "display": "Ventspils",
            "value": "VE",
            "country_code": "LVA"
        },
        {
            "display": "Veracruz",
            "value": "VE",
            "country_code": "MEX"
        },
        {
            "display": "Veraguas",
            "value": "VG",
            "country_code": "PAN"
        },
        {
            "display": "Vermont",
            "value": "VT",
            "country_code": "USA"
        },
        {
            "display": "Vestfirðir",
            "value": "VS",
            "country_code": "ISL"
        },
        {
            "display": "Vestfold og Telemark",
            "value": "VE",
            "country_code": "NOR"
        },
        {
            "display": "Vestland",
            "value": "VS",
            "country_code": "NOR"
        },
        {
            "display": "Vesturland",
            "value": "VE",
            "country_code": "ISL"
        },
        {
            "display": "Veszprém",
            "value": "VP",
            "country_code": "HUN"
        },
        {
            "display": "Viana do Castelo",
            "value": "VI",
            "country_code": "PRT"
        },
        {
            "display": "Vianden | Veianen",
            "value": "VD",
            "country_code": "LUX"
        },
        {
            "display": "Vichada",
            "value": "VI",
            "country_code": "COL"
        },
        {
            "display": "Victoria",
            "value": "VIC",
            "country_code": "AUS"
        },
        {
            "display": "Vidin",
            "value": "VI",
            "country_code": "BGR"
        },
        {
            "display": "Vientiane",
            "value": "VI",
            "country_code": "LAO"
        },
        {
            "display": "Vihiga",
            "value": "45",
            "country_code": "KEN"
        },
        {
            "display": "Viken",
            "value": "VI",
            "country_code": "NOR"
        },
        {
            "display": "Vila Real",
            "value": "VR",
            "country_code": "PRT"
        },
        {
            "display": "Viljandimaa",
            "value": "VI",
            "country_code": "EST"
        },
        {
            "display": "Villa Clara",
            "value": "VC",
            "country_code": "CUB"
        },
        {
            "display": "Ville de N'Djamena",
            "value": "ND",
            "country_code": "TCD"
        },
        {
            "display": "Vilniaus apskritis",
            "value": "VL",
            "country_code": "LTU"
        },
        {
            "display": "Vinh Long",
            "value": "49",
            "country_code": "VNM"
        },
        {
            "display": "Vinh Phuc",
            "value": "70",
            "country_code": "VNM"
        },
        {
            "display": "Vinnytska oblast",
            "value": "VI",
            "country_code": "UKR"
        },
        {
            "display": "Viqueque | Vikeke",
            "value": "VI",
            "country_code": "TLS"
        },
        {
            "display": "Virginia",
            "value": "VA",
            "country_code": "USA"
        },
        {
            "display": "Virovitičko-podravska županija",
            "value": "VI",
            "country_code": "HRV"
        },
        {
            "display": "Viseu",
            "value": "VS",
            "country_code": "PRT"
        },
        {
            "display": "Vitsyebskaya voblasts'",
            "value": "VI",
            "country_code": "BLR"
        },
        {
            "display": "Vlaams-Brabant",
            "value": "VB",
            "country_code": "BEL"
        },
        {
            "display": "Vladimir",
            "value": "VL",
            "country_code": "RUS"
        },
        {
            "display": "Vlorë",
            "value": "Vl",
            "country_code": "ALB"
        },
        {
            "display": "Vojvodina",
            "value": "VO",
            "country_code": "SRB"
        },
        {
            "display": "Volgograd",
            "value": "VG",
            "country_code": "RUS"
        },
        {
            "display": "Vologda",
            "value": "VO",
            "country_code": "RUS"
        },
        {
            "display": "Volta",
            "value": "TV",
            "country_code": "GHA"
        },
        {
            "display": "Volynska oblast",
            "value": "VO",
            "country_code": "UKR"
        },
        {
            "display": "Vorarlberg",
            "value": "VO",
            "country_code": "AUT"
        },
        {
            "display": "Voronezh",
            "value": "VR",
            "country_code": "RUS"
        },
        {
            "display": "Vrancea",
            "value": "VN",
            "country_code": "ROU"
        },
        {
            "display": "Vratsa",
            "value": "VR",
            "country_code": "BGR"
        },
        {
            "display": "Vukovarsko-srijemska županija",
            "value": "VU",
            "country_code": "HRV"
        },
        {
            "display": "Vâlcea",
            "value": "VL",
            "country_code": "ROU"
        },
        {
            "display": "Värmlands län",
            "value": "S",
            "country_code": "SWE"
        },
        {
            "display": "Västerbottens län",
            "value": "AC",
            "country_code": "SWE"
        },
        {
            "display": "Västernorrlands län",
            "value": "Y",
            "country_code": "SWE"
        },
        {
            "display": "Västmanlands län",
            "value": "U",
            "country_code": "SWE"
        },
        {
            "display": "Västra Götalands län",
            "value": "O",
            "country_code": "SWE"
        },
        {
            "display": "Võrumaa",
            "value": "VÕ",
            "country_code": "EST"
        },
        {
            "display": "Waals-Brabant",
            "value": "WB",
            "country_code": "BEL"
        },
        {
            "display": "Wadi Fira",
            "value": "WF",
            "country_code": "TCD"
        },
        {
            "display": "Wadi al Hayat",
            "value": "WH",
            "country_code": "LBY"
        },
        {
            "display": "Wadi ash Shati'",
            "value": "WS",
            "country_code": "LBY"
        },
        {
            "display": "Waikato | Waikato",
            "value": "WKO",
            "country_code": "NZL"
        },
        {
            "display": "Wajir",
            "value": "46",
            "country_code": "KEN"
        },
        {
            "display": "Wakiso",
            "value": "76",
            "country_code": "UGA"
        },
        {
            "display": "Wallis and Futuna",
            "value": "WF",
            "country_code": "AUS"
        },
        {
            "display": "Wangdi Phodrang",
            "value": "WP",
            "country_code": "BTN"
        },
        {
            "display": "Wanica",
            "value": "WA",
            "country_code": "SUR"
        },
        {
            "display": "Warap",
            "value": "WR",
            "country_code": "SSD"
        },
        {
            "display": "Wardak",
            "value": "WAR",
            "country_code": "AFG"
        },
        {
            "display": "Warmia-Masuria | Warmińsko-mazurskie",
            "value": "WA",
            "country_code": "POL"
        },
        {
            "display": "Warwickshire",
            "value": "WA",
            "country_code": "GBR"
        },
        {
            "display": "Washington",
            "value": "WA",
            "country_code": "USA"
        },
        {
            "display": "Wele-Nzas",
            "value": "WE",
            "country_code": "GNQ"
        },
        {
            "display": "Wellington",
            "value": "WT",
            "country_code": "NZL"
        },
        {
            "display": "West Bahr-al-Ghazal",
            "value": "WB",
            "country_code": "SSD"
        },
        {
            "display": "West Bengal",
            "value": "WB",
            "country_code": "IND"
        },
        {
            "display": "West Coast",
            "value": "WE",
            "country_code": "GMB"
        },
        {
            "display": "West Darfur",
            "value": "WF",
            "country_code": "SDN"
        },
        {
            "display": "West Dunbartonshire",
            "value": "WD",
            "country_code": "GBR"
        },
        {
            "display": "West Equatoria",
            "value": "WE",
            "country_code": "SSD"
        },
        {
            "display": "West Kazakhstan",
            "value": "WK",
            "country_code": "KAZ"
        },
        {
            "display": "West Kordofan",
            "value": "WK",
            "country_code": "SDN"
        },
        {
            "display": "West Lothian",
            "value": "WL",
            "country_code": "GBR"
        },
        {
            "display": "West New Britain",
            "value": "WBK",
            "country_code": "PNG"
        },
        {
            "display": "West Pokot",
            "value": "47",
            "country_code": "KEN"
        },
        {
            "display": "West Pomerania | Zachodniopomorskie",
            "value": "WE",
            "country_code": "POL"
        },
        {
            "display": "West Sepik",
            "value": "SAN",
            "country_code": "PNG"
        },
        {
            "display": "West Sussex",
            "value": "WS",
            "country_code": "GBR"
        },
        {
            "display": "West Virginia",
            "value": "WV",
            "country_code": "USA"
        },
        {
            "display": "West-Vlaanderen",
            "value": "WV",
            "country_code": "BEL"
        },
        {
            "display": "Western",
            "value": "WPD",
            "country_code": "PNG"
        },
        {
            "display": "Western",
            "value": "WE",
            "country_code": "SLB"
        },
        {
            "display": "Western",
            "value": "1",
            "country_code": "LKA"
        },
        {
            "display": "Western",
            "value": "WP",
            "country_code": "GHA"
        },
        {
            "display": "Western",
            "value": "OU",
            "country_code": "RWA"
        },
        {
            "display": "Western",
            "value": "WE",
            "country_code": "SLE"
        },
        {
            "display": "Western",
            "value": "WE",
            "country_code": "ZMB"
        },
        {
            "display": "Western Australia",
            "value": "WA",
            "country_code": "AUS"
        },
        {
            "display": "Western Cape",
            "value": "WC",
            "country_code": "ZAF"
        },
        {
            "display": "Western Greece",
            "value": "WG",
            "country_code": "GRC"
        },
        {
            "display": "Western Highlands",
            "value": "WHM",
            "country_code": "PNG"
        },
        {
            "display": "Western Macedonia",
            "value": "WM",
            "country_code": "GRC"
        },
        {
            "display": "Westland",
            "value": "WL",
            "country_code": "NZL"
        },
        {
            "display": "Westmoreland",
            "value": "WN",
            "country_code": "JAM"
        },
        {
            "display": "White Nile",
            "value": "WN",
            "country_code": "SDN"
        },
        {
            "display": "Wien",
            "value": "WI",
            "country_code": "AUT"
        },
        {
            "display": "Wiltz | Wolz",
            "value": "WI",
            "country_code": "LUX"
        },
        {
            "display": "Wisconsin",
            "value": "WI",
            "country_code": "USA"
        },
        {
            "display": "Woleu-Ntem",
            "value": "WN",
            "country_code": "GAB"
        },
        {
            "display": "Woqooyi Galbeed",
            "value": "WO",
            "country_code": "SOM"
        },
        {
            "display": "Worcestershire",
            "value": "WO",
            "country_code": "GBR"
        },
        {
            "display": "Woroba",
            "value": "WB",
            "country_code": "CIV"
        },
        {
            "display": "Wrexham",
            "value": "WR",
            "country_code": "GBR"
        },
        {
            "display": "Wyoming",
            "value": "WY",
            "country_code": "USA"
        },
        {
            "display": "Wāsiţ",
            "value": "WA",
            "country_code": "IRQ"
        },
        {
            "display": "Xaignabouri",
            "value": "XA",
            "country_code": "LAO"
        },
        {
            "display": "Xaisômboun",
            "value": "XN",
            "country_code": "LAO"
        },
        {
            "display": "Xankəndi",
            "value": "XA",
            "country_code": "AZE"
        },
        {
            "display": "Xiangkhoang",
            "value": "XI",
            "country_code": "LAO"
        },
        {
            "display": "Xinjiang Uyghur Autonomous Region | 新疆维吾尔自治区",
            "value": "XJ",
            "country_code": "CHN"
        },
        {
            "display": "Xorazm",
            "value": "XO",
            "country_code": "UZB"
        },
        {
            "display": "Xékong",
            "value": "XE",
            "country_code": "LAO"
        },
        {
            "display": "Yala | ยะลา",
            "value": "YLA",
            "country_code": "THA"
        },
        {
            "display": "Yalova",
            "value": "77",
            "country_code": "TUR"
        },
        {
            "display": "Yamal-Nenets",
            "value": "YN",
            "country_code": "RUS"
        },
        {
            "display": "Yambol",
            "value": "YA",
            "country_code": "BGR"
        },
        {
            "display": "Yamoussoukro",
            "value": "YM",
            "country_code": "CIV"
        },
        {
            "display": "Yanggang-do",
            "value": "10",
            "country_code": "PRK"
        },
        {
            "display": "Yangon",
            "value": "YA",
            "country_code": "MMR"
        },
        {
            "display": "Yap",
            "value": "YAP",
            "country_code": "FSM"
        },
        {
            "display": "Yaracuy",
            "value": "UX",
            "country_code": "VEN"
        },
        {
            "display": "Yaroslavl'",
            "value": "YS",
            "country_code": "RUS"
        },
        {
            "display": "Yasothon | ยโสธร",
            "value": "YST",
            "country_code": "THA"
        },
        {
            "display": "Yazd",
            "value": "21",
            "country_code": "IRN"
        },
        {
            "display": "YeDebub Bihēroch Bihēreseboch na Hizboch",
            "value": "SN",
            "country_code": "ETH"
        },
        {
            "display": "Yen Bai",
            "value": "6",
            "country_code": "VNM"
        },
        {
            "display": "Yerushalayim",
            "value": "JM",
            "country_code": "ISR"
        },
        {
            "display": "Yevlax",
            "value": "YE",
            "country_code": "AZE"
        },
        {
            "display": "Yevrey",
            "value": "YV",
            "country_code": "RUS"
        },
        {
            "display": "Yobe",
            "value": "YO",
            "country_code": "NGA"
        },
        {
            "display": "Yogyakarta",
            "value": "YO",
            "country_code": "IDN"
        },
        {
            "display": "Yoro",
            "value": "YO",
            "country_code": "HND"
        },
        {
            "display": "Yozgat",
            "value": "66",
            "country_code": "TUR"
        },
        {
            "display": "Ysyk-Köl",
            "value": "YK",
            "country_code": "KGZ"
        },
        {
            "display": "Yucatán",
            "value": "YU",
            "country_code": "MEX"
        },
        {
            "display": "Yukon",
            "value": "YT",
            "country_code": "CAN"
        },
        {
            "display": "Yuma",
            "value": "YA",
            "country_code": "DOM"
        },
        {
            "display": "Yumbe",
            "value": "77",
            "country_code": "UGA"
        },
        {
            "display": "Yunnan Province | 云南省",
            "value": "YN",
            "country_code": "CHN"
        },
        {
            "display": "Zabaykal'ye",
            "value": "ZB",
            "country_code": "RUS"
        },
        {
            "display": "Zacapa",
            "value": "ZA",
            "country_code": "GTM"
        },
        {
            "display": "Zacatecas",
            "value": "ZA",
            "country_code": "MEX"
        },
        {
            "display": "Zadarska županija",
            "value": "ZA",
            "country_code": "HRV"
        },
        {
            "display": "Zaghouan",
            "value": "ZA",
            "country_code": "TUN"
        },
        {
            "display": "Zagrebačka županija",
            "value": "ZZ",
            "country_code": "HRV"
        },
        {
            "display": "Zaire",
            "value": "ZAI",
            "country_code": "AGO"
        },
        {
            "display": "Zaječarski okrug",
            "value": "ZA",
            "country_code": "SRB"
        },
        {
            "display": "Zakarpatska oblast",
            "value": "ZK",
            "country_code": "UKR"
        },
        {
            "display": "Zala",
            "value": "ZA",
            "country_code": "HUN"
        },
        {
            "display": "Zambales",
            "value": "ZM",
            "country_code": "PHL"
        },
        {
            "display": "Zambezi",
            "value": "CA",
            "country_code": "NAM"
        },
        {
            "display": "Zamboanga del Norte",
            "value": "ZN",
            "country_code": "PHL"
        },
        {
            "display": "Zamboanga del Sur",
            "value": "ZS",
            "country_code": "PHL"
        },
        {
            "display": "Zamboanga-Sibugay",
            "value": "ZY",
            "country_code": "PHL"
        },
        {
            "display": "Zambézia",
            "value": "Q",
            "country_code": "MOZ"
        },
        {
            "display": "Zamfara",
            "value": "ZA",
            "country_code": "NGA"
        },
        {
            "display": "Zamora Chinchipe",
            "value": "ZX",
            "country_code": "ECU"
        },
        {
            "display": "Zanjān",
            "value": "19",
            "country_code": "IRN"
        },
        {
            "display": "Zanzan",
            "value": "ZA",
            "country_code": "CIV"
        },
        {
            "display": "Zanzibar North",
            "value": "ZN",
            "country_code": "TZA"
        },
        {
            "display": "Zanzibar South and Central",
            "value": "ZS",
            "country_code": "TZA"
        },
        {
            "display": "Zanzibar West",
            "value": "ZW",
            "country_code": "TZA"
        },
        {
            "display": "Zapadnobački okrug",
            "value": "ZP",
            "country_code": "SRB"
        },
        {
            "display": "Zaporizka oblast",
            "value": "ZA",
            "country_code": "UKR"
        },
        {
            "display": "Zarqa",
            "value": "AZ",
            "country_code": "JOR"
        },
        {
            "display": "Zasavska",
            "value": "ZS",
            "country_code": "SVN"
        },
        {
            "display": "Zeeland",
            "value": "ZA",
            "country_code": "NLD"
        },
        {
            "display": "Zhambyl",
            "value": "ZM",
            "country_code": "KAZ"
        },
        {
            "display": "Zhejiang Province | 浙江省",
            "value": "ZJ",
            "country_code": "CHN"
        },
        {
            "display": "Zhytomyrska oblast",
            "value": "ZH",
            "country_code": "UKR"
        },
        {
            "display": "Ziguinchor",
            "value": "ZG",
            "country_code": "SEN"
        },
        {
            "display": "Zilina",
            "value": "ZI",
            "country_code": "SVK"
        },
        {
            "display": "Zinder",
            "value": "ZI",
            "country_code": "NER"
        },
        {
            "display": "Zlatiborski okrug",
            "value": "ZL",
            "country_code": "SRB"
        },
        {
            "display": "Zlínský kraj",
            "value": "ZL",
            "country_code": "CZE"
        },
        {
            "display": "Zomba",
            "value": "ZO",
            "country_code": "MWI"
        },
        {
            "display": "Zombo",
            "value": "112",
            "country_code": "UGA"
        },
        {
            "display": "Zonguldak",
            "value": "XX",
            "country_code": "TUR"
        },
        {
            "display": "Zou",
            "value": "ZO",
            "country_code": "BEN"
        },
        {
            "display": "Zug",
            "value": "ZG",
            "country_code": "CHE"
        },
        {
            "display": "Zuid-Holland",
            "value": "ZH",
            "country_code": "NLD"
        },
        {
            "display": "Zulia",
            "value": "VX",
            "country_code": "VEN"
        },
        {
            "display": "Zürich",
            "value": "ZH",
            "country_code": "CHE"
        },
        {
            "display": "Zābul",
            "value": "ZAB",
            "country_code": "AFG"
        },
        {
            "display": "Z̧ufār",
            "value": "ZU",
            "country_code": "OMN"
        },
        {
            "display": "`Ali Sabieh",
            "value": "AS",
            "country_code": "DJI"
        },
        {
            "display": " Abruzzo",
            "value": "65",
            "country_code": "ITA"
        },
        {
            "display": " Acre",
            "value": "AC",
            "country_code": "BRA"
        },
        {
            "display": " Alagoas",
            "value": "AL",
            "country_code": "BRA"
        },
        {
            "display": " Amapá",
            "value": "AP",
            "country_code": "BRA"
        },
        {
            "display": " Amazonas",
            "value": "AM",
            "country_code": "BRA"
        },
        {
            "display": " Artigas",
            "value": "AR",
            "country_code": "URY"
        },
        {
            "display": " Bahia",
            "value": "BA",
            "country_code": "BRA"
        },
        {
            "display": " Basilicata",
            "value": "77",
            "country_code": "ITA"
        },
        {
            "display": " Buenos Aires",
            "value": "B",
            "country_code": "ARG"
        },
        {
            "display": " Calabria",
            "value": "78",
            "country_code": "ITA"
        },
        {
            "display": " Campania",
            "value": "72",
            "country_code": "ITA"
        },
        {
            "display": " Canelones",
            "value": "CA",
            "country_code": "URY"
        },
        {
            "display": " Catamarca",
            "value": "K",
            "country_code": "ARG"
        },
        {
            "display": " Ceará",
            "value": "CE",
            "country_code": "BRA"
        },
        {
            "display": " Cerro Largo",
            "value": "CL",
            "country_code": "URY"
        },
        {
            "display": " Chaco",
            "value": "H",
            "country_code": "ARG"
        },
        {
            "display": " Chubut",
            "value": " Chubut",
            "country_code": "ARG"
        },
        {
            "display": " Colonia",
            "value": "CO",
            "country_code": "URY"
        },
        {
            "display": " Corrientes",
            "value": "W",
            "country_code": "ARG"
        },
        {
            "display": " Córdoba",
            "value": "X",
            "country_code": "ARG"
        },
        {
            "display": " Durazno",
            "value": "DU",
            "country_code": "URY"
        },
        {
            "display": " Emilia-Romagna",
            "value": "45",
            "country_code": "ITA"
        },
        {
            "display": " Entre Ríos",
            "value": "E",
            "country_code": "ARG"
        },
        {
            "display": " Espírito Santo",
            "value": "ES",
            "country_code": "BRA"
        },
        {
            "display": " Flores",
            "value": "FS",
            "country_code": "URY"
        },
        {
            "display": " Florida",
            "value": "FD",
            "country_code": "URY"
        },
        {
            "display": " Formosa",
            "value": "P",
            "country_code": "ARG"
        },
        {
            "display": " Goiás",
            "value": "GO",
            "country_code": "BRA"
        },
        {
            "display": " Jujuy",
            "value": "Y",
            "country_code": "ARG"
        },
        {
            "display": " La Pampa",
            "value": "L",
            "country_code": "ARG"
        },
        {
            "display": " La Rioja",
            "value": "F",
            "country_code": "ARG"
        },
        {
            "display": " Lavalleja",
            "value": "LA",
            "country_code": "URY"
        },
        {
            "display": " Lazio",
            "value": "62",
            "country_code": "ITA"
        },
        {
            "display": " Liguria",
            "value": "42",
            "country_code": "ITA"
        },
        {
            "display": " Lombardia",
            "value": "25",
            "country_code": "ITA"
        },
        {
            "display": " Maldonado",
            "value": "MA",
            "country_code": "URY"
        },
        {
            "display": " Maranhão",
            "value": "MA",
            "country_code": "BRA"
        },
        {
            "display": " Marche",
            "value": "57",
            "country_code": "ITA"
        },
        {
            "display": " Mato Grosso",
            "value": "MT",
            "country_code": "BRA"
        },
        {
            "display": " Mato Grosso do Sul",
            "value": "MS",
            "country_code": "BRA"
        },
        {
            "display": " Mendoza",
            "value": "M",
            "country_code": "ARG"
        },
        {
            "display": " Minas Gerais",
            "value": "MG",
            "country_code": "BRA"
        },
        {
            "display": " Misiones",
            "value": "N",
            "country_code": "ARG"
        },
        {
            "display": " Molise",
            "value": "67",
            "country_code": "ITA"
        },
        {
            "display": " Montevideo",
            "value": "MO",
            "country_code": "URY"
        },
        {
            "display": " Neuquén",
            "value": "Q",
            "country_code": "ARG"
        },
        {
            "display": " Paraná",
            "value": "PR",
            "country_code": "BRA"
        },
        {
            "display": " Paraíba",
            "value": "PB",
            "country_code": "BRA"
        },
        {
            "display": " Pará",
            "value": "PA",
            "country_code": "BRA"
        },
        {
            "display": " Paysandú",
            "value": "PA",
            "country_code": "URY"
        },
        {
            "display": " Pernambuco",
            "value": "PE",
            "country_code": "BRA"
        },
        {
            "display": " Piauí",
            "value": "PI",
            "country_code": "BRA"
        },
        {
            "display": " Piemonte",
            "value": "21",
            "country_code": "ITA"
        },
        {
            "display": " Puglia",
            "value": "75",
            "country_code": "ITA"
        },
        {
            "display": " Rio Grande do Norte",
            "value": "RN",
            "country_code": "BRA"
        },
        {
            "display": " Rio Grande do Sul",
            "value": "RS",
            "country_code": "BRA"
        },
        {
            "display": " Rio de Janeiro",
            "value": "RJ",
            "country_code": "BRA"
        },
        {
            "display": " Rivera",
            "value": "RV",
            "country_code": "URY"
        },
        {
            "display": " Rocha",
            "value": "RO",
            "country_code": "URY"
        },
        {
            "display": " Rondônia",
            "value": "RO",
            "country_code": "BRA"
        },
        {
            "display": " Roraima",
            "value": "RR",
            "country_code": "BRA"
        },
        {
            "display": " Río Negro",
            "value": "R",
            "country_code": "ARG"
        },
        {
            "display": " Río Negro",
            "value": "RN",
            "country_code": "URY"
        },
        {
            "display": " Salta",
            "value": "A",
            "country_code": "ARG"
        },
        {
            "display": " Salto",
            "value": "SA",
            "country_code": "URY"
        },
        {
            "display": " San José",
            "value": "SJ",
            "country_code": "URY"
        },
        {
            "display": " San Juan",
            "value": "J",
            "country_code": "ARG"
        },
        {
            "display": " San Luis",
            "value": "D",
            "country_code": "ARG"
        },
        {
            "display": " Santa Catarina",
            "value": "SC",
            "country_code": "BRA"
        },
        {
            "display": " Santa Cruz",
            "value": "Z",
            "country_code": "ARG"
        },
        {
            "display": " Santa Fe",
            "value": "S",
            "country_code": "ARG"
        },
        {
            "display": " Santiago del Estero",
            "value": "G",
            "country_code": "ARG"
        },
        {
            "display": " Sergipe",
            "value": "SE",
            "country_code": "BRA"
        },
        {
            "display": " Soriano",
            "value": "SO",
            "country_code": "URY"
        },
        {
            "display": " São Paulo",
            "value": "SP",
            "country_code": "BRA"
        },
        {
            "display": " Tacuarembó",
            "value": "TA",
            "country_code": "URY"
        },
        {
            "display": " Tierra del Fuego",
            "value": "V",
            "country_code": "ARG"
        },
        {
            "display": " Tocantins",
            "value": "TO",
            "country_code": "BRA"
        },
        {
            "display": " Toscana",
            "value": "52",
            "country_code": "ITA"
        },
        {
            "display": " Treinta y Tres",
            "value": "TT",
            "country_code": "URY"
        },
        {
            "display": " Tucumán",
            "value": "T",
            "country_code": "ARG"
        },
        {
            "display": " Umbria",
            "value": "55",
            "country_code": "ITA"
        },
        {
            "display": " Veneto",
            "value": "34",
            "country_code": "ITA"
        },
        {
            "display": "Åland Islands",
            "value": "AX",
            "country_code": "FIN"
        },
        {
            "display": "Çanakkale",
            "value": "17",
            "country_code": "TUR"
        },
        {
            "display": "Çankırı",
            "value": "18",
            "country_code": "TUR"
        },
        {
            "display": "Çorum",
            "value": "19",
            "country_code": "TUR"
        },
        {
            "display": "Équateur",
            "value": "EQ",
            "country_code": "COD"
        },
        {
            "display": "Évora",
            "value": "ÉV",
            "country_code": "PRT"
        },
        {
            "display": "Île-de-France",
            "value": "ID",
            "country_code": "FRA"
        },
        {
            "display": "Ñuble",
            "value": "NB",
            "country_code": "CHL"
        },
        {
            "display": "Ömnögovi",
            "value": "OG",
            "country_code": "MNG"
        },
        {
            "display": "Örebro län",
            "value": "T",
            "country_code": "SWE"
        },
        {
            "display": "Östergötlands län",
            "value": "E",
            "country_code": "SWE"
        },
        {
            "display": "Övörhangay",
            "value": "OH",
            "country_code": "MNG"
        },
        {
            "display": "Ústecký kraj",
            "value": "ÚS",
            "country_code": "CZE"
        },
        {
            "display": "Āfar",
            "value": "AF",
            "country_code": "ETH"
        },
        {
            "display": "Āmara",
            "value": "AM",
            "country_code": "ETH"
        },
        {
            "display": "Āz̄ārbāyjān-e Ghārbī",
            "value": "04",
            "country_code": "IRN"
        },
        {
            "display": "Āz̄ārbāyjān-e Shārqī",
            "value": "03",
            "country_code": "IRN"
        },
        {
            "display": "Īlām",
            "value": "16",
            "country_code": "IRN"
        },
        {
            "display": "İstanbul",
            "value": "34",
            "country_code": "TUR"
        },
        {
            "display": "İzmir",
            "value": "35",
            "country_code": "TUR"
        },
        {
            "display": "Łódź | Łódzkie",
            "value": "ŁÓ",
            "country_code": "POL"
        },
        {
            "display": "Ŏtdâr Méanchey",
            "value": "OC",
            "country_code": "KHM"
        },
        {
            "display": "Şalāḩ ad Dīn",
            "value": "SD",
            "country_code": "IRQ"
        },
        {
            "display": "Şanlıurfa",
            "value": "63",
            "country_code": "TUR"
        },
        {
            "display": "Şanʻā’",
            "value": "SN",
            "country_code": "YEM"
        },
        {
            "display": "Şirvan",
            "value": "SR",
            "country_code": "AZE"
        },
        {
            "display": "Şāʻdah",
            "value": "SD",
            "country_code": "YEM"
        },
        {
            "display": "Şırnak",
            "value": "73",
            "country_code": "TUR"
        },
        {
            "display": "Şəki",
            "value": "SA",
            "country_code": "AZE"
        },
        {
            "display": "Šavnik",
            "value": "ŠA",
            "country_code": "MNE"
        },
        {
            "display": "Šiaulių apskritis",
            "value": "SA",
            "country_code": "LTU"
        },
        {
            "display": "Šibensko-kninska županija",
            "value": "ŠI",
            "country_code": "HRV"
        },
        {
            "display": "Širak",
            "value": "SH",
            "country_code": "ARM"
        },
        {
            "display": "Šumadijski okrug",
            "value": "ŠU",
            "country_code": "SRB"
        },
        {
            "display": "Ţarţūs",
            "value": "TA",
            "country_code": "SYR"
        },
        {
            "display": "Žabljak",
            "value": "ŽA",
            "country_code": "MNE"
        },
        {
            "display": "أدرار | Adrar",
            "value": "AR",
            "country_code": "DZA"
        },
        {
            "display": "أم البواقي | Oum el Bouaghi",
            "value": "OB",
            "country_code": "DZA"
        },
        {
            "display": "الأغواط | Laghouat",
            "value": "LG",
            "country_code": "DZA"
        },
        {
            "display": "البليدة | Blida",
            "value": "BL",
            "country_code": "DZA"
        },
        {
            "display": "البويرة | Bouira",
            "value": "BU",
            "country_code": "DZA"
        },
        {
            "display": "البيض | El Bayadh",
            "value": "EB",
            "country_code": "DZA"
        },
        {
            "display": "الجزائر | Alger",
            "value": "AL",
            "country_code": "DZA"
        },
        {
            "display": "الجلفة | Djelfa",
            "value": "DJ",
            "country_code": "DZA"
        },
        {
            "display": "الشلف | Chlef",
            "value": "CH",
            "country_code": "DZA"
        },
        {
            "display": "الطارف | El Tarf",
            "value": "ET",
            "country_code": "DZA"
        },
        {
            "display": "المدية | Mila",
            "value": "ML",
            "country_code": "DZA"
        },
        {
            "display": "المسيلة | Mascara",
            "value": "MC",
            "country_code": "DZA"
        },
        {
            "display": "النعامة | Naama",
            "value": "NA",
            "country_code": "DZA"
        },
        {
            "display": "الوادي | El Oued",
            "value": "EO",
            "country_code": "DZA"
        },
        {
            "display": "اليزي | Illizi",
            "value": "IL",
            "country_code": "DZA"
        },
        {
            "display": "باتنة | Batna",
            "value": "BT",
            "country_code": "DZA"
        },
        {
            "display": "بجاية | Béjaïa",
            "value": "BJ",
            "country_code": "DZA"
        },
        {
            "display": "برج بوعريريج | Bordj Bou Arréridj",
            "value": "BB",
            "country_code": "DZA"
        },
        {
            "display": "بسكرة | Biskra",
            "value": "BS",
            "country_code": "DZA"
        },
        {
            "display": "بشار | Béchar",
            "value": "BC",
            "country_code": "DZA"
        },
        {
            "display": "بومرداس | Boumerdès",
            "value": "BM",
            "country_code": "DZA"
        },
        {
            "display": "تبسة | Tébessa",
            "value": "TB",
            "country_code": "DZA"
        },
        {
            "display": "تسمسيلت | Tissemsilt",
            "value": "TS",
            "country_code": "DZA"
        },
        {
            "display": "تلمسان | Tlemcen",
            "value": "TL",
            "country_code": "DZA"
        },
        {
            "display": "تمنراست | Tamanrasset",
            "value": "TM",
            "country_code": "DZA"
        },
        {
            "display": "تندوف | Tindouf",
            "value": "TN",
            "country_code": "DZA"
        },
        {
            "display": "تيارت | Tiaret",
            "value": "TR",
            "country_code": "DZA"
        },
        {
            "display": "تيبازة | Tipaza",
            "value": "TP",
            "country_code": "DZA"
        },
        {
            "display": "تيزي وزو | Tizi Ouzou",
            "value": "TO",
            "country_code": "DZA"
        },
        {
            "display": "جيجل | Jijel",
            "value": "JJ",
            "country_code": "DZA"
        },
        {
            "display": "خنشلة | Khenchela",
            "value": "KH",
            "country_code": "DZA"
        },
        {
            "display": "سطيف | Sétif",
            "value": "SF",
            "country_code": "DZA"
        },
        {
            "display": "سعيدة | Saïda",
            "value": "SD",
            "country_code": "DZA"
        },
        {
            "display": "سكيكدة | Skikda",
            "value": "SK",
            "country_code": "DZA"
        },
        {
            "display": "سوق أهراس | Souk Ahras",
            "value": "SA",
            "country_code": "DZA"
        },
        {
            "display": "سيدي بلعباس | Sidi Bel Abbès",
            "value": "SB",
            "country_code": "DZA"
        },
        {
            "display": "عنابة | Annaba",
            "value": "AN",
            "country_code": "DZA"
        },
        {
            "display": "عين الدفلى | Aïn Defla",
            "value": "AD",
            "country_code": "DZA"
        },
        {
            "display": "عين تموشنت | Aïn Témouchent",
            "value": "AT",
            "country_code": "DZA"
        },
        {
            "display": "غرداية | Ghardaïa",
            "value": "GR",
            "country_code": "DZA"
        },
        {
            "display": "غليزان | Relizane",
            "value": "RE",
            "country_code": "DZA"
        },
        {
            "display": "قالمة | Guelma",
            "value": "GL",
            "country_code": "DZA"
        },
        {
            "display": "قسنطينة | Constantine",
            "value": "CO",
            "country_code": "DZA"
        },
        {
            "display": "مستغانم | Msila",
            "value": "MS",
            "country_code": "DZA"
        },
        {
            "display": "معسكر | Médéa",
            "value": "MD",
            "country_code": "DZA"
        },
        {
            "display": "ميلة | Mostaganem",
            "value": "MG",
            "country_code": "DZA"
        },
        {
            "display": "ورقلة | Ouargla",
            "value": "OG",
            "country_code": "DZA"
        },
        {
            "display": "وهران | Oran",
            "value": "OR",
            "country_code": "DZA"
        },
        {
            "display": "Ḩajjah",
            "value": "HJ",
            "country_code": "YEM"
        },
        {
            "display": "Ḩalab",
            "value": "HL",
            "country_code": "SYR"
        },
        {
            "display": "Ḩamāh",
            "value": "HM",
            "country_code": "SYR"
        },
        {
            "display": "Ḩawallī",
            "value": "HA",
            "country_code": "KWT"
        },
        {
            "display": "Ḩaḑramawt",
            "value": "HD",
            "country_code": "YEM"
        },
        {
            "display": "Ḩimş",
            "value": "HI",
            "country_code": "SYR"
        },
        {
            "display": "Ḩā'il",
            "value": "06",
            "country_code": "SAU"
        },
        {
            "display": "‘Adan",
            "value": "AD",
            "country_code": "YEM"
        },
        {
            "display": "‘Ajmān",
            "value": "AJ",
            "country_code": "ARE"
        },
        {
            "display": "‘Amrān",
            "value": "AM",
            "country_code": "YEM"
        },
        {
            "display": "三重県 | Mie",
            "value": "三重県",
            "country_code": "JPN"
        },
        {
            "display": "京都府 | Kyoto",
            "value": "京都府",
            "country_code": "JPN"
        },
        {
            "display": "佐賀県 | Saga",
            "value": "佐賀県",
            "country_code": "JPN"
        },
        {
            "display": "兵庫県 | Hyōgo",
            "value": "兵庫県",
            "country_code": "JPN"
        },
        {
            "display": "北海道 | Hokkaido",
            "value": "北海道",
            "country_code": "JPN"
        },
        {
            "display": "千葉県 | Chiba",
            "value": "千葉県",
            "country_code": "JPN"
        },
        {
            "display": "和歌山県 | Wakayama",
            "value": "和歌山県",
            "country_code": "JPN"
        },
        {
            "display": "埼玉県 | Saitama",
            "value": "埼玉県",
            "country_code": "JPN"
        },
        {
            "display": "埼玉県 | Shiga",
            "value": "埼玉県",
            "country_code": "JPN"
        },
        {
            "display": "大分県 | Ōita",
            "value": "大分県",
            "country_code": "JPN"
        },
        {
            "display": "奈良県 | Nara",
            "value": "奈良県",
            "country_code": "JPN"
        },
        {
            "display": "宮城県 | Miyagi",
            "value": "宮城県",
            "country_code": "JPN"
        },
        {
            "display": "宮崎県 | Miyazaki",
            "value": "宮崎県",
            "country_code": "JPN"
        },
        {
            "display": "富山県 | Toyama",
            "value": "富山県",
            "country_code": "JPN"
        },
        {
            "display": "山口県 | Yamaguchi",
            "value": "山口県",
            "country_code": "JPN"
        },
        {
            "display": "山形県 | Yamagata",
            "value": "山形県",
            "country_code": "JPN"
        },
        {
            "display": "山梨県 | Yamanashi",
            "value": "山梨県",
            "country_code": "JPN"
        },
        {
            "display": "岐阜県 | Gifu",
            "value": "岐阜県",
            "country_code": "JPN"
        },
        {
            "display": "岡山県 | Okayama",
            "value": "岡山県",
            "country_code": "JPN"
        },
        {
            "display": "岩手県 | Iwate",
            "value": "岩手県",
            "country_code": "JPN"
        },
        {
            "display": "島根県 | Shimane",
            "value": "島根県",
            "country_code": "JPN"
        },
        {
            "display": "広島県 | Hiroshima",
            "value": "広島県",
            "country_code": "JPN"
        },
        {
            "display": "徳島県 | Tokushima",
            "value": "徳島県",
            "country_code": "JPN"
        },
        {
            "display": "愛媛県 | Ehime",
            "value": "愛媛県",
            "country_code": "JPN"
        },
        {
            "display": "愛知県 | Aichi",
            "value": "愛知県",
            "country_code": "JPN"
        },
        {
            "display": "新潟県 | Niigata",
            "value": "新潟県",
            "country_code": "JPN"
        },
        {
            "display": "東京都 | Tokyo",
            "value": "東京都",
            "country_code": "JPN"
        },
        {
            "display": "栃木県 | Tochigi",
            "value": "栃木県",
            "country_code": "JPN"
        },
        {
            "display": "沖縄県 | Okinawa",
            "value": "沖縄県",
            "country_code": "JPN"
        },
        {
            "display": "沖縄県 | Ōsaka",
            "value": "沖縄県",
            "country_code": "JPN"
        },
        {
            "display": "熊本県 | Kumamoto",
            "value": "熊本県",
            "country_code": "JPN"
        },
        {
            "display": "石川県 | Ishikawa",
            "value": "石川県",
            "country_code": "JPN"
        },
        {
            "display": "神奈川県 | Kanagawa",
            "value": "神奈川県",
            "country_code": "JPN"
        },
        {
            "display": "福井県 | Fukui",
            "value": "福井県",
            "country_code": "JPN"
        },
        {
            "display": "福岡県 | Fukuoka",
            "value": "福岡県",
            "country_code": "JPN"
        },
        {
            "display": "福島県 | Fukushima",
            "value": "福島県",
            "country_code": "JPN"
        },
        {
            "display": "秋田県 | Akita",
            "value": "秋田県",
            "country_code": "JPN"
        },
        {
            "display": "群馬県 | Gunma",
            "value": "群馬県",
            "country_code": "JPN"
        },
        {
            "display": "茨城県 | Ibaraki",
            "value": "茨城県",
            "country_code": "JPN"
        },
        {
            "display": "長崎県 | Nagasaki",
            "value": "長崎県",
            "country_code": "JPN"
        },
        {
            "display": "長野県 | Nagano",
            "value": "長野県",
            "country_code": "JPN"
        },
        {
            "display": "青森県 | Aomori",
            "value": "青森県",
            "country_code": "JPN"
        },
        {
            "display": "静岡県 | Shizuoka",
            "value": "静岡県",
            "country_code": "JPN"
        },
        {
            "display": "香川県 | Kagawa",
            "value": "香川県",
            "country_code": "JPN"
        },
        {
            "display": "高知県 | Kōchi",
            "value": "高知県",
            "country_code": "JPN"
        },
        {
            "display": "鳥取県 | Tottori",
            "value": "鳥取県",
            "country_code": "JPN"
        },
        {
            "display": "鹿児島県 | Kagoshima",
            "value": "鹿児島県",
            "country_code": "JPN"
        }
    ];


export const GetDisplayContinent = (code) => {
    if (isEmpty(code))
        return '';
    // @ts-ignore
    return CONTINENT_CODES.find(i => i.value === code).display;
}



export const GetDisplayCountry = (code) => {
    if (isEmpty(code))
        return '';
    // @ts-ignore
    return COUNTRY_CODES.find(i => i.value === code).display;
}

export const GetDisplayState = (c_code : string, code : string) => {
    if (isEmpty(c_code))
        return '';
    if (isEmpty(code))
        return '';
    // @ts-ignore
    return STATE_CODES.find(i => i.value === code && i.country_code === c_code).display;
}