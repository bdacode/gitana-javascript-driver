(function() {

    module("connect6");

    /**
     * Ensures that the Gitana driver can be used to connect to hosted Cloud CMS applications.
     * Tests against a live server instance.
     */

    // Test case : Gitana Connect #6
    test("Gitana Connect #6", function()
    {
        stop();

        expect(3);

        var f1 = function()
        {
            Gitana.connect({
                //"host": "https://24e5fe6f-c30c-4a37-83a8-e67739c9a52d-hosted.cloudcms.net"
                "host": "https://43e8a6e1-aec3-44a7-b475-91deea426749-hosted.cloudcms.net"
            }, function(err) {

                // NOTE: this = platform
                ok(!err, "Connected successfully as guest using connect()");

                Gitana.disconnect();

                // ensure the cookie is gone
                ok(!Gitana.readCookie("GITANA_TICKET", "Cookie was deleted"));

                f2();
            });
        };

        var f2 = function()
        {
            var cloud = new Gitana({
                "host": "https://43e8a6e1-aec3-44a7-b475-91deea426749-hosted.cloudcms.net"
            });
            cloud.authenticate().then(function() {

                ok(true, "Connected successfully as guest using authenticate()");

                start();
            });
        };

        f1();

    });

}());
