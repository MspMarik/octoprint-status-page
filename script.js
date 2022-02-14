// console.log(config);

//document.getElementById("stream").src = config.cameraUrl;

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
        .get(/api/job USL GOES HERE, {
            headers: {
                "X-Api-Key": API KEY HERE,
            },
        })
        .then(function (response) {
            let name = response.data.job.file.display;
            let timeInSeconds = response.data.progress.printTimeLeft;
            let completion = Math.floor(response.data.progress.completion);

            if (name) {
                console.log(name);
                console.log(timeInSeconds + " seconds left");
                console.log(completion + "%");

                name = name.split(".");
                name = name[0];
                name = name.substring(7);

                if (!timeInSeconds) {
                    timeAsString = "Calculating...";
                    progress = "0";
                } else {
                    timeAsString = "";
                    timeInMinutes = timeInSeconds / 60;
                    hours = Math.floor(timeInMinutes / 60);
                    minutes = Math.floor(timeInMinutes % 60);
                    if (timeInMinutes < 60) {
                        timeAsString = `${minutes} mins`;
                    } else {
                        timeAsString = `${hours} hr ${minutes} mins`;
                    }
                }
            } else {
                name = "NOTHING CURRENTLY PRINTING";
                timeAsString = "N/A";
                progress = "0";
            }

            document.getElementById("prog").style.width = completion + "%";
            document.getElementById("prog").innerHTML = `${completion}%`;
            document.getElementById("printName").innerHTML = name;
            document.getElementById("timeLeft").innerHTML = timeAsString;
        });
}

go();
