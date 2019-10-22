const path = require('path');

exports.sendResume = (req, res, next) => {
    const file = path.join(__dirname,'../public/AaronResume.pdf');
    res.download(file, function(err) {
        if(err) {
            console.log("Error");
            console.log(err);
        } else {
            console.log("Success");
        }
    });
}
