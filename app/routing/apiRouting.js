var path = require("path");

module.exports = function(app, newProfile) {

    app.post("/api/profiles", function(req, res) {
        profiles.push(req.body);
    });

    app.get("/api/profiles", function(req, res) {
        res.json(profiles);
    });

}