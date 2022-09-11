let die_roll = 1;
let die_roll_message = "normal";
let die_roll_description = "";
function on_a_roll()
{
    die_roll = Math.floor(Math.random() * 6) + 1;
    //die_roll = 4;
    switch(die_roll)
    {
        case 1:
            die_roll_message = "normal";
            die_roll_description = "No extra rules for now.";
            break;
        case 2:
            die_roll_message = "mirrored";
            die_roll_description = "The whole world is specular.";
            break;
        case 3:
            die_roll_message = "scrambled";
            die_roll_description = "You will see random blocks.";
            break;
        case 4:
            die_roll_message = "easier";
            die_roll_description = "You will see less spikes.";
            break;
        case 5:
            die_roll_message = "deceptive";
            die_roll_description = "Watch out of 1s, spikes and stars.";
            break;
        case 6:
            die_roll_message = "creative";
            die_roll_description = "Every time you land you change the block.";
            break;
    }
    
}

