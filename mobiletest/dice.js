let die_roll = 1;
let die_roll_message = "normal";
function on_a_roll()
{
    die_roll = Math.floor(Math.random() * 6) + 1;
    //die_roll = 4;
    switch(die_roll)
    {
        case 1:
            die_roll_message = "normal";
            break;
        case 2:
            die_roll_message = "mirrored";
            break;
        case 3:
            die_roll_message = "scrambled";
            break;
        case 4:
            die_roll_message = "easier";
            break;
        case 5:
            die_roll_message = "deceptive";
            break;
        case 6:
            die_roll_message = "creative";
            break;
    }
    
}

