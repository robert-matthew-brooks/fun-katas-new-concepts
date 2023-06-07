class DNA_Base {
    #letter;

    constructor(letter) {
        this.#letter = letter;
    }

    getLetter() {
        return this.#letter;
    }
}

class A_Base extends DNA_Base {
    #partnerLetter;

    constructor() {
        super('A');
        this.#partnerLetter = 'T';
    }

    getPartnerLetter() {
        return this.#partnerLetter;
    }
}

class C_Base extends DNA_Base {
    #partnerLetter;

    constructor() {
        super('C');
        this.#partnerLetter = 'G';
    }

    getPartnerLetter() {
        return this.#partnerLetter;
    }
}

class G_Base extends DNA_Base {
    #partnerLetter;

    constructor() {
        super('G');
        this.#partnerLetter = 'C';
    }

    getPartnerLetter() {
        return this.#partnerLetter;
    }
}

class T_Base extends DNA_Base {
    #partnerLetter;

    constructor() {
        super('T');
        this.#partnerLetter = 'A';
    }

    getPartnerLetter() {
        return this.#partnerLetter;
    }
}



class DNA_Util {
    static #basesArr = [
        new A_Base(),
        new C_Base(),
        new G_Base(),
        new T_Base()
    ];

    static getPartnerLetter(targetBaseLetter) {
        for (const base of this.#basesArr) {
            if (base.getLetter() === targetBaseLetter) {
                return base.getPartnerLetter();
            }
        }
    }
}



class DNA_Molecule {
    #basesArr;

    constructor(baseListStr) {
        this.#basesArr = this.#getBasesArrFromStr(baseListStr);
    }

    #getBasesArrFromStr(str) {
        if (!str) return [];

        let letters = [...str.toUpperCase()];

        letters = letters.filter(letter => {
            return /[ACGT]/.test(letter);
        });

        const basesArr = letters.map(letter => {
            switch(letter) {
                case 'A':
                    return new A_Base();
                case 'C':
                    return new C_Base();
                case 'G':
                    return new G_Base();
                case 'T':
                    return new T_Base();
            }
        });

        return basesArr;
    }

    getBasesArr() {
        return this.#basesArr;
    }

    getBasePairsArr() {
        const basePairsArr = [];

        this.#basesArr.forEach(base => {
            basePairsArr.push([
                base.getLetter(),
                base.getPartnerLetter()
            ]);
        });

        return basePairsArr;
    }
}



function dnaPairs(baseListStr) {
    return new DNA_Molecule(baseListStr).getBasePairsArr();
}



module.exports = {
    DNA_Base,
    A_Base,
    C_Base,
    G_Base,
    T_Base,
    DNA_Util,
    DNA_Molecule,
    dnaPairs
};