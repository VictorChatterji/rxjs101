import $ from 'jquery';
import Rx from 'rxjs/Rx';
//this is how we create observable in rx js and binf events
const btn = $('#btn');
const output = $('#output');
const btnStream$ = Rx.Observable.fromEvent(btn, 'click');

btnStream$.subscribe(
    (e) => {
        console.log(e);
    }
)

//create observables for array like objects

const numbers =[33,56,789,34,45];

const numbers$ = Rx.Observable.from(numbers);

numbers$.subscribe(
    v => {
        console.log(v);
    },
    err => {
        console.log(err);
    },
    complete => {
        console.log('Completed')
    }
)

//create objects

const posts = [
    {title:'hello'},
    {title:'I am victor !'},
    {title:'I am working in diet code!'}
];

const posts$ = Rx. Observable.from(posts);

posts$.subscribe(
    posts => {
        console.log(posts);
    },
    err => {
        console.log(err);
    },
    complete => {
        console.log('Completed !')
    }
)

//Introduction to maps and sets and observables

const set = new Set(['santosh',44,{job:'fullstack developer'}]);

const set$ = Rx. Observable.from(set);

set$.subscribe(
    set => {
        console.log(set);
    },
    err => {
        console.log(err);
    },
    complete => {
        console.log('Completed set !')
    }
)

//maps

const map = new Map([[1,2],[3,4],[6,7,8]]);

const map$ = Rx. Observable.from(map);

map$.subscribe(
    map => {
        console.log(map);
    },
    err => {
        console.log(err);
    },
    complete => {
        console.log('Completed map !')
    }
)

//custom Observable
//observer

const source$ = new Rx.Observable(observer => {
    console.log('Creating Observable');
    observer.next('hello world');
    observer.next('Another value');
    observer.error(new Error('Something went wrong'));

    setTimeout(() =>{
        observer.next(`yet another value`);
        observer.complete();
    }, 3000);
})

source$
.catch(err => Rx.Observable.of(err))
.subscribe(
    x => {
        console.log(x);
    },
    err => {
        console.log(err);
    },
    complete => {
        console.log(`completed!`)
    }
)

//promise my favourite :)
const victorPromise = new Promise((resolve, reject) => {
    console.log('Creating Promise');
    setTimeout(() =>{
        resolve(`Hello from promise`);
    }, 3000);
});

// victorPromise.then(x => {
//     console.log(x);
// })

const victorSource$ = Rx.Observable.fromPromise(victorPromise);

// victorSource$.subscribe(x => {
//     console.log(x);
// })


//get user information from github

function getUser(username){
    return $.ajax({
        url:`https://api.github.com/users/${username}`,
        dataType:'jsonp'
    }).promise();
}

const victorInputSource$ = Rx.Observable.fromEvent($('#input'),'keyup');

victorInputSource$.subscribe(e => {
    Rx.Observable.fromPromise(getUser(e.target.value))
        .subscribe(x => {
            debugger;
            $('#name').text(x.data.name);
            $('#company').text(x.data.company);
            $('#location').text(x.data.location);
            $('#repos').text(x.data.public_repos);
        });

});
