currentLang ="";
pUsedLang = "";
timerPlaylist = null;
firstRun = true;
playingVideoId ="";
playingVideoSeek = 0;
playlistupdate = 0;

function getParamValue(param, url) {
	var u = url == undefined ? document.location.href : url;
	var reg = new RegExp('(\\?|&|^)' + param + '=(.*?)(&|$)');
	matches = u.match(reg);
	if (matches === null) return '';
	return matches[2] != undefined ? decodeURIComponent(matches[2]).replace(/\+/g, ' ') : '';
}
