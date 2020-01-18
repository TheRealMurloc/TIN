const osoba = [
    {
        id_osoby: 1,
        id_grupy: null,
        login: '123',
        haslo: '123',
        imie: 'Patryk',
        nazwisko: 'Skibiński-Kołtun',
        ksywka: 'Peli',
        email: 'aaa@gmail.com',
        telefon: 123456789,
        czyUczestnik: false,
        czyTrener: false,
        czyAdmin: true
    },
    {
        id_osoby: 2,
        id_grupy: 1,
        login: '321',
        haslo: '321',
        imie: 'Basia',
        nazwisko: 'Lis',
        ksywka: 'Basiozaur',
        email: 'bbb@gmail.com',
        telefon: 987654321,
        czyUczestnik: true,
        czyTrener: false,
        czyAdmin: false
    },
    {
        id_osoby: 3,
        id_grupy: null,
        login: '111',
        haslo: '111',
        imie: 'Baziaaaa',
        nazwisko: 'Roaaaar',
        ksywka: 'Basiozaurrrrr',
        email: 'bbb@gmail.com',
        telefon: 987654321,
        czyUczestnik: false,
        czyTrener: true,
        czyAdmin: false
    }
];

module.exports = osoba;