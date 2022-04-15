const tracer = require('dd-trace').init();
const dotenv = require('dotenv').config({path:'.env.local'});
const fastify = require('fastify')({logger:{level:'error'},pluginTimeout:120000,connectionTimeout:100000 * 3});
const Next = require('next');




const port = parseInt(process.env.PORT) || 4333;
const dev = process.env.NODE_ENV !== 'production';

const date = new Date();

fastify.register((fastify,opts ,next) => {
    const app = Next({dev});
    const handle = app.getRequestHandler();

    app.prepare().then(() => {
       if (dev){
           fastify.get('/_next/*',(req,reply) => {
              return handle(req.raw,reply.raw).then(() => {
                  reply.sent = true;
              });
           });
       }
       //All routes here
       fastify.all('/*',(req,reply) => {
          return handle(req.raw,reply.raw).then(() => {
              reply.sent = true;
          });
       });

       fastify.setNotFoundHandler((request,reply) => {
           return app.render404(request.raw,reply.raw).then(()=>{
               reply.sent = true;
           });
       });

       next();
    }).catch((err) => {
        next(err);
    });
});


fastify.listen(port,(err) => {
   if (err) throw err;

   console.log('BFS On API Route :' , process.env.NEXT_PUBLIC_BFS_API);
});