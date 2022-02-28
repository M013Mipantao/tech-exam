const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const app = express();
const pool = require("./db");

app.use(express.json())
pool.connect();

let info = new Object;


// GET /top/confirmed
app.get("/top/confirmed",async(req,res) => {
    try {

        // SQL
        const search_date = req.query.observation_date; // format date 
        const limit_data = req.query.max_results; //limit of data to fetch
        const from_format = "'MM/DD/YYYY'";
        const to_format = "'YYYY-MM-DD'";

        const display_data = 'to_char(to_date("ObservationDate", '+from_format+'),'+to_format+') as observation_date,TRIM("CountryOrRegion") as country, "Confirmed" as confirmed, "Deaths" as deaths, "Recovered" as recovered';
        const where = 'WHERE to_char(to_date("ObservationDate",'+from_format+'),'+to_format+')';    
        const sql = "SELECT "+display_data+" FROM covid_observations "+ where +" = '"+search_date+"' LIMIT "+ limit_data;

        const alldata = await pool.query(sql)
        info.observation_date = req.query.observation_date;
        info.countries = alldata.rows; 
        res.json(info);


    } catch (err) {
        console.log(err.message);
    }

})

app.listen(3001,()=>{
    console.log("server is listening");
})