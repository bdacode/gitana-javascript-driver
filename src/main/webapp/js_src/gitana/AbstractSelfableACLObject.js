(function(window)
{
    var Gitana = window.Gitana;
    
    Gitana.AbstractSelfableACLObject = Gitana.AbstractSelfableObject.extend(
    /** @lends Gitana.AbstractSelfableACLObject.prototype */
    {
        /**
         * @constructs
         * @augments Gitana.AbstractSelfableObject
         *
         * @class Abstract base class for selfable ACL Gitana document objects.
         *
         * @param {Gitana.Platform} platform
         * @param [Object] object
         */
        constructor: function(platform, object)
        {
            // finally chain to parent prototype
            this.base(platform, object);
        },



        //////////////////////////////////////////////////////////////////////////////////////////
        //
        // ACL METHODS
        //
        //////////////////////////////////////////////////////////////////////////////////////////

        /**
         * Retrieve full ACL and pass into chaining method.
         *
         * @chained this
         *
         * @param callback
         */
        loadACL: function(callback)
        {
            var self = this;

            var uriFunction = function()
            {
                return self.getUri() + "/acl/list";
            };

            return this.chainGetResponse(this, uriFunction).then(function() {
                callback.call(this, this.response);
            });
        },

        /**
         * Retrieve list of authorities and pass into chaining method.
         *
         * @chained this
         *
         * @param {Gitana.DomainPrincipal|String} principal the principal or the principal id
         * @param callback
         */
        listAuthorities: function(principal, callback)
        {
            var principalId = this.extractPrincipalId(principal);

            var self = this;

            var uriFunction = function()
            {
                return self.getUri() + "/acl?id=" + principalId;
            };

            return this.chainGetResponseRows(this, uriFunction).then(function() {
                callback.call(this, this.response);
            });
        },

        /**
         * Checks whether the given principal has a granted authority for this object.
         * This passes the result (true/false) to the chaining function.
         *
         * @chained this
         *
         * @param {Gitana.DomainPrincipal|String} principal the principal or the principal id
         * @param {String} authorityId the id of the authority
         * @param callback
         */
        checkAuthority: function(principal, authorityId, callback)
        {
            var principalId = this.extractPrincipalId(principal);

            var self = this;

            var uriFunction = function()
            {
                return self.getUri() + "/authorities/" + authorityId + "/check?id=" + principalId;
            };

            return this.chainPostResponse(this, uriFunction).then(function() {
                callback.call(this, this.response["check"]);
            });
        },

        /**
         * Grants an authority to a principal against this object.
         *
         * @chained this
         *
         * @param {Gitana.DomainPrincipal|String} principal the principal or the principal id
         * @param {String} authorityId the id of the authority
         */
        grantAuthority: function(principal, authorityId)
        {
            var principalId = this.extractPrincipalId(principal);

            var self = this;

            var uriFunction = function()
            {
                return self.getUri() + "/authorities/" + authorityId + "/grant?id=" + principalId;
            };

            return this.chainPostEmpty(this, uriFunction);
        },

        /**
         * Revokes an authority from a principal against this object.
         *
         * @chained this
         *
         * @param {Gitana.DomainPrincipal|String} principal the principal or the principal id
         * @param {String} authorityId the id of the authority
         */
        revokeAuthority: function(principal, authorityId)
        {
            var principalId = this.extractPrincipalId(principal);

            var self = this;

            var uriFunction = function()
            {
                return self.getUri() + "/authorities/" + authorityId + "/revoke?id=" + principalId;
            };

            return this.chainPostEmpty(this, uriFunction);
        },

        /**
         * Revokes all authorities for a principal against the server.
         *
         * @chained server
         *
         * @param {Gitana.Principal|String} principal the principal or the principal id
         */
        revokeAllAuthorities: function(principal)
        {
            return this.revokeAuthority(principal, "all");
        },

        /**
         * Loads the authority grants for a given set of principals.
         *
         * @chained organization
         *
         * @param callback
         */
        loadAuthorityGrants: function(principalIds, callback)
        {
            if (!principalIds)
            {
                principalIds = [];
            }

            var json = {
                "principals": principalIds
            };

            return this.chainPostResponse(this, this.getUri() + "/authorities", {}, json).then(function() {
                callback.call(this, this.response);
            });
        },

        /**
         * Checks whether the given principal has a permission against this object.
         * This passes the result (true/false) to the chaining function.
         *
         * @chained server
         *
         * @param {Gitana.DomainPrincipal|String} principal the principal or the principal id
         * @param {String} permissionId the id of the permission
         * @param callback
         */
        checkPermission: function(principal, permissionId, callback)
        {
            var principalId = this.extractPrincipalId(principal);

            var uriFunction = function()
            {
                return self.getUri() + "/permissions/" + permissionId + "/check?id=" + principalId;
            };

            return this.chainPostResponse(this, uriFunction).then(function() {
                callback.call(this, this.response["check"]);
            });
        }


        //////////////////////////////////////////////////////////////////////////////////////////
        //
        // END OF ACL METHODS
        //
        //////////////////////////////////////////////////////////////////////////////////////////


    });

})(window);
