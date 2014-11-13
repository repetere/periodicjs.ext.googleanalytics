'use strict';

/**
 * Adds giigke analytics to footer.
 * @{@link https://github.com/typesettin/periodicjs.ext.googleanalytics}
 * @author Yaw Joseph Etse
 * @copyright Copyright (c) 2014 Typesettin. All rights reserved.
 * @license MIT
 * @exports periodicjs.ext.googleanalytics
 * @param  {object} periodic variable injection of resources from current periodic instance
 */
module.exports = function (periodic) {
	// express,app,logger,config,db,mongoose
	var googleanalyticsController = require('./controller/googleanalytics')(periodic);

	//pre data query
	// periodic.app.get('*', googleanalyticsController.preDataQuery);
	//post data query
	periodic.app.locals.additionalHTMLFunctions.push( googleanalyticsController.postDataQueryFunction );	
};
