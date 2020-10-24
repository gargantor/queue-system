findAllReturn = (res, err, data, message) => {    
    if(!data) {
        return res.status(404).send({ message: message});
    }  
    if(err) {
        res.status(500).send({ message: err});
        return;
    }
    res.status(200).send(data);
};

const execHelper = {
    findAllReturn
}

module.exports = execHelper;