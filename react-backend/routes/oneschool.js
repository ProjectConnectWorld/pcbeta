var express = require('express');
var router = express.Router();
const {
  Pool,
  Client
} = require('pg')


const forward_get = (req, res) => {
  console.log("PROBEID");
  console.log(req.params.probeid);
  var responce;

  // const pool = new Pool({
  //   user: 'meduxuser',
  //   host: 'medux.cfgu4j693vym.us-east-2.rds.amazonaws.com',
  //   database: 'medux',
  //   password: 'meduxpass',
  //   port: 5432,
  // })
  //
  // pool.query("SELECT * FROM public.daily_aggregation WHERE id_probe='" +req.params.probeid + "' ORDER BY date ", (err, res) => {
  //   //console.log(err, res)
  //   console.log(res);
  //   pool.end()
  // })

  const client = new Client({
    user: 'meduxuser',
    host: 'medux.cfgu4j693vym.us-east-2.rds.amazonaws.com',
    database: 'medux',
    password: 'meduxpass',
    port: 5432,
  })
  client.connect();

  client.query("SELECT * FROM daily_aggregation WHERE id_probe='" +req.params.probeid.toLowerCase() + "' ORDER BY date ", (err_s, res_s) => {
    //console.log(err, res)
    //console.log(res.rows[0].ping_avg_day);
    res.send(res_s.rows);
    client.end();
  })
  // console.log("resp: ", responce);
  // res.send(responce)

}








// If the request is a schools request then it forwards the request to forward_get
/* GET users listing. */
router.get('/:probeid', forward_get);

module.exports = router;
