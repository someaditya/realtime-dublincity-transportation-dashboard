function redirectPage()
{
    // console.log('here');

    var userName = document.getElementById('userName').value;
    var userPassword = document.getElementById('paw').value;
    console.log(userName);
    console.log(userPassword);
    if(userName == "DublinBus" && userPassword == "DublinBus")
    {
      window.location = "DublinBus.html";
      // return false;
    }
    else if(userName == "DublinBikes" && userPassword == "DublinBikes")
    {
      window.location = "DublinBikes.html";
      // return false;
    }
    else if(userName == "CityManager" && userPassword == "CityManager")
    {
      window.location = "DublinManager.html";
      // return false;
    }
    else
    {
      $.notify(
        "Wrong Credentials. Try again !!!", 
        { position:"right" }
        );
    }
  }