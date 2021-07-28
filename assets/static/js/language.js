function Languages(){
	var languagesArray = availableLang.split(',');
	$("#LanguageMenuTitle").html("Available languages:");
	$.each(languagesArray, function(index, value){
		var idLang="Lang_"+value;
		var l ="";
		switch(value){
			case "fl":
				l ="Floor";
				break;
			case "en":
				l ="English";
				break;
			case "fr":
				l="Fran&#231;ais";
				break;
			case "zh":
				l="&#20013;&#25991;";
				break;
			case "ar":
				l="&#1593;&#1585;&#1576;&#1610;";
				break;
			case "ru":
				l="&#1056;&#1091;&#1089;&#1089;&#1082;&#1080;&#1081;";
				break;
			case "es":
				l="Espa&#241;ol";
				break;
			case "de":
				l ="Deutsch";
				break;
			default :
				l ="English";
				break;
		}
		$("#langues").append("<a id="+idLang+" class='MenuLang' href=\"javascript:setLanguage('"+value+"');\">"+l+"</a>&nbsp;");
	});
}
function setLanguage(lang){
	//Set the active color
	$( ".MenuLang" ).removeClass( "active" );
	var activeColor = "#Lang_"+lang;
	$(activeColor).addClass("active");
	currentLang = lang;
	switch(lang){
		case "en":
			avl ="Available languages:";
			break;
		case "fr":
			avl="Langues disponibles:";
			break;
		case "zh":
			avl="&#36873;&#25321;&#35821;&#35328;:";
			break;
		case "ar":
			avl="&#1575;&#1604;&#1604;&#1594;&#1575;&#1578;:";
			break;
		case "ru":
			avl="&#1071;&#1079;&#1099;&#1082;&#1080;:";
			break;
		case "es":
			avl="Lenguas disponibles:";
			break;
		case "de":
			avl="Verfügbare Sprachen:";
			break;
		default:
			avl ="Available languages:";
			break;
	}
	if(enableSelectLanguage)
		document.getElementById("LanguageMenuTitle").innerHTML = avl;
	GetPlaylist();
}