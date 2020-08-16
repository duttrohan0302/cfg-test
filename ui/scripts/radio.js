function PlayRadio(id) {
  var file, title;
  switch (id) {
    case 'D1':
      title = "Radio Sai Bhajan";
      file = "http://stream.radiosai.net:8000/";
      break;
    case 'D2':
      title = "Radio Sai Asia";
      file = "http://stream.radiosai.net:8002/";
      break;
    case 'D3':
      title = "Live Kirtan";
      file = "http://live16.sgpc.net:8000/;nocache=889869";
      break;
    case 'D4':
      title = "Sukhsagar Radio";
      file = "http://edge-audio-03-gos2.sharp-stream.com/sukhsagar.mp3";
      break;

    case 'N1':
      title = "Akashwani India";
      file = "https://radioindia.net/radio/rainbow_radio/icecast.audio";
      break;
    case 'N2':
      title = "Akashwani Patiala";
      file = "https://radioindia.net/radio/air_patiala_radio/icecast.audio";
      break;
    case 'N3':
      title = "Aaj Tak Live";
       file = "https://lmil.pc.cdn.bitgravity.com/lmil/live/aajtak_150k/chunklist_ao.m3u8";
      break;
    case 'N4':
      title = "NDTV 24x7 Live";
      file = "https://ndtv24x7elemarchana.akamaized.net/hls/live/2003678/ndtv24x7/ndtv24x7master.m3u8";
      break;

    case 'PB1':
      title = "Radio Punjabi Today";
      file = "http://stream.zenolive.com/019324w4ez4tv";
      break;
    case 'PB2':
      title = "Radio City Punjabi";
      file = "http://prclive1.listenon.in:9302/";
      break;
    case 'PB3':
      title = "Radio Punjabi UK";
       file = "http://s1.voscast.com:7918//listen.pls?sid=1";
      break;
    case 'PB4':
      title = "Punjabi Songs";
      file = "https://s2.radio.co/sbb640c97c/listen";
      break;

    case 'ENG1':
      title = "Radio 538";
      file = "https://playerservices.streamtheworld.com/api/livestream-redirect/RADIO538.mp3";
      break;
    case 'ENG2':
      title = "Charts";
      file = "http://tuner.m1.fm/charts.mp3";
      break;

    case 'E1':
      title = "BIG 92.7 FM";
      file = "https://radioindia.net/radio/sc-bb/icecast.audio";
      break;
    case 'E2':
      title = "Vividh Bhatri";
      file = "https://radioindia.net/radio/vividhbharti/icecast.audio";
      break;
    case 'E3':
      title = "Radio City";
       file = "https://prclive1.listenon.in/";
      break;
    case 'E4':
      title = "Radio Masala";
      file = "http://akalmultimedia.net:8000/GDNSLDH";
      break;
    case 'E5':
      title = "Non Stop Hindi";
      file = " http://198.178.123.14:8216/;/";
      break;
    case 'E6':
      title = "90's Once Again";
       file = "https://radioindia.net/radio/hungama90/icecast.audio";
      break;
    case 'E7':
      title = "Gazals Live";
      file = "http://103.16.47.70:9666/live";
      break;
    case 'E8':
      title = "Mrichi Drive";
      file = "https://driveradio-lh.akamaihd.net/i/DriveRadio_1@793591/index_1_a-b.m3u8?sd=10&rebase=on";
      break;
    case 'E9':
      title = "Meethi Mirchi";
      file = "https://meethimirchihdl-lh.akamaihd.net/i/MeethiMirchiHDLive_1_1@320572/index_1_a-b.m3u8?sd=10&rebase=on";
      break;
    case 'E10':
      title = "Radio Mirchi";
      file = "https://radioindia.net/radio/mirchi98/icecast.audio";
      break;
  };
  var link = "mediaplayer.html?file="+file+"&poster=POSTER_URL&title="+title;
  _('RadioPlayer').src=link;
  _('RadioDiv').style.display="block";
  _('RadioInfo').style.display="none";
}
if (window.location.href.split('#RDI/').length==2) {
  var id = window.location.href.split('#RDI/');
  id = id[1];
  PlayRadio(id);
}
/*
Multi File Player
[{"title":"Serie1","file":"https://static.patiala.city/charts.mp3"},{"title":"Serie2","file":"https://ndtv24x7elemarchana.akamaized.net/hls/live/2003678/ndtv24x7/ndtv24x7master.m3u8"}]
*/
