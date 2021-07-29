const { Status } = require('../models');

const statusData = [
  {  
    status_text: 'Job Created'
  },
  {  
    status_text: 'Pending User Input'
  },
  {  
    status_text: 'Service Provider Confirmed'
  },
  {  
    status_text: 'Job Started'
  },
  {  
    status_text: 'Job Completed'
  }
];

const seedStatus = () => Status.bulkCreate(statusData);

module.exports = seedStatus;