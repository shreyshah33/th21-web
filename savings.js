function getSalaryReturns(salary) {
	const percentages = [1, 5, 10, 15, 20, 25, 30];
	const years = [1, 3, 5, 7, 10, 15, 20, 25, 30];
	var data = {};
	for (const year of years) {
		var yearData = [];
		for (const percentage of percentages) {
			yearData.push((salary * year * percentage) / 100);
		}
		data[year] = yearData;
	}
	console.log(data);
	return data;
}

function commafy(num) {
	var str = num.toString().split(".");
	if (str[0].length >= 5) {
		str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
	}
	if (str[1] && str[1].length >= 5) {
		str[1] = str[1].replace(/(\d{3})/g, "$1 ");
	}
	return str.join(".");
}

function tableCreate() {
	var salary = parseInt(document.getElementById("salary").value) || 60000;
	var data = getSalaryReturns(salary);
	var table = document.getElementById("table");
	table.innerHTML = "";
	var tbl = document.createElement("table");
	tbl.classList.add("table");
	tbl.classList.add("table-responsive");
	tbl.classList.add("table-striped");
	tbl.classList.add("table-bordered");
	var trHead = document.createElement("tr");
	th = document.createElement("th");
	th.innerHTML = "";
	trHead.appendChild(th);

	th = document.createElement("th");
	th.colSpan = 7;
	th.innerHTML = "Percentage of salary saved";
	th.classList.add("text-center");
	trHead.appendChild(th);

	tbl.appendChild(trHead);

	const years = [1, 3, 5, 7, 10, 15, 20, 25, 30];
	const percentages = [1, 5, 10, 15, 20, 25, 30];
	var tr = document.createElement("tr");
	th = document.createElement("th");
	th.innerHTML = "Years";
	tr.appendChild(th);
	tr.classList.add("text-center");
	for (const percentage of percentages) {
		var th = document.createElement("th");
		th.innerHTML = percentage + "%";
		tr.appendChild(th);
	}
	tbl.appendChild(tr);
	for (var i = 0; i < 9; i++) {
		var tr = document.createElement("tr");
		tr.classList.add("text-center");
		var th = document.createElement("th");
		th.innerHTML = years[i];
		tr.appendChild(th);
		for (var j = 0; j < 7; j++) {
			var td = document.createElement("td");
			td.innerHTML = "$" + commafy(data[years[i]][j]);
			tr.appendChild(td);
		}
		tbl.appendChild(tr);
	}
	table.appendChild(tbl);

	table = document.getElementsByTagName("table")[0].rows;
	for (var row of rows) {
		row.height = "1500";
	}
}
