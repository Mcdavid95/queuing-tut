#!/snap/bin/env node

let amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', ((error0, connection) => {
		if(error0) {
			throw error0;
		}
		connection.createChannel((error1, channel) => {
			if (error1) throw error1;
      let exchange = 'direct_logs';
      var args = process.argv.slice(2);
      var severity = (args.length > 0) ? args[0] : 'error';
			let msg = process.argv.slice(2).join(' ') || "Hello World!";

			channel.assertExchange(exchange, 'direct', {
				durable: false
			});

			channel.publish(exchange, severity, Buffer.from(msg), {
        persistent: true
      });
      console.log(`[x] Sent ${msg}`);
      
      setTimeout(() => {
        connection.close();
        process.exit(0);
      }, 500)
		});
	})
)
