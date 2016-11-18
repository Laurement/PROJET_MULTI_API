function searchProfile()
{

  var fieldValue = $('#value_name').val()+"-"+$('#value_number').val();


  if (fieldValue != "") {
    $("td").remove();
    var test = "https://eu.api.battle.net/d3/profile/" + fieldValue +"/?locale=fr_FR&apikey=r6jfzegpjvdn3vrqdu4vwnmrt32dhvq9";
    // debugger;
    $.ajax(
      {
        type: 'GET',
        url: 'https://eu.api.battle.net/d3/profile/' + fieldValue + '/?locale=fr_FR&apikey=r6jfzegpjvdn3vrqdu4vwnmrt32dhvq9',
        success: function(data)
        {
          $("#tbody").append("<tr><td>"+data.battleTag+"</td><td>"+data.paragonLevel+"</td></tr>");
          $.each( data.heroes, function( key, value ) {
            $("#tCore").append("<tr><td>"+value.id+"</td><td>"+value.name+"</td><td>"+value.class+"</td><td>"+value.gender+"</td><td>"+value.level+"</td></tr>");
          });
        },
        error: function()
        {
          alert('La requête de recherche n\'a pas abouti');
        }
      }
    )
  }
  else {
      $("td").remove();
      var species_page1 = getLocal('species_page1');
      $("#tbody").append("<tr><td>"+data.battleTag+"</td><td>"+data.paragonLevel+"</td></tr>");
      $.each( data.heroes, function( key, value ) {
        $("#tCore").append("<tr><td>"+value.id+"</td><td>"+value.name+"</td><td>"+value.class+"</td><td>"+value.gender+"</td><td>"+value.level+"</td></tr>");
      });
  }
}






function setLocal(id, data){
  localStorage.setItem(id, JSON.stringify(data));
}
function getLocal(id){
  return JSON.parse(localStorage.getItem(id));
}
