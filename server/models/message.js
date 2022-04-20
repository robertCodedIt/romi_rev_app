const mongoose = require('mongoose');
const MessageSchema = new mongoose.Schema({

message_type:{

},
message_sender:{

},
message_receiver:{

},
message_time_sent:{

},
message_time_received:{

},
message_content:{

},


})
const message = mongoose.model('message',MessageSchema);
module.exports=message;