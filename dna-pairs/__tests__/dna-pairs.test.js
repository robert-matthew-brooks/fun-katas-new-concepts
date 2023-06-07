const {
    DNA_Base,
    A_Base,
    C_Base,
    G_Base,
    T_Base,
    DNA_Util,
    DNA_Molecule,
    dnaPairs
} = require("../dna-pairs.js");



describe("DNA_Base class", () => {
    it("should have a private variable to represent its base letter", () => {
        const testBase = new DNA_Base('A');
        expect(testBase.letter).toBe(undefined);
    });
    it("should have a getter function to return its base letter", () => {
        const testBase = new DNA_Base('A');
        expect(testBase.getLetter()).toBe('A');
    });
});



describe("DNA_Base extended classes", () => {
    it("should return the correct base letter", () => {
        const A = new A_Base();
        const C = new C_Base();
        const G = new G_Base();
        const T = new T_Base();

        expect(A.getLetter()).toBe('A');
        expect(C.getLetter()).toBe('C');
        expect(G.getLetter()).toBe('G');
        expect(T.getLetter()).toBe('T');
    });
});



describe("DNA_Util class", () => {
    it("should have a 'getPartnerLetter' utility function that can be accessed without an instance of the class", () => {
        expect(typeof DNA_Util.getPartnerLetter).toBe('function');
    });
    it("should return the correct partner letter when provided with A, C, G, or T", () => {
        expect(DNA_Util.getPartnerLetter('A')).toBe('T');
        expect(DNA_Util.getPartnerLetter('C')).toBe('G');
        expect(DNA_Util.getPartnerLetter('G')).toBe('C');
        expect(DNA_Util.getPartnerLetter('T')).toBe('A');
    });
});



describe("DNA_Molecule", () => {
    it("should store input letter as a DNA_Base object", () => {
        const A = new DNA_Molecule('A');

        expect(A.getBasesArr()[0]).toBeInstanceOf(DNA_Base);
        expect(A.getBasesArr()[0].getLetter()).toBe('A');
    });

    it("should store different letters as different objects", () => {
        const C = new DNA_Molecule('C');
        const G = new DNA_Molecule('G');

        expect(C.getBasesArr()[0]).toBeInstanceOf(C_Base);
        expect(G.getBasesArr()[0]).toBeInstanceOf(G_Base);
    });

    it("should store multiple objects when given a string", () => {
        const ACGT = new DNA_Molecule('ACGT');

        expect(ACGT.getBasesArr()[0].getLetter()).toBe('A');
        expect(ACGT.getBasesArr()[1].getLetter()).toBe('C');
        expect(ACGT.getBasesArr()[2].getLetter()).toBe('G');
        expect(ACGT.getBasesArr()[3].getLetter()).toBe('T');
    });

    describe("getBasePairsArr()", () => {
        it("should return an array pair", () => {
            const pairs = new DNA_Molecule('AC').getBasePairsArr();

            expect(Array.isArray(pairs[0])).toBe(true);

            expect(pairs[0][0]).toBe('A');
            expect(pairs[0][1]).toBe('T');
            expect(pairs[1][0]).toBe('C');
            expect(pairs[1][1]).toBe('G');
        });

        it("should only process A, C, G, or T letters", () => {
            const pairsFromInvalidLetters = new DNA_Molecule('01234A').getBasePairsArr();

            expect(pairsFromInvalidLetters.length).toBe(1);
            expect(pairsFromInvalidLetters[0][0]).toBe('A');

            const pairsFromLowercaseLetters = new DNA_Molecule('acgt').getBasePairsArr();

            expect(pairsFromLowercaseLetters[0][0]).toBe('A');
            expect(pairsFromLowercaseLetters[1][0]).toBe('C');
            expect(pairsFromLowercaseLetters[2][0]).toBe('G');
            expect(pairsFromLowercaseLetters[3][0]).toBe('T');
        });
    });
});



describe("dnaPairs()", () => {
    it("should return an array when passed no data", () => {
        expect(dnaPairs('')).toEqual([]);
        expect(dnaPairs()).toEqual([]);
    });

    it("should return array pair when passed a single letter", () => {
        expect(dnaPairs('A')).toEqual([['A', 'T']]);
        expect(dnaPairs('C')).toEqual([['C', 'G']]);
        expect(dnaPairs('G')).toEqual([['G', 'C']]);
        expect(dnaPairs('T')).toEqual([['T', 'A']]);
    });

    it("should return an array of pairs when passed a string", () => {
        expect(dnaPairs('ACGT')).toEqual([
            ['A', 'T'],
            ['C', 'G'],
            ['G', 'C'],
            ['T', 'A']
        ]);
    });
});