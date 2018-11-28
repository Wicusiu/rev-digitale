// import { Model } from "@loopback/rest";

// const ObjectID = require('mongodb').ObjectID;

// const fixRelations = (model : Model, ctx) => {
//   var relations = model.settings.relations;
//   for(var k in relations) {
//     var fk = (relations[k].foreignKey != '') ? relations[k].foreignKey : k+"Id";
//     if(relations[k].type === 'belongsTo'){
//       if(ctx.args.data[k] && typeof ctx.args.data[k] === 'object' && ctx.args.data[k].id) { //<-- should add a mongodb objectId regex here
//         ctx.args.data[fk] = new ObjectID(ctx.args.data[k].id)
//         delete ctx.args.data[k];
//       }else if(ctx.args.data[fk] && typeof ctx.args.data[fk] === 'string' && String(ctx.args.data[fk].length) == 24){ //<-- should add a mongodb objectId regex here instead
//         ctx.args.data[fk] = new ObjectID(ctx.args.data[fk]);
//       };
//     };
//   };
// };

// const fixProps = (model : Model, ctx) => {
//   const getAction = (type) => {
//     switch(type){
//       case 'date' :
//         return 'date';
//         break;
//       default :
//         if(model.app.models[type]) return 'model';
//         else return null;
//     };
//   };
//   var processData = function(data, props){
//     for(var k in props){
//       var type = props[k].type;
//       if(type && typeof type === 'string'){
//         var action = getAction(props[k].type);
//         if(action == 'date' && data[k] && typeof data[k] === 'string') data[k] = new Date(data[k]); //<-- should add some type of date regex here
//         else if(action == 'model' && data[k]) processData(data[k], model.app.models[type].definition.rawProperties);
//       };
//     };
//   };
//   processData(ctx.args.data, model.definition.rawProperties);
// };
// export const ModelsBooter = (app) =>  {
//   var models = app.models();
//   //

//   //
//   //
//   models.forEach(function(Model) {
//     ["upsert", "updateAll", "updateAttributes", "destroyById", "destroyAll"].forEach(function(methodName){
//       Model.beforeRemote(methodName, function(ctx, m, next) {
//         console.log('remote-hooks.beforeRemote(' + ctx.methodString + ')');
//         fixRelations(Model, ctx);
//         fixProps(Model, ctx);
//         next();
//       });
//     });
//   });
// };
