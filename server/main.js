import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
    
CalenEvent = new Mongo.Collection('calenevent');
    
    
    Meteor.methods({
        
       'saveCalenEvent':function(ce){
           CalenEvent.insert(ce);
           
       } 
    });
    
});
