console.log(config);

async function go() {
    while (true) {
        var currentdate = new Date();
        var datetime = currentdate.getMonth() + 1 + "/" + currentdate.getDate() + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        console.log(datetime);
        console.log("Getting data...");
        await getData();
        console.log("Data got!");
        console.log("Sleeping...");
        await new Promise((r) => setTimeout(r, 60000));
        console.log("I am awake!");
    }
}

async function getData() {
    axios
        .get("http://98.109.31.91:54323/api/job", {
            headers: {
                "X-Api-Key": config.apikey,
            },
        })
        .then(function (response) {
            let name = response.data.job.file.display;
            let timeInSeconds = response.data.progress.printTimeLeft;
            let completion = Math.floor(response.data.progress.completion);

            console.log(name);
            console.log(timeInSeconds + " seconds left");
            console.log(completion + "%");

            document.getElementById("prog").style.width = completion + "%";
            document.getElementById("prog").innerHTML = `${completion}%`;

            name = name.split(".");
            name = name[0];

            let timeAsString = "";
            let timeInMinutes = timeInSeconds / 60;
            let hours = Math.floor(timeInMinutes / 60);
            let minutes = Math.floor(timeInMinutes % 60);
            if (timeInMinutes < 60) {
                timeAsString = `${minutes} mins`;
            } else {
                timeAsString = `${hours} hr ${minutes} mins`;
            }

            document.getElementById("printName").innerHTML = name;
            document.getElementById("timeLeft").innerHTML = timeAsString;
        });
}

go();
