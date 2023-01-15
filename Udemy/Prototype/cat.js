// class Cat {
//     constructor(name, age){
//         this.name = name;
//         this.age = age;
//     }

//     eat(){
//         return `${this.name} is eating!`;
//     }

//     meow(){
//         return 'MEOWWWW!!';
//     }
// }

// class Dog {
//     constructor(name, age){
//         this.name = name;
//         this.age = age;
//     }

//     eat(){
//         return `${this.name} is eating!`;
//     }

//     bark(){
//         return 'WOOOFF!!';
//     }
// }

class Pet {
    constructor(name, age){
        this.name = name;
        this.age = age;
    }

    eat(){
        return `${this.name} is eating!`;
    }
}

class Cat extends Pet{
    constructor(name, age, livesLeft = 9){
        super(name, age);
        this.livesLeft = livesLeft;
    }

    meow(){
        return 'MEOWWWW!!';
    }
}

class Dog extends Pet{
    constructor(name, age){
        super(name, age);
    }

    bark(){
        return 'WOOOFF!!';
    }
}