import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

CalenEvent = new Mongo.Collection('calenevent');


Template.scheduler.rendered = function() {
    
   var scheduler = $('#scheduler').fullCalendar({      
       
      // dayClick: function (date,allDay, jsEvent,view) { 
           
           
        //   var calendarEvent = {};
        //   calendarEvent.start = date;
        //   calendarEvent.end = date;
        //   calendarEvent.title = "New Event";
        //   calendarEvent.url = "View Record";
        //   calendarEvent.text = "New Event Note";
        //   calendarEvent.owner = Meteor.userId();
       //    Meteor.call('saveCalenEvent', calendarEvent);
      // },
       
      // events:function(start,end, timezone, callback) {
           
      //     var calenEvents = CalenEvent.find({},{reactive:false}).fetch();
      //     callback(calenEvents);
      // }
       
        header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
    },
       
     dayClick:function( date, jsEvent, view ) {
      CalenEvent.insert({title:'New Event',start:date,end:date,url:"View Record", text:"Event Note", owner:Meteor.userId(),color:'green'});
      
     // Session.set('lastChanged:',new Date());
    },
    eventClick:function(reqEvent,jsEvent,view){
     // Session.set('editingReqEvent',reqEvent.id);
     // Session.set('showEditEvent',true);
    },
    eventDrop:function(reqEvent){
      CalenEvent.update(reqEvent.id, {$set: {start:reqEvent.start,end:reqEvent.end}});
     // Session.set('lastMod',new Date());
    },
       
        eventColor: '#2BA9A5',
       
    events: function(start, end, timezone, callback) {
      var events = [];
        
      reqEvents = CalenEvent.find({},{reactive:false});
        
      reqEvents.forEach(function(evt){
        calenEvents = {id:evt._id,title:evt.title,start:evt.start,end:evt.end,url:evt.url,text:evt.text,color:evt.color};
        events.push(calenEvents);
      })
      callback(events);
    },
    editable:true,
    weekMode: 'liquid',
        
    }).data().fullCalendar;
    
    
    Deps.autorun(function(){
         allReqsCursor = CalenEvent.find().fetch();
    console.log("Autorun -> ", allReqsCursor.length)
       // CalenEvent.find().fetch();
        if(scheduler) {
        scheduler.refetchEvents();
        }
    })
    
}