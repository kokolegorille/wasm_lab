function PlayerVideo()
{
	if (enableSelectLanguage)
		Languages();
	currentLang = defaultLang;
	if (getParamValue('lang')  != '')
		currentLang = getParamValue('lang');
	setLanguage(currentLang);
}

//MEDIA FUNCTION
function Media(ud2a) {
	if (playingVideoSeek != 0)
	{
		playingVideoSeek = 0;
		return;
	}
	MediaChange(ud2a);
}
function MediaChange(ud2a) {
	ud2 = ud2a;
	ud2tmp = ud2.substring(1);
	jwplayer("Player").stop();
	VideoPos = 0;
	var NewElementArray = [];
	var NewElement = {};
	getMediaInfo(ud2tmp);
	
	NewElement.file = NewElementTmp["file_"+currentLang];
	NewElement.image = NewElementTmp.image;
	if (NewElementTmp.type != "")
		NewElement.type = NewElementTmp.type;
	if ( NewElementTmp.tracks != "")
		NewElement.tracks = NewElementTmp.tracks;
	
	if ((typeof(NewElementTmp.jingle) != "undefined") && (NewElementTmp.jingle != ""))
	{
		var NewElementJingle = {};
		NewElementJingle.file = NewElementTmp.jingle;
		NewElementArray = [NewElementJingle,NewElement];
	}
	else {
		NewElementArray = [NewElement];
	}
	jwplayer("Player").load(NewElementArray);
}
function getMediaInfo(ud2) {
	$.each(PlaylistElement.Element, function(i, item) {
		if(item.id == ud2)
			NewElementTmp = PlaylistElement.Element[i];	
	});
}
function GenPlayer(lang, ud2){
	var NewElementArray = [];
	var NewElement = {};

	// ud2tmp = ud2.substring(1);

	ud2tmp = ud2 ? ud2.substring(1) : "";

	getMediaInfo(ud2tmp);

	NewElement.file = NewElementTmp["file_"+lang];
	NewElement.image = NewElementTmp.image;
	if (NewElementTmp.type != "")
		NewElement.type = NewElementTmp.type;
	if (NewElementTmp.tracks != "")
		NewElement.tracks = NewElementTmp.tracks;
	
	if ((typeof(NewElementTmp.jingle) != "undefined") && (NewElementTmp.jingle != ""))
	{
		var NewElementJingle = {};
		NewElementJingle.file = NewElementTmp.jingle;
		NewElementArray = [NewElementJingle,NewElement];
	}
	else {
		NewElementArray = [NewElement];
	}

	var jwplayerconfig = {
		primary : 'html5',
		autostart: 'true' ,
		width: '100%',
		aspectratio: '16:9',
		startparam: "start",
		androidhls: 'true',
		hlshtml: 'true',
		abouttext: 'Powered by 4AM SA',
		aboutlink: 'https://www.4am.ch',
		displaytitle : false,
		displaydescription : false,
		nextUpDisplay : false,
		preload:"auto",
		ga: {},
		playlist: NewElementArray
	};
	jwplayer("Player").setup(jwplayerconfig);
}