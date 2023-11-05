import { Observable, from, map, toArray } from 'rxjs';


const persons = [
    { first: "Alice", last: "Smith" },
    { first: "Bob", last: "Jones" },
    { first: "Carol", last: "Williams" },
    { first: "Dave", last: "Brown" },
    { first: "Eve", last: "Miller" },
    { first: "Frank", last: "Davis" },
    { first: "George", last: "Johnson" },
    { first: "Helen", last: "Taylor" },
    { first: "Irene", last: "Anderson" },
    { first: "Jack", last: "Thomas" }
];

const personsObs$: Observable<{ fullname: string }[]> =
    from(persons)
        .pipe(
            map((p) => ({ fullname: `${p.first} ${p.last}` })),
            toArray()
        );

personsObs$.subscribe((persons) => console.log(persons));