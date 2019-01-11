<!DOCTYPE html>
<html>
  <head>
     <title>My Test Extension Options</title>
     <style>
        .segm {
          display: inline;
          margin-bottom: 1em;
        }
        .txtbx {
           display: inline;
           color: green;
           text-align: center;
           float:right;
         }

     </style>
  </head>
<body>

<div style="width:80%;margin-left:10%;">

  <div id="segm">
  Output Server:  
    <select id="outtxt" style="float:right;">
    <option value="mongolab">mongolab</option>
    <option value="custom-server">custom</option>
  </select></div><br><br>

  <div id="segm">USER:<center style="display:inline;"><input id="mlusr" class="txtbx" type="text"></input><center></div><br>

  <div id="segm">DATABASE:
     <input id="mldb" class="txtbx" type="text"></input></div><br>

  <div id="segm">COLLECTION:
     <input id="mlcl" class="txtbx" type="text"></input></div><br>

  <div id="segm">API-KEY:
     <input id="mlapi" class="txtbx" type="text"></input></div><br>

  <br>
  <label>
     <input type="checkbox" id="like">
     I LOVE LAMP!
  </label>

  <div id="status"></div>
  <button id="save">Save</button>

</div>
</div>
<script src="options.js"></script>
</body>
</html>
