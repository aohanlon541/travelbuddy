        //for server 
        //add person to JSON
        var count = 0;
        var sourceName;
        var matchName;
        var matchURL;
        var matchEmail;

        $("#submitBtn").on("click", function(event) {
            event.preventDefault();
            count++;
            var newMatch;
            var newProfile = {
                name: $("#nameInput").val().trim(),
                pictureLink: $("#linkInput").val().trim(),
                emailLink: $("#emailInput").val().trim(),
                one: $("#question1").val(),
                two: $("#question2").val(),
                three: $("#question3").val(),
                four: $("#question4").val(),
                five: $("#question5").val(),
                six: $("#question6").val(),
                seven: $("#question7").val(),
                eight: $("#question8").val(),
                nine: $("#question9").val(),
                ten: $("#question10").val(),
                numArray: [$("#question1").val(), $("#question2").val(), $("#question3").val(), $("#question4").val(), $("#question5").val(), $("#question6").val(), $("#question7").val(), $("#question8").val(), $("#question9").val(), $("#question10").val()]
            };
            console.log(newProfile.numArray);
            var numArr = newProfile.numArray;
            var parsedNum = numArr.map(function(x) {
                return parseInt(x);
            });
            var sum = parsedNum.reduce((a, b) => a + b, 0);
            newProfile['sum'] = sum;
            console.log(newProfile);

            $.post("/api/profiles", newProfile)
                .done(function(data) {
                    console.log(data);
                });

            $.get("/api/profiles", function(req, res) {
                differences = {};
                for (i = 0; i < req.length; i++) {
                    console.log([i] + ": " + req[i].sum);

                    var differencesArr = [];
                    for (j = 0; j < req.length; j++) {
                        if (i !== j) {
                            differencesArr.push(req[i].sum - req[j].sum);
                            differences[[i]] = differencesArr;

                        } else {
                            differencesArr.push("nan");
                            differences[[i]] = differencesArr;

                        }
                    }
                    var smallest = 100;

                    for (j = 0; j < differences[i].length; j++) {
                        if (differences[i][j] < smallest) {
                            smallest = differences[i][j];
                        }
                        differences["match"] = req[differences[i].indexOf(smallest)];
                    }

                    console.log(differences);
                    console.log(differences.match.name);

                    matchName = differences.match.name;
                    matchURL = differences.match.pictureLink;
                    matchEmail = differences.match.emailLink
                }
                print();

            });

            function print() {
                $("#match").html("<img src='" + matchURL + "' id='matchPic'>");
                $("#match").append("<h2>" + matchName + "</h2>");
                $("#match").append("<h2><a href='mailto:" + emailLink + "'" + emailLink + "</a></h2>");
            }


        });