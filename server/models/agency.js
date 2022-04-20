const mongoose = require('mongoose');
const AgencySchema = new mongoose.Schema({

    agency_name:{

    },
    agency_owner:{

    },
    agencyLogo:{

    },
    agency_slogan:{

    },
    agency_secret:{
        
    },
    agency_members:{

    },
    

})

const Agency = mongoose.model('Angecy',AgencySchema)
module.exports=Agency