const { app, BrowserWindow, ipcMain } = require("electron");
var sqlite3 = require("sqlite3").verbose(); //removing
var db = new sqlite3.Database("./mydb.db");
app.on("ready", () => {
  let win = new BrowserWindow({
    height: 800,
    width: 800,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      preload: __dirname + "/preload.js"
    }
  });

  win.loadURL("http://localhost:3000/");

  win.once("ready-to-show", () => {
    win.show();
  }); ///What's this yo?

  ipcMain.on("mainWindowLoaded", function() {
    let result = [{ id: 1, name: "test_event" }];

    win.webContents.send("resultSent", result);
  });
  // initSqlJs().then(async SQL => {

  // var db =  new SQL.Database(filebuffer);

  ipcMain.on("saveToDb", async function(data, x) {
    console.log(data, x, "L23>>");

   db.run(
      "INSERT INTO BALI ( 'id','serial_no','date','quantity','vehicle_no','capacity','dest_purchaser','dest_address','dest_district','dest_state') VALUES ('27-01-20WB53','WB215996445','27-01-20','100','WB53A3652','120','Shyama Das','Durgapur','Burdwan','West Bengal');"
    ,(err,res)=>{

		console.log(err,res);
	});

  });

  ipcMain.on("getFromDb", function(data, x) {
    console.log(data, x, "L50>>");

    db.all(`SELECT * FROM BALI where date=? `,x, (err, res) => {
      console.log(err, res,'L53>>');
    });
  });
  //   })
});

app.on("window-all-closed", () => {
  app.quit();
});
