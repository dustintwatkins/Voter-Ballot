var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Candidates = mongoose.model('Candidate');

router.get('/voting', function(req, res, next) {
  Candidates.find(function(err, candidates){
    if(err){ return next(err); }
    res.json(candidates);
  });
});

router.post('/candidates', function(req, res, next) {
	console.log(req.body);
  var candidate = new Candidates(req.body);
  candidate.save(function(err, candidate){
    if(err){ return next(err); }
    res.json(candidate);
  });
});

router.param('candidate', function(req, res, next, id) {
	console.log("in param");
  var query = Candidates.findById(id);
  query.exec(function (err, candidate){
    if (err) { return next(err); }
    if (!candidate) { return next(new Error("can't find candidate")); }
    req.candidate = candidate;
	console.log("req");
    return next();
  });
});

router.get('/candidates/:candidate', function(req, res) {
	console.log("in get by id");
  res.json(req.candidate);
});

router.put('/voting/:candidate/upvote', function(req, res, next) {
	console.log(req.body);
  req.candidate.upvote(function(err, candidate){
    if (err) { return next(err); }
    res.json(candidate);
  });
});

router.delete('/voting/:candidate', function(req, res, next){
	console.log("in delete route");
	req.candidate.remove();
	res.sendStatus(200);
});

module.exports = router;
