// first exercise of the Coderhouse backend programming course

class User{
    
    constructor(name,lastname,books,pets){
        this.name= name;
        this.lastname = lastname;
        this.books = [];
        this.pets = [];
    }
    
    getFullName(){
        let fullName = `The Fullname's User is ${this.name} ${this.lastname}`;
        console.log(fullName);
    } 

    addPets(pet){
        this.pets.push(pet);
    }
    
    countPets(){
        let count = this.pets.length;
        console.log(count);
    }

    addBook(bookName,author){
        let book = {bookName,author};
        this.books.push(book); 
    }

    getBookNames(){
        let bookTitles = [];
        for(let i of this.books){
            bookTitles.push(i.bookName);  
        }
        console.log(bookTitles);
    }
}

const newFullUser = new User('Homer', 'Simpsons', [], []);
//books
newFullUser.addBook('How to kill Ned Flanders', 'Sidekick Bob');
newFullUser.addBook('Moes Bar History', 'Barney Gumble');
//pets
newFullUser.addPets('Santas Little Helper');
newFullUser.addPets('Snowball II');

console.log(newFullUser);
newFullUser.getBookNames();
newFullUser.countPets();
newFullUser.getFullName();