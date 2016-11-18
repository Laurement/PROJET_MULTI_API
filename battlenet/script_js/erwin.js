$(function()
{
  $.getJSON( "script_json/erwin.json", function( data )
  {
    $("#tbody").append("<tr><td>"+data.battleTag+"</td><td>"+data.paragonLevel+"</td></tr>");
    $.each( data.heroes, function( key, value ) {
      $("#tCore").append("<tr><td>"+value.id+"</td><td>"+value.name+"</td><td>"+value.class+"</td><td>"+value.gender+"</td><td>"+value.level+"</td></tr>");
    });
  });
});
