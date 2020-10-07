// Exercise 1.4
// ------------
// Creating a Cat class - Part 4

// A) So far so good.
//    In real life, we naturally get more tired/hungry/lonely as time passes.
//    Let's add a new method, `wait`. It accepts a number of minutes as the
//    parameter. The cat's tiredness, hunger, and loneliness should increase
//    as the amount of time increases. They should also become less happy.
//
//    It's up to you to decide how quickly these values should change.

// B) Make Boots wait 20 minutes and call then console.log(boots);

class Cat {
    // Add code here
    // ==================== Attributes ====================
    species = "cat";
    tiredness= 10;
    hunger= 30;
    loneliness= 10;
    happiness= 30;
    name=undefined;
    breed=undefined;
    
    // ==================== constructor ====================
    constructor(name, breed){
        this.name = name;
        this.breed = breed;
    }

    // ==================== setters ====================
    // ok I regret doing this lol, probably better to use setAttribute(attri, value) since they are the same???
    // tiredness
    setTiredness(val){
        if(val!=undefined){     // check for null as well
            if(val >= 0){
                this.tiredness = val;
            }else{
                this.tiredness = 0;
            }
        }
    }
    // hunger
    setHunger(val){
        if(val!=undefined){     // check for null as well
            if(val >= 0){
                this.hunger = val;
            }else{
                this.hunger = 0;
            }
        }
    }
    // loneliness
    setLoneliness(val){
        //console.log(val);
        if(val!=undefined){     // check for null as well
            if(val >= 0){
                this.loneliness = val;
            }else{
                this.loneliness = 0;
            }
        }
    }
    // happiness
    sethappiness(val){
        if(val!=undefined){     // check for null as well
            if(val >= 0){
                this.happiness = val;
            }else{
                this.happiness = 0;
            }
        }
    }

    // ==================== methods ====================
    // I don't know why it must be arrow methods...happiness is in each method
    // method to sleep
        // t = minutes of sleep
    sleep = (t) => {
        this.setTiredness(this.tiredness-5*t);
        this.sethappiness(this.happiness+3*t);          // add 3*t of happiness
    }
    // method to eat
        // k = #kibbles
    eat = (k) => {
        this.setHunger(this.hunger-(1/5)*k);
        this.sethappiness(this.happiness+2*k);             // add 2*k of happiness
    }
    // method to play
        // m = minutes of play
    play = (m) => {
        this.setLoneliness(this.loneliness-3*m);
        this.sethappiness(this.happiness+4*m);              // add 4*m of happiness
    }
    // method to waid
        // m = minutes of waiting
    wait = (m) => {
        //It accepts a number of minutes as the
        //    parameter. The cat's tiredness, hunger, and loneliness should increase
        //    as the amount of time increases. They should also become less happy.
        this.setTiredness(this.tiredness+3*m);
        this.setHunger(this.hunger+2*m);
        this.setLoneliness(this.loneliness+m);
        this.sethappiness(this.happiness-2*m);
    }

}

let boots = new Cat("boots", "Semi");
console.log(boots);
boots.wait(20);
console.log(boots);
