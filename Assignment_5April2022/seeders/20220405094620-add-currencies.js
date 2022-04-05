'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Currencies',
      [
        {
          name: 'USD',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'EUR',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Currencies', {
      [Op.or]: [{name: 'USD'}, {name: 'EUR'}],
    });
  },
};
