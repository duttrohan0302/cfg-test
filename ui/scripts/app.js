var uiINIT = true;
var scrollupadd=false;
function createCookie(e, t, n) {if (n) {var o = new Date;o.setTime(o.getTime() + 24 * n * 60 * 60 * 1e3);var r = "; expires=" + o.toGMTString()} else var r = "";document.cookie = e + "=" + t + r + "; path=/"}
function readCookie(e) {for (var t = e + "=", n = document.cookie.split(";"), o = 0; o < n.length; o++) {for (var r = n[o];" " == r.charAt(0);) r = r.substring(1, r.length);if (0 == r.indexOf(t)) return r.substring(t.length, r.length)}return null}
function eraseCookie(e) {createCookie(e, "", -1)}
function _(id) {
  return document.getElementById(id);
}

function updateLocalStorage(p, id) {
  localStorage.setItem(p, _(id).value);
  return true;
}

function getLocalStorage(p) {
  return localStorage.getItem(p);
}

function removeLocalStorage(p) {
  localStorage.removeItem(p);
  return true;
}

function clearLocalStorage() {
  localStorage.clear();
  return true;
}

function checkForUserAuth(send_WalkThrough, send_Dashboard){
  localStorage.setItem("UserCheck", "PRESET");
  if (readCookie("PatialaCity_DeviceAuth")!=null) {
    if (readCookie("PatialaCity_DeviceAuth_Check")!=null) {
      var o = new Date;
      var t = o.setTime(o.getTime() + 30 * 60 * 1e3); // 30 min ahead of time
      if (readCookie("PatialaCity_DeviceAuth_Check")>=t) {
        // Device Auth is Valid : Go for redirection;
        localStorage.setItem("UserCheck", true);
      }else {
        // Device Auth has expired, re check auth...
        var api_URL = 'https://captain.patiala.city/api/auth.php';
        var authToken = readCookie("PatialaCity_DeviceAuth");
        $.ajax({
            type: 'POST',
            crossDomain: true,
            url: api_URL,
            data: {
              'data': 'CheckUserAuth',
              'authToken': authToken,
            },
            success: function(data) {
                data = JSON.parse(data);
                if(data=="true"){
                  localStorage.setItem("UserCheck", true);
                  var o2 = new Date;
                  var t2 = o2.setTime(o2.getTime() + 24 * 3 * 60 * 60 * 1e3); // 3 days ahead of time
                  createCookie("PatialaCity_DeviceAuth_Check", t2, 3);
                }else {
                  localStorage.setItem("UserCheck", false);
                }
              }
          });
      }
    }else {
      // Something went wrong, Re-Register Device
      // User Device Auth is out of coverage...
      localStorage.setItem("UserCheck", false);
      clearLocalStorage();
      eraseCookie("PatialaCity_DeviceAuth");
      eraseCookie("PatialaCity_DeviceAuth_Check");
    }
  }else {
    localStorage.setItem("UserCheck", false);
  }
  while (getLocalStorage("UserCheck")==="PRESET") {
    console.log("Waiting :-> "+getLocalStorage("UserCheck"));
  }
  var test = getLocalStorage("UserCheck");
  //removeLocalStorage("UserCheck");
  if (test=="true") {
    if (send_Dashboard) {
      window.location='dashboard.html';
    }
  }else {
    if (send_WalkThrough) {
      clearLocalStorage();
      eraseCookie("PatialaCity_DeviceAuth");
      eraseCookie("PatialaCity_DeviceAuth_Check");
      window.location='index.html';
    }
  }
}

//COVID 19
function getData_Corona() {
  var api_URL = 'https://captain.patiala.city/api/Data_APP.php';
  var authToken = readCookie("PatialaCity_DeviceAuth");
  $.ajax({
      type: 'POST',
      crossDomain: true,
      url: api_URL,
      data: {
        'data': 'Corona',
        'authToken': authToken
      },
      success: function(data) {
        data = JSON.parse(data);
        // India
        _('Covid19_India_Confirmed').innerHTML=data[0]['Confirmed']+"<br>Positive";
        _('Covid19_India_Death').innerHTML=data[0]['Deaths']+"<br>Deaths";
        _('Covid19_India_Recovered').innerHTML=data[0]['Recovered']+"<br>Recovered";
        // Punjab
        _('Covid19_Punjab_Confirmed').innerHTML=data[1]['Confirmed']+"<br>Positive";
        _('Covid19_Punjab_Death').innerHTML=data[1]['Deaths']+"<br>Deaths";
        _('Covid19_Punjab_Recovered').innerHTML=data[1]['Recovered']+"<br>Recovered";
        //Patiala
        _('Covid19_Patiala_Confirmed').innerHTML=data[2]['Confirmed']+"<br>Positive";
        _('Covid19_Patiala_Death').innerHTML=data[2]['Deaths']+"<br>Deaths";
        _('Covid19_Patiala_Recovered').innerHTML=data[2]['Recovered']+"<br>Recovered";
        return true;
      }
    });
}

//NEWS
function getData_News(loc) {
  var api_URL = 'https://captain.patiala.city/api/Data_APP.php';
  //var api_URL = 'http://localhost/~ck/PatialaCity/PatialaCity_Backend/api/Data_APP.php';
  var authToken = readCookie("PatialaCity_DeviceAuth");
  var sendData, news_content="";
  _("Dashboard_News_Slider").innerHTML="We are fetching the latest headlines for you, Please Wait...";
  switch (loc) {
    case 'Dashboard':
      sendData = "News_Dashboard";
      break;

    default:
      return false;
  }
  $.ajax({
      type: 'POST',
      crossDomain: true,
      url: api_URL,
      data: {
        'authToken': authToken,
        'data': sendData
      },
      success: function(data) {
        data = JSON.parse(data);
        data.forEach((item, i) => {
          //i is index, item contains actual content...
          if (item.imageURL.length > 2) {
            finalImageUrl = item.imageURL;
          }else if(item.thumbnailURL.length >2 ) {
            finalImageUrl = item.thumbnailURL;
          }else {
            finalImageUrl = null;
          }
          if (finalImageUrl!=null) {
            imgurl = finalImageUrl.split("://");
            if (imgurl[0]=="http") {
              finalImageUrl="https://"+imgurl[1];
            }
          }
          if (item.story.length > 2) {
            news_content +="<div data-instant-id='instant-1' data-height='240' class='item caption caption-margins round-medium shadow-small'><div class='caption-top top-25 left-20'><h3 class='bolder color-white'>"+item.headLine+"</h3><p class='color-white opacity-90'>"+item.description.substring(0,100)+"...</p></div><div class='caption-bottom top-25 left-20'><p class='color-white font-11 opacity-70 top-15 bottom-5'><i class='far fa-calendar right-3'></i>"+item.timestamp+"</p><p class='under-heading color-white font-10 opacity-70'><i class='fa fa-user right-5'></i>Story By "+item.articleBy+"</p></div><div class='caption-bottom bottom-20 right-20'><a href='readnews.html#NANM/"+item.id+"' class='float-right bg-highlight button button-xs round-huge font-11 bottom-0 top-5'>Read More</a></div><div class='caption-bg' style='background-image:url("+finalImageUrl+")'></div><div class='caption-overlay bg-black opacity-75'></div></div>";
          }else {
            news_content +="<a href='"+item.articleURL+"' data-height='240' class='item caption caption-margins round-medium shadow-small'><div class='caption-center left-20'><h3 class='color-white bolder'>"+item.headLine+"</h3><p class='color-white under-heading bottom-0 opacity-60 right-30'>"+item.description.substring(0,100)+"...</p></div><div class='caption-center right-20'><div class='caption-center right-20'></div></div><div class='caption-bg' style='background-image:url("+finalImageUrl+")'></div><div class='caption-overlay bg-black opacity-75'></div></a>";
          }
        });
        _("Dashboard_News_Slider").innerHTML = "";
        _("Dashboard_News_Slider").innerHTML = news_content;
        uiINIT=true;
        //init_template();
      }
    });
}
function getData_News_Pinbord(offset) {
  offset = offset*10; // 10 results
  var api_URL = 'https://captain.patiala.city/api/Data_APP.php';
  //var api_URL = 'http://localhost/~ck/PatialaCity/PatialaCity_Backend/api/Data_APP.php';
  var authToken = readCookie("PatialaCity_DeviceAuth");
  var sendData, news_content="";
  $.ajax({
      type: 'POST',
      crossDomain: true,
      url: api_URL,
      data: {
        'authToken': authToken,
        'data': 'News_Pinboard',
        'offset' : offset
      },
      success: function(data) {
        data = JSON.parse(data);
        data.forEach((item, i) => {
          if (item.description.length<10) {
            shortText = item.story.substring(0,97)+"...";
          }else {
            shortText = item.description.substring(0,97)+"...";
          }
          if (item.headLine.length>70) {
            headline = item.headLine.substring(0,67)+"...";
          }else {
            headline = item.headLine;
          }
          if (item.imageURL.length > 2) {
            finalImageUrl = item.imageURL;
          }else if(item.thumbnailURL.length >2 ) {
            finalImageUrl = item.thumbnailURL;
          }else {
            finalImageUrl = null;
          }
          if (finalImageUrl != null) {
            imgurl = finalImageUrl.split("://");
            if (imgurl[0]=="http") {
              finalImageUrl="https://"+imgurl[1];
            }
          }
          if (item.story.length > 2) {
            finalStoryURL = "readnews.html#NANM/"+item.id;
          }else {
            finalStoryURL = item.articleURL;
          }
          _('newsPinboard').innerHTML+="<div data-height='240' class='item caption caption-margins round-medium shadow-small'><div class='caption-top top-25 left-20'><h3 class='bolder color-white'>"+headline+"</h3><p class='color-white opacity-90'>"+shortText+"</p></div><div class='caption-bottom top-25 left-20'><p class='color-white font-11 opacity-70 top-15 bottom-5'><i class='far fa-calendar right-3'></i>"+item.publicationDate+"</p><p class='under-heading color-white font-10 opacity-70'><i class='fa fa-user right-5'></i>By : "+item.articleBy+"</p></div><div class='caption-bottom bottom-20 right-20'><a href='"+finalStoryURL+"' class='float-right bg-highlight button button-xs round-huge font-11 bottom-0 top-5'>Read More</a></div><div class='caption-bg' style='background-image:url("+finalImageUrl+")'></div><div class='caption-overlay bg-black opacity-75'></div></div>";
          //console.log(item);
        });
        uiINIT=true;
        //init_template();
      }
    });
}
function getNewsContent(nid) {
  var api_URL = 'https://captain.patiala.city/api/Data_APP.php';
  //var api_URL = 'http://localhost/~ck/PatialaCity/PatialaCity_Backend/api/Data_APP.php';
  var authToken = readCookie("PatialaCity_DeviceAuth");
  $.ajax({
      type: 'POST',
      crossDomain: true,
      url: api_URL,
      data: {
        'authToken': authToken,
        'data': "NewsContent",
        'nid': nid
      },
      success: function(data) {
        data = JSON.parse(data);
        //console.log(data);
        data = data[0];
        if (data.imageURL.length > 2) {
          finalImageUrl = data.imageURL;
        }else if(data.thumbnailURL.length >2 ) {
          finalImageUrl = data.thumbnailURL;
        }else {
          finalImageUrl = null;
        }
        imgurl = finalImageUrl.split("://");
        if (imgurl[0]=="http") {
          finalImageUrl="https://"+imgurl[1];
        }
        _("NewsContent_ArticleImage").src=finalImageUrl;
        _("NewsContent_ArticleHeadline").innerHTML=data.headLine;
        _("NewsContent_ArticleStory").innerHTML=data.story;
        _("NewsContent_ArticleAuthor").innerHTML=data.articleBy;
        _("NewsContent_ArticleTimestamp").innerHTML="Article Published at<br>"+data.publicationDate;
        _("NewsContent_ArticleURL").href=data.articleURL;
        if (data.articleBy="Times Of India") {
          _("NewsContent_ArticleAuthorImage").src='images/toi.jpg';
        }
        //
        uiINIT=true;
        //init_template();
      }
    });
}
//NEWS End
//Blogs
function getData_Blog(loc) {
  var api_URL = 'https://captain.patiala.city/api/Data_APP.php';
  //var api_URL = 'http://localhost/~ck/PatialaCity/PatialaCity_Backend/api/Data_APP.php';
  var authToken = readCookie("PatialaCity_DeviceAuth");
  var sendData;
  switch (loc) {
    case 'Dashboard':
      sendData = "Blog_Dashboard";
      break;
    default:
      return false;
  }
  $.ajax({
      type: 'POST',
      crossDomain: true,
      url: api_URL,
      data: {
        'authToken': authToken,
        'data': sendData
      },
      success: function(data) {
        data = JSON.parse(data);
        data.forEach((item, i) => {
          //i is index, item contains actual content...
          _('Dashboard_Blogs_Slider_'+(i+1)+'_Title').innerHTML=item.title;
          _('Dashboard_Blogs_Slider_'+(i+1)+'_Time').innerHTML=item.timestamp.substring(0,10);
          //_('Dashboard_Blogs_Slider_'+(i+1)+'_Description').innerHTML=item.shortDescription;
          //_('Dashboard_Blogs_Slider_'+(i+1)+'_Author').innerHTML="<a href='blog.html#AID/"+item.AuthorID+"'>"+item.fullName+"</a>";
          _('Dashboard_Blogs_Slider_'+(i+1)+'_Author').innerHTML=item.fullName;
          _('Dashboard_Blogs_Slider_'+(i+1)+'_Image').style.backgroundImage="url('"+item.blogImage+"')";
          _('Dashboard_Blogs_Slider_'+(i+1)+'_URL').href="readblog.html#BID/"+item.BlogID;
        });
        uiINIT=true;
        //init_template();
      }
    });
}
function getData_Blogs_Pinbord(offset) {
  offset = offset*5; // 5 results
  var api_URL = 'https://captain.patiala.city/api/Data_APP.php';
  //var api_URL = 'http://localhost/~ck/PatialaCity/PatialaCity_Backend/api/Data_APP.php';
  var authToken = readCookie("PatialaCity_DeviceAuth");
  $.ajax({
      type: 'POST',
      crossDomain: true,
      url: api_URL,
      data: {
        'authToken': authToken,
        'data': 'Blogs_Pinboard',
        'offset' : offset
      },
      success: function(data) {
        data = JSON.parse(data);
        //console.log(data);
        data.forEach((item, i) => {
          _('blogsPinboard').innerHTML+="<div data-height='240' class='item caption caption-margins round-medium shadow-small'><div class='caption-top top-25 left-20'><h3 class='bolder color-white'>"+item.title+"</h3><p class='color-white opacity-90'>"+item.shortDescription+"</p></div><div class='caption-bottom top-25 left-20'><p class='color-white font-11 opacity-70 top-15 bottom-5'><i class='far fa-calendar right-3'></i>"+item.timestamp+"</p><p class='under-heading color-white font-10 opacity-70'><i class='fa fa-user right-5'></i>By : "+item.fullName+"</p></div><div class='caption-bottom bottom-20 right-20'><a href='readblog.html#BID/"+item.BlogID+"' class='float-right bg-highlight button button-xs round-huge font-11 bottom-0 top-5'>Read More</a></div><div class='caption-bg' style='background-image:url("+item.blogImage+")'></div><div class='caption-overlay bg-black opacity-75'></div></div>";
          //console.log(item);
        });
        uiINIT=true;
        //init_template();
      }
    });
}
function getData_Blog_By_CID(cid) {
  var api_URL = 'https://captain.patiala.city/api/Data_APP.php';
  //var api_URL = 'http://localhost/~ck/PatialaCity/PatialaCity_Backend/api/Data_APP.php';
  var authToken = readCookie("PatialaCity_DeviceAuth");
  $.ajax({
      type: 'POST',
      crossDomain: true,
      url: api_URL,
      data: {
        'authToken': authToken,
        'data' : "Blogs_By_CID",
        'cid' : cid
      },
      success: function(data) {
        //console.log(data);
        data = JSON.parse(data);
        data.forEach((item, i) => {
          switch (cid) {
            case 1:
              url = "readrecipe.html#RID/"+item.id;
              _('recipesPinboard').innerHTML+="<a href='"+url+"' data-height='150' class='caption caption-margins round-medium shadow-large'><div class='caption-center left-20'><p class='color-white under-heading center-text opacity-70' style='margin-bottom: 0px;'>"+item.fullName+"\'s</p><h1 class='color-white center-text bolder bottom-20'>"+item.title+"</h1></div><div class='caption-bottom right-20'><p class='center-text color-white opacity-20'>Tap here to View</p></div><div class='caption-bg' style='background-image:url("+item.blogImage+")'></div><div class='caption-overlay bg-black opacity-70'></div></a>"
              break;
            default:

          }
          /*

          */
        });
        uiINIT=true;
        //init_template();
      }
    });
}
function getTrendingElements() {
  var api_URL = 'https://captain.patiala.city/api/Data_APP.php';
  //var api_URL = 'http://localhost/~ck/PatialaCity/PatialaCity_Backend/api/Data_APP.php';
  var authToken = readCookie("PatialaCity_DeviceAuth");
  $.ajax({
      type: 'POST',
      crossDomain: true,
      url: api_URL,
      data: {
        'authToken': authToken,
        'data' : "TrendingElements"
      },
      success: function(data) {
        data = JSON.parse(data);
        _('Pinboard').innerHTML="";
        data.forEach((item, i) => {
          //console.log(item.blogCategoryID);
          if (item.blogCategoryID==1) {
            url = "readrecipe.html#RID/"+item.id;
            _('Pinboard').innerHTML+="<a href='"+url+"' data-height='150' class='caption caption-margins round-medium shadow-large'><div class='caption-center left-20'><p class='color-white under-heading center-text opacity-70' style='margin-bottom: 0px;'>"+item.fullName+"\'s</p><h1 class='color-white center-text bolder bottom-20'>"+item.title+"</h1></div><div class='caption-bottom right-20'><p class='center-text color-white opacity-20'>Tap here to View</p></div><div class='caption-bg' style='background-image:url("+item.blogImage+")'></div><div class='caption-overlay bg-black opacity-70'></div></a>"
          }else if(item.blogCategoryID==3){
            _('Pinboard').innerHTML+="<a href='poems.html#PID/"+item.id+"' data-height='150' class='caption caption-margins round-medium shadow-large'><div class='caption-center left-20'><h1 class='color-white bolder'>"+item.title+"</h1><p class='color-white under-heading bottom-0 opacity-60'>By "+item.fullName+"</p></div><div class='caption-center right-20'><i class='fa fa-arrow-right font-24 color-white opacity-40 float-right'></i></div><div class='caption-bg bg-10'></div><div class='caption-overlay bg-black opacity-90'></div></a>";
          }else if(item.blogCategoryID>=11){
            _('Pinboard').innerHTML+="<div data-height='240' class='item caption caption-margins round-medium shadow-small'><div class='caption-top top-25 left-20'><h3 class='bolder color-white'>"+item.title+"</h3><p class='color-white opacity-90'>"+item.shortDescription+"</p></div><div class='caption-bottom top-25 left-20'><p class='color-white font-11 opacity-70 top-15 bottom-5'><i class='far fa-calendar right-3'></i>"+item.timestamp+"</p><p class='under-heading color-white font-10 opacity-70'><i class='fa fa-user right-5'></i>By : "+item.fullName+"</p></div><div class='caption-bottom bottom-20 right-20'><a href='readblog.html#BID/"+item.BlogID+"' class='float-right bg-highlight button button-xs round-huge font-11 bottom-0 top-5'>Read More</a></div><div class='caption-bg' style='background-image:url("+item.blogImage+")'></div><div class='caption-overlay bg-black opacity-75'></div></div>";
          }
          /*

          */
        });
        uiINIT=true;
        //init_template();
      }
    });
}
function getBlogContent(bid) {
  var api_URL = 'https://captain.patiala.city/api/Data_APP.php';
  //var api_URL = 'http://localhost/~ck/PatialaCity/PatialaCity_Backend/api/Data_APP.php';
  var authToken = readCookie("PatialaCity_DeviceAuth");
  $.ajax({
      type: 'POST',
      crossDomain: true,
      url: api_URL,
      data: {
        'authToken': authToken,
        'data': "BlogContent",
        'bid': bid
      },
      success: function(data) {
        data = JSON.parse(data);
        //console.log(data);
        data = data[0];
        _("BlogContent_ArticleImage").src=data.blogImage;
        _("BlogContent_ArticleHeadline").innerHTML=data.title;
        _("BlogContent_ArticleStory").innerHTML=data.blogContent;
        _("BlogContent_ImageCredits").innerHTML="Image Credits : "+data.blogImageCredits;
        if (scrollupadd) {
          _("BlogContent_ArticleAuthorImage").src=data.blogImage;
          _("BlogContent_ArticleAuthor").innerHTML=data.fullName;
          _("BlogContent_ArticleTimestamp").innerHTML=data.title+"<br>Published on "+data.timestamp.substring(0,10);
        }
        uiINIT=true;
        //init_template();
      }
    });
}
function getData_City() {
  var api_URL = 'https://captain.patiala.city/api/Data_APP.php';
  var authToken = readCookie("PatialaCity_DeviceAuth");
  $.ajax({
      type: 'POST',
      crossDomain: true,
      url: api_URL,
      data: {
        'authToken': authToken,
        'data': "Blogs_By_CID",
        'cid': "2"
      },
      success: function(data) {
        data = JSON.parse(data);
        _('ExplorePatiala').innerHTML = "";
        data.forEach((item, i) => {
          //i is index, item contains actual content...
          _('ExplorePatiala').innerHTML+="<div class='bottom-40'><div class='caption round-medium shadow-large'><div class='caption-bottom'><h4 class='color-white center-text  bottom-40'>"+item.title+"</h4></div><div class='caption-overlay bg-gradient'></div><img class='caption-image owl-lazy' data-src='"+item.blogImage+"'></div><div class='under-slider-button'><a href='city.html#BID/"+item.id+"' class='button button-center-medium button-xs button-round-large bg-highlight shadow-large bottom-10'>Explore</a></div></div>";
        });
        uiINIT=true;
        //init_template();
      }
    });
}
//Blogs End

function updateUserData() {
  var api_URL = 'https://captain.patiala.city/api/auth.php';
  fullName = getLocalStorage('UserInputName');
  phonenumber = getLocalStorage('UserInputPhone');
  email = getLocalStorage('UserInputEmail');
  authToken = readCookie("PatialaCity_DeviceAuth");
  $.ajax({
      type: 'POST',
      crossDomain: true,
      url: api_URL,
      data: {
        'data': 'UpdateUserInformation',
        'authToken': authToken,
        'fullName': fullName,
        'phoneNumber': phonenumber,
        'emailAddress': email,
      }
    });
}

// Standing Live on Page ...
function StandingLive() {
  var api_URL = 'https://captain.patiala.city/api/auth.php';
  authToken = readCookie("PatialaCity_DeviceAuth");
  pageName = window.location.href.split('ty/');
  pageName = pageName[1];
  $.ajax({
      type: 'POST',
      crossDomain: true,
      url: api_URL,
      data: {
        'data': 'StandingLive',
        'authToken': authToken,
        'pageName': pageName,
      }
    });
}

setTimeout(function () {
  StandingLive();
}, 10*60*1000);
