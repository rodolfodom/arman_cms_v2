'use strict';

/**
 *  controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// @ts-ignore
module.exports = createCoreController('plugin::events.registration');
