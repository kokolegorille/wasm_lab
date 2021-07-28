function GetPlaylist(){
  let ud2;
	cT = new Date();
	var PlaylistJSONTmp = playlistFile + '?time=' + cT.toISOString();
	$.getJSON(PlaylistJSONTmp)
	.done(function( data ) {
		//Link json to var
		PlaylistElement = data;

		if((!firstRun) && (pUsedLang != currentLang))
			Media(ud2);
		pUsedLang = currentLang;
		
		if(firstRun){
			if(getParamValue('media') != '') {	
				ud2 ="d"+getParamValue('media');
			}
			else
				$.each(PlaylistElement.Element, function(i, item) {
					if ((typeof(item.display) != "undefined") && (item.display != "true")) {
						//do nothing
					} else {
						ud2 = "d" + item.id;
						return false;
					}
				});
			GenPlayer(currentLang,ud2);			
			firstRun = false;
		}
	})
	.fail(function( jqxhr, textStatus, error ) {
		window.setTimeout(GetPlaylist, 60000);
	});
}