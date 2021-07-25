const { Status } = require('../models');

const statusData = [
  {  
    status_text: 'Applied'
  },
  {  
    status_text: 'Processing'
  },
  {  
    status_text: 'Assigned'
  },
  {  
    status_text: 'Completed'
  }
];

const seedStatus = () => Status.bulkCreate(statusData);

module.exports = seedStatus;