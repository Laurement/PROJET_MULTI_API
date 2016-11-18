// au chargement de la page - affiche la premiere vague.
$( document ).ready(function() {
  $.ajax({
    dataType: "json",
    url: "script_json/films.json",
    success: function(data){
      $.each(data.results, function(key, value){
          $("#tbody").append("<tr><td id=\"title\">"+value.title + "</td><td id=\"episode_id\">" + value.episode_id + "</td><td id=\"director\">"+value.director+"</td><td id=\"producer\">"+value.producer+"</td><td id=\"release_date\">"+value.release_date+"</td><td><div class=\"flex\"><a class=\"stream\" href=\""+ value.trailer +"?iframe\" id=\"film_access\"> <img src=\"../images/play.png\"> </a></div></td><td><div class=\"flex\"><a class=\"stream\" href=\""+ value.film_access +"?iframe\" id=\"film_access\"> <img class=\"images_play\" src=\"../images/play.png\"></a></div></td></tr>");});
        $("a.stream").fancybox({
        			'hideOnContentClick' : false,
        			'padding'						 : 0,
        			'overlayColor'			 :'#D3D3D3',
        			'transitionIn'			 :'elastic',
        			'transitionOut'			 :'elastic',
        			'zoomSpeedIn'				 : 300,
        			'zoomSpeedOut'			 : 300,
              'overlayOpacity'		 : 0.7,
        			'width'							 : "50%",
        			'height'						 : "50%",
        			'type'							 : 'iframe'
        		});
    },
    error: function() {
      alert('La requête n\'a pas abouti - PAGE 1');
    }
  });
});
