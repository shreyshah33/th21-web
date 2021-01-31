google.charts.load("current", { packages: ["line"] });
google.charts.setOnLoadCallback(drawChart);

function investmentData(amount = 10000, years = 10, growthRate = 7) {
	var principal = 0;
	var inflatedPrincipal = 0;
	var data = [];
	for (var i = 0; i < years; i++) {
		principal = (principal + amount) * (1 + growthRate / 100);
		inflatedPrincipal = principal * 0.97 ** i;
		data.push([i + 1, principal, inflatedPrincipal]);
	}
	return data;
}

function onBankClick() {
	document.getElementById("growth").value = 0.05;
	document.getElementById("growth").disabled = true;
	document.getElementById("bank").classList.add("active");
	document.getElementById("stocks").classList.remove("active");
	document.getElementById("custom").classList.remove("active");
	drawChart();
}

function onStocksClick() {
	document.getElementById("growth").value = 7;
	document.getElementById("growth").disabled = true;
	document.getElementById("bank").classList.remove("active");
	document.getElementById("stocks").classList.add("active");
	document.getElementById("custom").classList.remove("active");
	drawChart();
}

function onCustomClick() {
	document.getElementById("growth").disabled = false;
	document.getElementById("bank").classList.remove("active");
	document.getElementById("stocks").classList.remove("active");
	document.getElementById("custom").classList.add("active");
	drawChart();
}

function drawChart() {
	var principal = parseInt(document.getElementById("principal").value) || 10000;
	var years = parseInt(document.getElementById("years").value) || 10;
	var growth = parseInt(document.getElementById("growth").value) || 7;
	var data = investmentData(principal, years, growth);
	var graphData = new google.visualization.DataTable();
	graphData.addColumn("number", "Year");
	graphData.addColumn("number", "Principal");
	graphData.addColumn("number", "Principal - adjusted for inflation");
	graphData.addRows(data);

	var options = {
		hart: {
			title: "Box Office Earnings in First Two Weeks of Opening",
			subtitle: "in millions of dollars (USD)",
		},
		height: 500,
		trendlines: { n: { pointsize: 5 } },
	};

	var chart = new google.charts.Line(document.getElementById("curve_chart"));

	chart.draw(graphData, google.charts.Line.convertOptions(options));
}
