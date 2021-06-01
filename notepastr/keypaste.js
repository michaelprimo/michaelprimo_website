let copyText = document.querySelectorAll(".inputPaste");
let sloganText = document.querySelector("#notepaster_instruction");
let notePaster_strings = [];

if(localStorage.getItem("pasteSave") != undefined)
{
  get_saveData();
}

function keypaste(id)
{
  copyText[id].select();
  copyText[id].setSelectionRange(0, 99999);
  document.execCommand("copy");
  sloganText.innerHTML = "Copied! " + copyText[id].value;
  set_saveData();
} 

function set_saveData()
{
  for(let i = 0; i < copyText.length; i++)
  {
    notePaster_strings[i] = copyText[i].value;
  }
  localStorage.setItem("pasteSave", JSON.stringify(notePaster_strings));
}

function get_saveData()
{
  notePaster_strings = JSON.parse(localStorage.getItem("pasteSave"));
  for(let i = 0; i < copyText.length; i++)
  {
    if(notePaster_strings[i] != "undefined")
    {
      copyText[i].value = notePaster_strings[i];
    }
    else
    {
      copyText[i].value = "";
    }
  }
}
