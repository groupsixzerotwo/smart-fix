const { Service } = require('../models');

const serviceData = [
  {  
    service_type: 'Plumbing'
  },
  {  
    service_type: 'Snow Removal'
  },
  {  
    service_type: 'Electrical Repairs'
  },
  {  
    service_type: 'Window Cleaning'
  },
  {  
    service_type: 'Yard Work'
  }
];

const seedService = () => Service.bulkCreate(serviceData);

module.exports = seedService;