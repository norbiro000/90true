var config;

module.exports = function(app) {
	config = {
    // ### Production
    // When running Ghost in the wild, use the production environment.
    // Configure your URL and mail settings here

	    production: {
	        url: 'http://www.90true.com:9999',
	        mail: {},
	        database: {
	            client: 'mongo',
	            connection: {
	                hostname : 'mongodb://mongo:27017/truemoney2' // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
	            },
	            debug: false
	        },

	        server: {
	            host: 'http://www.90true.com',
	            port: '3000'
	        }
	    },

	    // ### Development **(default)**
	    development: {
	        // The url to use when providing links to the site, E.g. in RSS and email.
	        // Change this to your Ghost blog's published URL.
	        url: 'http://localhost:2368',

	        // Example mail config
	        // Visit http://support.ghost.org/mail for instructions
	        // ```
	        //  mail: {
	        //      transport: 'SMTP',
	        //      options: {
	        //          service: 'Mailgun',
	        //          auth: {
	        //              user: '', // mailgun username
	        //              pass: ''  // mailgun password
	        //          }
	        //      }
	        //  },
	        // ```

	        // #### Database
	        // Ghost supports sqlite3 (default), MySQL & PostgreSQL
	        database: {
	            client: 'mongo',
	            connection: {
	                // filename: path.join(__dirname, '/content/data/ghost-dev.db')
	                hostname : 'mongodb://ssh.90true.com:27017/truemoney2' // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
	            },
	            debug: false
	        },
	        // #### Server
	        // Can be host & port (default), or socket
	        server: {
	            // Host to be passed to node's `net.Server#listen()`
	            host: '127.0.0.1',
	            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
	            port: '3000'
	        },
	        // #### Paths
	        // Specify where your content directory lives
	        paths: {
	            // contentPath: path.join(__dirname, '/content/')
	        }
	    }
	};

	if (app.get('env') === 'productions') {
		console.log('**********  Running on Production mode *********');
		console.log('**********         On Port '+ config.production.server.port +'        *********');
		return config.production;
	}else	{
		console.log('**********  Running on Development mode *********');
		console.log('**********         On Port '+ config.development.server.port +'        *********');
		return config.development;
	}
}

