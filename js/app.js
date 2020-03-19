var options = {
	series: [
		{
			data: [0, 0, 0]
		}
	],
	chart: {
		height: 500,
		type: "bar",
		events: {
			click: function(chart, w, e) {
				// console.log(chart, w, e)
			}
		}
	},
	plotOptions: {
		bar: {
			columnWidth: "50%",
			distributed: true
		}
	},
	dataLabels: {
		enabled: false
	},
	legend: {
		show: false
	},
	xaxis: {
		categories: ["Tiger", "Hippo", "Monkey"],
		labels: {
			style: {
				fontSize: "16px"
			}
		}
	},
	yaxis: {
		labels: {
			style: {
				fontSize: "16px"
			}
		}
	},
	title: {
		text: "",
		align: "center",
		style: {
			fontSize: "18px",
			fontWeight: "normal"
		}
	}
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

// Variables - Inputs and Buttons
var btn_menu = document.getElementById("btn_menu");
var input_groups = document.getElementById("input_groups");
var input_group1 = document.getElementById("input_group1");
var input_group2 = document.getElementById("input_group2");
var input_group3 = document.getElementById("input_group3");
var btn_group1 = document.getElementById("btn_group1");
var btn_group2 = document.getElementById("btn_group2");
var btn_group3 = document.getElementById("btn_group3");
var input_behavior = document.getElementById("input_behavior");
var btn_add_behavior = document.getElementById("btn_add_behavior");
var input_username = document.getElementById("input_username");
var input_class = document.getElementById("input_class");
var btn_start = document.getElementById("btn_start");
var btn_trash = [];

// Variables - Containers
var cont_menu = document.getElementById("cont_menu");
var sec_dashboard = document.getElementById("sec_dashboard");
var sec_landing = document.getElementById("sec_landing");
var cont_behaviors = document.getElementById("cont_behaviors");
var sec_navbar = document.getElementById("sec_navbar");
var cont_game = document.getElementById("cont_game");
var cont_behav = document.getElementById("cont_behav");

// Variables - Data
var group1_data = options.series[0].data[0];
var group2_data = options.series[0].data[1];
var group3_data = options.series[0].data[2];
var session_id;

document.addEventListener("DOMContentLoaded", function() {
	session_id = Math.round(Math.random() * 1000000000);
});

btn_start.addEventListener("click", function() {
	chart.updateOptions({
		title: {
			text: input_username.value + " - " + input_class.value
		}
	});
	sec_landing.classList.add("d-none");
	sec_dashboard.classList.remove("d-none");
	sec_navbar.classList.remove("d-none");
	sec_navbar.classList.add("d-flex");
});

btn_menu.addEventListener("click", function() {
	//console.log("Click btn_menu");
	if (cont_menu.classList.contains("d-none")) {
		cont_menu.classList.remove("d-none");
		cont_game.classList.add("col-lg-5");
		cont_game.classList.remove("col-lg-6");
		cont_behav.classList.add("col-lg-3");
		cont_behav.classList.remove("col-lg-4");
	} else {
		cont_menu.classList.add("d-none");
		cont_game.classList.remove("col-lg-5");
		cont_game.classList.add("col-lg-6");
		cont_behav.classList.remove("col-lg-3");
		cont_behav.classList.add("col-lg-4");
	}
});

function store_response(event_label) {
	var behavior_list = "";
	try {
		btn_trash.forEach(item => {
			behavior_list += "'" + item.parentElement.textContent + "';";
		});
	} catch {}
	var d = new Date();
	var myObj = {
		date: String(d),
		timestamp: d.getTime(),
		version: "GoodBehaviorGame_v1.0_build03/19/20",
		session: session_id,
		username: input_username.value,
		class: input_class.value,
		groups: input_groups.value,
		group_names: "'" + input_group1.value + "';'" + input_group2.value + "';'" + input_group3.value + "';",
		behaviors: behavior_list,
		event: event_label,
		score_group1: group1_data,
		score_group2: group2_data,
		score_group3: group3_data
	};
	console.log(myObj);
	var urladress =
		"https://docs.google.com/forms/d/e/1FAIpQLSetr5V6rNNxAIBPpXc3SYtEo6YtkBfbxvBl60i4ll8ZagjERw/formResponse?" +
		"entry.1387220426=" +
		String(myObj.date) +
		"&entry.271510769=" +
		String(myObj.timestamp) +
		"&entry.513025832=" +
		String(myObj.version) +
		"&entry.1485724458=" +
		String(myObj.session) +
		"&entry.830613223=" +
		String(myObj.username) +
		"&entry.1603453146=" +
		String(myObj.class) +
		"&entry.1840423898=" +
		String(myObj.groups) +
		"&entry.1908586059=" +
		String(myObj.group_names) +
		"&entry.2006619235=" +
		String(myObj.behaviors) +
		"&entry.1496364469=" +
		String(myObj.event) +
		"&entry.1619896770=" +
		String(myObj.score_group1) +
		"&entry.99835218=" +
		String(myObj.score_group2) +
		"&entry.1006792560=" +
		String(myObj.score_group3) +
		"&submit=Submit";
	console.log(urladress);
	fetch(urladress, {
		method: "post",
		mode: "no-cors",
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(response => response.json())
		.then(data => console.log("data is", data))
		.catch(error => console.log("error is", error));
}

function update_graph() {
	if (input_groups.value == "2 Groups (less than 20 students)") {
		input_group3.classList.add("d-none");
		btn_group3.classList.add("d-none");
		chart.updateSeries([
			{
				data: [group1_data, group2_data]
			}
		]);
		chart.updateOptions({
			xaxis: {
				categories: [input_group1.value, input_group2.value]
			}
		});
	} else {
		input_group3.classList.remove("d-none");
		btn_group3.classList.remove("d-none");
		chart.updateSeries([
			{
				data: [group1_data, group2_data, group3_data]
			}
		]);
		chart.updateOptions({
			xaxis: {
				categories: [input_group1.value, input_group2.value, input_group3.value]
			}
		});
	}
}

input_groups.addEventListener("change", function() {
	//console.log("Change input_groups");
	//console.log(input_groups.value);
	update_graph();
});

input_group1.addEventListener("keyup", function() {
	//console.log("Keyup input_group1");
	btn_group1.textContent = input_group1.value;
	update_graph();
});

input_group2.addEventListener("keyup", function() {
	//console.log("Keyup input_group1");
	btn_group2.textContent = input_group2.value;
	update_graph();
});

input_group3.addEventListener("keyup", function() {
	//console.log("Keyup input_group1");
	btn_group3.textContent = input_group3.value;
	update_graph();
});

btn_group1.addEventListener("click", function() {
	//console.log("Add good behavior to group 1");
	group1_data = group1_data + 1;
	update_graph();
	store_response("group1_positive");
});

btn_group2.addEventListener("click", function() {
	//console.log("Add good behavior to group 2");
	group2_data = group2_data + 1;
	update_graph();
	store_response("group2_positive");
});

btn_group3.addEventListener("click", function() {
	//console.log("Add good behavior to group 3");
	group3_data = group3_data + 1;
	update_graph();
	store_response("group3_positive");
});

btn_add_behavior.addEventListener("click", function() {
	//console.log("Add behavior");
	var behavior = input_behavior.value;
	cont_behaviors.insertAdjacentHTML("beforeend", "<li class='list-group-item'>" + behavior + "<i class='fas fa-trash float-right d-none'></li>");
	btn_trash = document.querySelectorAll(".fa-trash");
	//console.log(btn_trash);
	btn_trash.forEach(item => {
		item.parentElement.addEventListener("mouseover", event => {
			try {
				event.target.querySelector(".fa-trash").classList.remove("d-none");
			} catch {}
		});
		item.parentElement.addEventListener("mouseleave", event => {
			try {
				event.target.querySelector(".fa-trash").classList.add("d-none");
			} catch {}
		});
		item.addEventListener("click", event => {
			event.target.parentElement.remove();
		});
	});
});
