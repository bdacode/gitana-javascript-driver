(function(window)
{
    var Gitana = window.Gitana;
    
    Gitana.LogEntryMap = Gitana.AbstractMap.extend(
    /** @lends Gitana.LogEntryMap.prototype */
    {
        /**
         * @constructs
         * @augments Gitana.AbstractMap
         *
         * @class Map of log entries
         *
         * @param {Gitana.Platform} platform Gitana server instance.
         * @param [Object] object
         */
        constructor: function(platform, object)
        {
            this.objectType = "Gitana.LogEntryMap";


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
            return this.getFactory().logEntryMap(this.getPlatform(), this.object);
        },

        /**
         * @param json
         */
        buildObject: function(json)
        {
            return this.getFactory().logEntry(this.getPlatform(), json);
        }

    });

})(window);
