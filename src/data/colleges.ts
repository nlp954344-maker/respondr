/**
 * RespondR – Assam Campus Merch Survey
 * Colleges Data (All 35 Districts of Assam)
 *
 * This file maps each district of Assam to an array of college/university names.
 * You can easily edit or expand the list of colleges for any district below.
 * The frontend UI automatically handles searching, autocomplete filtering,
 * and always includes "My college isn't listed" for custom entries.
 */

export const ASSAM_DISTRICTS = [
  "Bajali",
  "Baksa",
  "Barpeta",
  "Biswanath",
  "Bongaigaon",
  "Cachar",
  "Charaideo",
  "Chirang",
  "Darrang",
  "Dhemaji",
  "Dhubri",
  "Dibrugarh",
  "Dima Hasao",
  "Goalpara",
  "Golaghat",
  "Hailakandi",
  "Hojai",
  "Jorhat",
  "Kamrup",
  "Kamrup Metropolitan",
  "Karbi Anglong",
  "Kokrajhar",
  "Lakhimpur",
  "Majuli",
  "Morigaon",
  "Nagaon",
  "Nalbari",
  "Sivasagar",
  "Sonitpur",
  "South Salmara-Mankachar",
  "Sribhumi (Karimganj)",
  "Tamulpur",
  "Tinsukia",
  "Udalguri",
  "West Karbi Anglong"
] as const;

export type AssamDistrict = typeof ASSAM_DISTRICTS[number];

export const DISTRICT_COLLEGES: Record<string, string[]> = {
  "Bajali": [
    "Bhattadev University, Pathsala",
    "Bajali College, Pathsala",
    "Barpeta Road Girls' College",
    "Anundoram Borooah Academy Degree College, Pathsala",
    "Nirmal Haloi College, Patacharkuchi"
  ],
  "Baksa": [
    "Barama College, Barama",
    "Dhamdhama Anchalik College",
    "Tamulpur Degree College",
    "Goreswar College, Goreswar",
    "Salbari College, Salbari"
  ],
  "Barpeta": [
    "Barpeta Girls' College",
    "M.C. College (Madhob Choudhury), Barpeta",
    "B.H. College (Barnagar), Howly",
    "Nabajyoti College, Kalgachia",
    "Bapujee College, Sarukshetri",
    "Fakhruddin Ali Ahmed Medical College (FAAMC), Barpeta"
  ],
  "Biswanath": [
    "Biswanath College, Chariali",
    "Biswanath College of Agriculture (AAU)",
    "Chaiduar College, Gohpur",
    "Behali Degree College",
    "Gohpur Girls' College"
  ],
  "Bongaigaon": [
    "Bongaigaon College, Bongaigaon",
    "Birjhora Mahavidyalaya (Science College), Bongaigaon",
    "Bongaigaon Polytechnic Institute",
    "Abhayapuri College, Abhayapuri",
    "Bijni College, Bijni"
  ],
  "Cachar": [
    "Assam University (Central University), Silchar",
    "National Institute of Technology (NIT), Silchar",
    "Silchar Medical College & Hospital (SMCH)",
    "Cachar College, Silchar",
    "Gurucharan College (G.C. College), Silchar",
    "Radhamadhab College, Silchar",
    "Women's College, Silchar"
  ],
  "Charaideo": [
    "Sonari College, Sonari",
    "Moran College, Moranhat",
    "Sapekhati College",
    "Borhat BPB Memorial College"
  ],
  "Chirang": [
    "Basugaon College, Basugaon",
    "Bijni College, Bijni",
    "Bengtol College, Bengtol",
    "Upendra Nath Brahma College, Kajalgaon"
  ],
  "Darrang": [
    "Mangaldai College, Mangaldai",
    "Mangaldai Commerce College",
    "Sipajhar College, Sipajhar",
    "Kharupetia College, Kharupetia",
    "Deomornoi Degree College"
  ],
  "Dhemaji": [
    "Dhemaji College, Dhemaji",
    "Dhemaji Commerce College",
    "Silapathar College, Silapathar",
    "Silapathar Science College",
    "Jonai Science College, Jonai",
    "Simen Chapari College"
  ],
  "Dhubri": [
    "Bholanath College (B.N. College), Dhubri",
    "Dhubri Girls' College",
    "Dhubri Law College",
    "Chilarai College, Golakganj",
    "Bilasipara College, Bilasipara",
    "Sapatgram College, Sapatgram"
  ],
  "Dibrugarh": [
    "Dibrugarh University (DU), Dibrugarh",
    "Assam Medical College & Hospital (AMCH), Dibrugarh",
    "D.H.S.K. College (Hanumanbax Surajmall Kanoi), Dibrugarh",
    "D.H.S.K. Commerce College, Dibrugarh",
    "M.D.K. Girls' College, Dibrugarh",
    "Duliajan College, Duliajan",
    "Naharkatiya College, Naharkatiya",
    "Khowang College, Khowang"
  ],
  "Dima Hasao": [
    "Haflong Government College, Haflong",
    "J.B. Hagjer Degree College, Umrangso",
    "Maibang Degree College, Maibang"
  ],
  "Goalpara": [
    "Goalpara College, Goalpara",
    "Dudhnoi College, Dudhnoi",
    "Bikali College, Dhupdhara",
    "West Goalpara College, Ambari",
    "Habraghat Mahavidyalaya, Krishnai"
  ],
  "Golaghat": [
    "Debraj Roy College (D.R. College), Golaghat",
    "Golaghat Commerce College",
    "H.P.B. Girls' College, Golaghat",
    "DKD College (Dergaon Kamal Dowerah), Dergaon",
    "Sarupathar College, Sarupathar",
    "Kamargaon College, Kamargaon",
    "Bokakhat College, Bokakhat"
  ],
  "Hailakandi": [
    "S.S. College (Srikishan Sarda), Hailakandi",
    "Hailakandi Women's College",
    "Lala Rural College, Lala",
    "A.K. Chanda Law College"
  ],
  "Hojai": [
    "Rabindranath Tagore University, Hojai",
    "Hojai College, Hojai",
    "Lanka Mahavidyalaya, Lanka",
    "Lumding College, Lumding",
    "Haji Anfar Ali College, Doboka"
  ],
  "Jorhat": [
    "Assam Agricultural University (AAU), Jorhat",
    "Jorhat Engineering College (JEC), Garmur",
    "Jagannath Barooah College (J.B. College Autonomous), Jorhat",
    "Jorhat Institute of Science & Technology (JIST)",
    "C.K.B. Commerce College, Jorhat",
    "D.C.B. Girls' College, Jorhat",
    "Bahona College, Bahona",
    "Mariani College, Mariani",
    "Kakojan College, Kakojan",
    "N.N. Saikia College, Titabar"
  ],
  "Kamrup": [
    "Indian Institute of Technology (IIT) Guwahati, Amingaon",
    "Assam Engineering College (AEC), Jalukbari",
    "Gauhati University (GU), Jalukbari",
    "Sualkuchi Budram Madhab Satradhikar College, Sualkuchi",
    "Rangia College, Rangia",
    "Hajo S.B.S.K. College, Hajo",
    "Saraighat College, Changsari",
    "Dakshin Kamrup College, Mirza",
    "Chhaygaon College, Chhaygaon",
    "Boko J.N. College, Boko"
  ],
  "Kamrup Metropolitan": [
    "Cotton University, Panbazar",
    "Assam Engineering College (AEC), Jalukbari",
    "Gauhati University, Jalukbari",
    "Indian Institute of Technology (IIT) Guwahati",
    "All India Institute of Medical Sciences (AIIMS) Guwahati",
    "Gauhati Medical College & Hospital (GMCH)",
    "National Law University and Judicial Academy (NLUJAA)",
    "Assam down town University (AdtU), Panikhaiti",
    "Royal Global University (RGU), Betkuchi",
    "Girijananda Chowdhury University (GCU), Azara",
    "B. Borooah College, Ulubari",
    "Handique Girls' College, Dighalipukhuri",
    "Arya Vidyapeeth College (Autonomous), Gopinath Nagar",
    "Pandu College, Maligaon",
    "K.C. Das Commerce College, Chatribari",
    "Pragjyotish College, Santipur",
    "Dispur College, Dispur",
    "Lalit Chandra Bharali College (LCBC), Maligaon",
    "NERIM Group of Institutions, Khanapara",
    "Guwahati Commerce College (GCC), R.G. Baruah Road",
    "West Guwahati Commerce College, Maligaon",
    "S.B. Deorah College, Bora Service",
    "Gauhati Commerce College, Zoo Road"
  ],
  "Karbi Anglong": [
    "Diphu Government College, Diphu",
    "Eastern Karbi Anglong College, Sarihajan",
    "Rangsina College, Dongkamukam",
    "Thong Nokbe College, Dokmoka"
  ],
  "Kokrajhar": [
    "Bodoland University, Deborgaon",
    "Central Institute of Technology (CIT), Kokrajhar",
    "Kokrajhar Government College, Kokrajhar",
    "Science College, Kokrajhar",
    "Commerce College, Kokrajhar",
    "Gossaigaon College, Gossaigaon"
  ],
  "Lakhimpur": [
    "North Lakhimpur College (Autonomous), Khelmati",
    "Lakhimpur Commerce College, North Lakhimpur",
    "Lakhimpur Girls' College",
    "Lakhimpur Medical College & Hospital (LMCH)",
    "Dhakuakhana College, Dhakuakhana",
    "Bihpuria College, Bihpuria",
    "Madhabdev University, Narayanpur",
    "L.T.K. College, Azad"
  ],
  "Majuli": [
    "Majuli University of Culture, Garamur",
    "Jengraimukh College, Jengraimukh",
    "Majuli College, Kamalabari",
    "Rangachahi College, Majuli",
    "Pitambardev Goswami College, Garamur"
  ],
  "Morigaon": [
    "Morigaon College, Morigaon",
    "Mayang Anchalik College, Rajamayang",
    "Jagiroad College, Jagiroad",
    "Bhuragaon College, Bhuragaon",
    "Lahorighat College, Lahorighat"
  ],
  "Nagaon": [
    "Nowgong College (Autonomous), Nagaon",
    "Nagaon Medical College & Hospital (NMCH)",
    "Anandaram Dhekial Phookan College (ADP College), Nagaon",
    "Nowgong Girls' College, Nagaon",
    "Khagarijan College, Nagaon",
    "Kaliabor College, Kuwaritol",
    "Dhing College, Dhing",
    "Raha College, Raha",
    "Dr. B.K.B. College, Puranigudam"
  ],
  "Nalbari": [
    "Kumar Bhaskar Varma Sanskrit & Ancient Studies University",
    "Nalbari College, Nalbari",
    "Nalbari Commerce College",
    "M.N.C. Balika Mahavidyalaya, Nalbari",
    "Barbhag College, Kalag",
    "Tihu College, Tihu",
    "Barkhetri College, Mukalmua",
    "Kamrup College, Chamata"
  ],
  "Sivasagar": [
    "Sibsagar College (Autonomous), Joysagar",
    "Sibsagar Commerce College, Sivasagar",
    "Sibsagar Girls' College, Sivasagar",
    "Gargaon College, Simaluguri",
    "Amguri College, Amguri",
    "Demow College, Demow",
    "Nazira College, Nazira",
    "Bir Lachit Borphukan College, Sivasagar"
  ],
  "Sonitpur": [
    "Tezpur University (Central University), Napaam",
    "Tezpur Medical College & Hospital (TMCH), Bihaguri",
    "Darrang College, Tezpur",
    "Tezpur College, Tezpur",
    "L.O.K.D. College, Dhekiajuli",
    "THB College (Tyagbir Hem Baruah), Jamugurihat",
    "Rangapara College, Rangapara"
  ],
  "South Salmara-Mankachar": [
    "Mankachar College, Mankachar",
    "Hatsingimari College, Hatsingimari",
    "South Salmara College"
  ],
  "Sribhumi (Karimganj)": [
    "Karimganj College, Karimganj",
    "Rabindrasadan Girls' College, Karimganj",
    "Nilambazar College, Nilambazar",
    "Patherkandi College, Patherkandi",
    "Ramkrishna Nagar College, R.K. Nagar"
  ],
  "Tamulpur": [
    "Tamulpur Degree College, Tamulpur",
    "Goreswar College, Goreswar",
    "Nagrijuli College, Nagrijuli",
    "Kumarikata College"
  ],
  "Tinsukia": [
    "Tinsukia College, Tinsukia",
    "Tinsukia Commerce College",
    "Women's College, Tinsukia",
    "Digboi College, Digboi",
    "Digboi Mahila Mahavidyalaya",
    "Margherita College, Margherita",
    "Doomdooma College, Doomdooma",
    "Sadiya College, Chapakhowa"
  ],
  "Udalguri": [
    "Udalguri College, Udalguri",
    "Tangla College, Tangla",
    "Mazbat College, Mazbat",
    "Kalaigaon College, Kalaigaon",
    "Rowta Degree College, Rowta"
  ],
  "West Karbi Anglong": [
    "Kheroni Degree College, Kheroni",
    "Hamren Government College, Hamren",
    "Baithalangso College, Baithalangso"
  ]
};

export const CUSTOM_COLLEGE_OPTION = "My college isn't listed";
