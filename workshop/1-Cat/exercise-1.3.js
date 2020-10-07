    // Exercise 1.3
    // ------------
    // Creating a Cat class - Part 3

    // A) In the previous exercises, we created a Cat class and used it to create a
    //    `boots` object.
    //    Rewrite that Cat class, but let's also add some functions that will
    //    modify the various porperties of a cat.
    //    Write methods that will update tiredness, hunger, loneliness, and
    //    happiness.

    // HINT: You need to write arrow functions here. () => {}
    // - Write a sleep method that accept hours and reduces tiredness by 5 times
    //   that number. So if the cat has a tiredness of `50`, and sleeps for 10
    //   hours, their tiredness will be reduced to 0 (10 * 5).

    // - Write an eat method that accept number of kibbles and reduces hunger by 1/5
    //   that number.

    // - Write an play method that accept minutes and reduces loneliness by 3 times
    //   that number.

    // - the happiness property should be modified all of the above methods as well.
    //
    // You decide how much sleep, eat, and play affects your cat's happiness.

    // B) call the different methods with appropriate values and then console.log boots to see what happened to the property values.

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

}

let boots = new Cat("boots", "Semi");
console.log(boots);
boots.sleep(30);
console.log(boots);
boots.play(5);
console.log(boots);
boots.eat(40);
console.log(boots);