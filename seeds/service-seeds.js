const { Service } = require('../models');

const serviceData = [
  {  
    service_type: 'Electrical'
  },
  {  
    service_type: 'Plumbing'
  },
  {  
    service_type: 'Carpenting'
  }
];

const seedService = () => Service.bulkCreate(serviceData);

module.exports = seedService;