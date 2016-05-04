if (Meteor.isClient) {
  Session.setDefault("totalIncome", 0);
  Session.setDefault("thisSubtotal", 0);

Template.quickIncomeForm.onCreated(function(){
	//reactive var is limited to this template instance
	this.showHourlyFields = new ReactiveVar(false);
	this.showSalaryFields = new ReactiveVar(false);
	this.showBonusFields = new ReactiveVar(false);
});


Template.quickIncomeForm.helpers({
	showHourlyFields: function() {
		return Template.instance().showHourlyFields.get();
	},
	showSalaryFields: function() {
		return Template.instance().showSalaryFields.get();
	},	
	showBonusFields: function() {
		return Template.instance().showBonusFields.get();
	},
	showThisIncome: function() {
		return Template.instance().bonusTotal.get();
	},
	thisTotal: function () {
		return Session.get("totalIncome");
	},
	thisSubtotal: function () {
		return Session.get("thisSubtotal");
	}		
});

Template.quickIncomeForm.events({
	'change #incomeTypeSelect': function (event, template) {
		if( $(event.target).val() === "wage" ) {
			template.showHourlyFields.set(true);
			template.showSalaryFields.set(false);
			template.showBonusFields.set(false);
			Session.set("thisSubtotal", 0);
			console.log('wage');
		} else if ($(event.target).val() === "salary" ) {
				template.showHourlyFields.set(false);
				template.showSalaryFields.set(true);
				template.showBonusFields.set(false);
				Session.set("thisSubtotal", 0);
				console.log('salary');
			} else if ($(event.target).val() === "bonus" ) {
					template.showHourlyFields.set(false);
					template.showSalaryFields.set(false);
					template.showBonusFields.set(true);
					Session.set("thisSubtotal", 0);
					console.log('bonus');
				} else {
					template.showHourlyFields.set(false);
					template.showSalaryFields.set(false);
					template.showBonusFields.set(false);
					Session.set("thisSubtotal", 0);
					console.log('clear');
				}
		}
});

Template.quickIncomeForm.events({
	'change #incomeDetails': function (event, template) {
		var hourly = Template.instance().showHourlyFields.get();
		var salary = Template.instance().showSalaryFields.get();
		var bonus = Template.instance().showBonusFields.get();
		if (hourly === true) {
			var r = AutoForm.getFieldValue("hourlyIncome.hourlyRate", "newQuickIncomeForm");
			var h = AutoForm.getFieldValue("hourlyIncome.hourlyHours", "newQuickIncomeForm");
			var f = AutoForm.getFieldValue("hourlyIncome.hourlyFrequency", "newQuickIncomeForm");
			var hourlySubtotal = (r * h * f);
			Session.set("thisSubtotal", hourlySubtotal);	
			}
		if (salary === true) {
			var r = AutoForm.getFieldValue("salaryIncome.salaryRate", "newQuickIncomeForm");
			var f = AutoForm.getFieldValue("salaryIncome.salaryFrequency", "newQuickIncomeForm");
			var salarySubtotal = (r * f);
			Session.set("thisSubtotal", salarySubtotal);
			}
		if (bonus === true) {
			var r = AutoForm.getFieldValue("bonusIncome.bonusAmount", "newQuickIncomeForm");
			var f = AutoForm.getFieldValue("bonusIncome.bonusFrequency", "newQuickIncomeForm");
			var bonusSubtotal = (r * f);
			Session.set("thisSubtotal", bonusSubtotal);
			}			
		}
});


Template.quickIncomeForm.events({
	'click #add-button': function (event, template) {
		var runningTotal = Session.get('totalIncome');
		var thisTotal = Session.get('thisSubtotal');
		var newTotal = runningTotal + thisTotal;
		Session.set("totalIncome", newTotal);
			template.showHourlyFields.set(false);
			template.showSalaryFields.set(false);
			template.showBonusFields.set(false);
			Session.set("thisSubtotal", 0);		
		}
});
    
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
