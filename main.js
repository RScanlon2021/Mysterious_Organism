let uniqueId = () => {
  return Math.floor(Math.random() * 10000);
};

// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
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

function pAequorFactory(specID, sequence) {
  this.specimenNum = specID;
  this.dna = sequence;
  this.willLikelySurvive = function () {
    let subArr = this.dna.filter((base) => base == 'C' || base == 'G').length;
    let survivability = Math.floor((subArr / 15) * 100);
    return survivability >= 60;
  };
  this.mutate = function () {
    let dnaBases = ['A', 'T', 'C', 'G'];
    let randomBaseIndex = Math.floor(Math.random() * 15);
    altDnaBases = dnaBases.filter((base) => base !== this.dna[randomBaseIndex]);
    this.dna[randomBaseIndex] = `*${
      altDnaBases[Math.floor(Math.random() * 3)]
    }`;
    return this.dna;
  };
}

pAequorFactory.prototype.compareDNA = function (obj) {
  let commonDna = 0;
  for (let i = 0; i < this.dna.length; i++) {
    if (this.dna[i] === obj.dna[i]) {
      commonDna++;
    }
  }
  commonDna = Math.floor((commonDna / 15) * 100);
  console.log(
    `Specimen #1 and specimen #2 share ${commonDna}% of DNA in common.`
  );
};

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

// console.log(sampleCollection[29].compareDNA(sampleCollection[18]));
