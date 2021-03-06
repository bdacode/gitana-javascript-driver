(function($) {

    module("nodeI18N1");

    // Test case : I18N 1.
    test("I18N 1", function()
    {
        stop();

        expect(7);

        var gitana = GitanaTest.authenticateFullOAuth();
        gitana.createRepository().readBranch("master").then(function() {

            // NOTE: this = branch

            // create a master node
            var masterObject = {
                "title": "english1",
                "_features": {
                    "f:multilingual": {
                        "edition": "edition1"
                    }
                }
            };
            var masterNode = null;
            this.createNode(masterObject).then(function() {

                // NOTE: this = master node

                // create a translation node for "edition1" in german
                var german = { "title": "german1" };
                this.createTranslation("edition1", "de_DE", german);

                // create a translation node for "edition1" in chinese
                var chinese = { "title": "chinese1" };
                this.createTranslation("edition1", "zh_CN", chinese);

                // verify the number of editions
                this.editions(function(editions) {
                    equal(editions.length, 1, "There was 1 edition");
                });

                // verify the number of locales for edition "edition1"
                this.locales("edition1", function(locales) {
                    equal(locales.length, 2, "There were 2 locales");

                    var foundGerman = false;
                    for (var i = 0; i < locales.length; i++)
                    {
                        if (locales[i] == "de_DE")
                        {
                            foundGerman = true;
                        }
                    }
                    ok(foundGerman, "Found german locale");

                    var foundChinese = false;
                    for (var i = 0; i < locales.length; i++)
                    {
                        if (locales[i] == "zh_CN")
                        {
                            foundChinese = true;
                        }
                    }
                    ok(foundChinese, "Found chinese locale");
                });

                // read back the german translation
                this.readTranslation("de_DE").then(function() {
                    equal(this.getTitle(), "german1", "Got german back!");
                });

                // read back the chinese translation
                this.readTranslation("zh_CN").then(function() {
                    equal(this.getTitle(), "chinese1", "Got chinese back!");
                });

                // try to read back an unknown locale and ensure it falls back to master node
                this.readTranslation("xx_YY").then(function() {
                    equal(this.getTitle(), "english1", "Got master node back!");
                });
            });

            this.then(function() {
                success();
            });

        });

        var success = function() {
            start();
        };

    });

}(jQuery) );
