const router = require('express').Router();
let Health = require('../models/health.model');

// home
router.route('/').get((req, res)=> {

    Health.find()
        .then(health => res.json(health))
        .catch(err => res.status(400).json('Error :' + err));

});

// add
router.route('/add').post((req, res)=> {

    const fullname = req.body.fullname;
    const temperature = req.body.temperature;
    const email = req.body.email;
    const phonenumber = req.body.phonenumber;

    const newHealthDeclaration = new Health({fullname, temperature, email, phonenumber});

    newHealthDeclaration.save()
        .then(health => res.json('New Record Added!'))
        .catch(err => res.status(400).json('Error :' + err));

});


// details
router.route('/:id').get((req, res)=> {
    Health.findById(req.params.id)
    .then(health => res.json(health))
    .catch(err => res.status(400).json('Error: '+ err));
});

// delete
router.route('/:id').delete((req, res)=> {
    Health.findByIdAndDelete(req.params.id)
    .then(health => res.json('Record was deleted.'))
    .catch(err => res.status(400).json('Error: '+ err));
});

// update

router.route('/update/:id').post((req, res)=> {

   Health.findById((req.params.id))
    .then(health => {
        
        health.fullname = req.body.fullname;
        health.temperature = req.body.temperature;
        health.email = req.body.email;
        health.phonenumber = req.body.phonenumber;
     
        health.save()
            .then(() => res.json('Record was updated!'))
            .catch(err => res.status(400).json('Error :' + err));
    })
    .catch(err => res.status(400).json('Error: '+ err));

});

module.exports = router;