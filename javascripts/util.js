define(["jquery", "underscore"], function () {
	var stringFormat = function() {
        var args = arguments;
        if (!args.length) return "";
        if (typeof args[0] != "string") return "";
        return args[0].replace(/{\d+}/g, function (match, number) {
            var mi = parseInt(match.substr(1, match.length - 2));
            return typeof args[mi + 1] != 'undefined'
                ? args[mi + 1]
                : match;
        });
	}

	return {
		stringFormat: stringFormat
	};
});