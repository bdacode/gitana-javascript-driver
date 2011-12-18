(function(window)
{
    var Gitana = window.Gitana;
    
    Gitana.RepositoryMap = Gitana.AbstractMap.extend(
    /** @lends Gitana.RepositoryMap.prototype */
    {
        /**
         * @constructs
         * @augments Gitana.AbstractMap
         *
         * @class Map of repository objects
         *
         * @param {Gitana.Platform} platform Gitana platform instance.
         * @param {Object} object
         */
        constructor: function(platform, object)
        {
            this.objectType = "Gitana.RepositoryMap";


            //////////////////////////////////////////////////////////////////////////////////////////////
            //
            // CALL THROUGH TO BASE CLASS (at the end)
            //
            //////////////////////////////////////////////////////////////////////////////////////////////

            this.base(platform, object);
        },

        /**
         * @override
         */
        clone: function()
        {
            return this.getFactory().repositoryMap(this.getPlatform(), this.object);
        },

        /**
         * @param json
         */
        buildObject: function(json)
        {
            return this.getFactory().repository(this.getPlatform(), json);
        }

    });

})(window);
