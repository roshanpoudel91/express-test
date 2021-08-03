const { json } = require('express');
const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');
router.get('/', (req, res) => res.json(members));

// get single members

router.get('/:id',(req,res) => {
  // return res.send(req.params);
      const found = members.some(member => member.id === parseInt(req.params.id));

      if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));

      }else{
          res.status(400).json({msg:`No member of Id: ${req.params.id}`});
      }
});

// create member

router.post('/',(req,res) => {
    const newMember = {
          id: uuid.v4(),
          email: req.body.email,
          name:req.body.name,
          address:req.body.address
    }

    if(!newMember.email || !newMember.name){
      return res.status(400).json({'message':'Please enter at least email and name'});
    }

    members.push(newMember);

    return res.json(members);
});


router.put('/:id',(req,res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if(found){

    const updMember = req.body;

    members.forEach(member => {
        if(member.id === parseInt(req.params.id)){
            member.first_name = updMember.first_name;
            member.email = updMember.email;

            return res.json({msg:'Updated successfully',data:member});
        }
    });

  }else{
      res.status(400).json({msg:`No member of Id: ${req.params.id}`});
  }
});

router.delete('/:id',(req,res) => {
  // return res.send(req.params);
      const found = members.some(member => member.id === parseInt(req.params.id));

      if(found){
        res.json({msg:'member deleted','data': members.filter(member => member.id !== parseInt(req.params.id))});

      }else{
          res.status(400).json({msg:`No member of Id: ${req.params.id}`});
      }
});

module.exports = router;