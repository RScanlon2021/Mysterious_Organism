

# Mysterious_Organism

#### A simulation to randomly generate DNA sequences and assign them to dynamically created objects. The objects will also contain a random mutation function, a compare function, and a probability of survival function.

This program was written as a challenge project for Codecademy. Below I will list the step-by-step requrements for completing the project, along with code fences for the related functions. 

1. DNA is comprised of four bases (**A**denine, **T**hymine, **C**ytosine, and **G**uanine). When `returnRandBase()` is called, it will randomly select a base and return the base (`'A'`,`'T'`,`'C'`, or `'G'`).

   `mockUpStrand()` is used to generate an array containing 15 bases to represent a single DNA strand with 15 bases.

   `uniqueId()` is used to generate a unique ID number for each sequence

   ```javascript
   let uniqueId = () => {
     return Math.floor(Math.random() * 10000);
   };
   
   // Returns a random DNA base
   const returnRandBase = () => {
     const dnaBases = ["A", "T", "C", "G"];
     return dnaBases[Math.floor(Math.random() * 4)];
   };
   
   // Returns a random single strand of DNA containing 15 bases
   const mockUpStrand = () => {
     const newStrand = [];
     for (let i = 0; i < 15; i++) {
       newStrand.push(returnRandBase());
     }
     return newStrand;
   };
   ```

2. Create a factory function `pAequorFactory()` that has two parameters:

   - The first parameter is a number (no two organisms should have the same number).

   - The second parameter is an array of 15 DNA bases.

     ```javascript
     class pAequorFactory {
       constructor(specID, sequence) {
         this.specimenNum = specID;
         this.dna = sequence;
       }
     }
     ```

3. Create the function,`.mutate()`which is responsible for randomly selecting a base in the object’s `dna` property and changing the current base to a different base. Then `.mutate()` will return the object’s `dna`.

   - ```javascript
     pAequorFactory.prototype.mutate = function () {
       let dnaBases = ["A", "T", "C", "G"];
       let randomBaseIndex = Math.floor(Math.random() * 15);
       altDnaBases = dnaBases.filter((base) => base !== this.dna[randomBaseIndex]);
       this.dna[randomBaseIndex] = `*${altDnaBases[Math.floor(Math.random() * 3)]}`;
       return this.dna;
     };
     ```

4. Create the function, `.compareDNA()` that compares the current `pAequor`‘s `.dna` with the passed in `pAequor`‘s `.dna` and compute how many bases are identical and in the same locations. `.compareDNA()` does not return anything, but prints a message that states the percentage of DNA the two objects have in common.

   - ```javascript
     pAequorFactory.prototype.compareDNA = function (obj) {
       let commonDna = 0;
       for (let i = 0; i < this.dna.length; i++) {
         if (this.dna[i] === obj.dna[i]) {
           commonDna++;
         }
       }
       commonDna = Math.floor((commonDna / 15) * 100);
       console.log(
         `Specimen ${this.specimenNum} and specimen ${obj.specimenNum} share ${commonDna}% of DNA in common.`
       );
     };
     
     ```

5. *P. aequor* have a likelier chance of survival if their DNA is made up of at least 60% `'C'` or `'G'` bases.

   In the returned object of `pAequorFactory()`, add another method `.willLikelySurvive()`.

   `.willLikelySurvive()` returns `true` if the object’s `.dna` array contains at least 60% `'C'` or `'G'` bases. Otherwise, `.willLikelySurvive()` returns false.

   - ```javascript
     pAequorFactory.prototype.willLikelySurvive = function () {
       let subArr = this.dna.filter((base) => base == "C" || base == "G").length;
       let survivability = Math.floor((subArr / 15) * 100);
       return survivability >= 60;
     };
     ```

6. Create 30 instances of `pAequor` that can survive in their natural environment. Store these instances in an array.

   - ```javascript
     function collection() {
       let dnaCollection = [];
       while (dnaCollection.length < 30) {
         let newDna = new pAequorFactory(uniqueId(), mockUpStrand());
         if (newDna.willLikelySurvive()) {
           dnaCollection.push(newDna);
         }
       }
       return dnaCollection;
     }
     
     const sampleCollection = collection();
     ```

7. Test examples:

   - ```javascript
     console.log(sampleCollection);
     console.log(sampleCollection[29].compareDNA(sampleCollection[18]));
     console.log(sampleCollection[7].mutate());
     console.log(sampleCollection[13].willLikelySurvive());
     ```

     