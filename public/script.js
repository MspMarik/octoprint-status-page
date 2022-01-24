console.log(config);

axios
    .get("http://98.109.31.91:54323/api/job", {
        headers: {
            "X-Api-Key": config.apikey,
        },
    })
    .then(function (response) {
        let name = response.job.file.display;
        let timeInSeconds = response.progress.printTimeLeft;

        name = name.split(".");
        name = name[1];

        let timeAsString = "";
        let timeInMinutes = timeInSeconds / 60;
        let hours = Math.floor(timeInMinutes / 60);
        let minutes = Math.floor(timeInMinutes % 60);
        if (timeInMinutes < 60) {
            timeAsString = `${minutes}mins`;
        } else {
            timeAsString = `${hours}hr ${minutes}mins`;
        }

        document.getElementById("printName").innerHTML = name;
        document.getElementById("timeLeft").innerHTML = timeAsString;
    });
