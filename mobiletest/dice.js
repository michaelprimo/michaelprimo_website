let die_roll = 1;
let die_roll_message = ["normal","No extra rules for now...","...but if you die you will change them."];

function on_a_roll()
{
    die_roll = Math.floor(Math.random() * 6) + 1;
    //die_roll = 4;
    switch(die_roll)
    {
        case 1:
            die_roll_message[0] = "normal";
            die_roll_message[1] = "No extra rules for now...";
            die_roll_message[2] = "...but if you die you will change them.";
            break;
        case 2:
            die_roll_message[0] = "mirrored";
            die_roll_message[1] = "The whole world is specular.";
            die_roll_message[2] = "The level itself is flipped.";
            break;
        case 3:
            die_roll_message[0] = "scrambled";
            die_roll_message[1] = "You will see random blocks.";
            die_roll_message[2] = "Many new blocks might appear.";
            break;
        case 4:
            die_roll_message[0] = "easier";
            die_roll_message[1] = "You will see less spikes.";
            die_roll_message[2] = "Only the important ones.";
            break;
        case 5:
            die_roll_message[0] = "deceptive";
            die_roll_message[1] = "Watch out of 1s, spikes and stars.";
            die_roll_message[2] = "1s can let you pass through them.";
            break;
        case 6:
            die_roll_message[0] = "creative";
            die_roll_message[1] = "Every time you land you change the block.";
            die_roll_message[2] = "Try to not confuse yourself too much...";
            break;
    }
    
}

