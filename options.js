// Saves options to chrome.storage
function save_options() {

  var color  =  document.getElementById('color').value;
  var mlusr  =  document.getElementById('mlusr').value;
  var mldb   =  document.getElementById('mldb').value;
  var mlcl   =  document.getElementById('mlcl').value;
  var mlapi  =  document.getElementById('mlapi').value;

  var likesColor = document.getElementById('like').checked;

  chrome.storage.local.set( {
    favoriteColor: color,
    mluser:  mlusr,
    mlabdb:  mldb,
    mlabcl:  mlcl,
    mlabapi: mlapi,
    likesColor: likesColor

  }, function() {

    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';

    setTimeout(function() {
      status.textContent = '';
    }, 750);

  });
}


// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {

  // Use default value color = 'red' and likesColor = true.
  chrome.storage.local.get({

    favoriteColor: 'https://api.mongolab.com',
    mluser:  "",
    mlabdb:  mldb,
    mlabcl:  mlcl,
    mlabapi: mlapi,
    likesColor: true

  }, function(items) {

    document.getElementById('color').value   =  items.favoriteColor;
    document.getElementById('mlusr').value   =  items.mluser;
    document.getElementById('mldb').value    =  items.mlabdb;
    document.getElementById('mlcl').value    =  items.mlabcl;
    document.getElementById('mlapi').value   =  items.mlabapi;
    document.getElementById('like').checked  =  items.likesColor;

  });
}


function view_logs() {

  if ( navigator.onLine == false ) {
     return;
  }

  var i = 1;
  var tok, req, rsp, tik, tok, tln;	// add element

  // var base   =  "https://api.mongolab.com"
  var outs   =  document.getElementById('color').value;
  var mldb   =  document.getElementById('mldb').value;
  var mlcl   =  document.getElementById('mlcl').value;
  var mlapi  =  document.getElementById('mlapi').value;

  var url    =  outs + "/api/1/databases/" + mldb + "/collections/" + mlcl + "?apiKey=" + mlapi;

  var lbx    =  document.getElementById("logbx");
  lbx.setAttribute("style","height:500px;");


  req        =  new XMLHttpRequest();

  req.open("GET", url, false);
  req.send();

  rsp        =   req.responseText;
  ste        =   req.readyState;  // TODO: addif = 4
  sta        =   req.status;      // if = 200

  tok        =   rsp.split('seg" : "');
  tln        =   tok.length;

  // < IF
  lbx.innerHTML = "";

  while( i < tln +1 ) {
     tik            =  tok[i];
     tik            =  tik.split('"')[0];
     tik            =  atob( tik );

     if ( tik.length > 5 ) {
        tik = tik.replace("_PAGE", "</b><i><br>_PAGE");
        tik = tik.replace("_DATE", "<br>_DATE");
        tik = "_TEXT:<b> " + tik + "</i><br><br>"
        var div            =  document.createElement("div");
        div.class      =  "tok";
        div.innerHTML  =  tik;
        lbx.appendChild(div);
     }
     i++;
  }
}


function del_logs() {

  if ( navigator.onLine == false ) {
     return;
  }

  var i = 1;					// log iter count
  var tok, req, rsp, tik, tok, tln, url;        // del element

  var outs   =  document.getElementById('color').value;
  var mldb   =  document.getElementById('mldb').value;
  var mlcl   =  document.getElementById('mlcl').value;
  var mlapi  =  document.getElementById('mlapi').value;

  var uri    = "/api/1/databases/" + mldb + "/collections/" + mlcl;


  function mldel( oid ) {
     url = outs + uri + "/" + oid + "?apiKey=" + mlapi;
     req = new XMLHttpRequest();
     req.open("DELETE", url, false);
     req.send();
     console.log(req.responseText);
  }

  url = outs + uri + "?apiKey=" + mlapi;
  console.log("url " + url);

  req = new XMLHttpRequest();
  req.open("GET", url, false);
  req.send();

  rsp = req.responseText;

  console.log("state "   + req.readyState);
  console.log("status "  + req.status);
  console.log("rsp " + rsp);

  tok = rsp.split('oid" : "');
  tln = tok.length;

   while( i < tln ) {
     tik = tok[i];
     var oid = tik.split('"')[0];
     console.log("oid " + oid);
     mldel( oid );
     i++;
  }

  var lbx    =  document.getElementById("logbx");
  lbx.innerHTML = "";
  lbx.setAttribute("style","height:250px;");

}


function opn_help() {
  window.open("https://gtfo-sync.appspot.com/help", "_blank");
}


function opn_donate() {
  window.open("https://gtfo-sync.appspot.com/donate", "_blank");
}


document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('viewlog').addEventListener('click', view_logs);
document.getElementById('dellog').addEventListener('click', del_logs);
document.getElementById('help').addEventListener('click', opn_help);
document.getElementById('donate').addEventListener('click', opn_donate)

chrome.browserAction.onClicked.addListener(function(tab) {
   window.open("options.html", "_blank");
   //chrome.tabs.executeScript(null, {file: "testScript.js"});
});
