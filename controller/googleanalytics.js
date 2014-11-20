'use strict';

var Utilities = require('periodicjs.core.utilities'),
	ControllerHelper = require('periodicjs.core.controller'),
	fs = require('fs-extra'),
	ejs = require('ejs'),
	path = require('path'),
	analyticstrackingtemplatehtml,
	analyticstrackingtemplate,
	analyticsconfig,
	CoreUtilities,
	CoreController,
	appSettings,
	mongoose,
	logger;

// /**
//  * uploads seeds via admin interface
//  * @param  {object} req
//  * @param  {object} res
//  * @return {object} responds with googleanalytics page
//  */
// var preDataQuery = function (req, res, next) {
// 	res.locals.additionalFooterHTML.allroutesnodataanalytics='<!-- just allroutesnodataanalytics testing -->';
// 	next();
// };

/**
 * add google analytics to footer
 * @param  {object} serverobj object passed from core.controller.handleDocumentQueryRender that has {req,res}
 * @param  {object} asynccallback
 * @return {Function} adds google analytics to footer
 */
var postDataQueryFunction = function(serverobj,asynccallback){
		// console.log('google anal serverobj.res.locals',serverobj.res.locals)

	var returnfunction = function(serverobj,asynccallback){
		try{		
			serverobj.res.locals.additionalFooterHTML.googleanalytics=analyticstrackingtemplatehtml;
			asynccallback(null);
		}
		catch(e){
			asynccallback(e);
		}
	};

	return returnfunction(serverobj,asynccallback);
};

/**
 * googleanalytics controller
 * @module googleanalyticsController
 * @{@link https://github.com/typesettin/periodicjs.ext.googleanalytics}
 * @author Yaw Joseph Etse
 * @copyright Copyright (c) 2014 Typesettin. All rights reserved.
 * @license MIT
 * @requires module:async
 * @requires module:periodicjs.core.utilities
 * @requires module:periodicjs.core.controller
 * @param  {object} resources variable injection from current periodic instance with references to the active logger and mongo session
 * @return {object}           googleanalytics
 */
var controller = function (resources) {
	logger = resources.logger;
	mongoose = resources.mongoose;
	appSettings = resources.settings;
	var appenvironment = appSettings.application.environment;
	CoreController = new ControllerHelper(resources);
	CoreUtilities = new Utilities(resources);
	analyticsconfig = fs.readJsonSync(path.resolve(process.cwd(), 'content/config/extensions/periodicjs.ext.googleanalytics/settings.json'));
	analyticstrackingtemplate = fs.readFileSync(path.resolve(__dirname,'../views/htmlinclude/trackingcode.ejs'), 'utf8');
	analyticstrackingtemplatehtml = ejs.render(analyticstrackingtemplate,analyticsconfig[appenvironment]);

	return {
		// preDataQuery: preDataQuery,
		postDataQueryFunction: postDataQueryFunction
	};
};

module.exports = controller;
