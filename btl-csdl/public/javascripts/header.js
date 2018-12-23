$("document").ready(function () {
  $("#noti").mouseenter(function () {
    $("#noti").addClass("swing animated infinite");
  });
  $("#noti").mouseleave(function () {
    $("#noti").removeClass("swing animated infinite");
  })
})