const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const mainControl = require("./mainSchema");
const { v4: uuidv4 } = require("uuid");

router.post("/create", (req, res) => {
  const data = new mainControl({
    com: false,
    admin: req.body.admin,
    chrome: false,
    shutdown: false,
    restart: false,
    vsCode: false,
  });

  data.save().then((r) => {
    res.json(r);
  });
});

router.post("/", (req, res) => {
  const data = req.body;

  mainControl.findOne({ admin: data.admin }).then((r) => {
    if (r) {
      res.json(r);
    } else {
      res.json({
        status: 500,
        message: "no admin",
      });
    }
  });
});

router.put("/", (req, res) => {
  const data = req.body;
  const admin = data.admin;

  mainControl.findOne({ admin: admin }).then((r) => {
    if (r) {
      if (data.chrome === true) {
        mainControl
          .updateOne(
            { admin: r.admin },
            {$set: {chrome: true}}
          )
          .then((e) => {
            res.json({
              status: 200,
              message: "update chrome success",
            });

            console.log("chrome success");
          });
      }else if(data.shutdown === true) {
        mainControl
        .updateOne(
          { admin: r.admin },
          {$set: {shutdown: true}}
        )
        .then((e) => {
          res.json({
            status: 200,
            message: "update shutdown success",
          });

          console.log("shutdown success");
        });
      }else if(data.restart === true) {
        mainControl
        .updateOne(
          { admin: r.admin },
          {$set: {restart: true}}
        )
        .then((e) => {
          res.json({
            status: 200,
            message: "update shutdown success",
          });

          console.log("restart success");
        });
      }else if(data.vscode === true) {
            mainControl
            .updateOne(
            { admin: r.admin },
            {$set: {vsCode: true}}
            )
            .then((e) => {
            res.json({
                status: 200,
                message: "update shutdown success",
            });

            console.log("vsCode success");
            });
      }else if(data.com === true) {
        mainControl
        .updateOne(
        { admin: r.admin },
        {$set: {com: true}}
        )
        .then((e) => {
        res.json({
            status: 200,
            message: "update shutdown success",
        });

        console.log("com success");
        });
      }else {
        checkDelete(r)
      }
    } else {
      res.json({
        status: 500,
        message: "no admin",
      });
    }
  });




/////////////////////////////////////////////////////////////////////

  const checkDelete = (r) => {
    if(data.chrome === false) {
        mainControl.updateOne(
            {admin: admin},
            {$set: {chrome: false}}
        ).then(() => {
            res.json({
                status: 200,
                message: "update chrome success"
            })
        })




    }else if(data.shutdown === false) {
        mainControl.updateOne(
            {admin: admin},
            {$set: {shutdown: false}}
        ).then(() => {
            res.json({
                status: 200,
                message: "update shutdown success"
            })
        })




    }else if(data.restart === false) {
        mainControl.updateOne(
            {admin: admin},
            {$set: {restart: false}}
        ).then(() => {
            res.json({
                status: 200,
                message: "update restart success"
            })
        })


        
    }else if(data.vscode === false) {
        mainControl.updateOne(
            {admin: admin},
            {$set: {vsCode: false}}
        ).then(() => {
            res.json({
                status: 200,
                message: "update vscode success"
            })
        })
    }else if(data.com === false) {
      mainControl.updateOne(
          {admin: admin},
          {$set: {com: false}}
      ).then(() => {
          res.json({
              status: 200,
              message: "update com success"
          })
      })




  }
}

/////////////////////////////////////////////////////////////

});




router.delete('/', (req, res) => {
    const data = req.body;
    const admin = data.admin;

/////////////////////////////////////////////
    const checkDelete = (r) => {
        if(data.chrome === false) {
            mainControl.updateOne(
                {admin: admin},
                {$set: {chrome: false}}
            ).then(() => {
                res.json({
                    status: 200,
                    message: "update chrome success"
                })
            })




        }else if(data.shutdown === false) {
            mainControl.updateOne(
                {admin: admin},
                {$set: {shutdown: false}}
            ).then(() => {
                res.json({
                    status: 200,
                    message: "update shutdown success"
                })
            })
        }
    }

////////////////////////////////////////////

    console.log(admin)

  mainControl.findOne({ admin: admin }).then(r => {
    if(r) {
              checkDelete(r)
    }else{
        res.json({
            status: 500,
            message: "no admin"
        })
    }
  })
})

module.exports = router;
