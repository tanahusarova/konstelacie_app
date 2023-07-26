var express = require('express');
var router = express.Router();
const cors = require('cors');
router.use(cors());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/members/:searchParams', (req, res) => {
  const searchParams = req.params.searchParams;
  fetch(`http://www.jusoft.sk/konstelacie/test/load.php?${searchParams}`, {
        mode: 'no-cors',
        headers: {
          'Accept': 'text/plain',
          'Content-Type': 'text/plain'
      }, 
        }).then(r => {
            console.log("som gete v backende "+ r);
            r.text()
            .then(t => {
              console.log("som v gete v backende v texte "+ t);
              res.send(t);
            })
            .catch(err => {
            console.log('je tu chyba a n tejto to pada');
            res.status(500);
        })
      })
      .catch(err => {
          console.log('je tu chyba a na tejto to pada');
          res.status(500);
        })  
})


router.post('/members/:searchParams', (req, res) => {
  const searchParams = req.params.searchParams;
  fetch(`http://www.jusoft.sk/konstelacie/test/save.php?${searchParams}`, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
        'Accept': 'text/plain',
        'Content-Type': 'text/plain'
    },
    body: `${req.body}`
})
  .then(response => {
    console.log("preslo");
    res.status(200).send(response);
  })
  .catch(error => {
    console.log(error);
    res.status(500).send(error);
  })
})

module.exports = router;
