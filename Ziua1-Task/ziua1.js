/*//1) Metode de ES6: https://www.w3schools.com/js/js_es6.asp

// 2) 
// a) let iti permite sa declari o variabila intr-o bloc, fara a influenta in afara.
// https://www.w3schools.com/js/js_es6.asp#mark_let
var x = 10 
{   
    let x = 2
    // x-ul este 2
    console.log("x folosind let:", x)
}

// x-ul este 10
console.log("x folosind var:", x)

//  b) const permite sa creezi o variabila constanta, care are aceleasi caracterstici cu let, dar aceasta variabila nu poate fi schimbata
// https://www.w3schools.com/js/js_es6.asp#mark_const
var x = 10
{
    const x = 2
    // x este 2
    try
    {
        x = 4
    }
    catch (error)
    {
        console.log(error)
    }
    // Ne este afisata eroarea
}
console.log("x dupa ce am folosit const:", x);

//3)
// https://www.geeksforgeeks.org/javascript-spread-operator/
// Spread Operator permite ruperea in bucati a unei variabile iterabile. 
// Sintaxa:
var variable = [1,2,3]; 
console.log(...variable);
// Afiseaza: 1 2 3. Deci in loc sa facem un for pentru afisare, pur si simplu, spread operator, trece prin fiecare element din variabila initiala.

// Exemple folosind Spread Operator in loc de alte functii:
// i) Concat:
{
    let arr = [1,2,3]
    let arr2 = [4,5]
    arr = arr.concat(arr2);
    console.log("Folosind concat:", arr)// va afisa [1, 2, 3, 4, 5]

    let arr3 = [6,7]
    arr = [...arr,...arr3]
    console.log("Folosind spread operator:", arr)// va afisa [1, 2, 3, 4, 5, 6, 7]
}


// ii) Copy - cand vrei sa modifici variabila copiata, fara sa o modifici pe cea initiala
{
    let arr = [1,2,3]
    let arr2 = arr

    arr2.push(4)
    console.log("arr dupa ce am adaugat in arr2:", arr);
    console.log("arr2:", arr2)
}
// Elementul adaugat in arr2 este adaugat si in arr pentru ca copia arr2 face referinta la arr

// Cu spread operator
{
    let arr = [1,2,3]
    let arr2 = [...arr]

    arr2.push(4)
    console.log("arr dupa ce am adaugat in arr2:", arr);
    console.log("arr2:", arr2)
}
// Aici se afiseaza ceea ce vrem, deoarece arr2 nu mai face referinta la arr. 


// iii) Expand
{
    let arr = [1,2,3]
    let arr2 = [arr, 4, 5]

    console.log(arr2) // Afiseaza [ [ 1, 2, 3 ], 4, 5 ], nu tocmai ceea ce voiam
}

// Cu sprea operator
{
    let arr = [1,2,3]
    let arr2 = [...arr, 4, 5]
    console.log(arr2) // Afiseaza [ 1, 2, 3, 4, 5 ]. Pare mai frumos :D
}


// iv) Match
{
    console.log(Math.min(1,2,3,-1)); // Se afiseaza -1. Ceea ce este corect. Sa incercam acum cu un vector.
    
    let arr = [1,2,3,-1]
    console.log(Math.min(arr)) // Se afiseaza NaN, pentru ca nu stie Math.min nu se uita prin elementele lui arr, ci doar ce este arr ca tip de variabila, iar Math.min face minimul dintre o variabila de tip array.

    console.log(Math.min(...arr)) // Se afiseaza -1 pentru ca acum spread operatorul ii da lui Math.min fiecare element din arr si acum stie sa faca minimul.
}

// v) Spread Operator cu obiecte - ES6 feature.

{
    const user1 = {
        name: "Alex",
        age: 22
    }

    const cloneUser = { ...user1 };
    console.log(cloneUser) // Afiseaza obiectul nou identic cu cel creat.
}

// Sa incercam sa combinam doua obiecte 
{
    const user1 = {
        name: "Alex",
        age: 22
    }

    const user2 = {
        name: "Andrei",
        location: "Romania",
        age: 24,
    }

    const cloneUser = { ...user1, ...user2 };
    console.log(cloneUser)// Afiseaza al doilea obiecte, ceea ce inseamna ca il rescrie pe primul
}

// 4) a) Iterarea unui obiect 
// https://flaviocopes.com/how-to-iterate-object-properties-javascript/
{
    const items = {
        'first': new Date(),
        'second': 2,
        'third': 'test'
      }
    
      // Se poate face iterare cu for...in
      for (const item in items) {
          console.log(item, ":" , items[item])
      }

      //Se poate face iterare cu Object.entries()
      Object.entries(items).map(item => {
          console.log(item)
      })

      Object.entries(items).forEach(item => {
          console.log(item)
      })

      for (const item of Object.entries(items)){
          console.log(item)
      }
}


// b) Deep copy 
// https://www.samanthaming.com/tidbits/70-3-ways-to-clone-objects/
// i) Cu spread operator, cum facut la 3) v)
// ii) Object.assign
{
    const food = {
        'first': "beef",
        'second' : "bacon",
    }

    const cloneFood = Object.assign({}, food)
    cloneFood.third = "third"
    cloneFood["third"] = "chicken"

    console.log(cloneFood) // Afiseaza { first: 'beef', second: 'bacon', third: 'chicken' }
    console.log(food) // Afiseaza { first: 'beef', second: 'bacon' }

}

// iii)
// Cu JSON
{
    const food = {
        'first': "beef",
        'second' : "bacon",
    }

    const cloneFood = JSON.parse(JSON.stringify(food));
    cloneFood.third = "third"
    cloneFood["third"] = "chicken"

    console.log(cloneFood) // Afiseaza { first: 'beef', second: 'bacon', third: 'chicken' }
    console.log(food) // Afiseaza { first: 'beef', second: 'bacon' }
}

// 5) Arrays 
// a) Accesor methods
// https://www.digitalocean.com/community/tutorials/how-to-use-array-methods-in-javascript-accessor-methods
// i) concat() - Metoda de unire a doua sau a mai multori vectori
{
    let monovalves = [ "abalone", "conch" ];
    let bivalves = [ "oyster", "mussel", "clam" ];

    let fish = monovalves.concat(bivalves)
    console.log(fish) // Afiseaza [ 'abalone', 'conch', 'oyster', 'mussel', 'clam' ]
} 

// ii) join() - Metoda ce converteste toate elementele dintr-un vector intr-un string nou.
{
    let fish = [ 'abalone', 'conch', 'oyster', 'mussel', 'clam' ]

    let fishString = fish.join()

    console.log(fishString) // Afiseaza abalone,conch,oyster,mussel,clam
    // Se poate adauga si caractere de separare fata de cel default

    fishString = fish.join(', ') 
    console.log(fishString) // Afiseaza abalone, conch, oyster, mussel, clam
}


// iii) slice() - Copiaza o parte dintr-un vector intr-un vector nou
{
    let fish = [ 'abalone', 'conch', 'oyster', 'mussel', 'clam' ]

    let fish2 = fish.slice(2,5) // Afiseaza elementele care au inceputul la index-ul 2 si sfarsitul la indexul 5.
    console.log(fish2) // Afiseaza [ 'oyster', 'mussel', 'clam' ], adica ultimele 3 elemente

    let fish3 = fish.slice(1) // Afiseaza elementele de la index-ul 1 pana la sfarsit
    console.log(fish3) // Afiseaza [ 'conch', 'oyster', 'mussel', 'clam' ]
}

 // iv) indexOf() - Returneaza primul index al unui element daca este de mai multe ori
 {
    let fish = [ 'abalone', 'mussel', 'oyster', 'mussel', 'clam' ] // mussel este de 2 ori
    musselIndex = fish.indexOf('mussel')
    console.log(musselIndex) // Afiseaza 1. 

    // Daca argumentul dat nu este o valoare care exista, atunci se afiseaza -1
    noneVar = fish.indexOf('ciupacabra')
    console.log(noneVar) // Afiseaza -1
 }


// v) lastIndexOF() - Returneaza ultimul index al unui element daca este de mai multe ori
{
    let fish = [ 'abalone', 'mussel', 'oyster', 'mussel', 'clam' ] // mussel este de 2 ori
    musselIndex = fish.lastIndexOf('mussel')
    console.log(musselIndex) // Afiseaza 3. 
}

// b) Iteration Methods
// https://www.digitalocean.com/community/tutorials/how-to-use-array-methods-in-javascript-iteration-methods
// Mai intai recapitulam cum arata un Arrow Function 
{
    var example = function () {
        //
    }
    example ()
}
// Exemplul de mai sus este modul clasic de scriere al unei functii 

{
    var example = () => {
        //
    }
    example()
}
// Asa se scrie un Arrow function
// Intre paranteze pot fi si parametri, daca exista un parametru se poate scrie asa:
{
    var example = param => {
        //
    }
    example()
}


// i) forEach() - metoda asemanatoare lui for
{
    let fish = [ 'abalone', 'mussel', 'oyster', 'mussel', 'clam' ]

    fish.forEach(item => {
        console.log(item)
    })
}

// ii) map() - creeaza un nou vector cu rezultatele unei functii care apeleaza fiecare element din vector
{
    let fish = [ 'abalone', 'mussel', 'oyster', 'mussel', 'clam' ]

    fish.map(item => {
        console.log(item)
    })
}

// iii) filter() - functie ce returneaza o noua metoda cu elemente ce trebuie sa indeplineasca un test dat
{
    let fish = [ 'abalone', 'shark', 'oyster', 'squid', 'clam' ]

    let filteredFish = fish.filter(c => {
        return c[0] === "s";
    })

    console.log(filteredFish) // Afiseaza [ 'shark', 'squid' ]
}

// iv) reduce() - metoda ce reduce un vector intr-o singura variabila
{
    let numbers = [ 42, 23, 16, 15, 4, 8 ]
    sum = numbers.reduce((a, b) => {
        return a + b;
    })

    console.log(sum) // Afiseaza 108
}

// v) find() - Metoda ce returneaza prima valoare dintr-un vector care indeplineste un test dat
{
    let fish = [ 'abalone', 'shark', 'oyster', 'squid', 'clam' ]
    let fishTest = ['shark', 'clam']

    
    const isfishTest = f => {
        return fishTest.includes(f);
    }

    let fishFind = fish.find(isfishTest)
    console.log(fishFind)  // Afinseaza shark
}



// vi) findIndex() - Returneaza index-ul primei valori care indeplineste un test dat
{
    let fish = [ 'abalone', 'shark', 'oyster', 'squid', 'clam' ]
    let fishTest = ['shark', 'clam']

    
    const isfishTest = f => {
        return fishTest.includes(f);
    }

    let fishFind = fish.findIndex(isfishTest)
    console.log(fishFind)  // Afiseaza 1
}

//https://dev.to/ibrahima92/javascript-array-methods-mutator-vs-non-mutator-15e2#includes
// vii) includes() - Determina daca un vector contine o valoare. Returneaza true sau false.
{
    const array = [1, 2, 3, 4, 5]
    console.log(array.includes(3)) // Afiseaza true
}

// ix) every() -  Verifica daca toate elementele trec un test dat. Returneaza true sau false
{
    const array = ['a', 'a', 'a', 'a', 'a']
    console.log(array.every(test => test === 'a')) // Afiseaza true
}

// x) some() - Verifica daca cel putin un element trece de un test dat. Returneaza true sau false
{
    const array = ['a', 'b', 'c', 'd', 'e']
    console.log(array.some(test => test === "d")) // Afiseaza true
}

// xi) flat() - aplatizeaza un sub-vector in elementele unui vecor. Returneaza vectorul modificat
{
    const array = [[1, 2], [3, 4], 5]
    console.log(array.flat()) // Afiseaza [ 1, 2, 3, 4, 5 ]
}

// xii) flatMap() - aplica o functie fiecarui element al unui vector apoi aplatizeaza rezultatul intr-un vector
{
    const array = [[1], [2], [3], [4], [5]]
    console.log(array.flatMap(arr => arr * 10)) // Afiseaza [ 10, 20, 30, 40, 50 ]
}

// c) Mutator methods 
// https://dev.to/ibrahima92/javascript-array-methods-mutator-vs-non-mutator-15e2

// i) sort() - sorteaza elementele unui vector
{
    const array = [5, 4, 3, 2, 1]
    console.log(array.sort()) // Afiseaza [ 1, 2, 3, 4, 5 ]
}

// ii) unshift() - Adauga unul sau mai multe elemente la inceputul unui vector. Returneaza lungimea vectorului
{
    const array = [5, 4, 3, 2, 1]
    console.log(array.unshift(6)) // Afiseaza 6
    console.log(array) // Afiseaza [ 6, 5, 4, 3, 2, 1 ]
}

// iii) shift() - Sterge primul element dintr-un vector. Returneaza elementul sters sau undefined daca vectorul este gol
{
    const array = [5, 4, 3, 2, 1]
    console.log(array.shift()) // Afiseaza 5
    console.log(array) // Afiseaza [ 4, 3, 2, 1 ]
}

// iv) splice() - Sterge sau inlocuieste elemente existente si/sau adauga elemente noi. Returneaza elementul/elementele sterse. Daca niciun element nu e sters atunci returneaza un un vector gol.
{
    const array = [5, 4, 3, 2, 1]
    console.log(array.splice(0, 2, 8, 7))// Primele doua reprezinta intervalul de numere care este sters din array, iar urmatoarele sunt numerele care se adauga la inceputul vectorului. Afiseaza [ 5, 4 ]
    console.log(array) // Afiseaza [ 8, 7, 3, 2, 1 ]
    
}

// v) push() - Adauga unul sau mai multe numere la sfarsitul vectorului. Returneaza lungimea noului vector
{
    const array = [5, 4, 3, 2, 1]
    console.log(array.push(7))// Afiseaza 6
    console.log(array) // Afiseaza [ 5, 4, 3, 2, 1, 7 ]
    
}

// vi) reverse() - Inverseaza un vector. Returneaza vectorul intors
{
    const array = [5, 4, 3, 2, 1]
    console.log(array.reverse()) // Afiseaza [ 1, 2, 3, 4, 5 ]
}

// vii) pop() - Sterge ultimul element dintr-un vector. Returneaza elementul sters sau undefined daca vectorul este gol.
{
    const array = [5, 4, 3, 2, 1]
    console.log(array.pop()) // Afiseaza 1
    console.log(array) // Afiseaza [ 5, 4, 3, 2 ]
}

// viii) fill() - Umple elementele unui array cu aceeasi valoare. Returneaza vectorul modificat
{
    const array = [5, 4, 3, 2, 1]
    console.log(array.fill(0, 2, 3)) // Primul numar este elementul cu care se inlocuieste, iar urmatoarele doua numere reprezinta intervalul in care se inlocuieste. Afiseaza [ 5, 4, 0, 2, 1 ]
}

// 6)
// a) Promise -  este un obiect care leaga codul produs si raspunsul acestuia daca este corect.
// https://www.w3schools.com/js/js_promise.asp
{
    let myPromise = new Promise(function(myResolve, myReject) {
        let x = 0;

        x = 5 

        if (x == 0) {
          myResolve("OK");
        } else {
          myReject("Error");
        }
      });
      
      myPromise.then(
        function(value) {console.log(value);},
        function(error) {console.log(error);}
      );
}

// b) Callback - Reprezinta o functie care este trecuta ca argument altei functii
// https://www.w3schools.com/js/js_callback.asp
 
// 7) a) async - face o functie sa returneze un Promise
// b) await - face o functie sa astepte un Promise
// https://www.w3schools.com/js/js_async.asp
{
    async function myDisplay() {
        let myPromise = new Promise(function(myResolve, myReject) {
          myResolve("Haos");
        });
        console.log(await myPromise);
      }
    
      myDisplay()
}

// 8) Closures - este o functie care are  acces la parinte chiar daca acesta nu a mai fost apelat
// https://www.w3schools.com/js/js_function_closures.asp
{
    function adunare(x) {
        return function(y) {
            return x + y
        }
    }
     
    let add5 = adunare(5)
    let add10 = adunare(10)

    console.log(add5(2)) // Afiseaza 7
    console.log(add10(2)) // Afiseaza 12
}
*/